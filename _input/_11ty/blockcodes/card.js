export const card = (content, title, classString = "", styling = "") => {
  const header = title ? `<div class="card-header">${title}</div>` : "";
  const body = `<div class="card-body">${content}</div>`;

  return `<div class="card ${classString}" style="${styling}">${header}${body}</div>`;
};
