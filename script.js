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
            const photographerName = data.user.name;

            // Get the photographer's Unsplash username from the API response
            const unsplashUsername = data.user.username;
            // Create anchor elements for the photographer's name and Unsplash link
            const attributionElement = document.getElementById("attribution");
            const photographerLink = document.createElement("a");
            const unsplashLink = document.createElement("a");

            // Set the URLs for the links
            photographerLink.href = data.user.links.html;
            unsplashLink.href = `https://unsplash.com`;

            // Set the link texts
            photographerLink.textContent = photographerName;
            unsplashLink.textContent = "Unsplash";

            // Clear the previous content and append the links
            attributionElement.innerHTML = "";
            attributionElement.appendChild(document.createTextNode("Photo by "));
            attributionElement.appendChild(photographerLink);
            attributionElement.appendChild(document.createTextNode(" on "));
            attributionElement.appendChild(unsplashLink);
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


      // Fetch user's approximate location based on IP address
      async function fetchUserLocation() {
        try {
            const response = await fetch("https://ipinfo.io/json");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching user location:", error);
            return null;
        }
      }

      // Fetch prayer times using user's approximate location
      async function fetchPrayerTimesByLocation(location) {
        const { city, region, country, loc } = location;
        const [latitude, longitude] = loc.split(",");
        const apiUrl = `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2&school=1&city=${city}&region=${region}&country=${country}`;
        
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            return data.data.timings;
        } catch (error) {
            console.error("Error fetching prayer times:", error);
            return null;
        }
      }

      // Display prayer times using the user's approximate location
      async function displayPrayerTimesByLocation() {
        const userLocation = await fetchUserLocation();
        if (userLocation) {
            const prayerTimes = await fetchPrayerTimesByLocation(userLocation);
            if (prayerTimes) {
              document.getElementById("sunriseTime").textContent = prayerTimes.Sunrise;
              document.getElementById("fajrTime").textContent = prayerTimes.Fajr;
              document.getElementById("dhuhrTime").textContent = prayerTimes.Dhuhr;
              document.getElementById("asrTime").textContent = prayerTimes.Asr;
              document.getElementById("maghribTime").textContent = prayerTimes.Maghrib;
              document.getElementById("ishaTime").textContent = prayerTimes.Isha;
            }
        }
      }

      // Call the function to display prayer times based on user's approximate location
      displayPrayerTimesByLocation();
  
    

    // Toggle hadith language when the button is clicked
    toggleHadithButton.addEventListener("click", () => {
      if (hadithDisplay.innerHTML === hadiths[currentHadithIndex].hadithArabic) {
          hadithDisplay.innerHTML = hadiths[currentHadithIndex].hadithEnglish;
      } else {
          hadithDisplay.innerHTML = hadiths[currentHadithIndex].hadithArabic;
      }
    });

});
    