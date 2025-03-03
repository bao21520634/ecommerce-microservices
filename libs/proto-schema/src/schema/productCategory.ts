// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: productCategory.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { Any } from "./google/protobuf/any";
import { NullValue, nullValueFromJSON, nullValueToJSON } from "./google/protobuf/struct";

export const protobufPackage = "productCategory";

export interface ProductCategory {
  id: string;
  productId: string;
  categoryId: string;
}

export interface ProductCategories {
  productCategories: ProductCategory[];
}

export interface ProductCategoryInput {
  productId: string;
  categoryId: string;
}

export interface CreateProductCategoryInput {
  data?: ProductCategoryInput | undefined;
}

export interface CreateManyProductCategoriesInput {
  ProductCategories: ProductCategoryInput[];
}

export interface UpdateProductCategoryInput {
  id: string;
  data?: ProductCategoryInput | undefined;
}

export interface DeleteProductCategoryInput {
  data?: ProductCategoryInput | undefined;
}

export interface UpdateManyProductCategoriesInput {
  filter?: Any | undefined;
  update?: ProductCategoryInput | undefined;
}

export interface DeleteManyProductCategoriesInput {
  filter?: Any | undefined;
}

export interface NullableProductCategory {
  null?: NullValue | undefined;
  data?: ProductCategory | undefined;
}

export const PRODUCT_CATEGORY_PACKAGE_NAME = "productCategory";

function createBaseProductCategory(): ProductCategory {
  return { id: "", productId: "", categoryId: "" };
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
    return obj;
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
};

function createBaseProductCategoryInput(): ProductCategoryInput {
  return { productId: "", categoryId: "" };
}

export const ProductCategoryInput: MessageFns<ProductCategoryInput> = {
  encode(message: ProductCategoryInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.productId !== "") {
      writer.uint32(10).string(message.productId);
    }
    if (message.categoryId !== "") {
      writer.uint32(18).string(message.categoryId);
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
    return obj;
  },
};

function createBaseCreateProductCategoryInput(): CreateProductCategoryInput {
  return {};
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
};

function createBaseUpdateProductCategoryInput(): UpdateProductCategoryInput {
  return { id: "" };
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
};

function createBaseDeleteProductCategoryInput(): DeleteProductCategoryInput {
  return {};
}

export const DeleteProductCategoryInput: MessageFns<DeleteProductCategoryInput> = {
  encode(message: DeleteProductCategoryInput, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.data !== undefined) {
      ProductCategoryInput.encode(message.data, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): DeleteProductCategoryInput {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseDeleteProductCategoryInput();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
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

  fromJSON(object: any): DeleteProductCategoryInput {
    return { data: isSet(object.data) ? ProductCategoryInput.fromJSON(object.data) : undefined };
  },

  toJSON(message: DeleteProductCategoryInput): unknown {
    const obj: any = {};
    if (message.data !== undefined) {
      obj.data = ProductCategoryInput.toJSON(message.data);
    }
    return obj;
  },
};

function createBaseUpdateManyProductCategoriesInput(): UpdateManyProductCategoriesInput {
  return {};
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
};

function createBaseDeleteManyProductCategoriesInput(): DeleteManyProductCategoriesInput {
  return {};
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
};

function createBaseNullableProductCategory(): NullableProductCategory {
  return {};
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
