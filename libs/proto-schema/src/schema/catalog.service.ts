// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               v3.19.6
// source: catalog.service.proto

/* eslint-disable */
import { Metadata } from "@grpc/grpc-js";
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";
import {
  Categories,
  Category,
  CreateCategoryInput,
  CreateManyCategoriesInput,
  DeleteManyCategoriesInput,
  NullableCategory,
  UpdateCategoryInput,
  UpdateManyCategoriesInput,
} from "./category";
import { Count, DeleteManyResponse, DeleteResponse, Id, Query } from "./common";
import {
  CreateManyProductsInput,
  CreateProductInput,
  DeleteManyProductsInput,
  NullableProduct,
  Product,
  Products,
  UpdateManyProductsInput,
  UpdateProductInput,
} from "./product";
import {
  CreateManyProductCategoriesInput,
  CreateProductCategoryInput,
  DeleteManyProductCategoriesInput,
  DeleteProductCategoryInput,
  NullableProductCategory,
  ProductCategories,
  ProductCategory,
  ProductCategoryFilterInput,
  ProductCategoryInput,
} from "./productCategory";

export const protobufPackage = "catalog";

export const CATALOG_PACKAGE_NAME = "catalog";

export interface CatalogServiceClient {
  /** category */

  category(request: Id, metadata?: Metadata): Observable<NullableCategory>;

  categories(request: Query, metadata?: Metadata): Observable<Categories>;

  categoriesTotal(request: Query, metadata?: Metadata): Observable<Count>;

  createCategory(request: CreateCategoryInput, metadata?: Metadata): Observable<Category>;

  createManyCategories(request: CreateManyCategoriesInput, metadata?: Metadata): Observable<Categories>;

  updateCategory(request: UpdateCategoryInput, metadata?: Metadata): Observable<Category>;

  updateManyCategories(request: UpdateManyCategoriesInput, metadata?: Metadata): Observable<Categories>;

  deleteCategory(request: Id, metadata?: Metadata): Observable<DeleteResponse>;

  deleteManyCategories(request: DeleteManyCategoriesInput, metadata?: Metadata): Observable<DeleteManyResponse>;

  /** product */

  product(request: Id, metadata?: Metadata): Observable<NullableProduct>;

  products(request: Query, metadata?: Metadata): Observable<Products>;

  productsTotal(request: Query, metadata?: Metadata): Observable<Count>;

  createProduct(request: CreateProductInput, metadata?: Metadata): Observable<Product>;

  createManyProducts(request: CreateManyProductsInput, metadata?: Metadata): Observable<Products>;

  updateProduct(request: UpdateProductInput, metadata?: Metadata): Observable<Product>;

  updateManyProducts(request: UpdateManyProductsInput, metadata?: Metadata): Observable<Products>;

  deleteProduct(request: Id, metadata?: Metadata): Observable<DeleteResponse>;

  deleteManyProducts(request: DeleteManyProductsInput, metadata?: Metadata): Observable<DeleteManyResponse>;

  /** product category */

  productCategory(request: ProductCategoryInput, metadata?: Metadata): Observable<NullableProductCategory>;

  productCategories(request: ProductCategoryFilterInput, metadata?: Metadata): Observable<ProductCategories>;

  createProductCategory(request: CreateProductCategoryInput, metadata?: Metadata): Observable<ProductCategory>;

  createManyProductCategories(
    request: CreateManyProductCategoriesInput,
    metadata?: Metadata,
  ): Observable<ProductCategory>;

  deleteProductCategory(request: DeleteProductCategoryInput, metadata?: Metadata): Observable<DeleteResponse>;

  deleteManyProductCategories(
    request: DeleteManyProductCategoriesInput,
    metadata?: Metadata,
  ): Observable<DeleteManyResponse>;
}

export interface CatalogServiceController {
  /** category */

  category(
    request: Id,
    metadata?: Metadata,
  ): Promise<NullableCategory> | Observable<NullableCategory> | NullableCategory;

  categories(request: Query, metadata?: Metadata): Promise<Categories> | Observable<Categories> | Categories;

  categoriesTotal(request: Query, metadata?: Metadata): Promise<Count> | Observable<Count> | Count;

  createCategory(
    request: CreateCategoryInput,
    metadata?: Metadata,
  ): Promise<Category> | Observable<Category> | Category;

  createManyCategories(
    request: CreateManyCategoriesInput,
    metadata?: Metadata,
  ): Promise<Categories> | Observable<Categories> | Categories;

  updateCategory(
    request: UpdateCategoryInput,
    metadata?: Metadata,
  ): Promise<Category> | Observable<Category> | Category;

  updateManyCategories(
    request: UpdateManyCategoriesInput,
    metadata?: Metadata,
  ): Promise<Categories> | Observable<Categories> | Categories;

  deleteCategory(
    request: Id,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  deleteManyCategories(
    request: DeleteManyCategoriesInput,
    metadata?: Metadata,
  ): Promise<DeleteManyResponse> | Observable<DeleteManyResponse> | DeleteManyResponse;

  /** product */

  product(request: Id, metadata?: Metadata): Promise<NullableProduct> | Observable<NullableProduct> | NullableProduct;

  products(request: Query, metadata?: Metadata): Promise<Products> | Observable<Products> | Products;

  productsTotal(request: Query, metadata?: Metadata): Promise<Count> | Observable<Count> | Count;

  createProduct(request: CreateProductInput, metadata?: Metadata): Promise<Product> | Observable<Product> | Product;

  createManyProducts(
    request: CreateManyProductsInput,
    metadata?: Metadata,
  ): Promise<Products> | Observable<Products> | Products;

  updateProduct(request: UpdateProductInput, metadata?: Metadata): Promise<Product> | Observable<Product> | Product;

  updateManyProducts(
    request: UpdateManyProductsInput,
    metadata?: Metadata,
  ): Promise<Products> | Observable<Products> | Products;

  deleteProduct(
    request: Id,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  deleteManyProducts(
    request: DeleteManyProductsInput,
    metadata?: Metadata,
  ): Promise<DeleteManyResponse> | Observable<DeleteManyResponse> | DeleteManyResponse;

  /** product category */

  productCategory(
    request: ProductCategoryInput,
    metadata?: Metadata,
  ): Promise<NullableProductCategory> | Observable<NullableProductCategory> | NullableProductCategory;

  productCategories(
    request: ProductCategoryFilterInput,
    metadata?: Metadata,
  ): Promise<ProductCategories> | Observable<ProductCategories> | ProductCategories;

  createProductCategory(
    request: CreateProductCategoryInput,
    metadata?: Metadata,
  ): Promise<ProductCategory> | Observable<ProductCategory> | ProductCategory;

  createManyProductCategories(
    request: CreateManyProductCategoriesInput,
    metadata?: Metadata,
  ): Promise<ProductCategory> | Observable<ProductCategory> | ProductCategory;

  deleteProductCategory(
    request: DeleteProductCategoryInput,
    metadata?: Metadata,
  ): Promise<DeleteResponse> | Observable<DeleteResponse> | DeleteResponse;

  deleteManyProductCategories(
    request: DeleteManyProductCategoriesInput,
    metadata?: Metadata,
  ): Promise<DeleteManyResponse> | Observable<DeleteManyResponse> | DeleteManyResponse;
}

export function CatalogServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "category",
      "categories",
      "categoriesTotal",
      "createCategory",
      "createManyCategories",
      "updateCategory",
      "updateManyCategories",
      "deleteCategory",
      "deleteManyCategories",
      "product",
      "products",
      "productsTotal",
      "createProduct",
      "createManyProducts",
      "updateProduct",
      "updateManyProducts",
      "deleteProduct",
      "deleteManyProducts",
      "productCategory",
      "productCategories",
      "createProductCategory",
      "createManyProductCategories",
      "deleteProductCategory",
      "deleteManyProductCategories",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("CatalogService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("CatalogService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const CATALOG_SERVICE_NAME = "CatalogService";
