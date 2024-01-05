// src/utils/validationSchema.js
import * as Yup from "yup";

const currentYear = new Date().getFullYear();

export const registrationSchema = Yup.object().shape({
  full_name: Yup.string()
    .required("Full Name is required")
    .matches(/^[a-zA-Z ]*$/, "Invalid Full Name"),

  contact_number: Yup.string().required("Contact Number is required"), 
  // .matches(
  //     // /^\(\d{3}\) \d{3}-\d{4}$/,
  //     "Invalid Canadian phone number format - must be in the format (XXX) XXX-XXXX"
  // ),

  email: Yup.string()
    .email("Invalid email")
    .required("Sorry, this email address is not valid. Please try again."),

  day: Yup.number()
    .min(1, "Invalid day")
    .max(31, "Invalid day")
    .required("Day is required")
    .typeError("Day must be a number"),

  month: Yup.number()
    .min(1, "Invalid month")
    .max(12, "Invalid month")
    .required("Month is required")
    .typeError("Month must be a number"),

  year: Yup.number()
    .min(1900, "Invalid year")
    .max(currentYear, "Year cannot be in the future")
    .required("Year is required")
    .typeError("Year must be a number"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*`]{8,}$/,
      "Password must include lower and upper case letters and numbers"
    )
    .required("Password is required"),

  confirm_password: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
