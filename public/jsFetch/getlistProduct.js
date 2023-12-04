document.addEventListener('DOMContentLoaded', async () => {
    const listEntry = document.getElementById('listEntries');
    options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch('http://localhost:3000/product/listSN', options)
    .then(response => response.text())
    .then(data => {
        const parsedData = JSON.parse(data);
        const productInfo = parsedData.data;
        listEntries = []
        // Combine all information into a single <h1> element
        listEntries.push(`<h4> Provider User: ${productInfo[0]} ${productInfo[1]}</h4>`);
        listEntries.push(`<p>Email: ${productInfo[2]}</p>` + `<p>Address: ${productInfo[3]}</p>`);
        listEntries.push(`<p>Product: ${productInfo[4]}</p>` + `<p>SerialNumber: ${productInfo[5]}</p>`);
        listEntries.push(`<p>Code: ${productInfo[6]}</p>` + `<p>Expiration Date: ${productInfo[7]}</p>`);
        listEntries.push(`<p>Status: ${productInfo[8]}</p>`);
        const htmlCode = listEntries.join('');
        listEntry.innerHTML = htmlCode;})
    .catch(error => {
        console.error('Error:', error);
    });

});