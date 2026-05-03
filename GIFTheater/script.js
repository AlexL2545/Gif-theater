console.log("hello");

const searchBarInput = document.querySelector("#searchBarInput");
const searchBtn = document.querySelector("#searchBtn");
const nextBtn = document.querySelector(".nextBtn");
const img = document.querySelector(".img");

// Store data first before making the changes between gifs
let currentGifIndex = 0;
let gifData = null;

searchBtn.addEventListener("click",(event)=>{
    const search = searchBarInput.value;
    getData(getURL(search));

})

nextBtn.addEventListener("click",(event)=>{
    console.log("nextBtn has been clicked");
    showNextGif();
})
function getURL(search){
    if (search.trim() != ""){
        const encodedSearch = encodeURIComponent(search);
        console.log("Searching for: ", search);
        // Calls Netlify function
        return `/.netlify/functions/giphy?q=${encodedSearch}`;
    }    
}

async function getData(giphyURL){
    try{
        // calls function endpoint
        const response = await fetch(giphyURL);
        // this waits for the fetched data to be converted to .json then stored into this variable
        const data = await response.json();
        // Stores the data and reset index for new search
        gifData = data.data;

        // this shows the first GIF
        if(gifData.length >0){
            img.src = gifData[currentGifIndex].images.original.url;
            console.log("Showing Gif: ", currentGifIndex +1, "of", gifData.length);
        }
    } catch(error){
        console.error("Error fetching data",error);
    }

}

// Search data for next gif
function showNextGif(){
    if(gifData && gifData.length> 0){
        // moves to next GIF, but will loop back to start if at end
        currentGifIndex = (currentGifIndex +1) % gifData.length;

        img.src = gifData[currentGifIndex].images.original.url;
        console.log("Showing GIF: ", currentGifIndex + 1, "of", gifData.length);
    }else{
        console.log("No GIFs available. Search mann");
    }
}

// Auto-search on startup
searchBtn.click();