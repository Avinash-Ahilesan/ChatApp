import React from 'react'
import {Formik} from 'formik'
import {registrationSchema as values, registrationSchema} from '../validation/yupSchema'
import Axios from 'axios'

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

const inputFeedback = {
    color: 'rgb(235, 54, 54)',
    marginTop: '-20px',
    fontSize: '14px',
    marginBottom: '20px',
}
function InvalidInput(props) {
    if(!(props.errors && props.changed)) {
        return null;
    }
    return (
        <div className="input-feedback" style={inputFeedback}>{props.errors}</div>
    );
}

class ValidatedRegisterForm extends React.Component {


    render() {
        return (
            <Formik
                initialValues={{email: "", fullname: "", username: "", password: "", passwordConfirmation: ""}}
                onSubmit={(values, {setSubmitting}) => {
                    setTimeout(() => {
                        Axios.post('/register', {
                            email: values.email,
                            fullname: values.fullname,
                            username: values.username,
                            password: values.password,
                            passwordConfirmation: values.passwordConfirmation
                        }).then((response) => this.props.setLoggedIn(response))
                            .catch((err) => console.log(err))
                        setSubmitting(false);
                    }, 500)
                }}
                validationSchema={registrationSchema}
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

                            <InvalidInput errors={errors.email} changed={touched.email}/>


                            <label htmlFor="email">Full Name</label>
                            <input name="fullname" type="text" placeholder="Enter your full name"
                                   value={values.fullname} onChange={handleChange} onBlur={handleBlur}
                                   className={errors.fullname && touched.fullname && "error"}/>

                            <InvalidInput errors={errors.fullname} changed={touched.fullname}/>

                            <label htmlFor="email">User name</label>
                            <input name="username" type="text" placeholder="Enter your full name"
                                   value={values.username} onChange={handleChange} onBlur={handleBlur}
                                   className={errors.username && touched.username && "error"}/>

                            <InvalidInput errors={errors.username} changed={touched.username}/>


                            <label htmlFor="email">Password</label>
                            <input name="password" type="password" placeholder="Enter your password"
                                   value={values.password} onChange={handleChange} onBlur={handleBlur}
                                   className={errors.password && touched.password && "error"}
                            />
                            <InvalidInput errors={errors.password} changed={touched.password}/>

                            <label htmlFor="email">Confirm your password</label>
                            <input name="passwordConfirmation" type="password" placeholder="Enter your password"
                                   value={values.passwordConfirmation} onChange={handleChange} onBlur={handleBlur}
                                   className={errors.passwordConfirmation && touched.passwordConfirmation && "error"}
                            />
                            <InvalidInput errors={errors.passwordConfirmation} changed={touched.passwordConfirmation}/>


                            <button style={buttonStyle} type="submit" disabled={isSubmitting}>Register</button>
                        </form>
                    )
                }}
            </Formik>

        )
    }


}

export default ValidatedRegisterForm