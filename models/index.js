const User = require('./User');
const Tutor = require('./Tutor');
const Review = require('./Review');

Tutor.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Tutor, {
    foreignKey: 'user_id',
});

Tutor.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Tutor, {
    foreignKey: 'user_id',
});
  

module.exports = { User, Tutor, Review };
