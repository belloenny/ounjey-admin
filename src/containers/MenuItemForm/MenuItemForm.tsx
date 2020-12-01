import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox"
import { Delete, Plus } from "baseui/icon"
import React from "react"
import Button, { KIND } from "../../components/Button/Button"
import { FormFields, FormLabel } from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import Popover, { PLACEMENT } from "../../components/Popover/Popover"
import { Textarea } from "../../components/Textarea/Textarea"
import { useMenuDispatch, useMenuState } from "../../context/MenuContext"
import {
    AddButton,
    Card,
    List,
    ListTitle,
    MainWrapper,
    MenuGrid,
    ToggleAddCard,
} from "./MenuItemFormStyles"

const MenuItemForm = ({ refs }: any) => {
    const [title, setTitle] = React.useState("")
    const [name, setName] = React.useState("")
    const [description, setDescription] = React.useState("")
    const [maximum_choice, setMaxiMumChoice] = React.useState(0)
    const [choice_price, setChoicePrice] = React.useState(0)
    const [use_checkboxes, setUseCheckbox] = React.useState(false)
    const [minimum_choice, setMiniMumChoice] = React.useState(0)
    const menuOptions = useMenuState("menuOption")
    const dispatch = useMenuDispatch()

    const submit = () => {
        const menuOption = {
            id: Math.floor(Math.random() * 100).toString(),
            title: title,
            maximum_choice: Number(maximum_choice),
            minimum_choice: Number(minimum_choice),
            menu_choices: [],
        }

        dispatch({
            type: "ADD_OPTION",
            menuOption,
        })
        setTitle("")
        setMiniMumChoice(0)
        setMaxiMumChoice(0)
    }

    const addChoice = (id) => {
        const menu_choice = {
            id: Math.floor(Math.random() * 100).toString(),
            name,
            description,
            choice_price: Number(choice_price),
            use_checkboxes,
        }

        dispatch({
            type: "ADD_CHOICE",
            id,
            menu_choice,
        })
        setName("")
        setDescription("")
        setChoicePrice(0)
        setUseCheckbox(false)
    }

    return (
        <div>
            <Popover
                content={({ close }) => (
                    <MainWrapper>
                        <FormFields>
                            <FormLabel>Title</FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormFields>
                        <FormFields>
                            <FormLabel>Minimum choice</FormLabel>
                            <Input
                                type="number"
                                value={minimum_choice}
                                onChange={(e) =>
                                    setMiniMumChoice(e.target.value)
                                }
                            />
                        </FormFields>
                        <FormFields>
                            <FormLabel>Maximum choice</FormLabel>
                            <Input
                                type="number"
                                value={maximum_choice}
                                onChange={(e) =>
                                    setMaxiMumChoice(e.target.value)
                                }
                            />
                        </FormFields>
                        <Button
                            kind={KIND.primary}
                            overrides={{
                                BaseButton: {
                                    style: ({ $theme }) => ({
                                        borderTopLeftRadius: "3px",
                                        borderTopRightRadius: "3px",
                                        borderBottomRightRadius: "3px",
                                        borderBottomLeftRadius: "3px",
                                        marginTop: "15px",
                                    }),
                                },
                            }}
                            onClick={() => {
                                submit()
                                setTimeout(() => close(), 200)
                            }}
                        >
                            Add
                        </Button>
                    </MainWrapper>
                )}
                accessibilityType={"tooltip"}
                placement={PLACEMENT.bottomLeft}
                overrides={{
                    Body: {
                        style: {
                            width: "330px",
                            zIndex: 2,
                        },
                    },
                    Inner: {
                        style: {
                            backgroundColor: "#ffffff",
                        },
                    },
                }}
            >
                <AddButton>
                    {" "}
                    <Plus /> Add Menu Option
                </AddButton>
            </Popover>
            <MenuGrid>
                {menuOptions.length !== 0 ? (
                    menuOptions.map((option) => (
                        <div key={option.id}>
                            <List>
                                <ListTitle>
                                    {option.title}{" "}
                                    <div
                                        style={{
                                            float: "right",
                                            cursor: "pointer",
                                        }}
                                        onClick={() =>
                                            dispatch({
                                                type: "DELETE_OPTION",
                                                id: option.id,
                                            })
                                        }
                                    >
                                        <Delete />
                                    </div>
                                </ListTitle>
                                <Popover
                                    content={({ close }) => (
                                        <>
                                            <MainWrapper>
                                                <FormFields>
                                                    <FormLabel>Name</FormLabel>
                                                    <Input
                                                        value={name}
                                                        onChange={(e) =>
                                                            setName(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormFields>
                                                <FormFields>
                                                    <FormLabel>
                                                        Description
                                                    </FormLabel>

                                                    <Textarea
                                                        value={description}
                                                        onChange={(e) =>
                                                            setDescription(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormFields>
                                                <FormFields>
                                                    <FormLabel>
                                                        Choice Price
                                                    </FormLabel>
                                                    <Input
                                                        type="number"
                                                        value={choice_price}
                                                        onChange={(e) =>
                                                            setChoicePrice(
                                                                e.target.value
                                                            )
                                                        }
                                                    />
                                                </FormFields>
                                                <FormFields>
                                                    <Checkbox
                                                        checked={use_checkboxes}
                                                        onChange={(e) =>
                                                            setUseCheckbox(
                                                                !use_checkboxes
                                                            )
                                                        }
                                                        labelPlacement={
                                                            LABEL_PLACEMENT.right
                                                        }
                                                    >
                                                        Use Checkboxes?
                                                    </Checkbox>

                                                    <Button
                                                        kind={KIND.primary}
                                                        overrides={{
                                                            BaseButton: {
                                                                style: ({
                                                                    $theme,
                                                                }) => ({
                                                                    borderTopLeftRadius:
                                                                        "3px",
                                                                    borderTopRightRadius:
                                                                        "3px",
                                                                    borderBottomRightRadius:
                                                                        "3px",
                                                                    borderBottomLeftRadius:
                                                                        "3px",
                                                                    marginTop:
                                                                        "15px",
                                                                }),
                                                            },
                                                        }}
                                                        onClick={() => {
                                                            addChoice(option.id)
                                                            setTimeout(
                                                                () => close(),
                                                                200
                                                            )
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </FormFields>
                                            </MainWrapper>
                                        </>
                                    )}
                                    accessibilityType={"tooltip"}
                                    placement={PLACEMENT.bottomLeft}
                                    overrides={{
                                        Body: {
                                            style: {
                                                width: "330px",
                                                zIndex: 2,
                                            },
                                        },
                                        Inner: {
                                            style: {
                                                backgroundColor: "#ffffff",
                                            },
                                        },
                                    }}
                                >
                                    <ToggleAddCard>
                                        <Plus />
                                        {"  "}
                                        Add a Choice
                                    </ToggleAddCard>
                                </Popover>
                                {option.menu_choices.length !== 0 ? (
                                    option.menu_choices.map((choice) => (
                                        <Card key={choice.id}>
                                            {choice.name}{" "}
                                            <div
                                                style={{
                                                    float: "right",
                                                    cursor: "pointer",
                                                }}
                                                onClick={() =>
                                                    dispatch({
                                                        type: "DELETE_CHOICE",
                                                        id: choice.id,
                                                    })
                                                }
                                            >
                                                <Delete />
                                            </div>
                                        </Card>
                                    ))
                                ) : (
                                    <p
                                        style={{
                                            marginLeft: "9px",
                                            color: "GrayText",
                                        }}
                                    >
                                        You don't have any choices
                                    </p>
                                )}
                            </List>
                        </div>
                    ))
                ) : (
                    <p>No Options Yet Try Adding</p>
                )}
            </MenuGrid>
        </div>
    )
}

export default MenuItemForm
