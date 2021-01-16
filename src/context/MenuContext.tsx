import {MenuOption} from "../graphql/types"
import {useCreateContext} from "./create-context"

export interface MenuState {
    menuOptions: MenuOption[]
}
const initialState: MenuState = {
    menuOptions: [],
}
type State = typeof initialState
type Action = any

function reducer(state: State, action: Action) {
    switch (action.type) {
        case "RESET_OPTIONS":
            return {
                ...state,
                menuOptions: [],
            }
        case "ADD_OPTION":
            return {
                ...state,
                menuOptions: [...state.menuOptions, action.menuOption],
            }
        case "DELETE_OPTION":
            const id = action.id
            return {
                ...state,
                menuOptions: state.menuOptions.filter(
                    (option) => option.id !== id
                ),
            }
        case "ADD_CHOICE":
            const option_id = action.id

            return {
                ...state,
                menuOptions: state.menuOptions.map((option) => {
                    if (option.id === option_id) {
                        return {
                            ...option,
                            menuChoices: [
                                ...option.menuChoices,
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
                menuOptions: state.menuOptions.map((option) => {
                    return {
                        ...option,
                        menuChoices: option.menuChoices.filter(
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

export {useMenuState, useMenuDispatch, MenuProvider}

