module.exports.postCreate = (req, res, next) => {
  var errors = [];
  if(!req.body.name) {
    errors.push('Name is required.');
  } else if (req.body.name.length > 30) {      
    errors.push("Name's length must be smaller than or equal to 30.");
  }

  if(!req.body.phone) {
    errors.push('Phone is required.');
  }

  if(errors.length) {
    res.render('users/addUser.pug', {
      errors: errors,
      values: req.body
    });
    return;
   }
  next();
}