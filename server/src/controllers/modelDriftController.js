const db = require('../models')
const sequelize = db.sequelize
const { QueryTypes } = require('sequelize')

module.exports = {
  async index (req, res) {
    var result = {}
    try {
      const first_pred_date = await sequelize.query('SELECT MIN(time) FROM Results', { type: QueryTypes.SELECT })
      if (first_pred_date[0] == null) {
        result = {'msg':'No predictions to show.'}
      } else {
        var records = []
        var max_date = await sequelize.query('SELECT MAX(time) FROM Drift', { type: QueryTypes.SELECT })
        if (max_date[0] == null) {
          records = await sequelize.query('SELECT DAY(time), prediction, actual FROM Results ORDER BY timee', { type: QueryTypes.SELECT })
        } else {
          thirty_ago = new Date()
          thirty_ago.setDate(thirty_ago.getDate() - 30)
          var max_date = new Date(max_date[0])
          const last_date = new Date(Math.max(max_date, thirty_ago)).toISOString().slice(0, 19).replace('T', ' ')
          const query = 'SELECT DAY(time), prediction, actual'+
                        'FROM Results WHERE time >= ' + last_date
          records = await sequelize.query(query, { type: QueryTypes.SELECT })
        }
        console.log(records)
        /*
        for each row in records:
          var date = row[time]
          if !(date in result) {
            result[date] = {
              tp: 0,
              tn: 0,
              fn: 0,
              fp: 0
            }
          }
          if prediction == actual and actual:
            tp += 1
          else if prediction == actual and !actual:
            tn += 1
          else if prediction != actual and actual:
            fn += 1
          else:
            fp +=1
          
        
        for each key, val in result:
          var acc, pre, rec, f1, auc
          acc = (val.tp + val.tn) / (val.tp + val.tn + val.fp + val.fn)
          pre = val.tp / (val.tp + val.fp)
          rec = val.tp / (val.tp + val.fn)
          f1 = 2 * pre * rec / (pre + rec)
          result.key = {
            'acc' : acc,
            'pre' : pre,
            'rec' : rec,
            'f1' : f1
          }
        
          //push to db
          
        */
      }
      res.send(records)
    } catch (err) {
      result.err = err.error
      res.send(result)
    }
  }
}



/*
steps:
1. check drift table for latest date.
2. if now - smallest date < 30, use all data,
   else take diff = max(now - 30 days, now - latest date in drift table) ie. find min number of days we need to calc for.
3. for each day within this period, retrieve and count true positive true negative etc, then calc accuracy etc
4. push each day into drift model
*/