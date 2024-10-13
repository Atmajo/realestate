interface MainLayoutProps {
  children: React.ReactNode;
}

interface AuthLayoutProps {
  children: React.ReactNode;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface UserType {
  access_token: string;
  authuser: string;
  expires_in: number;
  prompt: string;
  scope: string;
  token_type: string;
}

interface ProfileType {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface PropertyViewProps {
  params: {
    propertyId: string;
  };
}

interface SignUpProps {
  name?: string;
  email: string;
  password: string;
}

interface SignInProps {
  email: string;
  password: string;
}

interface ProfAvatarProps {
  src?: string;
}

interface WrapperProps {
  children: React.ReactNode;
}

interface AuthState {
  user: any; // Adjust this type based on your user object structure
  token: string | null;
  loading: boolean;
  error: string | null; // Can be string or null
}

interface Property {
  id: string;
  name: string;
  type: string;
  status: string;
  possession: string;
  price: string;
  place?: string;
  company?: string;
  size?: string;
  image?: string[];
  insideImg?: string[];
  desc?: string;
  startDate?: string;
  link?: string;
}
