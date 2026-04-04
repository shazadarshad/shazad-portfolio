import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Shazad Arshad — Student & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #f5f5fb 0%, #ede9fe 40%, #e0e7ff 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "#7c3aed",
              fontSize: "14px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 600,
            }}
          >
            Portfolio
          </span>
          <span
            style={{
              color: "#9496aa",
              fontSize: "14px",
              letterSpacing: "0.2em",
            }}
          >
            Colombo · Sri Lanka
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px" }}>
          <span
            style={{
              color: "#0f0f1a",
              fontSize: "130px",
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            SHAZAD
          </span>
          <span
            style={{
              color: "#7c3aed",
              fontSize: "130px",
              fontWeight: 800,
              lineHeight: 0.85,
              letterSpacing: "-0.04em",
            }}
          >
            ARSHAD
          </span>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <span
              style={{
                color: "#6366f1",
                fontSize: "16px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Student &amp; Developer
            </span>
            <span
              style={{
                color: "#9496aa",
                fontSize: "14px",
                letterSpacing: "0.08em",
              }}
            >
              React · Next.js · TypeScript · Node.js
            </span>
          </div>

          {/* SA monogram */}
          <div
            style={{
              background: "#7c3aed",
              border: "none",
              borderRadius: "12px",
              padding: "12px 22px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: "#ffffff",
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "0.15em",
              }}
            >
              SA
            </span>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
