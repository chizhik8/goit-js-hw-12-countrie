function fetchCountries(searchQuery) {
    const URL = `https://restcountries.eu/rest/v2/name/`;
    return fetch(`${URL}${searchQuery}`)
        .then(response => {
            // console.log(response.status);
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) { error({ text: "Error message: 404. Country not found" }) }
            else if (response.status === 500) { error({ text: "Error message: 500. Server Error - хакнули бандерівці)) " }) }
            else { error({ text: "Not found", title: 'Not found', delay: 1500 }) };})
        .then(data => data)
        .catch (err => { error({ text: err, delay: 1500 }) });
}

export default fetchCountries;