import express from 'express';
import { UserModel } from '../DAO/models/users.model.js';
import { UserService } from '../services/users.service.js';

export const usersRouter = express.Router();

const Service = new UserService();

usersRouter.get('/', async (req, res) => {
    const { page, limit } = req.query;
  try {
    const dataUsers = await Service.getAll(page, limit);
    console.log(dataUsers);
    return res.status(200).json({
      status: 'success',
     payload: dataUsers.docs,
     totalPAges:dataUsers.totalPages,
     prevPages:dataUsers.prevPage,
     nextPages:dataUsers.nextPage,
     page:dataUsers.page,
     hasPrevPage:dataUsers. hasPrevPage,
     hasNextPage:dataUsers.hasNextPage,
     prevLink:dataUsers.hasNextPage?`http://localhost:3000/dataUsers/?page=${dataUsers.nextPage} ` : null,
     nextLink:dataUsers.hasNextPage?`http://localhost:3000/dataUsers/?page=${dataUsers.nextPage} `: null,


    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});
usersRouter.get('/:id', async (req, res) => {

try {
  const { id } = req.params;
 const user= await   Service.getById(id)
return user? 
 res.status(200).json({
    status: 'success',
    msg: 'user deleted',
    data: user,
  }):
   res.status(200).json({
    status: 'error',
    msg: 'user not found',                                                             
    data: user,
  })
} catch (e) {
  console.log(e);
  return res.status(500).json({
    status: 'error',
    msg: 'something went wrong :(',
    data: {},
  });
}
})
usersRouter.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, gender, grade, group } = req.body;
    const userCreated = await Service.createOne(firstName, lastName, email,  gender, grade, group);
    return res.status(201).json({
      status: 'success',
      msg: 'user created',
      data: userCreated,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Service.deletedOne(id)
    return res.status(200).json({
      status: 'success',
      msg: 'user deleted',
      data: {},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});

usersRouter.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const {firstName, lastName, email,  gender, grade, group } = req.body;

    await Service.updateOne(id,firstName, lastName, email,  gender, grade, group)
    return res.status(201).json({
      status: 'success',
      msg: 'user uptaded',
      data: {firstName, lastName, email, group ,grade ,gender},
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      status: 'error',
      msg: 'something went wrong :(',
      data: {},
    });
  }
});
