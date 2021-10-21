module.exports = (sequelize, Sequelize) => {
  const voters = sequelize.define("voter", {
    id: {
      type: Sequelize.INTEGER, 
      autoIncrement : true,
      unique : true,
      primaryKey: true
    },
    REGNO: {
      type: Sequelize.INTEGER,
      unique : true,

    },
    First_name: {
      type: Sequelize.STRING,
    },
    Last_name: {
      type: Sequelize.STRING,
    },
    Phone_number : {
      type: Sequelize.INTEGER,
    },
    Email_address : {
      type: Sequelize.STRING,
      unique: true
    },
    password : {
      type: Sequelize.STRING
    },

    Gender : {
      type: Sequelize.STRING
    },
    Function : {
      type: Sequelize.STRING
    }

  },{
    timestamps: false
  });

  return voters;
};
