/*jslint browser:true */
"use strict";

function addMonths(name) {
    let annualUseKw = 0, dailyUseKw = 0, i = 0, x = 0;
    let months = document.getElementById(name).getElementsByTagName('input');

    for(i = 0; i < months.length; i++) {
        x = Number(months[i].value);
        annualUseKw += x;
    } //end of loop

    dailyUseKw = annualUseKw / 365;
    return dailyUseKw;

} //end of function

function sunHours() {
    var hrs;
    var theZone = document.forms.solarForm.zone.selectedIndex;
    theZone += 1;
    switch(theZone) {
        case 1:
            hrs = 6;
            break;
        case 2:
            hrs = 5.5;
            break;
        case 3:
            hrs = 5;
            break;
        case 4:
            hrs = 4.5;
            break;
        case 5:
            hrs = 4.2;
            break;
        case 6:
            hrs = 3.5;
            break;
        default:
            hrs = 0;
    } //end of switch
    return hrs;

} //end of function

function calculatePanel() {
    let userChoice = document.forms.solarForm.panel.selectedIndex;
    let panelOptions = document.forms.solarForm.panel.options;
    let power = panelOptions[userChoice].value;
    let name = panelOptions[userChoice].text;
    let x = [power, name];
    return x;
} //end of function




function calculateSolar() {
    let dailyUseKw = addMonths('mpc');
    //console.log(dailyUseKw);

    let sunHoursPerDay = sunHours();
    //console.log(sunHoursPerDay);

    let minKwNeeds = dailyUseKw / sunHoursPerDay;
    //console.log(minKwNeeds);

    let realKwNeeds = minKwNeeds * 1.25;
    //console.log(realKwNeeds);

    let realWattNeeds = realKwNeeds * 1000;
    //console.log(realWattNeeds);

    let panelInfo = calculatePanel();
    let panelOutput = panelInfo[0];
    let panelName = panelInfo[1];

    //console.log(panelOutput);
    //console.log(panelName);

    let panelsNeeded = Math.ceil(realWattNeeds / panelOutput);
    //console.log(panelsNeeded);

    let feedback="";
    feedback += "<p>Based on your average daily use of " + Math.round(dailyUseKw) + " kWh, you will need to purchase " + panelsNeeded + " " + panelName + " solar panels to offset 100% of your electricity bill.</p>";
    feedback += "<br><h2>Additional Details</h2>";
    feedback += "<p>Your average daily electricity consumption: " + Math.round(dailyUseKw) + " kWh per day.</p>";
    feedback += "<p>Average sunshine hours per day: " + sunHoursPerDay + " hours</p>";
    feedback += "<p>Realistic watts needed per hour: " + Math.round(realWattNeeds) + " watts/hour.</p>";
    feedback += "<p>The " + panelName + " panel you selected generates about " + panelOutput + " watts per hour.</p>";

    document.getElementById('feedback').innerHTML = feedback;
} //end of function