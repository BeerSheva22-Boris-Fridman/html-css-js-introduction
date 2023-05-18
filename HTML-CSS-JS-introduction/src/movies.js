import moviesObj from '../src/movies.json' assert {type: 'json'};
const thumbnailsListElement = document.querySelector(".thumbnails-list");
const detailsImageElement = document.querySelector(".details-img");
const detailsTitleElement = document.querySelector(".details-title");
const detailsSectionElement = document.querySelector(".details-section");
const POINT_CLASS = "point";
const detailsSection = document.querySelector(".details-section");
const HIDDEN = "hidden";

console.log(moviesObj.httpPrefix)


function getPictures() {
    let listItems = moviesObj.results.map((movie) => {
        const listItem =
        `<li class = "thumbnails-item">
        <a href="#" class="thumbnails-ancor"
        data-details-image="${moviesObj.httpPrefix + movie.poster_path}" data-details-text="${movie.overview.slice(0, 100)}">
        <img src="${moviesObj.httpPrefix + movie.poster_path}" class="thumbnails-img">
        <span class="thumbnails-title">${movie.original_title}</span>
        </a>
        </li>`
        return listItem;

    })
    return listItems.join('');
}

thumbnailsListElement.innerHTML = getPictures();
const thumbnailsAncors = document.querySelectorAll(".thumbnails-ancor");

thumbnailsAncors.forEach(ancor => ancor.addEventListener("click",
    setDetails.bind(undefined, ancor)));








// for (let i = 0; i < thumbnailsAncors.length; i++) {
//     thumbnailsAncors[i].addEventListener("click", function(){
//         setDetails(thumbnailsAncors[i] );
//     })
// }

// NEW 16/05/23 
thumbnailsAncors.forEach((anchor) =>
    anchor.addEventListener('click', setDetails.bind(undefined, anchor)));

function setDetails(ancor) {
    showDetails();
    detailsImageElement.src = ancor.getAttribute("data-details-image");
    detailsTitleElement.innerHTML = ancor.getAttribute("data-details-text");
}

function showDetails() {
    detailsSection.classList.remove(HIDDEN);
    detailsSectionElement.classList.add(POINT_CLASS);
    setTimeout(function () {
        detailsSectionElement.classList.remove(POINT_CLASS);
    })

}

function hideDetails() {
    detailsSection.classList.add(HIDDEN);
}

window.hideDetails = hideDetails;