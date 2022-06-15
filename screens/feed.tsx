import { BottomSheetModal } from "@gorhom/bottom-sheet"
import { useEffect, useRef, useState } from "react"
import { ActivityIndicator, View, Text, Dimensions, Modal } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useSelector } from "react-redux"
import FeedSettings from "../components/feedSettings"
import TransparentIconButton from "../components/ui/TransparentIconButton"
import WallpaperFeed from "../components/WallpaperFeed"
import fetchWallpapers from "../lib/fetchWallpapers"
import { RootState } from "../state"

const Feed = ({ route, navigation }: any) => {
    const insets = useSafeAreaInsets()
    const feedSettingsModalRef = useRef<BottomSheetModal>();

    const query = useSelector((state: RootState) => state.query)

    const [wallpapers, setWallpapers] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    const fetchWallpapersAsync = async () => {
        try {
            const newWallpapers = await fetchWallpapers(query, page)
            setWallpapers(wallpapers => wallpapers.concat(newWallpapers))
            setLoading(false)
        }
        catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchWallpapersAsync()
    }, [page])

    const handleLoadMore = () => {
        setPage(page + 1)
    }

    const handleRefresh = () => {
        feedSettingsModalRef.current?.dismiss()
        setWallpapers([])
        setPage(1)
        setLoading(true)
        fetchWallpapersAsync()
    }

    return (
        <View style={{
            backgroundColor: '#171717',
        }}>
            {loading && (
                <Modal transparent>
                    <View style={{
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <View style={{
                            padding: 12,
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            borderRadius: 10,
                        }}>
                            <ActivityIndicator color={'#fff'} />
                        </View>
                    </View>
                </Modal>
            )}
            <View style={{
                position: 'absolute',
                flexDirection: 'row',
                justifyContent: 'space-between',
                top:  12 + insets.top,
                left: 12,
                right: 12,
                zIndex: 999
            }}>
                <TransparentIconButton icon="menu" onPress={() => {
                    navigation.push('Menu')
                }} />
                <TransparentIconButton icon="search" onPress={() => {
                    feedSettingsModalRef.current?.present()
                }} />
            </View>

            <WallpaperFeed 
                wallpapers={wallpapers} 
                onEndReached={handleLoadMore} 
            />
            <FeedSettings 
                ref={feedSettingsModalRef as any} 
                onApply={handleRefresh}
            />
        </View>
    )
}

export default Feed