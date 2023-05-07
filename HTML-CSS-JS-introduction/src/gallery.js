const detailsImageElement = document.querySelector(".details-img");
const detailsTitleElement = document.querySelector(".details-title");
const thumbnailsAncors = document.querySelectorAll(".thumbnails-ancor");
const detailsSectionElement = document.querySelector(".details-section");
const POINT_CLASS = "point";
const detailsSection = document.querySelector(".details-section");
const HIDDEN = "hidden";

for (let i = 0; i < thumbnailsAncors.length; i++) {
    thumbnailsAncors[i].addEventListener("click", function(){
        setDetails(thumbnailsAncors[i] );
    })
}
function setDetails (ancor) {
    showDetails();
    detailsImageElement.src = ancor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = ancor.getAttribute("data-details-text");
}

function showDetails() {
    detailsSection.classList.remove(HIDDEN);
    detailsSectionElement.classList.add(POINT_CLASS);
    setTimeout(function() {
     detailsSectionElement.classList.remove(POINT_CLASS);   
    })

}

function hideDetails() {
    detailsSection.classList.add(HIDDEN);
}