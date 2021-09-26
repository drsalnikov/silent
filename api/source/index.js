const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { request, response } = require('express');
//const dboperations = require('./operations/dboperations');
const getOperations = require('./operations/get/index');
const putOperations = require('./operations/put/index');
const postOperations = require('./operations/post/index');
const deleteOperations = require('./operations/delete/index');

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
  next();
});

router.route('/itProcAll').get((request, response) => {
  getOperations.getItProc().then((result) => {
    response.json(result[0]);
  });
});

router.route('/itProc/:id').get((request, response) => {
  getOperations.getItProcById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/itProcAll').post((request, response) => {
  const itProc = { ...request.body };
  postOperations.addItProc(itProc).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/itProcAll').put((request, response) => {
  const itProc = { ...request.body };
  putOperations.modifyItProc(itProc).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/itProc/:id').delete((request, response) => {
  deleteOperations.deleteItProcById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorsAll').get((request, response) => {
  getOperations.getFactor().then((result) => {
    response.json(result[0]);
  });
});

router.route('/factor/:id').get((request, response) => {
  getOperations.getFactorById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorsAll').post((request, response) => {
  const factor = { ...request.body };
  postOperations.addFactor(factor).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/factorsAll').put((request, response) => {
  const factor = { ...request.body };
  putOperations.modifyFactor(factor).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/itFactor/:id').delete((request, response) => {
  deleteOperations.deleteFactorById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/activityAll').get((request, response) => {
  getOperations.getActivity().then((result) => {
    response.json(result[0]);
  });
});

router.route('/activity/:id').get((request, response) => {
  getOperations.getActivityById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/activityAll').post((request, response) => {
  const activity = { ...request.body };
  postOperations.addActivity(activity).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/activityAll').put((request, response) => {
  const activity = { ...request.body };
  putOperations.modifyActivity(activity).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/activity/:id').delete((request, response) => {
  deleteOperations.deleteActivityById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorsRiskAll').get((request, response) => {
  getOperations.getFactorRisk().then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorRisk/:id').get((request, response) => {
  getOperations.getFactorRiskById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorsRiskAll').post((request, response) => {
  const factorRisk = { ...request.body };
  postOperations.addFactorRisk(factorRisk).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/factorsRiskAll').put((request, response) => {
  const factorRisk = { ...request.body };
  putOperations.modifyFactorRisk(factorRisk).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/factorRisk/:id').delete((request, response) => {
  deleteOperations.deleteFactorRiskById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/reductionAll').get((request, response) => {
  getOperations.getReduction().then((result) => {
    response.json(result[0]);
  });
});

router.route('/reduction/:id').get((request, response) => {
  getOperations.getReductionById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/reductionAll').post((request, response) => {
  const reduction = { ...request.body };
  postOperations.addReduction(reduction).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/reduction/:id').delete((request, response) => {
  deleteOperations.deleteReduction(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/resultAll').get((request, response) => {
  getOperations.getResult().then((result) => {
    response.json(result[0]);
  });
});

router.route('/result/:id').get((request, response) => {
  getOperations.getResultById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/riskAll').get((request, response) => {
  getOperations.getRisk().then((result) => {
    response.json(result[0]);
  });
});

router.route('/risk/:id').get((request, response) => {
  getOperations.getRiskById(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/riskAll').post((request, response) => {
  const risk = { ...request.body };
  postOperations.addRisk(risk).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/riskAll').put((request, response) => {
  const risk = { ...request.body };
  putOperations.modifyRisk(risk).then((result) => {
    response.status(201).json(result);
  });
});

router.route('/risk/:id').delete((request, response) => {
  deleteOperations.deleteRisk(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/riskbyprocess/:id').get((request, response) => {
  getOperations.getRiskByProcess(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/factorRiskByRisk/:id').get((request, response) => {
  getOperations.getFactorRiskByRisk(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/reductionByFactorRisk/:id').get((request, response) => {
  getOperations.getReductionByFactorRisk(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/activitybyfactor/:id').get((request, response) => {
  getOperations.getActivityByfactor(request.params.id).then((result) => {
    response.json(result[0]);
  });
});

router.route('/calcRes/:budget').get((request, response) => {
  getOperations.calcResult(request.params.budget).then((result) => {
    response.json(result[0]);
  });
});

const port = process.env.PORT || 8090;
app.listen(port);
console.log(`ItProc API is running at ${port}`);
