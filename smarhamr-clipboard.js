/* ============================================================
   SmarHamr Clipboard — Persistence + UI Control
   ============================================================ */

/* ------------------------------------------------------------
   Load clipboard state from localStorage
   ------------------------------------------------------------ */
function smarhamrLoadClipboard() {
    const text = localStorage.getItem("smarhamrClipboard") || "";
    const textEl = document.getElementById("clipboardText");
    if (textEl) textEl.value = text;

    const open = localStorage.getItem("smarhamrClipboardOpen") === "true";
    smarhamrSetClipboardOpen(open);
}

/* ------------------------------------------------------------
   Save clipboard text to localStorage
   ------------------------------------------------------------ */
function smarhamrSaveClipboard() {
    const textEl = document.getElementById("clipboardText");
    if (textEl) {
        localStorage.setItem("smarhamrClipboard", textEl.value);
    }
}

/* ------------------------------------------------------------
   Open/Close clipboard panel
   ------------------------------------------------------------ */
function smarhamrSetClipboardOpen(open) {
    const panel = document.getElementById("clipboardPanel");
    const toggle = document.getElementById("clipboardToggle");

    if (panel && toggle) {
        panel.style.display = open ? "block" : "none";
        toggle.textContent = open ? "< Hide" : "> Show";
    }

    localStorage.setItem("smarhamrClipboardOpen", open ? "true" : "false");
}

/* ------------------------------------------------------------
   Attach clipboard event listeners
   ------------------------------------------------------------ */
function smarhamrInitClipboardEvents() {
    const tab = document.getElementById("clipboardTab");
    const toggle = document.getElementById("clipboardToggle");
    const textEl = document.getElementById("clipboardText");

    if (tab) {
        tab.addEventListener("click", () => {
            const open = localStorage.getItem("smarhamrClipboardOpen") === "true";
            smarhamrSetClipboardOpen(!open);
        });
    }

    if (toggle) {
        toggle.addEventListener("click", () => {
            const open = localStorage.getItem("smarhamrClipboardOpen") === "true";
            smarhamrSetClipboardOpen(!open);
        });
    }

    if (textEl) {
        textEl.addEventListener("input", smarhamrSaveClipboard);
    }
}
