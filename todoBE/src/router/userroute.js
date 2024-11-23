import express from 'express';
import { Signup, Login,addTask,editTask,editStatus,deleteTask,getTask } from '../controller/usercontroller.js';
const router = express.Router();

router.post('/signup',Signup );  // ✅
router.post('/login',Login );  // ✅
router.post('/addtask',addTask );  // ✅
router.post('/gettask',getTask );  // ✅
router.post('/edittask',editTask );  // ✅
router.post('/editstatus',editStatus );  // ✅
router.post('/deletetask',deleteTask );  // ✅

export default router;



