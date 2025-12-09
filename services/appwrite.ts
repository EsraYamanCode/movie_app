import {Client, Databases, ID, Query, Account} from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID= process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;
const SAVED_DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_SAVED_DATABASE_ID!;
const SAVED_MOVIES_TABLE_ID= process.env.EXPO_PUBLIC_APPWRITE_SAVED_MOVIES_TABLE_ID!;

//console.log(DATABASE_ID, TABLE_ID);
const client = new Client()
client
    .setEndpoint('https://nyc.cloud.appwrite.io/v1')
    .setProject("691838ad001bde65a2d2")

const database = new Databases(client);
export const account = new Account(client);
export const updateSearchCount = async (query: string, movie: Movie) => {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal('searchTerm', query)
        ])
        if (result.documents.length > 0) {
            const existingMovie = result.documents[0];

            // @ts-ignore
            await database.updateDocument(
                DATABASE_ID,
                TABLE_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
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
    //check if a record of that search has already been stored
    //if a document is found increment the searchCount field
    //if no document is found c
        //create a new document in Appwrite database -> 1
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.limit(5),
            Query.orderDesc('count'),
        ])

        return result.documents as unknown as TrendingMovie[];

    } catch (error) {
        console.log(error);
        return undefined;
    }

}

// --- YENİ EKLENEN SAVED MOVIES FONKSİYONLARI ---

// 1. Kullanıcının kaydettiği filmleri getir
export const getSavedMovies = async (userId: string) => {
    try {
        const result = await database.listDocuments(
            SAVED_DATABASE_ID,
            SAVED_MOVIES_TABLE_ID,
            [Query.equal('userId', userId)]
        );
        return result.documents;
    } catch (error) {
        console.log("Kayıtlı filmler getirilemedi:", error);
        return [];
    }
};

// 2. Yeni film kaydet
export const saveMovieToDB = async (userId: string, movie: Movie) => {
    try {
        const payload = {
            userId: String(userId),
            movieId: String(movie.id),
            title: movie.title,
            posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        };

        const response = await database.createDocument(
            SAVED_DATABASE_ID,
            SAVED_MOVIES_TABLE_ID,
            ID.unique(),
            payload
        );
        return response;
    } catch (error) {
        console.log("Film kaydedilemedi:", error);
        throw error;
    }
};

// 3. Filmi listeden sil (Unsave)
// Dikkat: Burada movie.id değil, Appwrite'ın oluşturduğu documentId ($id) kullanılır.
export const deleteSavedMovieFromDB = async (documentId: string) => {
    try {
        await database.deleteDocument(
            SAVED_DATABASE_ID,
            SAVED_MOVIES_TABLE_ID,
            documentId
        );
        return true;
    } catch (error) {
        console.log("Film silinemedi:", error);
        throw error;
    }
};

// lib/appwrite.ts

export const createUser = async (email: string, password: string, username: string) => {
    try {
        // 1. Kullanıcıyı oluştur
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username
        );

        if (!newAccount) throw Error;

        // 2. HEMEN ARDINDAN OTOMATİK GİRİŞ YAP (Bu kısım eksik olabilir)
        // Kullanıcı oluştuğu an oturum da açıyoruz ki sayfayı yenilemeye gerek kalmasın.
        await signIn(email, password);

        return newAccount;
    } catch (error) {
        console.log("Kayıt hatası:", error);
        throw error;
    }
}

// signIn fonksiyonun zaten vardır ama emin olmak için kontrol et:
export const signIn = async (email: string, password: string) => {
    try {
        // Varsa eski oturumu sil (Güvenlik için)
        await account.deleteSession('current').catch(() => {});

        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log("Appwrite Giriş Hatası:", error);
        throw error;
    }
}

export class signOut {
}