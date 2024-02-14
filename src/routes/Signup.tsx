import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../client';
import { Account, ID } from 'appwrite';
import { Formik, Field, Form } from 'formik';
import FormField from '../components/FormField';
import Appwrite from '../services/Appwrite';
import { OverlaySpinner } from '../components/Elements';

const Signup = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const createAccount = async (email: string, password: string) => {
        try {
            setLoading(true)
            const appwrite = new Appwrite()
            await appwrite.createUser({ email, password, name: "placeholderName" })
            .then(() => navigate("/dashboard"))
            
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    // useEffect(() => {
    //     createAccount()
    // }, [])

    return (
        <>
            {/* <OverlaySpinner /> */}
            <div className="flex  flex-1 flex-col justify-center px-6 pb-48 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">

                    <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Create an account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <Formik
                        initialValues={{
                            email: "",
                            password: ""
                        }}
                        onSubmit={async ({ email, password }, { setSubmitting }) => {
                            // console.log(email, password)
                            await createAccount(email, password)
                        }}
                    >
                        <Form className='space-y-6'>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>

                                <div className="mt-2">
                                    <Field
                                        as={FormField}
                                        name='email'
                                        type='email'
                                        autoComplete="email"
                                        id="email"
                                    />

                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                        Password
                                    </label>
                                    <div className="text-sm">
                                        <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                            Forgot password?
                                        </a>
                                    </div>
                                </div>
                                <div className="mt-2">

                                    <Field
                                        as={FormField}
                                        name='password'
                                        type='password'
                                        autoComplete="password"
                                        id="password"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Create Account
                                </button>
                            </div>
                        </Form>
                    </Formik>
                    <p className="mt-10 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                            Log in
                        </Link>
                    </p>
                </div>
            </div>
        </>
    )
}

export default Signup