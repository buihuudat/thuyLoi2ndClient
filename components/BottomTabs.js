//tran thanh tu
import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import Colors from "../assets/constants/Colors";
import AccountScreen from "../screens/AccountScreen";

import OrderScreen from "../screens/OrderScreen";
import PostManagerScreen from "../screens/PostManagerScreen";
import { StyleSheet } from "react-native";

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
          backgroundColor: Colors.DEFAULT_BLUE,
          borderTopWidth: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.DEFAULT_YELLOW,
        tabBarInactiveTintColor: Colors.DEFAULT_WHITE,
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
        name="PostManagerScreen"
        component={PostManagerScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <IonIcons name="reader-outline" size={23} color={color} />
          ),
        }}
      />
      <BottomTabs.Screen
        name="login"
        component={LoginScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <View style={styles.containerCircleBig}>
              <View style={styles.containerCircleSmall}>
                <IonIcons
                  name="share-outline"
                  size={30}
                  color={Colors.DEFAULT_BLACK}
                />

                <Text style={styles.title}>Đăng tin</Text>
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

const styles = StyleSheet.create({
  containerCircleBig: {
    backgroundColor: Colors.DEFAULT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  containerCircleSmall: {
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontWeight: 600,
  },
});
