import * as yup from "yup";

const validationSchema = yup.object().shape({
  full_name: yup
    .string("У Вашому імені повинні бути тільки літери")
    .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z'/\\s]+$", "Має містити тільки літери")
    .min(12, "У вашому імені повинно бути не менше 12 літер")
    .required("Це обовязкове поле"),
  email: yup
    .string()
    .required("Це обовязкове поле")
    .email("Укажiть Вашу електронну пошту")
    .label("Укажiть Вашу електронну пошту"),

  companyName: yup
    .string()
    .required("Це обовязкове поле")
    .min(1, "У назві Вашої компанії має бути не менше 1 літери")
  });

export default validationSchema;
