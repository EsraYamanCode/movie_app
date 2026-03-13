import { View, Text, Image} from 'react-native';
import { icons } from "@/constants/icons";

const Profile = () => {
    return(
        <View className='bg-primary flex-1 px-10'>
            <View className='flex justify-center items-center flex-1 flex-col gap-5'>
                <Image source={icons.person} className='w-40 h-40 rounded-full' resizeMode='cover'/>
                <Text className='text-gray-500 text-base'>Profile</Text>

            </View>
        </View>
    )
}

export default Profile;