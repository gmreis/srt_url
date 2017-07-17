const mongoose = require('mongoose');
const Promise = require('q');
mongoose.set('debug', true);

const userSchema = new mongoose.Schema({
  user: { type: String, required: true},
})

userSchema.methods.checkUser = function(err, result) {
  var defered = Promise.defer();
  User.findOne({user: this.user}, function(err, result) {
    if(err) {
      console.log(err);
    }
    if(result == null){
      defered.resolve(true)
    } else {
      defered.reject({result: false, text: 'Usuário já cadastrado'});
    }
  })
  return defered.promise;
}

const User = mongoose.model('User', userSchema);
module.exports = User;
