import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";
import store from "../redux/store";
import SplashScreen from "../screens/SplashScreen";
import HomeScreen from "../screens/HomeScreen";
import HomeTabs from "../components/BottomTabs";
import { useEffect, useState } from "react";
import AccountScreen from "../screens/AccountScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import RegisterScreen from "../screens/auth/RegisterScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import OrderScreen from "../screens/OrderScreen";
import CategoryDetails from "../screens/CategoryDetails";
import PostProductItemDetail from "../screens/PostProductItemDetailScreen";
import OrderSold from "../screens/OrderSoldScreen";
import PurchaseOrderScreen from "../screens/PurchaseOrderScreen";
import PostManagerScreen from "../screens/PostManagerScreen";
import AsyncSorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import GeneralAction from "../redux/GeneralAction";

const Stack = createStackNavigator();

const Navigators = () => {
  const { isLogin, setIsLogin } = useState(true);

  const token = useSelector((state) => state?.user?.token);
  // console.log(token);
  // const [token, setToken] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GeneralAction.appStart());
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* TranThanhTu */}
        {!token || token === null || token === "" ? (
          <>
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          </>
        ) : (
          <>
            {/* <Stack.Screen name="Splash" component={SplashScreen} /> */}

            <Stack.Screen name="HomeTabs" component={HomeTabs} />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="FavoriteScreen" component={FavoriteScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />

            {/* tranthanhtu 8/3/2023 */}
            <Stack.Screen name="CategoryDetails" component={CategoryDetails} />

            {/* tranthanhtu 9/3/2023 */}
            <Stack.Screen
              name="PostProductItemDetail"
              component={PostProductItemDetail}
            />
            {/* tranthanhtu 11/3/2023 */}
            <Stack.Screen name="OrderSold" component={OrderSold} />
            <Stack.Screen
              name="PurchaseOrderScreen"
              component={PurchaseOrderScreen}
            />
            <Stack.Screen
              name="PostManagerScreen"
              component={PostManagerScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigators;
