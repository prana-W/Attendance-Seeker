//This removes the feedback coloumn and replaces it by the number of classes that can be left in order to still maintain x% attendance
{

  //* Adding Class Skip Limit

  function calculateSurplusClasses() {
  const classLimit = Number (80); //! enter the desired limit here

  const temp = document.querySelectorAll('td'); //gets all 'td' from the document
  const arr = Array.from(temp); //converts the NodeList into an Array

  //Below sets an attribute and changes the heading of feedback (useless tbh) cell
  document
    .getElementById("ContentPlaceHolder1_gv_lblfeedback")
    .setAttribute("title", "Shows how many classes you can leave to get 80%+");

  document.getElementById("ContentPlaceHolder1_gv_lblfeedback").innerText =
    `Class Skip Limit (${classLimit}%)`;

  //Below selects the elements containing feedback cells and manipulates them to show the number of classes that can be left!!
  for (let i = 13; i < arr.length; i++) {
    if ((i - 13) % 7 === 0) {
      const x = temp[i - 2].innerText;

      const numerator = x.substring(0, x.indexOf("/"));
      const denominator = x.substring(x.indexOf("/") + 1, x.length);

      const requiredClass = `numerator /  ${classLimit}/100- denominator`;

      if (Math.floor(requiredClass) >= 0) {
        temp[i].innerText = Math.floor(requiredClass);
      } else temp[i].innerText = 0;
    }
  }
}


  calculateSurplusClasses()

}


{

  //* To check attendance of other students

let flag = 0;

//The function to search for the select tag and remove the disbaled attribute from it
function trigger(selectTag) {
  selectTag.removeAttribute("disabled");
  console.log(`Select tag updated!`);
  flag = 1; //when data is fetched succefully
}

trigger(document.querySelector("select.aspNetDisabled"));

//Checks the page every 1 second to check if the "disabled" attribute is present or not
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
        // legend.innerText = "Fetching...";
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

}