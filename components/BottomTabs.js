import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import HomeScreen from "../screens/HomeScreen";
import Colors from "../assets/constants/Colors";
import AccountScreen from "../screens/AccountScreen";
import OrderScreen from "../screens/OrderScreen";
import PostManagerScreen from "../screens/PostManagerScreen";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostProduct from "./handlers/PostProduct";
import { useDispatch, useSelector } from "react-redux";

const BottomTabs = createBottomTabNavigator();

const HomeTabs = () => {
  const bottomSheet = useRef();

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => bottomSheet.current.show()}
      >
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
      </TouchableOpacity>

      <BottomTabs.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: "relative",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: 80,
            width: "100%",
            backgroundColor: Colors.DEFAULT_BLUE,
            borderTopWidth: 0,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
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
              <IonIcons name="home-outline" size={27} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="PostManagerScreen"
          component={PostManagerScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="reader-outline" size={27} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="login"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons
                name="share-outline"
                size={30}
                color={Colors.DEFAULT_BLACK}
              />
            ),
          }}
        />

        <BottomTabs.Screen
          name="OrderScreen"
          component={OrderScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Ionicons name="ios-bookmarks-outline" size={27} color={color} />
            ),
          }}
        />
        <BottomTabs.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <IonIcons name="person-circle-outline" size={27} color={color} />
            ),
          }}
        />
      </BottomTabs.Navigator>

      {/*  post product handler */}
      <PostProduct bottomSheet={bottomSheet} />
    </>
  );
};

export default HomeTabs;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 8,
    zIndex: 1,
    left: "40%",
  },
  containerCircleBig: {
    backgroundColor: Colors.DEFAULT_BLUE,
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    height: 90,
    borderRadius: 100,
  },
  containerCircleSmall: {
    backgroundColor: Colors.DEFAULT_WHITE,
    justifyContent: "center",
    alignItems: "center",
    width: 70,
    height: 70,
    borderRadius: 100,
  },
  title: {
    color: Colors.DEFAULT_BLACK,
    fontWeight: 600,
    fontSize: 13,
  },
  button: {
    height: 50,
    width: 150,
    backgroundColor: "#140078",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    shadowColor: "#8559da",
    shadowOpacity: 0.7,
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,
  },
  text: {
    color: "white",
    fontWeight: "600",
  },
  titleText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
  },
  textStyle: {
    padding: 10,
    color: "black",
    textAlign: "center",
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 5,
    marginVertical: 10,
    width: 250,
  },
  imageStyle: {
    width: 200,
    height: 200,
    margin: 5,
  },
});
