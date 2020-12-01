import { styled } from "baseui"
import React from "react"
import { DrawerProvider } from "../../context/DrawerContext"
import { MenuProvider } from "../../context/MenuContext"
import useComponentSize from "../../settings/useComponentSize"
import { useDeviceType } from "../../settings/useDeviceType"
import DrawerItems from "../DrawerItems/DrawerItems"
import {
    ContentInnerWrapper,
    ContentWrapper,
    LayoutWrapper,
} from "./Layout.style"
import Sidebar from "./Sidebar/Sidebar"
import Topbar from "./Topbar/Topbar"

const SidedbarDesktop = styled("div", () => ({
    "@media only screen and (max-width: 1199px)": {
        display: "none",
    },
}))

const AdminLayout = ({ children }: any) => {
    let [topbarRef, { height }] = useComponentSize()
    let [sidebarRef, { width }] = useComponentSize()
    const { desktop } = useDeviceType()

    return (
        <DrawerProvider>
            <MenuProvider>
                <Topbar refs={topbarRef} />
                <LayoutWrapper
                    style={{
                        height: `calc(100vh - ${height}px)`,
                    }}
                >
                    {desktop ? (
                        <>
                            <SidedbarDesktop>
                                <Sidebar
                                    refs={sidebarRef}
                                    style={{
                                        height: `calc(100vh - ${height}px)`,
                                    }}
                                />
                            </SidedbarDesktop>
                            <ContentWrapper
                                style={{
                                    width: `calc(100% - ${width}px)`,
                                }}
                            >
                                <ContentInnerWrapper>
                                    {children}
                                </ContentInnerWrapper>
                            </ContentWrapper>
                        </>
                    ) : (
                        <ContentWrapper
                            style={{
                                width: "100%",
                            }}
                        >
                            <h3>
                                width: {width} , height: {height}
                            </h3>
                            <ContentInnerWrapper>
                                {children}
                            </ContentInnerWrapper>
                        </ContentWrapper>
                    )}
                </LayoutWrapper>
                <DrawerItems />
            </MenuProvider>
        </DrawerProvider>
    )
}

export default AdminLayout
