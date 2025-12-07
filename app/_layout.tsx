import { Stack } from "expo-router";
import './globals.css';
import {State} from "react-native-gesture-handler";
import {StatusBar} from "react-native";
import { SavedMoviesProvider } from "@/context/SavedMoviesContext";
export default function RootLayout() {
  return(
      <SavedMoviesProvider>
          <StatusBar hidden={true}/>
      <Stack>
          <Stack.Screen
              name="(tabs)"
              options={{
                  headerShown: false,
              }}
          />
          <Stack.Screen
              name="movies/[id]"
              options={{
                  headerShown: false,
              }}
          />
      </Stack>
      </SavedMoviesProvider>
  )
}
