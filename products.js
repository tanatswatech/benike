const products =
JSON.parse(localStorage.getItem("products")) || [];

const container =
document.getElementById("productsContainer");

const params =
new URLSearchParams(window.location.search);

const selectedCategory =
params.get("category");

let filteredProducts = products;

/* CATEGORY FILTER */

if(selectedCategory){

    filteredProducts = products.filter(product => {

        const cat =
        product.Category ||
        product.category ||
        "";

        return cat.toLowerCase() ===
        selectedCategory.toLowerCase();

    });

}

/* NO PRODUCTS */

if(filteredProducts.length === 0){

    container.innerHTML = `
        <div style="
            width:100%;
            text-align:center;
            padding:80px;
            color:white;
            font-size:22px;
        ">
            No products found.
        </div>
    `;

}

/* SHOW PRODUCTS */

filteredProducts.forEach(product => {

    const name =
    product.Name ||
    product.name ||
    "Unnamed Product";

    const image =
    product.Image ||
    product.image ||
    "https://via.placeholder.com/400x300?text=No+Image";

    const price =
    product.Price ||
    product.price ||
    product.Cost ||
    product.cost ||
    "Contact Us";

    const category =
    product.Category ||
    product.category ||
    "General";

    container.innerHTML += `

    <div class="product-card">

        <img src="${image}" alt="${name}">

        <h3>${name}</h3>

        <p>${price}</p>

        <div class="product-actions">

            <button
            class="view-btn"
            onclick="openProduct(
                '${name.replace(/'/g,"")}',
                '${image}',
                '${price}',
                '${category}'
            )">

                <i class="fas fa-eye"></i>

            </button>

            <a
            href="https://wa.me/263784324361?text=Hello Benike Technologies, I would like to order ${name}"
            class="buy-btn">

                Order

            </a>

        </div>

    </div>

    `;

});

/* MODAL FUNCTIONS */

function openProduct(name,image,price,category){

    document.getElementById("modalTitle").innerText =
    name;

    document.getElementById("modalImage").src =
    image;

    document.getElementById("modalPrice").innerText =
    price;

    document.getElementById("modalCategory").innerText =
    category;

    document.getElementById("productModal").style.display =
    "flex";

}

function closeProduct(){

    document.getElementById("productModal").style.display =
    "none";

}

/* CLOSE IF CLICK OUTSIDE */

window.onclick = function(e){

    const modal =
    document.getElementById("productModal");

    if(e.target === modal){

        modal.style.display = "none";

    }

}
