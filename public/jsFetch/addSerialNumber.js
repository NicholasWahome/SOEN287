
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById("addSerialNumber");

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const productName = formData.get('input1');
        const version = formData.get('input2');
        const serialNum = formData.get('input3');
        
        try {
            const response = await fetch('http://localhost:3000/product/addingSN', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    version,
                    serialNum
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert(result.message);
                // Redirect or perform any desired action after successful product addition
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error(error);
        }
    });
});