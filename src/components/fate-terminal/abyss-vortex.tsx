"use client";

import { useEffect, useRef } from "react";

type ParticleLike = {
  x: number;
  y: number;
  radius: number;
  angle: number;
  size: number;
  speedMult: number;
  color: string;
  reset: (randomRadius?: boolean) => void;
  update: () => void;
  draw: () => void;
};

type EntityLike = {
  x: number;
  y: number;
  radius: number;
  angle: number;
  speedMult: number;
  opacity: number;
  baseSize: number;
  color: string;
  type: "text" | "constellation";
  text: string;
  nodes: Array<{ x: number; y: number }>;
  reset: (isInitial?: boolean) => void;
  update: () => void;
  draw: () => void;
};

const customContent = {
  words: [
    "命盘",
    "八字",
    "塔罗",
    "紫微",
    "卦象",
    "六爻",
    "奇门",
    "梅花易数",
    "流年",
    "姻缘",
    "财运",
    "事业",
    "签文",
    "命格",
    "宫位",
    "相位",
    "月相",
    "占星",
    "运势",
    "福缘"
  ],
  constellations: [
    [
      { x: -1.5, y: 0.8 },
      { x: -0.8, y: 0.3 },
      { x: 0, y: 0 },
      { x: 0.5, y: -0.3 },
      { x: 0.8, y: -1 },
      { x: 1.5, y: -1.2 },
      { x: 1.8, y: -0.4 }
    ],
    [
      { x: -1.2, y: -0.8 },
      { x: -0.6, y: 0.8 },
      { x: 0, y: 0 },
      { x: 0.6, y: 0.9 },
      { x: 1.2, y: -0.7 }
    ],
    [
      { x: -0.8, y: -1 },
      { x: 0.8, y: -1 },
      { x: 0.3, y: 0 },
      { x: -0.3, y: 0 },
      { x: -1, y: 1 },
      { x: 1, y: 1 },
      { x: -0.8, y: -1 }
    ]
  ],
  entityTypeWeights: ["text", "text", "text", "constellation"] as const
};

const particlePalette = ["#11243c", "#0d3a50", "#245ca8", "#28466b", "#4d2f7d", "#86f5ff"];
const entityPalette = [
  "93, 242, 255",
  "0, 255, 168",
  "255, 119, 197",
  "161, 205, 255",
  "255, 214, 102",
  "255, 255, 255"
];

function randomItem<T>(items: readonly T[]) {
  return items[Math.floor(Math.random() * items.length)];
}

export function AbyssVortex() {
  const bgCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const entityCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const entityCanvas = entityCanvasRef.current;

    if (!bgCanvas || !entityCanvas) {
      return;
    }

    const bgCtx = bgCanvas.getContext("2d");
    const entityCtx = entityCanvas.getContext("2d");

    if (!bgCtx || !entityCtx) {
      return;
    }

    const backgroundCanvas = bgCanvas;
    const foregroundCanvas = entityCanvas;
    const backgroundContext = bgCtx;
    const foregroundContext = entityCtx;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let rafId = 0;
    let width = 0;
    let height = 0;
    let centerX = 0;
    let centerY = 0;
    let eventHorizon = 0;
    let particleCount = 0;
    let entityCount = 0;

    const particles: ParticleLike[] = [];
    const entities: EntityLike[] = [];

    function syncCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function getCounts() {
      const areaFactor = Math.min(1.2, Math.max(0.55, (width * height) / 1600000));

      particleCount = Math.round((reducedMotion ? 360 : 1080) * areaFactor);
      entityCount = Math.round((reducedMotion ? 28 : 76) * areaFactor);
    }

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      centerX = width / 2;
      centerY = height / 2;
      eventHorizon = Math.max(46, Math.min(width, height) * 0.072);
      getCounts();
      syncCanvas(backgroundCanvas, backgroundContext);
      syncCanvas(foregroundCanvas, foregroundContext);
      seedScene();
    }

    class Particle implements ParticleLike {
      x = 0;
      y = 0;
      radius = 0;
      angle = 0;
      size = 0;
      speedMult = 1;
      color = particlePalette[0];

      constructor() {
        this.reset(true);
      }

      reset(randomRadius = false) {
        const arms = 4;
        const armSpread = 0.84;
        const armIndex = Math.floor(Math.random() * arms);
        const armAngle = ((Math.PI * 2) / arms) * armIndex;
        const spread = (Math.random() - 0.5) * armSpread;
        const maxRadius = Math.max(width, height) * 0.82;

        this.radius = randomRadius ? Math.random() * maxRadius : maxRadius + Math.random() * 220;
        this.angle = armAngle + spread - this.radius * 0.005;
        this.size = Math.random() * 2.2 + 0.45;
        this.color = randomItem(particlePalette);
        this.speedMult = Math.random() * 0.5 + 0.5;
      }

      update() {
        const baseSpeed = reducedMotion ? 0.0012 : 0.0022;
        const pullSpeed = reducedMotion ? 0.28 : 0.54;
        const distanceFactor = Math.max(0.1, this.radius / 300);

        this.angle += (baseSpeed * this.speedMult) / distanceFactor;
        this.radius -= (pullSpeed * this.speedMult) / Math.pow(distanceFactor, 0.52);
        this.x = centerX + Math.cos(this.angle) * this.radius;
        this.y = centerY + Math.sin(this.angle) * this.radius;

        if (this.radius < eventHorizon) {
          this.reset(false);
        }
      }

      draw() {
        if (this.radius < eventHorizon) {
          return;
        }

        const alpha = Math.min(1, this.radius / 130);
        backgroundContext.fillStyle =
          this.radius < eventHorizon * 1.35 ? `rgba(255,255,255,${alpha * 0.9})` : this.color;

        backgroundContext.beginPath();
        backgroundContext.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        backgroundContext.fill();
      }
    }

    class Entity implements EntityLike {
      x = 0;
      y = 0;
      radius = 0;
      angle = 0;
      speedMult = 1;
      opacity = 1;
      baseSize = 16;
      color = entityPalette[0];
      type: "text" | "constellation" = "text";
      text = "";
      nodes: Array<{ x: number; y: number }> = [];

      constructor() {
        this.reset(true);
      }

      reset(isInitial = false) {
        const maxRadius = Math.max(width, height) * 0.64;

        this.radius = isInitial ? eventHorizon * 2.8 + Math.random() * maxRadius : maxRadius + Math.random() * 220;
        this.angle = Math.random() * Math.PI * 2;
        this.speedMult = Math.random() * 0.5 + 0.5;
        this.opacity = isInitial ? Math.random() * 0.5 + 0.3 : 0;
        this.type = randomItem(customContent.entityTypeWeights);
        this.color = randomItem(entityPalette);

        if (this.type === "text") {
          this.baseSize = Math.random() * 12 + 16;
          this.text = randomItem(customContent.words);
          this.nodes = [];
          return;
        }

        this.baseSize = Math.random() * 25 + 34;
        this.text = "";
        this.nodes = randomItem(customContent.constellations).map((point) => ({
          x: point.x * (this.baseSize * 0.8),
          y: point.y * (this.baseSize * 0.8)
        }));
      }

      update() {
        const distanceFactor = Math.max(0.05, this.radius / 400);

        this.angle += ((reducedMotion ? 0.0012 : 0.0022) * 1.5 * this.speedMult) / Math.pow(distanceFactor, 1.2);

        let inwardPull = 0;
        if (this.radius > 200) {
          inwardPull = 0.1 * this.speedMult;
        } else {
          const fallFactor = (200 - this.radius) / 100;
          inwardPull = (0.1 + fallFactor * 1.45) * this.speedMult;
        }

        if (reducedMotion) {
          inwardPull *= 0.65;
        }

        this.radius -= inwardPull;
        this.x = centerX + Math.cos(this.angle) * this.radius;
        this.y = centerY + Math.sin(this.angle) * this.radius;

        if (this.opacity < 1 && this.radius > eventHorizon * 1.6) {
          this.opacity += 0.015;
        }

        if (this.radius < eventHorizon - 10) {
          this.reset(false);
        }
      }

      draw() {
        foregroundContext.save();

        let stretch = 1;
        let scaleY = 1;
        let currentOpacity = this.opacity;

        if (this.radius < 150) {
          stretch = 1 + (150 - this.radius) / 8;
          scaleY = Math.max(0.05, 1 - (150 - this.radius) / 130);
          currentOpacity = Math.max(0, this.opacity * (this.radius / 150));
        }

        foregroundContext.translate(this.x, this.y);
        foregroundContext.rotate(this.radius < 150 ? this.angle + Math.PI : this.angle + Math.PI / 2);
        foregroundContext.scale(stretch, scaleY);

        let scaleFactor = Math.max(0.62, this.radius / 420);
        if (this.radius < 180) {
          scaleFactor *= 0.96;
        }

        if (scaleFactor < 1) {
          foregroundContext.scale(scaleFactor, scaleFactor);
        }

        foregroundContext.fillStyle = `rgba(${this.color}, ${currentOpacity})`;
        foregroundContext.strokeStyle = `rgba(${this.color}, ${currentOpacity})`;

        if (this.type === "text") {
          foregroundContext.font = `600 ${this.baseSize}px "Avenir Next", "PingFang SC", "Microsoft YaHei", sans-serif`;
          foregroundContext.textAlign = "center";
          foregroundContext.textBaseline = "middle";
          foregroundContext.fillText(this.text, 0, 0);
        } else if (this.nodes.length > 0) {
          foregroundContext.lineWidth = 1;
          foregroundContext.beginPath();
          foregroundContext.moveTo(this.nodes[0].x, this.nodes[0].y);

          for (let index = 1; index < this.nodes.length; index += 1) {
            foregroundContext.lineTo(this.nodes[index].x, this.nodes[index].y);
          }

          foregroundContext.stroke();

          for (const node of this.nodes) {
            foregroundContext.beginPath();
            foregroundContext.arc(node.x, node.y, 2, 0, Math.PI * 2);
            foregroundContext.fill();
          }
        }

        foregroundContext.restore();
      }
    }

    function seedScene() {
      particles.length = 0;
      entities.length = 0;

      for (let index = 0; index < particleCount; index += 1) {
        particles.push(new Particle());
      }

      for (let index = 0; index < entityCount; index += 1) {
        entities.push(new Entity());
      }
    }

    function drawCenter() {
      const glowRadius = eventHorizon + Math.min(width, height) * 0.24;
      const haloGradient = foregroundContext.createRadialGradient(
        centerX,
        centerY,
        eventHorizon * 0.82,
        centerX,
        centerY,
        glowRadius
      );

      haloGradient.addColorStop(0, "rgba(0, 0, 0, 1)");
      haloGradient.addColorStop(0.12, "rgba(93, 242, 255, 0.24)");
      haloGradient.addColorStop(0.28, "rgba(0, 255, 168, 0.14)");
      haloGradient.addColorStop(0.45, "rgba(255, 119, 197, 0.12)");
      haloGradient.addColorStop(1, "rgba(0, 0, 0, 0)");

      foregroundContext.save();
      foregroundContext.fillStyle = haloGradient;
      foregroundContext.beginPath();
      foregroundContext.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
      foregroundContext.fill();

      foregroundContext.strokeStyle = "rgba(93, 242, 255, 0.18)";
      foregroundContext.lineWidth = 1;
      foregroundContext.beginPath();
      foregroundContext.ellipse(
        centerX,
        centerY,
        eventHorizon * 1.95,
        eventHorizon * 0.68,
        Math.PI / 8,
        0,
        Math.PI * 2
      );
      foregroundContext.stroke();

      foregroundContext.fillStyle = "#000";
      foregroundContext.beginPath();
      foregroundContext.arc(centerX, centerY, eventHorizon, 0, Math.PI * 2);
      foregroundContext.fill();
      foregroundContext.restore();
    }

    function animate() {
      backgroundContext.fillStyle = "rgba(3, 7, 12, 0.15)";
      backgroundContext.fillRect(0, 0, width, height);

      backgroundContext.globalCompositeOperation = "screen";
      for (const particle of particles) {
        particle.update();
        particle.draw();
      }
      backgroundContext.globalCompositeOperation = "source-over";

      foregroundContext.clearRect(0, 0, width, height);

      for (const entity of entities) {
        entity.update();
        entity.draw();
      }

      drawCenter();
      rafId = window.requestAnimationFrame(animate);
    }

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <canvas ref={bgCanvasRef} className="absolute inset-0 h-full w-full" />
      <canvas ref={entityCanvasRef} className="absolute inset-0 h-full w-full mix-blend-screen" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_0%,rgba(4,8,14,0.24)_38%,rgba(2,4,8,0.84)_74%,rgba(1,3,6,1)_100%)]" />
      <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#020407] via-[#020407]/70 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-[#020407] via-[#020407]/76 to-transparent" />
    </div>
  );
}
