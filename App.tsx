import React from 'react';
import Main from "./src/Main";
import {NavigationContainer} from '@react-navigation/native';
import {navTheme} from "./src/config/theme";
import {GluestackUIProvider, SafeAreaView} from "@gluestack-ui/themed";


const App = () => {
    return (
        <NavigationContainer theme={navTheme}>
            <GluestackUIProvider>
                <SafeAreaView flex={1}>
                    <Main/>
                </SafeAreaView>
            </GluestackUIProvider>
        </NavigationContainer>
    )
};

export default App;