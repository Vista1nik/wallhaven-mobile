import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import React, { useRef } from "react"
import { Pressable, View, Text, Dimensions, Platform, TouchableOpacity } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from "expo-linear-gradient";
import Button from "./ui/Button";
import { Toggle, ToggleButton } from "./ui/Toggle";
import Search from "./ui/Search";
import Select from "./ui/Select";
import ColorButton from "./ui/ColorButton";

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
                        <ToggleButton variant="purple">Toplist</ToggleButton>
                        <ToggleButton variant="red" disabled>Hot</ToggleButton>
                        <ToggleButton variant="green" disabled>Latest</ToggleButton>
                    </Toggle>
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton >General</ToggleButton>
                        <ToggleButton >Anime</ToggleButton>
                        <ToggleButton  disabled>People</ToggleButton>
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
                        >
                            <Toggle style={{marginBottom: 12}}>
                                <ToggleButton >At Least</ToggleButton>
                                <ToggleButton >Exactly</ToggleButton>
                            </Toggle>
                            <Select.Group name="Ultrawide" style={{marginBottom: 12}}>
                                <Select.Option >2560 x 1080</Select.Option>
                                <Select.Option >3440 x 1440</Select.Option>
                                <Select.Option >3840 x 1600</Select.Option>
                            </Select.Group>
                            <Select.Group name="16:9" style={{marginBottom: 12}}>
                                <Select.Option >1280 x 720</Select.Option>
                                <Select.Option >1600 x 900</Select.Option>
                                <Select.Option >1920 x 1080</Select.Option>
                                <Select.Option >2560 x 1440</Select.Option>
                                <Select.Option >3840 x 2160</Select.Option>
                            </Select.Group>
                            <Select.Group name="16:10" style={{marginBottom: 12}}>
                                <Select.Option >1280 x 800</Select.Option>
                                <Select.Option >1600 x 1000</Select.Option>
                                <Select.Option >1920 x 1200</Select.Option>
                                <Select.Option >2560 x 1600</Select.Option>
                                <Select.Option >3840 x 2400</Select.Option>
                            </Select.Group>
                            <Select.Group name="4:3" style={{marginBottom: 12}}>
                                <Select.Option >1280 x 960</Select.Option>
                                <Select.Option >1600 x 1200</Select.Option>
                                <Select.Option >1920 x 1440</Select.Option>
                                <Select.Option >2560 x 1920</Select.Option>
                                <Select.Option >3840 x 2880</Select.Option>
                            </Select.Group>
                            <Select.Group name="5:4" style={{marginBottom: 12}}>
                                <Select.Option >1280 x 1024</Select.Option>
                                <Select.Option >1600 x 1280</Select.Option>
                                <Select.Option >1920 x 1536</Select.Option>
                                <Select.Option >2560 x 2048</Select.Option>
                                <Select.Option >3840 x 3072</Select.Option>
                            </Select.Group>
                        </Select>
                        <Select
                            name="Ratio"
                            style={{
                                marginLeft: 2.5,
                            }}
                        >
                            <Select.Group name="Wide (Desktop)" style={{marginBottom: 12}}>
                                <Select.Option >16 x 9</Select.Option>
                                <Select.Option >16 x 10</Select.Option>
                            </Select.Group>
                            <Select.Group name="UltraWide (Desktop)" style={{marginBottom: 12}}>
                                <Select.Option >21 x 9</Select.Option>
                                <Select.Option >32 x 9</Select.Option>
                                <Select.Option >48 x 9</Select.Option>
                            </Select.Group>
                            <Select.Group name="Portrait (Mobile)" style={{marginBottom: 12}}>
                                <Select.Option >9 x 16</Select.Option>
                                <Select.Option >10 x 16</Select.Option>
                                <Select.Option >9 x 18</Select.Option>
                            </Select.Group>
                            <Select.Group name="Square (iPad or old monitors)" style={{marginBottom: 12}}>
                                <Select.Option >1 x 1</Select.Option>
                                <Select.Option >3 x 2</Select.Option>
                                <Select.Option >4 x 3</Select.Option>
                                <Select.Option >5 x 4</Select.Option>
                            </Select.Group>
                        </Select>
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginBottom: 10,
                        }}
                    >
                        <Select
                            name="Color"
                        >
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#660000" />
                                <ColorButton color="#990000" />
                                <ColorButton color="#cc0000" />
                                <ColorButton color="#cc3333" />
                                <ColorButton color="#ea4c88" />
                                <ColorButton color="#993399" />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#663399" />
                                <ColorButton color="#333399" />
                                <ColorButton color="#0066cc" />
                                <ColorButton color="#0099cc" />
                                <ColorButton color="#66cccc" />
                                <ColorButton color="#77cc33" />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#669900" />
                                <ColorButton color="#336600" />
                                <ColorButton color="#666600" />
                                <ColorButton color="#999900" />
                                <ColorButton color="#cccc33" />
                                <ColorButton color="#ffff00" />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#ffcc33" />
                                <ColorButton color="#ff9900" />
                                <ColorButton color="#ff6600" />
                                <ColorButton color="#cc6633" />
                                <ColorButton color="#996633" />
                                <ColorButton color="#663300" />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
                                <ColorButton color="#000000" />
                                <ColorButton color="#999999" />
                                <ColorButton color="#cccccc" />
                                <ColorButton color="#ffffff" />
                                <ColorButton color="#424153" />
                                <ColorButton color="" />
                            </View>
                        </Select>
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
                        >
                            <Toggle style={{marginBottom: 12}}>
                                <ToggleButton >
                                    <Ionicons name="arrow-up-outline" size={20} />
                                    Ascending
                                </ToggleButton>
                                <ToggleButton >
                                    <Ionicons name="arrow-down-outline" size={20} />
                                    Descending
                                </ToggleButton>
                            </Toggle>
                        </Select>
                        <Select
                            name="Range"
                            style={{
                                marginLeft: 2.5,
                            }}
                        >
                            <Select.Group style={{marginBottom: 12}}>
                                <Select.Option >Last Day</Select.Option>
                                <Select.Option >Last 3 Days</Select.Option>
                                <Select.Option >Last Week</Select.Option>
                                <Select.Option >Last Month</Select.Option>
                                <Select.Option >Last 3 Months</Select.Option>
                                <Select.Option >Last 6 Months</Select.Option>
                                <Select.Option >Last Year</Select.Option>
                            </Select.Group>
                        </Select>
                    </View>
                    <Button variant="primary" style={{
                        marginBottom: 10,
                    }}>Apply</Button>
                </BottomSheetModal>
        </BottomSheetModalProvider>
    )
})

export default FeedSettings