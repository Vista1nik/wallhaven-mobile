import { View } from 'react-native'
import { Platform } from "react-native"

//@ts-ignore
import InsetShadowComponent from 'react-native-inset-shadow'

// TODO: Implement inset shadows for Android
const InsetShadow = (props: any) => {
    if (Platform.OS === 'ios') {
        return (
            <InsetShadowComponent
                {...props}
            >{props.children}</InsetShadowComponent>
        )
    } else {
        return (
            <View>
                {props.children}
            </View>
        )
    }
}

export default InsetShadow