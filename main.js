var canvas = document.querySelector('canvas');
var ctx = canvas.getContext("2d");
var message = document.getElementById("message").value;
var isInvalid = false;
var isEncrypted = false;
var isDecrypted = false;

function defaultMessage(){
    let myFont = new FontFace(
        "Press-Start-2P",
        "url(Press_Start_2P/PressStart2P-Regular.ttf)");
    
    myFont.load().then((font) => {
        document.fonts.add(font);
        ctx.textAlign = "center";
        ctx.fillStyle = "powderblue";
        ctx.font = "bolder 40% Press-Start-2P";
        ctx.fillText("No encrypted message.",canvas.width/2,canvas.height/2);
      });
}

function encrypt(){
    this.isEncrypted = true;
    this.isDecrypted = false;
    var message = document.getElementById("message").value;
    const regex = /[^a-z\s][:punct:]/;
    
    if (message.length === 0){
        defaultMessage();
    }

    if (message.match(regex)){
        isInvalid = true;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillText("Invalid input.",canvas.width/2,canvas.height/2);
    } else {
        var chars = message.split("");
        for (i = 0; i < chars.length; i++){
            
            if(chars[i] == "a"){
                chars[i] = "ai";
            } else if (chars[i] == "e"){
                chars[i] = "enter";
            } else if (chars[i] == "i"){
                chars[i] = "imes";
            } else if (chars[i] == "o"){
                chars[i] = "ober";
            } else if (chars[i] == "u"){
                chars[i] = "ufat";
            } else {
                continue;
            }
        }
        var encryptedMessage = chars;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillText(encryptedMessage.join("").replace(/\s/g,''),canvas.width/2,canvas.height/2);
        return encryptedMessage;
    }
}

function decrypt(){
    var message = document.getElementById("message").value;
    if (isEncrypted && !isInvalid){
        var chars = encrypt();
        for (i = 0; i < chars.length; i++){
            if(chars[i] == "ai"){
                chars[i] = "a";
            } else if (chars[i] == "enter"){
                chars[i] = "e";
            } else if (chars[i] == "imes"){
                chars[i] = "i";
            } else if (chars[i] == "ober"){
                chars[i] = "o";
            } else if (chars[i] == "ufat"){
                chars[i] = "u";
            } else {
                continue;
            }
        }
        decryptedMessage = chars;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillText(decryptedMessage.join(""),canvas.width/2,canvas.height/2);
        this.isDecrypted = true;
        this.isEncrypted = false;
        return decryptedMessage;
    } else if (message.length > 0) {
        const regex = /[^a-z\s][:punct:]/;
        if (message.length === 0){
        defaultMessage();
        }
        if (message.match(regex)){
        isInvalid = true;
        ctx.clearRect(0,0,canvas.width, canvas.height);
        ctx.fillText("Invalid input.",canvas.width/2,canvas.height/2);
        } else {
            const enter = /enter/g;
            const ai = /ai/g;
            const imes = /imes/g;
            const ober = /ober/g;
            const ufat = /ufat/g;
            var decryptedMessage = message.replace(enter,"e")
                                          .replace(ai,"a")
                                          .replace(imes,"i")
                                          .replace(ober,"o")
                                          .replace(ufat,"u");
            if (decryptedMessage.length <= 28){
                ctx.clearRect(0,0,canvas.width, canvas.height);
                ctx.fillText(decryptedMessage,canvas.width/2,canvas.height/2);
                this.isDecrypted = true;
                this.isEncrypted = false;
                return decryptedMessage;
            } else {
                ctx.clearRect(0,0,canvas.width, canvas.height);
                var line = "";
                var y = canvas.height/2;
                for( var i = 0; i < decryptedMessage.length; i++){
                    var testDecryptedMessage = line + decryptedMessage[i] + "";
                    var textWidth = ctx.measureText(testDecryptedMessage).width;
                    if(textWidth > canvas.width && i > 0){
                        ctx.fillText(line,canvas.width/2,y);
                        line = decryptedMessage[i] + " ";
                        y += 10;
                    } else {
                        line = testDecryptedMessage;
                    }
                }
                ctx.fillText(line,canvas.width/2,y);
                this.isDecrypted = true;
                this.isEncrypted = false;
                return decryptedMessage;
            }
        }
    }
}

function clipboard(){

    if(isEncrypted && !isDecrypted && !isInvalid){
        var copyEncryptedMessage = encrypt().join("").replace(/\s/g,'');
        navigator.clipboard.writeText(copyEncryptedMessage);
        this.isEncrypted = false;
        this.isDecrypted = false;
        alert("Copied the text: " + copyEncryptedMessage);

    } else if (isDecrypted && !isEncrypted && !isInvalid){
        var copyDecryptedMessage = decrypt();
        navigator.clipboard.writeText(copyDecryptedMessage);
        this.isEncrypted = false;
        this.isDecrypted = false;
        alert("Copied the text: " + copyDecryptedMessage);

    } else {

        alert("Nothing to copy");
    }
}

if (message.length === 0){
    defaultMessage();
}