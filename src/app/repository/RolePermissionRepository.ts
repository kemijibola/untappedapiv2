import { IRolePermission } from "../models/interfaces";
import { RolePermissionSchema } from "../data/schema/RolePermission";
import RepositoryBase from "./base/RepositoryBase";

class RolePermissionRepository extends RepositoryBase<IRolePermission> {
  constructor() {
    super(RolePermissionSchema);
  }
}

Object.seal(RolePermissionRepository);
export = RolePermissionRepository;
