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

    filteredProducts = products.filter(product=>{

        const cat =
        product.Category ||
        product.category ||
        "";

        return cat.toLowerCase() ===
        selectedCategory.toLowerCase();

    });

}

/* EMPTY */

if(filteredProducts.length === 0){

    container.innerHTML = `
    <div style="text-align:center;padding:50px;">
        No products found.
    </div>
    `;

}

/* SHOW PRODUCTS */

filteredProducts.forEach(product=>{

    const name =
    product.Name ||
    product.name ||
    "Unnamed Product";

    const image =
    product.Image ||
    product.image ||
    "https://via.placeholder.com/400";

    const price =
    product.Price ||
    product.price ||
    "Contact Us";

    container.innerHTML += `

    <div class="product-card">

        <img src="${image}">

        <div class="product-info">

            <h3>${name}</h3>

            <div class="product-price">
                ${price}
            </div>

            <div class="product-actions">

                <button
                class="view-btn"
                onclick="openProduct(
                    '${name}',
                    '${image}',
                    '${price}'
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

    </div>

    `;

});

/* MODAL */

function openProduct(name,image,price){

    document.getElementById("modalTitle").innerText =
    name;

    document.getElementById("modalImage").src =
    image;

    document.getElementById("modalPrice").innerText =
    price;

    document.getElementById("productModal")
    .style.display = "flex";

}

function closeProduct(){

    document.getElementById("productModal")
    .style.display = "none";

}
