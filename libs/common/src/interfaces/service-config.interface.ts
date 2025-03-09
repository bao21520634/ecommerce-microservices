export interface MongodbConfig {
    uri: string;
    name?: string;
    options?: string;
}

export interface EventstoreConfig {
    poolMax: any;
    poolMin: any;
    streamProtocol: string;
    hostname: string;
    httpPort: number;
    httpPotocol: string;
    tcpPassword: string;
    tcpUsername: string;
    tcpPort: number;
    tcpProtocol: string;
}

export interface RedisConfig {
    host: string;
    port: string;
    password: string;
}

export interface ElasticsearchConfig {
    node: string;
    username: string;
    password: string;
    requestTimeout?: number;
    maxRetries?: number;
}
