import { initialState } from "../constants/index.tsx";
import { StateType } from "../types/state.type.tsx";


const reducer = (state = initialState, action) : StateType => {
  switch (action.type) {
    case 'INCREMENTAR':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENTAR':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};

export default reducer;