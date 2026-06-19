const products =
JSON.parse(localStorage.getItem("products")) || [];

const analytics =
JSON.parse(localStorage.getItem("analytics")) || {
views:{}
};

const container =
document.getElementById("productsContainer");

const params =
new URLSearchParams(window.location.search);

const selectedCategory =
params.get("category");

let filteredProducts = [...products];

let currentImages = [];
let currentImageIndex = 0;


/* CATEGORY FILTER */

if(selectedCategory){

filteredProducts =
filteredProducts.filter(product=>{

const cat =
(product.Category || "")
.toLowerCase();

return cat ===
selectedCategory.toLowerCase();

});

}


/* SAVE ANALYTICS */

function saveAnalytics(){

localStorage.setItem(
"analytics",
JSON.stringify(analytics)
);

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

const image =
product.Image1 ||
product["Image Url"] ||
product.Image ||
"https://via.placeholder.com/500x400?text=No+Image";

container.innerHTML += `

<div class="product-card">

<img
src="${image}"
alt="${product.Name}"
onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'">

<div class="card-content">

<div class="product-category">
${product.Category || "General"}
</div>

<h3>
${product.Name || ""}
</h3>

<div class="product-price">
$${product.Price || 0}
</div>

<div class="product-actions">

<button
class="view-btn"
onclick='openProduct(${JSON.stringify(product)})'>

<i class="fas fa-eye"></i>

</button>

<a
class="buy-btn"
target="_blank"
href="https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(product.Name)}">

<i class="fab fa-whatsapp"></i>
Order

</a>

</div>

</div>

</div>

`;

});

}


/* PRODUCT POPUP */

function openProduct(product){

const productName =
product.Name || "";

analytics.views[productName] =
(analytics.views[productName] || 0) + 1;

saveAnalytics();

currentImages = [

product.Image1,
product.Image2,
product.Image3,
product.Image4

].filter(Boolean);

if(currentImages.length === 0){

currentImages = [
"https://via.placeholder.com/500x400?text=No+Image"
];

}

currentImageIndex = 0;

document.getElementById(
"modalImage"
).src = currentImages[0];

document.getElementById(
"modalTitle"
).innerText =
productName;

document.getElementById(
"modalPrice"
).innerText =
"$" + (product.Price || 0);

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
`https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(productName)}`;

document.getElementById(
"productModal"
).style.display =
"flex";

}


/* SLIDER */

function nextImage(){

currentImageIndex++;

if(
currentImageIndex >=
currentImages.length
){
currentImageIndex = 0;
}

document.getElementById(
"modalImage"
).src =
currentImages[currentImageIndex];

}

function prevImage(){

currentImageIndex--;

if(currentImageIndex < 0){

currentImageIndex =
currentImages.length - 1;

}

document.getElementById(
"modalImage"
).src =
currentImages[currentImageIndex];

}


/* CLOSE */

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


/* SEARCH */

const searchInput =
document.getElementById(
"productSearch"
);

if(searchInput){

searchInput.addEventListener(
"input",
function(){

const query =
this.value.toLowerCase();

const results =
filteredProducts.filter(p=>{

return (

(p.Name || "")
.toLowerCase()
.includes(query)

||

(p.Category || "")
.toLowerCase()
.includes(query)

||

(p.Specs || "")
.toLowerCase()
.includes(query)

);

});

renderProducts(results);

});

}

renderProducts(filteredProducts);
