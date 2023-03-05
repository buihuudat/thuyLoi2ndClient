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
import FirstScreen from "./screens/FirstScreen";

const Stask = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stask.Navigator>
          {/* <Stask.Screen name="first" component={FirstScreen} /> */}
          {/* {/* <Stask.Screen name="login" component={LoginScreen} /> */}
          <Stask.Screen name="register" component={RegisterScreen} />
          {/* <Stask.Screen name="home" component={HomeScreen} />
          <Stask.Screen name="caregory" component={CategoryScreen} /> */}
          <Stask.Screen name="product" component={ProductScreen} />
          <Stask.Screen name="products" component={ProductsScreen} />
          <Stask.Screen name="review" component={ProductReviewScreen} />
        </Stask.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
