const User = require('./User');
const Tutor = require('./Tutor');
const Review = require('./Review');

Tutor.hasMany(Review, {
    foreignKey: 'tutor_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(Tutor, {
    foreignKey: 'tutor_id',
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Tutor, Review };
