const tethrt = artifacts.require('Migrations');

module.exports = async function () {
    await deployer.deploy(migrations);
}
