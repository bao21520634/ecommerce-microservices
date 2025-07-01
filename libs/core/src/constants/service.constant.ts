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
    setup: {
        package: 'setup',
        consulName: 'setup',
        service: 'SetupService',
        protoPath: baseUrl + 'setup.service.proto',
        url: 'localhost:50054',
    },
    search: {
        package: 'search',
        consulName: 'search',
        service: 'SearchService',
        protoPath: baseUrl + 'search.service.proto',
        url: 'localhost:50055',
    },
    recommendation: {
        package: 'recommendation',
        consulName: 'recommendation',
        service: 'RecommendationService',
        protoPath: baseUrl + 'recommendation.service.proto',
        url: 'localhost:50056',
    },
};
