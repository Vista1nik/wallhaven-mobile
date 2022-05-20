import { ActivityIndicator, View, Text } from "react-native"
import WallpaperFeed from "../components/WallpaperFeed"
import useSearch from "../lib/hooks/useSearch"

const Feed = () => {
    const {data, loading, error} = useSearch({})

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
            <WallpaperFeed wallpapers={data.data} />
        </View>
    )
}

export default Feed