import ImageRepository from '../repository/ImageRepository';
import IImageBusiness = require('./interfaces/ImageBusiness');
import { IImage } from '../models/interfaces';
import { Result } from '../../utils/Result';

class ImageBusiness implements IImageBusiness {
  private _imageRepository: ImageRepository;

  constructor() {
    this._imageRepository = new ImageRepository();
  }

  async fetch(condition: any): Promise<Result<IImage[]>> {
    try {
      const images = await this._imageRepository.fetch(condition);
      return Result.ok<IImage[]>(200, images);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IImage>> {
    try {
      const image = await this._imageRepository.findById(id);
      if (!image)
        return Result.fail<IImage>(404, `Image of Id ${id} not found`);
      else return Result.ok<IImage>(200, image);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IImage>> {
    try {
      const image = await this._imageRepository.findByCriteria(criteria);
      if (!image) return Result.fail<IImage>(404, `Image not found`);
      else return Result.ok<IImage>(200, image);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IImage): Promise<Result<IImage>> {
    try {
      const newImage = await this._imageRepository.create(item);
      // TODO:: Create approval request
      return Result.ok<IImage>(201, newImage);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IImage): Promise<Result<IImage>> {
    try {
      const image = await this._imageRepository.findById(id);
      if (!image)
        return Result.fail<IImage>(
          404,
          `Could not update image.Image of Id ${id} not found`
        );
      const updateObj = await this._imageRepository.update(image._id, item);
      return Result.ok<IImage>(200, updateObj);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async delete(id: string): Promise<Result<boolean>> {
    try {
      const isDeleted = await this._imageRepository.delete(id);
      return Result.ok<boolean>(200, isDeleted);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }
}

Object.seal(ImageBusiness);
export = ImageBusiness;
