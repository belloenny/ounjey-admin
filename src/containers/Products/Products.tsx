import {styled, withStyle} from "baseui"
import React, {useState} from "react"
import {
    Col as Column,
    Grid,
    Row as Rows
} from "../../components/FlexBox/FlexBox"
import {useMenuItemsQuery} from "../../graphql/types"

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
    // const { data, error, refetch, fetchMore } = useQuery(GET_PRODUCTS);
    const [result, fetchMore] = useMenuItemsQuery()

    const [type] = useState([])
    const [priceOrder] = useState([])
    const [search] = useState([])
    const {data, fetching, error} = result
    if (error) {
        return <div>Error! {error.message}</div>
    }
    function loadMore() {
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
            {/* <Row>
                <Col md={12}>
                    <Header style={{marginBottom: 15}}>
                        <Col md={2} xs={12}>
                            <Heading>Menu Items</Heading>
                        </Col>

                        <Col md={10} xs={12}>
                            <Row>
                                <Col md={3} xs={12}>
                                    <Select
                                        options={typeSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        placeholder="Category Type"
                                        value={type}
                                        searchable={false}
                                    />
                                </Col>

                                <Col md={3} xs={12}>
                                    <Select
                                        options={priceSelectOptions}
                                        labelKey="label"
                                        valueKey="value"
                                        value={priceOrder}
                                        placeholder="Price"
                                        searchable={false}
                                    />
                                </Col>

                                <Col md={6} xs={12}>
                                    <Input
                                        value={search}
                                        placeholder="Ex: Search By Name"
                                        clearable
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Header>

                    <Row>
                        {data ? (
                            data.caterer &&
                                data.caterer.menu_items.length !== 0 ? (
                                    data.caterer.menu_items.map(
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
                                                        image={item.images[0].src}
                                                        currency={CURRENCY}
                                                        price={item.price_per_plate}
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
                                <Button isLoading={fetching}>Load More</Button>
                            </Col>
                        </Row>
                    )}
                </Col>
            </Row> */}
        </Grid>
    )
}
