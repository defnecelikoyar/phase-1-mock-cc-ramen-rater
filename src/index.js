//CORE
//(1)- See all ramen images in the `div` with the id of `ramen-menu`. When the page
//  loads, request the data from the server to get all the ramen objects. Then,
//  display the image for each of the ramen using an `img` tag inside the
//  `#ramen-menu` div.
//(2) Click on an image from the `#ramen-menu` div and see all the info about that
//  ramen displayed inside the `#ramen-detail` div and where it says
//  `insert comment here` and `insert rating here`.
//(3) Create a new ramen after submitting the `new-ramen` form. The new ramen should be added to the`#ramen-menu` div.
// 1. submit new ramen (EventListener, submit)
// 2. add new ramen to ramen menu div (createElement, appendChild to ramen-menu)

document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.querySelector('div#ramen-menu')
    const ramenImage = document.querySelector('img.detail-image')
    const ramenName = document.querySelector('h2.name')
    const restaurant = document.querySelector('h3.restaurant')
    const ratingDisplay = document.querySelector('span#rating-display')
    const commentDisplay = document.querySelector('p#comment-display')

    fetch('http://localhost:3000/ramens')
    .then(resp => resp.json())
    .then(data => displayRamens(data));

    function displayRamens(ramens) {
        ramens.forEach((ramen) => {
            const navImg = document.createElement("img")
            navImg.src = ramen.image
            ramenMenu.appendChild(navImg)
            navImg.addEventListener('click', (e) => {
                ramenImage.src = ramen.image
                ramenName.textContent = ramen.name
                restaurant.textContent = ramen.restaurant
                ratingDisplay.textContent = ramen.rating
                commentDisplay.textContent = ramen.comment
            })
        })
    }

    const newRamenForm = document.querySelector('form#new-ramen')
    const newRamenName = document.querySelector('input#new-name')
    const newRamenRestaurant = document.querySelector('input#new-restaurant')
    const newRamenImage = document.querySelector('input#new-image')
    const newRamenRating = document.querySelector('input#new-rating')
    const newRamenComment = document.querySelector('textarea#new-comment')

    newRamenForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const newRamen = {
            name: newRamenName.value,
            restaurant: newRamenRestaurant.value,
            image: newRamenImage.value,
            rating: newRamenRating.value,
            comment: newRamenComment.value
        } 
        const newNavImg = document.createElement("img")
        newNavImg.src = newRamen.image
        ramenMenu.appendChild(newNavImg)
        newNavImg.addEventListener('click', (event) => {
            event.preventDefault()
            ramenImage.src = newRamen.image
            ramenName.textContent = newRamen.name
            restaurant.textContent = newRamen.restaurant
            ratingDisplay.textContent = newRamen.rating
            commentDisplay.textContent = newRamen.comment
        })
        newRamenForm.reset()
    })

})


