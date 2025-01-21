export const dropdown = (button, links, dropdownClasses) => {
  if (button.color) button.colour = button.color;
  const buttonElement = `<button class="btn btn-${
    button.colour ?? ""
  } dropdown-toggle ${button.classes ?? ""}" style="${
    button.styling ?? ""
  }" type="button" data-bs-toggle="dropdown" aria-expanded="false">${
    button.label ?? ""
  }</button>`;
  const linkElements = links
    .map(
      (link) =>
        `<li><a class="dropdown-item ${link.classes ?? ""}" href="${
          link.url ?? "#"
        }" ${link.data ?? ""}>${link.label ?? ""}</a></li>`
    )
    .join("\n");
  return `<div class="dropdown ${dropdownClasses}">\n${buttonElement}\n<ul class="dropdown-menu py-0">${linkElements}</ul></div>`;
};
