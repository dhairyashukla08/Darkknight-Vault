import React, { useState } from "react";
import {
  LockOutlined,
  GithubOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  MailOutlined,
  RocketOutlined,
  SafetyOutlined,
  DollarOutlined,
  LineChartOutlined,
} from "@ant-design/icons";

const DarkknightFooter = () => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const currentYear = new Date().getFullYear();

  const features = [
    { icon: <SafetyOutlined />, label: "Secure" },
    { icon: <DollarOutlined />, label: "Smart" },
    { icon: <LineChartOutlined />, label: "Tracking" },
    { icon: <RocketOutlined />, label: "Fast" },
  ];

  const socialLinks = [
    { icon: <GithubOutlined />, label: "GitHub", url: "https://github.com/dhairyashukla08" },
    { icon: <LinkedinOutlined />, label: "LinkedIn", url: "https://www.linkedin.com/in/dhairya-shukla080803/" },
    
    {
      icon: <MailOutlined />,
      label: "Email",
      url: "mailto:dhairyvshukla@gmail.com",
    },
  ];

  return (
    <footer
      style={{
        background: "linear-gradient(180deg, #0a0a0a 0%, #000000 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "60px 40px 30px",
        position: "relative",
        overflow: "hidden",
        marginTop: "80px",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
          opacity: 0.3,
          animation: "gridScroll 30s linear infinite",
          pointerEvents: "none",
        }}
      ></div>

      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          width: "200px",
          height: "1px",
          background:
            "linear-gradient(90deg, transparent, #ffffff, transparent)",
          boxShadow: "0 0 20px rgba(255, 255, 255, 0.5)",
          animation: "glowPulse 3s ease-in-out infinite",
        }}
      ></div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "50px",
            marginBottom: "50px",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  width: "40px",
                  height: "40px",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
                  animation: "float 3s ease-in-out infinite",
                }}
              >
                <LockOutlined style={{ fontSize: "20px", color: "#000" }} />
              </div>
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.5rem",
                  fontWeight: "700",
                  background:
                    "linear-gradient(135deg, #ffffff 0%, #888888 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  letterSpacing: "1px",
                }}
              >
                DARKKNIGHT VAULT
              </h3>
            </div>
            <p
              style={{
                color: "rgba(255, 255, 255, 0.5)",
                fontSize: "0.9rem",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              Your fortress for financial freedom. Track, analyze, and secure
              your wealth with military-grade precision.
            </p>
          </div>

          <div>
            <h4
              style={{
                color: "#ffffff",
                fontSize: "0.875rem",
                fontWeight: "600",
                textTransform: "uppercase",
                letterSpacing: "2px",
                marginBottom: "20px",
                opacity: 0.7,
              }}
            >
              Core Features
            </h4>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "15px",
              }}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  style={{
                    padding: "12px",
                    background:
                      hoveredFeature === index
                        ? "rgba(255, 255, 255, 0.08)"
                        : "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    transform:
                      hoveredFeature === index
                        ? "translateY(-2px)"
                        : "translateY(0)",
                    boxShadow:
                      hoveredFeature === index
                        ? "0 4px 12px rgba(255, 255, 255, 0.1)"
                        : "none",
                  }}
                >
                  <div
                    style={{
                      fontSize: "18px",
                      color:
                        hoveredFeature === index
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.6)",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.85rem",
                      color:
                        hoveredFeature === index
                          ? "#ffffff"
                          : "rgba(255, 255, 255, 0.6)",
                      fontWeight: "500",
                      transition: "color 0.3s ease",
                    }}
                  >
                    {feature.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)",
            margin: "40px 0",
          }}
        ></div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
            }}
          >
            <p
              style={{
                margin: 0,
                color: "rgba(255, 255, 255, 0.4)",
                fontSize: "0.85rem",
                fontFamily: "monospace",
              }}
            >
              © {currentYear} DARKKNIGHT VAULT
            </p>
            <div
              style={{
                padding: "4px 12px",
                background: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "4px",
                fontSize: "0.75rem",
                color: "rgba(255, 255, 255, 0.6)",
                fontFamily: "monospace",
                letterSpacing: "1px",
              }}
            >
              v2.0.1
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "15px",
              alignItems: "center",
            }}
          >
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                aria-label={social.label}
                style={{
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "50%",
                  color: "rgba(255, 255, 255, 0.5)",
                  fontSize: "16px",
                  transition: "all 0.3s ease",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 12px rgba(255, 255, 255, 0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background =
                    "rgba(255, 255, 255, 0.03)";
                  e.currentTarget.style.color = "rgba(255, 255, 255, 0.5)";
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes gridScroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </footer>
  );
};

export default DarkknightFooter;
