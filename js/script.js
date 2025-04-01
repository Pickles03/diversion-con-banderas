// when the window load, fetch('https://restcountries.com/v3/all')
//alphabetical order
//when flag clicked = show more info about the country in a floating window(flag, capital, population, side of the driving road)
//button to close that floating window
// <div id="countries-list"></div>
//sort method for alphabetical order(capitals or lower case matters also)

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

        const flagImg = li.querySelector(".flag-img");
        flagImg.addEventListener('click', () => {
          const capitalValue = country.capital?.[0] ?? 'No Capital';
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
