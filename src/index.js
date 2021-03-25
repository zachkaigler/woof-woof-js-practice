// Stable Elements
let dogBarDiv = document.querySelector("div#dog-bar")
let dogInfoDiv = document.querySelector("div#dog-info")
let filterButton = document.querySelector("button#good-dog-filter")

// Elements that mutate based on dog click
let dogPictureImg = document.createElement("img")
let dogNameH2 = document.createElement("h2")
let dogButton = document.createElement("button")
let dogDomObj = {}

// Fetch dog objects
fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(function (dogsArray) {
        dogsArray.forEach(function(dog) {
            let dogNameSpan = document.createElement("span")
            dogNameSpan.innerText = dog.name
            dogBarDiv.append(dogNameSpan)

            dogNameSpan.addEventListener("click", function (event) {
                    dogPictureImg.src = dog.image
                    dogPictureImg.alt = dog.name
                    dogNameH2.innerText = dog.name
                    dogDomObj = dog

                if (dog.isGoodDog) {
                    dogButton.innerText = "Good Dog!"
                } else {
                    dogButton.innerText = "Bad Dog!"
                }

                dogInfoDiv.append(dogPictureImg, dogNameH2, dogButton)
            })
        })
    })

// Button toggle functionality
dogButton.addEventListener("click", function(event) {
    if (dogButton.innerText !== "Good Dog!") {
        dogButton.innerText = "Good Dog!"

        fetch(`http://localhost:3000/pups/${dogDomObj.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: true
            })
        })
    } else {
        dogButton.innerText = "Bad Dog!"

        fetch(`http://localhost:3000/pups/${dogDomObj.id}`, {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                isGoodDog: false
            })
        })
    }
})

// Filter button functionality
filterButton.addEventListener("click", function(event) {
    if (filterButton.innerText !== "Filter good dogs: OFF") {
        filterButton.innerText = "Filter good dogs: OFF"
        dogBarDiv.innerHTML = ""

        fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(function (dogsArray) {
                dogsArray.forEach(function(dog) {
                    let dogNameSpan = document.createElement("span")
                    dogNameSpan.innerText = dog.name
                    dogBarDiv.append(dogNameSpan)

                    dogNameSpan.addEventListener("click", function (event) {
                            dogPictureImg.src = dog.image
                            dogPictureImg.alt = dog.name
                            dogNameH2.innerText = dog.name
                            dogDomObj = dog

                        if (dog.isGoodDog) {
                            dogButton.innerText = "Good Dog!"
                        } else {
                            dogButton.innerText = "Bad Dog!"
                        }

                        dogInfoDiv.append(dogPictureImg, dogNameH2, dogButton)
                    })
                })
            })
    } else {
        filterButton.innerText = "Filter good dogs: ON"
        dogBarDiv.innerHTML = ""
        fetch("http://localhost:3000/pups")
            .then(resp => resp.json())
            .then(function (dogsArray) {
                dogsArray.forEach(function(dog) {
                    if (dog.isGoodDog) {
                        let dogNameSpan = document.createElement("span")
                        dogNameSpan.innerText = dog.name
                        dogBarDiv.append(dogNameSpan)

                        dogNameSpan.addEventListener("click", function (event) {
                                dogPictureImg.src = dog.image
                                dogPictureImg.alt = dog.name
                                dogNameH2.innerText = dog.name
                                dogDomObj = dog

                            if (dog.isGoodDog) {
                                dogButton.innerText = "Good Dog!"
                            } else {
                                dogButton.innerText = "Bad Dog!"
                            }

                            dogInfoDiv.append(dogPictureImg, dogNameH2, dogButton)
                        })
                    }
                })
            })
    }
})