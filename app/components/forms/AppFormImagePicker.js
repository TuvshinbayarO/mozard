import React from "react";
import { userFormikContext } from "formik";

import AppErrorMessage from "./AppErrorMessage";
import ImageInputList from "../ImageInputList";

function AppFormImagePicker({ name }) {
  const { setFieldValue, values, errors, touched } = userFormikContext();
  const imageUris = values[name];
  const handleAdd = (uri) => {
    setFieldValue(name, [...imageUris, uri]);
  };
  const handleRemove = (uri) => {
    setFieldValue(
      name,
      imageUris.filter((imageUri) => imageUri !== uri)
    );
  };
  return (
    <>
      <ImageInputList
        imageUris={imageUris}
        onAddImage={handleAdd}
        onRemoveImage={handleRemove}
      />
      <AppErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}

export default AppFormImagePicker;
