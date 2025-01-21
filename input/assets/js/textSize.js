const increaseFontSizeButton = document.querySelector(
  "[data-bkt-text='increaseSize']"
);
const decreaseFontSizeButton = document.querySelector(
  "[data-bkt-text='decreaseSize']"
);
const resetButton = document.querySelector("[data-bkt-text='reset']");

const resizeableTextElement = document.querySelector(".adjustableTextSize");
let currentFontSizeModifier = Cookies.get("fontSize") ?? 0;

const minimumFontSize = 14;
const maximumFontSize = 25;

document.body.style.setProperty(
  "--text-size-modifier",
  currentFontSizeModifier + "px"
);
if (currentFontSizeModifier !== "0") resetButton.classList.remove("disabled");

let currentFontSize = window
  .getComputedStyle(resizeableTextElement)
  .getPropertyValue("font-size");
currentFontSizeDisplay = document.querySelector("[data-bkt-text-current-size]");

currentFontSizeDisplay.innerHTML = currentFontSize;

decreaseFontSizeButton.addEventListener("click", () => {
  currentFontSize = parseInt(
    window
      .getComputedStyle(resizeableTextElement)
      .getPropertyValue("font-size"),
    10
  );
  resetButton.classList.remove("disabled");
  document.body.style.setProperty(
    "--text-size-modifier",
    --currentFontSizeModifier + "px"
  );
  if (currentFontSize === minimumFontSize + 1) {
    decreaseFontSizeButton.classList.add("disabled");
  }
  if (currentFontSize === maximumFontSize) {
    increaseFontSizeButton.classList.remove("disabled");
  }

  if (currentFontSizeModifier === 0) {
    resetButton.classList.add("disabled");
  }
  Cookies.set("fontSize", currentFontSizeModifier);
  currentFontSize = window
    .getComputedStyle(resizeableTextElement)
    .getPropertyValue("font-size");
  currentFontSizeDisplay.innerHTML = currentFontSize;
});

increaseFontSizeButton.addEventListener("click", () => {
  currentFontSize = parseInt(
    window
      .getComputedStyle(resizeableTextElement)
      .getPropertyValue("font-size"),
    10
  );

  resetButton.classList.remove("disabled");
  document.body.style.setProperty(
    "--text-size-modifier",
    ++currentFontSizeModifier + "px"
  );
  if (currentFontSize === maximumFontSize - 1) {
    increaseFontSizeButton.classList.add("disabled");
  }
  if (currentFontSize === minimumFontSize) {
    decreaseFontSizeButton.classList.remove("disabled");
  }
  if (currentFontSizeModifier === 0) {
    resetButton.classList.add("disabled");
  }
  Cookies.set("fontSize", currentFontSizeModifier);
  currentFontSize = window
    .getComputedStyle(resizeableTextElement)
    .getPropertyValue("font-size");
  currentFontSizeDisplay.innerHTML = currentFontSize;
});

resetButton.addEventListener("click", () => {
  document.body.style.setProperty("--text-size-modifier", 0);
  currentFontSizeModifier = 0;
  resetButton.classList.add("disabled");
  increaseFontSizeButton.classList.remove("disabled");
  decreaseFontSizeButton.classList.remove("disabled");
  Cookies.set("fontSize", currentFontSizeModifier);

  currentFontSize = window
    .getComputedStyle(resizeableTextElement)
    .getPropertyValue("font-size");
  currentFontSizeDisplay.innerHTML = currentFontSize;
});
