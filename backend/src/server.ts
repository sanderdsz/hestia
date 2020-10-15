import express from 'express';
import './database/connection';
import routes from './routes'

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333);

/*
    yarn typeorm migration:create -n create_orphanages
    yarn typeorm migration:run
    yarn typeorm migration:revert
*/