const sql = require('mssql');
const config = require('../../config/dbconfig');

async function deleteItProcById(id) {
  try {
    const pool = await sql.connect(config);
    const itProc = await pool.request()
      .input('input_parameter', sql.Int, id)
      .query('DELETE from ITPROC where ID = @input_parameter');
    return itProc.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function deleteFactorById(id) {
    try {
      const pool = await sql.connect(config);
      const factor = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE from FACTOR where ID = @input_parameter');
      return factor.recordsets;
    } catch (error) {
      console.log(error);
    }
}

async function deleteFactorRiskById(id) {
    try {
      const pool = await sql.connect(config);
      const factorRisk = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE from FACTORRISK where ID = @input_parameter');
      return factorRisk.recordsets;
    } catch (error) {
      console.log(error);
    }
}

async function deleteActivityById(id) {
    try {
      const pool = await sql.connect(config);
      const activity = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE from ACTIVITY where ID = @input_parameter');
      return activity.recordsets;
    } catch (error) {
      console.log(error);
    }
}

async function deleteRisk(id) {
    try {
      const pool = await sql.connect(config);
      const risk = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE from RISK where ID = @input_parameter');
      return risk.recordsets;
    } catch (error) {
      console.log(error);
    }
}

async function deleteReduction(id) {
    try {
      const pool = await sql.connect(config);
      const reduction = await pool.request()
        .input('input_parameter', sql.Int, id)
        .query('DELETE from REDUCTION where ID = @input_parameter');
      return reduction.recordsets;
    } catch (error) {
      console.log(error);
    }
}

module.exports = {
    deleteItProcById,
    deleteFactorById,
    deleteFactorRiskById,
    deleteActivityById,
    deleteRisk,
    deleteReduction,
};
