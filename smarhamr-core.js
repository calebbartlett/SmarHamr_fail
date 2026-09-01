/* ============================================================
   SmarHamr Core — Global State + Navigation
   ============================================================ */

// Global Dexie data (shared across modes)
window.dexieData = window.dexieData || null;

// Global filename (always a string)
window.currentFileName = 
    (typeof window.currentFileName === "string")
        ? window.currentFileName
        : "Scratch Dexie";

// Selected asset/table/row (mode-specific)
window.selectedAssetId = null;
window.selectedTableName = null;
window.selectedRowId = null;

/* ============================================================
   Mode Navigation
   ============================================================ */
function goCC() { window.location.href = "cc-mode.html"; }
function goWC() { window.location.href = "wc-mode.html"; }
function goDexie() { window.location.href = "dexie-editor.html"; }
