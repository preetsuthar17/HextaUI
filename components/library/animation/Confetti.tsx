"use client";

import React from "react";
import confetti from "canvas-confetti";
import { Button } from "@/components/ui/button";

// Utility function for random range
const randomInRange = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

// Basic confetti blast
export const BasicConfetti = () => {
  const triggerBasicConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <Button variant="outline" onClick={triggerBasicConfetti}>
      Basic Confetti
    </Button>
  );
};

// Random direction confetti
export const RandomConfetti = () => {
  const triggerRandomConfetti = () => {
    confetti({
      angle: randomInRange(55, 125),
      spread: randomInRange(50, 70),
      particleCount: randomInRange(50, 100),
      origin: { y: 0.6 },
    });
  };

  return (
    <Button variant="outline" onClick={triggerRandomConfetti}>
      Random Direction Confetti
    </Button>
  );
};

// Realistic confetti
export const RealisticConfetti = () => {
  const triggerRealisticConfetti = () => {
    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
    };

    const fire = (particleRatio: number, opts: any) => {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    };

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  return (
    <Button variant="outline" onClick={triggerRealisticConfetti}>
      Realistic Confetti
    </Button>
  );
};

// Fireworks
export const FireworksConfetti = () => {
  const triggerFireworks = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <Button variant="outline" onClick={triggerFireworks}>
      Fireworks
    </Button>
  );
};

// Star burst
export const StarConfetti = () => {
  const triggerStarBurst = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });
      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <Button variant="outline" onClick={triggerStarBurst}>
      Star Burst
    </Button>
  );
};

// Snow effect
export const SnowConfetti = () => {
  const triggerSnowEffect = () => {
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    let skew = 1;

    const frame = () => {
      const timeLeft = animationEnd - Date.now();
      const ticks = Math.max(200, 500 * (timeLeft / duration));
      skew = Math.max(0.8, skew - 0.001);

      confetti({
        particleCount: 1,
        startVelocity: 0,
        ticks: ticks,
        origin: {
          x: Math.random(),
          y: Math.random() * skew - 0.2,
        },
        colors: ["#ffffff"],
        shapes: ["circle"],
        gravity: randomInRange(0.4, 0.6),
        scalar: randomInRange(0.4, 1),
        drift: randomInRange(-0.4, 0.4),
      });

      if (timeLeft > 0) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <Button variant="outline" onClick={triggerSnowEffect}>
      Snow Effect
    </Button>
  );
};

// School pride
export const SchoolPrideConfetti = () => {
  const triggerSchoolPride = () => {
    const end = Date.now() + 15 * 1000;
    const colors = ["#bb0000", "#ffffff"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();
  };

  return (
    <Button variant="outline" onClick={triggerSchoolPride}>
      School Pride
    </Button>
  );
};
