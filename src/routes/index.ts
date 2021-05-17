import { Router } from 'express';
import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
import { searchArtist } from './Artist';
import {artistAutoComplete} from "./artistAutoComplete";


const baseRouter = Router();


// User-route
const userRouter = Router();
userRouter.get('/all', getAllUsers);
userRouter.post('/add', addOneUser);
userRouter.put('/update', updateOneUser);
userRouter.delete('/delete/:id', deleteOneUser);
userRouter.get('/artist', searchArtist)
userRouter.get('/artistAutoComplete', artistAutoComplete)

// User-route
const artistRouter = Router();


// Register Routers
baseRouter.use('/users', userRouter);
baseRouter.use('/artist', userRouter);


// Export the base-router
export default baseRouter;
