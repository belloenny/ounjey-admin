import React, {useCallback, useState} from "react"
import {Link} from "react-router-dom"
import {
    AlertDotIcon,
    ArrowLeftRound,
    MenuIcon,
    NotificationIcon
} from "../../../components/AllSvgIcon"
import Button from "../../../components/Button/Button"
import Drawer, {ANCHOR} from "../../../components/Drawer/Drawer"
import Notification from "../../../components/Notification/Notification"
import Popover, {PLACEMENT} from "../../../components/Popover/Popover"
import {AuthContext} from "../../../context/auth"
import {useDrawerDispatch} from "../../../context/DrawerContext"
import Logoimage from "../../../image/logo.svg"
import UserImage from "../../../image/user.jpg"
import {SETTINGS, SITE_SETTINGS} from "../../../settings/constants"
import Sidebar from "../Sidebar/Sidebar"
import {
    AlertDot,
    CloseButton,
    DrawerIcon,
    DrawerWrapper,
    Image,
    Logo,
    LogoImage,
    LogoutBtn,
    NavLink,
    NotificationIconWrapper,
    ProfileImg,
    TopbarRightSide,
    TopbarWrapper,
    UserDropdowItem
} from "./Topbar.style"

const data = [
    {
        title: "Account Setup",
        message: "Finish Setting Up your account",
    },
]
const Topbar = ({refs}: any) => {
    const dispatch = useDrawerDispatch()
    const {signout, userData} = React.useContext(AuthContext)
    const [isDrawerOpen, setIsDrawerOpen] = useState(false)
    const openDrawer = useCallback(
        () =>
            dispatch({type: "OPEN_DRAWER", drawerComponent: "PRODUCT_FORM"}),
        [dispatch]
    )

    return (
        <TopbarWrapper ref={refs}>
            <Logo>
                <Link to="/">
                    <LogoImage src={Logoimage} alt="ounjey-admin" width={300} height={56} />
                </Link>
            </Logo>

            <DrawerWrapper>
                <DrawerIcon onClick={() => setIsDrawerOpen(true)}>
                    <MenuIcon />
                </DrawerIcon>
                <Drawer
                    isOpen={isDrawerOpen}
                    anchor={ANCHOR.left}
                    onClose={() => setIsDrawerOpen(false)}
                    overrides={{
                        Root: {
                            style: {
                                zIndex: "1",
                            },
                        },
                        DrawerBody: {
                            style: {
                                marginRight: "0",
                                marginLeft: "0",
                                "@media only screen and (max-width: 767px)": {
                                    marginLeft: "30px",
                                },
                            },
                        },
                        DrawerContainer: {
                            style: {
                                width: "270px",
                                "@media only screen and (max-width: 767px)": {
                                    width: "80%",
                                },
                            },
                        },
                        Close: {
                            component: () => (
                                <CloseButton
                                    onClick={() => setIsDrawerOpen(false)}
                                >
                                    <ArrowLeftRound />
                                </CloseButton>
                            ),
                        },
                    }}
                >
                    <Sidebar onMenuItemClick={() => setIsDrawerOpen(false)} />
                </Drawer>
            </DrawerWrapper>

            <TopbarRightSide>
                <Button onClick={openDrawer}>Add MenuItem</Button>
                {
                    <h1 style={{marginLeft: 30}}>
                        {
                            //@ts-ignore
                        }
                    </h1>
                }
                <Popover
                    content={({close}) => (
                        <Notification data={data} onClear={close} />
                    )}
                    accessibilityType={"tooltip"}
                    placement={PLACEMENT.bottomRight}
                    overrides={{
                        Body: {
                            style: {
                                width: "330px",
                                zIndex: 2,
                            },
                        },
                        Inner: {
                            style: {
                                backgroundColor: "#ffffff",
                            },
                        },
                    }}
                >
                    <NotificationIconWrapper>
                        <NotificationIcon />
                        <AlertDot>
                            <AlertDotIcon />
                        </AlertDot>
                    </NotificationIconWrapper>
                </Popover>

                <Popover
                    content={({close}) => (
                        <UserDropdowItem>
                            <NavLink
                                to={SITE_SETTINGS}
                                exact={false}
                                onClick={close}
                            >
                                Account
                            </NavLink>
                            <LogoutBtn
                                onClick={() => {
                                    signout()
                                    close()
                                }}
                            >
                                Logout
                            </LogoutBtn>
                        </UserDropdowItem>
                    )}
                    accessibilityType={"tooltip"}
                    placement={PLACEMENT.bottomRight}
                    overrides={{
                        Body: {
                            style: () => ({
                                width: "220px",
                                zIndex: 2,
                            }),
                        },
                        Inner: {
                            style: {
                                backgroundColor: "#ffffff",
                            },
                        },
                    }}
                >
                    <ProfileImg>
                        {
                            userData.coverImage ? <Image src={userData.coverImage} alt="user" />
                                : <div style={{
                                    width: 50,
                                    height: 40,
                                    paddingTop: 9,
                                    color: "white",
                                    borderRadius: "50%",
                                    fontWeight: 900,
                                    textAlign: "center",
                                    backgroundColor: "#FC3838"
                                }}>

                                    Ou.
                           </div>
                        }
                    </ProfileImg>
                </Popover>
            </TopbarRightSide>
        </TopbarWrapper>
    )
}

export default Topbar
