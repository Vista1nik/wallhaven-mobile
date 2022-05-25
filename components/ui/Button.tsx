import { LinearGradient } from "expo-linear-gradient"
import { Pressable, Text, TouchableOpacity, View } from "react-native"

const Button = (
    {
        children,
        style,
        onPress,
        variant
    } : {
        children: React.ReactNode,
        style: any,
        onPress: () => void,
        variant: 'primary' | 'secondary'
    }
) => {
    return (
        <TouchableOpacity style={style}>
            <LinearGradient
                colors={
                    variant === 'primary' ? ['#bddb7e', '#85a936'] : ['#275660', '#183640']
                }
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    paddingVertical: 16,
                    borderRadius: 5,
                }}
            >
                <Text style={{
                    color: variant === 'primary' ? '#053919' : '#fff',
                    fontSize: 18,
                    fontFamily: 'SourceSansPro_400Regular',
                }}>{children}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

export default Button