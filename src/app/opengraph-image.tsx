import { ImageResponse } from "next/og";

// OG card, designed in-system: paper bg, hairline frame, terminal readout,
// red only on the underscore and the availability dot. All JetBrains Mono —
// satori can't consume our General Sans woff2 (woff2 unsupported), and the
// all-mono card reads as the site's spec-sheet chrome anyway.

export const alt =
  "Ziedrick Ruen Giron — Senior UX Designer + Front-End Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

async function loadFont(weight: 400 | 600): Promise<ArrayBuffer> {
  const url = `https://cdn.jsdelivr.net/fontsource/fonts/jetbrains-mono@latest/latin-${weight}-normal.ttf`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Font fetch failed: ${url}`);
  return response.arrayBuffer();
}

export default async function OpenGraphImage() {
  const [regular, semibold] = await Promise.all([loadFont(400), loadFont(600)]);

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        backgroundColor: "#f4f3ef",
        padding: 28,
        fontFamily: "JetBrains Mono",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          border: "1px solid #dcdbd3",
          padding: "40px 48px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 26,
            color: "#0f0f0f",
          }}
        >
          <div style={{ display: "flex", fontWeight: 600 }}>
            zg<span style={{ color: "#e4322b" }}>_</span>
          </div>
          <div style={{ display: "flex", color: "#8a8a83", fontSize: 20 }}>
            [ portfolio — 2026 ]
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 24, color: "#8a8a83" }}>
            $ whoami
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 76,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              color: "#0f0f0f",
            }}
          >
            Ziedrick Ruen Giron
            <span style={{ color: "#e4322b" }}>_</span>
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 30,
              color: "#0f0f0f",
            }}
          >
            Senior UX Designer + Front-End Engineer
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 12,
              fontSize: 24,
              color: "#8a8a83",
            }}
          >
            17 yrs · design system → shipped code
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#8a8a83",
          }}
        >
          <div style={{ display: "flex" }}>MNL 14°35′N 120°59′E</div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                display: "flex",
                width: 10,
                height: 10,
                borderRadius: 10,
                backgroundColor: "#e4322b",
              }}
            />
            [ available for select work ]
          </div>
        </div>
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "JetBrains Mono", data: regular, weight: 400 },
        { name: "JetBrains Mono", data: semibold, weight: 600 },
      ],
    },
  );
}
