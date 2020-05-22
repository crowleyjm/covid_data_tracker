//CS290 Project

document.addEventListener("DOMContentLoaded", bindButtons);  //listener for DOM content loaded

function bindButtons(){

  document.getElementById("inputSubmit").addEventListener("click", function(event){  //listener for submit button click

    var req = new XMLHttpRequest();
    var website = "http://httpbin.org/post"  //submit to

    //construct object with null values
    var formInfo = {inputMask:null,
                    inputDays:null,
                    inputDate:null,
                    inputCountry:null,
                    inputState:null,
                    inputSymp1: null,
                    inputSymp2: null,
                    inputSymp3: null,
                    inputSymp4: null,
                    inputSymp5: null,
                    inputSymp6: null,
                    inputSymp7: null,
                    inputEmail: null};

    formInfo.inputMask = document.getElementById("mask").value;  //Do you wear a mask while entering public spaces like grocery stores?
    formInfo.inputDays = document.getElementById("days").value;  //iHow many days a week on average do you enter a public space?
    formInfo.inputDate = document.getElementById("date").value;  //What date did you start quarantine?
    formInfo.inputCountry = document.getElementById("country").value;  //What country do you live in?
    formInfo.inputState = document.getElementById("state").value;  //If you live in the United States, which state do you live in?
    formInfo.inputSymp1 = document.getElementById("cough").value;  //Cough
    formInfo.inputSymp2 = document.getElementById("breath").value;  //Shortness of breath or difficulty breathing
    formInfo.inputSymp3 = document.getElementById("fever").value;  //Fever
    formInfo.inputSymp4 = document.getElementById("chills").value;  //Chills
    formInfo.inputSymp5 = document.getElementById("pain").value;  //Muscle pain
    formInfo.inputSymp6 = document.getElementById("sore").value;  //Sore throat
    formInfo.inputSymp7 = document.getElementById("smell").value;  //New loss of taste of smell
    formInfo.inputEmail = document.getElementById("email").value;  //Email

    req.open("POST", website, true);  //construct url
    req.setRequestHeader('Content-Type', 'application/json');  //specify JSON

    req.addEventListener('load',function(){ //asynchronous load
      if(req.status >= 200 && req.status < 400){
        //display thank you
        document.getElementById("sentPost").textContent = "Thank you for filling out this survey. Your response has been recorded."
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req.send(JSON.stringify(formInfo)); //convert to string
    event.preventDefault();  //prevent refresh
  });
}
