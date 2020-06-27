import * as Yup from "yup";

const email = Yup.string().email().required("An Email Is Required");
const fullname = Yup.string().required("A Full Name is Required");
const username = Yup.string().required("A Username Is Required")
    .min(3, "Minimum username must be 3 characters");
const password = Yup.string()
    .required("No password provided.")
    .min(8, "Password is too short - should be 8 characters minimum")
    .matches(/^(?=.*?[\p{Lu}])(?=.*?[\p{Ll}])(?=.*?\d).*$/u,
        "Password must have atleast one upper case letter, one lower case letter, and a digit");
const passwordConfirmation = Yup.string()
    .required("You need to confirm your password")
    .oneOf([Yup.ref('password'), null], "Passwords don't match.");

export const loginSchema= Yup.object().shape({
    email: email,
    password: password
})

export const registrationSchema = Yup.object().shape({
    email: email,
    fullname: fullname,
    username: username,
    password: password,
    passwordConfirmation: passwordConfirmation
})
