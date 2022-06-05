import { View , Text, TouchableOpacity, Platform} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

//@ts-ignore
import InsetShadow from './InsetShadow';
import React, { useRef, useState } from 'react';
import { BottomSheetModal, BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { LinearGradient } from 'expo-linear-gradient';
import Button from './Button';
import { ToggleButton } from './Toggle';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Select = (
    {
        name,
        onChange, 
        value,
        style,
        children,
    } : {
        name: string,
        options: string[],
        onChange: (e: any) => void,
        value: string[],
        style: any,
        children: any,
    }
) => {
    const insets = useSafeAreaInsets()
    
    const selectRef = useRef<BottomSheetModal>();

    return (
        <TouchableOpacity 
            onPress={() => {
                selectRef.current?.present()
            }}
            style={{
                shadowColor: "rgba(127,127,127, 0.1)",
                shadowOffset: {
                    width: 1,
                    height: 1,
                },
                shadowOpacity: 1,
                shadowRadius: 0,

                elevation: 2,
                flex: 1,
                ...style
            }}
        >
            <BottomSheetModal 
                ref={selectRef as any}
                snapPoints={Platform.OS === 'ios' ? ['67%'] : ['64%']}
                handleIndicatorStyle={{
                    backgroundColor: 'rgba(255, 255, 255, 0.25)',
                }}
                style={{
                    shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,

                    elevation: 5,

                    paddingHorizontal: 15
                }}
                backgroundComponent={
                    ({style}: {style: any}) => (
                        <LinearGradient
                            colors={['#282C2F', '#222222']}
                            start={{x: 0, y: 0}}
                            end={{x: 0, y: 1}}
                            style={{
                                borderRadius: 15,
                                ...style
                            }}
                        />
                    )
                }
            >
                <BottomSheetScrollView>
                    {children}
                    <Button
                        variant='secondary'
                        style={{
                            marginBottom: insets.bottom
                        }}
                        onPress={() => {
                            selectRef.current?.dismiss();
                        }}
                    >
                        Close
                    </Button>
                </BottomSheetScrollView>
            </BottomSheetModal>
            <InsetShadow
                shadowColor="rgba(0, 0, 0, 0.4)" 
                containerStyle={{
                    borderRadius: 5,
                    height: 'auto'
                }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(30,30,30,.5)',
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                    borderRadius: 5
                }}>
                    <View style={{
                        height: 43,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            marginRight: 4,
                            fontFamily: 'SourceSansPro_400Regular'
                        }}>{name}</Text>
                        <Ionicons name="caret-down" size={20} color="#fff" />
                    </View>
                </View>
            </InsetShadow>
        </TouchableOpacity>
    )
}

Select.Group = ({
    name,
    style,
    children
}: {
    name?: string,
    style: any,
    children: any
}) => {
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
                    backgroundColor: 'rgba(30,30,30,.5)',
                    paddingTop: 8,
                    paddingHorizontal: 8,
                    borderRadius: 5
                }}>
                    {name && (
                        <View
                            style={{
                                paddingBottom: 8,
                                marginBottom: 8,
                                borderBottomColor: 'rgba(255,255,255,0.25)',
                                borderBottomWidth: 1,
                            }}
                        >
                            <Text 
                                style={{
                                    fontSize: 18,
                                    color: '#fff',
                                    fontFamily: 'SourceSansPro_400Regular'
                                }}
                            >
                                {name}
                            </Text>
                        </View>
                    )}
                    {children}
                </View>
            </InsetShadow>
        </View>
    )
}

Select.Option = (
    {
        children,
        style,
        toggled,
        variant = 'gray',
        disabled,
        onPress,
    } : {
        children: any,
        style: any,
        toggled: boolean,
        variant: "gray" | "green" | "yellow" | "red" | "purple",
        onPress?: () => void,
    }
) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={{
                borderRadius: 4,
                marginBottom: 8,
                height: 43,
                ...style
            }}
        >
            <LinearGradient
                colors={
                    !toggled ? ["#404040", "#292929"] :
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

export default Select;
