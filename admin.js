let products = JSON.parse(localStorage.getItem("products")) || [];

/* =========================
   SAVE PRODUCTS
========================= */
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
   DASHBOARD
========================= */
function loadDashboard() {

    products = JSON.parse(localStorage.getItem("products")) || [];

    document.getElementById("totalProducts").innerText = products.length;

    const categories = [
        ...new Set(
            products
            .map(p => p.Category)
            .filter(Boolean)
        )
    ];

    document.getElementById("totalCategories").innerText =
        categories.length;

    let count = {};

    products.forEach(p => {

        const cat = p.Category || "Uncategorized";

        count[cat] = (count[cat] || 0) + 1;

    });

    let top = "None";

    if (Object.keys(count).length > 0) {

        top = Object.keys(count).reduce((a, b) =>
            count[a] > count[b] ? a : b
        );

    }

    document.getElementById("topCategory").innerText = top;
}

/* =========================
   PRODUCTS
========================= */
function loadProducts() {

    let box = document.getElementById("productList");

    if (!box) return;

    box.innerHTML = "";

    products.forEach(p => {

        box.innerHTML += `

        <div class="item">

            <img
                src="${p.Image || 'https://via.placeholder.com/100x100?text=No+Image'}"
                width="80"
                onerror="this.src='https://via.placeholder.com/100x100?text=No+Image'">

            <div>

                <h3>${p.Name || "No Name"}</h3>

                <p>$${p.Price || "Contact Us"}</p>

                <small>${p.Category || "Uncategorized"}</small>

            </div>

        </div>

        `;

    });
}

/* =========================
   CATEGORIES
========================= */
function loadCategories() {

    let box = document.getElementById("categoryList");

    if (!box) return;

    let groups = {};

    products.forEach(p => {

        const cat =
            p.Category || "Uncategorized";

        groups[cat] =
            (groups[cat] || 0) + 1;

    });

    box.innerHTML = "";

    for (let c in groups) {

        box.innerHTML += `

        <div class="cat-item">

            <h3>${c}</h3>

            <p>${groups[c]} products</p>

        </div>

        `;
    }
}

/* =========================
   ANALYTICS
========================= */
function loadAnalytics() {

    let box =
        document.getElementById("analyticsBox");

    if (!box) return;

    let total = products.length;

    let cats = [
        ...new Set(
            products
            .map(p => p.Category)
            .filter(Boolean)
        )
    ];

    box.innerHTML = `

        <h3>Total Products: ${total}</h3>

        <h3>Total Categories: ${cats.length}</h3>

    `;
}

/* =========================
   IMPORT EXCEL
========================= */
function uploadExcel() {

    const file =
        document.getElementById("excelFile").files[0];

    if (!file) {

        alert("Please select an Excel file");

        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {

        try {

            const data =
                new Uint8Array(e.target.result);

            const workbook =
                XLSX.read(data, {
                    type: "array"
                });

            const sheet =
                workbook.Sheets[
                    workbook.SheetNames[0]
                ];

            products =
                XLSX.utils.sheet_to_json(
                    sheet,
                    {
                        defval: ""
                    }
                );

            console.log(products);

            save();

            alert(
                products.length +
                " products imported successfully"
            );

            loadDashboard();
            loadProducts();
            loadCategories();
            loadAnalytics();

        } catch (error) {

            console.error(error);

            alert(
                "Failed to import Excel file."
            );
        }
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
