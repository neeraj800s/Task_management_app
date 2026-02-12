const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

let sequelize;

if (process.env.MYSQL_URL) {
    sequelize = new Sequelize(process.env.MYSQL_URL, {
        dialect: 'mysql',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    });
} else {
    sequelize = new Sequelize(
        process.env.MYSQLDATABASE || process.env.DB_NAME,
        process.env.MYSQLUSER || process.env.DB_USER,
        process.env.MYSQLPASSWORD || process.env.DB_PASS,
        {
            host: process.env.MYSQLHOST || process.env.DB_HOST,
            port: process.env.MYSQLPORT || 3306,
            dialect: 'mysql',
            logging: false,
            pool: {
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
            }
        }
    );
}

const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected successfully.');
        await sequelize.sync({ alter: true });
        console.log('Models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

module.exports = { sequelize, connectDB };
