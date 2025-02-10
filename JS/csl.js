//This removes the feedback coloumn and replaces it by the number of classes that can be left in order to still maintain x% attendance

    //* Adding Class Skip Limit
  
    function calculateSurplusClasses() {
      let classLimit = Number(80); //! enter the desired limit here
  
      const temp = document.querySelectorAll("td"); //gets all 'td' from the document
      const arr = Array.from(temp); //converts the NodeList into an Array
  
      //Below sets an attribute and changes the heading of feedback (useless tbh) cell
      document
        .getElementById("ContentPlaceHolder1_gv_lblfeedback")
        .setAttribute(
          "title",
          "Shows how many classes you can leave to get x% (by default 80%)"
        );
  
      document.getElementById("ContentPlaceHolder1_gv_lblfeedback").innerHTML =
        "Class Skip Limit: <input type='number' id='class-skip-limit' placeholder= 'Click enter! Default: 80%' style='color: black;' enabled> %";
  
        for (let i = 13; i < arr.length; i++) {
          if ((i - 13) % 7 === 0) {
            const x = temp[i - 2].innerText;
  
            const numerator = x.substring(0, x.indexOf("/"));
            const denominator = x.substring(x.indexOf("/") + 1, x.length);
  
            const requiredClass =
              numerator / (classLimit / 100) - denominator;
  
            if (Math.floor(requiredClass) >= 0) {
              temp[i].innerText = Math.floor(requiredClass);
            } else temp[i].innerText = 0;
          }
        }
  
      document
        .getElementById("class-skip-limit")
        .addEventListener("keydown", (e) => {
  
          if (e.key == "Enter") {
            e.preventDefault()
            console.log(Number(e.target.value));
            classLimit = Number(e.target.value);
  
            //Below selects the elements containing feedback cells and manipulates them to show the number of classes that can be left!!
            for (let i = 13; i < arr.length; i++) {
              if ((i - 13) % 7 === 0) {
                const x = temp[i - 2].innerText;
  
                const numerator = x.substring(0, x.indexOf("/"));
                const denominator = x.substring(x.indexOf("/") + 1, x.length);
  
                const requiredClass =
                  numerator / (classLimit / 100) - denominator;
  
                if (Math.floor(requiredClass) >= 0) {
                  temp[i].innerText = Math.floor(requiredClass);
                } else temp[i].innerText = 0;
              }
            }
          }
        });
    }
  
    calculateSurplusClasses();