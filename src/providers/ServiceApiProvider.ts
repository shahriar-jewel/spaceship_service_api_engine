import { IServiceApiProvider } from "../core/IServiceApiProvider";
import { IService, IServicePage, IServiceProvider } from "../core/IServiceProvider";
import ServiceModel from "../models/ServiceModel";

export class ServiceApiProvider implements IServiceApiProvider {

    public async getList(page: number = 1, size: number = 10, searchStr?: string): Promise<IServicePage> {
        let filter: any;
        if (searchStr) {
            filter = { "$or": [{ "title": { $regex: searchStr, $options: 'i' } }, { "description": { $regex: searchStr, $options: 'i' } }] };
        }
        const count = await ServiceModel.countDocuments(filter);
        return {
            list: await ServiceModel.find({ ...filter }).skip(size * (page - 1)).limit(size).sort({ createdAt: -1 }),
            size,
            page,
            count
        };
    }
}