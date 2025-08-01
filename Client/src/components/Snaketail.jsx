import { useEffect, useRef, useState } from "react";

export default function Snaketail() {
  const trailLength = 40;
  const trailRefs = useRef([]);
  const trailPositions = useRef(Array(trailLength).fill({ x: 0, y: 0 }));
  const mouse = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    // Disable effect for small screens
    if (window.innerWidth < 640) {
      setEnabled(false);
      return;
    }

    const lerp = (start, end, t) => start + (end - start) * t;

    const handleMouseMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      // Update first dot to follow the cursor
      trailPositions.current[0] = {
        x: lerp(trailPositions.current[0].x, mouse.current.x, 0.3),
        y: lerp(trailPositions.current[0].y, mouse.current.y, 0.3),
      };

      // Update remaining dots
      for (let i = 1; i < trailLength; i++) {
        trailPositions.current[i] = {
          x: lerp(trailPositions.current[i].x, trailPositions.current[i - 1].x, 0.4),
          y: lerp(trailPositions.current[i].y, trailPositions.current[i - 1].y, 0.4),
        };
      }

      // Apply styles
      trailRefs.current.forEach((dot, i) => {
        if (dot) {
          const { x, y } = trailPositions.current[i];
          dot.style.left = `${x}px`;
          dot.style.top = `${y}px`;
        }
      });

      requestAnimationFrame(animate);
    };

    window.addEventListener("pointermove", handleMouseMove);
    requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("pointermove", handleMouseMove);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {Array.from({ length: trailLength }).map((_, i) => (
        <div
          key={i}
          ref={(el) => (trailRefs.current[i] = el)}
          className="fixed w-3 h-3 rounded-full pointer-events-none z-[9999]"
          style={{
            background: `rgba(255,255,255,${0.9 - i * 0.02})`,
            boxShadow: `0 0 ${5 - i * 0.1}px rgba(255,255,255,${0.3 - i * 0.005})`,
            transform: `translate(-50%, -50%) scale(${0.6 - i * 0.01})`,
            transition: `left 0.02s ease-out, top 0.02s ease-out`,
            mixBlendMode: "screen",
            backdropFilter: "blur(8px)",
          }}
        ></div>
      ))}
    </>
  );
}
