/* =========================
HERO SLIDER
========================= */

let slides = document.querySelectorAll(".slide");
let dots = document.querySelectorAll(".dot");

let current = 0;

function showSlide(index){

    slides.forEach((slide, i) => {
        slide.classList.remove("active");
        if(dots[i]) dots[i].classList.remove("active-dot");
    });

    if(slides[index]) slides[index].classList.add("active");
    if(dots[index]) dots[index].classList.add("active-dot");

}

if(slides.length > 0){

    showSlide(current);

    setInterval(() => {

        current++;

        if(current >= slides.length){
            current = 0;
        }

        showSlide(current);

    }, 5000);

}

/* =========================
SEARCH (SAFE - NO CRASH)
========================= */

function searchProducts(event){

    if(event.key !== "Enter") return;

    const input = event.target.value.trim().toLowerCase();

    if(!input) return;

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const results = products.filter(p => {

        const name = (p.Name || p.name || "").toLowerCase();
        const category = (p.Category || p.category || "").toLowerCase();
        const specs = (p.Specs || "").toLowerCase();

        return (
            name.includes(input) ||
            category.includes(input) ||
            specs.includes(input)
        );

    });

    localStorage.setItem("searchResults", JSON.stringify(results));

    window.location.href = "products.html?search=active";

}

/* =========================
FEATURED PRODUCTS
========================= */

const featured = document.getElementById("featuredProducts");

if(featured){

    const products = JSON.parse(localStorage.getItem("products")) || [];

    // Take last 6 products safely
    const latestProducts = products.slice(-6).reverse();

    if(latestProducts.length === 0){

        featured.innerHTML = `
            <p style="text-align:center;width:100%;color:#aaa;">
                No products uploaded yet.
            </p>
        `;

    } else {

        latestProducts.forEach(product => {

            const name = product.Name || product.name || "Unnamed Product";
            const image = product.Image || product.image || "https://via.placeholder.com/300x250?text=No+Image";
            const price = product.Price || product.price || "Contact Us";

            featured.innerHTML += `
                <div class="product-card">

                    <img
                        src="${image}"
                        alt="${name}"
                        onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'"
                    >

                    <h3>${name}</h3>

                    <p>${price}</p>

                    <a
                        href="https://wa.me/263784324361?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}"
                        class="buy-btn"
                        target="_blank"
                    >
                        WhatsApp Order
                    </a>

                </div>
            `;

        });

    }

}

/* =========================
REELS CONTROL
========================= */

function openReels(index){

    const viewer = document.getElementById("reelsViewer");

    if(viewer){
        viewer.style.display = "block";
    }

    // optional: scroll to selected reel
    const reels = document.querySelectorAll(".reel");

    if(reels[index]){
        reels[index].scrollIntoView({ behavior: "smooth" });
    }

}

function closeReels(){

    const viewer = document.getElementById("reelsViewer");

    if(viewer){
        viewer.style.display = "none";
    }

}

/* =========================
GLOBAL SAFETY: PREVENT ERRORS
========================= */

window.addEventListener("error", function(e){
    console.log("Handled error:", e.message);
});

const brandLogo = document.getElementById("brandLogo");

// CHANGE THIS PASSWORD
const ADMIN_PASSWORD = "benike123";

if(brandLogo){

brandLogo.addEventListener("dblclick", function(){

const input = prompt("Enter Admin Password:");

if(input === null) return; // cancelled

if(input === ADMIN_PASSWORD){
    window.location.href = "admin.html";
} else {
    alert("❌ Incorrect password. Access denied.");
}

});

}
const ADMIN_PASSWORD = "benike123";

function openAdmin(){
    document.getElementById("adminModal").style.display = "flex";
}

function closeAdmin(){
    document.getElementById("adminModal").style.display = "none";
}

function checkAdmin(){

const input = document.getElementById("adminPassword").value;

if(input === ADMIN_PASSWORD){
    window.location.href = "admin.html";
} else {
    alert("❌ Wrong password");
}

}
