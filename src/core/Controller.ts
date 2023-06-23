import { Application } from "./Application";
import { ActionCallback, HttpMethods } from "./Action";
import { PathParam } from "./Types";

export class Controller {

    public Application: Application;

    /**
     * On register, controller shall register all the action it supports and initialize itself
     * @param application
     */
    public Register(application: Application): void {
        this.Application = application;

        // Set rest of the registered services
        for(const key of application.getServiceNames()) {
            Object.defineProperty(this, key, {
                get() {
                    return application.get(key);
                }
            });
        }

        this.onRegister();
    }

    /**
     * Register any route here
     */
    public onRegister(): void {
        // Shall override
    }

    /**
     *
     * @param route to match
     * @param callback function to call
     */
    public onGet(route: string, callback: ActionCallback, roles: [] = []) {
        this.registerAction(HttpMethods.GET, route, callback, roles);
    }

    public onPost(route: string, callback: ActionCallback, roles: [] = []) {
        this.registerAction(HttpMethods.POST, route, callback, roles);
    }

    public onPut(route: string, callback: ActionCallback, roles: [] = []) {
        this.registerAction(HttpMethods.PUT, route, callback, roles);
    }

    public onPatch(route: string, callback: ActionCallback, roles: [] = []) {
        this.registerAction(HttpMethods.PATCH, route, callback, roles);
    }

    public onDelete(route: string, callback: ActionCallback, roles: [] = []) {
        this.registerAction(HttpMethods.DELETE, route, callback, roles);
    }

    public registerAction(method: HttpMethods, route: PathParam, callback: ActionCallback, roles: [] = []): void {
        this.Application.registerAction(this, method, route, callback, roles);
    }
}