import { Controller } from "../core/Controller";
import { NextFunc, HttpRequest, HttpResponse } from "../core/Types";
import fs from "fs-extra";
import multiparty from "multiparty";
import { IServiceApiProvider } from "../core/IServiceApiProvider";

export class ServiceApiController extends Controller {

    private ServiceApiProvider: IServiceApiProvider;

    public onRegister(): void {
        this.onGet("/api/spaceship/service/list", this.list);
    }
    /**
     * Shall provide spaceship service data api
     */
    public async list(req: HttpRequest, res: HttpResponse, next: NextFunc) {
        let page = Number(req.query.page);
        if (!page || page < 1) page = 1;
        const hostAddress: string = req.headers.host +'/uploads/images/';
        const pageSize = Number(req.query.pageSize ? req.query.pageSize : 9);
        await this.ServiceApiProvider.getList(page, pageSize).then(async servicePage => {
            if ((servicePage.list).length > 0) {
                return res.send({ status: 200, error: false, message: "spaceship service list", action: "continue", data: {...servicePage,hostAddress} });
            } else {
                return res.send({ status: 200, error: true, message: "no service found", action: "continue", data: servicePage });
            }
        })
    }
}