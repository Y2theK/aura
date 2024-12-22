import { Account, Avatars, Client, Databases, ID, Query,Storage } from 'react-native-appwrite';
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
const storage = new Storage(client);

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

        return currentUser.documents[0];
        
    } catch (error) {
        console.log(error);
        
    }
}

// Get all video Posts
export const getAllPosts = async () => {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.orderDesc("$createdAt")]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

// Get all video Posts
export const getSavedPosts = async (userId) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.contains('saved_users',userId),Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}


// Get search video posts
export const searchPosts = async (query) =>  {
    try {
      const posts = await databases.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.search('title',query)]
      );
  
      return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
}

// Get user's video posts
export const getUserPosts = async (userId) =>  {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal('creator',userId),Query.orderDesc("$createdAt")]
    );

    return posts.documents;
  } catch (error) {
    throw new Error(error);
  }
}

//sign out
export const signOut = async () =>  {
  try {
    
    const session = await account.deleteSession("current");

    return session;

  } catch (error) {
    throw new Error(error);
  }
}

// Get latest created video posts
export const getLatestPosts = async () => {
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

export const uploadFile = async (file, type) => {
  if(!file) return

  const { mimeType,...rest } = file;
  const asset = { type:mimeType,...rest };
  try {
    const uploadedFile = await storage.createFile(
      config.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id,type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

export const getFilePreview = async (fileId,type) => {
  let fileUrl;
  try {
    if(type === 'video') {
      fileUrl = await storage.getFileView(config.storageId,fileId)
    }else if(type === 'image'){
      fileUrl = await storage.getFilePreview(config.storageId,fileId,2000,2000,top,100)
    }else{
      throw new Error("Invalid file type");
    }

    if( !fileUrl) { 
      throw  Error;
    }

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  } 
}

export const createVideo = async (form) => {
  try {
    // we dont have to wait one after another file, we can do at the same time to reduce time since they are independance
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail,'image'),
      uploadFile(form.video,'video')
    ]);
    const newPost = await databases.createDocument(
      config.databaseId,
      config.videoCollectionId,
      ID.unique(),{
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}

export const savedVideoWithUser = async (videoId,userId) => {
  try {   
     const doc = await databases.getDocument(
      config.databaseId,
      config.videoCollectionId,
      videoId
    );

    const oldSavedUsers = doc.saved_users;
    
    let newSavedUsers = oldSavedUsers;
    newSavedUsers = oldSavedUsers.includes(userId) ? oldSavedUsers.filter((s) => s != userId) : [...newSavedUsers,userId]
    
    const video = await databases.updateDocument(
      config.databaseId,
      config.videoCollectionId,
      videoId,
      {
        'saved_users': newSavedUsers
      }
    );
    
    return video;
  } catch (error) {
    throw new Error(error);
  }
}