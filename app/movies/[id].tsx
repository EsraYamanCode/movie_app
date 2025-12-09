import {ScrollView, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {router, useLocalSearchParams} from "expo-router";
import {fetchMovieDetails} from "@/services/api";
import useFetch from "@/services/useFetch";
import {icons} from "@/constants/icons";
import {useSavedMovies} from "@/context/SavedMoviesContext";

interface MovieInfoProps {
    label: string;
    value?: string | number | null;

}

const MovieInfo = ({label, value}: MovieInfoProps) => (
    <View className="flex-col items-start justify-center mt-5">
        <Text className="text-light-200 font-normal text-sm">{label}</Text>
        <Text className="text-light-200 font-bold text-sm mt-2">{value || 'N/A'}</Text>
    </View>
)

const MovieDetails = () => {
    const {id} = useLocalSearchParams();
    const {data: movie} = useFetch(()=> fetchMovieDetails(id as string));
    const { savedMovies, toggleSaved } = useSavedMovies();
    const isSaved = savedMovies.some((m: any) => String(m.movieId) === String(movie?.id));
    const handleSavePress = () => {
        if (movie) {
            toggleSaved(movie);
        }
    };
    return (
        <View className="bg-primary flex-1">
            <ScrollView contentContainerStyle={{paddingBottom: 80}}>
                <View className="relative">
                    <Image source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
                           className="w-full h-[550px]"
                           resizeMode="stretch"
                    />
                </View>

                <TouchableOpacity
                    onPress={handleSavePress}
                    activeOpacity={0.7}
                    // absolute ile sağ üst köşeye sabitliyoruz (top-10 status bar payı için)
                    className="absolute top-12 right-6 z-50 p-3 bg-black/50 rounded-full justify-center items-center"
                >
                    <Image
                        source={icons.save}
                        className="size-6" // İkon boyutu
                        tintColor={isSaved ? "#FFD700" : "white"} // Kayıtlıysa SARI, değilse BEYAZ
                    />
                </TouchableOpacity>
                <View className="flex-col items-start justify-center mt-5 px-5">
                    <Text className=" text-white font-bold text-xl">{movie?.title}</Text>
                    <View className="flex-row items-center gap-x-1 mt-2">
                        <Text className="text-light-200 text-sm">{movie?.release_date?.split('-'[0])}</Text>
                        <Text className="text-light-200 text-sm">{movie?.runtime}m</Text>
                    </View>

                    <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
                        <Image source={icons.star} className="size-4" />
                        <Text className="text-white font-bold text-sm">
                            {Math.round(movie?.vote_average ?? 0)}/10
                        </Text>
                        <Text className="text-light-200 text-sm">
                            ({movie?.vote_count} votes)
                        </Text>
                    </View>

                    <MovieInfo label="Overview" value={movie?.overview} />
                    <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join('-') || 'N/A'} />
                    <View className="flex flex-row justify-between w-1/2">
                        <MovieInfo label="Budget" value={`$${((movie?.budget ?? 0) / 1_000_000).toFixed(1)} million`}/>
                        <MovieInfo label="Revenue" value={`$${((movie?.revenue ?? 0) / 1_000_000).toFixed(1)} million`} />
                    </View>
                    <MovieInfo label=" Production Companies" value={movie?.production_companies.map((c)=> c.name).join('-') || 'N/A'} />
                </View>
            </ScrollView>

            <TouchableOpacity className="absolute bottom-5 left-0 right-0 mx-5 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50" onPress={router.back}>
                <Image source={icons.arrow} className="size-5 mr-1 mt-0.5 rotate-180" tintColor="#fff" />
                <Text className="text-white font-semibold text-base">Go Back</Text>
            </TouchableOpacity>
        </View>
    );
};


//hataları düzelt


export default MovieDetails;


