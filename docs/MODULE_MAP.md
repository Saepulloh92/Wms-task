# Peta modul (otomatis dari kode; perbarui saat memindah fungsi)

Cari fitur di sini, buka **hanya satu file**. Semua chunk `NN-*.js` dijalankan berurutan dalam satu scope global (lihat `src/legacy/loader.js`), jadi fungsi/variabel di chunk mana pun bisa dipakai chunk berikutnya.

| File (`src/legacy/chunks/`) | Baris | Isi | Fungsi utama | Kunci localStorage |
|---|---|---|---|---|
| `00-demo-data.js` | 2 | DEMO_DATA kosong (tanpa data contoh) | – | – |
| `10-core.js` | 216 | Inti: penyimpanan (ld/sv), state global, util (fmt/esc/stat), toast, dialog ask | pinHash, supAuth, markInvalid, clearInvalid, toast, hideToast, ask, askType | warehouse_dc_v1<br>warehouse_so_backup_v1<br>warehouse_so_cfg_v1<br>warehouse_so_codefix_v1<br>warehouse_so_counts_v2<br>warehouse_so_master_v2<br>warehouse_so_tasks_v1<br>warehouse_so_users_v1 |
| `20-bins-sheet.js` | 119 | Daftar bin + lembar periksa | chipsHtml, renderBins, metrics, addLine, navTarget | – |
| `25-check-draft-undo.js` | 264 | Draft isian, buka/simpan sheet periksa, urungkan | draftNow, draftDrop, clearDrafts, wakeOn, wakeOff, open, close, choice, prev, save … | warehouse_so_draft_v1 |
| `30-review.js` | 93 | Review Supervisor | renderCheck, csvOut | – |
| `35-adjust.js` | 139 | File Adjust | adjustRows, renderAdj, outRows | – |
| `40-import.js` | 170 | Impor data WMS (CSV/XLSX) | parseCSV, ingest | – |
| `45-nav.js` | 180 | Navigasi go(), menu samping, initAll | go, shTryClose, initAll | warehouse_so_view_v1 |
| `50-kesesuaian.js` | 226 | Cek Kesesuaian | kesIssues, kesAdj, kCard, renderKesHist, kesAreas, kesAuto, kesGroups, kTable, renderKes, kText | warehouse_so_dest_v1<br>warehouse_so_kes_hist_v1 |
| `55-muat.js` | 356 | Laporan Muat | muPersist, muRestore, muAuto, renderMuHist, muSaveHist, mISO, muRows, mParse, mSet, mBuild | warehouse_so_muat_data_v1<br>warehouse_so_muat_hist_v1<br>warehouse_so_muat_sum_v1 |
| `60-users.js` | 433 | Petugas, area, hak akses menu, navigasi bawah | navPicks, migrateUsers, applySession, applyRole, loginUi, lgSel, lgGo, logout, resetAllPins, areaStat … | warehouse_so_closed_v1<br>warehouse_so_curuser_v1<br>warehouse_so_me_v1<br>warehouse_so_nav_v1<br>warehouse_so_users_v1 |
| `65-kpi.js` | 11 | KPI Area | – | – |
| `70-dc.js` | 466 | DC Harian + pilih item DC | dcItems, dcSt, renderDc, dcAddRow, dcUpd, dcOpen, dcHide, dcClose, dcSave, dcAdj … | warehouse_dc_pick_v1<br>warehouse_dc_v1 |
| `75-nav-dialog.js` | 48 | Dialog atur navigasi bawah | navRender, navOpen | – |
| `80-clearing.js` | 488 | Clearing (Voucher vs counting) | clrAct, clrIdx, clrShiftOf, clrParseRep, clrParseCnt, clrBuild, renderClr, clrFetch, clrReadFile, clrRekap … | warehouse_so_clr_cnt_v1<br>warehouse_so_clr_done_v1<br>warehouse_so_clr_hist_v1<br>warehouse_so_clr_rep_v1<br>warehouse_so_clr_v1 |
| `85-a11y-bin-nav.js` | 174 | Aksesibilitas + navigasi bin + input | navTo, holdStep | – |
| `88-backup.js` | 175 | Cadangan & peringatan penyimpanan | stCheck, guardUi, doBackup, bkCheck, applyRestore | warehouse_so_dest_v1 |
| `90-telegram.js` | 252 | Telegram | outText, tgRun, tgChunks, tgSend, tgApi, tgPost, tgNote, tgFlush, tgBin, tgArea … | warehouse_so_tg_v1<br>warehouse_so_tgq_v1 |
| `92-monitoring.js` | 584 | Monitoring Kiriman / Beranda (dashboard KPI, tren, status, daftar wilayah) | monCSV, monBuild, monSumOf, monSnap, monDash, monTrendSvg, monDetail, monRender, monLoad … | warehouse_so_mon_v1<br>warehouse_so_monc_v1<br>warehouse_so_mong_v1<br>warehouse_so_monh_v1 |
| `95-tasks.js` | 210 | Tugas Bin | taskBadges, renderTaskBar, tkPick, renderTask, tkIngest | – |
| `97-bridge-links.js` | 9 | Jembatan: membuka state & helper legacy ke React lewat window.WMS (lihat src/legacy/bridge.js). | – | – |
| `76-menu-groups.js` | 50 | Menu samping bertingkat (accordion) | menuSync | – |
| `98-sync.js` | 339 | Sinkron Google Sheets (Apps Script) + start-up aplikasi | sySoon, syBuild, syMerge, syApply, syRefresh, syCall, syRun, syPoll, netUi, syUi | warehouse_so_dest_v1<br>warehouse_so_sync_v1<br>warehouse_so_view_v1 |
| `patch-v18-display.js` | 32 | Tampilan lapangan + scan label rak (patch IIFE, dijalankan setelah chunk utama) | – | warehouse_so_disp_v1 |
| `patch-v19-beep-net.js` | 61 | Bip + pita status jaringan (patch IIFE, dijalankan setelah chunk utama) | – | warehouse_so_disp_v1 |
| `patch-v20-numpad.js` | 87 | Papan angka cari bin (patch IIFE, dijalankan setelah chunk utama) | – | – |
| `patch-v21-calm.js` | 31 | Layar petugas lebih sepi (patch IIFE, dijalankan setelah chunk utama) | – | – |
| `patch-v22-clr-done.js` | 35 | Tandai selesai per voucher (Clearing) (patch IIFE, dijalankan setelah chunk utama) | – | – |

## Menu → markup → logika

| Menu (id) | Markup (`src/markup/views/`) | Logika | Status |
|---|---|---|---|
| so — Periksa Bin | so.html + dialogs/sheet.html | 20-bins-sheet (filter rak berakhiran A/B: rakLv, rf; klik chip di 45-nav), 25-check-draft-undo | legacy |
| dc — DC Harian | dc.html + dialogs/dcSheet, dcPickSheet | 70-dc | legacy |
| check — Review Supervisor | check.html | 30-review | legacy |
| adj — File Adjust | adj.html | 35-adjust | legacy |
| task — Tugas Bin | task.html | 95-tasks | legacy |
| kes — Cek Kesesuaian | kes.html | 50-kesesuaian | legacy |
| muat — Laporan Muat | muat.html | 55-muat | legacy |
| usr — User & Area | usr.html + dialogs/navSet, login | 60-users, 75-nav-dialog | legacy |
| clr — Clearing | clr.html | 80-clearing + patch-v22 | legacy |
| **kpi — KPI Area** | (React) `src/views/KpiView.jsx` | `src/lib/kpi.js` | **React** |
| tg — Telegram | tg.html | 90-telegram | legacy |
| mon — Beranda | mon.html | 92-monitoring | legacy |
| data — Data WMS | data.html | 40-import, 88-backup, 98-sync | legacy |

Header/menu samping/navigasi bawah: `src/markup/{header,side,tabs}.html` + `45-nav.js`, `60-users.js`. Patch tampilan lapangan, bip, papan angka: `patch-*.js`.
| agi — Aging Stock | (React) | `src/views/AgingView.jsx`, logika murni `src/lib/aging.js`, uji `tests/aging.mjs`, CSS `11-aging.css` | React. Dasbor sinyal aging per area + kelas pipa + ceklis rak (pengganti kertas). State dimiliki legacy `94-aging.js` (aging, agingCls, agingCfg) dan ikut sinkron + cadangan. Kunci: warehouse_so_aging_v1 (cek fisik per rak), warehouse_so_agcls_v1 (kelas per kode item), warehouse_so_agingcfg_v1 (nama petugas per kelas); _area_v1 = pilihan area per perangkat (tidak disinkron). Server: sheet `Aging_Stock` dan `Aging_Rekap` (gas/50-sheets-core.gs). Uji: tests/aging.mjs, tests/aging-sync.mjs. |
