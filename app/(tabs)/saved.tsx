import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from '@/context/SavedMoviesContext';
import MovieCard from '@/components/MovieCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const Saved = () => {
    const { savedMovies, isLoading } = useSavedMovies();
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };
    return (
        <SafeAreaView className="flex-1 bg-primary">
            <Image
                source={images.bg}
                className="absolute top-0 w-full h-full z-0"
                resizeMode="stretch"
            />
            {isLoading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#FF9C01" />
                </View>
            ) : (
                <FlatList
                    data={savedMovies}
                    renderItem={({item})=> <MovieCard
                        id={item.movieId}
                        title={item.title}
                        poster_path={item.posterUrl}
                        vote_average={0}
                        release_date={""} adult={false} backdrop_path={""} genre_ids={[]} original_language={""}
                        original_title={""} overview={""} popularity={0} video={false} vote_count={0}
                    /> }
                    keyExtractor={(item) => item.id}
                    className="px-5"
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'center',
                        gap: 16,
                        marginVertical:16
                    }}
                    contentContainerStyle={{paddingBottom:100}}
                    ListHeaderComponent={() => (
                        <View className="items-center">
                            <Image
                                source={icons.logo}
                                className="w-12 h-10 mt-10 mb-5 mx-auto"
                                resizeMode="contain"
                            />
                            <Text className="text-white text-2xl font-bold mb-6">Kaydedilenler</Text>
                        </View>
                    )}
                    ListEmptyComponent={() => (
                        <View className="justify-center items-center mt-20 px-4">
                            <Image
                                source={icons.save}
                                className="size-16 opacity-30 mb-4"
                                tintColor="white"
                            />
                            <Text className="text-gray-400 text-center">
                                Henüz kaydedilmiş film yok.
                            </Text>
                        </View>
                    )}
                />
            )}
        </SafeAreaView>
    );
};

export default Saved;