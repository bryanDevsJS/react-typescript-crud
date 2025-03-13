# crud-react-mysql / 
``bash
Exercise from : https://youtu.be/y5NvOade3sk?si=O-ac9lcU091EAwoc
``
An exercise of react js with managing mysql database.

1. create folder frontEnd - npm create vite@latest
2. create server folder in root directory 
3. npm install express mysql cors
4. then create file inside server.js
``
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

const app = express();
app.use(cors());

app.listen(8081, () => {
    console.log('Server running on port 8081');
    });
``
5. add `"start": "nodemon server.js"` to package.json inside server folder "script" line