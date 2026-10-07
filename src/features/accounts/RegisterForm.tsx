import { zodResolver } from "@hookform/resolvers/zod";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";
import { registerSchema, type RegisterSchema } from "../../lib/schemas/registerSchema";

export default function RegisterForm() {
  const { registerUser } = useAccounts();
  const navigate = useNavigate();
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
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      elevation={6}
      sx={{
        p: { xs: 3, sm: 5 },
        mt: 8,
        mx: "auto",
        maxWidth: 440,
        borderRadius: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 1,
        }}
      >
        <Avatar
          sx={{
            bgcolor: "secondary.main",
            width: 56,
            height: 56,
            boxShadow: 3,
          }}
        >
          <LockOpen fontSize="large" />
        </Avatar>
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          Create account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Register to continue
        </Typography>
      </Box>

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
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
        }}
      >
        {isSubmitting ? "Registering..." : "Register"}
      </Button>

      <Typography variant="body2" color="text.secondary" align="center">
        Already have an account?{" "}
        <Button variant="text" color="primary" onClick={() => navigate("/login")}>
          Login
        </Button>
      </Typography>
    </Paper>
  );
}