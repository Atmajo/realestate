interface MainLayoutProps {
  children: React.ReactNode;
}

interface ScreenWrapperProps {
  children: React.ReactNode;
}

interface PropertyPageProps {
  params: {
    id: string;
  };
}

interface PropertyProps {
  name?: string;
  place?: string;
  company?: string;
  size?: string;
  price?: string;
  image?: string;
  insideImg?: string;
  desc?: string;
  startDate?: Date;
  endDate?: Date;
  link?: string;
  specifications?: {
    plotSize?: string;
    builtUpArea?: string;
    bedrooms?: number;
  };
  features?: {
    id?: number;
    name?: string;
    icon?: string;
  }[];
  location?: {
    desc?: string;
    data?: {
      id?: string;
      name?: string;
      time?: string;
    }[];
    url?: string;
  };
}
