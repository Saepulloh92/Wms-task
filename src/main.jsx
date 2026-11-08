import { createRoot } from "react-dom/client";
import { config } from "./config.js";
import "./legacy/bridge.js"; // memasang window.WMS dan window.WMSLib sebelum kode legacy jalan
import "./styles/01-base.css";
import "./styles/02-refinements.css";
import "./styles/03-users-qa-dc.css";
import "./styles/04-nav-bins-undo.css";
import "./styles/05-monitoring.css";
import "./styles/06-identity-outdoor.css";
import "./styles/07-tablet-lite.css";
import "./styles/08-menu-groups.css";
import "./styles/09-ux.css";
import "./styles/10-ux-polish.css";
import "./styles/11-aging.css";
import App from "./App.jsx";

window.WMS_CONFIG = config;
// Tema/tampilan lapangan harus terpasang sebelum render pertama (hindari kedip).
try {
  const d = JSON.parse(localStorage.getItem("warehouse_so_disp_v1") || "{}");
  if (d.out) document.documentElement.classList.add("outdoor");
  document.documentElement.style.setProperty("--ts", [1, 1.15, 1.3][d.ts] || 1);
} catch (e) {}

// Tanpa StrictMode: kode legacy hanya boleh di-boot satu kali.
createRoot(document.getElementById("root")).render(<App />);
