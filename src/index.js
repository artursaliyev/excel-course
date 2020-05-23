import {Excel} from '@/components/excel/Excel'
import './scss/index.scss'

import {Header} from '@/components/header/Header'
import {Toolbar} from '@/components/toolbar/Toolbar'
import {Formula} from '@/components/formula/Formula'
import {Table} from '@/components/table/Table'
import {createStore} from './core/createStore'
import {rootReduser} from './redux/rootReducer'
import {storage} from '@core/utils'
import {initialState} from './redux/initialState'

const store = createStore(rootReduser, initialState)

store.subscribe(state=>{
  console.log('App state :', state)
  storage('excel-state', state)
})

const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store
})

excel.render()
