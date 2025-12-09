import { View, Text, TouchableOpacity, TextInput, Alert, Image, ScrollView, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSavedMovies } from '@/context/SavedMoviesContext';
import { icons } from '@/constants/icons'; // İkonların
import { images } from '@/constants/images'; // Arka plan resmin

const Profile = () => {
    // Context'ten fonksiyonları çekiyoruz
    const { currentUser, loginUser, logoutUser, registerUser } = useSavedMovies();

    // Hangi ekrandayız? (true = Giriş Yap, false = Kayıt Ol)
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    // Form verileri
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Butona basınca çalışacak fonksiyon
    const handleSubmit = async () => {
        // 1. Boş alan kontrolü
        if (!email || !password) {
            Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
            return;
        }

        try {
            if (isLoginMode) {
                // --- GİRİŞ YAP ---
                await loginUser(email, password);
                Alert.alert("Başarılı", "Giriş yapıldı!");
            } else {
                // --- KAYIT OL ---
                await registerUser(email, password, username);
                Alert.alert("Başarılı", "Hesap oluşturuldu ve giriş yapıldı!");
            }
        } catch (error: any) {
            Alert.alert("İşlem Başarısız", "Bilgilerinizi kontrol edin. (Şifre en az 8 karakter olmalı)");
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Çıkış yapma fonksiyonu
    const handleLogout = async () => {
        await logoutUser();
        setEmail("");
        setPassword("");
        setUsername("");
    };

    return (
        <SafeAreaView className="flex-1 bg-primary">
            {/* Arka Plan Görseli */}
            <Image
                source={images.bg}
                className="absolute top-0 w-full h-full opacity-50"
                resizeMode="cover"
            />

            <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>

                {currentUser ? (
                    // ==========================================
                    // DURUM 1: KULLANICI ZATEN GİRİŞ YAPMIŞSA
                    // ==========================================
                    <View className="items-center w-full">
                        <View className="w-24 h-24 bg-white/10 rounded-full justify-center items-center mb-6 border border-secondary">
                            <Image source={icons.person} className="w-12 h-12" tintColor="#FF9C01"/>
                        </View>

                        <Text className="text-white text-3xl font-bold mb-1">{currentUser.name}</Text>
                        <Text className="text-gray-400 text-base mb-10">{currentUser.email}</Text>

                        <TouchableOpacity
                            onPress={handleLogout}
                            className="bg-red-500 w-full py-4 rounded-xl items-center"
                        >
                            <Text className="text-white font-bold text-lg">Çıkış Yap</Text>
                        </TouchableOpacity>
                    </View>

                ) : (
                    // ==========================================
                    // DURUM 2: GİRİŞ VEYA KAYIT EKRANI
                    // ==========================================
                    <View>
                        <Image source={icons.logo} className="w-20 h-20 mx-auto mb-6" resizeMode="contain"/>

                        <Text className="text-white text-2xl font-bold mb-8 text-center">
                            {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
                        </Text>

                        {/* Sadece Kayıt Modundaysa İsim Sor */}
                        {!isLoginMode && (
                            <View className="mb-4">
                                <Text className="text-gray-300 mb-2 ml-1">Kullanıcı Adı</Text>
                                <TextInput
                                    value={username}
                                    onChangeText={setUsername}
                                    className="bg-black/40 w-full h-14 px-4 rounded-xl border border-gray-700 text-white focus:border-secondary"
                                    placeholder="Adınız"
                                    placeholderTextColor="#7b7b8b"
                                />
                            </View>
                        )}

                        <View className="mb-4">
                            <Text className="text-gray-300 mb-2 ml-1">Email</Text>
                            <TextInput
                                value={email}
                                onChangeText={setEmail}
                                className="bg-black/40 w-full h-14 px-4 rounded-xl border border-gray-700 text-white focus:border-secondary"
                                placeholder="email@adresin.com"
                                placeholderTextColor="#7b7b8b"
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View className="mb-8">
                            <Text className="text-gray-300 mb-2 ml-1">Şifre</Text>
                            <TextInput
                                value={password}
                                onChangeText={setPassword}
                                className="bg-black/40 w-full h-14 px-4 rounded-xl border border-gray-700 text-white focus:border-secondary"
                                placeholder="******** (En az 8 karakter)"
                                placeholderTextColor="#7b7b8b"
                                secureTextEntry
                            />
                        </View>

                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={isLoading}
                            className="bg-orange-400 w-full h-14 rounded-xl items-center justify-center mb-6"
                        >
                            {isLoading ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text className="text-white font-bold text-lg">
                                    {isLoginMode ? "Giriş Yap" : "Kayıt Ol"}
                                </Text>
                            )}
                        </TouchableOpacity>

                        {/* Mod Değiştirme Linki */}
                        <View className="flex-row justify-center gap-x-1">
                            <Text className="text-gray-400">
                                {isLoginMode ? "Hesabın yok mu?" : "Zaten hesabın var mı?"}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLoginMode(!isLoginMode)}>
                                <Text className="text-orange-400 font-bold">
                                    {isLoginMode ? "Kayıt Ol" : "Giriş Yap"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Profile;