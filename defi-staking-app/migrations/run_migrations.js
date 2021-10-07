const migrations = artifacts.require('Migrations');

module.exports = function() {
    deployer.deploy(migrations);
}
