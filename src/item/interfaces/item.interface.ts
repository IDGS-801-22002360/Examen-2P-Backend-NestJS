// src/item/interfaces/item.interface.ts

interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

interface Meta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand: string;
  sku: string;
  weight: number;
  dimensions: Dimensions; // Usamos la interfaz Dimensions definida arriba
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: Review[]; // Usamos la interfaz Review definida arriba
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: Meta; // Usamos la interfaz Meta
  images: string[];
  thumbnail: string;
}

// Mantenemos la interfaz Sale (que no está en tu JSON de productos)
export interface Sale {
  id: string;
  productId: number;
  productName: string;
  date: string;
  price: number;
}
