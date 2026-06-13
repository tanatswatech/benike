const products = [

{
name:"Samsung Galaxy A16",
price:"$180",
category:"phones",
image:"https://images.pexels.com/photos/19152408/pexels-photo-19152408/free-photo-of-back-of-red-smartphone.jpeg"
},

{
name:"iPhone 13",
price:"$550",
category:"phones",
image:"https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg"
},

{
name:"HP Laptop",
price:"$450",
category:"laptops",
image:"https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
},

{
name:"Lenovo ThinkPad",
price:"$500",
category:"laptops",
image:"https://images.unsplash.com/photo-1517336714739-489689fd1ca8"
},

{
name:"Starlink Standard Kit",
price:"Contact Us",
category:"starlink",
image:"https://cdn11.bigcommerce.com/s-de2pt6jzk5/images/stencil/1280x1280/products/15819/23656/4692_PCI_Starlink_Mini_Hard_Wire_Power_Cable_with_Step_up_Converter_4__42820.1752271825.jpg"
},

{
name:"Wireless Earbuds",
price:"$25",
category:"audio",
image:"https://cdn2.37left.lk/images/anker-soundcore-r50i-nc-true-wireless-earbuds-30qPg9F7oCJU.webp"
},

{
name:"Gaming Headset",
price:"$40",
category:"gaming",
image:"https://i.pinimg.com/236x/ea/12/8f/ea128fd2f5382845126eab99c547c365.jpg"
},

{
name:"USB Hub",
price:"$15",
category:"accessories",
image:"https://img.magnific.com/free-photo/fitness-gym-equipment-with-christmas-theme-decorations_23-2149564349.jpg"
}

];

const params = new URLSearchParams(window.location.search);

const selectedCategory = params.get("category");

const container = document.getElementById("productsContainer");

const title = document.getElementById("pageTitle");

let filteredProducts = products;

if(selectedCategory){

filteredProducts =
products.filter(product =>
product.category === selectedCategory
);

title.innerText =
selectedCategory.charAt(0).toUpperCase() +
selectedCategory.slice(1);

}

filteredProducts.forEach(product => {

container.innerHTML += `

<div class="product-card">

<img src="${product.image}">

<h3>${product.name}</h3>

<p>${product.price}</p>

<a
href="https://wa.me/263784324361?text=Hello Benike Technologies, I would like to order ${product.name}"
class="buy-btn">

WhatsApp Order

</a>

</div>

`;

});
