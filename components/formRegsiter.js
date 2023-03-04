import { View, Text, StyleSheet, Button } from "react-native";
import React from "react";
import InputForm from "./InputForm";

export default function FormRegsiter() {
  return (
    <View style={styles.flexColumn && { marginTop: 90, padding: 10, gap: 10 }}>
      <Text
        style={{
          paddingTop: 10,
          fontSize: 30,
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        Đăng ký tài khoản
      </Text>
      <InputForm
        label={"Mã sinh viên"}
        placeholder="Mã sinh viên"
        type="numberic"
      />
      <Button title="Tiếp" />
    </View>
  );
}

const styles = StyleSheet.create({
  flexColumn: {
    display: "flex",
    flexDirection: "column",
  },
});
