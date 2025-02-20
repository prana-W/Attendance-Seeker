{

    //* Added a working clock instead of boring static one!

const timeElement = document.querySelector("span#lbltime");

setInterval(() => {
    const myTime = new Date();
  timeElement.innerText = `${myTime.toLocaleTimeString()}`;
}, 1000);

}

{

  //* Highlights the classes of any day

  const temp = document.querySelectorAll("td");
  let subCodeCol = Array.from (temp);

  for (let i = 2; i < subCodeCol; i++) {
    if (i%2 === 0) {
      temp[i].style.color = "red";
      console.log("ok!");
    }
  }

}