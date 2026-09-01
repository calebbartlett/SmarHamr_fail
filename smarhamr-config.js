/* ============================================================
   SmarHamr Global Config (NO auto‑save, NO auto‑load)
   ============================================================ */

const SmarHamrConfig = {
    scratchFile: "dexie-scratch.json",
    exportPrefix: "smarhamr",
    exportExtension: "json.gz",
    timestampFormat: "YYYYMMDDhhmm",
    debugMode: false
};

/* ============================================================
   Timestamp helper
   ============================================================ */
function smarhamrTimestamp() {
    const now = new Date();
    return (
        now.getFullYear().toString() +
        String(now.getMonth() + 1).padStart(2, "0") +
        String(now.getDate()).padStart(2, "0") +
        String(now.getHours()).padStart(2, "0") +
        String(now.getMinutes()).padStart(2, "0")
    );
}

/* ============================================================
   Scratch Loader (NO auto‑save)
   ============================================================ */
async function smarhamrLoadScratch() {
    try {
        const res = await fetch(SmarHamrConfig.scratchFile);
        const data = await res.json();

        if (SmarHamrConfig.debugMode) console.log("Scratch loaded:", data);

        // DO NOT set global dexieData here.
        // Caller sets dexieData manually.
        return data;

    } catch (err) {
        console.error("Failed to load scratch Dexie:", err);
        throw err;
    }
}

/* ============================================================
   Export Loader (.json / .json.gz)
   ============================================================ */
function smarhamrLoadExport(file, callback) {
    const reader = new FileReader();
    const isGzip =
        file.name.endsWith(".gz") ||
        file.name.endsWith(".json.gz");

    if (isGzip) {
        reader.onload = e => {
            try {
                const binary = new Uint8Array(e.target.result);
                const decompressed = pako.ungzip(binary, { to: "string" });
                const data = JSON.parse(decompressed);

                if (SmarHamrConfig.debugMode) console.log("GZ export loaded:", data);

                callback(data);

            } catch (err) {
                alert("Invalid .json.gz export.");
                console.error(err);
            }
        };
        reader.readAsArrayBuffer(file);
        return;
    }

    reader.onload = e => {
        try {
            const data = JSON.parse(e.target.result);

            if (SmarHamrConfig.debugMode) console.log("JSON export loaded:", data);

            callback(data);

        } catch (err) {
            alert("Invalid JSON export.");
            console.error(err);
        }
    };
    reader.readAsText(file);
}

/* ============================================================
   Export (gzip)
   ============================================================ */
function smarhamrExport(prefix, data) {
    if (!data) {
        alert("No Dexie data loaded.");
        return;
    }

    const userPrefix = prefix && prefix.trim().length > 0
        ? prefix.trim()
        : SmarHamrConfig.exportPrefix;

    const timestamp = smarhamrTimestamp();
    const filename = `${userPrefix}.${SmarHamrConfig.exportPrefix}.${timestamp}.${SmarHamrConfig.exportExtension}`;

    const rawJson = JSON.stringify(data);
    const gzipped = pako.gzip(rawJson);

    const blob = new Blob([gzipped], { type: "application/gzip" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();

    URL.revokeObjectURL(url);
}

/* ============================================================
   Dexie Table Helpers
   ============================================================ */
function smarhamrGetRows(data, tableName) {
    if (!data || !data.data || !data.data.data) return [];
    const table = data.data.data.find(t => t.tableName === tableName);
    return table ? table.rows || [] : [];
}

function smarhamrSetRows(data, tableName, rows) {
    const table = data.data.data.find(t => t.tableName === tableName);
    if (table) table.rows = rows;
}

/* ============================================================
   UI helpers (top bar)
   ============================================================ */
function updateCurrentFileNameUI() {
    const el = document.getElementById("currentFileName");
    if (el && window.currentFileName) {
        el.textContent = window.currentFileName;
    }
}

function setActiveMode(mode) {
    document.querySelectorAll(".modeBtn").forEach(btn => btn.classList.remove("active"));
    const idMap = {
        cc: "ccModeBtn",
        wc: "wcModeBtn",
        de: "deModeBtn"
    };
    const el = document.getElementById(idMap[mode]);
    if (el) el.classList.add("active");
}
