import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import { images } from "@/constants/images";
import { icons } from '@/constants/icons';
import { useState, useEffect } from "react";
import { getSavedMovies, getCurrentUser, logout} from "@/services/appwrite";
import { useRouter } from "expo-router";

const Profile = () => {
    const router = useRouter();

    const [user, setUser] = useState<any>(null);
    const [savedCount, setSavedCount] = useState<number>(0); // <-- kaydedilen film sayısı
    
    const handleLogout = async () => {
        await logout();
        router.replace("/login");
    };

    useEffect(() => {
        const checkUser = async () => {
            const currentUser = await getCurrentUser();
            if(!currentUser){
                router.replace("/login"); // login sayfasına gönder
            } else {
                setUser(currentUser);
            }
        };
        checkUser();
    }, []);

    useEffect(() => {
        const fetchSavedMovies = async () => {
            if(user){
                const movies = await getSavedMovies(user.$id); // userId’ye göre filtrele
                setSavedCount(movies.length);
            }
        };
        fetchSavedMovies();
    }, [user]);


    return(
        <View className='flex-1 bg-primary justify center'>
            <Image source={images.bg} className="flex-1 absolute w-full z-0" resizeMode="cover"/>
            <ScrollView className="flex-1 "
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{minHeight: "100%" , paddingBottom: 10}}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
                {user ? (
                    <>
                        <View className="mt-10 px-6">

                            <View className="bg-white rounded-2xl p-6 shadow-lg">

                                <View className="flex-row items-center mb-4">
                                    <Image source={icons.person} className="w-5 h-5 mr-3"/>
                                    <View>
                                        <Text className="text-gray-500 text-xs">Name</Text>
                                        <Text className="text-black font-semibold text-base">
                                            {user.name || "No Name"}
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center mb-4">
                                    <Image source={icons.mail} className="w-5 h-5 mr-3"/>
                                    <View>
                                        <Text className="text-gray-500 text-xs">Email</Text>
                                        <Text className="text-black font-semibold text-base">
                                            {user.email}
                                        </Text>
                                    </View>
                                </View>

                                <View className="flex-row items-center">
                                    <Image source={icons.save} className="w-5 h-5 mr-3"/>
                                    <View>
                                        <Text className="text-gray-500 text-xs">Saved Movies</Text>
                                        <Text className="text-black font-semibold text-base">
                                            {savedCount}
                                        </Text>
                                    </View>
                                </View>

                            </View>

                            <View >
                                <TouchableOpacity
                                    onPress={handleLogout}
                                    className="bg-red-500 p-3 rounded mt-6"
                                    >
                                        <Text className="text-white text-center font-bold">Logout</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                        
                        
                    </>
                ) : (
                    <Text className="text-white mt-4 text-center">You are not logged in</Text>
                )}
            </ScrollView>            
        </View>        
    )
}

export default Profile;