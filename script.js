const button=document.querySelector("button");
const texts = document.querySelector(".b");

const searchForm = document.querySelector("#search-form");
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");

const speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition=new speechRecognition();

recognition.interimResults=false;
// recognition.continuous=true;
recognition.lang="en-US";


let p =document.querySelector("#p");
    p.setAttribute('maxlength', 4000);
    p.setAttribute('cols', 60);
    p.setAttribute('rows', 10);

const speech=new SpeechSynthesisUtterance();
speech.lang="en-US";
speech.pitch=0.9;
speech.volume=1;
speech.rate=1;

let copy=(p)=>{
    document.getElementById(p).select();
    document.execCommand("copy");
}

recognition.onstart = function (){
    console.log("speech recognition started");
};

var opr;
var s=1;
recognition.onresult = function(event)
{
    console.log(event);
    const spokenwords=event.results[0][0].transcript;
    console.log(spokenwords);
    console.log(opr);
        s=2;
        switch(opr)
            {
                case 1: computerspeech(spokenwords);
                    break;
                case 2: Speech_to_text(spokenwords);
                    break;
                case 3: Search_google(spokenwords);
                    break;
                case 4: english_to_hindi(spokenwords);
                    break;
                default: recognition.stop();
   
            }
        if(spokenwords.includes("unimate")||spokenwords.includes("hello")){
            speech.text="welcome to unimate,how can i help you......?";
            window.speechSynthesis.speak(speech);
            opr=1;
        }else
        if(spokenwords.includes("stop")){
            opr=5;
            check();
        }
            

    // computerspeech(spokenwords);
};
function check(){
    if(opr==2)
    {
        document.querySelector("textarea").style.display="grid";
        document.querySelector(".upp").style.marginTop="14%";
        // document.querySelector(".upp").style.marginBottom="";
        document.querySelector(".b button").style.display="grid";
    }else
    {
        document.querySelector(".b button").style.display="none";
        document.querySelector("textarea").style.display="none";
        document.querySelector(".upp").style.marginTop="25%";
    }
}
function control(spokenwords){
    if(spokenwords.includes("start basic")){
        speech.text="basic conversation started";
        opr=1;
        window.speechSynthesis.speak(speech);
    }else
    if(spokenwords.includes("start speech to text")|| spokenwords.includes("start speech to test")){
        speech.text="speech to text started";
        opr=2;
        window.speechSynthesis.speak(speech);
    }else
    if(spokenwords.includes("start Google search")){
        speech.text="google search started";
        opr=3;
        window.speechSynthesis.speak(speech);
    }else
    if(spokenwords.includes("start english to hindi")){
        speech.text="english to hindi conertor started";
        opr=4;
        window.speechSynthesis.speak(speech);
    }
}


function computerspeech(spokenwords){
    control(spokenwords);
    check();
        if(opr==1){
            if(spokenwords.includes("what can you do for me"))
            {
            speech.text="welcome to unimate, dear.... i can do anything";
            }else
            if(spokenwords.includes("what is your name")){
                speech.text="my name is unimate,what's your name";
            }else {
                speech.text=" ";
            // searchFormInput.value=spokenwords;
            }
            window.speechSynthesis.speak(speech);
        }
}



//voice to text...it gives text as  result on google crome....!!!
function Speech_to_text(spokenwords){
    control(spokenwords);
    check();
    if(opr==2){
    texts.appendChild(p);
    p.innerText = spokenwords;
    }
    // if(spokenwords.includes("start basic")){
    //     speech.text="basic converasation started";
    //     opr=1;
    //     document.querySelector(".upp").style.marginTop="25%";
    //     if(opr==1){
    //     document.querySelector("textarea").style.display="none";
    //     }
    //     recognition.interimResults=false;
        // window.speechSynthesis.speak(speech);
    // }
}

//voice to search on google and gives result.!!!
function Search_google(spokenwords){  
    control(spokenwords);
    check();
    searchFormInput.value = spokenwords;
    if(opr==3){
        searchForm.submit();
        speech.text="here some results for you";
        window.speechSynthesis.speak(speech);
    }
  
}


// english to hindi converter
function english_to_hindi(spokenwords){
    control(spokenwords);
    check();
}


//on speech end what are the operation should start or done... !
speech.onend=()=>{
    if(opr==2){
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)"
    }else 
    if(opr==1){
        recognition.start();
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)"
    }else 
    if(opr==3){
        recognition.start();
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)"
    }else
    if(opr==5){
        document.querySelector(".outer").style.background="#111";
    }else{
        recognition.start();
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
    }
};

// recognition on end what are the operation should done.....!!!
recognition.onend=()=>{
    console.log(opr);
    if(opr==2)
    { 
        document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
        // setTimeout(()=>{
            recognition.start()
        // },1000)
        
        
    }else if(opr==3)
    {
        document.querySelector(".outer").style.background = "#111";
    }else
    if(opr==5){
        recognition.stop();
        document.querySelector(".outer").style.background = "#111";
    }else{

    }
    if(s==1){
        recognition.start();
    }
    else{
        
        document.querySelector(".outer").style.background = "#111";
    }
}
//on click a button  unimate will start recognising....!!!
button.addEventListener("click",()=>{
    document.querySelector(".outer").style.background = "linear-gradient(#14ffe9,#ffeb3b,#ff00e0)";
    recognition.start();
});
