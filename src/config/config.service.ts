require('dotenv').config();

class ConfigService {
    private readonly config: { [key: string]: any };

    constructor(private readonly env: { [k: string]: string | undefined }) {
        this.config = {
            nest: {
                port: parseInt(this.getValue('PORT', true)),
            },
            cors: {
                enabled: this.getValue('CORS_ENABLED', true),
            },
            swagger: {
                title: this.getValue('SWAGGER_TITLE', true),
                version: this.getValue('SWAGGER_VERSION', true),
                description: this.getValue('SWAGGER_DESCRIPTION', true),
                enabled: this.getValue('SWAGGER_ENABLED', true),
            },
        };
    }

    private getValue(key: string, throwOnMissing = true): string {
        const value = this.env[key];
        if (!value && throwOnMissing) {
            throw new Error(`config error - missing env.${key}`);
        }
        return value || '';
    }

}

const configService = new ConfigService(process.env);

export default (): ConfigService => configService;