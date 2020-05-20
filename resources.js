//Activity 5: Ajax Interactions: POST

document.addEventListener("DOMContentLoaded", bindButtons);  //listener for DOM content loaded

function bindButtons(){

  document.getElementById("inputSubmit").addEventListener("click", function(event){  //listener for submit button click

    var req = new XMLHttpRequest();
    var website = "http://httpbin.org/post"  //submit to

    //construct object with null values
    var formInfo = {inputBday:null,
                    inputCol:null,
                    inputEmail:null,
                    inputPass:null};

    formInfo.inputBday = document.getElementById("bday").value;  //input birthday
    formInfo.inputCol = document.getElementById("col").value;  //input favorite color
    formInfo.inputEmail = document.getElementById("email").value;  //input email
    formInfo.inputPass = document.getElementById("pass").value;  //input password
    
    req.open("POST", website, true);  //construct url
    req.setRequestHeader('Content-Type', 'application/json');  //specify JSON

    req.addEventListener('load',function(){ //asynchronous load
      if(req.status >= 200 && req.status < 400){
        var response = JSON.parse(JSON.parse(req.responseText).data);
        //display data
        document.getElementById("bdayCheck").textContent = "Birthday: " + response.inputBday;
        document.getElementById("colCheck").textContent = "Favorite Color: " + response.inputCol;
        document.getElementById("emailCheck").textContent = "Email: " + response.inputEmail;
        document.getElementById("passCheck").textContent = "Password: " + response.inputPass;
      } else {
        console.log("Error in network request: " + req.statusText);
      }
    });

    req.send(JSON.stringify(formInfo)); //convert to string
    event.preventDefault();  //prevent refresh
  });
}
