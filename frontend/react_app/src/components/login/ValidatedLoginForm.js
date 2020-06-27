import React from 'react'
import {Formik} from 'formik'
import {loginSchema} from '../validation/yupSchema'
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



function InvalidInput(props) {
    if(!(props.errors && props.changed)) {
        return null;
    }
    return (
        <div className="input-feedback">{props.errors[0]}</div>
    );
}


class ValidatedLoginForm extends React.Component {

    constructor(prop) {
        super(prop);
        this.state = {
            error: {email: null, password: null},
            test: "TEST"
        }
    }
    render() {
        const that = this;
        return (
        <Formik
            initialValues={{email: "", password: ""}}
            onSubmit={(values, {setSubmitting}) => {
                setTimeout(() => {
                    setSubmitting(true)
                    loginSchema.validate(values).then((valid) => {
                        Axios.post('/login', {
                            email: values.email,
                            password: values.password
                        }).then(() => this.props.setLoggedIn())
                            .catch((err) => console.log("Err"))
                        console.log("Logging in");
                    }).catch((err) => {
                        this.setState({error: err.errors})
                        console.log(err)
                    })
                    setSubmitting(false)
                }, 500)
            }}
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

                        <label htmlFor="email">Password</label>
                        <input name="password" type="password" placeholder="Enter your password"
                               value={values.password} onChange={handleChange} onBlur={handleBlur}
                               className={errors.password && touched.password && "error"}
                        />
                        <button style={buttonStyle} type="submit" disabled={isSubmitting}>Login</button>
                        <InvalidInput errors={that.state.error} changed={touched.email || touched.password}/>
                    </form>
                )
            }}
        </Formik>
        )
    }

}

export default ValidatedLoginForm