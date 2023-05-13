export interface DataType {
  email: string;
  name: string;
  phone: string;
  gender: 'female' | 'male';
  address: {
    city: string;
    street: string;
  };
  id: number;
}