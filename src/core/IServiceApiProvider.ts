import { Document } from "mongoose";
import { IService, IServicePage } from "./IServiceProvider";

// interface for spaceship service for api
export interface IServiceApiProvider {
    /**
     * Get spaceship service list for api
     * @param serviceId to look for
     * @param title to look for
     * @param image to look for
     * @param description to look for
     */
    getList(startIndex: number, pageSize: number, searchStr?: any): Promise<IServicePage>;
}