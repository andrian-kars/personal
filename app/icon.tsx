import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        background: "#191b1b",
        color: "#f4f5f0",
        fontSize: 290,
        fontWeight: 700,
      }}
    >
      ak<span style={{ color: "#ff8b80" }}>.</span>
    </div>,
    size,
  );
}
