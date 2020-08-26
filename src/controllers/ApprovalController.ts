import { Request, Response, NextFunction } from "express";
import {
  controller,
  post,
  requestValidators,
  get,
  use,
  put,
  del,
  patch,
  authorize,
} from "../decorators";
import MediaBusiness = require("../app/business/MediaBusiness");
import {
  IMedia,
  MediaType,
  MediaUploadType,
  IAudio,
  IImage,
  IVideo,
  IMediaItem,
} from "../app/models/interfaces";
import { PlatformError } from "../utils/error";
import { RequestWithUser } from "../app/models/interfaces/custom/RequestHandler";
import { requireAuth } from "../middlewares/auth";
import uuid = require("uuid");
import { requestValidator } from "../middlewares/ValidateRequest";
import {
  canViewPendingMedia,
  canApproveMedia,
  canRejectMedia,
} from "../utils/lib/PermissionConstant";

@controller("/v1/admin")
export class ApprovalController {

}
