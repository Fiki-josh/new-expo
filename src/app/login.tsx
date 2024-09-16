import { useEffect, useState } from "react";
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
import { loginUser, setupDatabase } from "../db";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/features/userSlice";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { colors } = useTheme();

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await setupDatabase();
    })();
  }, []);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Please enter both email and password");
    } else {
      // Check against SQLite for the user, and if found:

      setLoading(true);

      const { isError, message, isSuccess, data } = await loginUser(
        email,
        password
      );

      if (isError) {
        setLoading(false);
        return setError(message);
      }

      console.log(data);
      if (isSuccess) dispatch(setUser(data));

      setError("");
      setLoading(false);
      router.push("/(tabs)/topStories"); // Navigate to the home screen
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

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

      {error ? <Text style={{ color: colors.error }}>{error}</Text> : null}

      <Button
        mode="contained"
        onPress={handleLogin}
        style={styles.button}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator animating={true} color={MD2Colors.white} />
        ) : (
          "Login"
        )}
      </Button>

      <Link href="/register">
        <Button mode="text">Don’t have an account? Register</Button>
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

export default Home;
