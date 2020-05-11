import {DomLisener} from '@core/DomLisener'

export class ExcelComponent extends DomLisener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name)
  }
  toHTML() {
    return ''
  }

  init() {
    this.initDOMLiseners()
  }

  destroy() {
    this.removeDOMLiseners()
  }
}
