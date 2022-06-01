import { View , Text, TouchableOpacity} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

//@ts-ignore
import InsetShadow from './InsetShadow';

const Select = (
    {
        name,
        options, 
        onChange, 
        value,
        style,
    } : {
        name: string,
        options: string[],
        onChange: (e: any) => void,
        value: string[],
        style: any,
    }
) => {
    return (
        <TouchableOpacity style={{
            shadowColor: "rgba(127,127,127, 0.1)",
            shadowOffset: {
                width: 1,
                height: 1,
            },
            shadowOpacity: 1,
            shadowRadius: 0,

            elevation: 2,
            flex: 1,
            ...style
        }}>
            <InsetShadow
                shadowColor="rgba(0, 0, 0, 0.4)" 
                containerStyle={{
                    borderRadius: 5,
                    height: 'auto'
                }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: 'rgba(30,30,30,.5)',
                    paddingVertical: 6,
                    paddingHorizontal: 4,
                    borderRadius: 5
                }}>
                    <View style={{
                        height: 43,
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: '#fff',
                            marginRight: 4,
                            fontFamily: 'SourceSansPro_400Regular'
                        }}>{name}</Text>
                        <Ionicons name="caret-down" size={20} color="#fff" />
                    </View>
                </View>
            </InsetShadow>
        </TouchableOpacity>
    )
}

export default Select;
