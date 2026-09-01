/* ============================================================
   SmarHamr UI — Shared UI Helpers
   ============================================================ */

/* ------------------------------------------------------------
   Safe DOM getter
   ------------------------------------------------------------ */
function smarhamrGet(id) {
    return document.getElementById(id) || null;
}

/* ------------------------------------------------------------
   Update filename in top bar
   ------------------------------------------------------------ */
function updateCurrentFileNameUI() {
    const el = smarhamrGet("currentFileName");

    if (!el) return;

    // Ensure filename is always a string
    if (typeof window.currentFileName !== "string") {
        window.currentFileName = "Scratch Dexie";
    }

    el.textContent = window.currentFileName;
}

/* ------------------------------------------------------------
   Highlight active mode button
   ------------------------------------------------------------ */
function smarhamrSetActiveMode(mode) {
    const cc = smarhamrGet("ccModeBtn");
    const wc = smarhamrGet("wcModeBtn");
    const de = smarhamrGet("deModeBtn");

    if (cc) cc.classList.remove("active");
    if (wc) wc.classList.remove("active");
    if (de) de.classList.remove("active");

    if (mode === "cc" && cc) cc.classList.add("active");
    if (mode === "wc" && wc) wc.classList.add("active");
    if (mode === "dexie" && de) de.classList.add("active");
}

/* ------------------------------------------------------------
   Initialize shared UI on page load
   ------------------------------------------------------------ */
function smarhamrInitUI(modeName) {
    updateCurrentFileNameUI();
    smarhamrSetActiveMode(modeName);
}
