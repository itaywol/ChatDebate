
interface EnvironmentConfig {
    PORT:number
    WS_PORT:number
    NODE_ENV: "production" | "development"
}

function interpolateNodeEnv() {
    return process.env.NODE_ENV === "production" ? "production" : "development"
}

export const EnvironmentService:EnvironmentConfig =  {
    PORT: parseInt(process.env.PORT) || 4000,
    WS_PORT: parseInt(process.env.WS_PORT) || 4001,
    NODE_ENV: interpolateNodeEnv()
}
