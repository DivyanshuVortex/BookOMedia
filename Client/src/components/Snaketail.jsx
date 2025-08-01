import { useEffect, useRef } from "react";

export default function Snaketail() {
  const trailLength = 50;
  const trailRefs = useRef([]);
  const trailPositions = useRef(Array(trailLength).fill({ x: 916, y: 557 , z: 456 }));
  const mouse = useRef({ x: 46, y: 40.5 , z: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // First dot follows the mouse
      trailPositions.current[0] = {
        x: lerp(trailPositions.current[0].x, mouse.current.x, 0.2),
        y: lerp(trailPositions.current[0].y, mouse.current.y, 0.2),
      };

      // Remaining dots follow the one before them
      for (let i = 1; i < trailLength; i++) {
        trailPositions.current[i] = {
          x: lerp(trailPositions.current[i].x, trailPositions.current[i - 1].x, 0.4),
          y: lerp(trailPositions.current[i].y, trailPositions.current[i - 1].y, 0.4),
        };
      }

      // Apply positions to the DOM
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          dot.style.left = `${trailPositions.current[i].x}px`;
          dot.style.top = `${trailPositions.current[i].y}px`
        }
      });

      requestAnimationFrame(animate);
    };

    const lerp = (start, end, t) => start + (end - start) * t;

    window.addEventListener("pointermove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => window.removeEventListener("pointermove", handleMouseMove);
  }, []);

  return (
    <>
      {Array.from({ length: trailLength }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed w-4 h-4 rounded-full bg-[rgba(255,255,255,0.9)]  bg-blend-hue backdrop-blur-2xl z-[9999] pointer-events-none hidden sm:grid"
          style={{
            transform: `translate(-50%, -50%) scale(${0.5 - i * 0.01})`,
            transition: `left 0.001s ease-in, top 0.001s linear`,
          }}
        ></div>
      ))}
    </>
  );
}
