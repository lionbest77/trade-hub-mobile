import * as yup from "yup";

const validationSchema = yup.object().shape({
  // code: yup.string().required("Це обовязкове поле"),
  email: yup
    .string()
    .required("Це обовязкове поле")
    .email("Вкажіть Ваш email")
});

export default validationSchema;
