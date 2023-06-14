//@ts-check
import { Schema, model } from 'mongoose';
import monsoosePaginate from 'mongoose-paginate-v2';

const schema = new Schema({
  firstName: {
    type: String,
    required: true,
    max: 100,
  },
  lastName: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
    unique: true,
  },
  gender:{
    
  },
  grade:{
     type: Number,
    required: true,

  },
  group:{
     type: String,
    required: true,
    max: 100,
  }
});
schema.plugin(monsoosePaginate);
export const UserModel = model('users', schema);
