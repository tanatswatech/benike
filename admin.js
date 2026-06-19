/* ===================================
BENIKE ADMIN DASHBOARD
=================================== */

let products =
JSON.parse(localStorage.getItem("products")) || [];

let analytics =
JSON.parse(localStorage.getItem("analytics")) || {
visits:0,
views:{},
sales:{}
};

/* ===================================
SAVE DATA
=================================== */

function saveProducts(){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}

function saveAnalytics(){

localStorage.setItem(
"analytics",
JSON.stringify(analytics)
);

}

/* ===================================
VISITS
=================================== */

analytics.visits++;
saveAnalytics();

/* ===================================
TABS
=================================== */

function showTab(tab){

document
.querySelectorAll(".tab")
.forEach(t =>
t.classList.remove("active")
);

document
.getElementById(tab)
.classList.add("active");

}

/* ===================================
DASHBOARD
=================================== */

function loadDashboard(){

products =
JSON.parse(
localStorage.getItem("products")
) || [];

document.getElementById(
"totalProducts"
).innerText = products.length;

const categories = [
...new Set(
products
.map(p =>
p.Category ||
p.category
)
.filter(Boolean)
)
];

document.getElementById(
"totalCategories"
).innerText = categories.length;

let counts = {};

products.forEach(p=>{

const cat =
p.Category ||
p.category ||
"Uncategorized";

counts[cat] =
(counts[cat] || 0) + 1;

});

let top = "None";

if(Object.keys(counts).length){

top =
Object.keys(counts)
.reduce((a,b)=>
counts[a] > counts[b]
? a
: b
);

}

document.getElementById(
"topCategory"
).innerText = top;

}

/* ===================================
LOAD PRODUCTS
=================================== */

function loadProducts(){

const box =
document.getElementById(
"productList"
);

if(!box) return;

box.innerHTML = "";

if(products.length === 0){

box.innerHTML = `
<div style="
padding:30px;
text-align:center;
background:#111;
border-radius:15px;
">
No products uploaded.
</div>
`;

return;

}

products.forEach((p,index)=>{

const image =

p.Images?.[0] ||

p.Image1 ||

p.Image ||

p.image ||

"https://via.placeholder.com/400x300?text=No+Image";

box.innerHTML += `

<div class="item">

<img
src="${image}"
onerror="this.src='https://via.placeholder.com/400x300?text=No+Image'"
>

<div class="product-content">

<h3>
${p.Name || "Unnamed Product"}
</h3>

<div class="product-price">
${
p.Price ||
"Contact Us"
}
</div>

<div class="product-category">
${
p.Category ||
"Uncategorized"
}
</div>

</div>

<div class="product-actions">

<button
class="delete-btn"
onclick="deleteProduct(${index})">

🗑 Delete

</button>

</div>

</div>

`;

});

}

/* ===================================
DELETE PRODUCT
=================================== */

function deleteProduct(index){

if(
!confirm(
"Delete this product?"
)
) return;

products.splice(index,1);

saveProducts();

refresh();

}

/* ===================================
DELETE ALL PRODUCTS
=================================== */

function deleteAllProducts(){

if(
!confirm(
"Delete ALL products?"
)
) return;

products = [];

saveProducts();

refresh();

}

/* ===================================
LOAD CATEGORIES
=================================== */

function loadCategories(){

const box =
document.getElementById(
"categoryList"
);

if(!box) return;

let groups = {};

products.forEach(p=>{

const cat =
p.Category ||
"Uncategorized";

groups[cat] =
(groups[cat] || 0) + 1;

});

box.innerHTML = "";

for(let cat in groups){

box.innerHTML += `

<div class="cat-item">

<h3>${cat}</h3>

<p>${groups[cat]} Products</p>

</div>

`;

}

}

/* ===================================
LOAD ANALYTICS
=================================== */

function loadAnalytics(){

const box =
document.getElementById(
"analyticsBox"
);

if(!box) return;

let totalViews = 0;

for(let p in analytics.views){

totalViews +=
analytics.views[p];

}

let mostViewed = "None";

if(
Object.keys(
analytics.views
).length
){

mostViewed =
Object.keys(
analytics.views
)
.reduce((a,b)=>

analytics.views[a] >
analytics.views[b]

? a
: b

);

}

box.innerHTML = `

<div class="analytics-grid">

<div class="analytics-card">

<h3>Total Visits</h3>

<p>${analytics.visits}</p>

</div>

<div class="analytics-card">

<h3>Total Products</h3>

<p>${products.length}</p>

</div>

<div class="analytics-card">

<h3>Total Product Views</h3>

<p>${totalViews}</p>

</div>

<div class="analytics-card">

<h3>Most Viewed Product</h3>

<p>${mostViewed}</p>

</div>

</div>

<h2 style="
margin-top:30px;
margin-bottom:15px;
">
Product View Ranking
</h2>

`;

for(let p in analytics.views){

box.innerHTML += `

<div class="cat-item">

<h3>${p}</h3>

<p>${analytics.views[p]} Views</p>

</div>

`;

}

}

/* ===================================
DOWNLOAD TEMPLATE
=================================== */

function downloadTemplate(){

const sample = [

{

Name:"Samsung Galaxy A16",

Price:"180",

Category:"Phones",

Image1:"https://example.com/front.jpg",

Image2:"https://example.com/back.jpg",

Image3:"https://example.com/side.jpg",

Image4:""

}

];

const ws =
XLSX.utils.json_to_sheet(
sample
);

const wb =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Products"
);

XLSX.writeFile(
wb,
"Benike_Product_Template.xlsx"
);

}

/* ===================================
EXPORT PRODUCTS
=================================== */

function exportProducts(){

if(products.length === 0){

alert(
"No products available."
);

return;

}

const ws =
XLSX.utils.json_to_sheet(
products
);

const wb =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Products"
);

XLSX.writeFile(
wb,
"Benike_Products.xlsx"
);

}

/* ===================================
EXPORT ANALYTICS
=================================== */

function exportAnalytics(){

let rows = [];

for(let product in analytics.views){

rows.push({

Product: product,

Views:
analytics.views[product]

});

}

const ws =
XLSX.utils.json_to_sheet(
rows
);

const wb =
XLSX.utils.book_new();

XLSX.utils.book_append_sheet(
wb,
ws,
"Analytics"
);

XLSX.writeFile(
wb,
"Benike_Analytics.xlsx"
);

}

/* ===================================
IMPORT EXCEL
=================================== */

function uploadExcel(){

const file =
document.getElementById(
"excelFile"
).files[0];

if(!file){

alert(
"Select an Excel file."
);

return;

}

const reader =
new FileReader();

reader.onload =
function(e){

try{

const data =
new Uint8Array(
e.target.result
);

const workbook =
XLSX.read(
data,
{
type:"array"
}
);

const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];

products =
XLSX.utils.sheet_to_json(
sheet,
{
defval:""
}
);

products =
products.map(p => ({

Name:p.Name,

Price:p.Price,

Category:p.Category,

Images:[

p.Image1,
p.Image2,
p.Image3,
p.Image4

].filter(img=>img)

}));

saveProducts();

refresh();

alert(
products.length +
" products imported successfully."
);

}catch(error){

console.error(error);

alert(
"Failed to import Excel file."
);

}

};

reader.readAsArrayBuffer(
file
);

}

/* ===================================
REFRESH
=================================== */

function refresh(){

products =
JSON.parse(
localStorage.getItem(
"products"
)
) || [];

loadDashboard();
loadProducts();
loadCategories();
loadAnalytics();

}

/* ===================================
INIT
=================================== */

refresh();
