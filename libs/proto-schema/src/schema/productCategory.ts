// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: productCategory.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { PageInfo } from "./common";
import { Any } from "./google/protobuf/any";
import { NullValue, nullValueFromJSON, nullValueToJSON } from "./google/protobuf/struct";

export const protobufPackage = "productCategory";

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
  sortOrder: number;
}

export interface ProductCategories {
  productCategories: ProductCategory[];
}

export interface ProductCategoryEdge {
  node: ProductCategories | undefined;
  cursor: string;
}

export interface ProductCategoryConnection {
  pageInfo: PageInfo | undefined;
  totalCount: number;
  edges: ProductCategoryEdge[];
}

export interface ProductCategoryInput {
  productId: string;
  categoryId: string;
  sortOrder: number;
}

export interface CreateProductCategoryInput {
  data: ProductCategoryInput | undefined;
}

export interface CreateManyProductCategoriesInput {
  ProductCategories: ProductCategoryInput[];
}

export interface UpdateProductCategoryInput {
  id: string;
  data: ProductCategoryInput | undefined;
}

export interface UpdateManyProductCategoriesInput {
  filter: Any | undefined;
  update: ProductCategoryInput | undefined;
}

export interface DeleteManyProductCategoriesInput {
  filter: Any | undefined;
}

export interface NullableProductCategory {
  null?: NullValue | undefined;
  data?: ProductCategory | undefined;
}

function createBaseProductCategory(): ProductCategory {
  return { id: "", productId: "", categoryId: "", sortOrder: 0 };
}

export const ProductCategory: MessageFns<ProductCategory> = {
  encode(message: ProductCategory, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.productId !== "") {
      writer.uint32(18).string(message.productId);
    }
    if (message.categoryId !== "") {
      writer.uint32(26).string(message.categoryId);
    }
    if (message.sortOrder !== 0) {
      writer.uint32(32).int32(message.sortOrder);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProductCategory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductCategory();
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

          message.productId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.categoryId = reader.string();
          continue;
        }
        case 4: {
          if (tag !== 32) {
            break;
          }

          message.sortOrder = reader.int32();
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

  fromJSON(object: any): ProductCategory {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      productId: isSet(object.productId) ? globalThis.String(object.productId) : "",
      categoryId: isSet(object.categoryId) ? globalThis.String(object.categoryId) : "",
      sortOrder: isSet(object.sortOrder) ? globalThis.Number(object.sortOrder) : 0,
    };
  },

  toJSON(message: ProductCategory): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.productId !== "") {
      obj.productId = message.productId;
    }
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
    }
    if (message.sortOrder !== 0) {
      obj.sortOrder = Math.round(message.sortOrder);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductCategory>, I>>(base?: I): ProductCategory {
    return ProductCategory.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductCategory>, I>>(object: I): ProductCategory {
    const message = createBaseProductCategory();
    message.id = object.id ?? "";
    message.productId = object.productId ?? "";
    message.categoryId = object.categoryId ?? "";
    message.sortOrder = object.sortOrder ?? 0;
    return message;
  },
};

function createBaseProductCategories(): ProductCategories {
  return { productCategories: [] };
}

export const ProductCategories: MessageFns<ProductCategories> = {
  encode(message: ProductCategories, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.productCategories) {
      ProductCategory.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProductCategories {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductCategories();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.productCategories.push(ProductCategory.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ProductCategories {
    return {
      productCategories: globalThis.Array.isArray(object?.productCategories)
        ? object.productCategories.map((e: any) => ProductCategory.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProductCategories): unknown {
    const obj: any = {};
    if (message.productCategories?.length) {
      obj.productCategories = message.productCategories.map((e) => ProductCategory.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductCategories>, I>>(base?: I): ProductCategories {
    return ProductCategories.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductCategories>, I>>(object: I): ProductCategories {
    const message = createBaseProductCategories();
    message.productCategories = object.productCategories?.map((e) => ProductCategory.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProductCategoryEdge(): ProductCategoryEdge {
  return { node: undefined, cursor: "" };
}

export const ProductCategoryEdge: MessageFns<ProductCategoryEdge> = {
  encode(message: ProductCategoryEdge, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.node !== undefined) {
      ProductCategories.encode(message.node, writer.uint32(10).fork()).join();
    }
    if (message.cursor !== "") {
      writer.uint32(18).string(message.cursor);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProductCategoryEdge {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductCategoryEdge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.node = ProductCategories.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.cursor = reader.string();
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

  fromJSON(object: any): ProductCategoryEdge {
    return {
      node: isSet(object.node) ? ProductCategories.fromJSON(object.node) : undefined,
      cursor: isSet(object.cursor) ? globalThis.String(object.cursor) : "",
    };
  },

  toJSON(message: ProductCategoryEdge): unknown {
    const obj: any = {};
    if (message.node !== undefined) {
      obj.node = ProductCategories.toJSON(message.node);
    }
    if (message.cursor !== "") {
      obj.cursor = message.cursor;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductCategoryEdge>, I>>(base?: I): ProductCategoryEdge {
    return ProductCategoryEdge.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductCategoryEdge>, I>>(object: I): ProductCategoryEdge {
    const message = createBaseProductCategoryEdge();
    message.node = (object.node !== undefined && object.node !== null)
      ? ProductCategories.fromPartial(object.node)
      : undefined;
    message.cursor = object.cursor ?? "";
    return message;
  },
};

function createBaseProductCategoryConnection(): ProductCategoryConnection {
  return { pageInfo: undefined, totalCount: 0, edges: [] };
}

export const ProductCategoryConnection: MessageFns<ProductCategoryConnection> = {
  encode(message: ProductCategoryConnection, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.pageInfo !== undefined) {
      PageInfo.encode(message.pageInfo, writer.uint32(10).fork()).join();
    }
    if (message.totalCount !== 0) {
      writer.uint32(16).int32(message.totalCount);
    }
    for (const v of message.edges) {
      ProductCategoryEdge.encode(v!, writer.uint32(26).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProductCategoryConnection {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductCategoryConnection();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.pageInfo = PageInfo.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 16) {
            break;
          }

          message.totalCount = reader.int32();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.edges.push(ProductCategoryEdge.decode(reader, reader.uint32()));
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

  fromJSON(object: any): ProductCategoryConnection {
    return {
      pageInfo: isSet(object.pageInfo) ? PageInfo.fromJSON(object.pageInfo) : undefined,
      totalCount: isSet(object.totalCount) ? globalThis.Number(object.totalCount) : 0,
      edges: globalThis.Array.isArray(object?.edges)
        ? object.edges.map((e: any) => ProductCategoryEdge.fromJSON(e))
        : [],
    };
  },

  toJSON(message: ProductCategoryConnection): unknown {
    const obj: any = {};
    if (message.pageInfo !== undefined) {
      obj.pageInfo = PageInfo.toJSON(message.pageInfo);
    }
    if (message.totalCount !== 0) {
      obj.totalCount = Math.round(message.totalCount);
    }
    if (message.edges?.length) {
      obj.edges = message.edges.map((e) => ProductCategoryEdge.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductCategoryConnection>, I>>(base?: I): ProductCategoryConnection {
    return ProductCategoryConnection.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductCategoryConnection>, I>>(object: I): ProductCategoryConnection {
    const message = createBaseProductCategoryConnection();
    message.pageInfo = (object.pageInfo !== undefined && object.pageInfo !== null)
      ? PageInfo.fromPartial(object.pageInfo)
      : undefined;
    message.totalCount = object.totalCount ?? 0;
    message.edges = object.edges?.map((e) => ProductCategoryEdge.fromPartial(e)) || [];
    return message;
  },
};

function createBaseProductCategoryInput(): ProductCategoryInput {
  return { productId: "", categoryId: "", sortOrder: 0 };
}

export const ProductCategoryInput: MessageFns<ProductCategoryInput> = {
  encode(message: ProductCategoryInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.productId !== "") {
      writer.uint32(10).string(message.productId);
    }
    if (message.categoryId !== "") {
      writer.uint32(18).string(message.categoryId);
    }
    if (message.sortOrder !== 0) {
      writer.uint32(24).int32(message.sortOrder);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): ProductCategoryInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseProductCategoryInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.productId = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.categoryId = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.sortOrder = reader.int32();
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

  fromJSON(object: any): ProductCategoryInput {
    return {
      productId: isSet(object.productId) ? globalThis.String(object.productId) : "",
      categoryId: isSet(object.categoryId) ? globalThis.String(object.categoryId) : "",
      sortOrder: isSet(object.sortOrder) ? globalThis.Number(object.sortOrder) : 0,
    };
  },

  toJSON(message: ProductCategoryInput): unknown {
    const obj: any = {};
    if (message.productId !== "") {
      obj.productId = message.productId;
    }
    if (message.categoryId !== "") {
      obj.categoryId = message.categoryId;
    }
    if (message.sortOrder !== 0) {
      obj.sortOrder = Math.round(message.sortOrder);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<ProductCategoryInput>, I>>(base?: I): ProductCategoryInput {
    return ProductCategoryInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<ProductCategoryInput>, I>>(object: I): ProductCategoryInput {
    const message = createBaseProductCategoryInput();
    message.productId = object.productId ?? "";
    message.categoryId = object.categoryId ?? "";
    message.sortOrder = object.sortOrder ?? 0;
    return message;
  },
};

function createBaseCreateProductCategoryInput(): CreateProductCategoryInput {
  return { data: undefined };
}

export const CreateProductCategoryInput: MessageFns<CreateProductCategoryInput> = {
  encode(message: CreateProductCategoryInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.data !== undefined) {
      ProductCategoryInput.encode(message.data, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateProductCategoryInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateProductCategoryInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.data = ProductCategoryInput.decode(reader, reader.uint32());
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

  fromJSON(object: any): CreateProductCategoryInput {
    return { data: isSet(object.data) ? ProductCategoryInput.fromJSON(object.data) : undefined };
  },

  toJSON(message: CreateProductCategoryInput): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = ProductCategoryInput.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateProductCategoryInput>, I>>(base?: I): CreateProductCategoryInput {
    return CreateProductCategoryInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateProductCategoryInput>, I>>(object: I): CreateProductCategoryInput {
    const message = createBaseCreateProductCategoryInput();
    message.data = (object.data !== undefined && object.data !== null)
      ? ProductCategoryInput.fromPartial(object.data)
      : undefined;
    return message;
  },
};

function createBaseCreateManyProductCategoriesInput(): CreateManyProductCategoriesInput {
  return { ProductCategories: [] };
}

export const CreateManyProductCategoriesInput: MessageFns<CreateManyProductCategoriesInput> = {
  encode(message: CreateManyProductCategoriesInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.ProductCategories) {
      ProductCategoryInput.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CreateManyProductCategoriesInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCreateManyProductCategoriesInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.ProductCategories.push(ProductCategoryInput.decode(reader, reader.uint32()));
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

  fromJSON(object: any): CreateManyProductCategoriesInput {
    return {
      ProductCategories: globalThis.Array.isArray(object?.ProductCategories)
        ? object.ProductCategories.map((e: any) => ProductCategoryInput.fromJSON(e))
        : [],
    };
  },

  toJSON(message: CreateManyProductCategoriesInput): unknown {
    const obj: any = {};
    if (message.ProductCategories?.length) {
      obj.ProductCategories = message.ProductCategories.map((e) => ProductCategoryInput.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CreateManyProductCategoriesInput>, I>>(
    base?: I,
  ): CreateManyProductCategoriesInput {
    return CreateManyProductCategoriesInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CreateManyProductCategoriesInput>, I>>(
    object: I,
  ): CreateManyProductCategoriesInput {
    const message = createBaseCreateManyProductCategoriesInput();
    message.ProductCategories = object.ProductCategories?.map((e) => ProductCategoryInput.fromPartial(e)) || [];
    return message;
  },
};

function createBaseUpdateProductCategoryInput(): UpdateProductCategoryInput {
  return { id: "", data: undefined };
}

export const UpdateProductCategoryInput: MessageFns<UpdateProductCategoryInput> = {
  encode(message: UpdateProductCategoryInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.id !== "") {
      writer.uint32(10).string(message.id);
    }
    if (message.data !== undefined) {
      ProductCategoryInput.encode(message.data, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateProductCategoryInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateProductCategoryInput();
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

          message.data = ProductCategoryInput.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateProductCategoryInput {
    return {
      id: isSet(object.id) ? globalThis.String(object.id) : "",
      data: isSet(object.data) ? ProductCategoryInput.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: UpdateProductCategoryInput): unknown {
    const obj: any = {};
    if (message.id !== "") {
      obj.id = message.id;
    }
    if (message.data !== undefined) {
      obj.data = ProductCategoryInput.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateProductCategoryInput>, I>>(base?: I): UpdateProductCategoryInput {
    return UpdateProductCategoryInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateProductCategoryInput>, I>>(object: I): UpdateProductCategoryInput {
    const message = createBaseUpdateProductCategoryInput();
    message.id = object.id ?? "";
    message.data = (object.data !== undefined && object.data !== null)
      ? ProductCategoryInput.fromPartial(object.data)
      : undefined;
    return message;
  },
};

function createBaseUpdateManyProductCategoriesInput(): UpdateManyProductCategoriesInput {
  return { filter: undefined, update: undefined };
}

export const UpdateManyProductCategoriesInput: MessageFns<UpdateManyProductCategoriesInput> = {
  encode(message: UpdateManyProductCategoriesInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.filter !== undefined) {
      Any.encode(message.filter, writer.uint32(10).fork()).join();
    }
    if (message.update !== undefined) {
      ProductCategoryInput.encode(message.update, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): UpdateManyProductCategoriesInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseUpdateManyProductCategoriesInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.filter = Any.decode(reader, reader.uint32());
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.update = ProductCategoryInput.decode(reader, reader.uint32());
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

  fromJSON(object: any): UpdateManyProductCategoriesInput {
    return {
      filter: isSet(object.filter) ? Any.fromJSON(object.filter) : undefined,
      update: isSet(object.update) ? ProductCategoryInput.fromJSON(object.update) : undefined,
    };
  },

  toJSON(message: UpdateManyProductCategoriesInput): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = Any.toJSON(message.filter);
    }
    if (message.update !== undefined) {
      obj.update = ProductCategoryInput.toJSON(message.update);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<UpdateManyProductCategoriesInput>, I>>(
    base?: I,
  ): UpdateManyProductCategoriesInput {
    return UpdateManyProductCategoriesInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<UpdateManyProductCategoriesInput>, I>>(
    object: I,
  ): UpdateManyProductCategoriesInput {
    const message = createBaseUpdateManyProductCategoriesInput();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? Any.fromPartial(object.filter)
      : undefined;
    message.update = (object.update !== undefined && object.update !== null)
      ? ProductCategoryInput.fromPartial(object.update)
      : undefined;
    return message;
  },
};

function createBaseDeleteManyProductCategoriesInput(): DeleteManyProductCategoriesInput {
  return { filter: undefined };
}

export const DeleteManyProductCategoriesInput: MessageFns<DeleteManyProductCategoriesInput> = {
  encode(message: DeleteManyProductCategoriesInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.filter !== undefined) {
      Any.encode(message.filter, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteManyProductCategoriesInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteManyProductCategoriesInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.filter = Any.decode(reader, reader.uint32());
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

  fromJSON(object: any): DeleteManyProductCategoriesInput {
    return { filter: isSet(object.filter) ? Any.fromJSON(object.filter) : undefined };
  },

  toJSON(message: DeleteManyProductCategoriesInput): unknown {
    const obj: any = {};
    if (message.filter !== undefined) {
      obj.filter = Any.toJSON(message.filter);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<DeleteManyProductCategoriesInput>, I>>(
    base?: I,
  ): DeleteManyProductCategoriesInput {
    return DeleteManyProductCategoriesInput.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<DeleteManyProductCategoriesInput>, I>>(
    object: I,
  ): DeleteManyProductCategoriesInput {
    const message = createBaseDeleteManyProductCategoriesInput();
    message.filter = (object.filter !== undefined && object.filter !== null)
      ? Any.fromPartial(object.filter)
      : undefined;
    return message;
  },
};

function createBaseNullableProductCategory(): NullableProductCategory {
  return { null: undefined, data: undefined };
}

export const NullableProductCategory: MessageFns<NullableProductCategory> = {
  encode(message: NullableProductCategory, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.null !== undefined) {
      writer.uint32(8).int32(message.null);
    }
    if (message.data !== undefined) {
      ProductCategory.encode(message.data, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): NullableProductCategory {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseNullableProductCategory();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 8) {
            break;
          }

          message.null = reader.int32() as any;
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.data = ProductCategory.decode(reader, reader.uint32());
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

  fromJSON(object: any): NullableProductCategory {
    return {
      null: isSet(object.null) ? nullValueFromJSON(object.null) : undefined,
      data: isSet(object.data) ? ProductCategory.fromJSON(object.data) : undefined,
    };
  },

  toJSON(message: NullableProductCategory): unknown {
    const obj: any = {};
    if (message.null !== undefined) {
      obj.null = nullValueToJSON(message.null);
    }
    if (message.data !== undefined) {
      obj.data = ProductCategory.toJSON(message.data);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<NullableProductCategory>, I>>(base?: I): NullableProductCategory {
    return NullableProductCategory.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<NullableProductCategory>, I>>(object: I): NullableProductCategory {
    const message = createBaseNullableProductCategory();
    message.null = object.null ?? undefined;
    message.data = (object.data !== undefined && object.data !== null)
      ? ProductCategory.fromPartial(object.data)
      : undefined;
    return message;
  },
};

export interface DataLoaderOptions {
  cache?: boolean;
}

export interface DataLoaders {
  rpcDataLoaderOptions?: DataLoaderOptions;
  getDataLoader<T>(identifier: string, constructorFn: () => T): T;
}

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
