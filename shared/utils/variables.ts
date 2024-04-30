const ENV_URL_API = typeof process !== "undefined" ? process.env?.URL_API : undefined;
export const URL_API: string = ENV_URL_API ?? "https://togomedium.org/sparqlist/api/";
