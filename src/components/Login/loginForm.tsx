import { Field, reduxForm } from "redux-form";
import { Button, InputAdornment, TextField } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";

const validateFields = (values: { [key: string]: string }) => {
  const errors: { [key: string]: string } = {};
  const requiredFields = ["username", "password"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const renderTextField = (props: any) => {
  let {
    label,
    input,
    meta: { touched, invalid, error },
    custom,
    InputProps,
  } = props;
  return (
    <TextField
      label={label}
      error={touched && invalid}
      helperText={touched && error}
      {...input}
      {...custom}
      placeholder={"Enter " + label}
      type={label === "Password" ? "password" : "text"}
      InputProps={InputProps}
      className="formFields"
    />
  );
};

let LoginForm = (props: any) => {
  const { handleSubmit, pristine, submitting, valid, onSubmit, error } = props;
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fields">
        <div>
          <div>
            <Field
              name="username"
              component={renderTextField}
              label="Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircleRoundedIcon className="inputAdorements" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div>
          <div>
            <Field
              name="password"
              component={renderTextField}
              label="Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockRoundedIcon className="inputAdorements" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="formError">{error}</div>
        <div>
          <Button
            type="submit"
            variant="contained"
            className="submitButton"
            disabled={pristine || submitting || !valid}
          >
            {submitting ? "Signing In..." : "Sign-In"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "loginForm",
  validate: validateFields,
})(LoginForm);
