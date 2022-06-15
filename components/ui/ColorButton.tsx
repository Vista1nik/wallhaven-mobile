import { View, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons';

const ColorButton = (
    { 
        color, 
        isSelected,
        reset,
        onPress
    }: {
        color: string,
        isSelected: boolean,
        reset: boolean,
        onPress?: () => void
    }
) => {
    if (reset) {
        return (            
            <Pressable onPress={onPress}>
                <View style={{
                    borderWidth: 2,
                    transform: [
                        { rotate: '45deg' },
                    ],
                    borderRadius: 999,
                    borderColor: 'red',
                    height: 40,
                    width: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 0
                }}>
                    <View 
                        style={{
                            width: '100%',
                            height: 2,
                            backgroundColor: 'red'
                        }}
                    />
                </View>
            </Pressable>
        )
    }
    return (
        <Pressable onPress={onPress}>
            <View
                style={{
                    height: 40,
                    width: 40,
                    borderRadius: 999,
                    borderColor: 'rgba(255,255,255,0.75)',
                    borderWidth: isSelected ? 2 : 0,
                    backgroundColor: color
                }} 
            />
        </Pressable>
    )
}

export default ColorButton