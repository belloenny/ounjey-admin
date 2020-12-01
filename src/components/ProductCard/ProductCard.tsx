import React from "react"
import { useDrawerDispatch } from "../../context/DrawerContext"
import {
    Image,
    ProductCardWrapper,
    ProductImageWrapper,
    ProductInfo,
    ProductMeta,
    ProductPrice,
    ProductPriceWrapper,
    ProductTitle,
} from "./ProductCard.style"

type ProductCardProps = {
    title: string
    image: any

    currency?: string

    price: number

    data: any
}

const ProductCard: React.FC<ProductCardProps> = ({
    title,
    image,

    price,

    currency,
    data,

    ...props
}) => {
    const dispatch = useDrawerDispatch()

    const openDrawer = React.useCallback(
        () =>
            dispatch({
                type: "OPEN_DRAWER",
                drawerComponent: "PRODUCT_UPDATE_FORM",
                data: data,
            }),
        [dispatch, data]
    )
    return (
        <ProductCardWrapper
            {...props}
            className="product-card"
            onClick={openDrawer}
        >
            <ProductImageWrapper>
                <Image url={image} className="product-image" />
            </ProductImageWrapper>
            <ProductInfo>
                <ProductTitle>{title}</ProductTitle>
                <ProductMeta>
                    <ProductPriceWrapper>
                        <ProductPrice>
                            {currency}
                            {price}
                        </ProductPrice>
                    </ProductPriceWrapper>
                </ProductMeta>
            </ProductInfo>
        </ProductCardWrapper>
    )
}

export default ProductCard
