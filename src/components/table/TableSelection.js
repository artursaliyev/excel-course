export class TableSelection {
    static className = 'selected'

    constructor() {
      this.group = []
      this.cell = null
    }

    get current() {
      return this.cell
    }

    select($el) {
      this.clear()
      $el.focus().addClass(TableSelection.className)
      this.group.push($el)
      this.cell = $el
    }

    clear() {
      this.group.forEach(el=>el.removeClass(TableSelection.className))
      this.group = []
    }

    selectGroup($group=[]) {
      this.clear()
      this.group = $group
      this.group.forEach($cell=>{
        $cell.addClass(TableSelection.className)
      })
    }
}
