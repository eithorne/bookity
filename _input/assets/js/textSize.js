const increase = document.querySelector("[data-bkt-text='increaseSize']");
const decrease = document.querySelector("[data-bkt-text='decreaseSize']");
const reset = document.querySelector("[data-bkt-text='reset']");

const resizeable = document.querySelector(".adjustableTextSize");
let currentModifier = Cookies.get("fontSize") ?? 0;
const min = 14;
const max = 20;

document.body.style.setProperty("--text-size-modifier", currentModifier + "px");
if (currentModifier !== 0) reset.classList.remove("disabled");

decrease.addEventListener("click", () => {
  const size = parseInt(
    window.getComputedStyle(resizeable).getPropertyValue("font-size"),
    10
  );
  reset.classList.remove("disabled");
  document.body.style.setProperty(
    "--text-size-modifier",
    --currentModifier + "px"
  );
  if (size === min) {
    decrease.classList.add("disabled");
  }
  if (size === max) {
    increase.classList.remove("disabled");
  }

  if (currentModifier === 0) {
    reset.classList.add("disabled");
  }
  Cookies.set("fontSize", currentModifier);
});

increase.addEventListener("click", () => {
  const size = parseInt(
    window.getComputedStyle(resizeable).getPropertyValue("font-size"),
    10
  );

  reset.classList.remove("disabled");
  document.body.style.setProperty(
    "--text-size-modifier",
    ++currentModifier + "px"
  );
  if (size === max) {
    increase.classList.add("disabled");
  }
  if (size === min) {
    decrease.classList.remove("disabled");
  }
  if (currentModifier === 0) {
    reset.classList.add("disabled");
  }
  Cookies.set("fontSize", currentModifier);
});

reset.addEventListener("click", () => {
  document.body.style.setProperty("--text-size-modifier", 0);
  currentModifier = 0;
  reset.classList.add("disabled");
  increase.classList.remove("disabled");
  decrease.classList.remove("disabled");
  Cookies.set("fontSize", currentModifier);
});
