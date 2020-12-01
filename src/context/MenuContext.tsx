import { MenuOption } from "../graphql/types"
import { useCreateContext } from "./create-context"

export interface MenuState {
    menuOption: MenuOption[]
}
const initialState: MenuState = {
    menuOption: [],
}
type State = typeof initialState
type Action = any

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "RESET_OPTIONS":
            return {
                ...state,
                menuOption: [],
            }
        case "ADD_OPTION":
            return {
                ...state,
                menuOption: [...state.menuOption, action.menuOption],
            }
        case "DELETE_OPTION":
            const id = action.id
            return {
                ...state,
                menuOption: state.menuOption.filter(
                    (option) => option.id !== id
                ),
            }
        case "ADD_CHOICE":
            const option_id = action.id

            return {
                ...state,
                menuOption: state.menuOption.map((option) => {
                    if (option.id === option_id) {
                        return {
                            ...option,
                            menu_choices: [
                                ...option.menu_choices,
                                action.menu_choice,
                            ],
                        }
                    } else {
                        return {
                            ...option,
                        }
                    }
                }),
            }

        case "DELETE_CHOICE":
            return {
                ...state,
                menuOption: state.menuOption.map((option) => {
                    return {
                        ...option,
                        menu_choices: option.menu_choices.filter(
                            (choice) => choice.id !== action.id
                        ),
                    }
                }),
            }
        default:
            return state
    }
}
const [useMenuState, useMenuDispatch, MenuProvider] = useCreateContext(
    initialState,
    reducer
)

export { useMenuState, useMenuDispatch, MenuProvider }
