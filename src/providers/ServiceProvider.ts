import { IService, IServiceProvider } from "../core/IServiceProvider";
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
}