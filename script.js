// Write your JavaScript code here!
window.addEventListener("load", function() {
   //4- Fetch some planetary JSON to update the mission destination with vital facts and figures about where the shuttle is headed
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json) {
         function refreshDestination() {
            let i = Math.floor(Math.random()*json.length);
            const destination = document.querySelector("#missionTarget");
            destination.innerHTML = `
               <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[i].name}</li>
                  <li>Diameter: ${json[i].diameter}</li>
                  <li>Star: ${json[i].star}</li>
                  <li>Distance from Earth: ${json[i].distance}</li>
                  <li>Number of Moons: ${json[i].moons}</li>
               </ol>
               <img src=${json[i].image}></img>
            `;
         }
         //randomly select the mission destination from the available options in the JSON file.         
         //every 5 seconds
         //setInterval(refreshDestination, 5000);         
         refreshDestination();
      });

      

   });
   let form = document.querySelector("form");
   form.addEventListener("submit", function(event) {
      let formInputsOk = true;
      
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
      let listOfNotReadyItemsForShuttleLaunch = [];
      //a- The user entered something for every field.
      for (let key in formContents){
         if (formContents.hasOwnProperty(key)){
            //console.log(key + " -> " + formContents[key]);
            if (formContents[key].trim() == "" || formContents[key].trim().length == 0){
               formInputsOk = false;
               //console.log(key + " field should not be empty!");
               //alert(key + " field should not be empty!");
               listOfNotReadyItemsForShuttleLaunch.push(key + " field should not be empty!");
            }
         }
      }

      //b- The user entered text for names and numbers for fuel and cargo levels.
      for (let key in formContents){
         if (formContents.hasOwnProperty(key)){
            if(key == "pilot name" || key == "copilot name"){
               let pattern=/^[A-Za-z]*(\s+([A-Za-z]*))*$/;
               if (!pattern.test(formContents[key].trim())){
                  formInputsOk = false;
                  //console.log(key + " field should be solely text!");
                  listOfNotReadyItemsForShuttleLaunch.push(key + " field should be solely text!");
               }
            } else if(key == "fuel level" || key == "cargo mass"){
               let pattern=/^\d+(\.\d{1,})?$/;
               if (!pattern.test(formContents[key].trim())){
                  formInputsOk = false;
                  //console.log(key + " field should be a number!");
                  listOfNotReadyItemsForShuttleLaunch.push(key + " field should be a number!");
               }
            }
         }
      }

      /*if (pilotName.value == "" || copilotName.value == "" || fuelLevel.value == "" || cargoMass.value == ""){
         formInputsOk = false;
      }*/
      //1- Validate the user responses with preventDefault() to ensure a- and b- above
      //2- With validation, update a list of what is currently ready or not ready for the shuttle launch.
      if (!formInputsOk){
         document.querySelector("#faultyItems").style.visibility = "hidden";
         document.querySelector("#launchStatus").innerHTML = "Awaiting Information Before Launch";
         document.querySelector("#launchStatus").style.color = "black";
         alert(listOfNotReadyItemsForShuttleLaunch.join("\n"));        
         event.preventDefault();
         /*for (let i=0; i < listOfNotReadyItemsForShuttleLaunch.length; i++){
            //console.log(listOfNotReadyItemsForShuttleLaunch[i]);
            alert(listOfNotReadyItemsForShuttleLaunch[i]);
         }*/
      } else {
         
         //3- Indicate what is good or bad about the shuttle and whether it is ready for launch by using the DOM to update the CSS.
         //The list of shuttle requirements, the div with the id faultyItems, should be updated if something is not ready for launch.
         //Using template literals, update the li elements pilotStatus and copilotStatus to include the pilot's name and the co-pilot's name.
         let faultyItems = document.querySelector("#faultyItems");
         faultyItems.style.visibility = "visible";
         document.querySelector("#pilotStatus").innerHTML = "Pilot <b>"+pilotName.value+"</b> is ready for launch";
         document.querySelector("#copilotStatus").innerHTML = "Co-pilot <b>"+copilotName.value+"</b> is ready for launch";
         //alert(pilotName.value);
         //If the user submits a fuel level that is too low (less than 10,000 liters)
         //change faultyItems to visible with an updated fuel status stating that there is not enough fuel for the journey. The text of the h2 element, launchStatus, should also change to "Shuttle not ready for launch" and the color should change to red.
         let anyFurtherproblems = false;
         if (fuelLevel.value < 10000){
            anyFurtherproblems = true;
            faultyItems.style.visibility = "visible";
            document.querySelector("#launchStatus").innerHTML = "Shuttle not ready for launch";
            document.querySelector("#launchStatus").style.color = "red";      
            document.querySelector("#fuelStatus").innerHTML = `Fuel amount is ${fuelLevel.value} liters, there is not enough fuel for the journey`;      
         } else {
            document.querySelector("#fuelStatus").innerHTML = `Fuel level high enough for launch`;
         }
         
         //If the user submits a cargo mass that is too large (more than 10,000 kilograms), change the list to visible with an updated cargo status stating that there is too much mass for the shuttle to take off. The text of launchStatus should also change to "Shuttle not ready for launch" and the color should change to red.
         if (cargoMass.value > 10000){
            anyFurtherproblems = true;
            faultyItems.style.visibility = "visible";
            document.querySelector("#launchStatus").innerHTML = "Shuttle not ready for launch";
            document.querySelector("#launchStatus").style.color = "red";      
            document.querySelector("#cargoStatus").innerHTML = `Cargo mass is ${cargoMass.value} kilograms, there is too much mass for the shuttle to take off`;
         } else {
            document.querySelector("#cargoStatus").innerHTML = `Cargo mass low enough for launch`;
         }

         //If the shuttle is ready to launch, change the text of launchStatus to green and display "Shuttle is ready for launch".
         if (anyFurtherproblems){
            event.preventDefault();
         } else {
            document.querySelector("#launchStatus").innerHTML = "Shuttle is ready for launch";
            document.querySelector("#launchStatus").style.color = "green";
            document.querySelector("#fuelStatus").innerHTML = "Fuel level high enough for launch";
            document.querySelector("#cargoStatus").innerHTML = "Cargo mass low enough for launch";
            event.preventDefault();
         }
      }   
   });
});

