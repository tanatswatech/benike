/* =========================
HERO SLIDER
========================= */

document.addEventListener("DOMContentLoaded", function(){

    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");

    let current = 0;

    if(slides.length){

        function showSlide(index){

            slides.forEach((slide,i)=>{

                slide.classList.remove("active");

                if(dots[i]){
                    dots[i].classList.remove("active-dot");
                }

            });

            slides[index].classList.add("active");

            if(dots[index]){
                dots[index].classList.add("active-dot");
            }

        }

        function nextSlide(){

            current++;

            if(current >= slides.length){
                current = 0;
            }

            showSlide(current);

        }

        showSlide(0);

        setInterval(nextSlide,5000);

    }

});


/* =========================
SEARCH
========================= */

const searchInput =
document.getElementById("searchInput");

if(searchInput){

    searchInput.addEventListener("keyup",function(e){

        if(e.key !== "Enter") return;

        const search =
        this.value.trim();

        if(!search) return;

        window.location.href =
        "products.html?search=" +
        encodeURIComponent(search);

    });

}


/* =========================
FEATURED PRODUCTS
========================= */

const featured =
document.getElementById("featuredProducts");

if(featured){

    const products =
    JSON.parse(localStorage.getItem("products")) || [];

    const latestProducts =
    products.slice(-6).reverse();

    if(latestProducts.length === 0){

        featured.innerHTML = `

        <p style="
        width:100%;
        text-align:center;
        color:#aaa;
        padding:30px;
        ">

        No products uploaded yet.

        </p>

        `;

    }else{

        latestProducts.forEach(product=>{

            const name =
            product.Name ||
            product.name ||
            "Unnamed Product";

            const image =
            product["Image Url"] ||
            product.Image ||
            product.image ||
            "https://via.placeholder.com/500x400?text=No+Image";

            const price =
            product.Price ||
            product.price ||
            "Contact Us";

            featured.innerHTML += `

            <div class="product-card">

                <img
                src="${image}"
                alt="${name}"
                onerror="this.src='https://via.placeholder.com/500x400?text=No+Image'">

                <h3>${name}</h3>

                <p>${price}</p>

                <div class="product-buttons">

                    <button
                    class="view-btn"
                    onclick='viewProduct(${JSON.stringify(product)})'>

                        <i class="fas fa-eye"></i>
                        View

                    </button>

                    <a
                    href="https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(name)}"
                    target="_blank"
                    class="buy-btn">

                        WhatsApp Order

                    </a>

                </div>

            </div>

            `;

        });

    }

}


/* =========================
PRODUCT VIEW MODAL
========================= */

function viewProduct(product){

    document.getElementById(
    "modalImage"
    ).src =
    product["Image Url"] ||
    product.Image ||
    product.image ||
    "";

    document.getElementById(
    "modalTitle"
    ).innerText =
    product.Name ||
    product.name ||
    "";

    document.getElementById(
    "modalPrice"
    ).innerText =
    "$" +
    (
        product.Price ||
        product.price ||
        "0"
    );

    document.getElementById(
    "modalSpecs"
    ).innerText =
    product.Specs ||
    "No specifications available.";

    document.getElementById(
    "modalOrderBtn"
    ).href =
    `https://wa.me/263787166281?text=Hello Benike Technologies, I would like to order ${encodeURIComponent(product.Name || product.name)}`;

    document.getElementById(
    "productModal"
    ).style.display =
    "flex";

}


function closeProductModal(){

    document.getElementById(
    "productModal"
    ).style.display =
    "none";

}


window.addEventListener("click",function(e){

    const modal =
    document.getElementById("productModal");

    if(e.target === modal){

        modal.style.display =
        "none";

    }

});


/* =========================
VIDEO PREVIEW AUTOPLAY
========================= */

const reelVideos =
document.querySelectorAll(".reel-video");

let currentVideo = 0;

function playNextVideo(){

    if(reelVideos.length === 0) return;

    reelVideos.forEach(video=>{

        video.pause();
        video.currentTime = 0;

    });

    reelVideos[currentVideo].play();

    reelVideos[currentVideo].onended = ()=>{

        currentVideo++;

        if(currentVideo >= reelVideos.length){
            currentVideo = 0;
        }

        playNextVideo();

    };

}

if(reelVideos.length){

    playNextVideo();

    reelVideos.forEach((video,index)=>{

        video.addEventListener("mouseenter",()=>{

            reelVideos.forEach(v=>v.pause());

            video.play();

            currentVideo = index;

        });

    });

}


/* =========================
REELS VIEWER
========================= */

function openReels(index=0){

    const viewer =
    document.getElementById("reelsViewer");

    viewer.style.display =
    "block";

    const reels =
    document.querySelectorAll(".reel");

    reels.forEach((reel,i)=>{

        reel.style.display =
        i === index
        ? "block"
        : "none";

    });

}


function closeReels(){

    document.getElementById(
    "reelsViewer"
    ).style.display =
    "none";

}


/* =========================
ADMIN ACCESS
========================= */

const ADMIN_PASSWORD =
"benike123";

const brandLogo =
document.querySelector(".logo");

if(brandLogo){

    brandLogo.addEventListener(
    "dblclick",
    function(){

        const password =
        prompt(
        "Enter Admin Password"
        );

        if(password === ADMIN_PASSWORD){

            window.location.href =
            "admin.html";

        }else if(password){

            alert(
            "Incorrect Password"
            );

        }

    });

}


/* =========================
ERROR SAFETY
========================= */

window.addEventListener(
"error",
function(e){

console.log(
"Handled Error:",
e.message
);

});
