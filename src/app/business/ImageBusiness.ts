import ImageRepository from '../repository/ImageRepository';
import IImageBusiness = require('./interfaces/ImageBusiness');
import { IImage, ApprovalOperations, IApproval } from '../models/interfaces';
import { Result } from '../../utils/Result';
import { schedule } from '../../utils/TaskScheduler';
import { StateMachineArns } from '../models/interfaces/custom/StateMachineArns';

class ImageBusiness implements IImageBusiness {
  private _imageRepository: ImageRepository;

  constructor() {
    this._imageRepository = new ImageRepository();
  }

  async fetch(condition: any): Promise<Result<IImage[]>> {
    try {
      condition.isApproved = true;
      condition.isDeleted = false;
      const images = await this._imageRepository.fetch(condition);
      return Result.ok<IImage[]>(200, images);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findById(id: string): Promise<Result<IImage>> {
    try {
      if (!id) return Result.fail<IImage>(400, 'Bad request.');
      const criteria = {
        id,
        isApproved: true,
        isDeleted: false
      };
      const image = await this._imageRepository.findByIdCriteria(criteria);
      if (!image)
        return Result.fail<IImage>(404, `Image of Id ${id} not found`);
      else return Result.ok<IImage>(200, image);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findOne(condition: any): Promise<Result<IImage>> {
    try {
      if (!condition) return Result.fail<IImage>(400, 'Bad request.');
      condition.isApproved = true;
      condition.isDeleted = false;
      const image = await this._imageRepository.findByOne(condition);
      if (!image) return Result.fail<IImage>(404, `Image not found`);
      else return Result.ok<IImage>(200, image);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async findByCriteria(criteria: any): Promise<Result<IImage>> {
    try {
      if (!criteria) return Result.fail<IImage>(400, 'Bad request');
      criteria.isApproved = true;
      criteria.isDeleted = false;
      const image = await this._imageRepository.findByCriteria(criteria);
      if (!image) return Result.fail<IImage>(404, `Image not found`);
      else return Result.ok<IImage>(200, image);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async create(item: IImage): Promise<Result<any>> {
    try {
      item.isApproved = false;
      item.isDeleted = false;
      const newImage = await this._imageRepository.create(item);

      // create approval request
      const approvalRequest: IApproval = Object.assign({
        entity: newImage._id,
        operation: ApprovalOperations.ImageUpload,
        application: 'untappedpool.com'
      });

      await schedule(
        StateMachineArns.MediaStateMachine,
        newImage.createdAt,
        approvalRequest
      );
      return Result.ok<boolean>(201, true);
    } catch (err) {
      throw new Error(`InternalServer error occured.${err.message}`);
    }
  }

  async update(id: string, item: IImage): Promise<Result<IImage>> {
    try {
      const criteria = {
        id,
        isApproved: true,
        isDeleted: false
      };
      const image = await this._imageRepository.findByIdCriteria(criteria);
      if (!image)
        return Result.fail<IImage>(
          404,
          `Could not update image.Image with Id ${id} not found`
        );
      item.isApproved = image.isApproved;
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
