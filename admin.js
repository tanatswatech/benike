let products = JSON.parse(localStorage.getItem("products")) || [];

function save() {
    localStorage.setItem("products", JSON.stringify(products));
}

/* =========================
   TAB SWITCHING
========================= */
function showTab(tab) {

    document.querySelectorAll(".tab")
    .forEach(t => t.classList.remove("active"));

    document.getElementById(tab).classList.add("active");

}

/* =========================
   LOAD DASHBOARD STATS
========================= */
function loadDashboard() {

    products = JSON.parse(localStorage.getItem("products")) || [];

    document.getElementById("totalProducts").innerText = products.length;

    const categories = [...new Set(products.map(p => p.Category))];

    document.getElementById("totalCategories").innerText = categories.length;

    /* TOP CATEGORY */
    let count = {};

    products.forEach(p => {
        count[p.Category] = (count[p.Category] || 0) + 1;
    });

    let top = Object.keys(count).reduce((a,b)=>
        count[a] > count[b] ? a : b
    , "-");

    document.getElementById("topCategory").innerText = top;

}

/* =========================
   SHOW PRODUCTS (REAL)
========================= */
function loadProducts() {

    let box = document.getElementById("productList");

    box.innerHTML = "";

    products.forEach((p,i)=>{

        box.innerHTML += `
        <div class="item">

            <img src="${p.Image}" width="80">

            <div>
                <h3>${p.Name}</h3>
                <p>$${p.Price}</p>
                <small>${p.Category}</small>
            </div>

        </div>
        `;

    });

}

/* =========================
   SHOW CATEGORIES (REAL)
========================= */
function loadCategories() {

    let box = document.getElementById("categoryList");

    let groups = {};

    products.forEach(p=>{
        groups[p.Category] = (groups[p.Category] || 0) + 1;
    });

    box.innerHTML = "";

    for(let c in groups){

        box.innerHTML += `
        <div class="cat-item">
            <h3>${c}</h3>
            <p>${groups[c]} products</p>
        </div>
        `;

    }

}

/* =========================
   ANALYTICS (DEMO REAL DATA)
========================= */
function loadAnalytics() {

    let box = document.getElementById("analyticsBox");

    let total = products.length;

    let cats = [...new Set(products.map(p=>p.Category))];

    box.innerHTML = `
        <h3>Total Products: ${total}</h3>
        <h3>Total Categories: ${cats.length}</h3>
    `;

}

/* =========================
   EXCEL UPLOAD (REAL IMPORT)
========================= */
function uploadExcel() {

    const file = document.getElementById("excelFile").files[0];

    if (!file) return alert("Select file");

    const reader = new FileReader();

    reader.onload = function(e) {

        const data = new Uint8Array(e.target.result);

        const workbook = XLSX.read(data, { type: "array" });

        const sheet = workbook.Sheets[workbook.SheetNames[0]];

        products = XLSX.utils.sheet_to_json(sheet, { defval: "" });

        save();

        alert("Imported " + products.length + " products");

        loadDashboard();
        loadProducts();
        loadCategories();
        loadAnalytics();

    };

    reader.readAsArrayBuffer(file);

}

/* =========================
   INIT
========================= */
loadDashboard();
loadProducts();
loadCategories();
loadAnalytics();
