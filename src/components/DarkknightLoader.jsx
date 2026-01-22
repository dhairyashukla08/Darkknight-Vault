import React from 'react';

const DarkknightLoader = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated background grid */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite',
        opacity: 0.3
      }}></div>

      {/* Glowing orbs in background */}
      <div style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        top: '20%',
        left: '10%',
        animation: 'float 8s ease-in-out infinite',
        filter: 'blur(40px)'
      }}></div>
      
      <div style={{
        position: 'absolute',
        width: '250px',
        height: '250px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        bottom: '20%',
        right: '15%',
        animation: 'float 10s ease-in-out infinite reverse',
        filter: 'blur(40px)'
      }}></div>

      {/* Main loader container */}
      <div style={{
        position: 'relative',
        zIndex: 10
      }}>
        {/* Shield/Vault icon */}
        <div style={{
          position: 'relative',
          width: '120px',
          height: '120px',
          margin: '0 auto 30px',
        }}>
          {/* Outer rotating ring */}
          <div style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            border: '3px solid transparent',
            borderTopColor: '#ffffff',
            borderRightColor: '#ffffff',
            borderRadius: '50%',
            animation: 'spin 2s linear infinite',
            boxShadow: '0 0 20px rgba(255, 255, 255, 0.3)'
          }}></div>

          {/* Inner rotating ring */}
          <div style={{
            position: 'absolute',
            width: '80%',
            height: '80%',
            top: '10%',
            left: '10%',
            border: '2px solid transparent',
            borderBottomColor: '#888888',
            borderLeftColor: '#888888',
            borderRadius: '50%',
            animation: 'spin 1.5s linear infinite reverse',
            boxShadow: '0 0 15px rgba(255, 255, 255, 0.2)'
          }}></div>

          {/* Center vault icon */}
          <div style={{
            position: 'absolute',
            width: '50%',
            height: '50%',
            top: '25%',
            left: '25%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #1a1a1a 0%, #0a0a0a 100%)',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 0 30px rgba(255, 255, 255, 0.2), inset 0 0 20px rgba(0, 0, 0, 0.5)',
            animation: 'pulse 2s ease-in-out infinite'
          }}>
            <svg
              width="30"
              height="30"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
        </div>

        {/* Brand text */}
        <div style={{
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '2rem',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #ffffff 0%, #888888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            Darkknight Vault
          </h2>
        </div>

        {/* Loading bar */}
        <div style={{
          width: '280px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '2px',
          overflow: 'hidden',
          position: 'relative',
          margin: '0 auto 15px'
        }}>
          <div style={{
            position: 'absolute',
            height: '100%',
            width: '40%',
            background: 'linear-gradient(90deg, transparent, #ffffff, #cccccc, transparent)',
            animation: 'loadingBar 1.5s ease-in-out infinite',
            boxShadow: '0 0 10px #ffffff'
          }}></div>
        </div>

        {/* Status text */}
        <p style={{
          margin: 0,
          fontSize: '0.875rem',
          color: 'rgba(255, 255, 255, 0.4)',
          textAlign: 'center',
          fontWeight: '500',
          letterSpacing: '1px',
          textTransform: 'uppercase',
          animation: 'fadeIn 1s ease-out'
        }}>
          Initializing Secure Vault...
        </p>

        {/* Animated dots */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '15px'
        }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ffffff',
                animation: `dotPulse 1.4s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
              }}
            ></div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes loadingBar {
          0% { left: -40%; }
          100% { left: 100%; }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dotPulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.3);
            opacity: 1;
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(30px, -30px);
          }
          66% {
            transform: translate(-20px, 20px);
          }
        }

        @keyframes gridMove {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default DarkknightLoader;