import express from 'express'
import * as allRoutes from './modules/index.router.js'

const app = express()
import {config} from 'dotenv';
import { connectionDb } from './DB/connection.js';
config()
const port = process.env.PORT;
connectionDb()
const baseUrl = '/api/v1'
app.use(express.json());
app.use(`${baseUrl}/user`,allRoutes.userRouter );
app.use(`${baseUrl}/todo`,allRoutes.todoRouter );






app.listen(port,() => {
  console.log('server in cennected ...............')
}
)