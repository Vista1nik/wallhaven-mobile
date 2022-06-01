import { View, Text, TouchableOpacity } from "react-native"
import { LinearGradient } from "expo-linear-gradient"
//@ts-ignore
import InsetShadow from './InsetShadow';

const ToggleButton = (
    {
        children,
        style,
        toggled,
        variant,
        disabled,
    } : {
        children: React.ReactNode,
        style: any,
        toggled: boolean,
        variant: "gray" | "green" | "yellow" | "red" | "purple",
        disabled: boolean,
    }
) => {
    return (
        <TouchableOpacity style={{
            flex: 1,
            borderRadius: 4,
            marginHorizontal: 2,
            height: 43,
            ...style
        }}>
            <LinearGradient
                colors={
                    disabled ? ["#404040", "#292929"] :
                    variant === "gray" ? ["#777", "#444"] :
                    variant === "green" ? ["#595", "#353"] :
                    variant === "yellow" ?["#995", "#553"] :
                    variant === "red" ? ["#955", "#533"] :
                    ["#959", "#535"]
                }
                style={{
                    flex: 1,
                    justifyContent: "center",
                    borderRadius: 4,
                    alignItems: "center"
                }}
            >
                <Text style={{
                    fontSize: 16,
                    color: disabled ? "#aaa" :
                    variant === "gray" ? "#fff" :
                    variant === "green" ? "#9f9" :
                    variant === "yellow" ? "#ff9" :
                    variant === "red" ? "#f99" :
                    "#f9f",
                    fontFamily: 'SourceSansPro_400Regular',

                    shadowColor: "#000",
                    shadowOffset: {
                        width: 1,
                        height: 1,
                    },
                    shadowOpacity: 0.75,
                    shadowRadius: 3,

                    elevation: 1,
                }}>
                    {children}
                </Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const Toggle = (
    {
        children,
        style
    }: {
        children: React.ReactNode,
        style: any,
    }
) => {
    return (
        <View style={{
            shadowColor: "rgba(127,127,127, 0.1)",
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 0,

            elevation: 2,
            ...style
        }}>
            <InsetShadow
                shadowColor="rgba(0, 0, 0, 0.4)" 
                containerStyle={{
                    borderRadius: 5,
                    height: 'auto',
                }}
            >
                <View style={{
                    flexDirection: "row",
                    backgroundColor: 'rgba(30,30,30,.5)',
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                    borderRadius: 5
                }}>
                    {children}
                </View>
            </InsetShadow>
        </View>
    )
}

export {
    ToggleButton,
    Toggle
}