document.addEventListener('DOMContentLoaded', async() => {
    try {
        const response = await fetch('http://localhost:3000/user/getinfo'); // Route to fetch prefilled data
        const { success,result } = await response.json();
    
        if (success) {
          
            document.getElementById(`name`).value = result.name; 
            console.log('entered data');
          
        } else {
          console.error('Failed to fetch data');
        }}
        catch (error) {
            console.error('Error fetching data:', error);
          }
    
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        
        event.preventDefault();

        const formData = new FormData(form);
        const name = formData.get('name');
        const last_name = formData.get('last-name');
        const email = formData.get('email');
        const password = formData.get('password');
        const address = formData.get('address');
        const account_type = formData.get('account-type');
        try {
            const response = await fetch('http://localhost:3000/user/editaccountinfo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    last_name,
                    email,
                    password,
                    address,
                    account_type,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                // Redirect or perform any desired action after successful update
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
        
    });
});