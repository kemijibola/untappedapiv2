export interface CommentViewModel {
  _id?: string;
  media: string;
  comment: string;
  user?: CommenterViewModel;
  replies?: ReplyViewModel[];
  likedBy?: LikedByViewModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReplyViewModel {
  _id?: string;
  user?: CommenterViewModel;
  reply: string;
}

export interface LikedByViewModel {
  _id: string;
  fullName: string;
}

export interface CommenterViewModel {
  _id: string;
  fullName: string;
  profileImagePath: string;
  fullProfileImagePath?: string;
}
