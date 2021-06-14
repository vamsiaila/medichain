module.exports = {
    getChain: (request, response) => {
        return response.send({ status: true, data: global.Blockchain.chain });
    },
    mineAndBroadcast: async (request, response) => {
        try {
            const block = global.Blockchain.minePendingTransactions();
            await global.Blockchain.broadcastBlock(block);
            return response.send({ status: true });
        } catch (error) {
            return response.status(500).send({ status: false, error });
        }
    },
    addBlock: (request, response) => {
        const { block } = request.body;
        global.Blockchain.addBlockToChain(block);
        return response.send({ status: true });
    }
}
