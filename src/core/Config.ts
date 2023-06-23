
export interface SMTPConf {
    from: string;
    host: string,
    port: number,
    secure: boolean,
    auth: {
      user: string,
      pass: string,
    }
}

export class Config {
    public port: number;
    public mongoUrl: string;
    public apiUrl: string;
    public cookieSecret: string;
    public sessionSecret: string;
    public authSecret: string;
    public authSalt: string;
    public smtp: SMTPConf;

    /**
     * Create a config object based on the configuration file
     * @param obj deserialized config object
     */
    public constructor(obj: any) {
        const keys = Object.keys(obj);
        const confObj = (this as object);
        // Copy properties from the object
        Object.defineProperties(this, Object.getOwnPropertyDescriptors(obj));
        return this.verify();
    }

    /**
     * Verify config and set default values
     */
    private verify(): Config {
        if(!this.port) this.port = 3000;
        return this;
    }
}