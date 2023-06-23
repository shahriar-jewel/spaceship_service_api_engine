import { Document } from "mongoose";
export interface IService extends Document {
    serviceId: number,
    title: string,
    image: number,
    description: string,
    isActive : boolean
}
export interface IServicePage {
    list: IService[],
    size: number,
    page: number,
    count: number
}
// interface for spaceship service
export interface IServiceProvider {
    /**
     * create spaceship service record
     * @param serviceId to look for
     * @param title to look for
     * @param image to look for
     * @param description to look for
     */
    create(servicePayload: IService): Promise<IService>;
    /**
     * Get spaceship service list
     * @param serviceId to look for
     * @param title to look for
     * @param image to look for
     * @param description to look for
     */
    getList(startIndex: number, pageSize: number, searchStr?: any): Promise<IServicePage>;
    /**
     * To get last spaceship service Id
     */
    lastServiceId(): Promise<number>;
}