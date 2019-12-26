import { AbstractMedia } from "./Uploader";
import { Image } from "./medias/Image";
import { Audio } from "./medias/Audio";
import { Video } from "./medias/Video";

export type MediaType = { [x: string]: AbstractMedia };

export class MediaMakerFactory {
  create(fileType: string): AbstractMedia {
    if (fileType === "image") {
      return new Image();
    } else if (fileType === "audio") {
      return new Audio();
    } else if (fileType === "video") {
      return new Video();
    } else {
      throw new Error("Invalid typeOfFile");
    }
  }
}
