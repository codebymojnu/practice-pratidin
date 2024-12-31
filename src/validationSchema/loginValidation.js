import * as Yup from "yup";

export const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
        .email("সঠিক ইমেইল ফরম্যাট দিন")
        .required("ইমেইল দেওয়া আবশ্যক"),
    password: Yup.string()
        .min(8, "পাসওয়ার্ড অন্তত ৮ অক্ষরের হতে হবে")
        .required("পাসওয়ার্ড আবশ্যক"),
});