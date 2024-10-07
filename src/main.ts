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

function updateAmount() {
  counter.innerHTML = "Money Faces: " + amount.toString();
}

button.addEventListener("click", function () {
  amount += 1;
  updateAmount();
  updateAutoDisable();
});

const lastFrameTime = performance.now();

let autoClickUpgrades = 0;

setInterval(() => autoClick(autoClickUpgrades), lastFrameTime);

function autoClick(upgrades: number) {
  amount += upgrades / (1000 / lastFrameTime);
  updateAmount();
  updateAutoDisable();
}

const buyUpgrade = document.createElement("button");
buyUpgrade.innerHTML = "Buy 1 passive click (10 Money Faces)";
buyUpgrade.disabled = true;
app.append(buyUpgrade);

function updateAutoDisable() {
  buyUpgrade.disabled = amount >= 10 ? false : true;
}

buyUpgrade.addEventListener("click", function () {
  amount -= 10;
  autoClickUpgrades += 1;
  updateAmount();
  updateAutoDisable();
});
