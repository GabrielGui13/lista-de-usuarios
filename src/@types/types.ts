interface UserAddress {
  city: string;
  street: string;
  suite: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  }
}

interface UserCompany {
	name: string
	bs: string;
	catchPhrase: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  address: UserAddress;
	company: UserCompany;
}

export interface Task {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}