import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppLoading from 'expo-app-loading';
import { SWRConfig } from 'swr';

import { useFonts, SourceSansPro_400Regular, SourceSansPro_300Light, SourceSansPro_600SemiBold, SourceSansPro_700Bold } from '@expo-google-fonts/source-sans-pro';

import Feed from './screens/feed';
import Menu from './screens/menu';

import { Provider } from 'react-redux';
import { store } from './state';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        SourceSansPro_300Light,
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
        SourceSansPro_700Bold,
    })
    
    return (
        <Provider store={store}>
            <GestureHandlerRootView style={{
                flex: 1,
                backgroundColor: '#000'
            }}>
                <NavigationContainer theme={DarkTheme}>
                    <Stack.Navigator>
                        <Stack.Screen name="Feed" component={Feed} options={{
                            headerShown: false
                        }} />
                        <Stack.Screen name="Menu" component={Menu} />
                    </Stack.Navigator>
                </NavigationContainer>  
            </GestureHandlerRootView>                  
        </Provider>
    );
}