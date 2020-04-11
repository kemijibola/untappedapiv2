export interface CommentViewModel {
  _id?: string;
  media: string;
  comment: string;
  user?: CommenterViewModel;
  replies?: ReplyViewModel[];
  likedBy?: LikeViewModel[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ReplyViewModel {
  _id?: string;
  user?: CommenterViewModel;
  reply: string;
}

export interface LikeViewModel {
  _id: string;
  user: string;
}

export interface CommenterViewModel {
  _id: string;
  fullName: string;
  profileImagePath: string;
  fullProfileImagePath?: string;
}
