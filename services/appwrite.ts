import {Client, Databases, ID, Query, Account} from "react-native-appwrite";

const DATABASE_ID = "69296a54002ef8af61ef";
const COLLECTION_ID = "69296adb00196f203e09";
export const METRICS2_COLLECTION_ID = "69296adb00196f203e18";
//const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
//const COLLECTION_ID= process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

const client = new Client()
client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject("691838ad001bde65a2d2") //(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)

const database = new Databases(client);
export const account = new Account(client);

// Email ve password ile giriş
export const login = async (email: string, password: string) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    return session;
  } catch (error) {
    console.log("Login error:", error);
    throw error;
  }
};
export const register = async (name: string, email: string, password: string) => {
  try {
    const user = await account.create(
      ID.unique(),
      email,
      password,
      name
    );
    return user;

  } catch (error) {
    console.log("Register error:", error);
    throw error;
  }
};
// Mevcut kullanıcıyı getir
export const getCurrentUser = async () => {
  try {
    const user = await account.get();
    return user;
  } catch (error) {
    // Eğer login değilse hata dönecek
    return null;
  }
};

export const logout = async () => {
  try {
    await account.deleteSession("current");
  } catch (error) {
    console.log("Logout error:", error);
  }
};

export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.equal('searchTerm', query)
        ])
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            // @ts-ignore
            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[];

    } catch (error) {
        console.log(error);
        return undefined;
    }

}

export const checkSavedMovie = async (movieId: number, userId: string) => {

  const response = await database.listDocuments(
    DATABASE_ID,
    METRICS2_COLLECTION_ID,
    [
      Query.equal("movie_id", movieId), 
      Query.equal("user_id", userId)
    ]
  );

  return response.documents;

};

export const saveMovie = async (movie: any, userId?: string) => {
  if (!userId) throw new Error("User must be logged in to save a movie");
  const result = await database.createDocument(
    DATABASE_ID,
    METRICS2_COLLECTION_ID,
    ID.unique(),
    {
      movie_id: movie.id,
      title: movie.title,
      poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
      vote_average: movie.vote_average,
      release_date: movie.release_date,
      user_id: userId
    }
  );

  return result;

};

export const deleteSavedMovie = async (documentId: string) => {

  await database.deleteDocument(
    DATABASE_ID,
    METRICS2_COLLECTION_ID,
    documentId
  );

};

export const getSavedMovies = async (userId?: string) => {
    const queries: any[] = [];
    if (userId) queries.push(Query.equal("user_id", userId));

    const response = await database.listDocuments(
      DATABASE_ID,
      METRICS2_COLLECTION_ID,
      queries
    );
    return response.documents;
};