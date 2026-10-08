import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { useForm } from "react-hook-form";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { Link, useLocation, useNavigate } from "react-router";
import AuthLayout from "./AuthLayout";

export default function LoginForm() {
  const { loginUser } = useAccounts();
  const navigate = useNavigate();
  const location  = useLocation();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data,{
     onSuccess: ()=>
      {
         navigate(location.state?.from || '/activities');
      }});
    }

  return (
    <AuthLayout title="Welcome back 👋" subtitle="Sign in to continue to Reactivities" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextInput label="Email" name="email" type="email" control={control} />
        <TextInput
          label="Password"
          name="password"
          type="password"
          control={control}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        disabled={!isValid || isSubmitting}
        sx={{ py: 1.5, fontSize: "1rem" }}
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </Button>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account?{" "}
        <Box component={Link} to="/register" sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}>
          Register
        </Box>
      </Typography>
    </AuthLayout>
  );
}
