import { withStyle } from "baseui"
import { StyledCell } from "baseui/table"
import React, { useCallback, useState } from "react"
import { Plus } from "../../components/AllSvgIcon"
import Button from "../../components/Button/Button"
import Checkbox from "../../components/CheckBox/CheckBox"
import {
    Col as Column,
    Grid,
    Row as Rows,
} from "../../components/FlexBox/FlexBox"
import Input from "../../components/Input/Input"
import NoResult from "../../components/NoResult/NoResult"
import Select from "../../components/Select/Select"
import { Header, Heading, Wrapper } from "../../components/WrapperStyle"
import { AuthContext } from "../../context/auth"
import { useDrawerDispatch } from "../../context/DrawerContext"
import { useCategoriesQuery } from "../../graphql/types"
import { StyledHeadCell, StyledTable, TableWrapper } from "./Category.style"

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

const categorySelectOptions = [
    { value: "grocery", label: "Grocery" },
    { value: "women-cloths", label: "Women Cloth" },
    { value: "bags", label: "Bags" },
    { value: "makeup", label: "Makeup" },
]

export default function Category() {
    const [category] = useState([])
    const [search] = useState("")
    const dispatch = useDrawerDispatch()
    const { userData } = React.useContext(AuthContext)
    const [result] = useCategoriesQuery({
        variables: {
            user_id: userData.caterer.user_id,
        },
    })
    const { data, fetching, error } = result

    const [checked] = useState(false)
    const openDrawer = useCallback(
        () =>
            dispatch({ type: "OPEN_DRAWER", drawerComponent: "CATEGORY_FORM" }),
        [dispatch]
    )
    if (data) {
        console.log(data)
    }
    // function Icon({ icon }) {
    //     const Component = icons.hasOwnProperty(icon) ? icons[icon] : "span"
    //     return <Component />
    // }
    return (
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
                                    <Select
                                        options={categorySelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        placeholder="Category Type"
                                        value={category}
                                        searchable={false}
                                    />
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
                        style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}
                    >
                        <TableWrapper>
                            <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) auto">
                                <StyledHeadCell>
                                    <Checkbox
                                        type="checkbox"
                                        value="checkAll"
                                        checked={checked}
                                        overrides={{
                                            Checkmark: {
                                                style: {
                                                    borderTopWidth: "2px",
                                                    borderRightWidth: "2px",
                                                    borderBottomWidth: "2px",
                                                    borderLeftWidth: "2px",
                                                    borderTopLeftRadius: "4px",
                                                    borderTopRightRadius: "4px",
                                                    borderBottomRightRadius:
                                                        "4px",
                                                    borderBottomLeftRadius:
                                                        "4px",
                                                },
                                            },
                                        }}
                                    />
                                </StyledHeadCell>

                                <StyledHeadCell>Name</StyledHeadCell>

                                <StyledHeadCell>Type</StyledHeadCell>
                                {data ? (
                                    data.menuCategories.length ? (
                                        data.menuCategories
                                            .map((item) => Object.values(item))
                                            .map((row, index) => (
                                                <React.Fragment key={index}>
                                                    <StyledCell>
                                                        {row[0]}
                                                    </StyledCell>
                                                    <StyledCell>
                                                        {row[3]}
                                                    </StyledCell>
                                                    <StyledCell>
                                                        {row[4]}
                                                    </StyledCell>
                                                </React.Fragment>
                                            ))
                                    ) : (
                                        // .map((row, index) => (
                                        //     <StyledCell>
                                        //         {row[0]}
                                        //     </StyledCell>
                                        // ))
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
    )
}
