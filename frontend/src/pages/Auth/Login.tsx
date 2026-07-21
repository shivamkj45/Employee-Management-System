import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  loginSchema,
  type LoginFormData,
} from "./login.schema";
import { loginUser } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });
  const navigate = useNavigate();

  const { login } = useAuth();

  const onSubmit = async (data: LoginFormData) => {
  try {
    const response = await loginUser(
      data.email,
      data.password
    );

    login(
    response.data.accessToken,
    response.data.refreshToken,
    response.data.user
);

    toast.success("Login Successful!");

    switch (response.data.user.role) {
      case "admin":
        navigate("/admin");
        break;

      case "hr":
        navigate("/hr");
        break;

      case "manager":
        navigate("/manager");
        break;

      case "employee":
        navigate("/employee");
        break;

      default:
        navigate("/");
    }
  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Login failed"
    );
  }
};

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={4}
        sx={{
          mt: 10,
          p: 4,
          borderRadius: 3,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          align="center"
        >
          Employee Management System
        </Typography>

        <Typography
          component="h2"
          variant="subtitle1"
          align="center"
          sx={{ mt: 1, mb: 4 }}
        >
          Sign in to continue
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3 }}
          >
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;