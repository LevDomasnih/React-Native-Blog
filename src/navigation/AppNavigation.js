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
import BookedScreen from "../screens/BookedScreen";
import {Ionicons} from "@expo/vector-icons";
import {createMaterialBottomTabNavigator} from "@react-navigation/material-bottom-tabs";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {createDrawerNavigator} from "@react-navigation/drawer";
import CreateScreen from "../screens/CreateScreen";
import AboutScreen from "../screens/AboutScreen";

const Main = createStackNavigator();

const MainLayout = (props) => {
    console.log(props)
    return (
        <Main.Navigator initialRouteName="Main">
            <Main.Screen
                name='Main'
                options={{
                    headerTitle: "My blog",
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

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Create" component={CreateScreen} />
            <Drawer.Screen name="About" component={AboutScreen} />
        </Drawer.Navigator>
    );
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
            <Booked.Screen name="booked" component={BookedScreen} options={{
                headerTitle: "Favorites"
            }}/>
            <Booked.Screen
                name="bookedPost"
                component={PostScreen}
                options={({route}) => {
                    const {booked, date, postId} = route.params
                    const iconName = booked ? "ios-star" : "ios-star-outline"
                    return {
                        headerTitle: `Favorite post - ${postId}`,
                        headerStyle: {
                            backgroundColor: withPlatform(THEME.MAIN_COLOR, "#fff")
                        },
                        headerRight: () => (
                            <HeaderButtons HeaderButtonComponent={AppHeaderIcon}>
                                <Item
                                    title='Favorite'
                                    iconName={iconName}
                                    onPress={() => Alert.alert("Take photo")}
                                />
                            </HeaderButtons>
                        ),
                        headerTintColor: withPlatform("#fff", THEME.MAIN_COLOR)
                    }
                }}/>
        </Booked.Navigator>
    )
}

const Tab = withPlatform(createMaterialBottomTabNavigator, createBottomTabNavigator)();

export default function AppNavigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName={"Main"}
                tabBarOptions={{activeTintColor: withPlatform(THEME.MAIN_COLOR, "#fff") }}
                shifting={true} //idk will be worked on iphone :(
                activeColor={withPlatform("#fff", THEME.MAIN_COLOR)}
                barStyle={{backgroundColor: withPlatform(THEME.MAIN_COLOR, "#fff")}}
            >
                <Tab.Screen
                    name="Main"
                    component={MainLayout}
                    options={{
                        tabBarIcon: (info) => <Ionicons name='ios-albums' size={25} color={info.color}/>
                    }}
                />
                <Tab.Screen
                    name="Booked"
                    component={BookedLayout}
                    options={{
                        tabBarLabel: "Favorites",
                        tabBarIcon: (info) => <Ionicons name='ios-star' size={25} color={info.color}/>,
                    }}
                />
            </Tab.Navigator>

        </NavigationContainer>
    );
}