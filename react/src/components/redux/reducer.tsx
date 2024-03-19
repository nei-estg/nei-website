// processa as acoes e atualiza o estado

import { TOGGLE_THEME } from './actions';

interface ThemeState {
  darkMode: boolean;
}

const initialState: ThemeState = {
  darkMode: true,
};

const themeReducer = (state = initialState, action: { type: string }) => {
  switch (action.type) {
    case TOGGLE_THEME:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export default themeReducer;
