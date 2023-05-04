const detailsImageElement = document.querySelector(".details-img");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAncors = document.querySelectorAll(".thumbnails-ancor");
for (let i = 0; i < thumbnailsAncors.length; i++) {
    thumbnailsAncors[i].addEventListener("click", function(){
        setDetails(thumbnailsAncors[i] );
    })
}
function setDetails (ancor) {
    detailsImageElement.src = ancor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = ancor.getAttribute("data-details-text");
}