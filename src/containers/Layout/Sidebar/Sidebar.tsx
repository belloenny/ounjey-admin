import React, {useContext} from "react"
import {withRouter} from "react-router-dom"
import {
    LogoutIcon,
    OrderIcon,
    ProductIcon,
    SettingIcon,
    SidebarCategoryIcon
} from "../../../components/AllSvgIcon"
import {AuthContext} from "../../../context/auth"
import {
    CATEGORY,

    ORDERS,
    PRODUCTS,
    SETTINGS
} from "../../../settings/constants"
import {
    LogoutBtn,
    MenuWrapper,
    NavLink,
    SidebarWrapper,
    Svg
} from "./Sidebar.style"

const sidebarMenus = [
    // {
    //     name: "Dashboard",
    //     path: DASHBOARD,
    //     exact: true,
    //     icon: <DashboardIcon />,
    // },
    {
        name: "MenuItems",
        path: PRODUCTS,
        exact: false,
        icon: <ProductIcon />,
    },
    {
        name: "MenuCategories",
        path: CATEGORY,
        exact: false,
        icon: <SidebarCategoryIcon />,
    },
    {
        name: "Orders",
        path: ORDERS,
        exact: false,
        icon: <OrderIcon />,
    },
    {
        name: "Settings",
        path: SETTINGS,
        exact: false,
        icon: <SettingIcon />,
    },
]

export default withRouter(function Sidebar({
    refs,
    style,
    onMenuItemClick,
}: any) {
    const {signout} = useContext(AuthContext)
    return (
        <SidebarWrapper ref={refs} style={style}>
            <MenuWrapper>
                {sidebarMenus.map((menu: any, index: number) => (
                    <NavLink
                        to={menu.path}
                        key={index}
                        exact={menu.exact}
                        activeStyle={{
                            color: "#FC3838",
                            backgroundColor: "#f7f7f7",
                            borderRadius: "50px 0 0 50px",
                        }}
                        onClick={onMenuItemClick}
                    >
                        {menu.icon ? <Svg>{menu.icon}</Svg> : ""}
                        {menu.name}
                    </NavLink>
                ))}
            </MenuWrapper>

            <LogoutBtn
                onClick={() => {
                    signout()
                }}
            >
                <Svg>
                    <LogoutIcon />
                </Svg>
                Logout
            </LogoutBtn>
        </SidebarWrapper>
    )
})
