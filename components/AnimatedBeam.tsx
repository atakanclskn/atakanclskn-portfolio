import React, { useRef, useEffect, useState } from 'react';

export interface AnimatedBeamProps {
  containerRef: React.RefObject<HTMLDivElement>;
  fromRef: React.RefObject<HTMLDivElement>;
  toRef: React.RefObject<HTMLDivElement>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 3,
  delay = 0,
  pathColor = 'gray',
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = '#6366f1',
  gradientStopColor = '#8b5cf6',
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const [pathD, setPathD] = useState('');
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const updatePath = () => {
      if (!fromRef.current || !toRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
      const endX = toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
      const endY = toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

      const controlPointX = (startX + endX) / 2;
      const controlPointY = (startY + endY) / 2 + curvature;

      const d = `M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`;
      setPathD(d);
      setSvgDimensions({
        width: containerRect.width,
        height: containerRect.height,
      });
    };

    updatePath();

    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    return () => resizeObserver.disconnect();
  }, [containerRef, fromRef, toRef, curvature, startXOffset, startYOffset, endXOffset, endYOffset]);

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0"
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        fill="none"
      />
      <path
        ref={pathRef}
        d={pathD}
        stroke={`url(#${gradientId})`}
        strokeWidth={pathWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray="0 1"
        style={{
          strokeDashoffset: reverse ? 1 : 0,
          animation: `beam ${duration}s linear ${delay}s infinite`,
        }}
      />
      <style>{`
        @keyframes beam {
          0% {
            stroke-dashoffset: ${reverse ? 1 : 0};
            stroke-dasharray: 0 1;
          }
          50% {
            stroke-dasharray: 0.8 0.2;
          }
          100% {
            stroke-dashoffset: ${reverse ? 0 : 1};
            stroke-dasharray: 0 1;
          }
        }
      `}</style>
    </svg>
  );
};
