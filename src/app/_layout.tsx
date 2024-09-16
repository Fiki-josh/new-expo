import { Stack } from "expo-router";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const RootLayout = () => {
  return (
    <Provider store={store}>
      <Stack screenOptions={{headerShown: false}}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
};

export default RootLayout;
