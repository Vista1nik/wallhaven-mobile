import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { Pressable, View, Text, Dimensions, Platform } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import Button from "./ui/Button";
import { Toggle, ToggleButton } from "./ui/Toggle";
import Search from "./ui/Search";
import Select from "./ui/Select";

const FeedSettings = React.forwardRef(({}, ref) => {
    
    return (
        <BottomSheetModalProvider>
                <BottomSheetModal 
                    ref={ref as any}
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
                    <Search style={{
                        marginBottom: 10,
                    }} />
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton>Toplist</ToggleButton>
                        <ToggleButton variant="red" disabled>Hot</ToggleButton>
                        <ToggleButton variant="green" disabled>Latest</ToggleButton>
                    </Toggle>
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton variant="gray">General</ToggleButton>
                        <ToggleButton variant="gray">Anime</ToggleButton>
                        <ToggleButton variant="gray" disabled>People</ToggleButton>
                    </Toggle>
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton variant="green">SFW</ToggleButton>
                        <ToggleButton variant="yellow">Sketchy</ToggleButton>
                    </Toggle>
                    <View 
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                    >
                        <Select 
                            name="Resolution"
                            style={{
                                marginRight: 2.5,
                            }}
                        />
                        <Select
                            name="Ratio"
                            style={{
                                marginLeft: 2.5,
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                    >
                        <Select
                            name="Color"
                        />
                    </View>
                    <View 
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                    >
                        <Select
                            name="Sort"
                            style={{
                                marginRight: 2.5,
                            }}
                        />
                        <Select
                            name="Range"
                            style={{
                                marginLeft: 2.5,
                            }}
                        />
                    </View>
                    <Button variant="primary" style={{
                        marginBottom: 10,
                    }}>Apply</Button>
                </BottomSheetModal>
        </BottomSheetModalProvider>
    )
})

export default FeedSettings