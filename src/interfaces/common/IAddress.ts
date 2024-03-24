export default interface IAddress{
    _id: string,
    state?: string,
    country: string,
    city: string,
    street: string,
    houseNumber: number,
    zip?: number,
  }