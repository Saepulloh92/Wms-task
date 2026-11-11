// Jembatan React <-> kode legacy (chunk di src/legacy/chunks).
// - window.WMS     : state legacy (DATA, counts, ...) dipasang oleh chunk 97-bridge-links.js; emit() memberi tahu React.
// - window.WMSLib  : fungsi murni dari src/lib yang boleh dipakai kode legacy (agar tidak ada logika ganda).
import { useSyncExternalStore } from "react";
import * as format from "../lib/format.js";
import { kpiOf } from "../lib/kpi.js";
import { checklist, normSignal } from "../lib/aging.js";
import { healthCheck } from "../lib/health.js";
import { summarize as clrSummarize, fromHistRows as clrFromHist, trend as clrTrend } from "../lib/clearing-summary.js";

const listeners = new Set();
let version = 0;

export const WMS = (window.WMS = {
  emit() {
    version++;
    listeners.forEach((f) => f());
  },
  subscribe(f) {
    listeners.add(f);
    return () => listeners.delete(f);
  },
  getVersion: () => version,
});
window.WMSLib = { ...format, kpiOf, agingChecklist: checklist, normSignal, healthCheck, clrSummarize, clrFromHist, clrTrend };

/** Hook: komponen React re-render tiap legacy memanggil WMS.emit() (ganti view, sinkron selesai, dll). */
export function useWms() {
  useSyncExternalStore(WMS.subscribe, WMS.getVersion);
  return WMS;
}
