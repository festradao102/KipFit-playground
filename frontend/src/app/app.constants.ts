// These constants are injected via webpack environment variables.
// You can add more variables in webpack.common.js or in profile specific webpack.<dev|prod>.js files.
// If you change the values in the webpack config files, you need to re run webpack to update the application

export const VERSION = "1";//process.env.VERSION;
export const DEBUG_INFO_ENABLED = true;//Boolean(process.env.DEBUG_INFO_ENABLED);
export const SERVER_API_URL = "http://localhost:8080/";//process.env.SERVER_API_URL;
export const BUILD_TIMESTAMP = "";//process.env.BUILD_TIMESTAMP;
