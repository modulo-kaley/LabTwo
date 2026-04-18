import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, SignUpValues } from "../../lib/authSchemas";
import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

function mapSignUpError(message: string): string {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already exists")) {
    return "An account with this email already exists.";
  }
  if (m.includes("password") && m.includes("weak")) {
    return "Password is too weak. Please choose a stronger password.";
  }
  if (m.includes("network") || m.includes("fetch")) {
    return "Network error. Please check your connection and try again.";
  }
  return message || "Unable to create account. Please try again.";
}

export default function SignUpScreen() {
  const { darkMode } = useTheme();
  const { signUp } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", password: "", confirmPassword: "" },
    mode: "onBlur",
  });

  const onSubmit = async (values: SignUpValues) => {
    setFormError(null);
    setSubmitting(true);
    try {
      await signUp(values.email, values.password);
    } catch (err) {
      setFormError(mapSignUpError(err instanceof Error ? err.message : ""));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, darkMode && styles.containerDark]}>
      <View style={styles.inner}>
        <Text style={[styles.title, darkMode && styles.textDark]}>
          Create account
        </Text>
        <Text style={[styles.subtitle, darkMode && styles.subtitleDark]}>
          Sign up to get started
        </Text>

        <View style={styles.field}>
          <Text style={[styles.label, darkMode && styles.textDark]}>Email</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  darkMode && styles.inputDark,
                  errors.email && styles.inputError,
                ]}
                placeholder="you@example.com"
                placeholderTextColor={darkMode ? "#888" : "#aaa"}
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!submitting}
              />
            )}
          />
          {errors.email && (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, darkMode && styles.textDark]}>Password</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  darkMode && styles.inputDark,
                  errors.password && styles.inputError,
                ]}
                placeholder="At least 8 characters"
                placeholderTextColor={darkMode ? "#888" : "#aaa"}
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!submitting}
              />
            )}
          />
          {errors.password ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : (
            <Text style={[styles.hint, darkMode && styles.subtitleDark]}>
              Must include upper, lower case letters and a number
            </Text>
          )}
        </View>

        <View style={styles.field}>
          <Text style={[styles.label, darkMode && styles.textDark]}>
            Confirm Password
          </Text>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={[
                  styles.input,
                  darkMode && styles.inputDark,
                  errors.confirmPassword && styles.inputError,
                ]}
                placeholder="Re-enter your password"
                placeholderTextColor={darkMode ? "#888" : "#aaa"}
                secureTextEntry
                autoCapitalize="none"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!submitting}
              />
            )}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>
              {errors.confirmPassword.message}
            </Text>
          )}
        </View>

        {formError && (
          <Text style={[styles.errorText, styles.formError]}>{formError}</Text>
        )}

        {submitting ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <Button title="Sign Up" onPress={handleSubmit(onSubmit)} />
        )}

        <View style={styles.footer}>
          <Text style={[styles.footerText, darkMode && styles.subtitleDark]}>
            Already have an account?{" "}
          </Text>
          <Link href="/sign-in" style={styles.link}>
            Sign in
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  containerDark: {
    backgroundColor: "#121212",
  },
  inner: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#000",
    marginTop: 8,
  },
  subtitle: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
    marginBottom: 24,
  },
  subtitleDark: {
    color: "#aaa",
  },
  textDark: {
    color: "#fff",
  },
  field: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 10,
    color: "#000",
    fontSize: 14,
  },
  inputDark: {
    borderColor: "#555",
    color: "#fff",
  },
  inputError: {
    borderColor: "#c0392b",
  },
  errorText: {
    color: "#c0392b",
    fontSize: 13,
    marginTop: 4,
  },
  hint: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  formError: {
    marginBottom: 12,
  },
  loader: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  link: {
    color: "#1e88e5",
    fontSize: 14,
    fontWeight: "600",
  },
});
