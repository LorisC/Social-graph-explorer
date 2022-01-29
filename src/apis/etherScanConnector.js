import {Axios} from "axios";

const baseUrl = "https://api.etherscan.io";

class EtherScanConnector {
    constructor() {
        this.api = new Axios({baseURL: baseUrl});
    }

    getAccountBalance(address) {
        return this.api.get('/api', {
            params: {
                module: 'account',
                action: 'balance',
                address,
                tag: 'latest',
                apiKey:'JPMPUD3X467XSNPHJKRGJFZPQ5JWF144SK',
            }
        })
    }
}