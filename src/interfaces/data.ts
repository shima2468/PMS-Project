
export interface UserProfile {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath: string | null;
  isActivated: boolean;
  group: {
    id: number;
    name: string;
  };
  creationDate: string;
}

