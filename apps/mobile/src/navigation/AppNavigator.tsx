import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import DashboardScreen from "../screens/dashboard/DashboardScreen";
import TransactionsScreen from "../screens/transactions/TransactionsScreen";
import GoalsScreen from "../screens/goals/GoalsScreen";
import AlertsScreen from "../screens/alerts/AlertsScreen";

export type AppTabParamList = {
  Dashboard: undefined;
  Transactions: undefined;
  Goals: undefined;
  Alerts: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1a1a2e",
          borderTopColor: "#16213e",
          paddingBottom: 8,
          height: 60,
        },
        tabBarActiveTintColor: "#6c63ff",
        tabInactiveTintColor: "#666",
        tabBarIcon: ({ focused, color, size }) => {
          const icons: Record<string, keyof typeof Ionicons.glyphMap> = {
            Dashboard: focused ? "home" : "home-outline",
            Transactions: focused ? "swap-vertical" : "swap-vertical-outline",
            Goals: focused ? "trophy" : "trophy-outline",
            Alerts: focused ? "notifications" : "notifications-outline",
          };
          return (
            <Ionicons name={icons[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ tabBarLabel: "Início" }}
      />
      <Tab.Screen
        name="Transactions"
        component={TransactionsScreen}
        options={{ tabBarLabel: "Transações" }}
      />
      <Tab.Screen
        name="Goals"
        component={GoalsScreen}
        options={{ tabBarLabel: "Metas" }}
      />
      <Tab.Screen
        name="Alerts"
        component={AlertsScreen}
        options={{ tabBarLabel: "Alertas" }}
      />
    </Tab.Navigator>
  );
}
