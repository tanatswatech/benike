const products =
JSON.parse(localStorage.getItem("products")) || [];

const container =
document.getElementById("productsContainer");

const params =
new URLSearchParams(window.location.search);

const selectedCategory =
params.get("category");

let filteredProducts = [...products];

/* CATEGORY FILTER */

if(selectedCategory){

filteredProducts =
filteredProducts.filter(product => {

const category =
product.Category ||
product.category ||
"";

return category.toLowerCase() ===
selectedCategory.toLowerCase();

});

}

/* RENDER PRODUCTS */

function renderProducts(list){

container.innerHTML = "";

if(list.length === 0){

container.innerHTML = `

<div class="empty-state">

No products found.

</div>

`;

return;

}

list.forEach(product=>{

const name =
product.Name ||
"Unnamed Product";

const image =
product["Image Url"] ||
product.Image ||
"https://via.placeholder.com/500x400?text=No+Image";

const price =
Number(
String(product.Price || 0)
.replace("$","")
);

const category =
product.Category ||
"General";

const specs =
product.Specs ||
"No specifications available.";

const productId =
product["Product ID"] ||
"N/A";

container.innerHTML += `

<div class="product-card">

<img
src="${image}"
alt="${name}"
onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'">

<div class="card-content">

<div class="product-category">
${category}
</div>

<h3>${name}</h3>

<div class="product-price">
$${price.toFixed(2)}
</div>

<div class="product-actions">

<button
class="view-btn"
onclick='openProduct(
${JSON.stringify(product)}
)'>

<i class="fas fa-eye"></i>

</button>

<a
class="buy-btn"
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

/* SEARCH */

const searchInput =
document.getElementById("productSearch");

if(searchInput){

searchInput.addEventListener(
"input",
function(){

const query =
this.value.toLowerCase();

const results =
filteredProducts.filter(p=>{

const name =
(p.Name || "")
.toLowerCase();

const category =
(p.Category || "")
.toLowerCase();

const specs =
(p.Specs || "")
.toLowerCase();

return (
name.includes(query) ||
category.includes(query) ||
specs.includes(query)
);

});

renderProducts(results);

}
);

}

/* PRODUCT MODAL */

function openProduct(product){

const image =
product["Image Url"] ||
product.Image;

const price =
Number(
String(product.Price || 0)
.replace("$","")
);

document.getElementById(
"modalImage"
).src = image;

document.getElementById(
"modalTitle"
).innerText =
product.Name || "";

document.getElementById(
"modalPrice"
).innerText =
"$" + price.toFixed(2);

document.getElementById(
"modalCategory"
).innerText =
product.Category || "";

document.getElementById(
"modalSpecs"
).innerText =
product.Specs ||
"No specifications provided.";

document.getElementById(
"modalProductId"
).innerText =
product["Product ID"] ||
"N/A";

document.getElementById(
"modalWhatsapp"
).href =
`https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(product.Name)}`;

document.getElementById(
"productModal"
).style.display =
"flex";

}

function closeProduct(){

document.getElementById(
"productModal"
).style.display =
"none";

}

window.onclick = function(e){

const modal =
document.getElementById(
"productModal"
);

if(e.target === modal){

modal.style.display =
"none";

}

};

renderProducts(filteredProducts);
