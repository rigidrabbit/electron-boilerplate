import root, * as rootActions from './root'
import ui, * as uiActions from './ui'

const actions = {
  ...rootActions,
  ...uiActions,
  default: void 0,
}
delete actions.default

const reducers = {
  root,
  ui,
}

export { actions, reducers }
