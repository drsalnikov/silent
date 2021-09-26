const sql = require('mssql');
const config = require('../../config/dbconfig');

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
  
  async function addReduction(reduction) {
    try {
      const pool = await sql.connect(config);
      const insertReduction = await pool.request()
        .input('CACTIVITY', sql.Int, reduction.CACTIVITY)      
        .input('CFACTORRISK', sql.Int, reduction.CFACTORRISK)
        .input('NewPercent', sql.Float, reduction.NewPercent)
        .execute('InsertReduction');
      return insertReduction.recordsets;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function addRisk(risk) {
    try {
      const pool = await sql.connect(config);
      const insertRisk = await pool.request()
        .input('Name', sql.NVarChar, risk.Name)      
        .input('CITPROC', sql.Int, risk.CITPROC)
        .input('Damage', sql.Decimal, risk.Damage)
        .execute('InsertRisk');
      return insertRisk.recordsets;
    } catch (err) {
      console.log(err);
    }
  }
  
  async function addActivity(activity) {
    try {
      const pool = await sql.connect(config);
      const InsertActivity = await pool.request()
        .input('Name', sql.NVarChar, activity.Name)      
        .input('Summa', sql.Decimal, activity.Summa)
        .input('CFACTOR', sql.Int, activity.CFACTOR)
        .input('IsActive', sql.Bit, activity.CFACTOR)
        .execute('InsertActivity');
      return InsertActivity.recordsets;
    } catch (err) {
      console.log(err);
    }
  }
  
  module.exports = {  
    addItProc,    
    addFactor,
    addFactorRisk,
    addReduction,
    addRisk,
    addActivity,
  };
  