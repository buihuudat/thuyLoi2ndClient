import * as Facebook from "expo-facebook";
import { Alert, Button, View } from "react-native";
export default function LoginScreen() {
  const handleFacebookLogin = async () => {
    try {
      await Facebook.initializeAsync({
        appId: "645658810514691",
      });

      const { type, token } = await Facebook.logInWithReadPermissionsAsync({
        permissions: ["public_profile", "email"],
      });

      if (type === "success") {
        const response = await fetch(
          `https://graph.facebook.com/me?access_token=${token}`
        );
        const userData = await response.json();
      } else {
        console.log("Login cancelled");
      }
    } catch (error) {
      console.log("Login error: ", error);
      Alert.alert("opps", "Hiện tại bạn không thể sử dụng chức năng này");
    }
  };

  return (
    <View>
      {/* Render other login options here */}
      <Button title="Đăng nhập với Facebook" onPress={handleFacebookLogin} />
    </View>
  );
}
