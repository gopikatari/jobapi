const express = require('express');
//security
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
//security -end
require('express-async-errors');
require('dotenv').config({ path: './config/.env' });

const connectDB = require('./db/connection');
const router = require('./routers/taskRouter');
const productRouter = require('./routers/productsRouter');
const notFound = require('./middlewares/notFound');
const authRouter = require('./routers/authRouter');
const { errorHandler } = require('./middlewares/errorHandler');
const jobRouter = require('./routers/jobRouter');
const authenticate = require('./middlewares/authMiddleware');

const app = express();

const PORT = process.env.PORT || 5000;

//Middlewars
app.set('trust proxy', 1);
app.use(rateLimit({ windowMs: 5 * 60 * 1000, max: 20 }));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

//Mddlewares

app.get('/info', async (req, res) => {
  res.status(200).json({
    message: `service JOB API is up and running...`,
  });
});

//routers end
// app.use('/api/tasks/v1', router);
// app.use('/api/products/v1', productRouter);
app.use('/api/auth/v1', authRouter);
app.use('/api/jobs/v1', authenticate, jobRouter);
//routers end

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI);
    app.listen(PORT, () => {
      console.log('Server started successfully....');
    });
  } catch (error) {
    console.log(error);
  }
};

start();
