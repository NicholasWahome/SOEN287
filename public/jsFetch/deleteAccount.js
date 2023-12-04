
document.addEventListener('DOMContentLoaded', () => {
    const deleteButton = document.getElementById('deleteid');
    const useremail = document.getElementById('email');

    deleteButton.addEventListener('click', async () => {
        const confirmation = confirm('Are you sure you want to delete your account?');

        if (confirmation) {
            try {
                const response = await fetch('http://localhost:3000/account/deleteAccount', {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.message);
                  
                } else {
                    alert(result.message);
                }
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
    });
});
