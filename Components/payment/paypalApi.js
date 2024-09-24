let baseUrl = 'https://api-m.sandbox.paypal.com';
const base64 = require('base-64');

let clientId = 'ATBfWLdcSL5fcFoV_C4Se5IXgxtt0vEBBeLAC3GKgfq13_Wg77OUfsWclzaKidoLU3mfDhnv1mObIFJh';
let secretKey = 'ELcO7hlp-p-6EsAyzXgP7fx1iiOcXBD0Ft7FAFaPylcjmm8De-9hrlmhwc0VtZjjLv8sOUIs5wA0Jyqh';

const createOrder = (token = '', eventName = 'Event Ticket', ticketPrice = '') => {
    let orderDetail = {
        "intent": "CAPTURE",
        "purchase_units": [
          {
            "amount": {
              "currency_code": "USD",  
              "value": ticketPrice  
            },
            "description": eventName 
          }
        ],
        "application_context": {
          "return_url": "https://example.com/return",
          "cancel_url": "https://example.com/cancel"
        }
    };

    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderDetail)
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v2/checkout/orders', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result);
            const res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("error raised", error);
            reject(error);
        });
    });
}

const generateToken = () => {
    var headers = new Headers();
    headers.append("Content-Type", "application/x-www-form-urlencoded");
    headers.append("Authorization", "Basic " + base64.encode(`${clientId}:${secretKey}`));

    var requestOptions = {
        method: 'POST',
        headers: headers,
        body: 'grant_type=client_credentials',
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + '/v1/oauth2/token', requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result);
            const { access_token } = JSON.parse(result);
            resolve(access_token);
        }).catch(error => {
            console.log("error raised", error);
            reject(error);
        });
    });
}

const capturePayment = (id, token = '') => {
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
    };

    return new Promise((resolve, reject) => {
        fetch(baseUrl + `/v2/checkout/orders/${id}/capture`, requestOptions).then(response => response.text()).then(result => {
            console.log("result print", result);
            const res = JSON.parse(result);
            resolve(res);
        }).catch(error => {
            console.log("error raised", error);
            reject(error);
        });
    });
}

export default {
    generateToken,
    createOrder,
    capturePayment
};
