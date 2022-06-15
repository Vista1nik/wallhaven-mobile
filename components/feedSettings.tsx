import { BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import React, { useRef, useState } from "react"
import { Pressable, View, Text, Dimensions, Platform, TouchableOpacity } from "react-native"

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from "@expo/vector-icons/FontAwesome5"
import { LinearGradient } from "expo-linear-gradient";
import Button from "./ui/Button";
import { Toggle, ToggleButton } from "./ui/Toggle";
import Search from "./ui/Search";
import Select from "./ui/Select";
import ColorButton from "./ui/ColorButton";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state";
import { clearColors, clearResolutionsExact, setOrder, setResolutionAtleast, setSearchQuery, setSorting, setTopRange, toggleCategory, toggleColor, togglePurity, toggleRatio, toggleResolutionExact } from "../state/slices/query";

const FeedSettings = React.forwardRef(
    (
        {
            onApply,
        }: {
            onApply: () => void;
        }, 
        ref
    ) => {
    const query = useSelector((state: RootState) => state.query)
    const dispatch = useDispatch()

    const [resolutionMode, setResolutionMode] = useState('atleast')
    
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
                    <Search 
                        style={{
                            marginBottom: 10,
                        }}
                        value={query.q || ''}
                        onChange={value => {
                            dispatch(setSearchQuery(value))
                        }}
                    />
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton 
                            variant="purple"
                            disabled={query.sorting !== 'toplist'}
                            onPress={() => {dispatch(setSorting('toplist'))}}
                        >
                            Toplist
                        </ToggleButton>
                        <ToggleButton
                            variant="red"
                            disabled={query.sorting !== 'hot'}
                            onPress={() => {dispatch(setSorting('hot'))}}
                        >
                            Hot
                        </ToggleButton>
                        <ToggleButton 
                            variant="green"
                            disabled={query.sorting !== 'date_added'}
                            onPress={() => {dispatch(setSorting('date_added'))}}
                        >
                            Latest
                        </ToggleButton>
                    </Toggle>
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton 
                            disabled={query.categories[0] === "0"}
                            onPress={() => {dispatch(toggleCategory('general'))}}
                        >
                            General
                        </ToggleButton>
                        <ToggleButton 
                            disabled={query.categories[1] === "0"}
                            onPress={() => {dispatch(toggleCategory('anime'))}}
                        >
                            Anime
                        </ToggleButton>
                        <ToggleButton
                            disabled={query.categories[2] === "0"}
                            onPress={() => {dispatch(toggleCategory('people'))}}
                        >
                            People
                        </ToggleButton>
                    </Toggle>
                    <Toggle style={{
                        marginBottom: 10,
                    }}>
                        <ToggleButton 
                            variant="green"
                            disabled={query.purity[0] === "0"}
                            onPress={() => {dispatch(togglePurity('sfw'))}}
                        >
                            SFW
                        </ToggleButton>
                        <ToggleButton 
                            variant="yellow"
                            disabled={query.purity[1] === "0"}
                            onPress={() => {dispatch(togglePurity('sketchy'))}}
                        >
                            Sketchy
                        </ToggleButton>
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
                                <ToggleButton
                                    disabled={resolutionMode !== 'atleast'}
                                    onPress={() => {
                                        dispatch(clearResolutionsExact())
                                        setResolutionMode('atleast')
                                    }}
                                >
                                    <FontAwesome name="plus" size={16} color={resolutionMode === 'atleast' ? '#fff' : '#aaa'} />
                                    <View style={{width: 6}} />
                                    At Least
                                </ToggleButton>
                                <ToggleButton
                                    disabled={resolutionMode !== 'exactly'}
                                    onPress={() => {
                                        dispatch(setResolutionAtleast(undefined))
                                        setResolutionMode('exactly')
                                    }}
                                >
                                    <FontAwesome name="dot-circle" size={16} color={resolutionMode === 'exactly' ? '#fff' : '#aaa'} />
                                    <View style={{width: 6}} />
                                    Exactly
                                </ToggleButton>
                            </Toggle>
                            <Select.Group name="Ultrawide" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '2560x1080' : !query.resolutions?.includes('2560x1080')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '2560x1080' ? undefined : '2560x1080'))
                                        } else {
                                            dispatch(toggleResolutionExact('2560x1080'))
                                        }
                                    }}
                                >2560 x 1080</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3440x1440' : !query.resolutions?.includes('3440x1440')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3440x1440' ? undefined : '3440x1440'))
                                        } else {
                                            dispatch(toggleResolutionExact('3440x1440'))
                                        }
                                    }}
                                >3440 x 1440</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3840x1600' : !query.resolutions?.includes('3840x1600')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3840x1600' ? undefined : '3840x1600'))
                                        } else {
                                            dispatch(toggleResolutionExact('3840x1600'))
                                        }
                                    }}
                                >3840 x 1600</Select.Option>
                            </Select.Group>
                            <Select.Group name="16:9" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1280x720' : !query.resolutions?.includes('1280x720')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1280x720' ? undefined : '1280x720'))
                                        } else {
                                            dispatch(toggleResolutionExact('1280x720'))
                                        }
                                    }}
                                >1280 x 720</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1600x900' : !query.resolutions?.includes('1600x900')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1600x900' ? undefined : '1600x900'))
                                        } else {
                                            dispatch(toggleResolutionExact('1600x900'))
                                        }
                                    }}
                                >1600 x 900</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1920x1080' : !query.resolutions?.includes('1920x1080')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1920x1080' ? undefined : '1920x1080'))
                                        } else {
                                            dispatch(toggleResolutionExact('1920x1080'))
                                        }
                                    }}
                                >1920 x 1080</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '2560x1440' : !query.resolutions?.includes('2560x1440')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '2560x1440' ? undefined : '2560x1440'))
                                        } else {
                                            dispatch(toggleResolutionExact('2560x1440'))
                                        }
                                    }}
                                >2560 x 1440</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3840x2160' : !query.resolutions?.includes('3840x2160')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3840x2160' ? undefined : '3840x2160'))
                                        } else {
                                            dispatch(toggleResolutionExact('3840x2160'))
                                        }
                                    }}
                                >3840 x 2160</Select.Option>
                            </Select.Group>
                            <Select.Group name="16:10" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1280x800' : !query.resolutions?.includes('1280x800')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1280x800' ? undefined : '1280x800'))
                                        } else {
                                            dispatch(toggleResolutionExact('1280x800'))
                                        }
                                    }}
                                >1280 x 800</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1600x1000' : !query.resolutions?.includes('1600x1000')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1600x1000' ? undefined : '1600x1000'))
                                        } else {
                                            dispatch(toggleResolutionExact('1600x1000'))
                                        }
                                    }}
                                >1600 x 1000</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1920x1200' : !query.resolutions?.includes('1920x1200')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1920x1200' ? undefined : '1920x1200'))
                                        } else {
                                            dispatch(toggleResolutionExact('1920x1200'))
                                        }
                                    }}
                                >1920 x 1200</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '2560x1600' : !query.resolutions?.includes('2560x1600')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '2560x1600' ? undefined : '2560x1600'))
                                        } else {
                                            dispatch(toggleResolutionExact('2560x1600'))
                                        }
                                    }}
                                >2560 x 1600</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3840x2400' : !query.resolutions?.includes('3840x2400')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3840x2400' ? undefined : '3840x2400'))
                                        } else {
                                            dispatch(toggleResolutionExact('3840x2400'))
                                        }
                                    }}
                                >3840 x 2400</Select.Option>
                            </Select.Group>
                            <Select.Group name="4:3" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1280x960' : !query.resolutions?.includes('1280x960')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1280x960' ? undefined : '1280x960'))
                                        } else {
                                            dispatch(toggleResolutionExact('1280x960'))
                                        }
                                    }}
                                >1280 x 960</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1600x1200' : !query.resolutions?.includes('1600x1200')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1600x1200' ? undefined : '1600x1200'))
                                        } else {
                                            dispatch(toggleResolutionExact('1600x1200'))
                                        }
                                    }}
                                >1600 x 1200</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1920x1440' : !query.resolutions?.includes('1920x1440')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1920x1440' ? undefined : '1920x1440'))
                                        } else {
                                            dispatch(toggleResolutionExact('1920x1440'))
                                        }
                                    }}
                                >1920 x 1440</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '2560x1920' : !query.resolutions?.includes('2560x1920')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '2560x1920' ? undefined : '2560x1920'))
                                        } else {
                                            dispatch(toggleResolutionExact('2560x1920'))
                                        }
                                    }}
                                >2560 x 1920</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3840x2880' : !query.resolutions?.includes('3840x2880')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3840x2880' ? undefined : '3840x2880'))
                                        } else {
                                            dispatch(toggleResolutionExact('3840x2880'))
                                        }
                                    }}
                                >3840 x 2880</Select.Option>
                            </Select.Group>
                            <Select.Group name="5:4" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1280x1024' : !query.resolutions?.includes('1280x1024')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1280x1024' ? undefined : '1280x1024'))
                                        } else {
                                            dispatch(toggleResolutionExact('1280x1024'))
                                        }
                                    }}
                                >1280 x 1024</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1600x1280' : !query.resolutions?.includes('1600x1280')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1600x1280' ? undefined : '1600x1280'))
                                        } else {
                                            dispatch(toggleResolutionExact('1600x1280'))
                                        }
                                    }}
                                >1600 x 1280</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '1920x1536' : !query.resolutions?.includes('1920x1536')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '1920x1536' ? undefined : '1920x1536'))
                                        } else {
                                            dispatch(toggleResolutionExact('1920x1536'))
                                        }
                                    }}
                                >1920 x 1536</Select.Option>
                                <Select.Option 
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '2560x2048' : !query.resolutions?.includes('2560x2048')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '2560x2048' ? undefined : '2560x2048'))
                                        } else {
                                            dispatch(toggleResolutionExact('2560x2048'))
                                        }
                                    }}
                                >2560 x 2048</Select.Option>
                                <Select.Option
                                    disabled={resolutionMode === 'atleast' ? query.atleast !== '3840x3072' : !query.resolutions?.includes('3840x3072')}
                                    onPress={() => {
                                        if (resolutionMode === 'atleast') {
                                            dispatch(setResolutionAtleast(query.atleast === '3840x3072' ? undefined : '3840x3072'))
                                        } else {
                                            dispatch(toggleResolutionExact('3840x3072'))
                                        }
                                    }}
                                >3840 x 3072</Select.Option>
                            </Select.Group>
                        </Select>
                        <Select
                            name="Ratio"
                            style={{
                                marginLeft: 2.5,
                            }}
                        >
                            <Select.Group name="Wide (Desktop)" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('16x9')}
                                    onPress={() => {
                                        dispatch(toggleRatio('16x9'))
                                    }}
                                >16 x 9</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('16x10')}
                                    onPress={() => {
                                        dispatch(toggleRatio('16x10'))
                                    }}
                                >16 x 10</Select.Option>
                            </Select.Group>
                            <Select.Group name="UltraWide (Desktop)" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('21x9')}
                                    onPress={() => {
                                        dispatch(toggleRatio('21x9'))
                                    }}
                                >21 x 9</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('32x9')}
                                    onPress={() => {
                                        dispatch(toggleRatio('32x9'))
                                    }}
                                >32 x 9</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('48x9')}
                                    onPress={() => {
                                        dispatch(toggleRatio('48x9'))
                                    }}
                                >48 x 9</Select.Option>
                            </Select.Group>
                            <Select.Group name="Portrait (Mobile)" style={{marginBottom: 12}}>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('9x16')}
                                    onPress={() => {
                                        dispatch(toggleRatio('9x16'))
                                    }}
                                >9 x 16</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('10x16')}
                                    onPress={() => {
                                        dispatch(toggleRatio('10x16'))
                                    }}
                                >10 x 16</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('9x18')}
                                    onPress={() => {
                                        dispatch(toggleRatio('9x18'))
                                    }}
                                >9 x 18</Select.Option>
                            </Select.Group>
                            <Select.Group name="Square (iPad or old monitors)" style={{marginBottom: 12}}>
                                <Select.Option
                                    disabled={!query.ratios?.includes('1x1')}
                                    onPress={() => {
                                        dispatch(toggleRatio('1x1'))
                                    }}
                                >1 x 1</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('3x2')}
                                    onPress={() => {
                                        dispatch(toggleRatio('3x2'))
                                    }}
                                >3 x 2</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('4x3')}
                                    onPress={() => {
                                        dispatch(toggleRatio('4x3'))
                                    }}
                                >4 x 3</Select.Option>
                                <Select.Option 
                                    disabled={!query.ratios?.includes('5x4')}
                                    onPress={() => {
                                        dispatch(toggleRatio('5x4'))
                                    }}
                                >5 x 4</Select.Option>
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
                                <ColorButton color="#660000" 
                                    isSelected={query.colors?.includes('#660000')}
                                    onPress={() => {
                                        dispatch(toggleColor('#660000'))
                                    }}
                                />
                                <ColorButton color="#990000" 
                                    isSelected={query.colors?.includes('#990000')}
                                    onPress={() => {
                                        dispatch(toggleColor('#990000'))
                                    }}
                                />
                                <ColorButton color="#cc0000" 
                                    isSelected={query.colors?.includes('#cc0000')}
                                    onPress={() => {
                                        dispatch(toggleColor('#cc0000'))
                                    }}
                                />
                                <ColorButton color="#cc3333" 
                                    isSelected={query.colors?.includes('#cc3333')}
                                    onPress={() => {
                                        dispatch(toggleColor('#cc3333'))
                                    }}
                                />
                                <ColorButton color="#ea4c88" 
                                    isSelected={query.colors?.includes('#ea4c88')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ea4c88'))
                                    }}
                                />
                                <ColorButton color="#993399" 
                                    isSelected={query.colors?.includes('#993399')}
                                    onPress={() => {
                                        dispatch(toggleColor('#993399'))
                                    }}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#663399" 
                                    isSelected={query.colors?.includes('#663399')}
                                    onPress={() => {
                                        dispatch(toggleColor('#663399'))
                                    }}
                                />
                                <ColorButton color="#333399" 
                                    isSelected={query.colors?.includes('#333399')}
                                    onPress={() => {
                                        dispatch(toggleColor('#333399'))
                                    }}
                                />
                                <ColorButton color="#0066cc" 
                                    isSelected={query.colors?.includes('#0066cc')}
                                    onPress={() => {
                                        dispatch(toggleColor('#0066cc'))
                                    }}
                                />
                                <ColorButton color="#0099cc" 
                                    isSelected={query.colors?.includes('#0099cc')}
                                    onPress={() => {
                                        dispatch(toggleColor('#0099cc'))
                                    }}
                                />
                                <ColorButton color="#66cccc"
                                    isSelected={query.colors?.includes('#66cccc')}
                                    onPress={() => {
                                        dispatch(toggleColor('#66cccc'))
                                    }}
                                />
                                <ColorButton color="#77cc33" 
                                    isSelected={query.colors?.includes('#77cc33')}
                                    onPress={() => {
                                        dispatch(toggleColor('#77cc33'))
                                    }}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#669900" 
                                    isSelected={query.colors?.includes('#669900')}
                                    onPress={() => {
                                        dispatch(toggleColor('#669900'))
                                    }}
                                />
                                <ColorButton color="#336600" 
                                    isSelected={query.colors?.includes('#336600')}
                                    onPress={() => {
                                        dispatch(toggleColor('#336600'))
                                    }}
                                />
                                <ColorButton color="#666600" 
                                    isSelected={query.colors?.includes('#666600')}
                                    onPress={() => {
                                        dispatch(toggleColor('#666600'))
                                    }}
                                />
                                <ColorButton color="#999900" 
                                    isSelected={query.colors?.includes('#999900')}
                                    onPress={() => {
                                        dispatch(toggleColor('#999900'))
                                    }}
                                />
                                <ColorButton color="#cccc33" 
                                    isSelected={query.colors?.includes('#cccc33')}
                                    onPress={() => {
                                        dispatch(toggleColor('#cccc33'))
                                    }}
                                />
                                <ColorButton color="#ffff00" 
                                    isSelected={query.colors?.includes('#ffff00')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ffff00'))
                                    }}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12}}>
                                <ColorButton color="#ffcc33" 
                                    isSelected={query.colors?.includes('#ffcc33')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ffcc33'))
                                    }}
                                />
                                <ColorButton color="#ff9900" 
                                    isSelected={query.colors?.includes('#ff9900')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ff9900'))
                                    }}
                                />
                                <ColorButton color="#ff6600" 
                                    isSelected={query.colors?.includes('#ff6600')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ff6600'))
                                    }}
                                />
                                <ColorButton color="#cc6633" 
                                    isSelected={query.colors?.includes('#cc6633')}
                                    onPress={() => {
                                        dispatch(toggleColor('#cc6633'))
                                    }}
                                />
                                <ColorButton color="#996633" 
                                    isSelected={query.colors?.includes('#996633')}
                                    onPress={() => {
                                        dispatch(toggleColor('#996633'))
                                    }}
                                />
                                <ColorButton color="#663300" 
                                    isSelected={query.colors?.includes('#663300')}
                                    onPress={() => {
                                        dispatch(toggleColor('#663300'))
                                    }}
                                />
                            </View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24}}>
                                <ColorButton color="#000000" 
                                    isSelected={query.colors?.includes('#000000')}
                                    onPress={() => {
                                        dispatch(toggleColor('#000000'))
                                    }}
                                />
                                <ColorButton color="#999999" 
                                    isSelected={query.colors?.includes('#999999')}
                                    onPress={() => {
                                        dispatch(toggleColor('#999999'))
                                    }}
                                />
                                <ColorButton color="#cccccc" 
                                    isSelected={query.colors?.includes('#cccccc')}
                                    onPress={() => {
                                        dispatch(toggleColor('#cccccc'))
                                    }}
                                />
                                <ColorButton color="#ffffff" 
                                    isSelected={query.colors?.includes('#ffffff')}
                                    onPress={() => {
                                        dispatch(toggleColor('#ffffff'))
                                    }}
                                />
                                <ColorButton color="#424153" 
                                    isSelected={query.colors?.includes('#424153')}
                                    onPress={() => {
                                        dispatch(toggleColor('#424153'))
                                    }}
                                />
                                <ColorButton color="" reset isSelected
                                    onPress={() => {
                                        dispatch(clearColors())
                                    }}
                                />
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
                            <Select.Group style={{marginBottom: 12}}>
                                <Select.Option
                                    disabled={query.sorting !== 'relevance'}
                                    onPress={() => {
                                        dispatch(setSorting('relevance'))
                                    }}
                                >Relevance</Select.Option>
                                <Select.Option
                                    disabled={query.sorting !== 'random'}
                                    onPress={() => {
                                        dispatch(setSorting('random'))
                                    }}
                                >Random</Select.Option>
                                <Select.Option
                                    disabled={query.sorting !== 'views'}
                                    onPress={() => {
                                        dispatch(setSorting('views'))
                                    }}
                                >Views</Select.Option>
                                <Select.Option
                                    disabled={query.sorting !== 'favorites'}
                                    onPress={() => {
                                        dispatch(setSorting('favorites'))
                                    }}
                                >Favorites</Select.Option>
                            </Select.Group>
                        </Select>
                        <Select
                            name="Order"
                            style={{
                                marginLeft: 2.5,
                                marginRight: 2.5
                            }}
                        >
                            <Toggle style={{marginBottom: 12}}>
                                <ToggleButton 
                                    disabled={query.order !== 'asc'}
                                    onPress={() => {
                                        dispatch(setOrder('asc'))
                                    }}
                                >
                                    <Ionicons name="arrow-up-outline" size={20} />
                                    Ascending
                                </ToggleButton>
                                <ToggleButton 
                                    disabled={query.order !== 'desc'}
                                    onPress={() => {
                                        dispatch(setOrder('desc'))
                                    }}
                                >
                                    <Ionicons name="arrow-down-outline" size={20} />
                                    Descending
                                </ToggleButton>
                            </Toggle>
                        </Select>
                        {query.sorting === 'toplist' && (
                            <Select
                                name="Range"
                                style={{
                                    marginLeft: 2.5,
                                }}
                            >
                                <Select.Group style={{marginBottom: 12}}>
                                    <Select.Option 
                                        disabled={query.topRange !== '1d'}
                                        onPress={() => {
                                            dispatch(setTopRange('1d'))
                                        }}
                                    >Last Day</Select.Option>
                                    <Select.Option
                                        disabled={query.topRange !== '3d'}
                                        onPress={() => {
                                            dispatch(setTopRange('3d'))
                                        }}
                                    >Last 3 Days</Select.Option>
                                    <Select.Option 
                                        disabled={query.topRange !== '1w'}
                                        onPress={() => {
                                            dispatch(setTopRange('1w'))
                                        }}
                                    >Last Week</Select.Option>
                                    <Select.Option 
                                        disabled={query.topRange !== '1M'}
                                        onPress={() => {
                                            dispatch(setTopRange('1M'))
                                        }}
                                    >Last Month</Select.Option>
                                    <Select.Option 
                                        disabled={query.topRange !== '3M'}
                                        onPress={() => {
                                            dispatch(setTopRange('3M'))
                                        }}
                                    >Last 3 Months</Select.Option>
                                    <Select.Option 
                                        disabled={query.topRange !== '6M'}
                                        onPress={() => {
                                            dispatch(setTopRange('6M'))
                                        }}
                                    >Last 6 Months</Select.Option>
                                    <Select.Option 
                                        disabled={query.topRange !== '1y'}
                                        onPress={() => {
                                            dispatch(setTopRange('1y'))
                                        }}
                                    >Last Year</Select.Option>
                                </Select.Group>
                            </Select>
                        )}
                    </View>
                    <Button 
                        variant="primary" 
                        style={{
                            marginBottom: 10,
                        }}
                        onPress={() => {
                            onApply()
                        }}
                    >
                        Apply
                    </Button>
                </BottomSheetModal>
        </BottomSheetModalProvider>
    )
})

export default FeedSettings