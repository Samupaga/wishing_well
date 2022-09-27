async function getWishes() {

    // Reach out to server
    const response = await fetch(`http://localhost:3000/wishes`);

    // Return wish information 
    const wishes = await response.json();

    // Log data
    return wishes;

}

async function displayWishDetails() {
    
    // Obtain wish information 
    const wishes = await getWishes();

    // Make reference to wishlist
    const wishlist = document.getElementById('wishlist');

    // Loop through wishes
    for (let wish of wishes){

        const header = document.createElement("h3");
        const subject = document.createElement('p');

        header.textContent = wish['title']
        subject.textContent = wish["wish"];

        wishlist.appendChild(header);
        wishlist.appendChild(subject)
    }
    console.log(wishes)
}


async function makeAWish(e) {
    // Stop refresh on submission
    e.preventDefault();

    // Extract data into an object
    const data = {
        title : e.target.title.value,
        wish : e.target.wish.value
    }

    // Set fetch request options
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }, 
        body: JSON.stringify(data)
    }

    // Make a fetch request sending the data
    const response = await fetch('http://localhost:3000/wishes', options);

    if (response.status  === 201){
        alert('You have made your wish')
        window.location.reload();
    }

}


// make form for submission
const form = document.querySelector("#create-form");
form.addEventListener("submit", makeAWish);


displayWishDetails();
