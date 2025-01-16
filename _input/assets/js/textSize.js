const increase = document.querySelector("[data-bkt-text='increaseSize']");
const decrease = document.querySelector("[data-bkt-text='decreaseSize']");
const reset = document.querySelector("[data-bkt-text='reset']");

const resizeable = document.querySelector(".adjustableTextSize");
let currentModifier = 0;

document.body.style.setProperty("--text-size-modifier", currentModifier);

decrease.addEventListener("click", () => {
  const size = parseInt(
    window.getComputedStyle(resizeable).getPropertyValue("font-size"),
    10
  );
  reset.classList.remove("disabled");
  if (size === 14) {
    decrease.classList.add("disabled");
  }
  document.body.style.setProperty(
    "--text-size-modifier",
    --currentModifier + "px"
  );
  if (size === 20) {
    increase.classList.remove("disabled");
  }
});

increase.addEventListener("click", () => {
  const size = parseInt(
    window.getComputedStyle(resizeable).getPropertyValue("font-size"),
    10
  );

  reset.classList.remove("disabled");
  if (size === 19) {
    increase.classList.add("disabled");
  }
  document.body.style.setProperty(
    "--text-size-modifier",
    ++currentModifier + "px"
  );
  if (size === 14) {
    decrease.classList.remove("disabled");
  }
});

reset.addEventListener("click", () => {
  document.body.style.setProperty("--text-size-modifier", 0);
  currentModifier = 0;
  reset.classList.add("disabled");
  increase.classList.remove("disabled");
  decrease.classList.remove("disabled");
});
