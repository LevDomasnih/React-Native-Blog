import React from "react";
import {NavigationContainer} from "@react-navigation/native";
import MainScreen from "../screens/MainScreen";
import {createStackNavigator} from "@react-navigation/stack";
import THEME from "../theme";
import {Alert} from "react-native";
import PostScreen from "../screens/PostScreen";
import {HeaderButtons, Item} from "react-navigation-header-buttons";
import AppHeaderIcon from "../components/AppHeaderIcon";
import withPlatform from "../withPlatform";

const Stack = createStackNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name='Main'
                    options={{
                        headerTitle: "Мой блог",
                        headerStyle: {
                            backgroundColor: withPlatform(THEME.MAIN_COLOR, "#fff")
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
                        headerLeft: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Take photo'
                                    iconName="ios-menu"
                                    onPress={() => Alert.alert("Take photo")}
                                />
                            </HeaderButtons>
                        ),
                        headerTintColor: withPlatform("#fff", THEME.MAIN_COLOR)
                    }}
                    component={MainScreen}
                />
                <Stack.Screen
                    name='Post'
                    component={PostScreen}
                    options={({route}) => {
                        const {booked, date} = route.params
                        const iconName = booked ? "ios-star" : "ios-star-outline"
                        return {
                            headerTitle: `Пост от ${new Date(date).toLocaleDateString()}`,
                            headerStyle: {
                                backgroundColor: withPlatform(THEME.MAIN_COLOR, "#fff")
                            },
                            headerRight: () => (
                                <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                    <Item
                                        title='Take photo'
                                        iconName={iconName}
                                        onPress={() => Alert.alert("Take photo")}
                                    />
                                </HeaderButtons>
                            ),
                            headerTintColor: withPlatform("#fff", THEME.MAIN_COLOR)
                        }
                    }}
                />
            </Stack.Navigator>

        </NavigationContainer>
    );
}