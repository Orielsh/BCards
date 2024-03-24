export interface IUserCredentials{
    email: string,
    password: string,
}

export interface IUserLoginDetails{
    _id: string,
    isBusiness: boolean,
    isAdmin: boolean,
}

export interface IUserDetails{
    _id: string,
    name: {
        first: string,
        middle?: string,
        last: string,
        _id:string,
    },
    phone: string,
    email: string,
    password: string,
    image:{
        url: string,
        alt: string,
        _id: string,
    },
    address:{
        state?: string,
        country: string,
        city: string,
        street: string,
        houseNumber: number,
        zip: number,
        _id: string,
    },
    isAdmin: boolean,
    isBusiness: boolean,
    createdAt: string,
}