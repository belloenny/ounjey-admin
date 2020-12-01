import React from "react"
import { Redirect } from "react-router-dom"
import {
    CatererQuery,
    useCatererQuery,
    useLoginMutation,
    useSignUpCatererMutation,
} from "../graphql/types"

type AuthProps = {
    isAuthenticated: boolean
    errorMessage: string
    userData: CatererQuery
    login: Function
    signup: Function
    signout: Function
}

export const AuthContext = React.createContext({} as AuthProps)

const AuthProvider = (props: any) => {
    const [response] = useCatererQuery()
    const [, loginUser] = useLoginMutation()
    const [errorMessage, setErrorMessage] = React.useState("")
    const [userData, setUserData] = React.useState<CatererQuery | null>(null)
    const [, signUpCaterer] = useSignUpCatererMutation()
    const { data, fetching, error } = response
    const [isAuthenticated, makeAuthenticated] = React.useState(false)

    React.useEffect(() => {
        if (!data || error) {
            makeAuthenticated(false)
        } else {
            makeAuthenticated(true)
            setUserData(data)
        }
        if (Boolean(errorMessage)) {
            setErrorMessage("")
        }
    }, [fetching, data, error, errorMessage])

    const login = React.useCallback(
        async ({ email, password }, cb) => {
            const res = await loginUser({ email, password })
            if (!res.data.login || res.error) {
                makeAuthenticated(false)
                setErrorMessage(res.error.message)
            } else {
                localStorage.setItem("auth_token", res.data.login.token)
                makeAuthenticated(true)
                setUserData(data)
                setTimeout(cb, 1000) // fake async
            }
        },
        [data, loginUser]
    )

    const signup = React.useCallback(
        async (
            {
                business_email,
                password,
                first_name,
                last_name,
                business_phone,
                tag_line,
                business_name,
            },
            cb
        ) => {
            const res = await signUpCaterer({
                business_email,
                password,
                first_name,
                last_name,
                business_phone,
                tag_line,
                business_name,
            })
            if (!res.data.signupCaterer || res.error) {
                makeAuthenticated(false)
                setErrorMessage(res.error.message)
            } else {
                localStorage.setItem("auth_token", res.data.signupCaterer.token)
                makeAuthenticated(true)
                setUserData(data)
                setTimeout(cb, 1000) // fake async
            }
        },
        [data, signUpCaterer]
    )

    function signout(cb) {
        makeAuthenticated(false)
        localStorage.removeItem("auth_token")
        return <Redirect to={{ pathname: "/login" }} />
    }
    return (
        <AuthContext.Provider
            value={{
                isAuthenticated,
                errorMessage,
                login,
                signup,
                signout,
                userData,
            }}
        >
            <>{props.children}</>
        </AuthContext.Provider>
    )
}

export default AuthProvider
