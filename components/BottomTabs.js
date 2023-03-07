import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import ProductReviewScreen from "../screens/ProductReviewScreen";
import CategoryScreen from "../screens/CategoryScreen";
import ProductScreen from "../screens/ProductScreen";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import Colors from "../assets/constants/Colors";
import AccountScreen from "../screens/AccountScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import OrderScreen from "../screens/OrderScreen";

const BottomTabs = createBottomTabNavigator();

const HomeTabs = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: "relative",
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          height: 60,
          backgroundColor: Colors.DEFAULT_PINK,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.DEFAULT_WHITE,
        tabBarInactiveTintColor: Colors.DEFAULT_BLACK,
      }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcons name="home-outline" size={23} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="FavoriteScreen"
        component={FavoriteScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcons name="bookmark-outline" size={23} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View
              style={{
                backgroundColor: Colors.DEFAULT_PINK,
                justifyContent: "center",
                alignItems: "center",
                width: 100,
                height: 100,
                borderRadius: 100,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.DEFAULT_YELLOW,
                  justifyContent: "center",
                  alignItems: "center",
                  width: 80,
                  height: 80,
                  borderRadius: 100,
                }}
              >
                <IonIcons name="share-outline" size={30} color={color} />
                <View>
                  <Text>Đăng tin</Text>
                </View>
              </View>
            </View>
          ),
        }}
      />

      <BottomTabs.Screen
        name="OrderScreen"
        component={OrderScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcons name="cart-outline" size={23} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcons name="person-circle-outline" size={30} color={color} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default HomeTabs;
