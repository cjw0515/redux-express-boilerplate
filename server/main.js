import express from 'express';
import path from 'path';

import bodyParser from 'body-parser'; // PARSE HTML BODY

import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import morgan from 'morgan'; // HTTP REQUEST LOGGER

import mongoose from 'mongoose';
import session from 'express-session';

const app = express();
const port = 3000;
const devPort = 4000;

//app.use(morgan('dev'));
app.use(bodyParser.json());

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => { console.log('Connected to mongodb server'); });
// mongoose.connect('mongodb://username:password@host:port/database=');
mongoose.connect('mongodb://localhost/memoapp');

/* use session */
/*
app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));
*/
/* test */
/*
app.get('/', (req, res) => {
  res.send('test');
})
*/
app.use('/', express.static(path.join(__dirname, './../public')));

//app.use('/api', api);

//아래 작업을 하지 않으면, URL 을 직접 입력하여 들어갔을때 클라이언트사이드 라우팅이 제대로 작동하지 않는다. (링크를 클릭햇을때는 작동함.)
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './../public/index.html'));
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if(process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    );
}
