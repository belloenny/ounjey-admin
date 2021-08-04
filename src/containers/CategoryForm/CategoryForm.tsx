import {Button, KIND} from "baseui/button"
import {Input} from "baseui/input"
import DrawerBox from "components/DrawerBox/DrawerBox"
import {FormFields, FormLabel} from "components/FormFields/FormFields"
import React, {useCallback} from "react"
import {Row, Col} from "react-flexbox-grid"
import {useForm} from "react-hook-form"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import {Scrollbars} from "react-custom-scrollbars"
import {
    ButtonGroup,
    DrawerTitle,
    DrawerTitleWrapper,
    FieldDetails,
    Form
} from "../DrawerItems/DrawerItems.style"
import {useCreateMenuCategoryMutation} from "graphql/types"


type Props = any

const AddCategory: React.FC<Props> = () => {
    const dispatch = useDrawerDispatch()
    const prop = useDrawerState('data')
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])
    const {register, handleSubmit} = useForm()
    const [, createMenuCategory] = useCreateMenuCategoryMutation()


    const onSubmit = async ({title}: {title: string}) => {
        await createMenuCategory({
            newRecord: {
                title
            }
        }).then(() => {
            prop.refetch()
            closeDrawer()
        })
    }
    return (
        <>
            <DrawerTitleWrapper>
                <DrawerTitle>Add Category</DrawerTitle>
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
                                        name="title"
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
                                style: ({ }) => ({
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
            </Form>
        </>
    )
}

export default AddCategory
