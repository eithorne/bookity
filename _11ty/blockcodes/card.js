export const card = (content, parameters) => {
  let header;
  if (typeof parameters === "string") {
    header = `<div class="card-header">${parameters}</div>` ?? "";
  } else if (typeof parameters === "object" && parameters.header) {
    header = `<div class="card-header">${parameters.header}</div>` ?? "";
  }
  const img = parameters.img ? `<img class="card-img-top" src="${img}">` : "";
  const title = parameters.title
    ? `<h5 class="card-title">${parameters.title}</h5>`
    : "";
  const subtitle = parameters.subtitle
    ? `<h6 class="card-subtitle mb-2 text-muted">${parameters.subtitle}</h6>`
    : "";
  const body = `<div class="card-body p-3">
  ${title}
  ${subtitle}
  ${content}
  </div>`;
  const footer = parameters.footer
    ? `<div class="card-footer text-muted">${parameters.footer}</div>`
    : "";

  return `<div class="card ${parameters.classes ?? ""}" style="${
    parameters.styling ?? ""
  }">${img}${header ?? ""}${body}${footer}</div>`;
};
