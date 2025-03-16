import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

import People from "screens/People";
import Planets from "screens/Planets";
import Films from "screens/Films";
import Details from "screens/Details";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { FontAwesome5 } from '@expo/vector-icons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

// Stack para People
const PeopleStack = createNativeStackNavigator();
function PeopleStackNavigator() {
    return (
        <PeopleStack.Navigator initialRouteName="PeopleScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#FFE81F',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: '#000',
                }
            }}
        >
            <PeopleStack.Screen
                name="PeopleScreen"
                component={People}
                options={{
                    title: "Personajes",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">PERSONAJES</Text>
                    )
                }}
            />
            <PeopleStack.Screen
                name="Details"
                component={Details}
                options={{
                    title: "Detalles",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">DETALLES</Text>
                    )
                }}
            />
        </PeopleStack.Navigator>
    );
}

// Stack para Planets
const PlanetsStack = createNativeStackNavigator();
function PlanetsStackNavigator() {
    return (
        <PlanetsStack.Navigator initialRouteName="PlanetsScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#FFE81F',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: '#000',
                }
            }}
        >
            <PlanetsStack.Screen
                name="PlanetsScreen"
                component={Planets}
                options={{
                    title: "Planetas",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">PLANETAS</Text>
                    )
                }}
            />
            <PlanetsStack.Screen
                name="Details"
                component={Details}
                options={{
                    title: "Detalles",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">DETALLES</Text>
                    )
                }}
            />
        </PlanetsStack.Navigator>
    );
}

// Stack para Films
const FilmsStack = createNativeStackNavigator();
function FilmsStackNavigator() {
    return (
        <FilmsStack.Navigator initialRouteName="FilmsScreen"
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#000',
                },
                headerTintColor: '#FFE81F',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
                contentStyle: {
                    backgroundColor: '#000',
                }
            }}
        >
            <FilmsStack.Screen
                name="FilmsScreen"
                component={Films}
                options={{
                    title: "Películas",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">PELÍCULAS</Text>
                    )
                }}
            />
            <FilmsStack.Screen
                name="Details"
                component={Details}
                options={{
                    title: "Detalles",
                    headerTitle: () => (
                        <Text className="text-yellow-400 text-xl font-bold">DETALLES</Text>
                    )
                }}
            />
        </FilmsStack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="People"
            screenOptions={{
                tabBarActiveTintColor: '#FFE81F',
                tabBarInactiveTintColor: '#888',
                tabBarStyle: {
                    backgroundColor: '#111',
                    borderTopColor: '#333',
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen 
                name="People" 
                component={PeopleStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome5 name="jedi" size={24} color={color} />
                    ),
                    tabBarLabel: "Personajes",
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Planets" 
                component={PlanetsStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome6 name="earth-americas" size={24} color={color} />
                    ),
                    tabBarLabel: "Planetas",
                    headerShown: false
                }}
            />
            <Tab.Screen 
                name="Films" 
                component={FilmsStackNavigator}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="movie" size={24} color={color} />
                    ),
                    tabBarLabel: "Películas",
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <NavigationContainer>
            <MyTabs />
        </NavigationContainer>
    );
}