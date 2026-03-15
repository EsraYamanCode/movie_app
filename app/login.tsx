import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useState } from 'react';
import { Stack, useRouter } from 'expo-router';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';
import { login, register } from '@/services/appwrite';

const Login = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleLogin = async () => {
    try {
      await login(email, password);
      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = async () => {
    try {
      await register(name, email, password);
      await login(email, password);
      router.replace("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View className="flex-1 bg-primary justify-center ">
        <Stack.Screen options={{ headerShown: false }} />
        <Image source={images.bg} className="absolute top-0 w-full z-0" resizeMode="cover" />
      
        <Image source={icons.logo} className="w-12 h-10  mb-5 mx-auto" />

        <View className="bg-white w-full p-5 rounded-xl shadow-lg">
          <Text className="text-2xl font-bold mb-5 text-center">Login</Text>

        <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            className="border p-3 mb-4 rounded"
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            className="border p-3 mb-4 rounded"
          />
          <TextInput
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="border p-3 mb-4 rounded"
          />

          <TouchableOpacity
            onPress={handleLogin}
            className="bg-primary p-3 rounded"
          >
            <Text className="text-white text-center font-bold">Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegister}
            className="bg-primary p-3 rounded mt-4"
          >
            <Text className="text-white text-center font-bold">Register</Text>
          </TouchableOpacity>

        </View>
      
    </View>
  );
};

export default Login;