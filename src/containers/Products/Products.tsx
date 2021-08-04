import {styled, withStyle} from "baseui"
import Button from "../../components/Button/Button"

import React, {useState} from "react"
import {
    Col as Column,
    Grid,
    Row as Rows
} from "../../components/FlexBox/FlexBox"
import Fade from "react-reveal/Fade"
import Input from "../../components/Input/Input"
import NoResult from "../../components/NoResult/NoResult"
import Placeholder from "../../components/Placeholder/Placeholder"
import ProductCard from "../../components/ProductCard/ProductCard"

import {Header, Heading} from "../../components/WrapperStyle"
import {useMenuItemsQuery} from "../../graphql/types"
import {CURRENCY} from "../../settings/constants"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import {Drawer, ANCHOR} from "baseui/drawer"
import {MenuIcon, ArrowLeftRound} from "../../components/AllSvgIcon"
import Sidebar from "../Layout/Sidebar/Sidebar"
import {DrawerWrapper, DrawerIcon, CloseButton} from "../Layout/Topbar/Topbar.style"
import Select from "components/Select/Select"
import {useMenuDispatch} from "context/MenuContext"

export const ProductsRow = styled("div", ({$theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    marginTop: "25px",
    backgroundColor: $theme.colors.backgroundF7,
    position: "relative",
    zIndex: "1",

    "@media only screen and (max-width: 767px)": {
        marginLeft: "-7.5px",
        marginRight: "-7.5px",
        marginTop: "15px",
    },
}))

export const Col = withStyle(Column, () => ({
    "@media only screen and (max-width: 767px)": {
        marginBottom: "20px",

        ":last-child": {
            marginBottom: 0,
        },
    },
}))

const Row = withStyle(Rows, () => ({
    "@media only screen and (min-width: 768px) and (max-width: 991px)": {
        alignItems: "center",
    },
}))

export const ProductCardWrapper = styled("div", () => ({
    height: "100%",
}))

export const LoaderWrapper = styled("div", () => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    flexWrap: "wrap",
}))
export const LoaderWrapper2 = styled("div", () => ({
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: "wrap",
}))

export const LoaderItem = styled("div", () => ({
    width: "25%",
    padding: "0 15px",
    marginBottom: "30px",
}))

const typeSelectOptions = [
    {value: "grocery", label: "Grocery"},
    {value: "women-cloths", label: "Women Cloths"},
    {value: "bags", label: "Bags"},
    {value: "makeup", label: "Makeup"},
]
const priceSelectOptions = [
    {value: "highestToLowest", label: "Highest To Lowest"},
    {value: "lowestToHighest", label: "Lowest To Highest"},
]

export default function Products() {
    const [result, fetchMore] = useMenuItemsQuery({requestPolicy: "network-only"})
    const dispatch = useMenuDispatch()
    const isOpen = useDrawerState("isOpen")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const [type] = useState([])
    const [priceOrder] = useState([])
    const [search] = useState([])

    const {data, fetching, error} = result
    React.useEffect(() => {
        if (data) {
            dispatch({type: "ADD_ITEMS", menuItems: data.caterer.menuItems})
        }


    }, [data])
    if (error) {
        return <div>Error! {error.message}</div>
    }

    function loadMore() {
        console.log(`im here`);

        fetchMore({
            requestPolicy: "network-only"
        })
        //   toggleLoading(true);
        //   fetchMore({
        //     variables: {
        //       offset: data.products.items.length,
        //     },
        //     updateQuery: (prev, { fetchMoreResult }) => {
        //       toggleLoading(false);
        //       if (!fetchMoreResult) return prev;
        //       return Object.assign({}, prev, {
        //         products: {
        //           __typename: prev.products.__typename,
        //           items: [...prev.products.items, ...fetchMoreResult.products.items],
        //           hasMore: fetchMoreResult.products.hasMore,
        //         },
        //       });
        //     },
        //   });
    }


    return (
        <Grid fluid={true}>
            <Row>
                <Col md={12}>
                    <Header style={{marginBottom: 15}}>
                        <Col md={2} xs={12}>
                            <Heading>Menu Items</Heading>
                        </Col>
                        <Col md={10} xs={12}>
                            <Row>
                                <Col md={3} xs={12}>
                                    {/* <Select
                                        options={typeSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        placeholder="Category Type"
                                        value={type}
                                        searchable={false}
                                    /> */}
                                </Col>

                                <Col md={3} xs={12}>
                                    {/* <Select
                                        options={priceSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        value={priceOrder}
                                        placeholder="Price"
                                        searchable={false}
                                    /> */}
                                </Col>

                                <Col md={6} xs={12}>
                                    {/* <Input
                                        value={search}
                                        placeholder="Ex: Search By Name"
                                        clearable
                                    /> */}
                                </Col>
                            </Row>
                        </Col>
                    </Header>


                    <Row>
                        {data ? (
                            data.caterer &&
                                data.caterer.menuItems.length !== 0 ? (
                                    data.caterer.menuItems.map(
                                        (item, index: number) => (
                                            <Col
                                                md={4}
                                                lg={3}
                                                sm={6}
                                                xs={12}
                                                key={index}
                                                style={{margin: "15px 0"}}
                                            >
                                                <Fade
                                                    bottom
                                                    duration={800}
                                                    delay={index * 10}
                                                >
                                                    <ProductCard
                                                        title={item.title}
                                                        image={item.images && item.images.length !== 0 ? item.images[0].src : ""}
                                                        currency={CURRENCY}
                                                        price={item.pricePerPlate}
                                                        refetch={loadMore}
                                                        data={item}
                                                    />
                                                </Fade>
                                            </Col>
                                        )
                                    )
                                ) : (
                                    <NoResult hideButton={true} />
                                )
                        ) : (
                                <LoaderWrapper>
                                    <LoaderItem>
                                        <Placeholder />
                                    </LoaderItem>
                                    <LoaderItem>
                                        <Placeholder />
                                    </LoaderItem>
                                    <LoaderItem>
                                        <Placeholder />
                                    </LoaderItem>
                                    <LoaderItem>
                                        <Placeholder />
                                    </LoaderItem>
                                </LoaderWrapper>
                            )}
                    </Row>
                    {data && data.caterer && (
                        <Row>
                            <Col
                                md={12}
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row>
        </Grid>
    )
}
