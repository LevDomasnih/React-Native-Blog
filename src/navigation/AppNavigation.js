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
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import BookedScreen from "../screens/BookedScreen";
import {Ionicons} from "@expo/vector-icons";

const Main = createStackNavigator();

const MainLayout = () => {
    return (
        <Main.Navigator initialRouteName="Main">
            <Main.Screen
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
            <Main.Screen
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
        </Main.Navigator>
    )
}

const Booked = createStackNavigator();

const BookedLayout = () => {
    return (
        <Booked.Navigator screenOptions={{
            headerStyle: {
                backgroundColor: withPlatform(THEME.MAIN_COLOR, "#fff")
            },
            headerTintColor: withPlatform("#fff", THEME.MAIN_COLOR),
        }}>
            <Booked.Screen name="booked" component={BookedScreen} />
            <Booked.Screen name="bookedPost" component={BookedScreen} />
        </Booked.Navigator>
    )
}

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName={"Main"} tabBarOptions={{activeTintColor: THEME.MAIN_COLOR}} >
                <Tab.Screen
                    name="Main"
                    component={MainLayout}
                    options={{
                        tabBarIcon: (info) => <Ionicons name='ios-albums' size={25} color={info.color} />
                    }}
                />
                <Tab.Screen
                    name="Booked"
                    component={BookedLayout}
                    options={{
                        tabBarIcon: (info) => <Ionicons name='ios-star' size={25} color={info.color} />,
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}