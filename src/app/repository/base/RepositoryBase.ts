import mongoose from "mongoose";
import IRead from "../interface/base/Read";
import IWrite from "../interface/base/Write";

class RepositoryBase<T extends mongoose.Document>
  implements IRead<T>, IWrite<T> {
  private _model: mongoose.Model<mongoose.Document>;

  constructor(schemaModel: mongoose.Model<mongoose.Document>) {
    this._model = schemaModel;
  }

  create(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.create(item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  createCommentWithUser(item: T): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.create(item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  populateFetch(path: string, condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate(path, "_id name")
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  // fetchWithDeepUserDetails(condition: any): Promise<any> {
  //   return new Promise((resolve, reject) => {
  //     this._model
  //       .find(condition, (error: any, result: any) => {
  //         if (error) reject(error);
  //         else resolve(result);
  //       })
  //       .populate("user", "_id fullName profileImagePath")
  //       // .cacheDocQueries({ collectionName: this._model.collection.name })
  //       .exec();
  //   });
  // }

  fetchFirstOrDefaultWithUser(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .findOne(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate("user", "_id fullName")
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchWithUser(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate("user", "_id fullName profileImagePath")
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchWithUserDetails(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate("user", "_id fullName email profileImagePath")
        .populate("likedBy", "_id fullName")
        .populate("replies.user", "_id fullName profileImagePath")
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchContestEntryWithContest(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate("contest", "_id title bannerImage views likedBy")
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchTransactionsOrderedByDate(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .sort({
          createdAt: -1,
        })
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchContestEntryPaginated(
    condition: any,
    page = 1,
    perPage = 10
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate("user", "_id fullName profileImagePath")
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({
          createdAt: -1,
        })
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchWithLimit(condition: any, limit = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .limit(limit)
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetchContests(condition: any, page = 1, perPage = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({
          endDate: "desc",
        })
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  paginatedFetch(condition: any, page = 1, perPage = 10): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        .skip(perPage * page - perPage)
        .limit(perPage)
        .sort({
          createdAt: -1,
        })
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  fetch(condition: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .find(condition, (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        })
        //.cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  update(_id: string, item: T): Promise<T> {
    const options = { new: true, useFindAndModify: false };
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        _id,
        item,
        options,
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  }

  patch(_id: string, item: any): Promise<T> {
    const options = { new: true, useFindAndModify: false };
    return new Promise((resolve, reject) => {
      this._model.findByIdAndUpdate(
        _id,
        item,
        options,
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });
  }
  insertMany(item: T[]): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model.insertMany(item, (error: any, result: any) => {
        if (error) reject(error);
        else resolve(result);
      });
    });
  }

  delete(_id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._model.deleteOne({ _id: this.toObjectId(_id) }, (err) => {
        if (err) reject(err);
        else resolve(true);
      });
      // .cache({ collectionName: this._model.collection.name });
    });
  }

  findByOne(condition = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne(condition, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findIdWithDetails(path: string, _id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model
        .findById(_id, (error: any, result: T) => {
          if (error) reject(error);
          else resolve(result);
        })
        .populate(path)
        // .cacheDocQueries({ collectionName: this._model.collection.name })
        .exec();
    });
  }

  findById(_id: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findById(_id, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findByIdCriteria(criteria = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findById(criteria, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  findByCriteria(criteria = {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne(criteria, (error: any, result: T) => {
        if (error) reject(error);
        else resolve(result);
      });
      // .cacheDocQuery({ collectionName: this._model.collection.name });
    });
  }

  private toObjectId(_id: string): mongoose.Types.ObjectId {
    return mongoose.Types.ObjectId.createFromHexString(_id);
  }

  deleteMany(criteria: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this._model.deleteMany(criteria, (error: any) => {
        if (error) reject(error);
        else resolve(true);
      });
    });
  }
}

export = RepositoryBase;
