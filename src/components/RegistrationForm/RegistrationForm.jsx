/* eslint-disable no-unused-vars */
// src/components/RegistrationForm/index.jsx
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormikContext } from "formik";
import { registrationSchema } from "../../utils/validationSchema";
import { createUser } from "../../utils/api";
import "./registrationForm.css";
import { useEffect, useState } from "react";

const RegistrationForm = () => {
  const initialValues = {
    full_name: "",
    contact_number: "",
    day: "",
    month: "",
    year: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setStatus }
  ) => {
    values.date_of_birth = `${values.year}-${values.month}-${values.day}`;

    try {
      const data = await createUser(values);
      toast.success("User account successfully created.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-message sucess_msg",
      });
      resetForm();
      setStatus(null);
    } catch (error) {
      toast.error("There was an error creating the account.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
        className: "toast-error toast-message",
      });
      setStatus(null);
    }
    setSubmitting(false);
  };

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  const [day, setDay] = useState(currentDay);
  const [month, setMonth] = useState(currentMonth);
  const [year, setYear] = useState(currentYear);
  const [daysInMonth, setDaysInMonth] = useState(31);

  const generateOptions = (from, to) => {
    const options = [];
    for (let i = from; i <= to; i++) {
      options.push(
        <option value={i} key={i}>
          {i}
        </option>
      );
    }
    return options;
  };

  useEffect(() => {
    ``;
    const isLeapYear = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    const days =
      month === 2
        ? isLeapYear
          ? 29
          : 28
        : [4, 6, 9, 11].includes(month)
        ? 30
        : 31;

    setDaysInMonth(days);
    if (day > days) {
      setDay(days);
    }
  }, [day, month, year]);

  const formatCanadianPhoneNumber = (value) => {
    if (!value) return value;

    // Only allow digits
    const phoneNumber = value.replace(/[^\d]/g, "");

    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  return (
    <div className="container form_wrapper">
      <ToastContainer />
      <h2> Create User Account</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={registrationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, isSubmitting, errors, touched }) => (
          <Form>
            <div className="px-6 py-5 form_detail md:p-10">
              <div className="input_detail">
                <div className="block input_label">Full Name</div>
                <div
                  className={`mb-4 input_group ${
                    touched.full_name && errors.full_name ? "error" : ""
                  }`}
                >
                  <Field
                    name="full_name"
                    type="text"
                    className="input_filed focus:outline-none focus:shadow-outline"
                  />
                  <label
                    htmlFor="full_name"
                    className={`${values.full_name ? "label-up" : ""}`}
                  >
                    Full Name<span>*</span>
                  </label>

                  <ErrorMessage
                    name="full_name"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="input_detail">
                <div className="block input_label">Contact Number</div>
                <div
                  className={`mb-4 input_group ${
                    touched.contact_number && errors.contact_number
                      ? "error"
                      : ""
                  }`}
                >
                  <Field
                    name="contact_number"
                    type="number"
                    className="input_filed focus:outline-none focus:shadow-outline"
                  />
                  <label
                    htmlFor="contact_number"
                    className={`${values.contact_number ? "label-up" : ""}`}
                  >
                    Contact Number<span>*</span>
                  </label>

                  <ErrorMessage
                    name="contact_number"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              <div>
                <div className="block input_label">Birthdate</div>
                <div className="flex mb-4 space-x-3">
                  <div
                    className={`w-1/3 input_group ${
                      touched.day && errors.day ? "error" : ""
                    }`}
                  >
                    <Field
                      as="select"
                      name="day"
                      className="input_filed focus:outline-none focus:shadow-outline"
                    >
                      {generateOptions(1, daysInMonth)}
                    </Field>
                    <label
                      htmlFor="day"
                      className={`${values.day ? "label-up" : ""}`}
                    >
                      Day<span>*</span>
                    </label>

                    <ErrorMessage
                      name="day"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div
                    className={`w-1/3 input_group ${
                      touched.month && errors.month ? "error" : ""
                    }`}
                  >
                    <Field
                      as="select"
                      name="month"
                      className="input_filed focus:outline-none focus:shadow-outline"
                      onChange={(e) => {
                        setFieldValue("month", Number(e.target.value));
                      }}
                    >
                      {generateOptions(1, 12)}
                    </Field>
                    <label
                      htmlFor="month"
                      className={`${values.month ? "label-up" : ""}`}
                    >
                      Month<span>*</span>
                    </label>

                    <ErrorMessage
                      name="month"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                  <div
                    className={`w-1/3 input_group ${
                      touched.year && errors.year ? "error" : ""
                    }`}
                  >
                    <Field
                      as="select"
                      name="year"
                      className="input_filed focus:outline-none focus:shadow-outline"
                      onChange={(e) => {
                        setFieldValue("year", Number(e.target.value));
                      }}
                    >
                      {generateOptions(1960, currentYear)}
                    </Field>
                    <label
                      htmlFor="year"
                      className={`${values.year ? "label-up" : ""}`}
                    >
                      Year<span>*</span>
                    </label>

                    <ErrorMessage
                      name="year"
                      component="div"
                      className="mt-1 text-xs text-red-500"
                    />
                  </div>
                </div>
              </div>

              <div className="input_detail">
                <div className="block input_label"> Email Address</div>
                <div
                  className={`mb-4 input_group ${
                    touched.email && errors.email ? "error" : ""
                  }`}
                >
                  <Field
                    name="email"
                    type="email"
                    className="input_filed focus:outline-none focus:shadow-outline"
                  />
                  <label
                    htmlFor="email"
                    className={`${values.email ? "label-up" : ""}`}
                  >
                    Email Address<span>*</span>
                  </label>

                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="input_detail">
                <div className="block input_label">Password</div>
                <div
                  className={`mb-4 input_group ${
                    touched.password && errors.password ? "error" : ""
                  }`}
                >
                  <Field
                    name="password"
                    type="password"
                    className="input_filed focus:outline-none focus:shadow-outline"
                  />
                  <label
                    htmlFor="password"
                    className={`${values.password ? "label-up" : ""}`}
                  >
                    Password<span>*</span>
                  </label>

                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>

              <div className="input_detail">
                <div className="block input_label">Confirm Password</div>
                <div
                  className={`input_group ${
                    touched.confirm_password && errors.confirm_password
                      ? "error"
                      : ""
                  }`}
                >
                  <Field
                    placeholder="Confirm Password"
                    name="confirm_password"
                    type="password"
                    className="input_filed focus:outline-none focus:shadow-outline"
                  />
                  <label
                    htmlFor="confirm_password"
                    className={`${values.confirm_password ? "label-up" : ""}`}
                  >
                    Confirm Password<span>*</span>
                  </label>

                  <ErrorMessage
                    name="confirm_password"
                    component="div"
                    className="mt-1 text-xs text-red-500"
                  />
                </div>
              </div>
            </div>

            <div className="button_wrapper">
              <button
                type="button"
                className="focus:outline-none focus:shadow-outline cancle_btn"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:outline-none focus:shadow-outline submit_btn"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
