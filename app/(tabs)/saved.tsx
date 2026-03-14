import { View, Text, FlatList, Image, ActivityIndicator, ScrollView } from 'react-native';
import { icons } from "@/constants/icons";
import { images } from '@/constants/images';
import { useRouter } from 'expo-router';
import { getSavedMovies} from '@/services/appwrite';
import MovieCard from '@/components/MovieCard';
import { useEffect, useState } from 'react';

export default function Saved () {
    const router = useRouter();
    const [savedMovies, setSavedMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSaved = async () => {
            try {
                setLoading(true);
                const movies = await getSavedMovies(); // Appwrite'dan çek
                setSavedMovies(movies);
            } catch (err: any) {
                setError(err.message || "Error fetching saved movies");
            } finally {
                setLoading(false);
            }
        };
        fetchSaved();
    }, []);

    return (
        <View className="flex-1 bg-primary justify-center">
            <Image source={images.bg} className="absolute top-0 w-full z-0"/>
            
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />            
                
                {loading ? (
                    <ActivityIndicator size="large" color="#0000ff" className="mt-40 self-center" />
                ) : error ? (
                    <Text className="text-red-500 text-center mt-40 px-5">{error}</Text>
                ) : savedMovies.length === 0 ? (
                    <Text className="text-gray-500 text-center mt-40 px-5">No saved movies yet!</Text>
                ) : (
                    <FlatList                    
                        data={savedMovies}
                        keyExtractor={(item) => item.$id}
                        numColumns={3}
                        columnWrapperStyle={{
                            justifyContent: 'flex-start',
                            gap: 20,
                            paddingRight: 5,
                            marginBottom: 10
                        }}
                        renderItem={({ item }) => (
                            <MovieCard
                                id={item.movie_id}
                                title={item.title}
                                poster_path={item.poster_url}
                                release_date={item.release_date}
                                vote_average={item.vote_average}
                                onPress={() => router.push(`/movies/${item.movie_id}`)}
                            />
                        )}
                        contentContainerStyle={{ paddingTop: 20, paddingBottom: 50 }}
                        
                    />
                )}
            
        </View>
    
    )
}

