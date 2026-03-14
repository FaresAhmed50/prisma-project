import express from 'express';
import {bootstrap} from "./src/bootstrap.js";


const app = express();


bootstrap(app , express);

app.listen(3000 , () => {
    console.log('Server started on port 3000!');
})
