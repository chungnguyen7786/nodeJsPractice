var db = require('../db.js');
var count = db.get('cookieCount').value();

module.exports.count = (req, res, next) => {
  if(req) {
    count += 1;
    console.log('<cookie>: <'+count+'>');
    db.assign({'cookieCount': count}).write();
   }
  next();
}