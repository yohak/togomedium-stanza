import { _ as __awaiter } from './stanza-bd712360.js';
import { e as dist } from './index-56cafe6b.js';

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
//# sourceMappingURL=getData-b32e78c1.js.map
