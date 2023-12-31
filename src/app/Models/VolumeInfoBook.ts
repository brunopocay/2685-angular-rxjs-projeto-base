import { ImageLinks } from "./Interfaces";

export class VolumeInfoBook {
  title?: string;
  authors?: string[];
  publisher?: string;
  publishedDate?: string;
  description?: string;
  previewLink?: string;
  thumbnail?: ImageLinks;

  constructor(item) {
    this.title = item.volumeInfo?.title,
    this.authors = item.volumeInfo.authors,
    this.publisher = item.volumeInfo?.publishers,
    this.publishedDate = item.volumeInfo?.publishedDate,
    this.description = item.volumeInfo?.description,
    this.previewLink = item.volumeInfo?.previewLink,
    this.thumbnail = item.volumeInfo?.imageLinks?.thumbnail;
  }
}