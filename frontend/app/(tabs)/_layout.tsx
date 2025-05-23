import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#0de136",
                headerStyle: {
                    backgroundColor: "#c9fffb",
                },
                headerShadowVisible: false,
                headerTintColor: "#464646",
                tabBarStyle: {
                    backgroundColor: "#c9fffb",
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "Home",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'home-sharp' : 'home-outline'} color={color} size={24} />
                    ),
                }}
            />
            <Tabs.Screen
                name="create"
                options={{
                    title: "Add A Pet",
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'information-circle' : 'information-circle-outline'} color={color} size={24} />
                    ),

                }}
            />
            <Tabs.Screen
                name="appointment"
                options={{
                    title: 'จองคิว',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="calendar" size={size} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}