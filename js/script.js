// when the window loads, fetch('https://restcountries.com/v3/all')
// alphabetical order
// when flag clicked = show more info about the country in a floating window(flag, capital, population, side of the driving road)
// button to close that floating window
// <div id="countries-list"></div>
// sort method for alphabetical order (capitals or lower case matters also)

/*
<div id="popUp" class="popUp hidden">
    <button id="close">Close</button>
    <img id="flag" scr="" />
    <h3 id="name"></h3>
    <p><strong>Capital:</strong> <span id="popupCapital"></span></p>
    <p><strong>Population:</strong> <span id="popupPopulation"></span></p>
    <p><strong>Drives on:</strong> <span id="popupDriveSide"></span></p>
  </div>
*/


const url = 'https://restcountries.com/v3.1/all';
const listdiv = document.getElementById('countries-list');

// Popup elements
const popUp = document.getElementById('popUp');
const btnclose = document.getElementById('close');
const popimg = document.getElementById('flag');
const popname = document.getElementById('name');
const popcapital = document.getElementById('popupCapital');
const poppopulation = document.getElementById('popupPopulation');
const popdrive = document.getElementById('popupDriveSide');

function getFlags() {
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Problem loading data: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Sort countries alphabetically
      data.sort((a, b) => a.name.common.localeCompare(b.name.common));

      data.forEach((country) => {
        const li = document.createElement('li');
        const flagUrl = country.flags?.png ?? '';
        const countryName = country.name?.common ?? 'Unknown';

        li.innerHTML = `<img src="${flagUrl}" class="flag-img" /> ${countryName}`;

        const flagImg = li.querySelector(".flag-img"); //gets the first element with that class name (in this case we declared it previously)
        flagImg.addEventListener('click', () => {
          const capitalValue = country.capital?.[0] ?? 'No Capital'; //if country.capital exists, use its first item --> role of "?"; and then if it's null or undefined, it'll show 'No cpital' --> role of "??"
          const populationValue = country.population?.toLocaleString() ?? 'N/A';
          const driveSide = country.car?.side ?? 'N/A';

          popimg.src = flagUrl;
          popname.textContent = countryName;
          popcapital.textContent = capitalValue;
          poppopulation.textContent = populationValue;
          popdrive.textContent = driveSide;

          popUp.classList.remove('hidden');
        });

        listdiv.appendChild(li);
      });
    })
    .catch((error) => {
      listdiv.innerText = `Error: ${error}`;
    });
}

getFlags();

// Close popup
btnclose.addEventListener('click', () => {
  popUp.classList.add('hidden');
});


/* 

using async/await:

const getCountries = async () => { //this waits for the http server
try {
    const response = await fetch(url) //response will be given once it fetches the api url
    const data = await response.json() //the data will be shown once the response is converted into json()
    data.forEach(country => {
        countriesList.innerHTML += `<p>${country.name.commmon}</p>`
    });
  } catch(err) {
    console.err(err); //we catch the potential errors
  }

}
getCountries(); //then we call the arrow async function

*/