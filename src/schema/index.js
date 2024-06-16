import * as Yup from "yup";
// Validation
export const loginSchema = Yup.object({
     password:Yup.string().required("Please enter password"),
    email:Yup.string().email().required("Please enter email")
});

export const singUpSchema = Yup.object({
    password:Yup.string().required("Please enter password"),
    email:Yup.string().email().required("Please enter  Email"),
    fullName:Yup.string().required("Please enter name")
});

export const fileUploadSchema = Yup.object({
    fileName:Yup.string().min(2).max(25).required("Please enter your FirstName"),
    fileDescription:Yup.string().min(2).max(25).required("Please enter description"),
    file:Yup.mixed().required("Please select file"),
});