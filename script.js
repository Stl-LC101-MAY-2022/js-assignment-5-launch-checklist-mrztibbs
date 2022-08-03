// Write your JavaScript code here!

const {validateInput, formSubmission, pickPlanet} = require("./scriptHelper.js");

window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
   }).then(function(){
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let selectedPlanet = pickPlanet(listedPlanets);

        addDestinationInfo(document, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star,
        selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.image);

    });


    const list = document.getElementById("faultyItems");
    list.style.visibility = "hidden";

    const testForm = document.querySelector("form");
    testForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const pilotNameInput = document.querySelector("input[name=pilotName]");
        const copilotNameInput = document.querySelector("input[name=copilotName]");
        const fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        const cargoMassInput = document.querySelector("input[name=cargoMass]");
        
        let pilotName = pilotNameInput.value;
        let copilotName = copilotNameInput.value;
        let fuelLevel = fuelLevelInput.value;
        let cargoMass = cargoMassInput.value;
        formSubmission(document, list, pilotName, copilotName, fuelLevel, cargoMass);
    
        });
    });
