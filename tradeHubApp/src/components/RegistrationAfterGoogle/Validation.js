import * as yup from "yup";

const validationSchema = yup.object().shape({
  full_name: yup
    .string("У Вашому імені повинні бути тільки літери")
    .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z'/\\s]+$", "Має містити тільки літери")
    .min(12, "У вашому імені повинно бути не менше 12 літер")
    .required("Це обовязкове поле"),

  companyName: yup
    .string()
    .required("Це обовязкове поле")
    .max(30, "У назві Вашої компанії має бути не більше 30 літер")
    .min(2, "У назві Вашої компанії має бути не менше 2 літер")
});

export default validationSchema;
