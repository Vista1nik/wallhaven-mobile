import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { Pressable, View, Text, Dimensions } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import Button from "./ui/Button";
import { Toggle, ToggleButton } from "./ui/Toggle";

const FeedSettings = React.forwardRef(({}, ref) => {
    
    return (
        <BottomSheetModalProvider>
                <BottomSheetModal 
                    ref={ref as any}
                    snapPoints={['25%', '50%']}
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
                                colors={['#292c2f', 'rgb(34,34,34)']}
                                start={{x: 0, y: 0}}
                                end={{x: 0, y: 0.1}}
                                style={{
                                    borderRadius: 15,
                                    ...style
                                }}
                            />
                        )
                    }
                >
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
                    <Button variant="primary" style={{
                        marginBottom: 10,
                    }}>Apply</Button>
                </BottomSheetModal>
        </BottomSheetModalProvider>
    )
})

export default FeedSettings