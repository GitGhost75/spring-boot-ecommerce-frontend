import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {


  private baseUrl =  environment.luv2shopApiUrl +'/products';
  private categoryUrl =  environment.luv2shopApiUrl +'/product-category';
  
  constructor(private httpClient: HttpClient) {}

  getProductList(theCatecoryId: number): Observable<Product[]> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCatecoryId}`;
    
    return this.getProducts(searchUrl);
  }

  getProductListPaginate(thePage: number, 
                         thePageSize: number, 
                         theCatecoryId: number): Observable<GetResponseProducts> {

    // need to build URL based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCatecoryId}`
                    + `&page=${thePage}&size=${thePageSize}`;
    
    console.log(`Getting products from - ${searchUrl}`);
    
    return this.httpClient.get<GetResponseProducts>(searchUrl);
  }

  searchProducts(theKeyword: string): Observable<Product[]> {
      // need to build URL based on keyword
      const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
  
    return this.getProducts(searchUrl);
  }

  searchProductsPaginate(thePage: number, 
                         thePageSize: number,
                         theKeyword: string): Observable<GetResponseProducts> {

    // need to build URL based on keyword
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`
                    + `&page=${thePage}&size=${thePageSize}`;

  return this.httpClient.get<GetResponseProducts>(searchUrl);
}

  getProduct(theProductId: number): Observable<Product> {
    const productUrl = `${this.baseUrl}/${theProductId}`;
    return this.httpClient.get<Product>(productUrl);
  }

  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory));
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  }
  page : {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  }
}

interface GetResponseProductCategory {
  _embedded: {
    productCategory: ProductCategory[];
  }
}

