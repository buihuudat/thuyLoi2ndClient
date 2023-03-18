import { Provider } from "react-redux";
import Navigators from "./navigations";
import store from "./redux/store";

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
