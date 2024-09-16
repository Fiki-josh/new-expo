import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import {
  TextInput,
  Button,
  Text,
  useTheme,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";
import { Link, useRouter } from "expo-router";
import { registerUser, setupDatabase } from "../db";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { colors } = useTheme();

  useEffect(() => {
    (async () => {
      await setupDatabase();
    })();
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
    } else if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      // Register the user using SQLite and navigate to home/login

      setLoading(true);
      const { isError, isSuccess, message } = await registerUser(
        name,
        email,
        password
      );

      console.log(message);

      if (isError) setError(message);

      if (isSuccess) {
        setError("");
        setLoading(false);
        router.replace("/login");
      }
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <TextInput
        label="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />

      <TextInput
        label="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        style={styles.input}
        mode="outlined"
      />

      {error ? <Text style={{ color: colors.error }}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={handleRegister}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator animating={true} color={MD2Colors.white} />
        ) : (
          "Register"
        )}
      </Button>

      <Link href="/">
        <Button mode="text" disabled={loading}>
          "Already have an account? Login
        </Button>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  title: {
    fontSize: 28,
    marginBottom: 20,
    textAlign: "center",
    fontWeight: 700,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 20,
  },
});

export default Register;
