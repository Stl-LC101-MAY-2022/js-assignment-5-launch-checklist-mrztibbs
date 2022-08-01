// Write your JavaScript code here!

const {validateInput, formSubmission, pickPlanet} = require("./scriptHelper.js");

window.addEventListener("load", function() {
   const testForm = document.querySelector("testForm");
   const pilotName = document.querySelector("input[name=pilotName]");
   const copilotName = document.querySelector("input[name=copilotName]");
   const fuelLevel = document.querySelector("input[name=fuelLevel]");
   const cargoMass = document.querySelector("input[name=cargoMass]");
   const launchStatus = document.getElementById('launchStatus');
   const faultyItems = document.getElementById('faultyItems');
   const pilotStatus = document.getElementById("pilotStatus");
   const copilotStatus = document.getElementById("copilotStatus");
   const fuelStatus = document.getElementById("fuelStatus");
   const cargoStatus = document.getElementById("cargoStatus");

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);
   listedPlanets.then(function () {
        const planetArr = [];
        planetArr.push(JSON.parse(JSON.stringify(listedPlanets)));
        console.log(planetArr);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.
        let selectedPlanet = pickPlanet(planetArr);
        addDestinationInfo(div, selectedPlanet.name, selectedPlanet.diameter, selectedPlanet.star,
        selectedPlanet.distance, selectedPlanet.moons, selectedPlanet.imageUrl);

    });
});

      
   testForm.addEventListener("submit", function(event) {
    // Alert when any fields are empty.
    if (validateInput(pilotName) === 'Is a Number' || validateInput(pilotName) === 'Empty') {
        pilotStatus.textContent = `Pilot ${pilotName} is ready for launch`;
     }
     if (validateInput(copilotName) === 'Is a Number' || validateInput(copilotName) === 'Empty') {
        copilotStatus.textContent = `Co-pilot ${copilotName} is ready for launch`;
     }
 
     if (validateInput(fuelLevel) === 'Not a Number' || fuelLevel > 10000 || validateInput(fuelLevel) === 'Empty') {
        fuelStatus.textContent = `Fuel level too low for launch`;
     } else {
        fuelStatus.textContent = `Fuel level high enough for launch`;
     }
     
    if (validateInput(cargoMass) === 'Not a Number' || cargoMass > 10000 || validateInput(cargoMass) === 'Empty') {
        cargoStatus.textContent = `Cargo mass too heavy for launch`;
     } else {
        cargoStatus.textContent = `Cargo mass low enough for launch`;
     }
 
     if (cargoMass >= 10000 || fuelLevel <= 10000) {
        launchStatus.textContent = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = 'red';
        faultyItems.style.visibilty = 'visible';
     } else {
        faultyItems.style.visibilty = 'hidden';
     }

    for (let i = 0; i < userResponses.length; i++) {
        let returnedMessage = validateInput(userResponses[i]);
        let alert = "";
    //Verify no fields are left empty
    if (returnedMessage === 'Empty') {
        alert('All fields are required!');
    //To ensure numeric fields contain numbers.
   } else if (returnedMessage === "Not a Number" && i === 2 || i === 3) {
        alert('Make sure to enter valid information for each field!');
        event.preventDefault();
        return
x    //To ensure text fields are only text
    } else if (returnedMessage === "Is a Number"  && i === 0 || i === 1) {
        alert('Make sure to enter valid information for each field!');
        //Stop from submission if field empty.
        event.preventDefault();
        return
    }
    }
    formSubmission(testForm, faultyItems, pilotName, copilotName, fuelLevelInput, cargoMassInput);
    });
});
