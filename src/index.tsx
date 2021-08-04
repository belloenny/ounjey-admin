import {devtoolsExchange} from "@urql/devtools"
import {BaseProvider} from "baseui"
import React from "react"
import ReactDOM from "react-dom"
import {BrowserRouter} from "react-router-dom"
import {Client as Styletron} from "styletron-engine-atomic"
import {Provider as StyletronProvider} from "styletron-react"
import {createClient, defaultExchanges, Provider} from "urql"
import Routes from "./routes"
import * as serviceWorker from "./serviceWorker"
import {theme} from "./theme"
import "./theme/global.css"

const client = createClient({
    url: process.env.REACT_APP_API_URL_GRAPHQL,
    exchanges: [devtoolsExchange, ...defaultExchanges],
    requestPolicy: "network-only",
    fetchOptions: () => {
        const token = localStorage.getItem("auth_token")
        return {
            headers: {
                authorization: token ? `Bearer ${token}` : ""
            },

        }
    },

})

function App() {
    const engine = new Styletron()
    return (
        <Provider value={client}>
            <StyletronProvider value={engine}>
                <BaseProvider theme={theme}>
                    <BrowserRouter>
                        <Routes />
                    </BrowserRouter>
                </BaseProvider>
            </StyletronProvider>
        </Provider>
    )
}

ReactDOM.render(<App />, document.getElementById("root"))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register()
