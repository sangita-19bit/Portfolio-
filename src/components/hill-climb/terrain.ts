import * as THREE from "three"
import { ROAD_CONFIG, THEME_TOKENS, CURRENT_THEME } from "./config"

/**
 * Smooth step interpolation helper
 */
function smoothstep(min: number, max: number, value: number): number {
  const x = Math.max(0, Math.min(1, (value - min) / (max - min)))
  return x * x * (3 - 2 * x)
}

/**
 * Analytical ground height function at any world coordinate X
 */
export function getRoadHeight(x: number): number {
  const {
    length,
    baseHeight,
    hillAmplitude1,
    hillFreq1,
    hillAmplitude2,
    hillFreq2,
    hillAmplitude3,
    hillFreq3,
    startPlateauLength,
    endPlateauLength,
  } = ROAD_CONFIG

  let ramp = 1
  if (x < startPlateauLength) {
    ramp = smoothstep(4, startPlateauLength, x)
  } else if (x > length - endPlateauLength) {
    ramp = 1 - smoothstep(length - endPlateauLength, length - 4, x)
  }

  const rawHills =
    hillAmplitude1 * Math.sin(x * hillFreq1) +
    hillAmplitude2 * Math.sin(x * hillFreq2 + 1.2) +
    hillAmplitude3 * Math.sin(x * hillFreq3 + 2.5)

  return baseHeight + rawHills * ramp
}

/**
 * Calculates road slope (tangent dy/dx) and pitch angle (radians) at world position X
 */
export function getRoadSlope(x: number): { slope: number; pitch: number } {
  const delta = 0.08
  const y1 = getRoadHeight(x - delta)
  const y2 = getRoadHeight(x + delta)
  const slope = (y2 - y1) / (2 * delta)
  const pitch = Math.atan2(slope, 1)
  return { slope, pitch }
}

/**
 * Builds the complete terrain subsystem with Light Theme support,
 * InstancedMesh props (trees & rocks), and crisp road ribbons.
 */
export function createTerrain(): {
  terrainGroup: THREE.Group
  roadMesh: THREE.Mesh
  dispose: () => void
} {
  const terrainGroup = new THREE.Group()
  terrainGroup.name = "TerrainGroup"

  const theme = THEME_TOKENS[CURRENT_THEME]
  const { length, width, segments } = ROAD_CONFIG
  const minX = -15
  const maxX = length + 25
  const totalXSpan = maxX - minX
  const xSegmentCount = segments

  // ──────────────────────────────────────────────────────────────────────────
  // 1. Road Surface Ribbon Mesh
  // ──────────────────────────────────────────────────────────────────────────
  const roadGeo = new THREE.PlaneGeometry(totalXSpan, width, xSegmentCount, 4)
  roadGeo.rotateX(-Math.PI / 2)
  roadGeo.translate(minX + totalXSpan / 2, 0, 0)

  const roadPos = roadGeo.attributes.position
  for (let i = 0; i < roadPos.count; i++) {
    const vx = roadPos.getX(i)
    const vz = roadPos.getZ(i)
    const vy = getRoadHeight(vx)
    // Subtle camber: slight 3cm crown in road center
    const camber = (1 - Math.abs(vz / (width / 2))) * 0.04
    roadPos.setY(i, vy + camber)
  }
  roadGeo.computeVertexNormals()

  // Charcoal asphalt material matching light theme
  const roadMat = new THREE.MeshStandardMaterial({
    color: theme.road,
    roughness: 0.82,
    metalness: 0.1,
    flatShading: false,
  })
  const roadMesh = new THREE.Mesh(roadGeo, roadMat)
  roadMesh.receiveShadow = true
  terrainGroup.add(roadMesh)

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Roadside Curbs & Edge Glow Lines
  // ──────────────────────────────────────────────────────────────────────────
  const curbStep = totalXSpan / xSegmentCount
  const curbPointsL: THREE.Vector3[] = []
  const curbPointsR: THREE.Vector3[] = []

  for (let i = 0; i <= xSegmentCount; i++) {
    const x = minX + i * curbStep
    const y = getRoadHeight(x) + 0.05
    curbPointsL.push(new THREE.Vector3(x, y, -width / 2))
    curbPointsR.push(new THREE.Vector3(x, y, width / 2))
  }

  const curbGeoL = new THREE.BufferGeometry().setFromPoints(curbPointsL)
  const curbGeoR = new THREE.BufferGeometry().setFromPoints(curbPointsR)
  const curbLineMatL = new THREE.LineBasicMaterial({ color: theme.curbLeft, linewidth: 2 })
  const curbLineMatR = new THREE.LineBasicMaterial({ color: theme.curbRight, linewidth: 2 })

  const curbLineL = new THREE.Line(curbGeoL, curbLineMatL)
  const curbLineR = new THREE.Line(curbGeoR, curbLineMatR)
  terrainGroup.add(curbLineL, curbLineR)

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Dashed Centerline Lane Markings (Crisp White on Charcoal)
  // ──────────────────────────────────────────────────────────────────────────
  const dashGroup = new THREE.Group()
  const dashGeo = new THREE.PlaneGeometry(1.5, 0.18)
  dashGeo.rotateX(-Math.PI / 2)
  const dashMat = new THREE.MeshBasicMaterial({
    color: theme.roadMarking,
    transparent: true,
    opacity: 0.9,
  })

  for (let x = 0; x <= length; x += 3.8) {
    const y = getRoadHeight(x) + 0.06
    const { pitch } = getRoadSlope(x)
    const dash = new THREE.Mesh(dashGeo, dashMat)
    dash.position.set(x, y, 0)
    dash.rotation.z = pitch
    dashGroup.add(dash)
  }
  terrainGroup.add(dashGroup)

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Surrounding Low-Poly Light-Colored Landscape
  // ──────────────────────────────────────────────────────────────────────────
  const landscapeWidth = 76
  const landscapeGeo = new THREE.PlaneGeometry(totalXSpan, landscapeWidth, Math.floor(xSegmentCount / 2), 24)
  landscapeGeo.rotateX(-Math.PI / 2)
  landscapeGeo.translate(minX + totalXSpan / 2, 0, 0)

  const landPos = landscapeGeo.attributes.position
  for (let i = 0; i < landPos.count; i++) {
    const lx = landPos.getX(i)
    const lz = landPos.getZ(i)
    const roadY = getRoadHeight(lx)
    const distFromRoad = Math.abs(lz) - width / 2

    if (distFromRoad <= 0) {
      landPos.setY(i, roadY - 0.22)
    } else {
      const valleyDip = Math.sin(distFromRoad * 0.15) * 1.4
      const mountainRise = Math.sin(lx * 0.025 + distFromRoad * 0.08) * 3.2
      landPos.setY(i, roadY - 0.28 - valleyDip + (distFromRoad > 12 ? mountainRise : 0))
    }
  }
  landscapeGeo.computeVertexNormals()

  // Clean light sandstone / meadow terrain material
  const landMat = new THREE.MeshStandardMaterial({
    color: theme.terrain,
    roughness: 0.9,
    metalness: 0.05,
    flatShading: true, // Stylized low-poly aesthetic!
  })
  const landscapeMesh = new THREE.Mesh(landscapeGeo, landMat)
  landscapeMesh.receiveShadow = true
  terrainGroup.add(landscapeMesh)

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Instanced Roadside Props (High Performance: Trees & Rocks in 3 Draw Calls)
  // ──────────────────────────────────────────────────────────────────────────
  const trunkGeo = new THREE.CylinderGeometry(0.12, 0.18, 1.2, 5)
  trunkGeo.translate(0, 0.6, 0)
  const trunkMat = new THREE.MeshStandardMaterial({ color: theme.treeTrunk, roughness: 0.9 })

  const foliageGeo = new THREE.ConeGeometry(0.85, 2.2, 5)
  foliageGeo.translate(0, 1.9, 0)
  const foliageMat = new THREE.MeshStandardMaterial({ color: theme.treeFoliage1, flatShading: true })

  const rockGeo = new THREE.DodecahedronGeometry(0.65, 0)
  const rockMat = new THREE.MeshStandardMaterial({ color: theme.rock, flatShading: true })

  // Count instances
  const treeTransforms: THREE.Matrix4[] = []
  const rockTransforms: THREE.Matrix4[] = []
  const dummy = new THREE.Object3D()

  for (let x = -8; x < length + 18; x += 5.5) {
    // Left side prop
    const sideOffsetL = -width / 2 - 2.2 - ((x * 13) % 7)
    const yL = getRoadHeight(x) - 0.2
    const scaleL = 0.75 + ((x * 19) % 5) * 0.12

    if ((x * 7) % 3 > 0.8) {
      dummy.position.set(x, yL, sideOffsetL)
      dummy.rotation.set(0, (x * 0.5) % Math.PI, 0)
      dummy.scale.set(scaleL, scaleL, scaleL)
      dummy.updateMatrix()
      treeTransforms.push(dummy.matrix.clone())
    } else {
      dummy.position.set(x, yL + 0.3, sideOffsetL)
      dummy.rotation.set((x * 3) % 2, (x * 5) % 2, 0)
      dummy.scale.set(scaleL, scaleL, scaleL)
      dummy.updateMatrix()
      rockTransforms.push(dummy.matrix.clone())
    }

    // Right side prop
    const sideOffsetR = width / 2 + 2.4 + ((x * 17) % 8)
    const yR = getRoadHeight(x) - 0.2
    const scaleR = 0.8 + ((x * 23) % 4) * 0.1

    if ((x * 11) % 4 > 1.0) {
      dummy.position.set(x, yR, sideOffsetR)
      dummy.rotation.set(0, (x * 0.7) % Math.PI, 0)
      dummy.scale.set(scaleR, scaleR, scaleR)
      dummy.updateMatrix()
      treeTransforms.push(dummy.matrix.clone())
    }
  }

  // Instanced Meshes
  const trunkInstMesh = new THREE.InstancedMesh(trunkGeo, trunkMat, treeTransforms.length)
  const foliageInstMesh = new THREE.InstancedMesh(foliageGeo, foliageMat, treeTransforms.length)
  trunkInstMesh.castShadow = true
  foliageInstMesh.castShadow = true

  treeTransforms.forEach((matrix, i) => {
    trunkInstMesh.setMatrixAt(i, matrix)
    foliageInstMesh.setMatrixAt(i, matrix)
  })
  trunkInstMesh.instanceMatrix.needsUpdate = true
  foliageInstMesh.instanceMatrix.needsUpdate = true
  terrainGroup.add(trunkInstMesh, foliageInstMesh)

  const rockInstMesh = new THREE.InstancedMesh(rockGeo, rockMat, rockTransforms.length)
  rockInstMesh.castShadow = true
  rockTransforms.forEach((matrix, i) => {
    rockInstMesh.setMatrixAt(i, matrix)
  })
  rockInstMesh.instanceMatrix.needsUpdate = true
  terrainGroup.add(rockInstMesh)

  // ──────────────────────────────────────────────────────────────────────────
  // 6. Start Arch & Finish Arch
  // ──────────────────────────────────────────────────────────────────────────
  const createArch = (archX: number, label: string, colorHex: number) => {
    const arch = new THREE.Group()
    arch.name = `Arch_${label}`
    const archH = 4.2
    const archW = width + 1.2
    const y = getRoadHeight(archX)

    const postGeo = new THREE.BoxGeometry(0.35, archH, 0.35)
    const beamGeo = new THREE.BoxGeometry(0.35, 0.5, archW)
    const postMat = new THREE.MeshStandardMaterial({ color: theme.archPost, metalness: 0.5 })
    const beamMat = new THREE.MeshStandardMaterial({
      color: colorHex,
      emissive: colorHex,
      emissiveIntensity: 0.5,
    })

    const postL = new THREE.Mesh(postGeo, postMat)
    postL.position.set(0, archH / 2, -archW / 2)
    const postR = new THREE.Mesh(postGeo, postMat)
    postR.position.set(0, archH / 2, archW / 2)
    const beam = new THREE.Mesh(beamGeo, beamMat)
    beam.position.set(0, archH, 0)

    arch.add(postL, postR, beam)
    arch.position.set(archX, y, 0)
    return arch
  }

  const startArch = createArch(0, "START", 0x10b981) // Emerald
  const finishArch = createArch(length, "FINISH", 0x06b6d4) // Cyan
  terrainGroup.add(startArch, finishArch)

  // ──────────────────────────────────────────────────────────────────────────
  // Cleanup
  // ──────────────────────────────────────────────────────────────────────────
  const dispose = () => {
    roadGeo.dispose()
    roadMat.dispose()
    dashGeo.dispose()
    dashMat.dispose()
    landscapeGeo.dispose()
    landMat.dispose()
    curbGeoL.dispose()
    curbGeoR.dispose()
    curbLineMatL.dispose()
    curbLineMatR.dispose()
    trunkGeo.dispose()
    trunkMat.dispose()
    foliageGeo.dispose()
    foliageMat.dispose()
    rockGeo.dispose()
    rockMat.dispose()
    trunkInstMesh.dispose()
    foliageInstMesh.dispose()
    rockInstMesh.dispose()
  }

  return { terrainGroup, roadMesh, dispose }
}
