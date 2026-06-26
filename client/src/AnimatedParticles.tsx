export default function AnimatedParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        viewBox="0 0 1200 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Animated particles */}
        <circle
          cx="200"
          cy="150"
          r="3"
          fill="rgba(255, 203, 1, 0.6)"
          filter="url(#glow)"
          className="animate-float1"
        />
        <circle
          cx="900"
          cy="400"
          r="2"
          fill="rgba(255, 203, 1, 0.4)"
          filter="url(#glow)"
          className="animate-float2"
        />
        <circle
          cx="400"
          cy="500"
          r="2.5"
          fill="rgba(255, 203, 1, 0.5)"
          filter="url(#glow)"
          className="animate-float3"
        />

        {/* Pulsing circles */}
        <circle
          cx="100"
          cy="100"
          r="2"
          fill="none"
          stroke="rgba(255, 203, 1, 0.3)"
          strokeWidth="1"
          className="animate-pulse1"
        />
        <circle
          cx="1000"
          cy="300"
          r="1.5"
          fill="none"
          stroke="rgba(255, 203, 1, 0.3)"
          strokeWidth="1"
          className="animate-pulse2"
        />
        <circle
          cx="600"
          cy="550"
          r="2.5"
          fill="none"
          stroke="rgba(255, 203, 1, 0.3)"
          strokeWidth="1"
          className="animate-pulse3"
        />
      </svg>

      <style>{`
        @keyframes float1 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.3;
          }
          50% {
            transform: translate(50px, -50px);
            opacity: 0.8;
          }
        }

        @keyframes float2 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.2;
          }
          50% {
            transform: translate(-40px, 60px);
            opacity: 0.6;
          }
        }

        @keyframes float3 {
          0%, 100% {
            transform: translate(0, 0);
            opacity: 0.25;
          }
          50% {
            transform: translate(80px, 30px);
            opacity: 0.7;
          }
        }

        @keyframes pulse1 {
          0%, 100% {
            r: 2px;
          }
          50% {
            r: 4px;
          }
        }

        @keyframes pulse2 {
          0%, 100% {
            r: 1.5px;
          }
          50% {
            r: 3px;
          }
        }

        @keyframes pulse3 {
          0%, 100% {
            r: 2.5px;
          }
          50% {
            r: 5px;
          }
        }

        .animate-float1 {
          animation: float1 8s ease-in-out infinite;
        }

        .animate-float2 {
          animation: float2 10s ease-in-out infinite;
        }

        .animate-float3 {
          animation: float3 12s ease-in-out infinite;
        }

        .animate-pulse1 {
          animation: pulse1 4s ease-in-out infinite;
        }

        .animate-pulse2 {
          animation: pulse2 5s ease-in-out infinite;
        }

        .animate-pulse3 {
          animation: pulse3 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
