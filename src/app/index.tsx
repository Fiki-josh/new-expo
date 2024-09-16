import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const [opacity] = useState(new Animated.Value(0));
  const router = useRouter();

  useEffect(() => {
    // Fade in effect for the welcome text
    Animated.timing(opacity, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(() => {
      // After the animation finishes, navigate to the login screen
      setTimeout(() => {
        router.replace("/login"); // Redirect to login page
      }, 1000);
    });
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text style={[styles.welcomeText, { opacity }]}>
        Welcome
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#000",
  },
});
