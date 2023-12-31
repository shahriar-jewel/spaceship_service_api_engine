import { IService, IServicePage, IServiceProvider } from "../core/IServiceProvider";
import ServiceModel from "../models/ServiceModel";

export class ServiceProvider implements IServiceProvider {
    public async lastServiceId(): Promise<number> {
        const lastEntry = await ServiceModel.find().sort({ serviceId: -1 }).limit(1).catch(err => null);
        if (lastEntry.length === 1) {
            return lastEntry[0].serviceId;
        } else {
            return 0;
        }
    }
    public async create(servicePayload: IService): Promise<IService> {
        return await ServiceModel.create(servicePayload);
    }
    public async getList(startIndex: number = 1, size: number = 10, searchStr?: any): Promise<IServicePage> {
        const bag: any = [];
        let recordsFiltered;
        let services;
        const recordsTotal = await ServiceModel.countDocuments({});
        try {
            if (searchStr.value === '') {
                const regex = new RegExp(searchStr, "i");
                searchStr = { $or: [{ 'title': regex }, { 'description': regex }] };
                services = await ServiceModel.find(searchStr).sort({ 'createdAt': -1 });
                recordsFiltered = await ServiceModel.countDocuments(searchStr);
            } else {
                searchStr = {};
                services = await ServiceModel.find({}).limit(size).skip(startIndex).sort({ 'createdAt': -1 });
                recordsFiltered = recordsTotal;
            }
            return { list: services, size, page: startIndex, count: recordsFiltered };
        } catch (error) {
            return { list: [], size, page: startIndex, count: 0 };
        }
    }
}