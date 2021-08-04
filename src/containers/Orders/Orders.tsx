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


export default function Orders() {
    // const [checkedId, setCheckedId] = useState([]);
    const [checked, setChecked] = useState(false)
    const [orders, setOrders] = useState<[]>()
    const [status, setStatus] = React.useState()
    const fetchCatererOrders = async () => {
        const res = await axios.post(`${process.env.REACT_APP_API_URL}/graphql`, {
            query: `
                {
                    orders {
                        id
                        customerName
                        customerEmail
                        deliveryAddress
                        totalPrice
                        paymentMethod
                        customerEmail
                        status
                        archived
                        catererId
                        userId
                        createdAt
                        updatedAt
                        countryCode
                        menuItems {
                            id
                            title
                            quantity
                            totalPrice
                            optionsPicked{
                                title
                                choiceAmount
                                choicesPicked {
                                    name
                                    choicePrice
                                }
                            }
                        }
                    }
                }
            `
        }, {

            headers: {
                "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
            }
        })
        console.log(res.data);

        return res.data.data.orders;
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
                console.log(res)
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
                                                                                archived: row[7],
                                                                                catererId: row[8],
                                                                                userId: row[9],
                                                                                createdAt: row[10],
                                                                                updatedAt: row[11],
                                                                                customerEmail: row[2],
                                                                                countryCode: row[12],
                                                                                status: row[6],
                                                                                paymentMethod: row[5],
                                                                                totalPrice: row[4],
                                                                                menuItems: row[13],
                                                                                deliveryAddress: row[3]

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
                                                            {row[1]

                                                            }
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[2]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[3]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[4]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[5]}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {"07 365 241"}
                                                        </StyledCell>
                                                        <StyledCell>
                                                            {row[6]}
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
