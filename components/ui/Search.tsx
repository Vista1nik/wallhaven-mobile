import { LinearGradient } from "expo-linear-gradient"
import { TextInput } from "react-native"
//@ts-ignore
import InsetShadow from './InsetShadow';

const Search = ({ onChange, value, style }: { onChange: (e: any) => void, value: string, style: any }) => {
    return (
        <LinearGradient
            colors={['#191919', '#1c1c1c']}
            style={{
                borderRadius: 3,
                ...style
            }}
        >
            <InsetShadow
                shadowColor="rgba(0, 0, 0, 0.4)" 
                containerStyle={{
                    borderRadius: 3,
                    height: 'auto',
                }}
            >
                <TextInput
                    placeholder="Search..."
                    placeholderTextColor="#9a9a9a"
                    onChange={onChange}
                    value={value}
                    style={{
                        padding: 12,
                        fontSize: 16,
                        color: '#fff',
                        fontFamily: 'SourceSansPro_400Regular'
                    }}
                />
            </InsetShadow>
        </LinearGradient>
    )
}

export default Search