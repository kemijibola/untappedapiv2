import ImageRepository from '../repository/ImageRepository';
import IImageBusiness = require('./interfaces/ImageBusiness');
import { IImage } from '../models/interfaces';
import { RecordNotFound } from '../../utils/error';

class ImageBusiness implements IImageBusiness {
  private _imageRepository: ImageRepository;

  constructor() {
    this._imageRepository = new ImageRepository();
  }

  fetch(): Promise<IImage> {
    return this._imageRepository.fetch();
  }

  findById(id: string): Promise<IImage> {
    return this._imageRepository.findById(id);
  }

  findByCriteria(criteria: any): Promise<IImage> {
    return this.findByCriteria(criteria);
  }

  create(item: IImage): Promise<IImage> {
    return this._imageRepository.create(item);
  }

  async update(id: string, item: IImage): Promise<IImage> {
    const imageModel = await this._imageRepository.findById(id);
    if (!imageModel)
      throw new RecordNotFound(`Image with id: ${id} not found`, 404);
    return this._imageRepository.update(imageModel._id, item);
  }

  delete(id: string): Promise<boolean> {
    return this._imageRepository.delete(id);
  }
}

Object.seal(ImageBusiness);
export = ImageBusiness;
