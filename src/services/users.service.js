import { UserModel } from '../DAO/models/users.model.js';

export class UserService {
  validateUser(firstName, lastName, email) {
    if (!firstName || !lastName || !email) {
      console.log('validation error: please complete firstName, lastname and email.');
      throw new Error('validation error: please complete firstName, lastname and email.');
    }
  }
  async getAll( page, limit ) {
    
    const users = await UserModel.paginate({}, { limit:limit || 5, page: page || 1 });
    console.log(users)
    return users;
  }
  async getById(_id) {
    const user = await UserModel.findOne({ _id: _id });
    return user;
  }
  async createOne(firstName, lastName, email ,group ,grade ,gender) {
    this.validateUser(firstName, lastName, email, group ,grade ,gender);
    const userCreated = await UserModel.create({ firstName, lastName, email, group ,grade ,gender});
    return userCreated;
  }

  async deletedOne(_id) {
    const deleted = await UserModel.deleteOne({ _id: _id });
    return deleted;
  }

  async updateOne(_id, firstName, lastName, email, group ,grade ,gender) {
    if (!_id) throw new Error('invalid _id');
    this.validateUser(firstName, lastName, email, group ,grade ,gender);
    const userUptaded = await UserModel.updateOne({ _id: _id }, { firstName, lastName, email, group ,grade ,gender });
    return userUptaded;
  }
}
