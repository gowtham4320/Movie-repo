import { Field, reduxForm } from "redux-form";
import { Button, InputAdornment, TextField } from "@mui/material";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import EnhancedEncryptionRoundedIcon from "@mui/icons-material/EnhancedEncryptionRounded";

const validateFields = (values: any) => {
  const errors: any = {};
  const requiredFields = ["username", "password", "confirmPassword"];
  requiredFields.forEach((field) => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  if (values.confirmPassword && values.confirmPassword !== values.password) {
    errors.confirmPassword = "Password and Confirm password not matching";
  }
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
      placeholder={label}
      type={label !== "Username" ? "password" : "text"}
      fullWidth
      InputProps={InputProps}
    />
  );
};

let RegisterUser = (props: any) => {
  const { handleSubmit, pristine, submitting, valid, onSubmit } = props;
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
        <div>
          <div>
            <Field
              name="confirmPassword"
              component={renderTextField}
              label="Confirm Password"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EnhancedEncryptionRoundedIcon className="inputAdorements" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>

        <div>
          <Button
            type="submit"
            variant="contained"
            sx={{ width: "250px" }}
            disabled={pristine || submitting || !valid}
          >
            {submitting ? "Creating profile..." : "SignUp"}
          </Button>
        </div>
      </div>
    </form>
  );
};

export default reduxForm({
  form: "registerUser", // a unique identifier for this form
  validate: validateFields,
})(RegisterUser);
