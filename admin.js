let products =
JSON.parse(localStorage.getItem("products")) || [];

let analytics =
JSON.parse(localStorage.getItem("analytics")) || {
visits:0,
views:{},
sales:{}
};

analytics.visits++;

localStorage.setItem(
"analytics",
JSON.stringify(analytics)
);

function save(){

localStorage.setItem(
"products",
JSON.stringify(products)
);

}

function showTab(tab){

document.querySelectorAll(".tab")
.forEach(t=>t.classList.remove("active"));

document.getElementById(tab)
.classList.add("active");

}

function loadDashboard(){

products =
JSON.parse(localStorage.getItem("products")) || [];

document.getElementById("totalProducts")
.innerText = products.length;

const categories =
[...new Set(products.map(
p=>p.Category
))];

document.getElementById("totalCategories")
.innerText = categories.length;

let count={};

products.forEach(p=>{

count[p.Category] =
(count[p.Category]||0)+1;

});

let top="-";

if(Object.keys(count).length){

top =
Object.keys(count)
.reduce((a,b)=>
count[a]>count[b]?a:b
);

}

document.getElementById("topCategory")
.innerText = top;

}

function loadProducts(){

const box =
document.getElementById("productList");

box.innerHTML="";

products.forEach((p,index)=>{

box.innerHTML += `

<div class="item">

<img src="${p["Image Url"] || p.Image}">

<div>

<h3>${p.Name}</h3>

<p>$${Number(p.Price).toFixed(2)}</p>

<small>${p.Category}</small>

<br>

<button
class="delete-btn"
onclick="deleteProduct(${index})">
Delete
</button>

</div>

</div>

`;

});

}

function deleteProduct(index){

if(!confirm("Delete product?"))
return;

products.splice(index,1);

save();

refresh();

}

function deleteAllProducts(){

if(!confirm("Delete ALL products?"))
return;

products=[];

save();

refresh();

}

function loadCategories(){

let groups={};

products.forEach(p=>{

groups[p.Category] =
(groups[p.Category]||0)+1;

});

const box =
document.getElementById("categoryList");

box.innerHTML="";

for(let cat in groups){

box.innerHTML += `

<div class="cat-item">

<h3>${cat}</h3>

<p>${groups[cat]} products</p>

</div>

`;

}

}

function loadAnalytics(){

const box =
document.getElementById("analyticsBox");

let mostViewed="None";
let mostBought="None";

if(Object.keys(analytics.views).length){

mostViewed =
Object.keys(analytics.views)
.reduce((a,b)=>
analytics.views[a]>
analytics.views[b]
?a:b
);

}

if(Object.keys(analytics.sales).length){

mostBought =
Object.keys(analytics.sales)
.reduce((a,b)=>
analytics.sales[a]>
analytics.sales[b]
?a:b
);

}

let totalViews =
Object.values(
analytics.views
).reduce((a,b)=>a+b,0);

box.innerHTML = `

<div class="analytics-grid">

<div class="analytics-card">
<h3>Total Visits</h3>
<p>${analytics.visits}</p>
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

<div class="analytics-card">
<h3>Total Products</h3>
<p>${products.length}</p>
</div>

</div>

`;

}

function downloadTemplate(){

const template = [

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
XLSX.utils.json_to_sheet(template);

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

function exportProducts(){

const ws =
XLSX.utils.json_to_sheet(products);

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

function uploadExcel(){

const file =
document.getElementById("excelFile")
.files[0];

if(!file){

alert("Select Excel File");
return;

}

const reader =
new FileReader();

reader.onload=(e)=>{

const data =
new Uint8Array(
e.target.result
);

const workbook =
XLSX.read(data,{
type:"array"
});

const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];

products =
XLSX.utils.sheet_to_json(
sheet,
{defval:""}
);

products =
products.map(p=>({

...p,

Price:Number(
String(p.Price)
.replace("$","")
)

}));

save();

refresh();

alert(
products.length+
" products imported"
);

};

reader.readAsArrayBuffer(file);

}

function refresh(){

loadDashboard();
loadProducts();
loadCategories();
loadAnalytics();

}

refresh();
