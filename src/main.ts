import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "People Clicker";
document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);

const button = document.createElement("button");
button.innerHTML = "👤";
button.style.height = "100%";
button.style.fontSize = "500%";
button.style.backgroundColor = "#242424";
app.append(button);

let amount = 0;
const counter = document.createElement("div");
counter.innerHTML = "People: " + amount.toString();
counter.style.fontSize = "24px";
app.append(counter);

function updateAmount() {
  counter.innerHTML = "People: " + amount.toFixed(0).toString();
  //counter.innerHTML = "People: " + amount.toString();
}

button.addEventListener("click", function () {
  amount += 1;
  updateAmount();
  updateAutoDisable();
});

const lastFrameTime = performance.now();

let autoClickUpgrades = 0;
const passivePeople = document.createElement("div");
passivePeople.innerHTML = "per Second: " + autoClickUpgrades.toString();
passivePeople.style.fontSize = "16px";
passivePeople.style.marginBottom = "10px";
app.append(passivePeople);

setInterval(() => autoClick(autoClickUpgrades), lastFrameTime);

function autoClick(upgrades: number) {
  amount += upgrades / (1000 / lastFrameTime);
  updateAmount();
  updateAutoDisable();
  updatePassivePeople();
}

function updatePassivePeople() {
  passivePeople.innerHTML = "per Second: " + autoClickUpgrades.toString();

  passivePeople.style.fontSize = "12px";

  tooltip.innerHTML =
    "0.1 passive People (Cost: " +
    smallUpgradePrice.toString() +
    " People)<br>Purchased: " +
    smallUpgradeCount.toString();

  mediumTooltip.innerHTML =
    "2 passive People (Cost: " +
    mediumUpgradePrice.toString() +
    " People)<br>Purchased: " +
    mediumUpgradeCount.toString();

  bigTooltip.innerHTML =
    "50 passive People (Cost: " +
    bigUpgradePrice.toString() +
    " People)<br>Purchased: " +
    bigUpgradeCount.toString();
}

const buySmallUpgrade = document.createElement("button");
buySmallUpgrade.style.margin = "10px";
buySmallUpgrade.style.maxWidth = "220px";
buySmallUpgrade.style.height = "100px";
buySmallUpgrade.style.minWidth = "220px";

let smallUpgradeCount = 0;
let smallUpgradePrice = 10;
buySmallUpgrade.innerHTML = "👶 Baby";
buySmallUpgrade.style.fontSize = "200%";

const tooltip = document.createElement("div");
tooltip.style.position = "absolute";
tooltip.style.visibility = "hidden";
tooltip.style.backgroundColor = "#242424";
tooltip.style.color = "white";
tooltip.style.padding = "5px";
tooltip.style.borderRadius = "5px";
tooltip.style.maxWidth = "200px";
tooltip.innerHTML =
  "0.1 passive People (Cost: " +
  smallUpgradePrice.toString() +
  " People)<br>Purchased: " +
  smallUpgradeCount.toString();
app.append(tooltip);

buySmallUpgrade.addEventListener("mouseover", (event) => {
  tooltip.style.visibility = "visible";
  tooltip.style.left = event.pageX + "px";
  tooltip.style.top = event.pageY + "px";
});

buySmallUpgrade.addEventListener("mouseout", () => {
  tooltip.style.visibility = "hidden";
});

app.append(buySmallUpgrade);

function updateAutoDisable() {
  buySmallUpgrade.disabled = amount >= smallUpgradePrice ? false : true;
  buyMediumUpgrade.disabled = amount >= mediumUpgradePrice ? false : true;
  buyBigUpgrade.disabled = amount >= bigUpgradePrice ? false : true;
}

buySmallUpgrade.addEventListener("click", function () {
  amount -= 10;
  smallUpgradePrice *= 1.15;
  autoClickUpgrades += 0.1;
  smallUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassivePeople();
});

const buyMediumUpgrade = document.createElement("button");
buyMediumUpgrade.style.margin = "10px";
buyMediumUpgrade.style.maxWidth = "220px";
buyMediumUpgrade.style.height = "100px";
buyMediumUpgrade.style.fontSize = "180%";
buyMediumUpgrade.style.minWidth = "220px";

let mediumUpgradeCount = 0;
let mediumUpgradePrice = 100;
buyMediumUpgrade.innerHTML = "👦 Toddler";

const mediumTooltip = document.createElement("div");
mediumTooltip.style.position = "absolute";
mediumTooltip.style.visibility = "hidden";
mediumTooltip.style.backgroundColor = "#242424";
mediumTooltip.style.color = "white";
mediumTooltip.style.padding = "5px";
mediumTooltip.style.borderRadius = "5px";
mediumTooltip.style.maxWidth = "200px";
mediumTooltip.innerHTML =
  "2 passive People (Cost: " +
  mediumUpgradePrice.toString() +
  " People)<br>Purchased: " +
  mediumUpgradeCount.toString();
app.append(mediumTooltip);

buyMediumUpgrade.addEventListener("mouseover", (event) => {
  mediumTooltip.style.visibility = "visible";
  mediumTooltip.style.left = event.pageX + 10 + "px";
  mediumTooltip.style.top = event.pageY + 10 + "px";
});

buyMediumUpgrade.addEventListener("mouseout", () => {
  mediumTooltip.style.visibility = "hidden";
});

app.append(buyMediumUpgrade);

buyMediumUpgrade.addEventListener("click", function () {
  amount -= 100;
  mediumUpgradePrice *= 1.15;
  autoClickUpgrades += 2;
  mediumUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassivePeople();
});

const buyBigUpgrade = document.createElement("button");
buyBigUpgrade.style.margin = "10px";
buyBigUpgrade.style.maxWidth = "220px";
buyBigUpgrade.style.height = "100px";
buyBigUpgrade.style.fontSize = "180%";
buyBigUpgrade.style.minWidth = "220px";

let bigUpgradeCount = 0;
let bigUpgradePrice = 100;
buyBigUpgrade.innerHTML = "👨 Man";

const bigTooltip = document.createElement("div");
bigTooltip.style.position = "absolute";
bigTooltip.style.visibility = "hidden";
bigTooltip.style.backgroundColor = "#242424";
bigTooltip.style.color = "white";
bigTooltip.style.padding = "5px";
bigTooltip.style.borderRadius = "5px";
bigTooltip.style.maxWidth = "200px";
bigTooltip.innerHTML =
  "50 passive People (Cost: " +
  bigUpgradePrice.toString() +
  " People)<br>Purchased: " +
  bigUpgradeCount.toString();
app.append(bigTooltip);

buyBigUpgrade.addEventListener("mouseover", (event) => {
  bigTooltip.style.visibility = "visible";
  bigTooltip.style.left = event.pageX + 10 + "px";
  bigTooltip.style.top = event.pageY + 10 + "px";
});

buyBigUpgrade.addEventListener("mouseout", () => {
  bigTooltip.style.visibility = "hidden";
});

app.append(buyBigUpgrade);

buyBigUpgrade.addEventListener("click", function () {
  amount -= 1000;
  bigUpgradePrice *= 1.15;
  autoClickUpgrades += 50;
  bigUpgradeCount += 1;
  updateAmount();
  updateAutoDisable();
  updatePassivePeople();
});
