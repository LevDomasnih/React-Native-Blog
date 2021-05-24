import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import {createStackNavigator} from "@react-navigation/stack";
import THEME from "../theme";
import {Platform} from "react-native";
import PostScreen from "../screens/PostScreen";

const Stack = createStackNavigator();

export default function AppNavigation() {

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name='Main'
                    options={{
                        headerStyle: {
                            backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff"
                        },
                        headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR
                    }}
                    component={MainScreen}
                />
                <Stack.Screen
                    name='Post'
                    component={PostScreen}
                    options={({route}) =>
                        ({
                            title: `Пост от ${new Date(route.params.date).toLocaleDateString() }`,
                            headerStyle: {
                                backgroundColor: Platform.OS === "android" ? THEME.MAIN_COLOR : "#fff"
                            },
                            headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR
                        })}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}