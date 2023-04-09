import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import HomeTabs from "./components/BottomTabs";
import store from "./redux/store";
import LoginScreen from "./screens/auth/LoginScreen";
import RegisterScreen from "./screens/auth/RegisterScreen";
import HomeScreen from "./screens/HomeScreen";
import SplashScreen from "./screens/SplashScreen";
import CategoryDetails from "./screens/CategoryDetails";
import ProfileScreen from "./screens/ProfileScreen";
import FavouriteScreen from "./screens/FavouriteScreen";
import PostProductItemDetail from "./screens/PostProductItemDetailScreen";
import MessageScreen from "./screens/MessageScreen";
import Search from "./components/Search";
import ChatScreen from "./screens/ChatScreen";
import { CardStyleInterpolators } from "@react-navigation/stack";
import { TransitionSpecs } from "@react-navigation/stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            gestureEnabled: true,
            gestureDirection: "horizontal",
            transitionSpec: {
              open: TransitionSpecs.TransitionIOSSpec,
              close: TransitionSpecs.TransitionIOSSpec,
            },
            cardStyleInterpolator: ({ current, next, layouts }) => {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                    {
                      translateX: next
                        ? next.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, -layouts.screen.width],
                          })
                        : 0,
                    },
                  ],
                },
                overlayStyle: {
                  opacity: current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.5],
                  }),
                },
              };
            },
          }}
        >
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeTab" component={HomeTabs} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="FavouriteScreen" component={FavouriteScreen} />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen
            name="MessageScreen"
            component={MessageScreen}
            options={{
              presentation: "modal",
              animationTypeForReplace: "push",
              animation: "slide_from_right",
            }}
          />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen
            name="PostProductItemDetail"
            component={PostProductItemDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
