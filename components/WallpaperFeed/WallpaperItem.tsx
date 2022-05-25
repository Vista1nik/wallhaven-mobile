import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'

import { useState } from "react";
import { ActivityIndicator, Alert, Dimensions, Image, Modal, Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Wallpaper } from "../../lib/types/Wallpaper";

const WallpaperItem = ({ wallpaper }: { wallpaper: Wallpaper}) => {
    const [loadingProgress, setLoadingProgress] = useState(0)
    const [loaded, setLoaded] = useState(false)

    const [downloading, setDownloading] = useState(false)

    const insets = useSafeAreaInsets()

    const download = () => {
        Alert.alert("Download this wallpaper?", "", [
            { text: "Cancel", onPress: () => console.log("Cancel Pressed"), style: "cancel" },
            { text: "OK", onPress: async () => {
                const {status} = await MediaLibrary.requestPermissionsAsync()

                if (status === 'granted') {
                    setDownloading(true)
                    try {
                        const localUri = await FileSystem.downloadAsync(wallpaper.path, FileSystem.cacheDirectory + wallpaper.id + '.' + wallpaper.file_type.split('/')[1])

                        console.log(localUri.uri)
                        const asset = await MediaLibrary.createAssetAsync(localUri.uri)
                        await MediaLibrary.createAlbumAsync("Wallpapers", asset, false)
                    } catch (error) {
                        alert(error)
                        setDownloading(false)
                    }
                    setDownloading(false)
                }
            } },
        ])
    }

    return (
        <Pressable onPress={download}>
            {downloading && (
                <Modal transparent={true}>
                    <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                    }}>
                        <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                padding: 12,
                                borderRadius: 999,
                        }}>
                            <ActivityIndicator />
                        </View>
                    </View>
                </Modal>
            )}
            {!loaded && (
                <View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                    zIndex: 999
                }}>
                    {loadingProgress !== 100 && (
                        <View 
                            style={{
                                position: 'absolute',
                                width: (Dimensions.get('window').width / 100) * loadingProgress,
                                height: 2,
                                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                                top: insets.top
                            }}
                        />
                    )}
                    <Image
                        source={{ uri: wallpaper.thumbs.original }}
                        style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
            )}
                <Image 
                    source={{
                        uri: wallpaper.path,
                    }}
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                        backgroundColor: '#171717',
                    }}
                    onProgress={(e) => {
                        setLoadingProgress(Math.floor((e.nativeEvent.loaded / e.nativeEvent.total) * 100))
                    }}
                    onLoad={() => {
                        setLoaded(true)
                    }}
                    resizeMode="contain"
                />
        </Pressable>
    )
}

export default WallpaperItem;