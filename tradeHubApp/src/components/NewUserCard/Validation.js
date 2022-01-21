import * as yup from "yup";

const validationSchema = yup.object().shape({
  employeeNames: yup
    .string()
    .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z'/\\s]+$", "Має містити тільки літери")
    .min(2, "У імені повинно бути не менше 2 літер")
    .required("Це обовязкове поле"),
  employeeEmail: yup
    .string()
    .email("Укажiть email Вашого співробітника")
    .label("Укажiть email Вашого співробітника")
    .required("Це обовязкове поле"),
  employeeRole: yup
    .string()
    .label("Вкажіть роль Вашого співробітника")
    .required("Це обовязкове поле")
});

export default validationSchema;
