import { AbstractMedia } from "./Uploader";
import { Image } from "./medias/Image";

export type MediaType = { [x: string]: AbstractMedia };

export class MediaMakerFactory {
  create(fileType: string): AbstractMedia {
    if (fileType === "image") return new Image();
    throw new Error("not found");
  }
}
