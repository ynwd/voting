'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        const users = [{
            firstName: 'John',
            lastName: 'Doe',
            email: 'example@example.com',
            createdAt: new Date(),
            updatedAt: new Date()
        }]
        return queryInterface.bulkInsert('Users', users);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};