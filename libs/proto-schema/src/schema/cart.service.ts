// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: cart.service.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import { Count, DeleteManyResponse, DeleteResponse, Id, Query } from "./common";
import {
  CreateManyOrdersInput,
  CreateOrderInput,
  DeleteManyOrdersInput,
  NullableOrder,
  Order,
  Orders,
  UpdateManyOrdersInput,
  UpdateOrderInput,
} from "./order";
import {
  CreateManyOrderItemsInput,
  CreateOrderItemInput,
  DeleteManyOrderItemsInput,
  NullableOrderItem,
  OrderItem,
  OrderItems,
  UpdateManyOrderItemsInput,
  UpdateOrderItemInput,
} from "./orderItem";

export const protobufPackage = "cart";

export const CART_PACKAGE_NAME = "cart";

export interface CartServiceClient {
  /** Order */

  order(request: Id, metadata?: Metadata): Observable<NullableOrder>;

  orders(request: Query, metadata?: Metadata): Observable<Orders>;

  ordersTotal(request: Query, metadata?: Metadata): Observable<Count>;

  createOrder(request: CreateOrderInput, metadata?: Metadata): Observable<Order>;

  createManyOrders(request: CreateManyOrdersInput, metadata?: Metadata): Observable<Orders>;

  updateOrder(request: UpdateOrderInput, metadata?: Metadata): Observable<Order>;

  updateManyOrders(request: UpdateManyOrdersInput, metadata?: Metadata): Observable<Orders>;

  deleteOrder(request: Id, metadata?: Metadata): Observable<DeleteResponse>;

  deleteManyOrders(request: DeleteManyOrdersInput, metadata?: Metadata): Observable<DeleteManyResponse>;

  /** OrderItem */

  orderItem(request: Id, metadata?: Metadata): Observable<NullableOrderItem>;

  orderItems(request: Query, metadata?: Metadata): Observable<OrderItems>;

  orderItemsTotal(request: Query, metadata?: Metadata): Observable<Count>;

  createOrderItem(request: CreateOrderItemInput, metadata?: Metadata): Observable<OrderItem>;

  createManyOrderItems(request: CreateManyOrderItemsInput, metadata?: Metadata): Observable<OrderItems>;

  updateOrderItem(request: UpdateOrderItemInput, metadata?: Metadata): Observable<OrderItem>;

  updateManyOrderItems(request: UpdateManyOrderItemsInput, metadata?: Metadata): Observable<OrderItems>;

  deleteOrderItem(request: Id, metadata?: Metadata): Observable<DeleteResponse>;

  deleteManyOrderItems(request: DeleteManyOrderItemsInput, metadata?: Metadata): Observable<DeleteManyResponse>;
}

export interface CartServiceController {
  /** Order */

  order(request: Id, metadata?: Metadata): Promise<NullableOrder> | Observable<NullableOrder> | NullableOrder;

  orders(request: Query, metadata?: Metadata): Promise<Orders> | Observable<Orders> | Orders;

  ordersTotal(request: Query, metadata?: Metadata): Promise<Count> | Observable<Count> | Count;

  createOrder(request: CreateOrderInput, metadata?: Metadata): Promise<Order> | Observable<Order> | Order;

  createManyOrders(request: CreateManyOrdersInput, metadata?: Metadata): Promise<Orders> | Observable<Orders> | Orders;

  updateOrder(request: UpdateOrderInput, metadata?: Metadata): Promise<Order> | Observable<Order> | Order;

  updateManyOrders(request: UpdateManyOrdersInput, metadata?: Metadata): Promise<Orders> | Observable<Orders> | Orders;

  deleteOrder(request: Id, metadata?: Metadata): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  deleteManyOrders(
    request: DeleteManyOrdersInput,
    metadata?: Metadata,
  ): Promise<DeleteManyResponse> | Observable<DeleteManyResponse> | DeleteManyResponse;

  /** OrderItem */

  orderItem(
    request: Id,
    metadata?: Metadata,
  ): Promise<NullableOrderItem> | Observable<NullableOrderItem> | NullableOrderItem;

  orderItems(request: Query, metadata?: Metadata): Promise<OrderItems> | Observable<OrderItems> | OrderItems;

  orderItemsTotal(request: Query, metadata?: Metadata): Promise<Count> | Observable<Count> | Count;

  createOrderItem(
    request: CreateOrderItemInput,
    metadata?: Metadata,
  ): Promise<OrderItem> | Observable<OrderItem> | OrderItem;

  createManyOrderItems(
    request: CreateManyOrderItemsInput,
    metadata?: Metadata,
  ): Promise<OrderItems> | Observable<OrderItems> | OrderItems;

  updateOrderItem(
    request: UpdateOrderItemInput,
    metadata?: Metadata,
  ): Promise<OrderItem> | Observable<OrderItem> | OrderItem;

  updateManyOrderItems(
    request: UpdateManyOrderItemsInput,
    metadata?: Metadata,
  ): Promise<OrderItems> | Observable<OrderItems> | OrderItems;

  deleteOrderItem(
    request: Id,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  deleteManyOrderItems(
    request: DeleteManyOrderItemsInput,
    metadata?: Metadata,
  ): Promise<DeleteManyResponse> | Observable<DeleteManyResponse> | DeleteManyResponse;
}

export function CartServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "order",
      "orders",
      "ordersTotal",
      "createOrder",
      "createManyOrders",
      "updateOrder",
      "updateManyOrders",
      "deleteOrder",
      "deleteManyOrders",
      "orderItem",
      "orderItems",
      "orderItemsTotal",
      "createOrderItem",
      "createManyOrderItems",
      "updateOrderItem",
      "updateManyOrderItems",
      "deleteOrderItem",
      "deleteManyOrderItems",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CartService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CART_SERVICE_NAME = "CartService";
