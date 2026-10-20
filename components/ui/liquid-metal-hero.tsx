"use client";

import * as React from "react";
import { LiquidMetal } from '@paper-design/shaders-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export interface LiquidMetalHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  primaryCtaLabel?: string;
  secondaryCtaLabel?: string;
  onPrimaryCtaClick?: () => void;
  onSecondaryCtaClick?: () => void;
  features?: string[];
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  bgPosition?: "fixed" | "absolute";
  shape?: "metaballs" | "diamond" | "circle" | "daisy" | "none";
  colorBack?: string;
  colorTint?: string;
  scale?: number;
  speed?: number;
  repetition?: number;
  softness?: number;
  shiftRed?: number;
  shiftBlue?: number;
  distortion?: number;
  contour?: number;
}

export default function LiquidMetalHero({
  badge,
  title,
  subtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  onPrimaryCtaClick,
  onSecondaryCtaClick,
  features = [],
  className = "",
  style,
  children,
  bgPosition = "absolute",
  shape = "metaballs",
  colorBack = "#000000",
  colorTint = "#ffffff",
  scale = 0.48,
  speed = 0.75,
  repetition = 2,
  softness = 0.1,
  shiftRed = 0.3,
  shiftBlue = 0.3,
  distortion = 0.07,
  contour = 0.4,
}: LiquidMetalHeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1
    }
  };

  return (
    <section className={`relative min-h-screen flex items-center justify-center overflow-hidden bg-black text-white ${className}`} style={style}>
      {/* Official Liquid Metal Metaball — Smooth silver/chrome fluid deforming organically through peanut, pebble, and teardrop shapes */}
      <LiquidMetal
        shape={shape}
        colorBack={colorBack}
        colorTint={colorTint}
        scale={scale}
        repetition={repetition}
        softness={softness}
        shiftRed={shiftRed}
        shiftBlue={shiftBlue}
        distortion={distortion}
        contour={contour}
        angle={70}
        speed={speed}
        fit="contain"
        style={{ position: bgPosition, inset: 0, zIndex: 0 }}
      />
      
      {Boolean(children || badge || title || subtitle || primaryCtaLabel || secondaryCtaLabel || features.length > 0) && (
        <div className={`relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl ${children ? "min-h-screen flex flex-col justify-between py-4 md:py-6" : "py-20"}`}>
          {children ? (
            children
          ) : (
            <motion.div 
              className="text-center space-y-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {badge && (
                <motion.div 
                  className="flex justify-center"
                  variants={itemVariants}
                >
                  <Badge 
                    variant="secondary" 
                    className="bg-white/10 text-white/90 border border-white/20 hover:bg-white/20 transition-colors duration-300 backdrop-blur-md px-3.5 py-1 text-xs font-medium tracking-wide"
                  >
                    {badge}
                  </Badge>
                </motion.div>
              )}
              
              {(title || subtitle) && (
                <motion.div 
                  className="space-y-6"
                  variants={itemVariants}
                >
                  {title && (
                    <motion.h1 
                      role="heading" 
                      aria-level={1}
                      className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight tracking-tight drop-shadow-sm"
                      variants={itemVariants}
                    >
                      {title}
                    </motion.h1>
                  )}
                  
                  {subtitle && (
                    <motion.p 
                      className="max-w-3xl mx-auto text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal"
                      variants={itemVariants}
                    >
                      {subtitle}
                    </motion.p>
                  )}
                </motion.div>
              )}
              
              {(primaryCtaLabel || secondaryCtaLabel) && (
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-2"
                  variants={buttonVariants}
                >
                  {primaryCtaLabel && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={onPrimaryCtaClick}
                        size="lg"
                        className="bg-white text-black hover:bg-neutral-200 transition-all duration-300 shadow-xl text-base px-8 py-5 font-semibold rounded-lg"
                      >
                        {primaryCtaLabel}
                      </Button>
                    </motion.div>
                  )}
                  
                  {secondaryCtaLabel && onSecondaryCtaClick && (
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        onClick={onSecondaryCtaClick}
                        variant="outline"
                        size="lg"
                        className="border-white/30 text-white bg-black/40 hover:bg-white/10 hover:border-white/50 transition-all duration-300 backdrop-blur-md text-base px-8 py-5 font-semibold rounded-lg"
                      >
                        {secondaryCtaLabel}
                      </Button>
                    </motion.div>
                  )}
                </motion.div>
              )}
              
              {features.length > 0 && (
                <motion.div 
                  className="pt-16 max-w-5xl mx-auto"
                  variants={itemVariants}
                >
                  <Card className="bg-white/[0.06] border-white/15 backdrop-blur-xl shadow-2xl rounded-2xl overflow-hidden">
                    <div className="p-6 md:p-8">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/10">
                        {features.map((feature, index) => (
                          <div 
                            key={index}
                            className="flex items-center justify-center text-center px-4 py-2"
                          >
                            <p className="text-white/90 font-medium text-base tracking-wide">
                              {feature}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </section>
  );
}
