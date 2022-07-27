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