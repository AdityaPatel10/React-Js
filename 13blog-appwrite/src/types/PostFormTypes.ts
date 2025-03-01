export interface Post {
    $id?: string;
    title?: string;
    slug?: string;
    content?: string;
    status?: string;
    featuredImg?: string;
}

export interface PostFormData {
    title: string;
    slug: string;
    content: string;
    status: string;
    image: FileList;
    featuredImg?: string;
}

export interface RootState {
    auth: {
        userData: {
            $id: string;
        };
    };
}