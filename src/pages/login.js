import { useFormik } from "formik";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Box, Button, Container, Grid, TextField, Link } from "@mui/material";
import { LoginRequest } from "../services/index.js";
import { setAuthToken } from "../services/config";
import { useEffect } from "react";
import { setOrgDetails } from "../store/actions";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(({ auth }) => auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async (values, actions) => {
      actions.setSubmitting(true);
      const { jwt, orgDetails } = await LoginRequest(values, navigate);
      if (jwt) {
        dispatch({ type: "LOGIN", jwt });
        setAuthToken(jwt);
        localStorage.setItem("JWT", jwt);
        dispatch(setOrgDetails(orgDetails));
        navigate("dashboard");
      }
    },
  });

  useEffect(() => {
    if (auth.JWT) {
      navigate("dashboard");
    }
  }, []);

  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh", paddingTop: 200 }}
      >
        <Box mb={2}>
          <Link component={RouterLink} to="/">
            <img src="/static/images/LogoTheme.png" width="220" />
          </Link>
        </Box>
        <Grid item xs={12}>
          <Container>
            <form onSubmit={formik.handleSubmit}>
              <TextField
                error={Boolean(
                  formik.touched.username && formik.errors.username
                )}
                helperText={formik.touched.username && formik.errors.username}
                label="Username"
                margin="normal"
                name="username"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.username}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                label="Password"
                margin="normal"
                name="password"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                type="password"
                value={formik.values.password}
                variant="outlined"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign In Now
              </Button>
            </form>
          </Container>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
