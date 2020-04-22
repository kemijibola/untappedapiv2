import MongodataAccess = require("../MongodataAccess");
import { Schema } from "mongoose";
const mongooseConnection = MongodataAccess.mongooseConnection;
import { IRolePermission } from "../../models/interfaces";

const rolePermissionSchema: Schema = new Schema(
  {
    role: { type: Schema.Types.ObjectId, ref: "Role", required: true },
    permission: {
      type: Schema.Types.ObjectId,
      ref: "Permission",
      required: true,
    },
    userType: { type: Schema.Types.ObjectId, ref: "UserType", required: true },
    application: {
      type: Schema.Types.ObjectId,
      ref: "Application",
    },
  },
  { timestamps: true }
);
export const RolePermissionSchema = mongooseConnection.model<IRolePermission>(
  "RolePermission",
  rolePermissionSchema
);
