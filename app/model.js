var mongoose    = require('mongoose');
var Schema      = mongoose.Schema;

var UsrSchema = new Schema({ // Create user schema
    username: {type: String, required: true},
    gender: {type: String, required: true},
    age: {type: Number, required: true},
    favanimal: {type: String, required: true},
    location: {type: [Number], required: true}, // location = longitude, latitude. Opposite of Google Maps format.
    verified: String,
    time_created: {type: Date, default: Date.now},
    time_updated: {type: Date, default: Date.now}
});

UsrSchema.pre('save', function(next){ // Set time_created parameter to present time
    now = new Date();
    this.time_updated = now;
    if(!this.time_created) {
        this.time_created = now
    }
    next();
});

UsrSchema.index({location: '2dsphere'}); // Index schema using 2dsphere. Allows geospatial queries

module.exports = mongoose.model('mgGMapuser', UsrSchema);