import React, { forwardRef } from "react";

export const Child4 = forwardRef((props, inputRef) => {
  // react v19 supports passing of refs directly in props and no need mention forwardRefs as its deprecated too.
  const { label, ...otherProps } = props;

  return (
    <>
      <label>{label}</label>
      <input {...otherProps} ref={inputRef} placeholder="inside child" />
    </>
  );
});
