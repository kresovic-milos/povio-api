const { Model } = require('objection');

class User extends Model {
  static get tableName() {
    return 'users';
  }

  $beforeInsert() {
    if (this.constructor.timestamps) {
      const timestamp = new Date().toISOString();
      this.createdAt = timestamp;
      this.updatedAt = timestamp;
    }
  }

  $beforeUpdate() {
    if (this.constructor.timestamps) {
      this.updatedAt = new Date().toISOString();
    }
  }

  static get relationMappings() {
    return {
      liked: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'likes.from',
            to: 'likes.to'
          },
          to: 'users.id'
        }
      },

      likedBy: {
        relation: Model.ManyToManyRelation,
        modelClass: User,
        join: {
          from: 'users.id',
          through: {
            from: 'likes.to',
            to: 'likes.from'
          },
          to: 'users.id'
        }
      }
    };
  }
}

module.exports = User;
