import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useAuthStore } from "../store/auth.store";
import AuthNavigator from "./AuthNavigator";
import AppNavigator from "./AppNavigator";

export default function Navigation() {
    const { isAuthenticated, isLoading, loadAuth } = useAuthStore();

    useEffect(() => {
        loadAuth()
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#1a1a2e" }}>
                <ActivityIndicator size="large" color="#6c63ff" />
            </View>
        );
    }

    return (
        <NavigationContainer>
            {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    );
}