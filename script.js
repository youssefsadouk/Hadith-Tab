document.addEventListener("DOMContentLoaded", function () {

    let hadithDisplay = document.querySelector("#hadith")
    let hadiths = []; // An array to store the fetched hadiths
    let currentHadithIndex = 0; // Index of the currently displayed hadith
    let apiUrl = "https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$3ltemfRCbiFE3iHjY5R8AtHAFYbMhsWZbvCIV1fLmtIUSJOVH8bO";
    // Fetch hadiths and store them in the hadiths array
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        hadiths = data.hadiths.data; // Assuming data.data contains the array of hadiths
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
    
});
    