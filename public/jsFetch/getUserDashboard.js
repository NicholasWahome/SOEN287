document.addEventListener('DOMContentLoaded', async () => {
    const userPrompt = document.getElementById('userPrompt');
    const contactName = document.getElementById('contactName');
    const email = document.getElementById('email');
    const address = document.getElementById('address');
    options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    fetch('http://localhost:3000/user/getUserDashboard', options)
    .then(response => response.text())
    .then(data => {
        const parsedData = JSON.parse(data);
        const userInfo = parsedData.data;
        userPrompt.innerHTML += userInfo[0];
        contactName.innerHTML += userInfo[0];
        email.innerHTML += userInfo[1];
        address.innerHTML += userInfo[2];
    })
    .catch(error => {
        console.error('Error:', error);
    });

});