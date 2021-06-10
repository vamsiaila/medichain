module.exports = {
    addMyNodeDetails: (request, response) => {
        const { nodeType, nodeName } = request.body;
        if(global.NETWORK.nodeName && global.NETWORK.nodeType) {
            return response.status(400).send({ status: false, error: 'node details already exist.' });
        }
        global.NETWORK.addDetails(nodeType, nodeName);
        return response.send({status: true});
    },
    me: (request, response) => {
      return response.send({
          status: true,
          data: {
              host: global.NETWORK.host,
              port: global.NETWORK.port,
              nodeId: global.NETWORK.nodeId,
              nodeName: global.NETWORK.nodeName,
              nodeType: global.NETWORK.nodeType,
              publicKey: global.NETWORK.publicKey
          }

      })
    },
    registerNode: async (request, response) => {
        try {
            const { host, port, nodeType, nodeId, nodeName, publicKey } = request.body;
            const pingError = await global.NETWORK.addNode(host, port, nodeType, nodeId, nodeName, publicKey);
            if(pingError) {
                return response.status(400).send({ status: false, error: pingError });
            }
            return response.send({status: true});
        } catch (error) {
            return response.status(500).send({ status: false, error: error.stack });
        }
    },
    bulkRegisterNodes: async (request, response) => {
      try {
          const { allNetworkNodes } = request.body;
          for(let i = 0; i < allNetworkNodes.length; i++) {
              const { host, port, nodeType, nodeId, nodeName, publicKey } = allNetworkNodes[i];
              await global.NETWORK.addNode(host, port, nodeType, nodeId, nodeName, publicKey);
          }
          return response.send({ status: true });
      } catch (error) {
          return response.status(500).send({ status: false, error: error.stack });
      }
    },
    registerAndBroadcastNode: async (request, response) => {
        try {
            const { host, port, nodeType, nodeId, nodeName, publicKey } = request.body;
            const pingError = await global.NETWORK.addNode(host, port, nodeType, nodeId, nodeName, publicKey);
            if(pingError) {
                return response.status(400).send({ status: false, error: pingError });
            }
            await global.NETWORK.broadcast(host, port, nodeType, nodeId, nodeName, publicKey);
            await global.NETWORK.bulkRegister(host, port);
            return response.send({status: true});
        } catch (error) {
            return response.status(500).send({ status: false, error: error.stack });
        }
    },
    getAllNodes: (request, response) => {
        return response.send({status: true, data: global.NETWORK.getAllNodes()});
    }
}
