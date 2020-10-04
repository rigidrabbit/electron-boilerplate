const uiDoSomethingAction = 'uiSampleAction'

export function uiDoSomething(something) {
  return {
    type: uiDoSomethingAction,
    something,
  }
}

const initState = {
  data: null,
}

export default function ui(state = initState, action = {}) {
  switch (action.type) {
    case uiDoSomethingAction:
      return {
        ...state,
        data: action.something,
      }
    default:
      return state
  }
}
