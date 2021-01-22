import {styled} from "baseui"
import CategoryUpdate from "containers/CategoryForm/CategoryUpdateForm"
import SubAccountForm from "containers/Subaccount/SubAccountForm"
import React, {useCallback} from "react"
import {CloseIcon} from "../../components/AllSvgIcon"
import Drawer from "../../components/Drawer/Drawer"
import {useDrawerDispatch, useDrawerState} from "../../context/DrawerContext"
import CategoryForm from "../CategoryForm/CategoryForm"
import Sidebar from "../Layout/Sidebar/Sidebar"
/** Drawer Components */
import ProductForm from "../ProductForm/ProductForm"
import ProductUpdateForm from "../ProductForm/ProductUpdateForm"

/** Components Name Constants */
const DRAWER_COMPONENTS = {
    PRODUCT_FORM: ProductForm,
    PRODUCT_UPDATE_FORM: ProductUpdateForm,
    CATEGORY_FORM: CategoryForm,
    CATEGORY_UPDATE_FORM: CategoryUpdate,
    SUBACCOUNT_FORM: SubAccountForm,
    SIDEBAR: Sidebar,
}

const CloseButton = styled("button", ({$theme}) => ({
    ...$theme.typography.fontBold14,
    color: $theme.colors.textNormal,
    lineHeight: 1.2,
    outline: "0",
    border: "none",
    padding: "0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: "10px",
    left: "-30px",
    right: "auto",
    cursor: "pointer",
    backgroundColor: "#ffffff",
    width: "20px",
    height: "20px",
    borderRadius: "50%",

    "@media only screen and (max-width: 767px)": {
        left: "auto",
        right: "30px",
        top: "29px",
    },
}))

export default function DrawerItems() {
    const isOpen = useDrawerState("isOpen")
    const drawerComponent = useDrawerState("drawerComponent")
    const data = useDrawerState("data")
    const dispatch = useDrawerDispatch()
    const closeDrawer = useCallback(() => dispatch({type: "CLOSE_DRAWER"}), [
        dispatch,
    ])
    if (!drawerComponent) {
        return null
    }
    const SpecificContent = DRAWER_COMPONENTS[drawerComponent]

    return (
        <Drawer
            isOpen={isOpen}
            onClose={closeDrawer}
            overrides={{
                Root: {
                    style: {
                        zIndex: 2,
                    },
                },
                DrawerBody: {
                    style: {
                        marginTop: "80px",
                        marginLeft: "60px",
                        marginRight: "60px",
                        marginBottom: "30px",
                        "@media only screen and (max-width: 767px)": {
                            marginTop: "80px",
                            marginLeft: "30px",
                            marginRight: "30px",
                            marginBottom: "30px",
                        },
                    },
                },
                DrawerContainer: {
                    style: {
                        width: "96vw",
                        backgroundColor: "#f7f7f7",
                        "@media only screen and (max-width: 767px)": {
                            width: "100%",
                        },
                    },
                },
                Close: {
                    component: () => (
                        <CloseButton onClick={closeDrawer}>
                            <CloseIcon width="6px" height="6px" />
                        </CloseButton>
                    ),
                },
            }}
        >
            <SpecificContent onClose={closeDrawer} data={data} />
        </Drawer>
    )
}
