import UserTypeBusiness = require("../../app/business/UserTypeBusiness");
import { AppUsers } from "../../app/models/viewmodels";

export class TestClass {
  constructor() {}

  async fetchTalents() {
    const userTypeBusiness = new UserTypeBusiness();
    var talentsResult = await userTypeBusiness.findByCriteria({
      name: AppUsers.Talent
    });
  }
}
