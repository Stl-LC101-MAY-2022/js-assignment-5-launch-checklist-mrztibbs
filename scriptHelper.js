// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const missionTarget = document.getElementById("missionTarget")
   missionTarget.innerHTML = 
               `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
    missionTarget.style.visibilty="visible";
return
}

function validateInput(needsValidation) {
    let alertMessage;
    if (needsValidation === '') {
        alertMessage = "Empty";
    }else if (!isNaN(needsValidation)) {
        alertMessage = "Is a Number";
    }else if (isNaN(needsValidation)) {
        alertMessage = "Not a Number";
    }
   return alertMessage;
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let userResponses = [pilot, copilot, fuelLevel, cargoLevel];
    const launchStatus = document.getElementById('launchStatus');
    const pilotStatus = document.getElementById('pilotStatus');
    const copilotStatus = document.getElementById('copilotStatus');
    const fuelStatus = document.getElementById('fuelStatus');
    const cargoStatus = document.getElementById('cargoStatus');

    if (validateInput(pilot) === 'Is a Number' || validateInput(pilot) === 'Empty') {
        pilotStatus.i = `Pilot ${pilot} is ready for launch`;
     }
     if (validateInput(copilot) === 'Is a Number' || validateInput(copilot) === 'Empty') {
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
     }
 
     if (validateInput(fuelLevel) === 'Not a Number' || fuelLevel > 10000 || validateInput(fuelLevel) === 'Empty') {
        fuelStatus.innerHTML = `Fuel level too low for launch`;
     } else {
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
     }
     
    if (validateInput(cargoLevel) === 'Not a Number' || cargoLevel > 10000 || validateInput(cargoLevel) === 'Empty') {
        cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
     } else {
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;
     }
 
     if (cargoLevel >= 10000 || fuelLevel <= 10000) {
        launchStatus.innerHTML = `Shuttle Not Ready for Launch`;
        launchStatus.style.color = "rgb(199, 37, 78)";
        list.style.visibilty = "visible"
     } else {
        list.style.visibilty = "hidden"
     }
 

    for (let i = 0; i < userResponses.length; i++) {
        let returnedMessage = validateInput(userResponses[i]);
        let alert = "";
    //Verify no fields are left empty
    if (returnedMessage === 'Empty') {
        alert = 'All fields are required!'
    //To ensure numeric fields contain numbers.
   } else if (returnedMessage === "Not a Number" && i === 2 || i === 3) {
    alert = 'Make sure to enter valid information for each field!'
x    //To ensure text fields are only text
    } else if (returnedMessage === "Is a Number"  && i === 0 || i === 1) {
        alert = 'Make sure to enter valid information for each field!'
    } return alert
    }
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        response.json().then( function(json) {
           console.log(JSON.stringify(json));
        })
        });

    return JSON.stringify(planetsReturned);
}

function pickPlanet(planets) {
    let selectedIndex = Math.floor(Math.random()*planets.length);
    return planets[selectedIndex]
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
