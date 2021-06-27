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

        it('Test tokens are sent to investor', async () => {
            await donate.transfer(investor1, '1000000')
            assert.equal(await donate.balanceOf(investor1), '1000000')
        })
    })

    describe("Allow users to interact via link", async () => {
        it('Links are created', async () => {
            await distributor.newLink(user1, {from: user1})
            await distributor.newLink(user2, {from: user2})
            assert.equal(await distributor.getLink(user1, {from: user1}), 1)
            assert.equal(await distributor.getLink(user2, {from: user1}), 2)
        })

        it('Donations are sent using link', async () => {
            donate.increaseAllowance(distributor.address, '30', {from: investor1})
            await distributor.donateErc20('1', donate.address, '10', {from: investor1})
            await distributor.donateErc20('2', donate.address, '20', {from: investor1})
            assert.equal((await donate.balanceOf(investor1)).toString(), '999970')
        })

        it('Users got donations', async () => {
            assert.equal((await donate.balanceOf(user1)).toString(), '10')
            assert.equal((await donate.balanceOf(user2)).toString(), '20')
        })
    })
})