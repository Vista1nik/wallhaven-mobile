import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useRef, useState } from "react"
import { ActivityIndicator, View, Text, Dimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import FeedSettings from "../components/feedSettings"
import TransparentIconButton from "../components/ui/TransparentIconButton"
import WallpaperFeed from "../components/WallpaperFeed"
import useSearch from "../lib/hooks/useSearch"

const Feed = () => {
    const insets = useSafeAreaInsets()
    const feedSettingsModalRef = useRef<BottomSheetModal>();

    const [wallpapers, setWallpapers] = useState([])
    const {data, loading, error, size, setSize} = useSearch({})

    if (loading) {
        return (
            <View>
                <ActivityIndicator />
            </View>
        )
    }

    if (error) {
        return (
            <View>
                <Text>{error}</Text>
            </View>
        )
    }

    return (
        <View>
            <View style={{
                position: 'absolute',
                top:  12 + insets.top,
                left: 12,
                zIndex: 999
            }}>
                <TransparentIconButton icon="md-settings" onPress={() => {
                    feedSettingsModalRef.current?.present()
                }} />
            </View>
            <WallpaperFeed wallpapers={data} onEndReached={() => setSize(size + 1)} />
            <FeedSettings ref={feedSettingsModalRef as any} />
        </View>
    )
}

export default Feed