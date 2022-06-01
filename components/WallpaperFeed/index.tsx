import { FlatList } from "react-native-gesture-handler"
import { Wallpaper } from "../../lib/types/Wallpaper"

import WallpaperItem from "./WallpaperItem"

const WallpaperFeed = (
    {
        wallpapers,
        onEndReached,
    }: {
        wallpapers: Wallpaper[],
        onEndReached?: () => void,
    }
) => {
    return (
        <FlatList 
            data={wallpapers}
            keyExtractor={(wallpaper) => wallpaper.id}
            renderItem={({ item }) => <WallpaperItem wallpaper={item} />}

            onEndReached={onEndReached}
            onEndReachedThreshold={1}

            pagingEnabled={true}
            snapToAlignment="center"
            decelerationRate={'fast'}

            maxToRenderPerBatch={2}
            initialNumToRender={2}
        />
    )
}

export default WallpaperFeed