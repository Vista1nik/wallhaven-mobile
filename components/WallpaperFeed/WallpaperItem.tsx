import { Dimensions, Image } from "react-native";
import { Wallpaper } from "../../lib/types/Wallpaper";

const WallpaperItem = ({ wallpaper }: { wallpaper: Wallpaper}) => {
    return (
        <Image 
            source={{
                uri: wallpaper.path,
            }} 
            style={{
                width: Dimensions.get("window").width,
                height: Dimensions.get("window").height,
                backgroundColor: 'black',
            }}
            resizeMode="contain"
        />
    )
}

export default WallpaperItem;