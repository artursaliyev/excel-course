import {capitalize} from '@core/utils'

export class DomLisener {
  constructor($root, listeners=[], name) {
    if (!$root) {
      throw new Error(`not $root provider for DomLisener!`)
    }
    this.$root = $root
    this.listeners = listeners
    this.name =name
  }

  initDOMLiseners() {
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener)
      const name = this.name || ''
      if (!this[method]) {
        throw new Error(
            `Method ${method} is not implement in ${name} Component`)
      }
      this[method] = this[method].bind(this)
      this.$root.on(listener, this[method])
    })
  }

  removeDOMLiseners() {
    this.listeners.forEach(listener=>{
      const method = getMethodName(listener)
      this.$root.off(listener, this[method])
    })
  }
}

function getMethodName(eventName) {
  return `on${capitalize(eventName)}`
}
