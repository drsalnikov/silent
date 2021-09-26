const sql = require('mssql');
const config = require('../../config/dbconfig');

async function modifyItProc(itProc) {
    try {
      const pool = await sql.connect(config);
      const updateItProc = await pool.request()
        .input('ID', sql.Int, itProc.ID)
        .input('Name', sql.NVarChar, itProc.Name)
        .input('RTO', sql.Int, itProc.RTO)
        .input('Level', sql.NVarChar, itProc.Level)
        .query('UPDATE ITPROC SET Name = @Name, RTO = @RTO, Level = @Level where ID = @ID');
      return updateItProc.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

  async function modifyActivity(activity) {
    try {
      const pool = await sql.connect(config);
      const updateActivity = await pool.request()
        .input('ID', sql.Int, activity.ID)
        .input('Name', sql.NVarChar, activity.Name)
        .input('Summa', sql.Decimal, activity.Summa)
        .input('CFACTOR', sql.Int, activity.CFACTOR)
        .input('IsActive', sql.Bit, activity.IsActive)
        .query('UPDATE ACTIVITY SET Name = @Name, Summa = @Summa, CFACTOR = @CFACTOR, IsActive = @IsActive where ID = @ID');
      return updateActivity.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

  async function modifyFactor(factor) {
    try {
      const pool = await sql.connect(config);
      const updateFactor = await pool.request()
        .input('ID', sql.Int, factor.ID)
        .input('Name', sql.NVarChar, factor.Name)
        .input('Type', sql.NVarChar, factor.Type)
        .query('UPDATE FACTOR SET Name = @Name, Type = @Type where ID = @ID');
      return updateFactor.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

  async function modifyFactorRisk(factorRisk) {
    try {
      const pool = await sql.connect(config);
      const updateFactorRisk = await pool.request()
        .input('ID', sql.Int, factorRisk.ID)
        .input('CFACTOR', sql.Int, factorRisk.CFACTOR)
        .input('CRISK', sql.Int, factorRisk.CRISK)
        .input('Set', sql.Int, factorRisk.Set)
        .input('Percent', sql.Float, factorRisk.Percent)
        .query('UPDATE FACTORRISK SET CFACTOR = @CFACTOR, CRISK = @CRISK, Set = @Set, Percent = @Percent where ID = @ID');
      return updateFactorRisk.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

  async function modifyRisk(risk) {
    try {
      const pool = await sql.connect(config);
      const updateRisk = await pool.request()
        .input('ID', sql.Int, risk.ID)
        .input('Name', sql.NVarChar, risk.Name)
        .input('CITPROC', sql.Int, risk.CITPROC)
        .input('Damage', sql.Decimal, risk.Damage)
        .query('UPDATE RISK SET Name = @Name, CITPROC = @CITPROC, Damage = @Damage where ID = @ID');
      return updateRisk.recordsets;
    } catch (err) {
      console.log(err);
    }
  }

  module.exports = {  
    modifyItProc,
    modifyActivity,
    modifyFactor,
    modifyFactorRisk,
    modifyRisk
  };