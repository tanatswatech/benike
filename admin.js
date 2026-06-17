let products =
JSON.parse(localStorage.getItem("products")) || [];

let analytics =
JSON.parse(localStorage.getItem("analytics")) || {
visits: 0,
views: {},
sales: {}
};

/* ==========================
SAVE DATA
========================== */

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

/* ==========================
VISITS
========================== */

analytics.visits++;
saveAnalytics();

/* ==========================
TABS
========================== */

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

/* ==========================
DASHBOARD
========================== */

function loadDashboard(){

products =
JSON.parse(
localStorage.getItem("products")
) || [];

document.getElementById(
"totalProducts"
).innerText = products.length;

const categories =
[
...new Set(
products
.map(p => p.Category)
.filter(Boolean)
)
];

document.getElementById(
"totalCategories"
).innerText = categories.length;

let counts = {};

products.forEach(p => {

let cat =
p.Category || "Uncategorized";

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

/* ==========================
PRODUCTS
========================== */

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
background:#000;
padding:30px;
border-radius:15px;
text-align:center;
grid-column:1/-1;
">
No products uploaded.
</div>
`;

return;

}

products.forEach((p,index)=>{

const image =
p["Image Url"] ||
p.Image ||
"https://via.placeholder.com/400x300?text=No+Image";

const price =
Number(
String(p.Price || 0)
.replace("$","")
);

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
$${price.toFixed(2)}
</div>

<div class="product-category">
${p.Category || "Uncategorized"}
</div>

</div>

<div class="product-actions">

<button
class="delete-btn"
onclick="deleteProduct(${index})">
🗑 Delete </button>

</div>

</div>

`;

});

}

/* ==========================
DELETE PRODUCT
========================== */

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

/* ==========================
DELETE ALL
========================== */

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

/* ==========================
CATEGORIES
========================== */

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

<p>${groups[cat]} products</p>

</div>

`;

}

}

/* ==========================
ANALYTICS
========================== */

function loadAnalytics(){

const box =
document.getElementById(
"analyticsBox"
);

if(!box) return;

let mostViewed =
"None";

let mostBought =
"None";

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

if(
Object.keys(
analytics.sales
).length
){

mostBought =
Object.keys(
analytics.sales
)
.reduce((a,b)=>
analytics.sales[a] >
analytics.sales[b]
? a
: b
);

}

const totalViews =
Object.values(
analytics.views
)
.reduce(
(a,b)=>a+b,
0
);

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

<div class="analytics-card">
<h3>Most Bought Product</h3>
<p>${mostBought}</p>
</div>

</div>

`;

}

/* ==========================
TEMPLATE DOWNLOAD
========================== */

function downloadTemplate(){

const sample = [

{
"Product ID":"SKU001",
"Name":"Sample Product",
"Price":"29.99",
"Category":"Electronics",
"Image Url":"https://example.com/image.jpg",
"Specs":"Color: Black"
}

];

const ws =
XLSX.utils.json_to_sheet(sample);

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

/* ==========================
EXPORT PRODUCTS
========================== */

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

/* ==========================
IMPORT EXCEL
========================== */

function uploadExcel(){

const file =
document.getElementById(
"excelFile"
).files[0];

if(!file){

alert(
"Please select an Excel file."
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
products.map(p=>({

...p,

Price:Number(
String(p.Price || 0)
.replace("$","")
)

}));

saveProducts();

refresh();

alert(
products.length +
" products imported successfully."
);

}catch(err){

console.error(err);

alert(
"Failed to import Excel file."
);

}

};

reader.readAsArrayBuffer(
file
);

}

/* ==========================
REFRESH
========================== */

function refresh(){

products =
JSON.parse(
localStorage.getItem("products")
) || [];

loadDashboard();
loadProducts();
loadCategories();
loadAnalytics();

}

/* ==========================
INIT
========================== */

refresh();
