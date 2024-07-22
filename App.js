import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import Principal from "./screens/Principal";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./screens/Login";

const Stack = createStackNavigator();

function MyStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Principal" component={Principal} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}
