"use strict";

const PRODUCT_LIMIT = 50
const PRODUCT_API_ALL = `https://dummyjson.com/products?limit=${PRODUCT_LIMIT}`;
const PRODUCT_API_SEARCH = "https://dummyjson.com/products/search?q={query}"

function cloneTemplate(template) {
    return template.content.cloneNode(true);
}

function setImageSrc(img, src) {
    let loader = new Image();

    loader.onload = () => {
        img.src = src;
    };

    loader.onerror = () => {
        console.error(`Error during image loading: ${src}`);
    };

    loader.src = src;
}

function fillProductData(node, product, review_template) {
    node.querySelector("[data-brand]").textContent = product.brand;
    node.querySelector("[data-title]").textContent = product.title;
    node.querySelector("[data-price]").textContent = product.price;
    node.querySelector("[data-rating]").textContent = "*".repeat(
        Number(product.rating)
    );
    node.querySelector("[data-description]").textContent = product.description;

    node.querySelector("[data-thumbnail]").dataset.thumbnailUrl =
        product.thumbnail;
    node.querySelector("[data-thumbnail]").alt = product.title;

    for (let review of product.reviews) {
        let clone = cloneTemplate(review_template);
        fillReviewData(clone, review);
        pasteNode(node.querySelector("[data-reviews]"), clone);
    }

    return node;
}

function fillReviewData(node, review) {
    node.querySelector("[data-author]").textContent = review.reviewerName;
    node.querySelector("[data-rating]").textContent = "*".repeat(
        Number(review.rating)
    );
    node.querySelector("[data-comment]").textContent = review.comment;
}

function postInitProducts(product) {
    product.onclick = () => {
        product.scrollIntoView({ block: "start", behavior: "smooth" });
        let reviews = product.querySelector("[data-reviews]");
        
        if (reviews.classList.contains("hidden")) {
            reviews.classList.remove("hidden");
        } else {
            setTimeout(() => {
                reviews.classList.add("hidden");       
            }, 200)
        }

    }

    let thumbnail = product.querySelector("[data-thumbnail]");
    setImageSrc(thumbnail, thumbnail.dataset.thumbnailUrl)
    delete thumbnail.dataset.thumbnailUrl;
}

function pasteNode(container, node) {
    return container.appendChild(node);
}

async function fetchProducts(endpoint) {
    let response = await fetch(endpoint)

    if (!response.ok) {
        throw new Error(`Fetching products failed: ${response.statusText}`)
    }

    let data = await response.json()

    if (!data.products) {
        throw new Error("No products fetched")
    }
    
    return data.products;
}


window.onload = async () => {
    const PRODUCT_TEMPLATE = document.getElementById("product-template");
    const REVIEW_TEMPLATE = document.getElementById("review-template");
    const PRODUCT_CONTAINER = document.getElementById("product-list");
    
    const SEARCH_FILED = document.getElementById("search-field");
    const SEARCH_BTN = document.getElementById("search-btn");

    const LOADING = document.getElementById("loading");
    const ERROR = document.getElementById("error");

    async function loadProductsViaAPI(endpoint) {
        LOADING.classList.remove("hidden")
        ERROR.classList.add("hidden");
        PRODUCT_CONTAINER.innerHTML = ""
    
        try {
            let products_data = await fetchProducts(endpoint);

            if (products_data.length == 0) {
                throw new Error("No products found");
            }
    
            for (let product of products_data) {
                let clone = cloneTemplate(PRODUCT_TEMPLATE);
                fillProductData(clone, product, REVIEW_TEMPLATE);
                pasteNode(PRODUCT_CONTAINER, clone);
            }
    
            PRODUCT_CONTAINER.classList.remove("hidden");
    
            Array.from(PRODUCT_CONTAINER.children).map(postInitProducts)   
        } catch (error) {
            ERROR.classList.remove("hidden");
            console.error(`Error during fetching data: ${error}`);
        }
        finally {
            LOADING.classList.add("hidden")
        }
        
    }

    console.info("Window loaded");

    let blinker = document.getElementById("blinker");

    setInterval(() => {
        blinker.classList.toggle("invisible");
    }, 1000);

    SEARCH_BTN.onclick = SEARCH_FILED.onkeydown = (event) => {
        if (event.type == "keydown" && event.key != "Enter") {
            return;
        }

        let query = encodeURIComponent(SEARCH_FILED.value.trim());

        if (query == "") {
            loadProductsViaAPI(PRODUCT_API_ALL)
            return
        }
        
        loadProductsViaAPI(PRODUCT_API_SEARCH.replace("{query}", SEARCH_FILED.value.trim()))
    }

    loadProductsViaAPI(PRODUCT_API_ALL)

};
