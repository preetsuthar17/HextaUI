"use client";

import {
  useRef,
  useState,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";

interface SpotlightContextType {
  position: { x: number; y: number };
  isHovered: boolean;
  maskSize: number;
  isMoving: boolean;
  lastMoveTime: number;
}

const SpotlightContext = createContext<SpotlightContextType | null>(null);

export const useSpotlightPosition = () => {
  const context = useContext(SpotlightContext);
  return context;
};

export interface SpotlightMaskProps {
  children?: ReactNode;
  background?: ReactNode;
  overlay?: ReactNode;
  maskSize?: number;
  fadeSize?: number;
  className?: string;
  containerProps?: React.HTMLAttributes<HTMLDivElement>;
  backgroundProps?: React.HTMLAttributes<HTMLDivElement>;
  overlayProps?: React.HTMLAttributes<HTMLDivElement>;
  contentProps?: React.HTMLAttributes<HTMLDivElement>;
  transition?: string;
  onPositionChange?: (position: {
    x: number;
    y: number;
    isHovered: boolean;
  }) => void;
}

export const SpotlightMask = ({
  children,
  background,
  overlay,
  maskSize = 150,
  fadeSize = 50,
  className = "",
  containerProps = {},
  backgroundProps = {},
  overlayProps = {},
  contentProps = {},
  transition = "mask-image 0.3s ease-out, -webkit-mask-image 0.3s ease-out",
  onPositionChange,
}: SpotlightMaskProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [lastMoveTime, setLastMoveTime] = useState(0);
  const moveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (moveTimeoutRef.current) {
        clearTimeout(moveTimeoutRef.current);
      }
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const newPosition = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    setPosition(newPosition);
    setIsMoving(true);
    setLastMoveTime(Date.now());

    if (moveTimeoutRef.current) {
      clearTimeout(moveTimeoutRef.current);
    }

    moveTimeoutRef.current = setTimeout(() => {
      setIsMoving(false);
    }, 100);

    onPositionChange?.({ ...newPosition, isHovered });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    onPositionChange?.({ ...position, isHovered: true });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    onPositionChange?.({ ...position, isHovered: false });
  };

  const maskStyle = {
    maskImage: isHovered
      ? `radial-gradient(circle at ${position.x}px ${
          position.y
        }px, transparent 0px, transparent ${
          maskSize - fadeSize
        }px, black ${maskSize}px)`
      : `radial-gradient(circle at ${position.x}px ${position.y}px, black 0px)`,
    WebkitMaskImage: isHovered
      ? `radial-gradient(circle at ${position.x}px ${
          position.y
        }px, transparent 0px, transparent ${
          maskSize - fadeSize
        }px, black ${maskSize}px)`
      : `radial-gradient(circle at ${position.x}px ${position.y}px, black 0px)`,
    transition,
  };

  const { className: containerClassName = "", ...restContainerProps } =
    containerProps;
  const {
    className: backgroundClassName = "",
    style: backgroundStyle = {},
    ...restBackgroundProps
  } = backgroundProps;
  const {
    className: overlayClassName = "",
    style: overlayStyle = {},
    ...restOverlayProps
  } = overlayProps;
  const {
    className: contentClassName = "",
    style: contentStyle = {},
    ...restContentProps
  } = contentProps;
  return (
    <SpotlightContext.Provider
      value={{
        position,
        isHovered,
        maskSize,
        isMoving,
        lastMoveTime,
      }}
    >
      <div
        ref={containerRef}
        className={`relative overflow-hidden ${className} ${containerClassName}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...restContainerProps}
      >
        {background && (
          <div
            className={`absolute inset-0 w-full h-full ${backgroundClassName}`}
            style={backgroundStyle}
            {...restBackgroundProps}
          >
            {background}
          </div>
        )}

        {overlay && (
          <div
            className={`absolute inset-0 w-full h-full z-10 ${overlayClassName}`}
            style={{
              ...overlayStyle,
              ...maskStyle,
            }}
            {...restOverlayProps}
          >
            {overlay}
          </div>
        )}

        {/* Content Layer */}
        {children && (
          <div
            className={`relative z-30 [height:inherit] ${contentClassName}`}
            style={contentStyle}
            {...restContentProps}
          >
            {children}
          </div>
        )}
      </div>
    </SpotlightContext.Provider>
  );
};

export interface SimpleSpotlightMaskProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundColor?: string;
  overlayColor?: string;
  maskSize?: number;
  fadeSize?: number;
  className?: string;
  enableBlur?: boolean;
  blurAmount?: number;
  transition?: string;
}

export const SimpleSpotlightMask = ({
  children,
  backgroundImage,
  backgroundColor = "#1a1a1a",
  overlayColor = "rgba(0, 0, 0, 1)",
  maskSize = 150,
  fadeSize = 50,
  className = "",
  enableBlur = false,
  blurAmount = 4,
  transition,
}: SimpleSpotlightMaskProps) => {
  const backgroundComponent = backgroundImage ? (
    <div
      className="w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundColor,
        backgroundImage: `url(${backgroundImage})`,
      }}
    />
  ) : (
    <div className="w-full h-full" style={{ backgroundColor }} />
  );

  const overlayComponent = (
    <div
      className="w-full h-full"
      style={{
        backgroundColor: overlayColor,
        filter: enableBlur ? `blur(${blurAmount}px)` : undefined,
      }}
    />
  );

  return (
    <SpotlightMask
      background={backgroundComponent}
      overlay={overlayComponent}
      maskSize={maskSize}
      fadeSize={fadeSize}
      className={className}
      transition={transition}
      contentProps={{ className: "pointer-events-none" }}
    >
      {children}
    </SpotlightMask>
  );
};

export const SpotlightBackground = ({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`w-full h-full ${className}`} {...props}>
    {children}
  </div>
);

export const SpotlightOverlay = ({
  children,
  className = "",
  blur = false,
  blurAmount = 4,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  blur?: boolean;
  blurAmount?: number;
}) => (
  <div
    className={`w-full h-full ${className}`}
    style={{
      filter: blur ? `blur(${blurAmount}px)` : undefined,
      ...props.style,
    }}
    {...props}
  >
    {children}
  </div>
);
