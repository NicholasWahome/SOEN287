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