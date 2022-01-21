import * as yup from "yup";

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "У вашому паролі повинно бути не менше 8 символів")
    .required("Це обовязкове поле"),
  confirmPassword: yup
    .string()
    .min(8, "У вашому паролі повинно бути не менше 8 символів")
    .required("Це обовязкове поле")
    .test("password-match", "Введені паролі повинні збігатися", function(
      value
    ) {
      return this.parent.password === value;
    })
});

export default validationSchema;
