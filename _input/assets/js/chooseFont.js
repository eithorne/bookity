const fontSwitcher = document.querySelector(".fontSwitcher");
const options = fontSwitcher.querySelectorAll(".dropdown-item");
const adjustableElements = document.querySelectorAll(".adjustableFont");
const currentFont = Cookies.get("font");
if (currentFont)
  adjustableElements.forEach(
    (element) => (element.style.fontFamily = currentFont)
  );
options.forEach((option) => {
  option.addEventListener("click", (event) => {
    event.preventDefault();
    changeFont(option);
  });
});
const changeFont = (option) => {
  const font = option.getAttribute("data-bkt-font-family") ?? "reset";
  const style = option.getAttribute("data-bkt-font-style") ?? "sans-serif";
  let fontStack = "";
  if (style === "sans-serif") {
    fontStack = [
      "Inter",
      "Roboto",
      "Helvetica Neue",
      "Arial Nova",
      "Nimbus Sans",
      "Arial",
      "sans-serif",
    ];
  } else if (style === "serif") {
    fontStack = [
      "Iowan Old Style",
      "Palatino Linotype",
      "URW Palladio L",
      "P052",
      "serif",
    ];
  }
  if (font === "reset") {
    fontStack = [];
  } else if (font === "user-choice") {
    const choice = window.prompt("Please enter the font name", "Arial");
    fontStack = [choice, "system-ui", "sans-serif"];
  } else {
    fontStack = [font, ...fontStack];
  }
  adjustableElements.forEach((element) => {
    element.style.fontFamily = fontStack.join();
  });
  Cookies.set("font", fontStack.join());
};
