// displays the nav bar after pressing the burger
function navDisplay(){
    var nav = document.getElementById("navbar");
    

    
    if (nav.style.display === "block") {
        nav.style.display = "none";
        document.querySelector(".hamburger").style.transform = `rotate(${0}deg)`;
        
        
    } else {
        nav.style.display = "block";
        document.querySelector(".hamburger").style.transform = `rotate(${90}deg)`;
    }

}
// displays hodes date input if liftetime selected in manage-products
function dateDisplay(){
    var checkbox = document.getElementById("date-checkbox");
    var date = document.getElementById("date-button");
    

    
    if (checkbox.checked) {
        date.style.display = "none";
        
        
    } else {
        date.style.display = "block";
    }

}
