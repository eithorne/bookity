const fontSwitcher = document.querySelector(".fontSwitcher");
const fontSwitcherButton = fontSwitcher.querySelector(".font-label");
const options = fontSwitcher.querySelectorAll(".dropdown-item");
const adjustableElements = document.querySelectorAll(".adjustableFont");

let currentFontStack = Cookies.get("fontStack") ?? "";
let currentFont = currentFontStack.split(",")[0];

currentFont = currentFont ? currentFont : "default font";

fontSwitcherButton.innerHTML = `${titleCase(currentFont)} `;

const currentOption = document.querySelector(
  `[data-bkt-font-family="${currentFont}"`
);
console.log(currentOption);

if (currentOption) currentOption.classList.add("disabled");

if (currentFontStack)
  adjustableElements.forEach(
    (element) => (element.style.fontFamily = currentFontStack)
  );

options.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.preventDefault();
    options.forEach((option) => option.classList.remove("disabled"));
    changeFont(option);
    if (option.getAttribute("data-bkt-font-family") !== "user-choice") {
      option.classList.add("disabled");
    }
  });
});
const changeFont = (option) => {
  let font = option.getAttribute("data-bkt-font-family") ?? "default";
  const style = option.getAttribute("data-bkt-font-style") ?? "sans-serif";
  let fontStack = "";
  if (style.toLowerCase() === "sans-serif") {
    fontStack = [
      "Inter",
      "Roboto",
      "Helvetica Neue",
      "Arial Nova",
      "Nimbus Sans",
      "Arial",
      "sans-serif",
    ];
  } else if (style.toLowerCase() === "serif") {
    fontStack = [
      "Iowan Old Style",
      "Palatino Linotype",
      "URW Palladio L",
      "P052",
      "serif",
    ];
  }
  if (font.toLowerCase() === "default font") {
    fontStack = [];
  } else if (font.toLowerCase() === "user-choice") {
    const choice = window.prompt("Please enter the font name", "Arial");
    fontStack = [choice, "system-ui", "sans-serif"];
    font = choice ?? "Default";
  } else {
    fontStack = [font, ...fontStack];
  }
  adjustableElements.forEach((element) => {
    element.style.fontFamily = fontStack.join();
  });
  Cookies.set("fontStack", fontStack.join());
  fontSwitcherButton.innerHTML = `${titleCase(font)} `;
};

function titleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
