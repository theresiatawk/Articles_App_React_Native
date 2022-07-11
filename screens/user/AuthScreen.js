import React from "react";
import {
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Colors from "../../constants/Colors";

const AuthScreen = (props) => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              KeyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorMessage="Please enter a valid email adress."
              onInputChange={() => {}}
              initialVlaue=""
            />
            <Input
              id="password"
              label="Password"
              KeyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorMessage="Please enter a valid password."
              onInputChange={() => {}}
              initialVlaue=""
            />
            <Button title="login" color={Colors.primary} onPress={() => {}} />
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = {
  headerTitle: "Authenticate",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
