import {DomLisener} from '@core/DomLisener'

export class ExcelComponent extends DomLisener {
  constructor($root, options={}) {
    super($root, options.listeners, options.name)
    this.emitter = options.emitter
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribes = []
    // this.storeSub = null
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

  $dispatch(action) {
    this.store.dispatch(action)
  }

  storeChanged() {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // $subscribe(fn) {
  //   this.storeSub = this.store.subscribe(fn)
  // }

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
