// Selecting DOM elements

const container = document.querySelector('.container');// Selects the element with class 'container'
const search = document.querySelector('.search-box button');//Selects the button inside element with class 'search-box'
const weatherBox = document.querySelector('.weather-box');// Selects the element with class 'weather-box'
const weatherDetails = document.querySelector('.weather-details');// Selects the element with class 'weather-details'
const error404 = document.querySelector('.not-found');// Selects the element with class 'not-found'

// Adding click event listener to the search button
search.addEventListener('click', () => {

    const APIKey = '91938a083062b2ecf316603beafecd9e'; // Retrieving OpenWeatherMap API key
    const city = document.querySelector('.search-box input').value;    // Retrieving city name input by user

    if (city === '')  // Check if city name is empty
        return;       // Exit function if city name is empty

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)      // Fetching weather data from OpenWeatherMap API
        .then(response => response.json())     // Convert response to JSON format
        .then(json => {
            // Handle API response data (json object)

             // Check if the city was not found
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');


             // Update weather information based on API response

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');
               
             // Update weather icon based on weather condition
            switch (json.weather[0].main) {
                case 'Clear':
                    image.src = 'images/clear.jpg';
                    break;

                case 'Rain':
                    image.src = 'images/rain.png';
                    break;

                case 'Snow':
                    image.src = 'images/snow.png';
                    break;

                case 'Clouds':
                    image.src = 'images/cloud.png';
                    break;

                case 'Haze':
                    image.src = 'images/mist.png';
                    break;

                default:
                    image.src = '';
            }
              // Update temperature, description, humidity, and wind speed
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;
                // Display weatherBox and weatherDetails elements
            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';


        });


});

