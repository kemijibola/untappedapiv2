import BaseBusiness from "./base/BaseBusiness";
import { IUserAccount } from "../../models/interfaces";

interface UserAccountBusiness extends BaseBusiness<IUserAccount> {}
export = UserAccountBusiness;
