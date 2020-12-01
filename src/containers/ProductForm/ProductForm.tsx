import { Checkbox, LABEL_PLACEMENT } from "baseui/checkbox"
import { TYPE } from "baseui/select"
import { toaster, ToasterContainer } from "baseui/toast"
import _ from "lodash"
import React, { useCallback, useState } from "react"
import { Scrollbars } from "react-custom-scrollbars"
import { useForm } from "react-hook-form"
import Button, { KIND } from "../../components/Button/Button"
import DrawerBox from "../../components/DrawerBox/DrawerBox"
import { Col, Row } from "../../components/FlexBox/FlexBox"
import {
    Error,
    FormFields,
    FormLabel,
} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import Select from "../../components/Select/Select"
import { Textarea } from "../../components/Textarea/Textarea"
import Uploader from "../../components/Uploader/Uploader"
import { useDrawerDispatch } from "../../context/DrawerContext"
import { useMenuState } from "../../context/MenuContext"
import {
    MenuOption,
    MenuOptionCreateWithoutMenu_ItemInput,
    useCreateMenuItemMutation,
    useCreateMenuItemWithMenuOptionsMutation,
} from "../../graphql/types"
import useComponentSize from "../../settings/useComponentSize"
import {
    ButtonGroup,
    DrawerTitle,
    DrawerTitleWrapper,
    FieldDetails,
    Form,
} from "../DrawerItems/DrawerItems.style"
import MenuItemForm from "../MenuItemForm/MenuItemForm"

const options = [{ title: "BreakFast" }, { title: "lunch" }]

type Props = any

const AddProduct: React.FC<Props> = (props) => {
    let [formRef] = useComponentSize()
    const [, createMenuItem] = useCreateMenuItemWithMenuOptionsMutation()
    const [, createMenu] = useCreateMenuItemMutation()
    const dispatch = useDrawerDispatch()
    const closeDrawer = useCallback(() => dispatch({ type: "CLOSE_DRAWER" }), [
        dispatch,
    ])
    const { register, handleSubmit, setValue, errors } = useForm()
    const [vegOption, setVegOption] = useState(false)
    const [showOptions, setShowOption] = useState(false)
    const menuOptions = useMenuState("menuOption")
    const [tag, setTag] = useState([])
    const [description, setDescription] = useState("")

    React.useEffect(() => {
        register({ name: "menu_category", required: true })
        register({ name: "path", required: true })
        register({ name: "description" })
    }, [register])

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setValue("description", value)
        setDescription(value)
    }

    const handleMultiChange = ({ value }) => {
        setValue("menu_category", value)
        setTag(value)
    }

    const handleUploader = (path) => {
        setValue("path", path)
    }
    const onSubmit = (data) => {
        interface DataForm {
            description?: string
            title: string
            single_serves: string
            price_per_plate: string
            minimum_quantity: string
            maximum_quantity?: string
            path?: string
        }
        const {
            description,
            title,
            single_serves,
            maximum_quantity,
            path,
            price_per_plate,
            minimum_quantity,
        }: DataForm = data
        if (menuOptions.length !== 0) {
            const menu_options: MenuOptionCreateWithoutMenu_ItemInput[] = menuOptions.map(
                (option: MenuOption) => {
                    let newOption

                    newOption = _.omit(option, ["id", "menu_choices"])
                    const choices = option.menu_choices.map((choice) => {
                        const newChoice = _.omit(choice, "id")

                        return newChoice
                    })

                    return {
                        ...newOption,
                        menu_choices: {
                            create: choices,
                        },
                    }
                }
            )

            createMenuItem({
                description,
                title,
                minimum_quantity: Number(minimum_quantity),
                maximum_quantity: Number(maximum_quantity),
                price_per_plate: Number(price_per_plate),
                single_serves: Number(single_serves),
                vegetarian_option: vegOption,
                image: {
                    path,
                },
                menu_options,
                menu_category_id: "ckfs2e6vq002319meabmg58hu",
            })
        } else {
            createMenu({
                description,
                title,
                minimum_quantity: Number(minimum_quantity),
                maximum_quantity: Number(maximum_quantity),
                price_per_plate: Number(price_per_plate),
                single_serves: Number(single_serves),
                vegetarian_option: vegOption,
                image: {
                    path,
                },
                menu_category_id: "ckfs2e6vq002319meabmg58hu",
            })
        }
        closeDrawer()
        toaster.positive(<>Item Created</>, {
            overrides: {
                InnerContainer: {
                    style: { width: "100%" },
                },
            },
        })
    }

    return (
        <>
            <DrawerTitleWrapper>
                <DrawerTitle>Add Menu Item</DrawerTitle>
            </DrawerTitleWrapper>

            <Form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
                <Scrollbars
                    autoHide
                    renderView={(props) => (
                        <div
                            {...props}
                            style={{ ...props.style, overflowX: "hidden" }}
                        />
                    )}
                    renderTrackHorizontal={(props) => (
                        <div
                            {...props}
                            style={{ display: "none" }}
                            className="track-horizontal"
                        />
                    )}
                >
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>Upload Menu Image</FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox
                                overrides={{
                                    Block: {
                                        style: {
                                            width: "100%",
                                            height: "auto",
                                            padding: "30px",
                                            borderRadius: "3px",
                                            backgroundColor: "#ffffff",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        },
                                    },
                                }}
                            >
                                <Uploader onChange={handleUploader} />
                            </DrawerBox>
                            {errors.path && <Error>Upload an Image </Error>}
                        </Col>
                    </Row>

                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Add neccessary information about the menu
                            </FieldDetails>
                        </Col>

                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <FormLabel>Title</FormLabel>
                                    <Input
                                        inputRef={register({
                                            required: true,
                                            maxLength: 20,
                                        })}
                                        name="title"
                                    />
                                    {errors.title && (
                                        <Error>Title is Required</Error>
                                    )}
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea
                                        value={description}
                                        onChange={handleDescriptionChange}
                                    />
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Single Serves</FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({ required: true })}
                                        name="single_serves"
                                    />
                                    {errors.single_serves && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Price Per Plate</FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({ required: true })}
                                        name="price_per_plate"
                                    />
                                    {errors.price_per_plate && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>

                                <FormFields>
                                    <FormLabel>
                                        Minimum Order Quantity
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({ required: true })}
                                        name="minimum_quantity"
                                    />
                                    {errors.minimum_quantity && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>
                                <FormFields>
                                    <FormLabel>
                                        Maximum Order Quantity
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({ required: false })}
                                        name="maximum_quantity"
                                    />
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Choose a Category</FormLabel>
                                    <Select
                                        options={options}
                                        labelKey="title"
                                        valueKey="title"
                                        placeholder="Choose A Category"
                                        value={tag}
                                        type={TYPE.search}
                                        onChange={handleMultiChange}
                                        overrides={{
                                            Placeholder: {
                                                style: ({ $theme }) => {
                                                    return {
                                                        ...$theme.typography
                                                            .fontBold14,
                                                        color:
                                                            $theme.colors
                                                                .textNormal,
                                                    }
                                                },
                                            },
                                            DropdownListItem: {
                                                style: ({ $theme }) => {
                                                    return {
                                                        ...$theme.typography
                                                            .fontBold14,
                                                        color:
                                                            $theme.colors
                                                                .textNormal,
                                                    }
                                                },
                                            },
                                            Popover: {
                                                props: {
                                                    overrides: {
                                                        Body: {
                                                            style: {
                                                                zIndex: 5,
                                                            },
                                                        },
                                                    },
                                                },
                                            },
                                        }}
                                    />
                                    {errors.menu_category && (
                                        <Error>
                                            You have to pick a menu category
                                        </Error>
                                    )}
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                If Menu Has Vegetarian Options, Check the box
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <Checkbox
                                        checked={vegOption}
                                        onChange={(e) =>
                                            setVegOption(!vegOption)
                                        }
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        Has Vegetarian Option
                                    </Checkbox>
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Add Options To The Menu If You have any
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <Checkbox
                                        checked={showOptions}
                                        onChange={(e) =>
                                            setShowOption(!showOptions)
                                        }
                                        labelPlacement={LABEL_PLACEMENT.right}
                                    >
                                        Dish Has Options
                                    </Checkbox>
                                </FormFields>
                                <FormFields>
                                    {showOptions && (
                                        <div>
                                            <MenuItemForm />
                                        </div>
                                    )}
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                </Scrollbars>

                <ButtonGroup>
                    <Button
                        kind={KIND.minimal}
                        onClick={closeDrawer}
                        overrides={{
                            BaseButton: {
                                style: ({ $theme }) => ({
                                    width: "50%",
                                    borderTopLeftRadius: "3px",
                                    borderTopRightRadius: "3px",
                                    borderBottomRightRadius: "3px",
                                    borderBottomLeftRadius: "3px",
                                    marginRight: "15px",
                                    color: $theme.colors.red400,
                                }),
                            },
                        }}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        overrides={{
                            BaseButton: {
                                style: ({ $theme }) => ({
                                    width: "50%",
                                    borderTopLeftRadius: "3px",
                                    borderTopRightRadius: "3px",
                                    borderBottomRightRadius: "3px",
                                    borderBottomLeftRadius: "3px",
                                }),
                            },
                        }}
                    >
                        Create MenuItem
                    </Button>
                </ButtonGroup>
            </Form>
            <ToasterContainer />
        </>
    )
}

export default AddProduct
