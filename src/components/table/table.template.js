const CODES = {
  A: 65,
  Z: 90,
};
const DEFAULT_COL_WIDTH = 120
const DEFAULT_HEIGHT_WIDTH = 24


function toCell(state, row) {
  return function(_, col) {
    return `
    <div 
      class="cell" 
      contenteditable 
      data-col=${col}
      data-type=cell 
      data-id=${row}:${col}
      style="width:${getWidth(state.colState, col)}"
      >
      ${getData(state, row, col)}
    </div>`
  }
}

function getData(state, row, col) {
  return state.dataState[`${row}:${col}`] || ''
}

function toColumn({col, index, width}) {
  return `
    <div class="column" 
    data-type="resizable" 
    data-col="${index}"
    style="width:${width}"
    >
    ${col}
    <div class="col-resize" data-resize="col"></div>
    </div>
    `
}

function createRow(content, index = '', state) {
  const resize = index ? '<div class="row-resize" data-resize="row"></div>':''
  return `
    <div class="row" 
    data-type="resizable" 
    data-row="${index}"
    style="height:${getHeight(state.rowState, index)}"
    >
        <div class="row-info">${index}${resize}</div>
        <div class="row-data">${content}</div>
    </div>
    `;
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function getWidth(state={}, index) {
  return (state[index] || DEFAULT_COL_WIDTH) + 'px'
}

function getHeight(state={}, index) {
  return (state[index] || DEFAULT_HEIGHT_WIDTH) + 'px'
}

function widhtWidthFrom(state) {
  return function(col, index) {
    return {col, index, width: getWidth(state.colState, index)}
  }
}

export function createTable(rowsCol=15, state={}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(widhtWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(cols, 0, state))


  for (let row=0; row < rowsCol; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(state, row))
        .join('')
    rows.push(createRow(cells, row + 1, state))
  }

  return rows.join('')
}
