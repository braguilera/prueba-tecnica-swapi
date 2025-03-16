import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import People from "screens/People";
import Planets from "screens/Planets";
import Films from "screens/Films";
import Details from "screens/Details";

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

// Stack para People
const PeopleStack = createNativeStackNavigator();
function PeopleStackNavigator() {
    return (
        <PeopleStack.Navigator initialRouteName="PeopleScreen">
            <PeopleStack.Screen
                name="Personajes de Star Wars"
                component={People}
            />
            <PeopleStack.Screen
                name="Details"
                component={Details}
            />
        </PeopleStack.Navigator>
    );
}

// Stack para Planets
const PlanetsStack = createNativeStackNavigator();
function PlanetsStackNavigator() {
    return (
        <PlanetsStack.Navigator initialRouteName="PlanetsScreen">
            <PlanetsStack.Screen
                name="Planetas de Star Wars"
                component={Planets}

            />
            <PlanetsStack.Screen
                name="Details"
                component={Details}
            />
        </PlanetsStack.Navigator>
    );
}

// Stack para Films
const FilmsStack = createNativeStackNavigator();
function FilmsStackNavigator() {
    return (
        <FilmsStack.Navigator initialRouteName="FilmsScreen">
            <FilmsStack.Screen
                name="Peliculas de Star Wars"
                component={Films}
            />
            <FilmsStack.Screen
                name="Details"
                component={Details}
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
                    tabBarActiveTintColor: 'yellow',
                }}
            >
                <Tab.Screen 
                    name="People" 
                    component={PeopleStackNavigator}
                    options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="people-alt" size={24} color={color} />
                    ),
                    tabBarLabel: "Personas",
                    headerShown: false
                    }}
                />
                <Tab.Screen 
                    name="Planets" 
                    component={PlanetsStackNavigator}
                    options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="public" size={24} color={color} />
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
