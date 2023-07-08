var bcrypt = require('bcryptjs');

var hash = bcrypt.hashSync("1", 1);
console.log(hash)