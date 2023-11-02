const decryptionKey = "ZaY1Xb(W2;VcU3*TdS4ReQ&5PfO%:6N=gM7LhK8J/j$I9HkGl#F-^)mED@nCoBpA!";



let product = {
    name: "",
    expiry: "",
    amount: "",
    creationDate: "",
};

let name;

let form = document.getElementById("serial-num-form");
let preview = document.getElementById("view");
let output = document.getElementById("sn-display");

let pString = "";


// form.addEventListener("submit", 
function getFormInfo(){


    let tempname = document.getElementById("p-name");
    
    product.name = tempname.innerHTML;
    if(!form.lifetime.checked){
        product.expiry = form.exp.value;
    }else{
        product.expiry = "Lifetime";
    }
    product.amount = form.amnt.value;
    product.creationDate = new Date().toLocaleString();
    productString();
}
function productString(){
    pString = "[" + product.name + "] " +"[" + product.expiry + "] " +"[" + product.creationDate + "] ";
}

function encrypt(s){
    let encryptedString = "";
    for(let i = 0; i < s.length; i++){
        let x = s.charAt(i);

        x = x.charCodeAt(0) - 2;
        let encryptedChar = "";
        let timesSubtracted = 0;

        while(x > decryptionKey.length){
            x = x - decryptionKey.length;
            timesSubtracted++;
        }
        encryptedChar = decryptionKey.charAt(x);
        encryptedString += encryptedChar + timesSubtracted;
        
    }
   
    return encryptedString;
}

function decrypt(s){
    let decryptedString = "";
    for(let i = 0; i < s.length; i += 2){
        let timesSubtracted = parseInt(s.charAt(i+1));
        let x = s.charAt(i);
        x = decryptionKey.indexOf(x);
        x = (x + 2) + (timesSubtracted * decryptionKey.length);

        let decryptedChar = String.fromCharCode(x);;
        decryptedString += decryptedChar;
        
    }
   
    return decryptedString;
}

function display(){
    getFormInfo();
    for (let i = 0; i < product.amount; i++){    
        getFormInfo();
        output.innerHTML += encrypt(pString + i) + "<br>";
    }
}


test = encrypt("[Fl Studio - Fruity Edition] [2023-10-19] [5] [2023-10-30, 3:37:45 p.m.] ");

console.log(decrypt("P111j1N0d1#1F1M18191N0I0N011G1F181#1m1N0Y1M181#18191I1O1N0P1l0k0l0#0I0G0G0I0G0#0O1N0P1l0k0l0#0I0G0G0I0k0G0$0N0G0l0D0F0m0D0F0m0N0N190$190O1N0"));