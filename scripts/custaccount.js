window.onload = function() {
    // Find the button element you want to be prepressed.
    var button = document.getElementById("defaultbutton-button");
    
    // Simulate a button click by triggering the click event.
    button.click();
}

function clicked(button) {
        // Remove the "clicked" class from all buttons, remove bold 
        const buttons = document.querySelectorAll('.buttonlink');
        buttons.forEach(b => b.classList.remove('clicked'));

        // Add the "clicked" class to the clicked button, add bold
        button.classList.add('clicked');
    }

function showMaterial(materialId) {
    const contentElements = document.getElementsByClassName("content");
    for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].style.display = "none"; // Hide all content
    }

    const selectedMaterial = document.getElementById(materialId);
    selectedMaterial.style.display = "block"; // Show the selected content

    
    
}

