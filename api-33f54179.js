import { _ as __awaiter, f as __asyncValues } from './stanza-a84d7c1e.js';
import { c as copy } from './index-eb2c9901.js';
import { g as getData } from './getData-1a784a8c.js';
import { U as URL_API } from './variables-58f3d1be.js';

const getMedia = (gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    const apiName = "gmdb_medium_by_gmid";
    const result = yield getData(`${URL_API}${apiName}`, { gm_id });
    if (!result.body)
        throw new Error("No data found");
    const extra = yield getExternalReferences(result.body, gm_id);
    return processData(result.body, extra);
});
const getExternalReferences = (body, gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, e_1, _b, _c;
    var _d;
    const externalReferences = copy(body)
        .components.map((component) => component.items.filter((item) => !!item.reference_media_id && item.reference_media_id !== gm_id))
        .filter((item) => item.length > 0)
        .flat()
        .map((item) => ({
        id: item.reference_media_id,
        name: item.component_name.replace(/ \(.*\)/, "").replace(/\*/g, ""),
    }));
    const extraData = [];
    try {
        for (var _e = true, externalReferences_1 = __asyncValues(externalReferences), externalReferences_1_1; externalReferences_1_1 = yield externalReferences_1.next(), _a = externalReferences_1_1.done, !_a; _e = true) {
            _c = externalReferences_1_1.value;
            _e = false;
            const ref = _c;
            const apiName = "gmdb_medium_by_gmid";
            const result = yield getData(`${URL_API}${apiName}`, { gm_id: ref.id });
            if (result.body) {
                const data = processData(result.body);
                const components = data.components;
                const target = components.find((item) => item.name === ref.name);
                const arr = [target];
                if (target) {
                    const targetIndex = components.indexOf(target);
                    let i = 1;
                    while ((_d = components[targetIndex + i]) === null || _d === void 0 ? void 0 : _d.comment) {
                        const comment = components[targetIndex + i];
                        arr.push(comment);
                        i++;
                        if (i > 100)
                            break;
                    }
                }
                extraData.push({ components: arr, id: ref.id });
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (!_e && !_a && (_b = externalReferences_1.return)) yield _b.call(externalReferences_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return extraData;
});
const processData = (body, extraComponents = []) => {
    const id = body.meta.gm.split("/").pop();
    return {
        id,
        originalId: body.meta.original_media_id,
        name: body.meta.name,
        srcLabel: getSrcLabel(body.meta.src_url),
        srcUrl: body.meta.src_url,
        ph: body.meta.ph,
        components: processComponents(id, body.components, body.comments),
        extraComponents,
    };
};
const processComponents = (myId, tables, comments) => {
    return [...processComponentTables(tables, myId), ...processComponentComments(comments)].sort((a, b) => a.index - b.index);
};
const processComponentTables = (tables, gmID) => {
    return tables.map((table) => ({
        index: table.paragraph_index,
        name: table.subcomponent_name,
        items: table.items.map((item) => {
            var _a, _b;
            return ({
                id: item.gmo_id || "",
                componentName: item.component_name,
                componentLabel: item.label || "",
                concValue: ((_a = item.conc_value) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                concUnit: item.conc_unit || "",
                volume: ((_b = item.volume) === null || _b === void 0 ? void 0 : _b.toString()) || "",
                unit: item.unit || "",
                referenceMediaId: !item.reference_media_id || item.reference_media_id === gmID ? "" : item.reference_media_id,
            });
        }),
    }));
};
const processComponentComments = (comments) => {
    return comments.map((item) => ({
        index: item.paragraph_index,
        comment: item.comment ? item.comment : "&nbsp;",
    }));
};
const getSrcLabel = (str) => {
    switch (true) {
        case str.match(/jcm.*riken/) !== null:
            return "JCM";
        case str.match(/nite.*nbrc/) !== null:
            return "NBRC";
        case str.match(/dsmz\.de/) !== null:
            return "DSMZ";
        case str.match(/atcc\.org/) !== null:
            return "ATCC";
        default:
            return "SRC";
    }
};

export { getMedia as g };
//# sourceMappingURL=api-33f54179.js.map
