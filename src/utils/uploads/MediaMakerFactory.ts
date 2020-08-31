import { AbstractMedia } from "./Uploader";
import { Image } from "./medias/Image";
import { Audio } from "./medias/Audio";
import { Video } from "./medias/Video";
import { PlatformError } from "../error";

export type MediaType = { [x: string]: AbstractMedia };

export class MediaMakerFactory {
  create(fileType: string): AbstractMedia {
    if (fileType === "image") {
      return new Image();
    }
    if (fileType === "audio") {
      return new Audio();
    }
    if (fileType === "video") {
      return new Video();
    } else {
      throw new PlatformError({
        code: 400,
        message: "mediaType is invalid.",
      });
    }
  }
}
