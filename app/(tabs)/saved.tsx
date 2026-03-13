import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import { icons } from "@/constants/icons";
const Saved = () => {
    
    return (
        <View className='bg-primary flex-1 px-10'>
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={icons.save} className='w-40 h-40 rounded-full' resizeMode='cover'/>
                <Text className='text-gray-500 text-base'>Save</Text>

            </View>
        </View>
    )
}

export default Saved;