//TFL API
const API = "https://api.tfl.gov.uk/Line/Mode/tube,overground,dlr/Status";

//Fetch Request: Created promise function with API as argument - response wil hold the fetched api information
//then this is parsed into JSON - await is used to wait till this promise is resolved.
async function getTflStatus(apiURL) {
  let response = await fetch(apiURL);
  return await response.json();
}

//function to get goodlines - nested function - to filter through the data from API to get good lines only
let getGoodLines = (data) => {
  let getGoodLinesOnly = data.filter(function (lineInfo) {
    return lineInfo.lineStatuses[0].statusSeverity === 10;
  });
  return getGoodLinesOnly;
};

//function to get goodlines - nested function - to filter through the data from API to get bad lines only
getBadLines = (data) => {
  const getBadLinesOnly = data.filter(function (lineInfo) {
    return lineInfo.lineStatuses[0].statusSeverity !== 10;
  });
  return getBadLinesOnly;
};

//Function to show TFL Status - name can be used - out of scope
// use the get function with the API and that data goes into 2 variables
// the variables hold the function that was written before but this time with the api data
showTflStatus = () => {
  getTflStatus(API).then((data) => {
    let getGoodLinesOnly = getGoodLines(data);
    let getBadLinesOnly = getBadLines(data);

    //use foreach method for each line we add div, classlist of container and set the id to the line.id
    //use this classlist for line.id
    //use classlist for all for hidden
    getBadLinesOnly.forEach((line) => {
      let containerOfLineStatusOverall = document.createElement("div");
      containerOfLineStatusOverall.classList.add("container");
      containerOfLineStatusOverall.id = line.id;
      containerOfLineStatusOverall.classList.add(line.id);
      containerOfLineStatusOverall.classList.add("all");
      //give the container LineName a p tag
      //create a textnode with the line name
      //append this to containerOfLineName
      let containerOfLineName = document.createElement("p");
      let LineName = document.createTextNode(line.name);
      containerOfLineName.appendChild(LineName);

      // do same but with the status and to get this we have to target statusSeverityDescription
      let containerOfLineStatus = document.createElement("p");
      let lineStatus = document.createTextNode(
        line.lineStatuses[0].statusSeverityDescription
      );
      // append the to the container of status
      // append both of these to the overall
      containerOfLineStatus.appendChild(lineStatus);
      containerOfLineStatusOverall.append(
        containerOfLineName,
        containerOfLineStatus
      );
      //append the overall to status which is an element in my html
      document
        .getElementById("status")
        .appendChild(containerOfLineStatusOverall);
    });
    // do same thing but with good
    getGoodLinesOnly.forEach((line) => {
      let containerOfLineStatusOverall = document.createElement("div");
      containerOfLineStatusOverall.classList.add("container");
      containerOfLineStatusOverall.id = line.id;
      containerOfLineStatusOverall.classList.add(line.id);
      containerOfLineStatusOverall.classList.add("all");
      let containerOfLineName = document.createElement("p");
      let LineName = document.createTextNode(line.name);
      containerOfLineName.appendChild(LineName);

      let containerOfLineStatus = document.createElement("p");
      let lineStatus = document.createTextNode(
        line.lineStatuses[0].statusSeverityDescription
      );

      containerOfLineStatus.appendChild(lineStatus);

      containerOfLineStatusOverall.append(
        containerOfLineName,
        containerOfLineStatus
      );
      document
        .getElementById("status")
        .appendChild(containerOfLineStatusOverall);
    });
  });
};
// when the event of the DOM is loaded we will show the TFLstatus
document.addEventListener("DOMContentLoaded", (event) => {
  showTflStatus();
});

//Function to toggle tabs for different modes
//on click will start the function
// the function makes everything get class of all get the class
// but the one we want to be seen we remove the class hide
function showPanel(panelId) {
  console.log(panelId);
  const allPanels = document.querySelectorAll(".all");
  allPanels.forEach((panel) => panel.classList.add("hide"));
  document.getElementById("northern").classList.remove("hide");
  document.getElementById("central").classList.remove("hide");
  document.getElementById("bakerloo").classList.remove("hide");
  document.getElementById("circle").classList.remove("hide");
  document.getElementById("district").classList.remove("hide");
  document.getElementById("hammersmith-city").classList.remove("hide");
  document.getElementById("jubilee").classList.remove("hide");
  document.getElementById("metropolitan").classList.remove("hide");
  document.getElementById("piccadilly").classList.remove("hide");
  document.getElementById("victoria").classList.remove("hide");
  document.getElementById("waterloo-city").classList.remove("hide");
}

function showPanelRail(panelId) {
  console.log(panelId);
  const allPanels = document.querySelectorAll(".all");
  allPanels.forEach((panel) => panel.classList.add("hide"));
  document.getElementById("tfl-rail").classList.remove("hide");
}

function showPanelDlr(panelId) {
  console.log(panelId);
  const allPanels = document.querySelectorAll(".all");
  allPanels.forEach((panel) => panel.classList.add("hide"));
  document.getElementById("dlr").classList.remove("hide");
}
