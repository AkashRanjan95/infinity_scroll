const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// Unsplash API
const count = 30;
const apiKey = config.SECRET_API_KEY;
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check if all images were loaded
function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded == totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper function for setting attribute
function setAttributes(element, attributesObj) {
    for (const key in attributesObj) {
        element.setAttribute(key, attributesObj[key]);
    }
}

// Create elements for links & photos. add them to dom
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;
    // Run function for each object in photosarray
    photosArray.forEach((photo) => {
        // Create <a> to link to unsplash
        const item = document.createElement('a');
        setAttributes(item, {
                href: photo.links.html,
                target: '_blank'
            })
            // Create <img> for photos
        const img = document.createElement('img');
        setAttributes(img, {
                src: photo.urls.regular,
                alt: photo.description,
                title: photo.description
            })
            // Event listener, Check when each is finished loading
        img.addEventListener('load', imageLoaded())
            // Put img in item
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}
// Get photos from unsplash api
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
    } catch (error) {
        console.log("Here is the error..", error)
    }
}

// Check to see if scrolling near bottom of page
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
})

// On laod
getPhotos();