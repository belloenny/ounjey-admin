import {toaster, ToasterContainer} from "baseui/toast"
import {Field, Form, Formik} from "formik"
import React, {useContext} from "react"
import {Redirect, useHistory, useLocation} from "react-router-dom"
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
import {FormWrapper, LogoImage, LogoWrapper, Wrapper} from "./SignUp.style"

const initialValues = {
    business_email: "",
    password: "",
    first_name: "",
    last_name: "",
    business_phone: "",
    tag_line: "",
    business_name: "",
}

const getLoginValidationSchema = () => {
    return Yup.object().shape({
        business_email: Yup.string().required("Username is Required!"),
        first_name: Yup.string().required("FirstName is Required!"),
        business_phone: Yup.string().required("Bussiness phone is required"),
        password: Yup.string().required("Password is Required!"),
    })
}

const MyInput = ({field, form, ...props}) => {
    return <Input {...field} {...props} />
}

export default () => {
    let history = useHistory()
    let location = useLocation()
    const {signup, isAuthenticated, errorMessage} = useContext(AuthContext)
    if (isAuthenticated) return <Redirect to={{pathname: "/"}} />

    let {from} = (location.state as any) || {from: {pathname: "/"}}
    let register = (data, {setSubmitting}) => {
        const {
            business_email,
            password,
            first_name,
            last_name,
            business_phone,
            tag_line,
            business_name,
        } = data
        signup(
            {
                businessEmail: business_email,
                password,
                firstName: first_name,
                lastName: last_name,
                businessPhone: business_phone,
                tagLine: tag_line,
                businessName: business_name,

            },
            () => {
                toaster.positive(<>Check Your Inbox with email ${business_email} To Verify Your Email </>, {
                    overrides: {
                        InnerContainer: {
                            style: {width: "100%"},
                        },
                    },
                })
            }
        )
        setTimeout(() => setSubmitting(false), 400)
    }

    if (Boolean(errorMessage)) {
        alert(errorMessage)
    }
    return (
        <Wrapper>
            <FormWrapper>
                <Formik
                    initialValues={initialValues}
                    onSubmit={register}
                    render={({errors, status, touched, isSubmitting}) => (
                        <Form>
                            <FormFields>
                                <LogoWrapper>
                                    <LogoImage
                                        src={Logoimage}
                                        alt="ounjey-admin"
                                    />
                                </LogoWrapper>
                                <FormTitle>
                                    Register As a Caterer On Ounjey
                                </FormTitle>
                            </FormFields>
                            <FormFields>
                                <FormLabel>First Name</FormLabel>
                                <Field
                                    type="text"
                                    name="first_name"
                                    component={MyInput}
                                    placeholder="Ex: john"
                                />
                                {errors.first_name && touched.first_name && (
                                    <Error>{errors.first_name}</Error>
                                )}
                            </FormFields>
                            <FormFields>
                                <FormLabel>Last Name</FormLabel>
                                <Field
                                    type="text"
                                    name="last_name"
                                    component={MyInput}
                                    placeholder="Ex: doe"
                                />
                            </FormFields>
                            <FormFields>
                                <FormLabel> Business Name</FormLabel>
                                <Field
                                    type="text"
                                    name="business_name"
                                    component={MyInput}
                                    placeholder="Ex: Name of Your Company"
                                />
                                {errors.business_name &&
                                    touched.business_name && (
                                        <Error>{errors.business_name}</Error>
                                    )}
                            </FormFields>
                            <FormFields>
                                <FormLabel>Company Tagline</FormLabel>
                                <Field
                                    type="text"
                                    name="tag_line"
                                    component={MyInput}
                                    placeholder="Short word that describes your company"
                                />
                            </FormFields>
                            <FormFields>
                                <FormLabel>Email</FormLabel>
                                <Field
                                    type="email"
                                    name="business_email"
                                    component={MyInput}
                                    placeholder="Ex: caterer@ounjey.com"
                                />
                                {errors.business_email &&
                                    touched.business_email && (
                                        <Error>{errors.business_email}</Error>
                                    )}
                            </FormFields>
                            <FormFields>
                                <FormLabel>Password</FormLabel>
                                <Field
                                    type="password"
                                    name="password"
                                    component={MyInput}
                                />
                                {errors.password && touched.password && (
                                    <Error>{errors.password}</Error>
                                )}
                            </FormFields>
                            <FormFields>
                                <FormLabel> Business Phone</FormLabel>
                                <Field
                                    type="text"
                                    name="business_phone"
                                    component={MyInput}
                                    placeholder="Phone contact of your company"
                                />
                                {errors.business_phone &&
                                    touched.business_phone && (
                                        <Error>{errors.business_phone}</Error>
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
                                Signup
                            </Button>
                        </Form>
                    )}
                    validationSchema={getLoginValidationSchema}
                />
            </FormWrapper>
            <ToasterContainer />
        </Wrapper>
    )
}
