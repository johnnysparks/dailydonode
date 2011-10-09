var mongoose = require('mongoose'),
    crypto = require('crypto');



mongoose.model('LoginToken', {
  properties: ['email', 'series', 'token'],

  indexes: [
    'email',
    'series',
    'token'
  ],

  methods: {
    randomToken: function() {
      return Math.round((new Date().valueOf() * Math.random())) + '';
    },

    save: function() {
      // Automatically create the tokens
      this.token = this.randomToken();
      this.series = this.randomToken();
      this.__super__();
    }
  },

  getters: {
    id: function() {
      return this._id.toHexString();
    }
  }
});

exports.LoginToken = function(db) {
  return db.model('LoginToken');
};


// Load from app.js like this:
// app.LoginToken = LoginToken = require('./models.js').LoginToken(db);
