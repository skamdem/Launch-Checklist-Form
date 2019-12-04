// Write your JavaScript code here!
window.addEventListener("load", function() {
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let everythingOk = true;
      //The user entered something for every field.
      let pilotName = document.getElementById("pilotName");
      let copilotName = document.querySelector("input[name=copilotName]");
      let fuelLevel = document.querySelector("input[name=fuelLevel]");
      let cargoMass = document.querySelector("input[name=cargoMass]");
      //console.log(pilotName.value, copilotName.value, fuelLevel.value, cargoMass.value);
      let formContents = {
         "pilot name" : pilotName.value,
         "copilot name" : copilotName.value,
         "fuel level" : fuelLevel.value,
         "cargo mass" : cargoMass.value
      }
      //The user entered something for every field.
      for (let key in formContents){
         if (formContents.hasOwnProperty(key)){
            //console.log(key + " -> " + formContents[key]);
            if (formContents[key].trim() == "" || formContents[key].trim().length == 0){
               everythingOk = false;
               console.log(key + " field should not be empty!");
            }
         }
      }

      //The user entered text for names and numbers for fuel and cargo levels.
      for (let key in formContents){
         if (formContents.hasOwnProperty(key)){
            if(key == "pilot name" || key == "copilot name"){
               let pattern=/^[A-Za-z]*(\s+([A-Za-z]*))*$/;
               if (!pattern.test(formContents[key].trim())){
                  everythingOk = false;
                  console.log(key + " field should be solely text!");
               }
            } else if(key == "fuel level" || key == "cargo mass"){
               let pattern=/^\d+(\.\d{1,})?$/;
               if (!pattern.test(formContents[key].trim())){
                  everythingOk = false;
                  console.log(key + " field should be a number!");
               }
            }
         }
      }

      /*if (pilotName.value == "" || copilotName.value == "" || fuelLevel.value == "" || cargoMass.value == ""){
         everythingOk = false;
      }*/
      
      if (!everythingOk){
         event.preventDefault();
         alert("please check submission fields");
      }

   });
});

/*
preventDefault() to ensure the following:
With validation, update a list of what is currently ready or not ready for the shuttle launch.
Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.
Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed
*/
/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
