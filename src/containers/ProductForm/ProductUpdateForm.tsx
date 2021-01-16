import {ToasterContainer} from "baseui/toast"
import React, {useCallback, useState} from "react"
import {useForm} from "react-hook-form"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import {
    MenuItem
} from "../../graphql/types"
import {
    DrawerTitle,
    DrawerTitleWrapper
} from "../DrawerItems/DrawerItems.style"

type Props = any

const AddProduct: React.FC<Props> = () => {
    const dispatch = useDrawerDispatch()
    const data: MenuItem = useDrawerState("data")
    // const dispatchOptions = useMenuDispatch()
    // const [, updateMenu] = useUpdateOneMenuItemMutation()
    // const [, deleteMenu] = useDeleteMenuMutation()
    // const [, updatePhoto] = useUpdateItemPhotoMutation()
    // const [showOptions, setShowOption] = useState(false)
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])
    const {register, handleSubmit, setValue, errors} = useForm({
        defaultValues: data,
    })
    const [description, setDescription] = useState(data.description)
    React.useEffect(() => {
        register({name: "type"})
        register({name: "categories"})
        register({name: "description"})
    }, [register])

    const handleDescriptionChange = (e) => {
        const value = e.target.value
        setValue("description", value)
        setDescription(value)
    }

    // const handleUploader = (path) => {
    //     updatePhoto({
    //         imageId: data.images[0].id,
    //         path,
    //     }).then(() =>
    //         toaster.positive(<>Item Updated</>, {
    //             overrides: {
    //                 InnerContainer: {
    //                     style: { width: "100%" },
    //                 },
    //             },
    //         })
    //     )
    // }
    // React.useEffect(() => {
    //     if (data.menu_options)
    //         data.menu_options.map((menu_option) =>
    //             dispatchOptions({ type: "ADD_OPTION", menuOption: menu_option })
    //         )
    //     return () => dispatchOptions({ type: "RESET_OPTIONS" })
    // }, [data, dispatchOptions])

    // const onSubmit = (result) => {
    //     updateMenu({
    //         updateOneMenuItemWhere: {
    //             id: data.id,
    //         },
    //         updateOneMenuItemData: {
    //             title: {
    //                 set: result.title,
    //             },
    //             description: {
    //                 set: result.description,
    //             },
    //             maximum_quantity: {
    //                 set: Number(result.maximum_quantity),
    //             },
    //             minimum_quantity: {
    //                 set: Number(result.minimum_quantity),
    //             },
    //             price_per_plate: {
    //                 set: Number(result.price_per_plate),
    //             },
    //             single_serves: {
    //                 set: Number(result.single_serves),
    //             },
    //         },
    //     })
    //     toaster.positive(<>Item Updated</>, {
    //         overrides: {
    //             InnerContainer: {
    //                 style: { width: "100%" },
    //             },
    //         },
    //     })
    //     setTimeout(() => closeDrawer(), 500)
    // }
    return (
        <>
            <ToasterContainer />
            <DrawerTitleWrapper>
                <DrawerTitle>Update Menu Item</DrawerTitle>
            </DrawerTitleWrapper>

            {/* <Form onSubmit={handleSubmit(onSubmit)} style={{ height: "100%" }}>
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
                            <FieldDetails>
                                Upload your Product image here
                            </FieldDetails>
                        </Col>
                        <Col lg={8}>
                            <DrawerBox>
                                <Uploader
                                    onChange={handleUploader}
                                    imageURL={data.images[0].src}
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
                                    {errors.singleServes && (
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
                                        inputRef={register({ required: true })}
                                        name="minimum_quantity"
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
                                            <MenuItemForm />
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
                                            deleteMenu({
                                                id: data.id,
                                            }).then(() => closeDrawer())
                                        }}
                                        kind={KIND.minimal}
                                        overrides={{
                                            BaseButton: {
                                                style: ({ $theme }) => ({
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
                        Update MenuItem
                    </Button>
                </ButtonGroup>
            </Form> */}
            <ToasterContainer />
        </>
    )
}

export default AddProduct
