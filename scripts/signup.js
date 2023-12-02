document.addEventListener('DOMContentLoaded', () => {
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
            const response = await fetch('http://localhost:3000/signup', {
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
                // Redirect or perform any desired action after successful signup
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
});