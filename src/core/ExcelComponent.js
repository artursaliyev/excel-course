import {DomLisener} from '@core/DomLisener'

export class ExcelComponent extends DomLisener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name)
    this.emitter = options.emitter
    this.unsubscribes = []
    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribes.push(unsub)
  }

  $off() {
    this.unsubscribes.forEach(unsub=>unsub())
  }

  init() {
    this.initDOMLiseners()
  }

  destroy() {
    this.removeDOMLiseners()
    this.$off()
  }
}
