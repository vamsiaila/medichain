const request = require('request-promise');

class Network {
    constructor(host, port, publicKey, privateKey) {
        this.host = `http://${host}`;
        this.port = port;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
        this.nodeId = global.RandomId();
        this.nodeType = null;
        this.nodeName = null;
        this.networkNodes = [];
    }

    addDetails(nodeType, nodeName) {
        this.nodeType = nodeType;
        this.nodeName = nodeName;
    }

    getAllNodes() {
        return this.networkNodes;
    }

    async addNode(host, port, nodeType, nodeId, nodeName, publicKey) {
        try {
            const hostExist = this.networkNodes.find(node => node.host === host);
            if(hostExist || (this.host === host && this.port === port)) {
                return;
            }
            const options = {
                uri: `${host}:${port}/ping`,
                method: 'GET',
                resolveWithFullResponse: true,
                json: true
            };
            const response = await request(options);
            if (!response || response.statusCode !== 200) {
                return 'Unreachable';
            }
            this.networkNodes.push({
                host: host,
                port: port,
                nodeType: nodeType,
                nodeId: nodeId,
                nodeName: nodeName,
                publicKey: publicKey
            });
        } catch (error) {
            return error.stack;
        }
    }

    async broadcast(host, port, nodeType, nodeId, nodeName, publicKey) {
        try {
            await Promise.all(this.networkNodes.map(async node => {
                try {
                    const options = {
                        uri: `${node.host}:${node.port}/api/network/register/node`,
                        method: 'POST',
                        body: {host, port, nodeType, nodeId, nodeName, publicKey},
                        json: true
                    }
                    await request(options)
                } catch (error) {
                    //do nothing;
                }
            }));
        } catch (error) {
            // do nothing
        }
    }

    async bulkRegister(host, port) {
        try {
            const options = {
                uri: `${host}:${port}/api/network/register/node/bulk`,
                method: 'POST',
                body: {
                    allNetworkNodes: [
                        ...this.networkNodes,
                        {
                            host: this.host,
                            port: this.port,
                            nodeType: this.nodeType,
                            nodeId: this.nodeId,
                            nodeName: this.nodeName,
                            publicKey: this.publicKey
                        }
                    ]
                },
                json: true
            }
            await request(options);
        } catch (error) {
            //do nothing;
        }
    }
}

module.exports = Network;
