import { ICategory } from '../Category';

export interface IProfile {
  phoneNumbers: string[];
  location: string;
  categories: ICategory[];
}
