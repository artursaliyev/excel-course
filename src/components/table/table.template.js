const CODES = {
  A: 65,
  Z: 90,
};

function createCell() {
  return `<div class="cell" contenteditable></div>`
}
function toColumn(content) {
  return `
    <div class="column">${content}</div>
    `
}

function createRow(content, index = '') {
  return `
    <div class="row">
        <div class="row-info">${index}</div>
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
