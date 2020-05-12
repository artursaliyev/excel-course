const CODES = {
  A: 65,
  Z: 90,
};

function createCell(_, col) {
  return `<div class="cell" contenteditable data-col=${col}></div>`
}
function toColumn(col, index) {
  return `
    <div class="column" data-type="resizable" data-col="${index}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(content, index = '') {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>':''
  return `
    <div class="row" data-type="resizable">
        <div class="row-info">${index}${resize}</div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCol=15) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  const cells = new Array(colsCount)
      .fill('')
      .map(createCell)
      .join('')

  for (let i=0; i < rowsCol; i++) {
    rows.push(createRow(cells, i + 1))
  }

  return rows.join('')
}
