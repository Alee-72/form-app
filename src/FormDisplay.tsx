import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Step,
  StepLabel,
  Stepper,
} from "@material-ui/core";

import { Field, Form, Formik, FormikConfig, FormikValues } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import React, { useState } from "react";

import * as yup from "yup";

const sleep = (time: any) => new Promise((acc) => setTimeout(acc, time));
export const FormDisplay = () => {
  return (
    <div className="card">
      <Card>
        <CardContent>
          <FormikStepper
            initialValues={{
              name: "",
              fname: "",
              age: "",
              email: "",
              password: "",
              female: false,
              male: false,

              contact: "",
              description: "",
            }}
            onSubmit={async (values) => {
              await sleep(3000);
              alert("Form submitted");
              console.log("values", values);
            }}
          >
            <FormikStep
              label="Account"
              validationSchema={yup.object({
                email: yup.string().required().min(4, "required"),
                password: yup
                  .string()
                  .required()
                  .min(6, "Atleast 6 digits are required"),
              })}
            >
              <Box>
                <Field
                  type="text"
                  label="Email"
                  name="email"
                  component={TextField}
                />
              </Box>
              <Box>
                <Field
                  type="text"
                  label="Password"
                  name="password"
                  component={TextField}
                />
              </Box>
            </FormikStep>

            <FormikStep
              label="Personal"
              validationSchema={yup.object({
                name: yup.string().required().max(13, "Not valid"),
                fname: yup.string().required().max(13, "Not valid"),
                age: yup
                  .number()
                  .required()
                  .min(18, "Under 18 are not allowed"),
                contact: yup.number().required().min(11, "Not valid"),
              })}
            >
              <Box>
                <Field
                  type="text"
                  label="Name"
                  name="name"
                  component={TextField}
                />
              </Box>
              <Box>
                {" "}
                <Field
                  type="text"
                  label="Father Name"
                  name="fname"
                  component={TextField}
                />
              </Box>
              <Box>
                <Field
                  type="number"
                  label="Age"
                  name="age"
                  component={TextField}
                />
              </Box>
              <Field
                type="checkbox"
                Label={{ label: "Female" }}
                name="female"
                component={CheckboxWithLabel}
              />
              <Field
                type="checkbox"
                Label={{ label: "Male" }}
                name="male"
                component={CheckboxWithLabel}
              />
              <Box>
                <Field
                  type="number"
                  label="Contact"
                  name="contact"
                  component={TextField}
                />
              </Box>
            </FormikStep>

            <FormikStep label="Description">
              <Box>
                {" "}
                <Field
                  type="text"
                  placeholder="Tell About yourself"
                  label="Description"
                  name="description"
                  component={TextField}
                />
              </Box>
            </FormikStep>
          </FormikStepper>
        </CardContent>
      </Card>
    </div>
  );
};

export interface Proptypestep
  extends Pick<FormikConfig<FormikValues>, "children" | "validationSchema"> {
  label: string;
}

export const FormikStep = ({ children }: Proptypestep) => {
  return <>{children}</>;
};

export const FormikStepper = ({
  children,
  ...props
}: FormikConfig<FormikValues>) => {
  const childrenArray = React.Children.toArray(
    children
  ) as React.ReactElement<Proptypestep>[];
  const [step, setstep] = useState(0);
  const currentchildren = childrenArray[step];
  console.log(childrenArray.length - 1);
  return (
    <Formik
      {...props}
      validationSchema={currentchildren.props.validationSchema}
      onSubmit={async (values, action) => {
        if (step === childrenArray.length - 1) {
          await props.onSubmit(values, action);
        } else {
          setstep((s) => s + 1);
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper activeStep={step} alternativeLabel>
            {childrenArray.map((child) => (
              <Step key={child.props.label}>
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {currentchildren}
          <br />
          <br />
          {step > 0 ? (
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              onClick={() => setstep((s) => s - 1)}
            >
              Back
            </Button>
          ) : null}
          &nbsp; &nbsp;
          <Button
            disabled={isSubmitting}
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            variant="contained"
            color="primary"
            type="submit"
          >
            {step == childrenArray.length - 1 ? "Submit" : "Next"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};
