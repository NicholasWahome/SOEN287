// displays the nav bar after pressing the burger
function navDisplay(){
    var nav = document.getElementById("navbar");
    
    if (nav.style.display === "block") {
        nav.style.display = "none";
    } else {
        nav.style.display = "block";
    }

}