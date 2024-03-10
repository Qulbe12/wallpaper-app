import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomePage from "../pages/HomePage";
import AssetDetails from "../pages/AssetDetails";

const Stack = createNativeStackNavigator();
const MainStack = () => {


    return (
        <Stack.Navigator initialRouteName="Home">
            {isAuthenticated ? (
                <Stack.Screen head name="Home" component={HomePage}/>
            ) : (
                <Stack.Screen name="Asset Detail" component={AssetDetails}/>
            )}


        </Stack.Navigator>
    );
};

export default MainStack;