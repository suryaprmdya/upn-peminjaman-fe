import React from "react";

const FormInput = React.forwardRef((props, ref) => (
  <input {...props} ref={ref} />
));

export default FormInput