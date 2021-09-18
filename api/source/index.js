/* eslint-disable linebreak-style */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { request, response } = require('express');
const dboperations = require('./operations/dboperations');

const Db = require('./operations/dboperations');
const ItProc = require('./tables/ITPROC');
const Activity = require('./tables/ACTIVITY');
const Factor = require('./tables/FACTOR');
const FactorRisk = require('./tables/FACTORRISK');
const Reduction = require('./tables/REDUCTION');
const Result = require('./tables/RESULT');
const Risk = require('./tables/RISK');

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api', router);

router.use((request, response, next) => {
  // console.log('middleware');
  next();
});

router.route('/itProcAll').get((request, response) => {
  dboperations.getItProc().then((result) => {
    response.json(result[0]);
  });
});

router.route('/itProc/:id').get((request, response) => {
  dboperations.getItProcById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/itProcAll').post((request, response) => {
  const itProc = { ...request.body };

  dboperations.addItProc(itProc).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/factorsAll').get((request, response) => {
  dboperations.getFactor().then((result) => {
    response.json(result[0]);
  });
});

router.route('/factor/:id').get((request, response) => {
  dboperations.getFactorById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/activityAll').get((request, response) => {
  dboperations.getActivity().then((result) => {
    response.json(result[0]);
  });
});

router.route('/activity/:id').get((request, response) => {
  dboperations.getActivityById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorsRiskAll').get((request, response) => {
  dboperations.getFactorRisk().then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorRisk/:id').get((request, response) => {
  dboperations.getFactorRiskById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/reductionAll').get((request, response) => {
  dboperations.getReduction().then((result) => {
    response.json(result[0]);
  });
});

router.route('/reduction/:id').get((request, response) => {
  dboperations.getReductionById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/resultAll').get((request, response) => {
  dboperations.getResult().then((result) => {
    response.json(result[0]);
  });
});

router.route('/result/:id').get((request, response) => {
  dboperations.getResultById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/riskAll').get((request, response) => {
  dboperations.getRisk().then((result) => {
    response.json(result[0]);
  });
});

router.route('/risk/:id').get((request, response) => {
  dboperations.getRiskById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/riskbyprocess/:id').get((request, response) => {
  dboperations.getRiskByProcess(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorRiskByRisk/:id').get((request, response) => {
  dboperations.getFactorRiskByRisk(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/reductionByFactorRisk/:id').get((request, response) => {
  dboperations.getReductionByFactorRisk(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/activitybyfactor/:id').get((request, response) => {
  dboperations.getActivityByfactor(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

const port = process.env.PORT || 8090;
app.listen(port);
console.log(`ItProc API is running at ${port}`);
