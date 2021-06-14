const Transaction = require('../lib/transaction');

module.exports = {
    createTransaction: (request, response) => {
        const { toAddress, fromAddress, data, timestamp, id } = request.body;
        global.Blockchain.addTransaction(new Transaction( toAddress, fromAddress, data, timestamp, id ));
        return response.send({ status: true });
    },
    broadcastTransaction: async (request, response) => {
        try {
            const {toAddress, fromAddress, data, timestamp, id} = request.body;
            global.Blockchain.addTransaction(new Transaction(toAddress, fromAddress, data, timestamp, id));
            await global.NETWORK.broadcastTransactionToNetwork(toAddress, fromAddress, data, timestamp, id);
            return response.send({ status: true });
        } catch (error) {
            return response.status(500).send({ status: false, error: error.stack });
        }
    },
    getTransaction: (request, response) => {
        const transaction = global.Blockchain.transactionById(request.params.transactionId);
        return response.send({ status: true, data: transaction });
    }
}
