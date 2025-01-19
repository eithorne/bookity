export const fa = (fontawesome, classString = "", stylingString = "") => {
  if (typeof fontawesome === "string") {
    fontawesome = { icon: fontawesome };
  }
  const styling = `style="${stylingString}"`;
  const faClasses = [
    fontawesome.style ?? "solid",
    fontawesome.size ?? null,
    fontawesome.animation ?? null,
  ];
  classString =
    classString +
    " fa-" +
    faClasses.filter((faClass) => !!faClass).join(" fa-");
  return `<i class="fa-${fontawesome.icon} ${classString}" ${styling}></i>`;
};
