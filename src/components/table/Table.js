import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from './table.template';
import {shouldResize, isCell, matrix, nextSelector} from './table.functions'
import {resizeHandler} from './table.resize'
import {TableSelection} from './TableSelection';
import {$} from '@core/dom'
import * as actions from '@/redux/actions'
import {changeText} from '../../redux/actions';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    })
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
  }

  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))

    this.$on('formula:input', text=>{
      this.selection.current.text(text)
      this.updateStateInText(text)
    })

    this.$on('formula:done', ()=>this.selection.current.focus())

    // this.$subscribe((state)=>{
    //   console.log('TableState: ', state);
    // })
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      // console.log(data);

      this.$dispatch(actions.tableResize(data))
    } catch (error) {
      console.error(error.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.cell)
            .map(id=>this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown'
    ]
    const key = event.key
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.cell.id(true)
      const $next = this.$root.find(nextSelector(key, id))

      this.selectCell($next)
    }
  }

  updateStateInText(value) {
    this.$dispatch(changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateStateInText($(event.target).text())
  }
}


