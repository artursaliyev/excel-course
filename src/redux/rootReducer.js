import {TABLE_RESIZE, CHANGE_TEXT} from './types'

export function rootReduser(state, action) {
  let prevState
  let type

  // console.log('Action: ', action);

  switch (action.type) {
    case TABLE_RESIZE:
      type = action.data.type === 'col' ? 'colState': 'rowState'
      prevState = state[type] || {}
      prevState[action.data.id] = action.data.value
      return {
        ...state,
        [type]: prevState
      }
    case CHANGE_TEXT:
      prevState = state['dataState'] || {}
      prevState[action.data.id] = action.data.value

      return {
        ...state,
        currentText: action.data.value,
        dataState: prevState
      }
    default:
      return state
  }
}
