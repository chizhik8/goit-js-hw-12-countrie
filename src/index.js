const _ = require('lodash');
const { alert, error } = require('@pnotify/core');
import { data } from 'autoprefixer';
import '../node_modules/@pnotify/core/dist/Angeler.css'
import '../node_modules/@pnotify/core/dist/BrightTheme.css'
import '../node_modules/@pnotify/core/dist/Material.css'
import '../node_modules/@pnotify/core/dist/PNotify.css'
import fetchCountries from './js/fetchCountries'; 
import './styles.css';
import singleCountry from './templates/countries.hbs';
import listOfCountry from './templates/list-country.hbs';

const inputRef = document.getElementById('name-input');
const outputRef = document.getElementById('country-box');

inputRef.addEventListener('input', _.debounce((event) => { 
    if (event.target.value.length) {
        const inputValue = event.target.value;
        outputRef.innerHTML = '';
        fetchCountries(inputValue).then(data => {
            if (data.length > 1 && data.length < 11) {
                updateCountries(data);
            } else if (data.length === 1) {
                updateCountry(data);
            } else { error({ text: "Too many matches found. Please enter a more specific query!", delay: 1500 }) };
        });
    } else { error({ text: "Empty request!", delay: 1500 }) };    
    
}), 2000);

function updateCountries(data) {
    const countries = listOfCountry(data);
    outputRef.insertAdjacentHTML('afterbegin', countries);
}

function updateCountry(data) {
     const country = singleCountry(data);
     outputRef.insertAdjacentHTML('afterbegin', country);
}

