require("chai")
    .use(require("chai-as-promised"))
    .should()

const Distributor = artifacts.require("Distributor")
const DonateToken = artifacts.require("DonateToken")


contract('Distributor', ([deployer, oracle, user1, user2, influencer, investor1]) => {
    let distributor = null
    let donate = null

    before(async () => {
        distributor = await Distributor.deployed()
        donate = await DonateToken.deployed()
    })

    describe("Deployment", async () => {
        it('Contracts are deployed', async () => {
            assert.notEqual(distributor, null)
            assert.notEqual(donate, null)
            console.log("\tDistributor at: ", distributor.address)
            console.log("\tDonateToken at: ", donate.address)
        })
        it('Oracle is set', async () => {
            await distributor.setOracle(oracle)
            assert.equal(await distributor.getOracle(), oracle)
        })
    })

    // describe("Some", async () => {
    //     it('Some', async () => {
    //     })
    // })
})