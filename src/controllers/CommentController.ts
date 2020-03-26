import { controller, post, requestValidators, use, get } from "../decorators";
import { Request, Response, NextFunction } from "express";
import { IComment, IReply } from "../app/models/interfaces";
import CommentBusiness = require("../app/business/CommentBusiness");
import { PlatformError } from "../utils/error";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requestValidator } from "../middlewares/ValidateRequest";
import { requireAuth } from "../middlewares/auth";

@controller("/v1/comments")
export class CommentController {
  @post("/")
  @use(requireAuth)
  @use(requestValidator)
  @requestValidators("media", "comment")
  async create(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IComment = req.body;
      item.user = req.user;
      const commentBusiness = new CommentBusiness();
      const result = await commentBusiness.create(item);
      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: result.error
          })
        );
      }
      return res.status(201).json({
        message: "Operation successful",
        data: result.data
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/:id/reply")
  @use(requestValidator)
  @requestValidators("reply")
  async postReply(req: RequestWithUser, res: Response, next: NextFunction) {
    try {
      const item: IReply = req.body;
      item.user = req.user;
      const commentBusiness = new CommentBusiness();
      const comment = await commentBusiness.findById(req.params.id);
      if (comment.error) {
        return next(
          new PlatformError({
            code: comment.responseCode,
            message: comment.error
          })
        );
      }
      if (comment.data) {
        comment.data.replies = [...comment.data.replies, item];
        const result = await commentBusiness.update(
          req.params.id,
          comment.data
        );
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error
            })
          );
        }
        return res.status(200).json({
          message: "Operation successful",
          data: result.data
        });
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @post("/:id/like")
  @use(requestValidator)
  async postCommentLike(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    try {
      const commentBusiness = new CommentBusiness();
      const comment = await commentBusiness.findById(req.params.id);
      if (comment.error) {
        return next(
          new PlatformError({
            code: comment.responseCode,
            message: comment.error
          })
        );
      }
      if (comment.data) {
        comment.data.likedBy = [...comment.data.likedBy, req.user];
        const result = await commentBusiness.update(
          req.params.id,
          comment.data
        );
        if (result.error) {
          return next(
            new PlatformError({
              code: result.responseCode,
              message: result.error
            })
          );
        }
        return res.status(200).json({
          message: "Operation successful",
          data: result.data
        });
      }
    } catch (err) {
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later."
        })
      );
    }
  }

  @get("/media/:id")
  @use(requestValidator)
  async fetchPreviewList(req: Request, res: Response, next: NextFunction) {
    try {
      let condition: any = {};
      condition.media = req.params.id;
      const commentBusiness = new CommentBusiness();
      const result = await commentBusiness.fetch(condition);

      if (result.error) {
        return next(
          new PlatformError({
            code: result.responseCode,
            message: `Error occured, ${result.error}`
          })
        );
      }
      return res.status(result.responseCode).json({
        message: "Media Operation successful",
        data: result.data
      });
    } catch (err) {
      console.log(err);
      return next(
        new PlatformError({
          code: 500,
          message: "Internal Server error occured. Please try again later"
        })
      );
    }
  }
}
