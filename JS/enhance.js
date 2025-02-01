{

    //* Added a working clock instead of boring static one!

const timeElement = document.querySelector("span#lbltime");

setInterval(() => {
    const myTime = new Date();
  timeElement.innerText = `${myTime.toLocaleTimeString()}`;
}, 1000);

}
