import {withStyle} from "baseui"
import {DeleteAlt} from "baseui/icon"
import NoResult from "components/NoResult/NoResult"
import {useDeleteMenuCategoryMutation, useMenuCategoriesQuery} from "graphql/types"
import React, {useCallback, useState} from "react"
import {Plus} from "../../components/AllSvgIcon"
import Button, {KIND} from "../../components/Button/Button"
import Checkbox from "../../components/CheckBox/CheckBox"
import {
    Col as Column,
    Grid,
    Row as Rows
} from "../../components/FlexBox/FlexBox"
import Input from "../../components/Input/Input"
import {Modal, openModal, closeModal} from '@redq/reuse-modal';
import '@redq/reuse-modal/lib/index.css';
import {Header, Heading, Wrapper} from "../../components/WrapperStyle"
import {useDrawerDispatch} from "../../context/DrawerContext"
import {StyledCell, StyledHeadCell, StyledTable, TableWrapper} from "./Category.style"
import CategoryUpdate from "containers/CategoryForm/CategoryUpdateForm"

const Col = withStyle(Column, () => ({
    "@media only screen and (max-width: 767px)": {
        marginBottom: "20px",

        ":last-child": {
            marginBottom: 0,
        },
    },
}))

const Row = withStyle(Rows, () => ({
    "@media only screen and (min-width: 768px)": {
        alignItems: "center",
    },
}))


export default function Category() {
    const [search] = useState("")
    const dispatch = useDrawerDispatch()
    const [, deleteMenuCategory] = useDeleteMenuCategoryMutation()
    const [] = useState([]);
    const [checkedId, setCheckedId] = useState([]);
    const [result,refetch] = useMenuCategoriesQuery({requestPolicy: "network-only"})
    const {data} = result

    const [checked, setChecked] = useState(false)
    const openDrawer = useCallback(
        () =>
            dispatch({type: "OPEN_DRAWER", drawerComponent: "CATEGORY_FORM",data: {
                refetch
            },}),
        [dispatch]
    )


    function handleCheckbox(event) {
        const {name} = event.currentTarget;
        if (!checkedId.includes(name)) {
            setCheckedId((prevState) => [...prevState, name]);
        } else {
            setCheckedId((prevState) => prevState.filter((id) => id !== name));
        }
        setChecked(event.target.checked);
    }

    function onAllCheck(event) {
        if (event.target.checked) {
            const idx = data && data.caterer.menuCategories.map((current) => current.id);
            setCheckedId(idx);
        } else {
            setCheckedId([]);
        }
        setChecked(event.target.checked);
    }
    const deleteMenu = () => {
        checkedId.map(id => {
            deleteMenuCategory({
                id
            })
        })
        setChecked(false)
    }
    // function Icon({ icon }) {
    //     const Component = icons.hasOwnProperty(icon) ? icons[icon] : "span"
    //     return <Component />
    // }
    return (
        <React.Fragment>
            <Grid fluid={true}>
                <Row>
                    <Col md={12}>
                        <Header
                            style={{
                                marginBottom: 30,
                                boxShadow: "0 0 5px rgba(0, 0 ,0, 0.05)",
                            }}
                        >
                            <Col md={2}>
                                <Heading>Category</Heading>
                            </Col>

                            <Col md={10}>
                                <Row>
                                    <Col md={3} lg={3}>
                                        <Button
                                            disabled={!checked}
                                            onClick={deleteMenu}
                                            kind={KIND.minimal}
                                            startEnhancer={() => <DeleteAlt size={24} />}
                                            overrides={{
                                                BaseButton: {
                                                    style: () => ({
                                                        width: "100%",
                                                        borderTopLeftRadius: "3px",
                                                        borderTopRightRadius: "3px",
                                                        borderBottomLeftRadius:
                                                            "3px",
                                                        borderBottomRightRadius:
                                                            "3px",
                                                    }),
                                                },
                                            }}
                                        >
                                            Delete
                                    </Button>

                                    </Col>

                                    <Col md={5} lg={6}>
                                        <Input
                                            value={search}
                                            placeholder="Ex: Search By Name"
                                            clearable
                                        />
                                    </Col>

                                    <Col md={4} lg={3}>
                                        <Button
                                            onClick={openDrawer}

                                            startEnhancer={() => <Plus />}
                                            overrides={{
                                                BaseButton: {
                                                    style: () => ({
                                                        width: "100%",
                                                        borderTopLeftRadius: "3px",
                                                        borderTopRightRadius: "3px",
                                                        borderBottomLeftRadius:
                                                            "3px",
                                                        borderBottomRightRadius:
                                                            "3px",
                                                    }),
                                                },
                                            }}
                                        >
                                            Add Category
                                    </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Header>

                        <Wrapper
                            style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}
                        >
                            <TableWrapper>
                                <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto)">
                                    <StyledHeadCell>
                                        <Checkbox
                                            type="checkbox"
                                            value="checkAll"
                                            disabled={true}
                                            onChange={onAllCheck}
                                            overrides={{
                                                Checkmark: {
                                                    style: {
                                                        borderTopWidth: '2px',
                                                        borderRightWidth: '2px',
                                                        borderBottomWidth: '2px',
                                                        borderLeftWidth: '2px',
                                                        borderTopLeftRadius: '4px',
                                                        borderTopRightRadius: '4px',
                                                        borderBottomRightRadius: '4px',
                                                        borderBottomLeftRadius: '4px',
                                                    },
                                                },
                                            }}
                                        />
                                    </StyledHeadCell>
                                    <StyledHeadCell>Id</StyledHeadCell>
                                    <StyledHeadCell>Title</StyledHeadCell>

                                    {data ? (
                                        data.caterer.menuCategories.length ? (
                                            data.caterer.menuCategories
                                                .map((item) => Object.values(item))
                                                .map((row, index) => (
                                                    <React.Fragment key={index}>
                                                        <StyledCell>
                                                            <Checkbox
                                                                name={row[0]}
                                                                checked={checkedId.includes(row[0])}
                                                                onChange={handleCheckbox}

                                                                overrides={{
                                                                    Checkmark: {
                                                                        style: {
                                                                            borderTopWidth: '2px',
                                                                            borderRightWidth: '2px',
                                                                            borderBottomWidth: '2px',
                                                                            borderLeftWidth: '2px',
                                                                            borderTopLeftRadius: '4px',
                                                                            borderTopRightRadius: '4px',
                                                                            borderBottomRightRadius: '4px',
                                                                            borderBottomLeftRadius: '4px',
                                                                        },
                                                                    },
                                                                }}
                                                            />
                                                        </StyledCell>
                                                        <StyledCell>
                                                            <div
                                                                style={{
                                                                    cursor: "pointer",
                                                                    color: "#8A6AFC",
                                                                    textDecoration: "underline"
                                                                }}
                                                                onClick={
                                                                    () => openModal({
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
                                                                        closeOnClickOutside: true,
                                                                        component: CategoryUpdate,
                                                                        componentProps: {
                                                                            data: {
                                                                                id: row[0],
                                                                                title: row[1],
                                                                                menuItems: row[2]
                                                                            },
                                                                            closeModal: closeModal,
                                                                            refetch
                                                                        },
                                                                    })
                                                                }    >

                                                                {row[0]}
                                                            </div>
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[1]}
                                                        </StyledCell>

                                                    </React.Fragment>
                                                ))
                                        ) : (

                                                <NoResult
                                                    hideButton={false}
                                                    style={{
                                                        gridColumnStart: "1",
                                                        gridColumnEnd: "one",
                                                    }}
                                                />
                                            )
                                    ) : null}
                                </StyledTable>
                            </TableWrapper>
                        </Wrapper>
                    </Col>
                </Row>

            </Grid>
            <Modal

            />

        </React.Fragment>
    )
}
