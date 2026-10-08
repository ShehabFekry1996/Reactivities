import { zodResolver } from "@hookform/resolvers/zod";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { Box, Button, Typography } from "@mui/material";
import TextInput from "../../app/shared/components/TextInput";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";
import AuthLayout from "./AuthLayout";

export default function RegisterForm() {
  const { registerUser } = useAccounts();
  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting },
  } = useForm<RegisterSchema>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
  await registerUser.mutateAsync(data, {
    onError: (error) => {
      if (Array.isArray(error)) {
        error.forEach((err) => {
          if (err.includes("Email")) setError("email", { message: err });
          else if (err.includes("Password")) setError("password", { message: err });
        });
      }
    },
  });
};

  return (
    <AuthLayout title="Create account ✨" subtitle="Join the community in less than a minute" onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}>
        <TextInput label="Email" name="email" type="email" control={control} />
        <TextInput label="Display name" name="displayName" control={control} />
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
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account?{" "}
        <Box component={Link} to="/login" sx={{ color: "primary.main", fontWeight: 700, textDecoration: "none" }}>
          Login
        </Box>
      </Typography>
    </AuthLayout>
  );
}
