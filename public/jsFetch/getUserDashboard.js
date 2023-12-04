document.addEventListener('DOMContentLoaded', async () => {
    const dashboardName = document.getElementById('dashboardName');
    options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    };
    const response = await fetch('http://localhost:3000/user/getUserDashboard', options);
    const responseData = await response.text(); 
    console.log(responseData);
});