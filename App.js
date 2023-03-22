import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import HomeTabs from "./components/BottomTabs";
import Navigators from "./navigations";
import store from "./redux/store";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import CategoryDetails from "./screens/CategoryDetails";
import ProductScreen from "./screens/ProductScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductReviewScreen from "./screens/ProductReviewScreen";
import ProfileScreen from "./screens/ProfileScreen";
import PostProductItemDetail from "./screens/PostProductItemDetailScreen";

const Stask = createNativeStackNavigator();

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
          <Stask.Screen name="CategoryScreen" component={CategoryDetails} />
          <Stask.Screen name="ProductScreen" component={ProductScreen} />
          <Stask.Screen name="ProductsScreen" component={ProductsScreen} />
          <Stask.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stask.Screen
            name="PostProductItemDetail"
            component={PostProductItemDetail}
          />
          <Stask.Screen
            name="ProductReviewScreen"
            component={ProductReviewScreen}
          />
        </Stask.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
