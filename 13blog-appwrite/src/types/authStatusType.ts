interface AuthState {
    status: boolean;
  }
  
export interface RootState {
    auth: AuthState;
  }
  
export interface NavItem {
    name: string;
    slug: string;
    active: boolean;
  }