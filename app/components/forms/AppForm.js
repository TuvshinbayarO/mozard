import React from "react";
import { Formik } from "formik";

function AppForm({
  children,
  initialValues,
  onSubmit,
  validationSchema,
  innerRef,
}) {


  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validationSchema={validationSchema}
      validator={() => ({validationSchema})}
      innerRef={innerRef}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
