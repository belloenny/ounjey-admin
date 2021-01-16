import axios from 'axios'
import React from "react"
import {Redirect} from "react-router-dom"
import {
    CatererProfile,

    useCatererQuery
} from "../graphql/types"
type AuthProps = {
    isAuthenticated: boolean
    errorMessage: string
    userData: CatererProfile
    login: Function
    signup: Function
    signout: Function
}

export const AuthContext = React.createContext({} as AuthProps)

const AuthProvider = (props: any) => {
    const [response] = useCatererQuery()
    const [errorMessage, setErrorMessage] = React.useState("")
    const [userData, setUserData] = React.useState<CatererProfile | null>(null)
    const {data, fetching, error} = response
    const [isAuthenticated, makeAuthenticated] = React.useState(false)

    React.useEffect(() => {
        if (!data || error) {
            makeAuthenticated(false)
        } else {
            makeAuthenticated(true)
            //@ts-ignore
            setUserData(data.caterer)
        }
        if (Boolean(errorMessage)) {
            setErrorMessage("")
        }
    }, [fetching, data, error, errorMessage])

    const login = React.useCallback(
        async ({email, password}, cb) => {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/login`, {email, password})
            if (!data) {
                makeAuthenticated(false)
                setErrorMessage("SomeThing Went Wrong")
            } else {
                localStorage.setItem("auth_token", data.data.token)
                makeAuthenticated(true)
                setUserData(data.data.catererProfile)
                setTimeout(cb, 1000) // fake async
            }
        },
        [data]
    )

    const signup = React.useCallback(
        async (
            {
                businessEmail,
                password,
                firstName,
                lastName,
                businessPhone,
                tagLine,
                businessName,
            },
            cb
        ) => {
            const {data} = await axios.post(`${process.env.REACT_APP_API_URL}/registercaterer`, {
                businessEmail,
                password,
                firstName,
                lastName,
                businessPhone,
                tagLine,
                businessName,
                cuisines: ["test", "chinese"]
            })
            if (!data) {
                makeAuthenticated(false)
                setErrorMessage("Something Went Wrong")
            } else {
                setTimeout(cb, 1000) // fake async
            }
        },
        [data]
    )

    function signout(cb) {
        makeAuthenticated(false)
        localStorage.removeItem("auth_token")
        return <Redirect to={{pathname: "/login"}} />
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
