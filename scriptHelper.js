// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
   const div = document.getElementById("missionTarget");
   div.innerHTML = 
               `<h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
}

function validateInput(testInput) {
    if (testInput === '') {
        return "Empty";
    }else if (!isNaN(testInput)) {
       return "Is a Number";
    }else if (isNaN(testInput)) {
        return "Not a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    const launchStatus = document.getElementById('launchStatus');
    const pilotStatus = document.getElementById('pilotStatus');
    const copilotStatus = document.getElementById('copilotStatus');
    const fuelStatus = document.getElementById('fuelStatus');
    const cargoStatus = document.getElementById('cargoStatus');

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty" ) {
        alert('All fields are required!');
    }

    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is A Number" || validateInput(Number(fuelLevel)) === "Not a Number" || validateInput(Number(cargoLevel)) === "Not a Number" ) {
        alert('Make sure to enter valid information for each field!');
    } else {
            list.style.visibility = 'visible';
            pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
            copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

            if (fuelLevel < 10000  && cargoLevel > 10000) {
                launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
                fuelStatus.innerHTML = 'Fuel level too low for launch';
                cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
                launchStatus.style.color = "red";
            } else if (fuelLevel >= 10000  && cargoLevel > 10000) {
                launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
                fuelStatus.innerHTML = 'Fuel level high enough for launch';
                cargoStatus.innerHTML = 'Cargo mass too heavy for launch';
                launchStatus.style.color = "red";
            } else if (fuelLevel < 10000  && cargoLevel <= 10000) {
                launchStatus.innerHTML = 'Shuttle Not Ready for Launch';
                fuelStatus.innerHTML = 'Fuel level too low for launch';
                cargoStatus.innerHTML = 'Cargo mass low enough for launch';
                launchStatus.style.color = "red";
            } else if (fuelLevel >= 10000  && cargoLevel <= 10000) {
                launchStatus.innerHTML = 'Shuttle Ready for Launch';
                fuelStatus.innerHTML = 'Fuel level high enough for launch';
                cargoStatus.innerHTML = 'Cargo mass low enough for launch';
                launchStatus.style.color = "green";
            }

    }
 
}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
           console.log(planetsReturned);
           return response.json();
    });
           return planetsReturned;
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