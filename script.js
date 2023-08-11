document.addEventListener("DOMContentLoaded", function () {

    let hadithDisplay = document.querySelector("#hadith")
    let hadiths = []; // An array to store the fetched hadiths
    let currentHadithIndex = 0; // Index of the currently displayed hadith
    let apiUrl = "https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$3ltemfRCbiFE3iHjY5R8AtHAFYbMhsWZbvCIV1fLmtIUSJOVH8bO";
    // Fetch hadiths and store them in the hadiths array
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        hadiths = data.hadiths.data; 
        displayHadith(currentHadithIndex); // Display the initial hadith
      })
      .catch(error => {
        console.log(error);
    });
    
    // Function to display a hadith at the given index
    function displayHadith(index) {
      if (hadiths[index]) {
        let hadith = hadiths[index];
        hadithDisplay.innerHTML = hadith.hadithArabic;
      } else {
        hadithDisplay.innerHTML = "No more hadiths to display";
      }
    }
    
    // Handle click event to cycle through hadiths
    hadithDisplay.addEventListener("click", () => {
      currentHadithIndex = (currentHadithIndex + 1) % hadiths.length;
      displayHadith(currentHadithIndex);
    });

    const API_KEY = "6BcD1tfLZitGOlG64XXDD2bbddwBV4bmPSh6DbxHdD4";
    const API_URL = `https://api.unsplash.com/photos/random/?query=nature&client_id=${API_KEY}`;

    async function fetchBackgroundImage() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            return data.urls.regular;
        } catch (error) {
            console.error("Error fetching background image:", error);
            return null;
        }
    }

    async function setRandomBackground() {
        const imageUrl = await fetchBackgroundImage();
        if (imageUrl) {
            document.documentElement.style.backgroundImage = `url('${imageUrl}')`;
        }
    }

    setRandomBackground();

    
});
    