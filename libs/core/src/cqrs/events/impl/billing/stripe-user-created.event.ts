import { IEvent } from '@nestjs/cqrs';
import Stripe from 'stripe';

export class StripeUserCreatedEvent implements IEvent {
    constructor(public readonly customer: Stripe.Customer) {}
}
