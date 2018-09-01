module.exports = DataTypes => {
  return {
    id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
    name: DataTypes.STRING,
    email: { type: DataTypes.STRING, unique: true, allowNull: false, validate: { notEmpty: true, isEmail: true } },
    password: { type: DataTypes.STRING, allowNull: false, validate: {notEmpty: true, len: [6, 42]} }, // len: { args: [6, 50], msg: 'A senha deve ter pelo menos 6 caracteres' },
    role: {type: DataTypes.STRING},
    deletedAt: DataTypes.DATE,
    createdAt: { allowNull: false, type: DataTypes.DATE },
    updatedAt: { allowNull: false, type: DataTypes.DATE }
  }
}
