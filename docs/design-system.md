# **Stitch Design Prompt: High-Performance Media Converter**

**Role:** You are a Senior Product Designer specializing in developer-centric, high-utility interfaces.
**Task:** Design a web-based YouTube to MP3/MP4 downloader following the **Zed.dev** design system and "Sublime-esque" aesthetic.

---

### **1. Visual Identity & Design System (Zed-Inspired)**

- **Palette:** Use a deep, neutral-to-cool dark theme. Background: `#181818` (Base), `#1c1c1c` (Secondary/Panels). Accents: A single brand color (Zest Blue `#528bff` or Zed Mint `#98c379`) used sparingly for action buttons and progress bars.
- **Typography:** Use a clean, sans-serif for UI (e.g., Inter or Geist) and a high-quality Monospace (e.g., JetBrains Mono) for status codes, file sizes, and URLs.
- **Borders & Grids:** Everything must be strictly aligned to a 4px grid. Use subtle `1px` borders in `#333333` to separate panels. No heavy dropshadows; use slight elevation changes through color instead.
- **Components:** Buttons should have sharp or very small radius (2px) corners. Hover states should be a simple background-color shift.

---

### **2. Layout Structure**

- **The "Buffer" (Main View):** A central, wide input area. The URL input field should look like a command palette or a code editor line. Use a large font size for the URL input.
- **Sidebar (Activity Log):** A collapsible left or right sidebar showing "Recent Downloads" or "Active Queue," mimicking Zed’s file tree.
- **Status Bar (Bottom):** A slim bar at the bottom showing global stats: "Server Latency: 24ms," "Total Traffic," and "Current Format: MP3 (320kbps)."

---

### **3. Feature-Specific UI Elements**

- **The Input Area:** A prominent "Command Line" style input with a pulsing cursor. Include a dropdown for format selection (MP3, MP4) that looks like a code-completion menu.
- **Download Progress:** Instead of a standard rounded bar, use a flat, "line-buffer" style progress indicator that fills the bottom border of the active download item.
- **Settings Panel:** Use a "Key-Value" layout for settings (e.g., `Bitrate: 320kbps`, `Codec: H.264`). It should look like a JSON configuration file but with clickable toggles.

---

### **4. Interaction Design**

- **Micro-animations:** Transitions should be instant or "Snappy" (e.g., 100ms ease-in).
- **Feedback:** When a URL is pasted, the UI should immediately "parse" the link with a terminal-style output (e.g., `Fetching metadata... Success.`).
- **Empty State:** When no URL is present, show a minimalist "Search or Paste URL" command in the center, similar to a code editor's landing screen.

---

### **5. Technical Specifications for Stitch**

- **Responsiveness:** Desktop-first design. For mobile, stack the sidebar under the main buffer but maintain the "Pro Tool" density.
- **Accessibility:** Ensure a contrast ratio of at least 4.5:1. Focus states must be a high-visibility `2px` solid border in the accent color.
