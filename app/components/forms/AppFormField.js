import React, { Fragment } from "react";
import { useFormikContext } from "formik";

import AppTextInput from "../AppTextInput";
import AppErrorMessage from "./AppErrorMessage";

function AppFormField({ name,icon, ...otherProps }) {
  const {
    setFieldTouched,
    handleChange,
    errors,
    touched,
    setFieldValue,
    values,
  } = useFormikContext();
  return (
    <Fragment>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        icon={icon}
        {...otherProps}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </Fragment>
  );
}

export default AppFormField;
