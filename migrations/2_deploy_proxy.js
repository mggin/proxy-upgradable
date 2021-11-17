const Dogs = artifacts.require("Dogs");
const DogsUpdated = artifacts.require("DogsUpdated");
const Proxy = artifacts.require("Proxy");

module.exports = async function (deployer, network, accounts) {
//   deployer.deploy(Migrations);
    const dogs = await Dogs.new();
    const proxy = await Proxy.new(dogs.address);
    // 
    var proxyDog = await Dogs.at(proxy.address);
    proxyDog.initialized(accounts[0]);
    //
    await proxyDog.setNumberOfDogs(10);
    //
    var numOfDogs = await proxyDog.getNumberOfDogs();
    numOfDogs = await dogs.getNumberOfDogs();
    console.log(numOfDogs.toNumber());

    const dogsUpdated = await DogsUpdated.new();
    proxy.upgrade(dogsUpdated.address);

    numOfDogs = await proxyDog.getNumberOfDogs();

    console.log("After upgrade" + numOfDogs.toNumber());

    await proxyDog.setNumberOfDogs(30)
};
