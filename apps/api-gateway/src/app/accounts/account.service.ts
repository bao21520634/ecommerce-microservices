import { AccountsRpcClientService } from '@ecommerce-microservices/core';
import { Auth, User } from '@ecommerce-microservices/proto-schema';
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AccountService {
    logger = new Logger(this.constructor.name);

    constructor(readonly accountRpcClient: AccountsRpcClientService) {}

    /**
     * @description EventBus command to create a new user
     * @return {Promise<UserEntity>} Result from the find
     * @access public
     * @memberOf AccountsService
     * @param input
     */
    private async loginCmd(
        input: Auth.LoginRequest,
    ): Promise<Auth.LoginResponse> {
        try {
            const response = await this.accountRpcClient.svc.Login(input, null);
            this.logger.log(response);
            return response;
        } catch (e) {
            this.logger.log(e);
            throw new Error(e.message);
        }
    }

    /**
     * @description EventBus command to create a new user
     * @return {Promise<UserEntity>} Result from the find
     * @access public
     * @memberOf AccountsService
     * @param input
     */
    private async createUser(
        input: User.CreateRequest,
    ): Promise<User.CreateResponse> {
        try {
            const response = await this.accountRpcClient.svc.CreateUser(
                input,
                null,
            );
            this.logger.log(response);
            return response;
        } catch (e) {
            this.logger.log(e);
            throw new Error(e.message);
        }
    }

    /**
     * @description Validate a user by email and password
     * @return {Promise<UserEntity>} Result from the validation
     * @access public
     * @memberOf AccountsService
     * @param input
     */
    public async validateUser(input: Auth.LoginRequest): Promise<User.User> {
        try {
            const result = await this.loginCmd(input);
            return result.user;
        } catch (e) {
            this.logger.log(e);
            throw new Error(e.message);
        }
    }

    /**
     * @description Validate a user by email and password
     * @return {Promise<UserEntity>} Result from the validation
     * @access public
     * @memberOf AccountsService
     * @param logCmd
     * @param regCmd
     */
    public async validateOrCreateUser(
        logCmd: Auth.LoginRequest,
        regCmd: User.CreateRequest,
    ): Promise<User.User> {
        let user = null;
        await this.loginCmd(logCmd)
            .then((value) => {
                if (value) {
                    user = value.user;
                }
            })
            .catch((reason) => {
                this.logger.error(reason);
            });

        if (user) {
            return user;
        }

        try {
            await this.createUser(regCmd);
            const result = await this.loginCmd(logCmd);
            return result.user;
        } catch (e) {
            throw new Error(e.message);
        }
    }
}
