document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const productName = formData.get('product-name');
        const version = formData.get('product-version');
        const productImage = formData.get('product-image');
        const name = productImage.name;
        
        try {
            const response = await fetch('http://localhost:3000/product/addProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productName,
                    version,
                    name
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