import { View, Pressable } from 'react-native'

const ColorButton = (
    { 
        color, 
        isSelected,
        onPress
    }: {
        color: string,
        isSelected: boolean,
        onPress?: () => void
    }
) => {
    return (
        <Pressable onPress={onPress}>
            <View style={{
                height: 40,
                width: 40,
                borderRadius: 999,
                borderColor: 'rgba(255,255,255,0.25)',
                borderWidth: isSelected ? 2 : 0,
                backgroundColor: color
            }} />
        </Pressable>
    )
}

export default ColorButton