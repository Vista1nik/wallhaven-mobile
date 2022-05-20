import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SWRConfig } from 'swr';
import fetcher from './lib/fetcher';

import Feed from './screens/feed';

const Stack = createNativeStackNavigator();

export default function App() {
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