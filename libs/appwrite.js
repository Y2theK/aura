import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
export const config = {
    endpoint: "https://cloud.appwrite.io/v1",
    platform: "com.y2thek.aura",
    projectId: "675a8887000cf38f037a",
    databaseId: "675a89db0024c13bbf1e",
    userCollectionId: "675a89f5000d6fa0593e",
    videoCollectionId: "675a8a0d001b3a936a88",
    storageId: "675a8bb8002c83a44c88"
}
// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatar = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, name) => {
    try {
        //create new account
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            name
        )
        if(!newAccount) throw Error;

        // generate avatar
        const avatarUrl = avatar.getInitials(name);
        
        //sign in
        await signIn(email,password);

        //create new user with new account
        const newUser = await databases.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                name,
                avatar: avatarUrl
            }
        )

        return newUser;

    } catch (error) {
        console.log(error);
        throw new Error(error)
        
    }    
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {   
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId' , currentAccount.$id)]
        );

        if(!currentUser) throw Error;

        return currentUser;
        
    } catch (error) {
        console.log(error);
        
    }
}

// Get all video Posts
export async function getAllPosts() {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

// Get latest created video posts
export async function getLatestPosts() {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.orderDesc("$createdAt"), Query.limit(7)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
  }