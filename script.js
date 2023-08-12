document.addEventListener("DOMContentLoaded", function () {

    let hadithDisplay = document.querySelector("#hadith");
    let prevButton = document.querySelector("#prevButton");
    let nextButton = document.querySelector("#nextButton");
    let prevPageButton = document.querySelector("#prevPageButton");
    let nextPageButton = document.querySelector("#nextPageButton");
    let toggleHadithButton = document.querySelector("#toggleHadithButton");
    let hadiths = []; // An array to store the fetched hadiths
    let currentHadithIndex = 0; // Index of the currently displayed hadith
    let currentPage = 1; // Current page number
    let apiUrl = `https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$3ltemfRCbiFE3iHjY5R8AtHAFYbMhsWZbvCIV1fLmtIUSJOVH8bO&page=${currentPage}`;
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
    
    

    
    // Event listener for the "Previous Hadith" button
    prevButton.addEventListener("click", () => {
      if (currentHadithIndex > 0) {
        currentHadithIndex--;
        displayHadith(currentHadithIndex);
      }
    });

    // Event listener for the "Next Hadith" button
    nextButton.addEventListener("click", () => {
      if (currentHadithIndex < hadiths.length - 1) {
        currentHadithIndex++;
        displayHadith(currentHadithIndex);
      }
    });

    // Event listener for the "Previous Page" button
    prevPageButton.addEventListener("click", () => {
      if (currentPage > 1) {
        currentPage--;
        fetchHadiths();
      }
    });

    // Event listener for the "Next Page" button
    nextPageButton.addEventListener("click", () => {
      currentPage++;
      fetchHadiths();
    });

    // Function to fetch hadiths based on the current page
    function fetchHadiths() {
      console.log(currentPage)
      apiUrl = `https://www.hadithapi.com/public/api/hadiths?apiKey=$2y$10$3ltemfRCbiFE3iHjY5R8AtHAFYbMhsWZbvCIV1fLmtIUSJOVH8bO&page=${currentPage}`;
      fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
          hadiths = data.hadiths.data; 
          currentHadithIndex = 0; // Reset the index when fetching new page
          displayHadith(currentHadithIndex); // Display the first hadith of the new page
        })
        .catch(error => {
          console.log(error);
      });
      let pageNum = document.getElementById("page_num");
      pageNum.textContent = String(currentPage);
    }

    // Function to display a hadith at the given index
    function displayHadith(index) {
      if (hadiths[index]) {
        let hadith = hadiths[index];
        hadithDisplay.innerHTML = hadith.hadithArabic;
      } else {
        hadithDisplay.innerHTML = "No more hadiths to display";
      }

      let hadithNum = document.getElementById("hadith_num");
      hadithNum.textContent = String(index+1);
    }

    // generating random background images 

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

    // getting prayer times
    

    async function fetchPrayerTimes(latitude, longitude) {
        const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2&school=1&midnightMode=1`;
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.data.timings;
        } catch (error) {
            console.error("Error fetching prayer times:", error);
            return null;
        }
    }

    async function displayPrayerTimes() {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;
                const prayerTimes = await fetchPrayerTimes(latitude, longitude);
                if (prayerTimes) {
                    console.log("Prayer Times:", prayerTimes);
                    // Update the div with the prayer times data
                    document.getElementById("sunriseTime").textContent = prayerTimes.Sunrise;
                    document.getElementById("fajrTime").textContent = prayerTimes.Fajr;
                    document.getElementById("dhuhrTime").textContent = prayerTimes.Dhuhr;
                    document.getElementById("asrTime").textContent = prayerTimes.Asr;
                    document.getElementById("maghribTime").textContent = prayerTimes.Maghrib;
                    document.getElementById("ishaTime").textContent = prayerTimes.Isha;
                }
            }, (error) => {
                console.error("Error getting geolocation:", error);
            });
        } else {
            console.error("Geolocation is not supported in this browser.");
        }
    }

    displayPrayerTimes();

    // Toggle hadith language when the button is clicked
    toggleHadithButton.addEventListener("click", () => {
      if (hadithDisplay.innerHTML === hadiths[currentHadithIndex].hadithArabic) {
          hadithDisplay.innerHTML = hadiths[currentHadithIndex].hadithEnglish;
      } else {
          hadithDisplay.innerHTML = hadiths[currentHadithIndex].hadithArabic;
      }
    });

     

});
    