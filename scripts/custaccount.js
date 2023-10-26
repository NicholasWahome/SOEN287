function showMaterial(materialId) {
    const contentElements = document.getElementsByClassName("content");
    for (let i = 0; i < contentElements.length; i++) {
        contentElements[i].style.display = "none"; // Hide all content
    }

    const selectedMaterial = document.getElementById(materialId);
    selectedMaterial.style.display = "block"; // Show the selected content

    // Remove the "selected-button" class from all buttons
    const buttons = document.querySelectorAll(".highlight-button");
    buttons.forEach(button => button.classList.remove("selected-button"));

    // Add the "selected-button" class to the currently selected button
    const selectedButton = document.getElementById(`${materialId}-button`);
    selectedButton.classList.add("selected-button");
}