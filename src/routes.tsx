import React, {lazy, Suspense, useContext} from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {InLineLoader} from "./components/InlineLoader/InlineLoader"
import AuthProvider, {AuthContext} from "./context/auth"
import {
    CATEGORY,

    LOGIN,
    ORDERS,
    PRODUCTS,
    SETTINGS,
    SIGNUP,
    SITE_SETTINGS,
    SUBACCOUNT
} from "./settings/constants"
const Products = lazy(() => import("./containers/Products/Products"))
const AdminLayout = lazy(() => import("./containers/Layout/Layout"))
const Dashboard = lazy(() => import("./containers/Dashboard/Dashboard"))
const Category = lazy(() => import("./containers/Category/Category"))
const Orders = lazy(() => import("./containers/Orders/Orders"))
const SubAccount = lazy(() => import("./containers/Subaccount/SubAccount"))
const Settings = lazy(() => import("./containers/Settings/Settings"))
const SiteSettingForm = lazy(
    () => import("./containers/SiteSettingForm/SiteSettingForm")
)

const Login = lazy(() => import("./containers/Login/Login"))

const SignUp = lazy(() => import("./containers/Signup/SignUp"))
const NotFound = lazy(() => import("./containers/NotFound/NotFound"))

/**
 *
 *  A wrapper for <Route> that redirects to the login
 * screen if you're not yet authenticated.
 *
 */

function PrivateRoute({children, ...rest}) {
    const {isAuthenticated} = useContext(AuthContext)

    return (
        <Route
            {...rest}
            render={({location}) =>
                isAuthenticated ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: {from: location},
                            }}
                        />
                    )
            }
        />
    )
}

const Routes = () => {
    return (
        <AuthProvider>
            <Suspense fallback={<InLineLoader />}>
                <Switch>
                    {/* <PrivateRoute exact={true} path={DASHBOARD}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <Dashboard />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute> */}
                    <PrivateRoute exact={true} path={PRODUCTS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <Products />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={CATEGORY} exact>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <Category />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={SUBACCOUNT} exact>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <SubAccount />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <PrivateRoute path={ORDERS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <Orders />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>

                    <PrivateRoute path={SETTINGS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <Settings />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>

                    <PrivateRoute path={SITE_SETTINGS}>
                        <AdminLayout>
                            <Suspense fallback={<InLineLoader />}>
                                <SiteSettingForm />
                            </Suspense>
                        </AdminLayout>
                    </PrivateRoute>
                    <Route path={LOGIN}>
                        <Login />
                    </Route>
                    <Route path={SIGNUP}>
                        <SignUp />
                    </Route>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </AuthProvider>
    )
}

export default Routes
