import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox"
import {DeleteAlt} from "baseui/icon"
import {toaster, ToasterContainer} from "baseui/toast"
import React, {useCallback, useState} from "react"
import {Scrollbars} from "react-custom-scrollbars"
import {useForm} from "react-hook-form"
import Button, {KIND} from "../../components/Button/Button"
import DrawerBox from "../../components/DrawerBox/DrawerBox"
import {Col, Row} from "../../components/FlexBox/FlexBox"
import {
    Error,
    FormFields,
    FormLabel,
} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import Select from "../../components/Select/Select"
import {Textarea} from "../../components/Textarea/Textarea"
import Uploader from "../../components/Uploader/Uploader"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import {useMenuDispatch} from "../../context/MenuContext"
import {
    MenuItem, MenuItemDto, useCreateMenuMutation, useDeleteMenuItemMutation, useUpdateMenuImageMutation, useUpdateMenuItemMutation
} from "../../graphql/types"
import {
    ButtonGroup,
    DrawerTitle,
    DrawerTitleWrapper,
    FieldDetails,
    Form,
} from "../DrawerItems/DrawerItems.style"
import MenuItemForm from "../MenuItemForm/MenuItemForm"

type Props = any

const AddProduct: React.FC<Props> = () => {
    const dispatch = useDrawerDispatch()
    const data: MenuItem = useDrawerState("data")
    const dispatchOptions = useMenuDispatch()
    const [, updateMenu] = useUpdateMenuItemMutation()
    const [, createMenu] = useCreateMenuMutation()
    const [, updateImage] = useUpdateMenuImageMutation()
    const [, deleteMenu] = useDeleteMenuItemMutation()
    // const [, updatePhoto] = useUpdateItemPhotoMutation()
    const [showOptions, setShowOption] = useState(false)
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])
    const {register, handleSubmit, setValue, errors} = useForm({
        defaultValues: data,
    })
    const [description, setDescription] = useState(data.description)
    React.useEffect(() => {
        // register({name: "type"})
        // register({name: "categories"})
        register({name: "description"})
    }, [register])

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setValue("description", value)
        setDescription(value)
    }

    const handleUploader = (path) => {
        setValue("image", path)
        updateImage({
            entityId: data.id,
            image: path,
            isDuplicatedItem: data.images.length === 0
        })
    }

    React.useEffect(() => {
        if (data.menuOptions)
            data.menuOptions.map((menu_option) =>
                dispatchOptions({type: "ADD_OPTION", menuOption: menu_option})
            )
        return () => dispatchOptions({type: "RESET_OPTIONS"})
    }, [data, dispatchOptions])

    const onSubmit = (result) => {
        const newRecord: MenuItemDto = {
            title: result.title,
            description: result.description,
            singleServes: Number(result.singleServes),
            pricePerPlate: Number(result.pricePerPlate),
            maximumOrderQty: Number(result.maximumOrderQty),
            minimumOrderQty: Number(result.minimumOrderQty)
        }
        updateMenu({
            newRecord,
            id: data.id
        }).then(() => {
            //@ts-ignore
            data.refetch()
            closeDrawer()
        })

    }
    return (
        <>
            <ToasterContainer />
            <DrawerTitleWrapper>
                <DrawerTitle>Update Menu Item</DrawerTitle>
            </DrawerTitleWrapper>

            <Form onSubmit={handleSubmit(onSubmit)} style={{height: "100%"}}>
                <Scrollbars
                    autoHide
                    renderView={(props) => (
                        <div
                            {...props}
                            style={{...props.style, overflowX: "hidden"}}
                        />
                    )}
                    renderTrackHorizontal={(props) => (
                        <div
                            {...props}
                            style={{display: "none"}}
                            className="track-horizontal"
                        />
                    )}
                >
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Upload your Product image here
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <Uploader
                                    onChange={handleUploader}
                                    imageURL={data.images && data.images.length !== 0 ? data.images[0].src : ""}
                                />
                            </DrawerBox>
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
                                        inputRef={register({required: true})}
                                        name="singleServes"
                                    />
                                    {errors.singleServes && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Price Per Plate</FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({required: true})}
                                        name="pricePerPlate"
                                    />
                                    {errors.pricePerPlate && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>

                                <FormFields>
                                    <FormLabel>
                                        Minimum Order Quantity
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({required: true})}
                                        name="minimumOrderQty"
                                    />
                                    {errors.minimumOrderQty && (
                                        <Error>This Field is Required</Error>
                                    )}
                                </FormFields>
                                <FormFields>
                                    <FormLabel>
                                        Maximum Order Quantity
                                    </FormLabel>
                                    <Input
                                        type="number"
                                        inputRef={register({required: false})}
                                        name="maximumOrderQty"
                                    />
                                </FormFields>

                                <FormFields>
                                    <FormLabel>Choose a Category</FormLabel>
                                    {/* <Select
                                        options={options}
                                        labelKey="title"
                                        valueKey="title"
                                        placeholder="Choose A Category"
                                        value={tag}
                                        type={TYPE.search}
                                        onChange={handleMultiChange}
                                        overrides={{
                                            Placeholder: {
                                                style: ({$theme}) => {
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
                                                style: ({$theme}) => {
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
                                    )} */}
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                    {/* <Row>
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
                    </Row> */}
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
                                        Edit Dish Options
                                    </Checkbox>
                                </FormFields>
                                <FormFields>
                                    {showOptions && (
                                        <div>
                                            <MenuItemForm
                                                isUpdateForm={true}
                                                menuItemId={data.id}
                                            />
                                        </div>
                                    )}
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Danger Zone (actions performed here cannot be
                                undone)
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <Button
                                        startEnhancer={() => (
                                            <DeleteAlt size={24} />
                                        )}
                                        onClick={() => {
                                            deleteMenu({id: data.id}).then(() => {
                                                //@ts-ignore
                                                data.refetch()
                                                closeDrawer()
                                            })
                                        }}
                                        kind={KIND.minimal}
                                        overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor:
                                                        "transparent",

                                                    borderTopLeftRadius: "3px",
                                                    borderTopRightRadius: "3px",
                                                    borderBottomRightRadius:
                                                        "3px",
                                                    borderBottomLeftRadius:
                                                        "3px",
                                                    marginRight: "15px",
                                                    color: $theme.colors.red400,
                                                }),
                                            },
                                        }}
                                    >
                                        Delete Menu Item
                                    </Button>
                                </FormFields>
                            </DrawerBox>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                If You Wish To Duplicate This MenuItem You can Do so by clicking the button
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <Button

                                        onClick={() => {
                                            createMenu({
                                                newRecord: {
                                                    title: data.title,
                                                    description: data.description,
                                                    pricePerPlate: data.pricePerPlate,
                                                    vegetarian_option: data.vegetarian_option,
                                                    maximumOrderQty: data.maximumOrderQty,
                                                    minimumOrderQty: data.minimumOrderQty,
                                                    singleServes: data.singleServes,
                                                    menuOptions: data.menuOptions.length !== 0 ? data.menuOptions.map(option => {
                                                        return {
                                                            title: option.title,
                                                            description: option.description,
                                                            useCheckBoxes: option.useCheckBoxes,
                                                            minimumChoice: option.minimumChoice,
                                                            maximumChoice: option.maximumChoice,
                                                            menuChoices: option.menuChoices.map(choice => {
                                                                return {
                                                                    name: choice.name,
                                                                    description: choice.description,
                                                                    choicePrice: choice.choicePrice
                                                                }
                                                            })
                                                        }
                                                    })

                                                        : null
                                                }
                                            }).then(res => {
                                                //@ts-ignore
                                                data.refetch()
                                                closeDrawer()
                                            })
                                        }}
                                        kind={KIND.minimal}
                                        overrides={{
                                            BaseButton: {
                                                style: ({$theme}) => ({
                                                    backgroundColor:
                                                        "transparent",

                                                    borderTopLeftRadius: "3px",
                                                    borderTopRightRadius: "3px",
                                                    borderBottomRightRadius:
                                                        "3px",
                                                    borderBottomLeftRadius:
                                                        "3px",
                                                    marginRight: "15px",
                                                    color: $theme.colors.red400,
                                                }),
                                            },
                                        }}
                                    >
                                        Duplicate Menu
                                    </Button>
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
                                style: ({$theme}) => ({
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
                                style: ({$theme}) => ({
                                    width: "50%",
                                    borderTopLeftRadius: "3px",
                                    borderTopRightRadius: "3px",
                                    borderBottomRightRadius: "3px",
                                    borderBottomLeftRadius: "3px",
                                }),
                            },
                        }}
                    >
                        Update
                    </Button>
                </ButtonGroup>
            </Form>
            <ToasterContainer />
        </>
    )
}

export default AddProduct
