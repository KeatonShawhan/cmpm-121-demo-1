import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "My super cool game";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "🤑";
button.style.height = "100%";
button.style.fontSize = "500%";
button.style.backgroundColor = "#242424";
app.append(button);

let amount = 0;
const counter = document.createElement("div");
counter.innerHTML = "Money Faces: " + amount.toString();
app.append(counter);

button.addEventListener("click", function () {
  amount += 1;
  counter.innerHTML = "Money Faces: " + amount.toString();
});
