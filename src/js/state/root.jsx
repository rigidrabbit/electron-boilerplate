const initializeAction = 'INITIALIZE'

export function initialize() {
  return {
    type: initializeAction,
  }
}

export default function root(state = {}, action = {}) {
  switch (action.type) {
    case initializeAction:
      return {}

    default:
      return state
  }
}
