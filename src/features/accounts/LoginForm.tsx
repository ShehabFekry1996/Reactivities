import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginSchema } from "../../lib/schemas/loginSchema";
import { useAccounts } from "../../lib/types/hooks/useAccounts";
import { useForm } from "react-hook-form";
import { Avatar, Box, Button, Paper, Typography } from "@mui/material";
import { LockOpen } from "@mui/icons-material";
import TextInput from "../../app/shared/components/TextInput";

export default function LoginForm() {
  const { loginUser } = useAccounts();
  const {
    control,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm<LoginSchema>({
    mode: "onTouched",
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data);
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
          Welcome back
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Sign in to continue
        </Typography>
      </Box>

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
        sx={{
          py: 1.5,
          borderRadius: 2,
          fontWeight: 600,
          textTransform: "none",
          fontSize: "1rem",
        }}
      >
        {isSubmitting ? "Signing in..." : "Login"}
      </Button>
    </Paper>
  );
}