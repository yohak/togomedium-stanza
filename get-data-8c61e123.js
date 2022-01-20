import { _ as __awaiter } from './stanza-f44e302d.js';

const getData = (url, params) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield fetch(url, makeOptions(params));
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
    const formBody = Object.entries(params).map(([key, value]) => `${key}=${encodeURIComponent(value)}`);
    return formBody.join("&");
};
const makeOptions = (params) => {
    const body = makeFormBody(params);
    return {
        method: "POST",
        mode: "cors",
        body,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
        },
    };
};

export { getData as g, makeFormBody as m };
//# sourceMappingURL=get-data-8c61e123.js.map
