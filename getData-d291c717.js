import { _ as __awaiter } from './stanza-f44e302d.js';
import { d as dist } from './index-6aec0cc7.js';

const getData = (url, params, abortController) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, makeOptions(params, abortController ? abortController.signal : null));
    if (response.status !== 200) {
        return {
            status: response.status,
            message: response.statusText,
            body: undefined,
        };
    }
    const body = yield response.json();
    return {
        status: 200,
        body,
    };
});
const makeFormBody = (params) => {
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(dist.isArray(value) ? value.join(",") : value)}`);
    return formBody.join("&");
};
const makeOptions = (params, signal = null) => {
    const body = makeFormBody(params);
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
        signal,
    };
};

export { getData as g, makeFormBody as m };
//# sourceMappingURL=getData-d291c717.js.map
