/* ===================================
BENIKE PRODUCTS PAGE (FIXED)
=================================== */

const products =
JSON.parse(localStorage.getItem("products")) || [];

const analytics =
JSON.parse(localStorage.getItem("analytics")) || {
    visits:0,
    views:{},
    sales:{}
};

const container =
document.getElementById("productsContainer");

const params =
new URLSearchParams(window.location.search);

const selectedCategory =
params.get("category");

const searchQuery =
params.get("search");

let filteredProducts = [...products];

/* ===================================
GLOBAL IMAGE STATE
=================================== */

let currentImages = [];
let currentImageIndex = 0;

/* ===================================
CATEGORY FILTER
=================================== */

if(selectedCategory){

    filteredProducts =
    filteredProducts.filter(product=>{

        const category =
        (product.Category || "").toLowerCase();

        return category === selectedCategory.toLowerCase();

    });

}

/* ===================================
SEARCH FILTER (URL SEARCH)
=================================== */

if(searchQuery){

    filteredProducts =
    filteredProducts.filter(product=>{

        const name = (product.Name || "").toLowerCase();
        const category = (product.Category || "").toLowerCase();

        return (
            name.includes(searchQuery.toLowerCase()) ||
            category.includes(searchQuery.toLowerCase())
        );

    });

}

/* ===================================
RENDER PRODUCTS
=================================== */

function renderProducts(list){

    container.innerHTML = "";

    if(list.length === 0){

        container.innerHTML = `
        <div class="empty-state">
            No products found.
        </div>`;
        return;
    }

    list.forEach(product=>{

        const name = product.Name || "Unnamed Product";

        const image =
        product.Images?.[0] ||
        "https://via.placeholder.com/500x400?text=No+Image";

        const price = product.Price || "Contact Us";
        const category = product.Category || "General";

        container.innerHTML += `

        <div class="product-card">

            <img
            src="${image}"
            alt="${name}"
            onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'">

            <div class="card-content">

                <div class="product-category">${category}</div>

                <h3>${name}</h3>

                <div class="product-price">$${price}</div>

                <div class="product-actions">

                    <button class="view-btn"
                    onclick='openProduct(${JSON.stringify(product)})'>
                        <i class="fas fa-eye"></i>
                    </button>

                    <a class="buy-btn"
                    target="_blank"
                    href="https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}">
                        <i class="fab fa-whatsapp"></i> Order
                    </a>

                </div>

            </div>

        </div>

        `;

    });

}

/* ===================================
SEARCH INPUT
=================================== */

const searchInput =
document.getElementById("productSearch");

if(searchInput){

    searchInput.addEventListener("input", function(){

        const query = this.value.toLowerCase();

        const results = filteredProducts.filter(product=>{

            return (
                (product.Name || "").toLowerCase().includes(query) ||
                (product.Category || "").toLowerCase().includes(query)
            );

        });

        renderProducts(results);

    });

}

/* ===================================
OPEN PRODUCT MODAL (FIXED SLIDER)
=================================== */

function openProduct(product){

    const images =
    product.Images?.length
        ? product.Images
        : ["https://via.placeholder.com/500x400?text=No+Image"];

    currentImages = images;
    currentImageIndex = 0;

    const modalImage =
    document.getElementById("modalImage");

    modalImage.src = currentImages[0];

    document.getElementById("modalTitle").innerText = product.Name || "";
    document.getElementById("modalPrice").innerText = "$" + (product.Price || "0");
    document.getElementById("modalCategory").innerText = product.Category || "";
    document.getElementById("modalSpecs").innerText = product.Specs || "No specifications available.";
    document.getElementById("modalProductId").innerText = product["Product ID"] || "N/A";

    document.getElementById("modalWhatsapp").href =
    `https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(product.Name)}`;

    /* analytics */
    analytics.views[product.Name] =
    (analytics.views[product.Name] || 0) + 1;

    localStorage.setItem("analytics", JSON.stringify(analytics));

    /* auto slider */
    clearInterval(window.productSlider);

    window.productSlider = setInterval(()=>{
        nextImage();
    },3000);

    document.getElementById("productModal").style.display = "flex";
}

/* ===================================
NEXT / PREV IMAGE (GLOBAL)
=================================== */

function nextImage(){

    if(currentImages.length <= 1) return;

    currentImageIndex++;

    if(currentImageIndex >= currentImages.length){
        currentImageIndex = 0;
    }

    document.getElementById("modalImage").src =
    currentImages[currentImageIndex];
}

function prevImage(){

    if(currentImages.length <= 1) return;

    currentImageIndex--;

    if(currentImageIndex < 0){
        currentImageIndex = currentImages.length - 1;
    }

    document.getElementById("modalImage").src =
    currentImages[currentImageIndex];
}

/* ===================================
CLOSE MODAL
=================================== */

function closeProduct(){

    clearInterval(window.productSlider);

    document.getElementById("productModal").style.display = "none";
}

/* ===================================
CLICK OUTSIDE
=================================== */

window.onclick = function(e){

    const modal = document.getElementById("productModal");

    if(e.target === modal){
        closeProduct();
    }
};

/* ===================================
INIT
=================================== */

renderProducts(filteredProducts);
