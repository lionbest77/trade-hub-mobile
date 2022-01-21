import * as yup from "yup";

const validationSchema = yup.object().shape({
  full_name: yup
  .string("У Вашому імені повинні бути тільки літери")
  .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z'/\\s]+$", "Має містити тільки літери")
  .min(12, "У вашому імені повинно бути не менше 12 літер")
  .required("Це обовязкове поле")
  .ensure(),

  name: yup
  .string("У Вашому імені повинні бути тільки літери")
  .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z']+$", "Має містити тільки літери")
  .min(2, "У вашому імені повинно бути не менше 2 літер")
  .required("Це обовязкове поле")
  .ensure(),

  bank_name:yup
  .string("У Вашому імені повинні бути тільки літери")
  .min(2, "У вашому імені повинно бути не менше 2 літер")
  .required("Це обовязкове поле")
  .ensure(),

  lastName: yup
  .string("У Вашому прізвищі повинні бути тільки літери")
  .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z']+$", "Має містити тільки літери")
  .min(2, "У вашому прізвищі повинно бути не менше 2 літер")
  .required("Це обовязкове поле")
  .ensure(),

  surname: yup
  .string("У Вашому по батькові повинні бути тільки літери")
  .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z']+$", "Має містити тільки літери")
  .min(2, "У вашому імені повинно бути не менше 2 літер")
  .required("Це обовязкове поле")
  .ensure(),

  email: yup
  .string()
  .email("Укажiть Вашу електронну пошту")
  .label("Укажiть Вашу електронну пошту")
  .ensure(),

  companyEmail: yup
  .string()
  .email("Укажiть Вашу електронну пошту")
  .label("Укажiть Вашу електронну пошту")
  .ensure(),

  MFO: yup
  .string("У вашому номері повинні бути тільки цифри")
  .min(6, "Невірно введені дані")
  .required("Це обовязкове поле")
  .ensure(),

   EDRPOU: yup
  .string("У вашому номері повинні бути тільки цифри")
   .min(8, "Невірно введені дані")
   .required("Це обовязкове поле")
   .ensure(),

   phoneOfCompany: yup
  .string("У вашому номері повинні бути тільки цифри")
  .min(10, "Невірно введені дані")
  .max(13, "Невірно введені дані")
  .required("Це обовязкове поле")
  .ensure(),

  extraPhoneOfCompany: yup
  .string("У вашому номері повинні бути тільки цифри")
  .max(13, "Невірно введені дані")
  .min(10, "Невірно введені дані")
  .required("Це обовязкове поле")
  .ensure(),

  accountOfCompany: yup
  .string('')
  .matches(/^[A-Z]{2}[A-Z0-9]{13,29}$/, 'Не відповідає IBAN формату')
  .required("Це обовязкове поле")
  .ensure(),

  companyName: yup
  .string()
      .required("Це обовязкове поле")
      .max(30, "У назві Вашої компанії має бути не більше 30 літер")
      .min(2, "У назві Вашої компанії має бути не менше 2 літер")
      .ensure(),

  deliveryAddressOfDocuments: yup.string()
  .min(10, "Вкажіть повну адресу")
  .ensure(),

  deliveryAddressOfProducts: yup.string()
  .min(10, "Вкажіть повну адресу")
  .ensure(),

  employeeNames: yup
  .string()
  .matches("^[А-Яа-яЁёЇїІіЄєҐґa-zA-Z'/\\s]+$", "Має містити тільки літери")
  .min(12, "У вашому імені повинно бути не менше 12 літер")
  .required("Це обовязкове поле")
  .ensure(),

  employeeEmail: yup
  .string()
  .email("Укажiть електронну пошту Вашого співробітника")
  .label("Укажiть електронну пошту Вашого співробітника")
  .required("Це обовязкове поле")
  .ensure(),

  employeeRole: yup
  .string()
  .label("Вкажіть роль Вашого співробітника")
  .required("Це обовязкове поле")
  .ensure(),
});

export default validationSchema;
