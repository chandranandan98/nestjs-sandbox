import { Config } from "./config.interface";

const config: Config = {
    nest:{
        port: 3000
    },
    cors:{
        enabled: true
    },
    swagger:{
        title:"IT",
        version:"0.0.1",
        description:"Portal",
        enabled: true
    }
}

export default (): Config => config