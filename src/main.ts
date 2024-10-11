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
  //counter.innerHTML = "Money Faces: " + amount.toFixed(0).toString();
  counter.innerHTML = "Money Faces: " + amount.toString();
}

button.addEventListener("click", function () {
  amount += 1;
  updateAmount();
  updateAutoDisable();
});

const lastFrameTime = performance.now();

let autoClickUpgrades = 0;
const passiveFaces = document.createElement("div");
passiveFaces.innerHTML = autoClickUpgrades.toString() + " Money Faces Per Second";
app.append(passiveFaces);

setInterval(() => autoClick(autoClickUpgrades), lastFrameTime);

function autoClick(upgrades: number) {
  amount += upgrades / (1000 / lastFrameTime);
  updateAmount();
  updateAutoDisable();
  updatePassiveFaces();
}

function updatePassiveFaces() {
  passiveFaces.innerHTML = autoClickUpgrades.toString() + " Money Faces Per Second";
  buySmallUpgrade.innerHTML = "Buy 0.1 passive clicks (10 Money Faces)\nPurchased: " + smallUpgradeCount.toString();
  buyMediumUpgrade.innerHTML = "Buy 2 passive clicks (100 Money Faces)\nPurchased: " + mediumUpgradeCount.toString();
  buyBigUpgrade.innerHTML = "Buy 50 passive clicks (1000 Money Faces)\nPurchased: " + bigUpgradeCount.toString();
}

const buySmallUpgrade = document.createElement("button");
let smallUpgradeCount = 0;
buySmallUpgrade.innerHTML = "Buy 0.1 passive clicks (10 Money Faces)\nPurchased: " + smallUpgradeCount.toString();
buySmallUpgrade.style.maxWidth = "200px";
buySmallUpgrade.disabled = true;
app.append(buySmallUpgrade);

function updateAutoDisable() {
  buySmallUpgrade.disabled = amount >= 10 ? false : true;
  buyMediumUpgrade.disabled = amount >= 100 ? false : true;
  buyBigUpgrade.disabled = amount >= 1000 ? false : true;
}

buySmallUpgrade.addEventListener("click", function () {
  amount -= 10;
  autoClickUpgrades += 0.1;
  smallUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassiveFaces();
});

const buyMediumUpgrade = document.createElement("button");
let mediumUpgradeCount = 0;
buyMediumUpgrade.innerHTML = "Buy 2 passive clicks (100 Money Faces)\nPurchased: " + mediumUpgradeCount.toString();
buyMediumUpgrade.style.maxWidth = "200px";
buyMediumUpgrade.disabled = true;
app.append(buyMediumUpgrade);

buyMediumUpgrade.addEventListener("click", function () {
  amount -= 100;
  autoClickUpgrades += 2;
  mediumUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassiveFaces();
});

const buyBigUpgrade = document.createElement("button");
let bigUpgradeCount = 0;
buyBigUpgrade.innerHTML = "Buy 50 passive clicks (1000 Money Faces)\nPurchased: " + bigUpgradeCount.toString();
buyBigUpgrade.style.maxWidth = "200px";
buyBigUpgrade.disabled = true;
app.append(buyBigUpgrade);

buyBigUpgrade.addEventListener("click", function () {
  amount -= 1000;
  autoClickUpgrades += 50;
  bigUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassiveFaces();
});

