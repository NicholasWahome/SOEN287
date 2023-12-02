document.getElementById('serial-num-form').addEventListener('submit', async function (event) {
    event.preventDefault();
  
    // Gather form data
    const exp = document.querySelector('input[name="exp"]').value;
    const amnt = document.querySelector('input[name="amnt"]').value;
  
    // Send form data to the server
    const response = await fetch('http://localhost:3000/submit-form', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ exp, amnt }),
    });
  
    // Handle the server response
    const result = await response.json();
    if (result.success) {
      // Handle success
      alert('Serial numbers generated and saved successfully.');
    } else {
      // Handle failure
      alert('Error: ' + result.message);
    }
  });
  
  