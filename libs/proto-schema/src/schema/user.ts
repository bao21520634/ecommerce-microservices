// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: user.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Address } from "./address";

export const protobufPackage = "user";

export enum LoginServiceTypes {
  Password = 0,
  Google = 1,
  UNRECOGNIZED = -1,
}

export function loginServiceTypesFromJSON(object: any): LoginServiceTypes {
  switch (object) {
    case 0:
    case "Password":
      return LoginServiceTypes.Password;
    case 1:
    case "Google":
      return LoginServiceTypes.Google;
    case -1:
    case "UNRECOGNIZED":
    default:
      return LoginServiceTypes.UNRECOGNIZED;
  }
}

export function loginServiceTypesToJSON(object: LoginServiceTypes): string {
  switch (object) {
    case LoginServiceTypes.Password:
      return "Password";
    case LoginServiceTypes.Google:
      return "Google";
    case LoginServiceTypes.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export enum UserRoles {
  ADMIN = 0,
  USER = 1,
  UNRECOGNIZED = -1,
}

export function userRolesFromJSON(object: any): UserRoles {
  switch (object) {
    case 0:
    case "ADMIN":
      return UserRoles.ADMIN;
    case 1:
    case "USER":
      return UserRoles.USER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return UserRoles.UNRECOGNIZED;
  }
}

export function userRolesToJSON(object: UserRoles): string {
  switch (object) {
    case UserRoles.ADMIN:
      return "ADMIN";
    case UserRoles.USER:
      return "USER";
    case UserRoles.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface PasswordStruct {
  hashed: string;
}

export interface AuthServices {
  password?: PasswordStruct | undefined;
}

export interface Settings {
  stripeId: string;
}

export interface EmailObject {
  address: string;
  verified: boolean;
  primary: boolean;
  verificationCode: string;
}

export interface User {
  id: string;
  username: string;
  primaryEmail: string;
  fullName: string;
  phone?: string | undefined;
  address?: Address | undefined;
  sex?: string | undefined;
  dob?: string | undefined;
  bio?: string | undefined;
  role: UserRoles;
  emails: EmailObject[];
  services?: AuthServices | undefined;
  settings?: Settings | undefined;
}

export interface CreateRequest {
  username: string;
  password: string;
  email: string;
  fullName: string;
  service: LoginServiceTypes;
  tokens: { [key: string]: string };
}

export interface CreateRequest_TokensEntry {
  key: string;
  value: string;
}

export interface CreateResponse {
  activationLink: string;
}

export interface DeleteRequest {
  id: string;
}

export interface DeleteResponse {
  success: boolean;
}

export interface ReadRequest {
  query: string;
}

export interface ReadResponse {
  user?: User | undefined;
}

export interface UpdateRequest {
  user?: User | undefined;
}

export interface UpdateResponse {
  user?: User | undefined;
}

export interface SearchRequest {
  username: string;
  email: string;
  limit: number;
  offset: number;
}

export interface SearchResponse {
  users: User[];
}

export const USER_PACKAGE_NAME = "user";

function createBasePasswordStruct(): PasswordStruct {
  return { hashed: "" };
}

export const PasswordStruct: MessageFns<PasswordStruct> = {
  encode(message: PasswordStruct, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.hashed !== "") {
      writer.uint32(10).string(message.hashed);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): PasswordStruct {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePasswordStruct();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.hashed = reader.string();
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

  fromJSON(object: any): PasswordStruct {
    return { hashed: isSet(object.hashed) ? globalThis.String(object.hashed) : "" };
  },

  toJSON(message: PasswordStruct): unknown {
    const obj: any = {};
    if (message.hashed !== "") {
      obj.hashed = message.hashed;
    }
    return obj;
  },
};

function createBaseAuthServices(): AuthServices {
  return {};
}

export const AuthServices: MessageFns<AuthServices> = {
  encode(message: AuthServices, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.password !== undefined) {
      PasswordStruct.encode(message.password, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): AuthServices {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseAuthServices();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.password = PasswordStruct.decode(reader, reader.uint32());
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

  fromJSON(object: any): AuthServices {
    return { password: isSet(object.password) ? PasswordStruct.fromJSON(object.password) : undefined };
  },

  toJSON(message: AuthServices): unknown {
    const obj: any = {};
    if (message.password !== undefined) {
      obj.password = PasswordStruct.toJSON(message.password);
    }
    return obj;
  },
};

function createBaseSettings(): Settings {
  return { stripeId: "" };
}

export const Settings: MessageFns<Settings> = {
  encode(message: Settings, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.stripeId !== "") {
      writer.uint32(10).string(message.stripeId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Settings {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSettings();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.stripeId = reader.string();
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

  fromJSON(object: any): Settings {
    return { stripeId: isSet(object.stripeId) ? globalThis.String(object.stripeId) : "" };
  },

  toJSON(message: Settings): unknown {
    const obj: any = {};
    if (message.stripeId !== "") {
      obj.stripeId = message.stripeId;
    }
    return obj;
  },
};

function createBaseEmailObject(): EmailObject {
  return { address: "", verified: false, primary: false, verificationCode: "" };
}

export const EmailObject: MessageFns<EmailObject> = {
  encode(message: EmailObject, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    if (message.verified !== false) {
      writer.uint32(16).bool(message.verified);
    }
    if (message.primary !== false) {
      writer.uint32(24).bool(message.primary);
    }
    if (message.verificationCode !== "") {
      writer.uint32(34).string(message.verificationCode);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EmailObject {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEmailObject();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.address = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.verified = reader.bool();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.primary = reader.bool();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.verificationCode = reader.string();
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

  fromJSON(object: any): EmailObject {
    return {
      address: isSet(object.address) ? globalThis.String(object.address) : "",
      verified: isSet(object.verified) ? globalThis.Boolean(object.verified) : false,
      primary: isSet(object.primary) ? globalThis.Boolean(object.primary) : false,
      verificationCode: isSet(object.verificationCode) ? globalThis.String(object.verificationCode) : "",
    };
  },

  toJSON(message: EmailObject): unknown {
    const obj: any = {};
    if (message.address !== "") {
      obj.address = message.address;
    }
    if (message.verified !== false) {
      obj.verified = message.verified;
    }
    if (message.primary !== false) {
      obj.primary = message.primary;
    }
    if (message.verificationCode !== "") {
      obj.verificationCode = message.verificationCode;
    }
    return obj;
  },
};

function createBaseUser(): User {
  return { id: "", username: "", primaryEmail: "", fullName: "", role: 0, emails: [] };
}

export const User: MessageFns<User> = {
  encode(message: User, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.username !== "") {
      writer.uint32(18).string(message.username);
    }
    if (message.primaryEmail !== "") {
      writer.uint32(26).string(message.primaryEmail);
    }
    if (message.fullName !== "") {
      writer.uint32(34).string(message.fullName);
    }
    if (message.phone !== undefined) {
      writer.uint32(42).string(message.phone);
    }
    if (message.address !== undefined) {
      Address.encode(message.address, writer.uint32(50).fork()).join();
    }
    if (message.sex !== undefined) {
      writer.uint32(58).string(message.sex);
    }
    if (message.dob !== undefined) {
      writer.uint32(66).string(message.dob);
    }
    if (message.bio !== undefined) {
      writer.uint32(74).string(message.bio);
    }
    if (message.role !== 0) {
      writer.uint32(80).int32(message.role);
    }
    for (const v of message.emails) {
      EmailObject.encode(v!, writer.uint32(90).fork()).join();
    }
    if (message.services !== undefined) {
      AuthServices.encode(message.services, writer.uint32(98).fork()).join();
    }
    if (message.settings !== undefined) {
      Settings.encode(message.settings, writer.uint32(106).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): User {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUser();
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

          message.username = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.primaryEmail = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.fullName = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.phone = reader.string();
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          message.address = Address.decode(reader, reader.uint32());
          continue;
        }
        case 7: {
          if (tag !== 58) {
            break;
          }

          message.sex = reader.string();
          continue;
        }
        case 8: {
          if (tag !== 66) {
            break;
          }

          message.dob = reader.string();
          continue;
        }
        case 9: {
          if (tag !== 74) {
            break;
          }

          message.bio = reader.string();
          continue;
        }
        case 10: {
          if (tag !== 80) {
            break;
          }

          message.role = reader.int32() as any;
          continue;
        }
        case 11: {
          if (tag !== 90) {
            break;
          }

          message.emails.push(EmailObject.decode(reader, reader.uint32()));
          continue;
        }
        case 12: {
          if (tag !== 98) {
            break;
          }

          message.services = AuthServices.decode(reader, reader.uint32());
          continue;
        }
        case 13: {
          if (tag !== 106) {
            break;
          }

          message.settings = Settings.decode(reader, reader.uint32());
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

  fromJSON(object: any): User {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      primaryEmail: isSet(object.primaryEmail) ? globalThis.String(object.primaryEmail) : "",
      fullName: isSet(object.fullName) ? globalThis.String(object.fullName) : "",
      phone: isSet(object.phone) ? globalThis.String(object.phone) : undefined,
      address: isSet(object.address) ? Address.fromJSON(object.address) : undefined,
      sex: isSet(object.sex) ? globalThis.String(object.sex) : undefined,
      dob: isSet(object.dob) ? globalThis.String(object.dob) : undefined,
      bio: isSet(object.bio) ? globalThis.String(object.bio) : undefined,
      role: isSet(object.role) ? userRolesFromJSON(object.role) : 0,
      emails: globalThis.Array.isArray(object?.emails) ? object.emails.map((e: any) => EmailObject.fromJSON(e)) : [],
      services: isSet(object.services) ? AuthServices.fromJSON(object.services) : undefined,
      settings: isSet(object.settings) ? Settings.fromJSON(object.settings) : undefined,
    };
  },

  toJSON(message: User): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.primaryEmail !== "") {
      obj.primaryEmail = message.primaryEmail;
    }
    if (message.fullName !== "") {
      obj.fullName = message.fullName;
    }
    if (message.phone !== undefined) {
      obj.phone = message.phone;
    }
    if (message.address !== undefined) {
      obj.address = Address.toJSON(message.address);
    }
    if (message.sex !== undefined) {
      obj.sex = message.sex;
    }
    if (message.dob !== undefined) {
      obj.dob = message.dob;
    }
    if (message.bio !== undefined) {
      obj.bio = message.bio;
    }
    if (message.role !== 0) {
      obj.role = userRolesToJSON(message.role);
    }
    if (message.emails?.length) {
      obj.emails = message.emails.map((e) => EmailObject.toJSON(e));
    }
    if (message.services !== undefined) {
      obj.services = AuthServices.toJSON(message.services);
    }
    if (message.settings !== undefined) {
      obj.settings = Settings.toJSON(message.settings);
    }
    return obj;
  },
};

function createBaseCreateRequest(): CreateRequest {
  return { username: "", password: "", email: "", fullName: "", service: 0, tokens: {} };
}

export const CreateRequest: MessageFns<CreateRequest> = {
  encode(message: CreateRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.password !== "") {
      writer.uint32(18).string(message.password);
    }
    if (message.email !== "") {
      writer.uint32(26).string(message.email);
    }
    if (message.fullName !== "") {
      writer.uint32(34).string(message.fullName);
    }
    if (message.service !== 0) {
      writer.uint32(40).int32(message.service);
    }
    Object.entries(message.tokens).forEach(([key, value]) => {
      CreateRequest_TokensEntry.encode({ key: key as any, value }, writer.uint32(50).fork()).join();
    });
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.password = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 34) {
            break;
          }

          message.fullName = reader.string();
          continue;
        }
        case 5: {
          if (tag !== 40) {
            break;
          }

          message.service = reader.int32() as any;
          continue;
        }
        case 6: {
          if (tag !== 50) {
            break;
          }

          const entry6 = CreateRequest_TokensEntry.decode(reader, reader.uint32());
          if (entry6.value !== undefined) {
            message.tokens[entry6.key] = entry6.value;
          }
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

  fromJSON(object: any): CreateRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      password: isSet(object.password) ? globalThis.String(object.password) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      fullName: isSet(object.fullName) ? globalThis.String(object.fullName) : "",
      service: isSet(object.service) ? loginServiceTypesFromJSON(object.service) : 0,
      tokens: isObject(object.tokens)
        ? Object.entries(object.tokens).reduce<{ [key: string]: string }>((acc, [key, value]) => {
          acc[key] = String(value);
          return acc;
        }, {})
        : {},
    };
  },

  toJSON(message: CreateRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.password !== "") {
      obj.password = message.password;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.fullName !== "") {
      obj.fullName = message.fullName;
    }
    if (message.service !== 0) {
      obj.service = loginServiceTypesToJSON(message.service);
    }
    if (message.tokens) {
      const entries = Object.entries(message.tokens);
      if (entries.length > 0) {
        obj.tokens = {};
        entries.forEach(([k, v]) => {
          obj.tokens[k] = v;
        });
      }
    }
    return obj;
  },
};

function createBaseCreateRequest_TokensEntry(): CreateRequest_TokensEntry {
  return { key: "", value: "" };
}

export const CreateRequest_TokensEntry: MessageFns<CreateRequest_TokensEntry> = {
  encode(message: CreateRequest_TokensEntry, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateRequest_TokensEntry {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateRequest_TokensEntry();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
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

  fromJSON(object: any): CreateRequest_TokensEntry {
    return {
      key: isSet(object.key) ? globalThis.String(object.key) : "",
      value: isSet(object.value) ? globalThis.String(object.value) : "",
    };
  },

  toJSON(message: CreateRequest_TokensEntry): unknown {
    const obj: any = {};
    if (message.key !== "") {
      obj.key = message.key;
    }
    if (message.value !== "") {
      obj.value = message.value;
    }
    return obj;
  },
};

function createBaseCreateResponse(): CreateResponse {
  return { activationLink: "" };
}

export const CreateResponse: MessageFns<CreateResponse> = {
  encode(message: CreateResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.activationLink !== "") {
      writer.uint32(10).string(message.activationLink);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.activationLink = reader.string();
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

  fromJSON(object: any): CreateResponse {
    return { activationLink: isSet(object.activationLink) ? globalThis.String(object.activationLink) : "" };
  },

  toJSON(message: CreateResponse): unknown {
    const obj: any = {};
    if (message.activationLink !== "") {
      obj.activationLink = message.activationLink;
    }
    return obj;
  },
};

function createBaseDeleteRequest(): DeleteRequest {
  return { id: "" };
}

export const DeleteRequest: MessageFns<DeleteRequest> = {
  encode(message: DeleteRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteRequest();
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
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): DeleteRequest {
    return { id: isSet(object.id) ? globalThis.String(object.id) : "" };
  },

  toJSON(message: DeleteRequest): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    return obj;
  },
};

function createBaseDeleteResponse(): DeleteResponse {
  return { success: false };
}

export const DeleteResponse: MessageFns<DeleteResponse> = {
  encode(message: DeleteResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.success !== false) {
      writer.uint32(8).bool(message.success);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.success = reader.bool();
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

  fromJSON(object: any): DeleteResponse {
    return { success: isSet(object.success) ? globalThis.Boolean(object.success) : false };
  },

  toJSON(message: DeleteResponse): unknown {
    const obj: any = {};
    if (message.success !== false) {
      obj.success = message.success;
    }
    return obj;
  },
};

function createBaseReadRequest(): ReadRequest {
  return { query: "" };
}

export const ReadRequest: MessageFns<ReadRequest> = {
  encode(message: ReadRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.query !== "") {
      writer.uint32(42).string(message.query);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReadRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 5: {
          if (tag !== 42) {
            break;
          }

          message.query = reader.string();
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

  fromJSON(object: any): ReadRequest {
    return { query: isSet(object.query) ? globalThis.String(object.query) : "" };
  },

  toJSON(message: ReadRequest): unknown {
    const obj: any = {};
    if (message.query !== "") {
      obj.query = message.query;
    }
    return obj;
  },
};

function createBaseReadResponse(): ReadResponse {
  return {};
}

export const ReadResponse: MessageFns<ReadResponse> = {
  encode(message: ReadResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ReadResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReadResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
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

  fromJSON(object: any): ReadResponse {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: ReadResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },
};

function createBaseUpdateRequest(): UpdateRequest {
  return {};
}

export const UpdateRequest: MessageFns<UpdateRequest> = {
  encode(message: UpdateRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateRequest {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: UpdateRequest): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },
};

function createBaseUpdateResponse(): UpdateResponse {
  return {};
}

export const UpdateResponse: MessageFns<UpdateResponse> = {
  encode(message: UpdateResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.user !== undefined) {
      User.encode(message.user, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.user = User.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateResponse {
    return { user: isSet(object.user) ? User.fromJSON(object.user) : undefined };
  },

  toJSON(message: UpdateResponse): unknown {
    const obj: any = {};
    if (message.user !== undefined) {
      obj.user = User.toJSON(message.user);
    }
    return obj;
  },
};

function createBaseSearchRequest(): SearchRequest {
  return { username: "", email: "", limit: 0, offset: 0 };
}

export const SearchRequest: MessageFns<SearchRequest> = {
  encode(message: SearchRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.username !== "") {
      writer.uint32(10).string(message.username);
    }
    if (message.email !== "") {
      writer.uint32(18).string(message.email);
    }
    if (message.limit !== 0) {
      writer.uint32(24).int32(message.limit);
    }
    if (message.offset !== 0) {
      writer.uint32(32).int32(message.offset);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SearchRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.username = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.email = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.limit = reader.int32();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.offset = reader.int32();
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

  fromJSON(object: any): SearchRequest {
    return {
      username: isSet(object.username) ? globalThis.String(object.username) : "",
      email: isSet(object.email) ? globalThis.String(object.email) : "",
      limit: isSet(object.limit) ? globalThis.Number(object.limit) : 0,
      offset: isSet(object.offset) ? globalThis.Number(object.offset) : 0,
    };
  },

  toJSON(message: SearchRequest): unknown {
    const obj: any = {};
    if (message.username !== "") {
      obj.username = message.username;
    }
    if (message.email !== "") {
      obj.email = message.email;
    }
    if (message.limit !== 0) {
      obj.limit = Math.round(message.limit);
    }
    if (message.offset !== 0) {
      obj.offset = Math.round(message.offset);
    }
    return obj;
  },
};

function createBaseSearchResponse(): SearchResponse {
  return { users: [] };
}

export const SearchResponse: MessageFns<SearchResponse> = {
  encode(message: SearchResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.users) {
      User.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): SearchResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseSearchResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.users.push(User.decode(reader, reader.uint32()));
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

  fromJSON(object: any): SearchResponse {
    return { users: globalThis.Array.isArray(object?.users) ? object.users.map((e: any) => User.fromJSON(e)) : [] };
  },

  toJSON(message: SearchResponse): unknown {
    const obj: any = {};
    if (message.users?.length) {
      obj.users = message.users.map((e) => User.toJSON(e));
    }
    return obj;
  },
};

function isObject(value: any): boolean {
  return typeof value === "object" && value !== null;
}

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
}
