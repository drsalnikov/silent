const sql = require('mssql');
const config = require('../config/dbconfig');

async function getItProc() {
  try {
    const pool = await sql.connect(config);
    const itProc = await pool.request().query('SELECT * from ITPROC');
    return itProc.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getItProcById(id) {
  try {
    const pool = await sql.connect(config);
    const itProc = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from ITPROC where ID = @input_parameter');
    return itProc.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addItProc(itProc) {
  try {
    const pool = await sql.connect(config);
    const insertItProc = await pool.request()
      .input('Name', sql.NVarChar, itProc.Name)
      .input('RTO', sql.Int, itProc.RTO)
      .input('Level', sql.NVarChar, itProc.Level)
      .execute('InsertItProc');
    return insertItProc.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getFactor() {
  try {
    const pool = await sql.connect(config);
    const factor = await pool.request().query('SELECT * from FACTOR');
    return factor.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getFactorById(id) {
  try {
    const pool = await sql.connect(config);
    const factor = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from FACTOR where ID = @input_parameter');
    return factor.recordsets;
  } catch (error) {
    console.log(error);
  }
}
////POST FACTOR
async function addFactor(factor) {
  try {
    const pool = await sql.connect(config);
    const insertFactor = await pool.request()
      .input('Name', sql.NVarChar, factor.Name)      
      .input('Type', sql.NVarChar, factor.Type)
      .execute('InsertFactor');
    return insertFactor.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getFactorRisk() {
  try {
    const pool = await sql.connect(config);
    const factorRisk = await pool.request().query('SELECT * from FACTORRISK');
    return factorRisk.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getFactorRiskById(id) {
  try {
    const pool = await sql.connect(config);
    const factorRisk = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from FACTORRISK where ID = @input_parameter');
    return factorRisk.recordsets;
  } catch (error) {
    console.log(error);
  }
}
/////POST FactorRisk
async function addFactorRisk(factorRisk) {
  try {
    const pool = await sql.connect(config);
    const insertFactorRisk = await pool.request()
      .input('CFACTOR', sql.Int, factorRisk.CFACTOR)      
      .input('CRISK', sql.Int, factorRisk.CRISK)
      .input('Set', sql.Int, factorRisk.Set)
      .input('Percent', sql.Float, factorRisk.Percent)
      .execute('InsertFactorRisk');
    return insertFactorRisk.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getReduction() {
  try {
    const pool = await sql.connect(config);
    const reduction = await pool.request().query('SELECT * from REDUCTION');
    return reduction.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getReductionById(id) {
  try {
    const pool = await sql.connect(config);
    const reduction = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from REDUCTION where ID = @input_parameter');
    return reduction.recordsets;
  } catch (error) {
    console.log(error);
  }
}
//////////////POST REDUCTION
async function addReduction(reduction) {
  try {
    const pool = await sql.connect(config);
    const insertReduction = await pool.request()
      .input('CACTIVITY', sql.Int, reduction.CFACTOR)      
      .input('CFACTORRISK', sql.Int, reduction.CRISK)
      .input('NewPercent', sql.Float, reduction.NewPercent)
      .execute('InsertReduction');
    return insertReduction.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getResult() {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request().query('SELECT * from RESULT');
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getResultById(id) {
  try {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from RESULT where ID = @input_parameter');
    return result.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getRisk() {
  try {
    const pool = await sql.connect(config);
    const risk = await pool.request().query('SELECT * from RISK');
    return risk.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getRiskById(id) {
  try {
    const pool = await sql.connect(config);
    const risk = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from RISK where ID = @input_parameter');
    return risk.recordsets;
  } catch (error) {
    console.log(error);
  }
}
/////////POST RISK
async function addRisk(risk) {
  try {
    const pool = await sql.connect(config);
    const insertRisk = await pool.request()
      .input('Name', sql.Int, risk.CFACTOR)      
      .input('CITPROC', sql.Int, risk.CRISK)
      .input('Damage', sql.Float, risk.NewPercent)
      .execute('InsertRisk');
    return insertRisk.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getActivity() {
  try {
    const pool = await sql.connect(config);
    const activity = await pool.request().query('SELECT * from ACTIVITY');
    return activity.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getActivityById(id) {
  try {
    const pool = await sql.connect(config);
    const activity = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from ACTIVITY where ID = @input_parameter');
    return activity.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getRiskByProcess(id) {
  try {
    const pool = await sql.connect(config);
    const risk = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from RISK where CITPROC = @input_parameter');
    return risk.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getFactorRiskByRisk(id) {
  try {
      let pool = await sql.connect(config);
      let risk = await pool.request()
          .input('input_parameter', sql.Int, id)
          .query("SELECT * from FACTORRISK fr join FACTOR f on fr.CFACTOR = f.ID where crisk = @input_parameter");
      return risk.recordsets;
  }
  catch (error) {
      console.log(error);
  }
}

async function getReductionByFactorRisk(id) {
  try {
    const pool = await sql.connect(config);
    const reduction = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from REDUCTION r join ACTIVITY a on r.cactivity = a.id where cfactorrisk = @input_parameter');
    return reduction.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function getActivityByfactor(id) {
  try {
    const pool = await sql.connect(config);
    const activity = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('SELECT * from ACTIVITY where cfactor = @input_parameter');
    return activity.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function calcResult(budget) {
  try {
    const pool = await sql.connect(config);
    const finalRes = await pool.request()
      .input('MaxBudget', sql.Int, budget)
      .execute('final_raschet');
    const result = await pool.request() 
      .query('SELECT * from RESULT')
    return result.recordsets;
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getItProc,
  getItProcById,
  addItProc,

  getFactor,
  getFactorById,
  addFactor,

  getFactorRisk,
  getFactorRiskById,
  addFactorRisk,

  getReduction,
  getReductionById,
  addReduction,

  getResult,
  getResultById,

  getRisk,
  getRiskById,
  addRisk,

  getActivity,
  getActivityById,

  getRiskByProcess,

  getFactorRiskByRisk,

  getReductionByFactorRisk,

  getActivityByfactor,

  calcResult
};
