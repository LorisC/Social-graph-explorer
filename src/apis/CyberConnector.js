import Web3Modal from 'web3modal';
import {Web3Provider} from '@ethersproject/providers';
import CyberConnect, {Env} from '@cyberlab/cyberconnect';
import {Axios} from "axios";

let web3Modal = new Web3Modal({
    network: 'mainnet',
    cacheProvider: true,
});

const BaseUrl = "https://api.cybertino.io/connect";

export class CyberConnector {
    constructor() {
        this.cyberConnect = null;
        this.cyberConnectAPI = new Axios({
            baseURL: BaseUrl,
            headers: {
                'content-type': 'application/json'
            }
        });
    }

    async connect() {
        const modalProvider = await web3Modal.connect();
        const ethersProvider = new Web3Provider(modalProvider);

        this.cyberConnect = new CyberConnect({
            ethProvider: ethersProvider.provider,
            namespace: 'CyberConnect',
            env: Env.STAGING
        });
    }

    follow(address) {
        return this.cyberConnect.connect(address)
    }

    unfollow(address) {
        return this.cyberConnect.disconnect(address);
    }

    getInfo(address) {
        return this.cyberConnectAPI.post('/',
            JSON.stringify({
                query: `{
                    identity(address: "${address}") {
                        address
                        followingCount
                        followerCount
                        followers
                        {
                            list
                            {
                                address
                            }
                        }
                        followings
                        {
                            list
                            {
                                address
                            }
                        }
                    },
                    recommendations(address: "${address}") {
                        data
                        {
                            list
                            {
                                address
                                recommendationReason
                            }
                        }
                    }
                }`
            }))
    }


}