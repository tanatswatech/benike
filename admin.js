loadStats();

function uploadExcel(){

const file =
document.getElementById("excelFile").files[0];

if(!file){
alert("Choose Excel file");
return;
}

const reader = new FileReader();

reader.onload = function(e){

const data =
new Uint8Array(e.target.result);

const workbook =
XLSX.read(data,{type:"array"});

const sheet =
workbook.Sheets[
workbook.SheetNames[0]
];

const products =
XLSX.utils.sheet_to_json(
sheet,
{
defval:""
}
);

localStorage.setItem(
"products",
JSON.stringify(products)
);

alert(
products.length +
" products imported"
);

loadStats();
showProducts();

};

reader.readAsArrayBuffer(file);

}

function loadStats(){

const products =
JSON.parse(
localStorage.getItem("products")
) || [];

document.getElementById(
"totalProducts"
).innerText = products.length;

const categories =
new Set(
products.map(
p=>p.Category
)
);

document.getElementById(
"totalCategories"
).innerText =
categories.size;

}

function showProducts(){

const products =
JSON.parse(
localStorage.getItem("products")
) || [];

const container =
document.getElementById(
"previewContainer"
);

container.innerHTML="";

products.forEach(product=>{

container.innerHTML +=

`
<div class="product-preview">

<h3>${product.Name}</h3>

<p>$${product.Price}</p>

<p>${product.Category}</p>

</div>
`;

});

}

showProducts();
