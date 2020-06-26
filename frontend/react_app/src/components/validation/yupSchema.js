import * as Yup from "yup";

const email = Yup.string().email().required("An Email Is Required");
const password = Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 characters minimum")
    .matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
        "Password must have atleast one upper case letter, one lower case letter, and a digit");
const loginSchema= Yup.object().shape({
    email: email,
    password: password
})

const registrationSchema = Yup.object().shape({
    email: email,
    password: password,
})

export default loginSchema