import IAddress from "../common/IAddress"
import IImage from "../common/IImage"

export interface ICard{
    _id: string,
    title: string,
    subtitle: string,
    description: string,
    phone: string,
    email: string,
    web?: string,
    image: IImage,
    address: IAddress,
    bizNumber: number,
    likes: string[],
    user_id: string,
    createdAT: string,
}
    