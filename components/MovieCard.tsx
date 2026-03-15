import {View, Text, TouchableOpacity, Image} from "react-native";
import React from "react";
import {Link} from "expo-router";
import {icons} from "@/constants/icons";

interface MovieCardProps {
    id?: number;
    movie_id?: number;
    poster_path?: string;
    poster_url?: string;
    title: string;
    vote_average: number;
    release_date?: string;
    onPress?: () => void; // <-- ekledik
}

const MovieCard = ({id, movie_id, poster_path, poster_url, title, vote_average, release_date, onPress}: MovieCardProps) => {
    return (
        <Link href={`/movies/${movie_id || id}`} asChild>
            <TouchableOpacity className="w-[30%]" onPress={onPress}>
                <Image
                    source={{
                        uri: poster_path
                            ? (poster_path.startsWith('http')
                                ? poster_path // Saved sayfasından geliyorsa (Tam link)
                                : `https://image.tmdb.org/t/p/w500${poster_path}`) // Ana sayfadan geliyorsa (Yarım link)
                            : 'https://placehold.co/600x400/1a1a1a/ffffff.png'
                    }}
                    className="w-full h-52 rounded-lg"
                    resizeMode="cover"
                />
                <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>{title}</Text>
                <View className="flex-row items-center justify-start gap-x-1">
                    <Image source={icons.star} className="size-4"/>
                    <Text className="text-xs text-white font-bold uppercase">{Math.round(vote_average/2)}</Text>
                </View>
                <View className="flex-row items-center justify-between">
                    <Text className="text-xs text-light-300 font-medium mt-1">{release_date?.split('-')[0]}</Text>
                    {/* <Text className="text-xs font-medium text-light-300 uppercase">Movie</Text> */}
                </View>
            </TouchableOpacity>
        </Link>
    )
}
export default MovieCard;