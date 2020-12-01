import {toaster, ToasterContainer} from "baseui/toast"
import {Field, Form, Formik} from "formik"
import React, {useContext} from "react"
import {Link, Redirect, useHistory, useLocation} from "react-router-dom"
import * as Yup from "yup"
import Button from "../../components/Button/Button"
import {
    Error,
    FormFields,
    FormLabel,
    FormTitle
} from "../../components/FormFields/FormFields"
import Input from "../../components/Input/Input"
import {AuthContext} from "../../context/auth"
import Logoimage from "../../image/logo.svg"
import {FormWrapper, LogoImage, LogoWrapper, Wrapper} from "./Login.style"

const initialValues = {
    username: "",
    password: "",
}

const getLoginValidationSchema = () => {
    return Yup.object().shape({
        username: Yup.string().required("Username is Required!"),
        password: Yup.string().required("Password is Required!"),
    })
}

const MyInput = ({field, form, ...props}) => {
    return <Input {...field} {...props} />
}

export default () => {
    let history = useHistory()
    let location = useLocation()
    const {login, isAuthenticated, errorMessage} = useContext(AuthContext)
    if (isAuthenticated) return <Redirect to={{pathname: "/"}} />

    let {from} = (location.state as any) || {from: {pathname: "/"}}
    let signin = ({username, password}, {setSubmitting}) => {
        login({email: username, password}, () => {
            history.replace(from)
        })
        setTimeout(() => setSubmitting(false), 400)
    }

    if (Boolean(errorMessage)) {
        const result = errorMessage.substr(errorMessage.indexOf(" ") + 0)
        const resultor = result.substr(result.indexOf(" ") + 1)
        toaster.negative(<>{resultor}</>, {
            overrides: {
                InnerContainer: {
                    style: {width: "100%"},
                },
            },
        })
    }
    return (
        <Wrapper>
            <FormWrapper>
                <Formik
                    initialValues={initialValues}
                    onSubmit={signin}
                    render={({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <FormFields>
                                <LogoWrapper>
                                    <LogoImage
                                        src={Logoimage}
                                        alt="ounjey-admin"
                                    />
                                </LogoWrapper>
                                <FormTitle>Log in to admin</FormTitle>
                            </FormFields>

                            <FormFields>
                                <FormLabel>Email</FormLabel>
                                <Field
                                    type="email"
                                    name="username"
                                    component={MyInput}
                                    placeholder="Ex: demo@demo.com"
                                />
                                {errors.username && touched.username && (
                                    <Error>{errors.username}</Error>
                                )}
                            </FormFields>
                            <FormFields>
                                <FormLabel>Password</FormLabel>
                                <Field
                                    type="password"
                                    name="password"
                                    component={MyInput}
                                    placeholder="Ex: demo"
                                />
                                {errors.password && touched.password && (
                                    <Error>{errors.password}</Error>
                                )}
                            </FormFields>
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                overrides={{
                                    BaseButton: {
                                        style: ({$theme}) => ({
                                            width: "100%",
                                            marginLeft: "auto",
                                            borderTopLeftRadius: "3px",
                                            borderTopRightRadius: "3px",
                                            borderBottomLeftRadius: "3px",
                                            borderBottomRightRadius: "3px",
                                        }),
                                    },
                                }}
                            >
                                Log In
                            </Button>
                            <FormFields>
                                <p>
                                    don't have an account,{" "}
                                    <Link to="/signup">Signup</Link> instead
                                </p>
                            </FormFields>
                        </Form>
                    )}
                    validationSchema={getLoginValidationSchema}
                />
            </FormWrapper>
            <ToasterContainer />
        </Wrapper>
    )
}
