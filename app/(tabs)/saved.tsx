import { View, Text, FlatList, Image, ActivityIndicator } from 'react-native';
import React, {useState} from 'react';
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import { useSavedMovies } from '@/context/SavedMoviesContext';
import MovieCard from '@/components/MovieCard';
import { SafeAreaView } from 'react-native-safe-area-context';

const Saved = () => {
    // Context'ten verileri çekiyoruz
    const { savedMovies, isLoading } = useSavedMovies();
    const [refreshing, setRefreshing] = useState(false);

    // Sayfa yenileme fonksiyonu (aşağı çekince)
    const onRefresh = async () => {
        setRefreshing(true);
        setTimeout(() => setRefreshing(false), 1000);
    };
    return (
        <SafeAreaView className="flex-1 bg-primary">

            {/* 1. SENİN TASARIMIN: Arka Plan Görseli */}
            {/* absolute ve z-0 ile en arkaya sabitliyoruz, h-full ekledik ki tüm ekranı kaplasın */}
            <Image
                source={images.bg}
                className="absolute top-0 w-full h-full z-0"
                resizeMode="stretch"
            />

            {/* Yükleniyor Göstergesi */}
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
                        vote_average={0} // Veritabanında yoksa 0
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

                    // 2. SENİN TASARIMIN: Logo (Listenin Başlığı Olarak)
                    ListHeaderComponent={() => (
                        <View className="items-center">
                            {/* Senin kodundaki stiller: w-12 h-10 mt-20 mb-5 */}
                            <Image
                                source={icons.logo}
                                className="w-12 h-10 mt-10 mb-5 mx-auto"
                                resizeMode="contain"
                            />
                            <Text className="text-white text-2xl font-bold mb-6">Kaydedilenler</Text>
                        </View>
                    )}

                    // Her bir film kartı
/*                    renderItem={({ item }) => (
                        <View className="mb-4">
                            <MovieCard
                                id={item.movieId}
                                title={item.title}
                                poster_path={item.posterUrl}
                                vote_average={0} // Veritabanında yoksa 0
                                release_date={""} adult={false} backdrop_path={""} genre_ids={[]} original_language={""}
                                original_title={""} overview={""} popularity={0} video={false} vote_count={0}                            />
                        </View>
                    )}*/

                    // Liste Boşsa Gösterilecek Kısım
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