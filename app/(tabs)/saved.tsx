import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons} from "@/constants/icons";
import {images} from "@/constants/images";

const Saved = () => {
    return (
        <View className="flex-1  bg-primary justify-center ">
            <Image source={images.bg} className="absolute top-0 w-full z-0" resizeMode="cover"/>
            <ScrollView className="flex-1 "
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{minHeight: "100%" , paddingBottom: 10}}>
                <Image source={icons.logo} className="w-12 h-10 mt-20 mb-5 mx-auto" />
            </ScrollView>
        </View>
    );
};

export default Saved;

const styles = StyleSheet.create({});
