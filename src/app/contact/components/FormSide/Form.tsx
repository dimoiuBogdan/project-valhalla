"use client";

import Button from "@/common/components/Button";
import Field from "@/common/components/Field";
import { Form as Formeek, Formik } from "formik";
import * as Yup from "yup";
import { FormValuesType } from "../../contact-models";

const Form = () => {
  const initialValues: FormValuesType = {
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  };

  const handleSubmit = async (
    values: FormValuesType,
    setSubmitting: (isSubmitting: boolean) => void,
  ) => {
    await fetch("/api/send", { method: "POST", body: JSON.stringify(values) });

    setSubmitting(false);
  };

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={true}
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) =>
        await handleSubmit(values, setSubmitting)
      }
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required("Name is required")
          .max(50, "Too long")
          .trim(),
        company: Yup.string()
          .required("Company is required")
          .max(50, "Too long")
          .trim(),
        phone: Yup.string()
          .required("Phone is required")
          .matches(/^(\+\d{0,4}[- ]?)?\d{10}$/, "Invalid phone number")
          .max(15)
          .trim(),
        email: Yup.string()
          .email("Invalid email")
          .required("Email is required")
          .max(50, "Too long")
          .trim()
          .lowercase(),
        subject: Yup.string().required("Subject is required").max(50).trim(),
        message: Yup.string()
          .required("Message is required")
          .max(2500, "Too long")
          .trim(),
      })}
    >
      {({ isSubmitting, setFieldValue, values }) => (
        <Formeek className="flex flex-col gap-y-2 sm:gap-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Field
              onChange={(val) => {
                setFieldValue("name", val);
              }}
              name="name"
              className="bg-dark-purple bg-opacity-50 text-zinc-200"
              label="Name"
              wrapperClassName="flex-1"
            />
            <Field
              onChange={(val) => {
                setFieldValue("company", val);
              }}
              name="company"
              className="w-full"
              label="Company"
              wrapperClassName="flex-1"
            />
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <Field
              onChange={(val) => {
                setFieldValue("phone", val);
              }}
              name="phone"
              type="tel"
              label="Phone"
              wrapperClassName="flex-1"
            />
            <Field
              onChange={(val) => {
                setFieldValue("email", val);
              }}
              name="email"
              type="email"
              label="Email"
              wrapperClassName="flex-1"
            />
          </div>
          <Field
            onChange={(val) => {
              setFieldValue("subject", val);
            }}
            name="subject"
            label="Subject"
          />
          <div>
            <Field
              onChange={(val) => {
                setFieldValue("message", val);
              }}
              name="message"
              textarea
              label="Message"
            />
          </div>
          <Button
            disabled={isSubmitting}
            type="submit"
            className={isSubmitting ? "bg-zinc-400" : ""}
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </Formeek>
      )}
    </Formik>
  );
};

export default Form;
