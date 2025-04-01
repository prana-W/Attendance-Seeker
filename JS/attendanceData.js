//This removes the feedback coloumn and replaces it by the number of classes that can be left in order to still maintain x% attendance

//* Class Skip Limit

let surplusState = true;

if (!localStorage.getItem("classLimit")) {
  localStorage.setItem("classLimit", 80);
}

function calculateSurplusClasses() {
  const temp = document.querySelectorAll("td"); //gets all 'td' from the document
  const arr = Array.from(temp); //converts the NodeList into an Array

  //Below sets an attribute and changes the heading of feedback (useless tbh) cell
  document
    .getElementById("ContentPlaceHolder1_gv_lblfeedback")
    .setAttribute("title", `Total classes that can be skipped!`);

  document.getElementById(
    "ContentPlaceHolder1_gv_lblfeedback"
  ).innerHTML = `Minimum Attendance Limit: <input type="number" id="class-skip-limit" value="${localStorage.getItem(
    "classLimit"
  )}" 
  style="color: black; width: 70px; height: 28px; border-radius: 6px; padding: 4px; text-align: center; 
  border: 1px solid #aaa; background: #f8f8f8; box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1); 
  font-size: 14px; outline: none; transition: all 0.2s ease-in-out;" 
  placeholder="Enter" title="Press Enter to submit" 
  onfocus="this.style.border='1px solid rgb(255, 165, 0)'; this.style.boxShadow='0px 0px 5px rgba(255, 165, 0, 0.69)';" 
  onblur="this.style.border='1px solid #aaa'; this.style.boxShadow='inset 2px 2px 5px rgba(0, 0, 0, 0.1)';">

<button id="switchTableContent" 
  style="color: black; background: rgb(50, 205, 50); border: none; border-radius: 6px; 
  padding: 6px 10px; font-size: 14px; color: white; cursor: pointer; 
  transition: background 0.2s ease-in-out;" 
  onmouseover="this.style.background='rgb(34, 139, 34)'" 
  onmouseout="this.style.background='rgb(50, 205, 50)'">
  Switch
</button>

`;

  setTimeout(() => {
    document
      .getElementById("switchTableContent")
      .addEventListener("click", (e) => {
        if (surplusState) {
          surplusState = false;
          calculateDeprivedClasses();
        } else {
          surplusState = true;
          calculateSurplusClasses();
        }
      });
  }, 0);

  for (let i = 16; i < arr.length; i++) {
    if ((i - 16) % 7 === 0) {
      const x = temp[i - 2].innerText;

      const numerator = x.substring(0, x.indexOf("/"));
      const denominator = x.substring(x.indexOf("/") + 1, x.length);

      const requiredClass =
        numerator / (Number(localStorage.getItem("classLimit")) / 100) -
        denominator;

      if (Math.floor(requiredClass) >= 0) {
        temp[i].innerText = Math.floor(requiredClass);
      } else temp[i].innerText = 0;
    }
  }

  document
    .getElementById("class-skip-limit")
    .addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        localStorage.setItem("classLimit", Number(e.target.value));

        //Below selects the elements containing feedback cells and manipulates them to show the number of classes that can be left!!
        for (let i = 16; i < arr.length; i++) {
          if ((i - 16) % 7 === 0) {
            const x = temp[i - 2].innerText;

            const numerator = x.substring(0, x.indexOf("/"));
            const denominator = x.substring(x.indexOf("/") + 1, x.length);

            const requiredClass =
              numerator / (Number(localStorage.getItem("classLimit")) / 100) -
              denominator;

            if (Math.floor(requiredClass) >= 0) {
              temp[i].innerText = Math.floor(requiredClass);
            } else temp[i].innerText = 0;
          }
        }
      }
    });
}

calculateSurplusClasses();

//* Class Deprived Number

if (!localStorage.getItem("classDeprived")) {
  localStorage.setItem("classDeprived", 80);
}

function calculateDeprivedClasses() {
  const temp = document.querySelectorAll("td"); //gets all 'td' from the document
  const arr = Array.from(temp); //converts the NodeList into an Array

  //Below sets an attribute and changes the heading of feedback (useless tbh) cell
  document
    .getElementById("ContentPlaceHolder1_gv_lblfeedback")
    .setAttribute("title", "Classes that are required to attend!");

  document.getElementById(
    "ContentPlaceHolder1_gv_lblfeedback"
  ).innerHTML = `Maximum Attendance Limit: <input type="number" id="class-skip-limit" value="${localStorage.getItem(
    "classLimit"
  )}" 
  style="color: black; width: 70px; height: 28px; border-radius: 6px; padding: 4px; text-align: center; 
  border: 1px solid #aaa; background: #f8f8f8; box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.1); 
  font-size: 14px; outline: none; transition: all 0.2s ease-in-out;" 
  placeholder="Enter" title="Press Enter to submit" 
  onfocus="this.style.border='1px solid rgb(255, 165, 0)'; this.style.boxShadow='0px 0px 5px rgba(255, 165, 0, 0.69)';" 
  onblur="this.style.border='1px solid #aaa'; this.style.boxShadow='inset 2px 2px 5px rgba(0, 0, 0, 0.1)';">

<button id="switchTableContent" 
  style="color: black; background: rgb(50, 205, 50); border: none; border-radius: 6px; 
  padding: 6px 10px; font-size: 14px; color: white; cursor: pointer; 
  transition: background 0.2s ease-in-out;" 
  onmouseover="this.style.background='rgb(34, 139, 34)'" 
  onmouseout="this.style.background='rgb(50, 205, 50)'">
  Switch
</button>`;

  setTimeout(() => {
    document
      .getElementById("switchTableContent")
      .addEventListener("click", (e) => {
        if (surplusState) {
          surplusState = false;
          calculateDeprivedClasses();
        } else {
          surplusState = true;
          calculateSurplusClasses();
        }
      });
  }, 0);

  for (let i = 16; i < arr.length; i++) {
    if ((i - 16) % 7 === 0) {
      const x = temp[i - 2].innerText;

      const numerator = x.substring(0, x.indexOf("/"));
      const denominator = x.substring(x.indexOf("/") + 1, x.length);

      const requiredClass =
        (denominator * Number(localStorage.getItem("classDeprived")) -
          100 * numerator) /
        (100 - Number(localStorage.getItem("classDeprived")));

      if (Math.ceil(requiredClass) >= 0) {
        temp[i].innerText = Math.ceil(requiredClass);
      } else temp[i].innerText = 0;
    }
  }

  document
    .getElementById("class-skip-limit")
    .addEventListener("keydown", (e) => {
      if (e.key == "Enter") {
        e.preventDefault();
        localStorage.setItem("classDeprived", Number(e.target.value));

        //Below selects the elements containing feedback cells and manipulates them to show the number of classes that can be left!!
        for (let i = 16; i < arr.length; i++) {
          if ((i - 16) % 7 === 0) {
            const x = temp[i - 2].innerText;

            const numerator = x.substring(0, x.indexOf("/"));
            const denominator = x.substring(x.indexOf("/") + 1, x.length);

            const requiredClass =
              (denominator * Number(localStorage.getItem("classDeprived")) -
                100 * numerator) /
              (100 - Number(localStorage.getItem("classDeprived")));

            if (Math.ceil(requiredClass) >= 0) {
              temp[i].innerText = Math.ceil(requiredClass);
            } else temp[i].innerText = 0;
          }
        }
      }
    });
}
