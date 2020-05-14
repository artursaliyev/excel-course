class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
        document.querySelector(selector) :
        selector
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHTML.trim()
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  clear() {
    this.html('')
    return this
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  on(eventType, callbackfn) {
    this.$el.addEventListener(eventType, callbackfn)
  }

  off(eventType, callbackfn) {
    this.$el.removeEventListener(eventType, callbackfn)
  }

  get data() {
    return this.$el.dataset
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector)
  }

  css(styles={}) {
    Object.keys(styles).forEach(key=>{
      this.$el.style[key] = styles[key]
    })
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }
  addClass(className) {
    this.$el.classList.add(className)
  }
  removeClass(className) {
    this.$el.classList.remove(className)
  }

  id(parse) {
    if (parse) {
      const parser = this.id().split(':')
      return {
        row: +parser[0],
        col: +parser[1]
      }
    }
    return this.data.id
  }

  focus() {
    this.$el.focus()
    return this
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, clases='')=>{
  const el = document.createElement(tagName)
  if (clases) {
    el.classList.add(clases)
  }
  return $(el)
}
