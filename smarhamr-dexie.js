/* ============================================================
   SmarHamr Dexie Editor — Table + Row Editing Logic
   ============================================================ */

/* ------------------------------------------------------------
   Initialize Dexie Editor Mode
   ------------------------------------------------------------ */
function smarhamrInitDexie() {
    smarhamrInitUI("dexie");
    smarhamrLoadClipboard();
    smarhamrInitClipboardEvents();
    smarhamrRenderTables();
}

/* ------------------------------------------------------------
   Render Dexie Tables
   ------------------------------------------------------------ */
function smarhamrRenderTables() {
    const list = smarhamrGet("tableList");

    if (!window.dexieData) {
        list.innerHTML = "<p><em>No Dexie database loaded.</em></p>";
        return;
    }

    const tables = Object.keys(window.dexieData);

    list.innerHTML = "";
    tables.forEach(tableName => {
        const btn = document.createElement("button");
        btn.textContent = tableName;
        btn.onclick = () => smarhamrSelectTable(tableName);
        if (tableName === window.selectedTableName) btn.classList.add("active");
        list.appendChild(btn);
    });
}

/* ------------------------------------------------------------
   Select Table + Render Rows
   ------------------------------------------------------------ */
function smarhamrSelectTable(tableName) {
    window.selectedTableName = tableName;
    smarhamrHighlightTable();
    smarhamrRenderRows(tableName);
}

function smarhamrHighlightTable() {
    const list = smarhamrGet("tableList");
    Array.from(list.querySelectorAll("button")).forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent === window.selectedTableName) {
            btn.classList.add("active");
        }
    });
}

/* ------------------------------------------------------------
   Render Rows for Selected Table
   ------------------------------------------------------------ */
function smarhamrRenderRows(tableName) {
    const list = smarhamrGet("rowList");

    const rows = smarhamrGetRows(window.dexieData, tableName);
    if (!rows || !rows.length) {
        list.innerHTML = "<p><em>No rows to display.</em></p>";
        return;
    }

    list.innerHTML = "";
    rows.forEach(row => {
        const btn = document.createElement("button");
        btn.textContent = row.id !== undefined ? `Row #${row.id}` : "Row";
        btn.onclick = () => smarhamrSelectRow(row);
        if (row.id === window.selectedRowId) btn.classList.add("active");
        list.appendChild(btn);
    });
}

/* ------------------------------------------------------------
   Select Row + Populate JSON Editor
   ------------------------------------------------------------ */
function smarhamrSelectRow(row) {
    window.selectedRowId = row.id;
    smarhamrHighlightRow();

    const editor = smarhamrGet("rowJson");
    editor.value = JSON.stringify(row, null, 2);
}

function smarhamrHighlightRow() {
    const list = smarhamrGet("rowList");
    Array.from(list.querySelectorAll("button")).forEach(btn => {
        btn.classList.remove("active");
        if (btn.textContent.includes(`#${window.selectedRowId}`)) {
            btn.classList.add("active");
        }
    });
}

/* ------------------------------------------------------------
   Apply Row Edit (JSON → Dexie)
   ------------------------------------------------------------ */
function smarhamrApplyRowEdit() {
    if (!window.dexieData || !window.selectedTableName) return;

    const editor = smarhamrGet("rowJson");
    let parsed;

    try {
        parsed = JSON.parse(editor.value);
    } catch {
        alert("Invalid JSON — cannot apply row edit.");
        return;
    }

    const rows = smarhamrGetRows(window.dexieData, window.selectedTableName);

    const index = rows.findIndex(r => r.id === window.selectedRowId);
    if (index === -1) {
        alert("Row not found.");
        return;
    }

    rows[index] = parsed;

    smarhamrSetRows(window.dexieData, window.selectedTableName, rows);
    alert("Row updated.");
}

/* ------------------------------------------------------------
   Export Modified Dexie JSON
   ------------------------------------------------------------ */
function smarhamrExportModifiedDexie() {
    smarhamrExportDexie();
}
