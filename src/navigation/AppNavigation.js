import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import {createStackNavigator} from "@react-navigation/stack";
import THEME from "../theme";
import {Alert, Platform} from "react-native";
import PostScreen from "../screens/PostScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";

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
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Take photo'
                                    iconName="ios-camera"
                                    onPress={() => Alert.alert("Take photo")}
                                />
                            </HeaderButtons>
                        ),
                        headerTintColor: Platform.OS === "android" ? "#fff" : THEME.MAIN_COLOR
                    }}
                    component={MainScreen}
                />
                <Stack.Screen
                    name='Post'
                    component={PostScreen}
                    options={({route}) =>
                        ({
                            headerTitle: `Пост от ${new Date(route.params.date).toLocaleDateString()}`,
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