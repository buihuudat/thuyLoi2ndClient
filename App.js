<<<<<<< HEAD
import Navigators from "./navigations";
=======
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import { Provider } from "react-redux";
import store from "./redux/store";
import CategoryScreen from "./screens/CategoryScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import ProductReviewScreen from "./screens/ProductReviewScreen";
import SplashScreen from "./screens/SplashScreen";
import HomeTabs from "./components/HomeTabs";
>>>>>>> 7a5901ca5a2d972bc59bdb265c40b25ce4ee7b43

//tran tu

<<<<<<< HEAD
export default () => <Navigators />;
=======
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stask.Navigator screenOptions={{ headerShown: false }}>
          <Stask.Screen name="SplashScreen" component={SplashScreen} />
          <Stask.Screen name="HomeTab" component={HomeTabs} />
          <Stask.Screen name="HomeScreen" component={HomeScreen} />
          <Stask.Screen name="LoginScreen" component={LoginScreen} />
          <Stask.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stask.Screen name="CategoryScreen" component={CategoryScreen} />
          <Stask.Screen name="ProductScreen" component={ProductScreen} />
          <Stask.Screen name="ProductsScreen" component={ProductsScreen} />
          <Stask.Screen
            name="ProductReviewScreen"
            component={ProductReviewScreen}
          />
        </Stask.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
>>>>>>> 7a5901ca5a2d972bc59bdb265c40b25ce4ee7b43
