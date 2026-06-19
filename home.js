/* =========================
HERO SLIDER (FIXED + STABLE)
========================= */

document.addEventListener("DOMContentLoaded", function () {

    let slides = document.querySelectorAll(".slide");
    let dots = document.querySelectorAll(".dot");

    let current = 0;

    if (slides.length === 0) return;

    function showSlide(index) {

        slides.forEach((slide, i) => {
            slide.classList.remove("active");
            if (dots[i]) dots[i].classList.remove("active-dot");
        });

        if (slides[index]) slides[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active-dot");
    }

    function nextSlide() {
        current = (current + 1) % slides.length;
        showSlide(current);
    }

    // init
    showSlide(current);

    // safe interval (avoid multiple intervals stacking)
    setInterval(nextSlide, 5000);

});


/* =========================
SEARCH (SAFE + WORKING)
========================= */

function searchProducts(event) {

    if (event.key !== "Enter") return;

    const input = event.target.value.trim().toLowerCase();

    if (!input) return;

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
FEATURED PRODUCTS (SAFE)
========================= */

const featured = document.getElementById("featuredProducts");

if (featured) {

    const products = JSON.parse(localStorage.getItem("products")) || [];

    const latestProducts = products.slice(-6).reverse();

    if (latestProducts.length === 0) {

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
                        onerror="this.src='https://via.placeholder.com/300x250?text=No+Image'">

                    <h3>${name}</h3>

                    <p>${price}</p>

                    <a
                        href="https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}"
                        class="buy-btn"
                        target="_blank">
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

function openReels(index = 0) {

    const viewer = document.getElementById("reelsViewer");

    if (viewer) viewer.style.display = "block";

    const reels = document.querySelectorAll(".reel");

    reels.forEach((r, i) => {
        r.style.display = i === index ? "block" : "none";
    });
}

function closeReels() {

    const viewer = document.getElementById("reelsViewer");

    if (viewer) viewer.style.display = "none";
}


/* =========================
ADMIN SYSTEM (FIXED - NO DUPLICATES)
========================= */

const ADMIN_PASSWORD = "benike123";

const brandLogo =
    document.querySelector(".logo"); // FIX: use class, not missing ID

if (brandLogo) {

    brandLogo.addEventListener("dblclick", function () {

        const input = prompt("Enter Admin Password:");

        if (input === null) return;

        if (input === ADMIN_PASSWORD) {
            window.location.href = "admin.html";
        } else {
            alert("❌ Incorrect password. Access denied.");
        }
    });

    // backup trigger (5 clicks)
    let clicks = 0;
    let timer;

    brandLogo.addEventListener("click", function () {

        clicks++;

        clearTimeout(timer);

        timer = setTimeout(() => {
            clicks = 0;
        }, 800);

        if (clicks >= 5) {

            const input = prompt("Admin Password:");

            if (input === ADMIN_PASSWORD) {
                window.location.href = "admin.html";
            } else {
                alert("❌ Wrong password");
            }

            clicks = 0;
        }
    });
}


/* =========================
GLOBAL ERROR SAFETY
========================= */

window.addEventListener("error", function (e) {
    console.log("Handled error:", e.message);
});
