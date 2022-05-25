import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppLoading from 'expo-app-loading';
import { SWRConfig } from 'swr';
import fetcher from './lib/fetcher';

import { useFonts, SourceSansPro_400Regular, SourceSansPro_300Light, SourceSansPro_600SemiBold, SourceSansPro_700Bold } from '@expo-google-fonts/source-sans-pro';

import Feed from './screens/feed';

const Stack = createNativeStackNavigator();

export default function App() {
    const [fontsLoaded] = useFonts({
        SourceSansPro_300Light,
        SourceSansPro_400Regular,
        SourceSansPro_600SemiBold,
        SourceSansPro_700Bold,
    })

    if (!fontsLoaded) {
        return <AppLoading />;
    }

    return (
        <SWRConfig
            value={{
                fetcher: fetcher
            }}
        >
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen name="Feed" component={Feed} options={{
                        headerShown: false
                    }} />
                </Stack.Navigator>
            </NavigationContainer>                    
        </SWRConfig>
    );
}