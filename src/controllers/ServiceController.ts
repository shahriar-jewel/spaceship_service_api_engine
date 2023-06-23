import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import { IServiceProvider } from "../core/IServiceProvider";
import fs from "fs-extra";
import multiparty from "multiparty";

export class ServiceController extends Controller {

    private ServiceProvider: IServiceProvider;

    public onRegister(): void {
        this.onGet("/", this.index);
        this.onPost("/spaceship/service/create", this.create);
    }
    /**
     * Shall provide spaceship service data
     */
    public async index(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        return res.view('service/index');
    }
    public async create(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        const localPath = `./build/public/uploads/images/`;
        if (!fs.existsSync(localPath)) {
            fs.mkdirSync(localPath);
        }
        let timeNow;
        let newFilePath;
        let currentPath;
        let imageUrl;
        let title;
        let description;
        let image;
        const form = new multiparty.Form();
        try {
            form.parse(req, async (err, fields, files) => {
                if (err) return res.send({ status: 201, error: false, message: err, action: "", data: {} });
                if (!fields.title[0] || !fields.description[0] || files?.image[0].originalFilename === '') return res.send({ status: 400, error: true, message: "Missing required fields!.", action: "fillup all fields", data: {} });
                timeNow = new Date().getTime();
                newFilePath = localPath + timeNow;
                currentPath = newFilePath + files?.image[0]?.originalFilename;
                imageUrl = files?.image[0]?.originalFilename ? (timeNow + files?.image[0]?.originalFilename) : null;
                await fs.move(files?.image[0]?.path, currentPath);

                let serviceId: any = await this.ServiceProvider.lastServiceId();
                serviceId = serviceId + 1;
                title = fields?.title[0];
                description = fields?.description[0];
                image = imageUrl;
                const payload: any = { serviceId, title, image, description };

                await this.ServiceProvider.create(payload).then(async service => {
                    service.isActive = true;
                    service.save();
                    res.bag.successMessage = "Done";
                    return res.send({ status: 200, error: false, message: "Spaceship Service Created Successfully!.", action: "done", data: { service } });
                }).catch(async error => {
                    return res.send({ status: 400, error: true, message: error, action: "", data: {} });
                });
            });
        } catch (err) {
            return res.send({ status: 500, error: true, message: err, action: "try later", data: null });
        }
    }
}