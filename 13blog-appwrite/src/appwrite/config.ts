import { Client, Databases, ID, Query, Storage } from "appwrite";
import conf from "../conf/conf";
import { databaseTypes } from "../types/databaseTypes";

export class Service {
  private client: Client;
  private databases: Databases;
  private bucket: Storage;

  constructor() {
    this.client = new Client()
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createPost(postData: databaseTypes): Promise<any> {
    const { title, content, featuredImg, status, userId } = postData;

    // if (!slug) {
    //   console.error(
    //     "Appwrite service :: createPost :: error: Slug cannot be empty"
    //   );
    //   return false;
    // }

    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), // Use ID.unique() instead of slug if Appwrite requires it
        {
          title,
          content,
          featuredImg,
          status,
          userId,
        }
      );
    } catch (error) {
      console.error("Appwrite service :: createPost :: error: ", error);
      return false;
    }
  }

  async updatePost(
    slug: string,
    postData: Partial<databaseTypes>
  ): Promise<any> {
    const { title, content, featuredImg, status, userId } = postData; //+
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          //+
          title, //+
          content,
          featuredImg,
          status,
          userId, //+
        } //+
      );
    } catch (error) {
      console.error("Appwrite service :: updatePost :: error: ", error);
      return false;
    }
  }

  async deletePost(slug: string): Promise<boolean> {
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.error("Appwrite service :: deletePost :: error: ", error);
      return false;
    }
  }

  async getPost(slug: string): Promise<any> {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
    } catch (error) {
      console.error("Appwrite service :: getPost :: error: ", error);
      return false;
    }
  }

  async getPosts(
    queries: string[] = [Query.equal("status", "active")]
  ): Promise<any> {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.error("Appwrite service :: getPosts :: error: ", error);
      return false;
    }
  }

  async uploadFile(file: File): Promise<any> {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.error("Appwrite service :: uploadFile :: error: ", error);
      return false;
    }
  }

  async deleteFile(fileId: string): Promise<boolean> {
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.error("Appwrite service :: deleteFile :: error: ", error);
      return false;
    }
  }

  getFilePreview(fileId: string): string {
    return this.bucket.getFilePreview(conf.appwriteBucketId, fileId);
  }
}

const service = new Service();
export default service;
