const baseUrl = 'dist/protos/';

export const SERVICE_LIST = {
    account: {
        package: 'account',
        consulName: 'account',
        service: 'AccountService',
        protoPath: baseUrl + 'account.service.proto',
        url: 'localhost:50051',
    },
    catalog: {
        package: 'catalog',
        consulName: 'catalog',
        service: 'CatalogService',
        protoPath: baseUrl + 'catalog.service.proto',
        url: 'localhost:50052',
    },
    cart: {
        package: 'cart',
        consulName: 'cart',
        service: 'CartService',
        protoPath: baseUrl + 'cart.service.proto',
        url: 'localhost:50053',
    },
    payment: {
        package: 'payment',
        consulName: 'payment',
        service: 'PaymentService',
        protoPath: baseUrl + 'payment.service.proto',
        url: 'localhost:50054',
    },
    search: {
        package: 'search',
        consulName: 'search',
        service: 'SearchService',
        protoPath: baseUrl + 'search.service.proto',
        url: 'localhost:50055',
    },
};
