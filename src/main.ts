import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Save the human race!";
document.title = gameName;
const subheader = document.createElement("h3");
subheader.innerHTML = "Aliens are coming...";
const header = document.createElement("h1");
header.innerHTML = gameName;
app.append(header);
app.append(subheader);


interface Item {
  name: string;
  cost: number;
  rate: number;
  emoji: string;
  description: string;
}

const availableItems: Item[] = [
  {
    name: "Baby",
    cost: 10,
    rate: 0.1,
    emoji: "👶",
    description: "Goo goo, ga ga",
  },
  {
    name: "Toddler",
    cost: 100,
    rate: 2,
    emoji: "👦",
    description: "A toddler speaking their first words",
  },
  {
    name: "Adult",
    cost: 1000,
    rate: 50,
    emoji: "🧑",
    description: "A full grown member of society",
  },
  {
    name: "Parent",
    cost: 5000,
    rate: 100,
    emoji: "🧑‍🍼",
    description: "A loving parent with their own children",
  },
  {
    name: "Family",
    cost: 20000,
    rate: 250,
    emoji: "👩‍👩‍👦‍👦",
    description: "An entire family full of different generations",
  },
];

const upgradeCounts: { [key: string]: number } = {
  Baby: 0,
  Toddler: 0,
  Adult: 0,
  Parent: 0,
  Family: 0,
};

const buttons: { [key: string]: HTMLButtonElement } = {};

function getTotalPassiveRate() {
  return availableItems.reduce((total, item) => {
    return total + upgradeCounts[item.name] * item.rate;
  }, 0);
}

function updateAmount(time: number) {
  const deltaTime = (time - lastFrameTime) / 1000;
  lastFrameTime = time;

  const passiveRate = getTotalPassiveRate();
  amount += passiveRate * deltaTime;
  counter.innerHTML = "People: " + amount.toFixed(0).toString();
  passivePeople.innerHTML = "per Second: " + totalPassivePeopleRate.toString();
  updateAutoDisable();
  requestAnimationFrame(updateAmount);
}

function createBuyUpgradeButton(item: Item): HTMLButtonElement {
  const button = document.createElement("button");
  button.style.margin = "10px";
  button.style.width = "220px";
  button.style.fontSize = "180%";
  button.style.height = "100px";
  button.innerHTML = `${item.emoji} ${item.name}`;
  return button;
}

function createTooltip(item: Item): HTMLDivElement {
  const tooltip = document.createElement("div");
  tooltip.style.position = "absolute";
  tooltip.style.visibility = "hidden";
  tooltip.style.backgroundColor = "#242424";
  tooltip.style.color = "white";
  tooltip.style.padding = "5px";
  tooltip.style.borderRadius = "5px";
  tooltip.style.maxWidth = "400px";
  tooltip.innerHTML = `Buy ${item.rate} passive People<br>(Cost: ${item.cost} People)<br>Purchased: ${upgradeCounts[item.name]}<br><br>"${item.description}"`;
  return tooltip;
}

function attachTooltipEvents(button: HTMLButtonElement, tooltip: HTMLDivElement) {
  button.addEventListener("mouseover", (event) => {
    tooltip.style.visibility = "visible";
    tooltip.style.left = event.pageX + 10 + "px";
    tooltip.style.top = event.pageY + 10 + "px";
  });

  button.addEventListener("mouseout", () => {
    tooltip.style.visibility = "hidden";
  });
}

function attachPurchaseClickEvent(button: HTMLButtonElement, item: Item, tooltip: HTMLDivElement) {
  button.addEventListener("click", () => {
    upgradeCounts[item.name]++;
    amount -= item.cost;
    totalPassivePeopleRate += item.rate;
    tooltip.innerHTML = `Buy ${item.rate} passive People<br>(Cost: ${item.cost} People)<br>Purchased: ${upgradeCounts[item.name]}<br><br>"${item.description}"`;
  });
  buttons[item.name] = button;
}

const button = document.createElement("button");
button.innerHTML = "👤";
button.style.height = "100%";
button.style.fontSize = "500%";
button.style.backgroundColor = "#242424";
app.append(button);

button.addEventListener("click", function () {
  amount += 1;
});

let amount = 0;
const counter = document.createElement("div");
counter.innerHTML = "People: " + amount.toString();
counter.style.fontSize = "24px";
app.append(counter);

let lastFrameTime = performance.now();

requestAnimationFrame(updateAmount);

let totalPassivePeopleRate = 0;
const passivePeople = document.createElement("div");
passivePeople.innerHTML = "per Second: " + totalPassivePeopleRate.toString();
passivePeople.style.fontSize = "16px";
passivePeople.style.marginBottom = "10px";
app.append(passivePeople);

availableItems.forEach((item) => {
  const buyUpgradeButton = createBuyUpgradeButton(item);
  const tooltip = createTooltip(item);

  attachTooltipEvents(buyUpgradeButton, tooltip);
  attachPurchaseClickEvent(buyUpgradeButton, item, tooltip);

  app.append(buyUpgradeButton);
  app.append(tooltip);
});

function updateAutoDisable() {
  availableItems.forEach((item) => {
    buttons[item.name].disabled = amount >= item.cost ? false : true;
  });
}
