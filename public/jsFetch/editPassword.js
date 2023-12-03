document.addEventListener('DOMContentLoaded', () => {
    const password = document.getElementById('passbutton');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const email = formData.get('email');
        const password = formData.get('password');

        console.log('Form submitted with:', email, password);

        try {
            const response = await fetch('http://localhost:3000/auth/editPassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password
                }),
            });

            const result = await response.json();

            
            if (result.success) {
                window.location.href = '../pages/Myaccount.html';
                alert(result.message);
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
});
