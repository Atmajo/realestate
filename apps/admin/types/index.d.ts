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

interface ProfAvatarProps {
  src?: string;
}

interface WrapperProps {
  children: React.ReactNode;
}
