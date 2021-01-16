import {Checkbox, LABEL_PLACEMENT} from "baseui/checkbox"
import {Input} from "baseui/input"
import {Textarea} from "baseui/textarea"
import {ToasterContainer} from "baseui/toast"
import React, {useCallback, useState} from "react"
import {Scrollbars} from "react-custom-scrollbars"
import {Col, Row} from "react-flexbox-grid"
import {useForm} from "react-hook-form"
import Button, {KIND} from "../../components/Button/Button"
import DrawerBox from "../../components/DrawerBox/DrawerBox"
import {Error, FormFields, FormLabel} from "../../components/FormFields/FormFields"
import Uploader from "../../components/Uploader/Uploader"
import {useDrawerDispatch} from "../../context/DrawerContext"
import {useMenuState} from "../../context/MenuContext"
import {useCreateMenuMutation, MenuItemDto, MenuOptionDto} from "../../graphql/types"
import useComponentSize from "../../settings/useComponentSize"
import {
    ButtonGroup,
    DrawerTitle,
    DrawerTitleWrapper,
    FieldDetails,
    Form
} from "../DrawerItems/DrawerItems.style"
import MenuItemForm from "../MenuItemForm/MenuItemForm"
import _ from 'lodash'
import {postData} from "../../utils/fetch"


const options = [{title: "BreakFast"}, {title: "lunch"}]

type Props = any

const AddProduct: React.FC<Props> = (props) => {
    let [formRef] = useComponentSize()
    const [, createMenu] = useCreateMenuMutation()
    const dispatch = useDrawerDispatch()
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])
    const {register, handleSubmit, setValue, errors} = useForm()
    const [vegOption, setVegOption] = useState(false)
    const [showOptions, setShowOption] = useState(false)
    const menuOptions = useMenuState("menuOptions")
    const [tag, setTag] = useState([])
    const [description, setDescription] = useState("")

    React.useEffect(() => {
        register({name: "menu_category", required: true})
        register({name: "images", required: true})
        register({name: "description"})
    }, [register])

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setValue("description", value)
        setDescription(value)
    }

    const handleMultiChange = ({value}) => {
        setValue("menu_category", value)
        setTag(value)
    }

    const handleUploader = (files) => {
        setValue("images", files)
    }
    const onSubmit = async (data) => {
        const {
            title,
            description,
            singleServes,
            pricePerPlate,
            maximumOrderQty,
            minimumOrderQty,
            vegetarian_option,
        }: MenuItemDto = data
        const images: File[] = data.images
        if (menuOptions.length !== 0) {
            const options: MenuOptionDto[] = menuOptions.map(
                (option: MenuOptionDto) => {
                    let newOption

                    newOption = _.omit(option, ["id", "menuChoices"])
                    const choices = option.menuChoices.map((choice) => {
                        const newChoice = _.omit(choice, "id")
                        return newChoice
                    })

                    return {
                        ...newOption,
                        menuChoices: choices
                    }
                }
            )

            const newRecord: MenuItemDto = {
                title,
                description,
                singleServes: Number(singleServes),
                pricePerPlate: Number(pricePerPlate),
                maximumOrderQty: Number(maximumOrderQty),
                minimumOrderQty: Number(minimumOrderQty),
                vegetarian_option,
                menuOptions: options
            }
            createMenu({
                newRecord
            }).then(res => uploadImages(res.data.createMenu.id))
        } else {
            const newRecord: MenuItemDto = {
                title,
                description,
                singleServes: Number(singleServes),
                pricePerPlate: Number(pricePerPlate),
                maximumOrderQty: Number(maximumOrderQty),
                minimumOrderQty: Number(minimumOrderQty),
                vegetarian_option: vegOption
            }
            createMenu({
                newRecord
            }).then(res => uploadImages(res.data.createMenu.id))
        }
        const uploadImages = async (id) => {
            const formData = new FormData()
            images.forEach((file: File) => {
                formData.append('images', file)
            })
            if (images && images !== null) {
                postData(`${process.env.REACT_APP_API_URL}/upload-files/${id}`, formData)
                    .then(data => {
                        console.log(data) // JSON data parsed by `data.json()` call
                    });
            }
        }
        closeDrawer()
    }

    return (
        <>
            <DrawerTitleWrapper>
                <DrawerTitle>Add Menu Item</DrawerTitle>
            </DrawerTitleWrapper>

            <Form onSubmit={handleSubmit(onSubmit)} style={{height: "100%"}} enctype="multipart/form-data">
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
                        Create MenuItem
                    </Button>
                </ButtonGroup>
            </Form>
            <ToasterContainer />
        </>
    )
}

export default AddProduct
