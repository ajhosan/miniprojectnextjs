import { useFormik } from "formik"
import * as Yup from 'yup';
import { signIn } from 'next-auth/react';
import { useRouter } from "next/router";
import * as React from 'react';
import { Container, Card, CardContent, Button, Input, Controller } from '@mui/material';



export default function LoginForm() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },

        validationSchema: Yup.object({
            email: Yup.string()
                .max(30, 'Must be 30 characters or less')
                .email('Invalid email address')
                .required('Please enter your email'),
            password: Yup.string()
                .required('Please enter your password')
        }),
        onSubmit: async (values) => {
            console.log({ values })
            const credentials = await signIn(
                'credentials',
                {
                    email: values?.email,
                    password: values?.password,
                    redirect: false
                }
            )

            if (credentials.ok) {
                router.push(
                    '/csr'
                )
            }

            console.log(credentials.ok, "CREDENTIALLSDAS")
        }
    })

    const gridFormStyle = {
        padding: "50px",
        // marginTop: "200px"
    };

    const textFieldStyle = {
        marginBottom: "20px",
        border: 1,
        px: 1,
        borderRadius: 1,
        width: "100%"
    };

    return (
        <Container maxWidth="lg" >
            <Container maxWidth="sm" >
                <Card sx={{ minWidth: 200, marginTop: 20 }} >
                    <form onSubmit={formik.handleSubmit}>
                        <CardContent style={gridFormStyle}>
                            <h2 style={{ textAlign: 'center' }}>Login Form</h2>
                            <br />
                            <label>Email</label>

                            <Input type='email' placeholder='Input email' name={'email'} style={textFieldStyle} onChange={formik.handleChange} />
                            {
                                formik.errors &&
                                formik.touched &&
                                formik.errors?.email &&
                                formik.touched.email &&
                                (
                                    <><span style={{ color: 'red' }}>{formik.errors?.email}</span> <br /><br /></>
                                )
                            }

                            <label>Password</label>
                            <Input type="password" name={'password'} placeholder={'input your password'} style={textFieldStyle} onChange={formik.handleChange} />
                            <Button type="submit" variant="contained" sx={{ width: "100%", my: 2 }}>Submit</Button>
                        </CardContent>
                    </form>
                </Card>
            </Container>
        </Container >
    );
}