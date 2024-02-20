export interface ProductType {
  length: number;
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: React.ReactNode;
  imagelink_portrait: React.ReactNode;
  ingredients: string;
  special_ingredient: string;
  prices: prices[];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}
export type prices = {
  size: string;
  price: string;
  currency: string;
};