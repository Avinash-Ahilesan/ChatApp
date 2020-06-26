import React from 'react'
import {Formik} from 'formik'
import * as Yup from 'yup'


const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#92140C',
    color: '#FFF8F0',
    border: '1px solid #B98EA7',
    transition: 'ease-in-out background-color 250ms, ease-in-out color 250ms',
    hover: {
        cursor: 'pointer',
        backgroundColor: '#FFF8F0',
        color: 'rgb(70, 153, 179)'
    }
}

function InvalidInput(props) {
    console.log(props.errors)
    console.log(props.changed)
    if(!(props.errors && props.changed)) {
        return null;
    }
    return (
        <div className="input-feedback">{props.errors}</div>
    );
}

const ValidatedRegisterForm = () => (
    <Formik
        initialValues={{email: "", password: ""}}
        onSubmit={(values, {setSubmitting}) => {
            setTimeout(() => {
                console.log("Logging in", values);
                setSubmitting(false);
            }, 500)
        }}
        validationSchema={Yup.object().shape({
            email: Yup.string().email().required("An Email Is Required"),
            password: Yup.string()
                .required("No password provided.")
                .min(8, "Password is too short - should be 8 characters minimum")
                .matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
                    "Password must have atleast one upper case letter, one lower case letter, and a digit")
        })}
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props;
            return (

                <form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email</label>
                    <input name="email" type="text" placeholder="Enter your email"
                           value={values.email} onChange={handleChange} onBlur={handleBlur}
                           className={errors.email && touched.email && "error"}/>


                    <InvalidInput errors={errors.email} changed={touched.email} />


                    <label htmlFor="email">Password</label>
                    <input name="password" type="password" placeholder="Enter your password"
                           value={values.password} onChange={handleChange} onBlur={handleBlur}
                           className={errors.password && touched.password && "error"}
                    />
                    <InvalidInput errors={errors.password} changed={touched.password} />

                    <button style={buttonStyle} type="submit" disabled={isSubmitting}>Login</button>
                </form>
            )
        }}
    </Formik>

)



export default ValidatedRegisterForm