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

    // Make reference to wish-list
    const wishList = document.getElementById('wishlist');

    // Loop through wishes
    for (let wish of wishes){

        const elem = document.createElement('li');

        elem.texContent = wish["wish"];

        wishList.appendChild(elem);
    }
    console.log(wishes)
}

displayWishDetails();
