import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

const TransparentIconButton = (
    {
        icon,
        onPress
    } : {
        icon: string,
        onPress: () => void
    }
) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                padding: 8,
                borderRadius: 999,
                backgroundColor: 'rgba(0,0,0,0.5)'
            }}>
                <Ionicons color={"#fff"} name={icon} size={20} />
            </View>
        </Pressable>
    )
}

export default TransparentIconButton;