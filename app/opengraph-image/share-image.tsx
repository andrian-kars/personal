import { ImageResponse } from "next/og";
import { getContent } from "@/content";
import type { Locale } from "@/i18n/config";

export function shareImage(locale: Locale) {
  const { profile, ui } = getContent(locale);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        background: "#191b1b",
        color: "#f4f5f0",
        padding: "52px 68px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 23,
          color: "#adb7b4",
        }}
      >
        <div style={{ display: "flex", fontSize: 48, fontWeight: 700, color: "#f4f5f0" }}>
          ak<span style={{ color: "#ff8b80" }}>.</span>
        </div>
        <span>andrian-kars.com</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: 38,
          fontSize: 70,
          lineHeight: 1.1,
        }}
      >
        <span>{profile.firstName}</span>
        <span>{profile.lastName}</span>
      </div>
      <div style={{ display: "flex", fontSize: 30, marginTop: 26 }}>{profile.role}</div>
      <div
        style={{
          display: "flex",
          gap: 24,
          marginTop: 20,
          fontSize: 21,
          color: "#c6d0ca",
        }}
      >
        {profile.specialties.map((specialty, index) => (
          <span key={specialty} style={{ color: index === 0 ? "#ff8b80" : "#c6d0ca" }}>
            {specialty}
          </span>
        ))}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          borderTop: "1px solid #4d5951",
          paddingTop: 21,
          marginTop: "auto",
          fontSize: 21,
          color: "#adb7b4",
        }}
      >
        <span>
          {profile.experience} {ui.years} {ui.engineering}
        </span>
        <span>{profile.location}</span>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
