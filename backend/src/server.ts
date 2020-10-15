import express from 'express';
import path from 'path';
import 'express-async-errors';
import './database/connection';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(routes);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')))

app.listen(3333);

/*
    yarn typeorm migration:create -n create_orphanages
    yarn typeorm migration:create -n create_images
    yarn typeorm migration:run
    yarn typeorm migration:revert
*/