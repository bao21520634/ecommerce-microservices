// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: address.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "address";

export interface Address {
  id: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zip: string;
}

export const ADDRESS_PACKAGE_NAME = "address";

function createBaseAddress(): Address {
  return { id: "", address1: "", address2: "", country: "", state: "", city: "", zip: "" };
}

export const Address: MessageFns<Address> = {
  encode(message: Address, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.address1 !== "") {
      writer.uint32(18).string(message.address1);
    }
    if (message.address2 !== "") {
      writer.uint32(26).string(message.address2);
    }
    if (message.country !== "") {
      writer.uint32(34).string(message.country);
    }
    if (message.state !== "") {
      writer.uint32(42).string(message.state);
    }
    if (message.city !== "") {
      writer.uint32(50).string(message.city);
    }
    if (message.zip !== "") {
      writer.uint32(58).string(message.zip);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Address {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.id = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.address1 = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.address2 = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.country = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.state = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.city = reader.string();
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.zip = reader.string();
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Address {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      address1: isSet(object.address1) ? globalThis.String(object.address1) : "",
      address2: isSet(object.address2) ? globalThis.String(object.address2) : "",
      country: isSet(object.country) ? globalThis.String(object.country) : "",
      state: isSet(object.state) ? globalThis.String(object.state) : "",
      city: isSet(object.city) ? globalThis.String(object.city) : "",
      zip: isSet(object.zip) ? globalThis.String(object.zip) : "",
    };
  },

  toJSON(message: Address): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.address1 !== "") {
      obj.address1 = message.address1;
    }
    if (message.address2 !== "") {
      obj.address2 = message.address2;
    }
    if (message.country !== "") {
      obj.country = message.country;
    }
    if (message.state !== "") {
      obj.state = message.state;
    }
    if (message.city !== "") {
      obj.city = message.city;
    }
    if (message.zip !== "") {
      obj.zip = message.zip;
    }
    return obj;
  },
};

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
}
