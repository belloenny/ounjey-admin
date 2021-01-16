import React, {useCallback} from "react"
import {useForm} from "react-hook-form"
import {AuthContext} from "../../context/auth"
import {useDrawerDispatch} from "../../context/DrawerContext"
import {
    DrawerTitle,
    DrawerTitleWrapper
} from "../DrawerItems/DrawerItems.style"

const options = [
    {value: "grocery", name: "Grocery", id: "1"},
    {value: "women-cloths", name: "Women Cloths", id: "2"},
    {value: "bags", name: "Bags", id: "3"},
    {value: "makeup", name: "Makeup", id: "4"},
]
type Props = any

const AddCategory: React.FC<Props> = (props) => {
    const dispatch = useDrawerDispatch()
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])

    const {register, handleSubmit} = useForm()
    // const [category, setCategory] = useState([])
    const {userData} = React.useContext(AuthContext)
    React.useEffect(() => {
        register({name: "parent"})
        register({name: "path"})
    }, [register])

    // const onSubmit = async ({ name }) => {
    //     const res = await createMenu({
    //         title: name,
    //         user_id: userData.caterer.user_id,
    //     })
    //     if (!res.data || res.error) {
    //     }
    //     closeDrawer()
    // }
    // const handleChange = ({ value }) => {
    //     setValue("parent", value)
    //     setCategory(value)
    // }
    // const handleUploader = (path) => {
    //     setValue("path", path)
    // }

    return (
        <>
            <DrawerTitleWrapper>
                <DrawerTitle>Add Category</DrawerTitle>
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
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={4}>
                            <FieldDetails>
                                Add a Category to categorize your menuItems
                            </FieldDetails>
                        </Col>

                        <Col lg={8}>
                            <DrawerBox>
                                <FormFields>
                                    <FormLabel>Category Name</FormLabel>
                                    <Input
                                        inputRef={register({
                                            required: true,
                                            maxLength: 20,
                                        })}
                                        name="name"
                                    />
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
                        Create Category
                    </Button>
                </ButtonGroup>
            </Form> */}
        </>
    )
}

export default AddCategory
