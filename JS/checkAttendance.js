//* To check attendance of other students

let flag = 0;

//The function to search for the select tag and remove the disbaled attribute from it
function trigger(selectTag) {
  selectTag.removeAttribute("disabled");
  flag = 1; //when data is fetched succefully
}

trigger(document.querySelector("select.aspNetDisabled"));

//Checks the page every 500 ms to check if the "disabled" attribute is present or not
const intervalId = setInterval(() => {
  const selectTag = document.querySelector("select.aspNetDisabled");
  if (selectTag && selectTag.hasAttribute("disabled")) {
    trigger(selectTag);
    flag = 1;
  }

  if (flag == 1) {
    var legend = document.querySelector("legend");
    if (legend) {
      // Check if the legend text is 'Fetching...'

      legend.innerHTML =
        "Class Attendance &nbsp; &nbsp;<span style='color : red; font-size: smaller;' >(Data fetched successfully!)</span>";

      calculateSurplusClasses();
    }
    flag = 0;
  } else if (flag == 0) {
    // Select the legend element
    var legend = document.querySelector("legend");

    // Add event listener to change the legend when an option is selected
    document
      .getElementById("ContentPlaceHolder1_ddlroll")
      .addEventListener("change", function () {
        // Change the legend to "Fetching" when an option is selected
        legend.innerHTML =
          "Class Attendance &nbsp; &nbsp;<span style='color : red; font-size: smaller;' >(Fetching data...)</span>";
        flag = 2;
      });
  }
}, 500);

var legend = document.querySelector("legend");

// Add event listener to change the legend when an option is selected
document
  .getElementById("ContentPlaceHolder1_ddlroll")
  .addEventListener("change", function () {
    // Change the legend to "Fetching" when an option is selected
    legend.innerHTML =
      "Class Attendance &nbsp; &nbsp;<span style='color : red; font-size: smaller;' >(Fetching data...)</span>";
  });
