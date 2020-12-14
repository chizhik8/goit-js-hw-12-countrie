const _ = require('lodash');
const { alert, error } = require('@pnotify/core');
// import { alert, defaultModules } from 'node_modules/@pnotify/core/dist/PNotify.js';
// import '../node_modules/@pnotify/core/dist/PNotify.js'
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import './styles.css';
import singleCountry from './templates/countries.hbs';
import listOfCountry from './templates/list-country.hbs';

// const msgAlert = alert({
//   text: "I'm an alert.",
//   type: 'info'
// });

// const msgError = error({
//   text: "I'm an error message."
// });

let searchQuery = '';
const URL = `https://restcountries.eu/rest/v2/name/`;

const input = document.getElementById('name-input');
const output = document.getElementById('country-box');
console.log(output);

input.addEventListener('input', _.debounce((event) => { 
    if (event.target.value.length) {
        searchQuery = event.target.value;
        output.innerHTML = '';
        fetch(`${URL}${searchQuery}`).then(response => {
            console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) { error({ text: "Error message: 404. Country not found" }) }
            else if (response.status === 500) { error({ text: "Error message: 500. Server Error - хакнули бандерівці)) " }) }
            else { error({ text: "Not found", title: 'Not found', delay: 1500 }) };
        }).then(data => {
            console.log(data)

            if (data.length > 1 && data.length < 11) {
                // data.map((country) => { return console.log(country.name); });
                console.log(data);
                const countries = listOfCountry(data);
                output.insertAdjacentHTML('afterbegin', countries);
            } else if (data.length === 1) {
                const country = singleCountry(data);
                output.insertAdjacentHTML('afterbegin', country);

            } else { error({ text: "Too many matches found. Please enter a more specific query!", delay: 1500 }) };
        }).catch(err => { error({ text: err, delay: 1500 }) });
        
    } else { error({ text: "Empty request!", delay: 1500 }) };    
    
}), 2000);



