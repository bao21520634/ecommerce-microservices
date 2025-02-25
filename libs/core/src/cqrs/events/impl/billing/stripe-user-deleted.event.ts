import { IEvent } from '@nestjs/cqrs';
import Stripe from 'stripe';

export class StripeUserDeletedEvent implements IEvent {
    constructor(public readonly customer: Stripe.Customer) {}
}
