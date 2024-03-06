import React from 'react';
import Main from "./src/Main";
import {NavigationContainer} from '@react-navigation/native';
import {navTheme} from "./src/config/theme";
import {GluestackUIProvider} from "@gluestack-ui/themed";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {config} from "@gluestack-ui/config";


const App = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <GluestackUIProvider config={config}>
                <SafeAreaProvider>
                    <Main/>
                </SafeAreaProvider>
            </GluestackUIProvider>
        </NavigationContainer>
    )
};

export default App;