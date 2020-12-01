import { withStyle } from "baseui"
import React, { useState } from "react"
import Checkbox from "../../components/CheckBox/CheckBox"
import {
    Col as Column,
    Grid,
    Row as Rows,
} from "../../components/FlexBox/FlexBox"
import Input from "../../components/Input/Input"
import Select from "../../components/Select/Select"
import { Header, Heading, Wrapper } from "../../components/WrapperStyle"
import { StyledHeadCell, StyledTable, TableWrapper } from "./Orders.style"

type CustomThemeT = { red400: string; textNormal: string; colors: any }
// const themedUseStyletron = createThemedUseStyletron<CustomThemeT>()

// const Status = styled("div", ({ $theme }) => ({
//     ...$theme.typography.fontBold14,
//     color: $theme.colors.textDark,
//     display: "flex",
//     alignItems: "center",
//     lineHeight: "1",
//     textTransform: "capitalize",

//     ":before": {
//         content: '""',
//         width: "10px",
//         height: "10px",
//         display: "inline-block",
//         borderRadius: "10px",
//         backgroundColor: $theme.borders.borderE6,
//         marginRight: "10px",
//     },
// }))

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

const statusSelectOptions = [
    { value: "delivered", label: "Delivered" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "failed", label: "Failed" },
]
const limitSelectOptions = [
    { value: 7, label: "Last 7 orders" },
    { value: 15, label: "Last 15 orders" },
    { value: 30, label: "Last 30 orders" },
]

export default function Orders() {
    // const [checkedId, setCheckedId] = useState([]);
    const [checked] = useState(false)

    // const [useCss, theme] = themedUseStyletron();
    // const sent = useCss({
    //   ':before': {
    //     content: '""',
    //     backgroundColor: theme.colors.primary,
    //   },
    // });
    // const failed = useCss({
    //   ':before': {
    //     content: '""',
    //     backgroundColor: theme.colors.red400,
    //   },
    // });
    // const processing = useCss({
    //   ':before': {
    //     content: '""',
    //     backgroundColor: theme.colors.textNormal,
    //   },
    // });
    // const paid = useCss({
    //   ':before': {
    //     content: '""',
    //     backgroundColor: theme.colors.blue400,
    //   },
    // });

    const [status] = useState([])
    const [limit] = useState([])
    const [search] = useState([])

    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <Header
                        style={{
                            marginBottom: 30,
                            boxShadow: "0 0 8px rgba(0, 0 ,0, 0.1)",
                        }}
                    >
                        <Col md={3} xs={12}>
                            <Heading>Orders</Heading>
                        </Col>

                        <Col md={9} xs={12}>
                            <Row>
                                <Col md={3} xs={12}>
                                    <Select
                                        options={statusSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        placeholder="Status"
                                        value={status}
                                        searchable={false}
                                    />
                                </Col>

                                <Col md={3} xs={12}>
                                    <Select
                                        options={limitSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        value={limit}
                                        placeholder="Order Limits"
                                        searchable={false}
                                    />
                                </Col>

                                <Col md={6} xs={12}>
                                    <Input
                                        value={search}
                                        placeholder="Ex: Search By Address"
                                        clearable
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Header>

                    <Wrapper
                        style={{ boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)" }}
                    >
                        <TableWrapper>
                            <StyledTable $gridTemplateColumns="minmax(70px, 70px) minmax(70px, 70px) minmax(150px, auto) minmax(150px, auto) minmax(200px, max-content) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto) minmax(150px, auto)">
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
                                <StyledHeadCell>ID</StyledHeadCell>
                                <StyledHeadCell>Customer ID</StyledHeadCell>
                                <StyledHeadCell>Time</StyledHeadCell>
                                <StyledHeadCell>
                                    Delivery Address
                                </StyledHeadCell>
                                <StyledHeadCell>Amount</StyledHeadCell>
                                <StyledHeadCell>Payment Method</StyledHeadCell>
                                <StyledHeadCell>Contact</StyledHeadCell>
                                <StyledHeadCell>Status</StyledHeadCell>
                            </StyledTable>
                        </TableWrapper>
                    </Wrapper>
                </Col>
            </Row>
        </Grid>
    )
}
