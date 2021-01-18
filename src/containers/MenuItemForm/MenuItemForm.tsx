import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox"
import {Delete, Plus} from "baseui/icon"
import React from "react"
import Button, {KIND} from "../../components/Button/Button"
import {FormFields, FormLabel} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import Popover, {PLACEMENT} from "../../components/Popover/Popover"
import {Textarea} from "../../components/Textarea/Textarea"
import {useMenuDispatch, useMenuState} from "../../context/MenuContext"
import {MenuChoice, MenuOption, useDeleteMenuChoiceMutation, useDeleteOptionMutation} from "../../graphql/types"
import {
    AddButton,
    Card,
    List,
    ListTitle,
    MainWrapper,
    MenuGrid,
    ToggleAddCard
} from "./MenuItemFormStyles"
import {Modal, openModal, closeModal} from '@redq/reuse-modal';
import '@redq/reuse-modal/lib/index.css';
import ChoiceUpdate from "containers/MenuChoiceForm/MenuChoiceUpdateForm"
import {useDrawerState} from "context/DrawerContext"
import OptionUpdate from "containers/MenuOptionForm/MenuOptionUpdateForm"


const MenuItemForm = ({isUpdateForm, menuItemId}: {isUpdateForm?: boolean, menuItemId?: string}) => {
    const [title, setTitle] = React.useState("")
    const [name, setName] = React.useState("")
    const data = useDrawerState("data")
    const [description, setDescription] = React.useState("")
    const [, deleteOption] = useDeleteOptionMutation()
    const [, deleteChoice] = useDeleteMenuChoiceMutation()
    const [maximum_choice, setMaxiMumChoice] = React.useState(0)
    const [choice_price, setChoicePrice] = React.useState(0)
    const [use_checkboxes, setUseCheckbox] = React.useState(false)
    const [minimum_choice, setMiniMumChoice] = React.useState(0)
    const menuOptions = useMenuState("menuOptions")
    const dispatch = useMenuDispatch()
    const dispatchOptions = useMenuDispatch()

    const submit = () => {
        const menuOption: MenuOption = {
            id: Math.floor(Math.random() * 100).toString(),
            title: title,
            maximumChoice: Number(maximum_choice),
            minimumChoice: Number(minimum_choice),
            useCheckBoxes: use_checkboxes,
            menuChoices: [],
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
        const menu_choice: MenuChoice = {
            id: Math.floor(Math.random() * 100).toString(),
            name,
            description,
            choicePrice: Number(choice_price),
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
    React.useEffect(() => {
        return () => dispatchOptions({type: "RESET_OPTIONS"})
    }, [dispatchOptions])

    return (
        <div>
            <Popover
                content={({close}) => (
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
                        </FormFields>
                        <Button
                            kind={KIND.primary}
                            overrides={{
                                BaseButton: {
                                    style: ({$theme}) => ({
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
                {
                    isUpdateForm ? null : (
                        <AddButton>
                            {" "}
                            <Plus /> Add Menu Option
                        </AddButton>
                    )
                }
            </Popover>
            <MenuGrid>
                {menuOptions.length !== 0 ? (
                    menuOptions.map((option) => (
                        <div key={option.id}>
                            <List>
                                <ListTitle>
                                    <div
                                        style={{
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            openModal({
                                                config: {
                                                    className: 'customModal',
                                                    disableDragging: false,
                                                    enableResizing: {
                                                        bottom: true,
                                                        bottomLeft: true,
                                                        bottomRight: true,
                                                        left: true,
                                                        right: true,
                                                        top: true,
                                                        topLeft: true,
                                                        topRight: true,
                                                    },
                                                    width: 480,
                                                    height: 650,
                                                    animationFrom: {transform: 'scale(0.3)'}, // react-spring <Spring from={}> props value
                                                    animationTo: {transform: 'scale(1)'}, //  react-spring <Spring to={}> props value
                                                    transition: {
                                                        mass: 1,
                                                        tension: 130,
                                                        friction: 26,
                                                    }, // react-spring config props
                                                },
                                                withRnd: false,
                                                overlayClassName: 'customeOverlayClass',
                                                closeOnClickOutside: false,
                                                component: OptionUpdate,
                                                componentProps: {data: option, refetch: data.refetch, itemId: menuItemId, closeModal},
                                            })
                                        }
                                    >
                                        {option.title}{" "}
                                    </div>
                                    <div
                                        style={{
                                            float: "right",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => {
                                            dispatch({
                                                type: "DELETE_OPTION",
                                                id: option.id,
                                            })
                                            if (isUpdateForm) {
                                                deleteOption({
                                                    id: option.id
                                                }).then(() => data.refetch())
                                            }
                                        }

                                        }
                                    >
                                        <Delete />
                                    </div>
                                </ListTitle>
                                <Popover
                                    content={({close}) => (
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
                                    {
                                        isUpdateForm ? null : (
                                            <ToggleAddCard>
                                                <Plus />
                                                {"  "}
                                        Add a Choice
                                            </ToggleAddCard>
                                        )
                                    }
                                </Popover>
                                {option.menuChoices.length !== 0 ? (
                                    option.menuChoices.map((choice) => (
                                        <Card key={choice.id}

                                        >
                                            <div
                                                onClick={() =>
                                                    openModal({
                                                        config: {
                                                            className: 'customModal',
                                                            disableDragging: false,
                                                            enableResizing: {
                                                                bottom: true,
                                                                bottomLeft: true,
                                                                bottomRight: true,
                                                                left: true,
                                                                right: true,
                                                                top: true,
                                                                topLeft: true,
                                                                topRight: true,
                                                            },
                                                            width: 480,
                                                            height: 650,
                                                            animationFrom: {transform: 'scale(0.3)'}, // react-spring <Spring from={}> props value
                                                            animationTo: {transform: 'scale(1)'}, //  react-spring <Spring to={}> props value
                                                            transition: {
                                                                mass: 1,
                                                                tension: 130,
                                                                friction: 26,
                                                            }, // react-spring config props
                                                        },
                                                        withRnd: false,
                                                        overlayClassName: 'customeOverlayClass',
                                                        closeOnClickOutside: false,
                                                        component: ChoiceUpdate,
                                                        componentProps: {data: choice, refetch: data.refetch, optionId: option.id, closeModal},
                                                    })
                                                }
                                            >

                                                {choice.name}{" "}
                                            </div>
                                            <div
                                                style={{
                                                    float: "right",
                                                    cursor: "pointer",
                                                    position: "absolute",
                                                    right: 11,
                                                    bottom: 4
                                                }}
                                                onClick={() => {
                                                    dispatch({
                                                        type: "DELETE_CHOICE",
                                                        id: choice.id,
                                                    })
                                                    if (isUpdateForm) {
                                                        deleteChoice({
                                                            id: choice.id
                                                        }).then(() => data.refetch())
                                                    }
                                                }

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
            <Modal />
        </div>
    )
}

export default MenuItemForm
