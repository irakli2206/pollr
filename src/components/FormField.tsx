import React, { useEffect } from 'react'
import { FieldAttributes, FormikProps } from 'formik';
import { Input } from './Elements';

const FormField = (props: any) => {
    // console.log(props)
    return (
        <Input {...props} />

    )
}

export default FormField