const User = require('./User');
const Tutor = require('./Tutor');
const Review = require('./Review');

Tutor.hasMany(Review, {
    onDelete: 'CASCADE',
});

Review.belongsTo(Tutor, {
    foreignKey: 'review_id',
});

User.hasMany(Review, {
    onDelete: 'CASCADE',
});

Review.belongsTo(User, {
    foreignKey: 'review_id',
});

module.exports = { User, Tutor, Review };
