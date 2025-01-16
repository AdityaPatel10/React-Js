export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Props {
  product: Product[];
}

export interface RefreshHandlerProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

export interface PrivateRouteProps {
  element: JSX.Element;
}
