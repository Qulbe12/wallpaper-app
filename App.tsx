import React, {useEffect, useMemo, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {navTheme} from "./src/config/theme";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import {config} from "@gluestack-ui/config";
import {AuthContext} from "./src/context/AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HomePage from "./src/pages/HomePage";
import AssetDetails from "./src/pages/AssetDetails";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ImageDetail from "./src/pages/ImageDetail";

const Stack = createNativeStackNavigator();
const App = () => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);


    const checkAuthentication = async () => {
        const token = await AsyncStorage.getItem('token');
        setIsAuthenticated(!!token); // Convert token to boolean
    };

    useEffect(() => {
        checkAuthentication();
    }, []);

    const authContext = useMemo(
        () => ({
            signIn: async (token: string) => {
                try {
                    await AsyncStorage.setItem('token', token);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error('Error occurred during authentication:', error);
                }
            },
            signOut: async () => {
                try {
                    await AsyncStorage.removeItem('token');
                    setIsAuthenticated(false);
                } catch (error) {
                    console.error('Error occurred during authentication:', error);
                }
            },
        }),
        [],
    );
    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer theme={navTheme}>
                <GluestackUIProvider config={config}>

                    <Stack.Navigator screenOptions={{
                        headerShown: false,
                        headerStyle: {
                            backgroundColor: "black",
                        },
                        contentStyle: {
                            backgroundColor: "#FBC160",
                        },
                    }} initialRouteName="Home">
                        {!isAuthenticated ? (
                            <Stack.Screen name="Home" component={HomePage}/>
                        ) : (
                            <>
                                <Stack.Screen name="Asset Detail" component={AssetDetails}/>
                                <Stack.Screen name="image detail" component={ImageDetail}/>
                            </>
                        )}
                    </Stack.Navigator>

                </GluestackUIProvider>
            </NavigationContainer>
        </AuthContext.Provider>
    )
};

export default App;