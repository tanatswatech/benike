/* ===================================
   BENIKE PRODUCT SYSTEM
=================================== */

/* Default products */

const defaultProducts = [

{
Name:"Samsung Galaxy A16",
Price:"180",
Category:"phones",
Image:"https://images.pexels.com/photos/19152408/pexels-photo-19152408/free-photo-of-back-of-red-smartphone.jpeg"
},

{
Name:"HP Laptop",
Price:"450",
Category:"laptops",
Image:"https://img.freepik.com/premium-photo/red-laptop-computer-with-geometric-abstract-design-screen-against-red-background-laptop-screen-red-background_939992-11163.jpg?w=360"
},

{
Name:"Starlink Standard Kit",
Price:"Contact Us",
Category:"starlink",
Image:"https://cdn11.bigcommerce.com/s-de2pt6jzk5/images/stencil/1280x1280/products/15819/23656/4692_PCI_Starlink_Mini_Hard_Wire_Power_Cable_with_Step_up_Converter_4__42820.1752271825.jpg"
},

{
Name:"Wireless Earbuds",
Price:"25",
Category:"audio",
Image:"https://cdn2.37left.lk/images/anker-soundcore-r50i-nc-true-wireless-earbuds-30qPg9F7oCJU.webp"
},

{
Name:"Gaming Headset",
Price:"40",
Category:"gaming",
Image:"https://i.pinimg.com/236x/ea/12/8f/ea128fd2f5382845126eab99c547c365.jpg"
},

{
Name:"USB Hub",
Price:"15",
Category:"accessories",
Image:"https://img.freepik.com/premium-photo/red-black-gaming-accessories-dark-background_1346134-20367.jpg"
}

];

/* ===================================
   LOAD PRODUCTS
=================================== */

let products =
JSON.parse(localStorage.getItem("products")) || [];

if(products.length === 0){

products = defaultProducts;

}

/* ===================================
   PRODUCTS PAGE
=================================== */

const productsContainer =
document.getElementById("productsContainer");

if(productsContainer){

const params =
new URLSearchParams(window.location.search);

const selectedCategory =
params.get("category");

const pageTitle =
document.getElementById("pageTitle");

let filteredProducts = products;

if(selectedCategory){

filteredProducts = products.filter(product => {

const category =
(product.Category || product.category || "")
.toLowerCase();

return category ===
selectedCategory.toLowerCase();

});

if(pageTitle){

pageTitle.innerText =
selectedCategory.charAt(0).toUpperCase() +
selectedCategory.slice(1);

}

}else{

if(pageTitle){

pageTitle.innerText = "All Products";

}

}

productsContainer.innerHTML = "";

filteredProducts.forEach(product => {

const name =
product.Name || product.name;

const price =
product.Price || product.price;

const image =
product.Image || product.image;

productsContainer.innerHTML += `

<div class="product-card">

<img
src="${image}"
alt="${name}"
onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">

<h3>${name}</h3>

<p>${price}</p>

<a
href="https://wa.me/263784324361?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}"
class="buy-btn"
target="_blank">

WhatsApp Order

</a>

</div>

`;

});

}

/* ===================================
   HOMEPAGE FEATURED PRODUCTS
=================================== */

const featuredProducts =
document.getElementById("featuredProducts");

if(featuredProducts){

featuredProducts.innerHTML = "";

let usedCategories = [];

let selectedProducts = [];

products.forEach(product => {

const category =
(product.Category || product.category || "")
.toLowerCase();

if(
!usedCategories.includes(category)
&& selectedProducts.length < 6
){

selectedProducts.push(product);

usedCategories.push(category);

}

});

selectedProducts.forEach(product => {

const name =
product.Name || product.name;

const price =
product.Price || product.price;

const image =
product.Image || product.image;

featuredProducts.innerHTML += `

<div class="product-card">

<img
src="${image}"
alt="${name}"
onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">

<h3>${name}</h3>

<p>${price}</p>

<a
href="https://wa.me/263784324361?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}"
class="buy-btn"
target="_blank">

WhatsApp Order

</a>

</div>

`;

});

}

/* ===================================
   HERO SLIDER
=================================== */

const slides =
document.querySelectorAll(".slide");

const dots =
document.querySelectorAll(".dot");

if(slides.length > 0){

let current = 0;

setInterval(() => {

slides[current].classList.remove("active");

if(dots[current]){
dots[current].classList.remove("active-dot");
}

current++;

if(current >= slides.length){

current = 0;

}

slides[current].classList.add("active");

if(dots[current]){
dots[current].classList.add("active-dot");
}

},5000);

}
function openReels(videoIndex){

    const videos = [

        "https://www.youtube.com/embed/-voejkpMp-g?autoplay=1&mute=1",

        "https://www.youtube.com/embed/kqCOKYM0fyU?autoplay=1&mute=1",

        "https://www.youtube.com/embed/ZU9KL10gBNA?autoplay=1&mute=1",

        "https://www.youtube.com/embed/1llWP_8Y5YI?autoplay=1&mute=1"

    ];

    window.open(
        videos[videoIndex],
        "_blank"
    );

}
