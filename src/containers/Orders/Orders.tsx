import axios from "axios"
import {withStyle} from "baseui"
import NoResult from "components/NoResult/NoResult"
import React, {useCallback, useState} from "react"
import Checkbox from "../../components/CheckBox/CheckBox"
import {
    Col as Column,
    Grid,
    Row as Rows,
} from "../../components/FlexBox/FlexBox"
import {Modal, openModal, closeModal} from '@redq/reuse-modal';
import '@redq/reuse-modal/lib/index.css';
import Input from "../../components/Input/Input"
import Select from "../../components/Select/Select"
import {Header, Heading, Wrapper} from "../../components/WrapperStyle"
import {StyledCell, StyledHeadCell, StyledTable, TableWrapper} from "./Orders.style"
import OrderModal from "./OrderModal"
import {set} from "lodash"

type CustomThemeT = {red400: string; textNormal: string; colors: any}
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
    {value: "confirmed", label: "Confirmed"},
    {value: "cancelled", label: "Cancelled"},
    {value: "delivered", label: "Delivered"},
    {value: "archived", label: "Archived"},
]
const limitSelectOptions = [
    {value: 7, label: "Last 7 orders"},
    {value: 15, label: "Last 15 orders"},
    {value: 30, label: "Last 30 orders"},
]

export default function Orders() {
    // const [checkedId, setCheckedId] = useState([]);
    const [checked, setChecked] = useState(false)
    const [orders, setOrders] = useState<[]>()
    const [status, setStatus] = React.useState()
    const fetchCatererOrders = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/caterers/orders`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        })
        return res.data.data
    }

    const [checkedId, setCheckedId] = useState([]);
    function handleCheckbox(event) {
        const {name} = event.currentTarget;
        if (!checkedId.includes(name)) {
            setCheckedId((prevState) => [...prevState, name]);
        } else {
            setCheckedId((prevState) => prevState.filter((id) => id !== name));
        }
        setChecked(event.target.checked);
    }

    const handleSelect = async (value) => {
        const res = await axios.put(`${process.env.REACT_APP_API_URL}/orders/${checkedId[0]}`, {
            status: value[0].value
        }, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        })
        fetchCatererOrders().then(res => {
            if (res !== null) {
                setOrders(res)
                setCheckedId([])
                setChecked(false)
            }
        })
    }
    React.useEffect(() => {
        fetchCatererOrders().then(res => {
            if (res !== null) {
                setOrders(res)
            }
        })
    }, [])

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
                                        disabled={!checked}
                                        valueKey="value"
                                        placeholder="Status"
                                        onChange={params => {
                                            setStatus(params.value)
                                            handleSelect(params.value)
                                        }}
                                        value={status}
                                        searchable={false}
                                    />
                                </Col>

                                <Col md={3} xs={12}>
                                    {/* <Select
                                        options={limitSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        value={limit}
                                        placeholder="Order Limits"
                                        searchable={false}
                                    /> */}
                                </Col>

                                <Col md={6} xs={12}>
                                    {/* <Input
                                        value={search}
                                        placeholder="Ex: Search By Address"
                                        clearable
                                    /> */}
                                </Col>
                            </Row>
                        </Col>
                    </Header>

                    <Wrapper
                        style={{boxShadow: "0 0 5px rgba(0, 0 , 0, 0.05)"}}
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
                                <StyledHeadCell>Customer Name</StyledHeadCell>
                                <StyledHeadCell>Customer Email</StyledHeadCell>
                                <StyledHeadCell>
                                    Delivery Address
                                </StyledHeadCell>
                                <StyledHeadCell>Amount</StyledHeadCell>
                                <StyledHeadCell>Payment Method</StyledHeadCell>
                                <StyledHeadCell>Contact</StyledHeadCell>
                                <StyledHeadCell>Status</StyledHeadCell>
                                {
                                    orders ? (
                                        orders.length ? (
                                            orders.map(order => Object.values(order))
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
                                                                        component: OrderModal,
                                                                        componentProps: {
                                                                            order: {
                                                                                id: row[0],
                                                                                customerName: row[1],
                                                                                archived: row[2],
                                                                                catererId: row[3],
                                                                                userId: row[4],
                                                                                createdAt: row[5],
                                                                                updatedAt: row[6],
                                                                                customerEmail: row[7],
                                                                                countryCode: row[8],
                                                                                status: row[9],
                                                                                paymentMethod: row[10],
                                                                                totalPrice: row[11],
                                                                                menuItems: row[12],
                                                                                deliveryAddress: row[13]

                                                                            },
                                                                            closeModal: closeModal
                                                                        },
                                                                    })
                                                                }
                                                            >

                                                                {Math.floor(Math.random() * 100).toString()}
                                                            </div>
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[1]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[7]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[13]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[11]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[10]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {"07 365 241"}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[9]}
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
                                    ) : null
                                }
                            </StyledTable>
                        </TableWrapper>
                    </Wrapper>
                </Col>
            </Row>
            <Modal
                style={{
                    padding: 0,
                }}
            />
        </Grid>
    )
}
