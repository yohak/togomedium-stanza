import { c as commonjsGlobal, S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-bd712360.js';
import { g as getData } from './getData-b32e78c1.js';
import { i as importWebFontForTogoMedium } from './stanza-2d29c499.js';
import { d as makeTogoGenomeOrganismLink, e as makeNcbiOrganismLink, u as unescapeJsonString, c as capitalizeFirstLetter } from './string-21df0709.js';
import { U as URL_API } from './variables-0b8fac13.js';
import './index-56cafe6b.js';

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var pluralizeExports = {};
var pluralize$1 = {
  get exports(){ return pluralizeExports; },
  set exports(v){ pluralizeExports = v; },
};

/* global define */

(function (module, exports) {
	(function (root, pluralize) {
	  /* istanbul ignore else */
	  if (typeof commonjsRequire === 'function' && 'object' === 'object' && 'object' === 'object') {
	    // Node.
	    module.exports = pluralize();
	  } else {
	    // Browser global.
	    root.pluralize = pluralize();
	  }
	})(commonjsGlobal, function () {
	  // Rule storage - pluralize and singularize need to be run sequentially,
	  // while other rules can be optimized using an object for instant lookups.
	  var pluralRules = [];
	  var singularRules = [];
	  var uncountables = {};
	  var irregularPlurals = {};
	  var irregularSingles = {};

	  /**
	   * Sanitize a pluralization rule to a usable regular expression.
	   *
	   * @param  {(RegExp|string)} rule
	   * @return {RegExp}
	   */
	  function sanitizeRule (rule) {
	    if (typeof rule === 'string') {
	      return new RegExp('^' + rule + '$', 'i');
	    }

	    return rule;
	  }

	  /**
	   * Pass in a word token to produce a function that can replicate the case on
	   * another word.
	   *
	   * @param  {string}   word
	   * @param  {string}   token
	   * @return {Function}
	   */
	  function restoreCase (word, token) {
	    // Tokens are an exact match.
	    if (word === token) return token;

	    // Lower cased words. E.g. "hello".
	    if (word === word.toLowerCase()) return token.toLowerCase();

	    // Upper cased words. E.g. "WHISKY".
	    if (word === word.toUpperCase()) return token.toUpperCase();

	    // Title cased words. E.g. "Title".
	    if (word[0] === word[0].toUpperCase()) {
	      return token.charAt(0).toUpperCase() + token.substr(1).toLowerCase();
	    }

	    // Lower cased words. E.g. "test".
	    return token.toLowerCase();
	  }

	  /**
	   * Interpolate a regexp string.
	   *
	   * @param  {string} str
	   * @param  {Array}  args
	   * @return {string}
	   */
	  function interpolate (str, args) {
	    return str.replace(/\$(\d{1,2})/g, function (match, index) {
	      return args[index] || '';
	    });
	  }

	  /**
	   * Replace a word using a rule.
	   *
	   * @param  {string} word
	   * @param  {Array}  rule
	   * @return {string}
	   */
	  function replace (word, rule) {
	    return word.replace(rule[0], function (match, index) {
	      var result = interpolate(rule[1], arguments);

	      if (match === '') {
	        return restoreCase(word[index - 1], result);
	      }

	      return restoreCase(match, result);
	    });
	  }

	  /**
	   * Sanitize a word by passing in the word and sanitization rules.
	   *
	   * @param  {string}   token
	   * @param  {string}   word
	   * @param  {Array}    rules
	   * @return {string}
	   */
	  function sanitizeWord (token, word, rules) {
	    // Empty string or doesn't need fixing.
	    if (!token.length || uncountables.hasOwnProperty(token)) {
	      return word;
	    }

	    var len = rules.length;

	    // Iterate over the sanitization rules and use the first one to match.
	    while (len--) {
	      var rule = rules[len];

	      if (rule[0].test(word)) return replace(word, rule);
	    }

	    return word;
	  }

	  /**
	   * Replace a word with the updated word.
	   *
	   * @param  {Object}   replaceMap
	   * @param  {Object}   keepMap
	   * @param  {Array}    rules
	   * @return {Function}
	   */
	  function replaceWord (replaceMap, keepMap, rules) {
	    return function (word) {
	      // Get the correct token and case restoration functions.
	      var token = word.toLowerCase();

	      // Check against the keep object map.
	      if (keepMap.hasOwnProperty(token)) {
	        return restoreCase(word, token);
	      }

	      // Check against the replacement map for a direct word replacement.
	      if (replaceMap.hasOwnProperty(token)) {
	        return restoreCase(word, replaceMap[token]);
	      }

	      // Run all the rules against the word.
	      return sanitizeWord(token, word, rules);
	    };
	  }

	  /**
	   * Check if a word is part of the map.
	   */
	  function checkWord (replaceMap, keepMap, rules, bool) {
	    return function (word) {
	      var token = word.toLowerCase();

	      if (keepMap.hasOwnProperty(token)) return true;
	      if (replaceMap.hasOwnProperty(token)) return false;

	      return sanitizeWord(token, token, rules) === token;
	    };
	  }

	  /**
	   * Pluralize or singularize a word based on the passed in count.
	   *
	   * @param  {string}  word      The word to pluralize
	   * @param  {number}  count     How many of the word exist
	   * @param  {boolean} inclusive Whether to prefix with the number (e.g. 3 ducks)
	   * @return {string}
	   */
	  function pluralize (word, count, inclusive) {
	    var pluralized = count === 1
	      ? pluralize.singular(word) : pluralize.plural(word);

	    return (inclusive ? count + ' ' : '') + pluralized;
	  }

	  /**
	   * Pluralize a word.
	   *
	   * @type {Function}
	   */
	  pluralize.plural = replaceWord(
	    irregularSingles, irregularPlurals, pluralRules
	  );

	  /**
	   * Check if a word is plural.
	   *
	   * @type {Function}
	   */
	  pluralize.isPlural = checkWord(
	    irregularSingles, irregularPlurals, pluralRules
	  );

	  /**
	   * Singularize a word.
	   *
	   * @type {Function}
	   */
	  pluralize.singular = replaceWord(
	    irregularPlurals, irregularSingles, singularRules
	  );

	  /**
	   * Check if a word is singular.
	   *
	   * @type {Function}
	   */
	  pluralize.isSingular = checkWord(
	    irregularPlurals, irregularSingles, singularRules
	  );

	  /**
	   * Add a pluralization rule to the collection.
	   *
	   * @param {(string|RegExp)} rule
	   * @param {string}          replacement
	   */
	  pluralize.addPluralRule = function (rule, replacement) {
	    pluralRules.push([sanitizeRule(rule), replacement]);
	  };

	  /**
	   * Add a singularization rule to the collection.
	   *
	   * @param {(string|RegExp)} rule
	   * @param {string}          replacement
	   */
	  pluralize.addSingularRule = function (rule, replacement) {
	    singularRules.push([sanitizeRule(rule), replacement]);
	  };

	  /**
	   * Add an uncountable word rule.
	   *
	   * @param {(string|RegExp)} word
	   */
	  pluralize.addUncountableRule = function (word) {
	    if (typeof word === 'string') {
	      uncountables[word.toLowerCase()] = true;
	      return;
	    }

	    // Set singular and plural references for the word.
	    pluralize.addPluralRule(word, '$0');
	    pluralize.addSingularRule(word, '$0');
	  };

	  /**
	   * Add an irregular word definition.
	   *
	   * @param {string} single
	   * @param {string} plural
	   */
	  pluralize.addIrregularRule = function (single, plural) {
	    plural = plural.toLowerCase();
	    single = single.toLowerCase();

	    irregularSingles[single] = plural;
	    irregularPlurals[plural] = single;
	  };

	  /**
	   * Irregular rules.
	   */
	  [
	    // Pronouns.
	    ['I', 'we'],
	    ['me', 'us'],
	    ['he', 'they'],
	    ['she', 'they'],
	    ['them', 'them'],
	    ['myself', 'ourselves'],
	    ['yourself', 'yourselves'],
	    ['itself', 'themselves'],
	    ['herself', 'themselves'],
	    ['himself', 'themselves'],
	    ['themself', 'themselves'],
	    ['is', 'are'],
	    ['was', 'were'],
	    ['has', 'have'],
	    ['this', 'these'],
	    ['that', 'those'],
	    // Words ending in with a consonant and `o`.
	    ['echo', 'echoes'],
	    ['dingo', 'dingoes'],
	    ['volcano', 'volcanoes'],
	    ['tornado', 'tornadoes'],
	    ['torpedo', 'torpedoes'],
	    // Ends with `us`.
	    ['genus', 'genera'],
	    ['viscus', 'viscera'],
	    // Ends with `ma`.
	    ['stigma', 'stigmata'],
	    ['stoma', 'stomata'],
	    ['dogma', 'dogmata'],
	    ['lemma', 'lemmata'],
	    ['schema', 'schemata'],
	    ['anathema', 'anathemata'],
	    // Other irregular rules.
	    ['ox', 'oxen'],
	    ['axe', 'axes'],
	    ['die', 'dice'],
	    ['yes', 'yeses'],
	    ['foot', 'feet'],
	    ['eave', 'eaves'],
	    ['goose', 'geese'],
	    ['tooth', 'teeth'],
	    ['quiz', 'quizzes'],
	    ['human', 'humans'],
	    ['proof', 'proofs'],
	    ['carve', 'carves'],
	    ['valve', 'valves'],
	    ['looey', 'looies'],
	    ['thief', 'thieves'],
	    ['groove', 'grooves'],
	    ['pickaxe', 'pickaxes'],
	    ['passerby', 'passersby']
	  ].forEach(function (rule) {
	    return pluralize.addIrregularRule(rule[0], rule[1]);
	  });

	  /**
	   * Pluralization rules.
	   */
	  [
	    [/s?$/i, 's'],
	    [/[^\u0000-\u007F]$/i, '$0'],
	    [/([^aeiou]ese)$/i, '$1'],
	    [/(ax|test)is$/i, '$1es'],
	    [/(alias|[^aou]us|t[lm]as|gas|ris)$/i, '$1es'],
	    [/(e[mn]u)s?$/i, '$1s'],
	    [/([^l]ias|[aeiou]las|[ejzr]as|[iu]am)$/i, '$1'],
	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1i'],
	    [/(alumn|alg|vertebr)(?:a|ae)$/i, '$1ae'],
	    [/(seraph|cherub)(?:im)?$/i, '$1im'],
	    [/(her|at|gr)o$/i, '$1oes'],
	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|automat|quor)(?:a|um)$/i, '$1a'],
	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)(?:a|on)$/i, '$1a'],
	    [/sis$/i, 'ses'],
	    [/(?:(kni|wi|li)fe|(ar|l|ea|eo|oa|hoo)f)$/i, '$1$2ves'],
	    [/([^aeiouy]|qu)y$/i, '$1ies'],
	    [/([^ch][ieo][ln])ey$/i, '$1ies'],
	    [/(x|ch|ss|sh|zz)$/i, '$1es'],
	    [/(matr|cod|mur|sil|vert|ind|append)(?:ix|ex)$/i, '$1ices'],
	    [/\b((?:tit)?m|l)(?:ice|ouse)$/i, '$1ice'],
	    [/(pe)(?:rson|ople)$/i, '$1ople'],
	    [/(child)(?:ren)?$/i, '$1ren'],
	    [/eaux$/i, '$0'],
	    [/m[ae]n$/i, 'men'],
	    ['thou', 'you']
	  ].forEach(function (rule) {
	    return pluralize.addPluralRule(rule[0], rule[1]);
	  });

	  /**
	   * Singularization rules.
	   */
	  [
	    [/s$/i, ''],
	    [/(ss)$/i, '$1'],
	    [/(wi|kni|(?:after|half|high|low|mid|non|night|[^\w]|^)li)ves$/i, '$1fe'],
	    [/(ar|(?:wo|[ae])l|[eo][ao])ves$/i, '$1f'],
	    [/ies$/i, 'y'],
	    [/\b([pl]|zomb|(?:neck|cross)?t|coll|faer|food|gen|goon|group|lass|talk|goal|cut)ies$/i, '$1ie'],
	    [/\b(mon|smil)ies$/i, '$1ey'],
	    [/\b((?:tit)?m|l)ice$/i, '$1ouse'],
	    [/(seraph|cherub)im$/i, '$1'],
	    [/(x|ch|ss|sh|zz|tto|go|cho|alias|[^aou]us|t[lm]as|gas|(?:her|at|gr)o|[aeiou]ris)(?:es)?$/i, '$1'],
	    [/(analy|diagno|parenthe|progno|synop|the|empha|cri|ne)(?:sis|ses)$/i, '$1sis'],
	    [/(movie|twelve|abuse|e[mn]u)s$/i, '$1'],
	    [/(test)(?:is|es)$/i, '$1is'],
	    [/(alumn|syllab|vir|radi|nucle|fung|cact|stimul|termin|bacill|foc|uter|loc|strat)(?:us|i)$/i, '$1us'],
	    [/(agend|addend|millenni|dat|extrem|bacteri|desiderat|strat|candelabr|errat|ov|symposi|curricul|quor)a$/i, '$1um'],
	    [/(apheli|hyperbat|periheli|asyndet|noumen|phenomen|criteri|organ|prolegomen|hedr|automat)a$/i, '$1on'],
	    [/(alumn|alg|vertebr)ae$/i, '$1a'],
	    [/(cod|mur|sil|vert|ind)ices$/i, '$1ex'],
	    [/(matr|append)ices$/i, '$1ix'],
	    [/(pe)(rson|ople)$/i, '$1rson'],
	    [/(child)ren$/i, '$1'],
	    [/(eau)x?$/i, '$1'],
	    [/men$/i, 'man']
	  ].forEach(function (rule) {
	    return pluralize.addSingularRule(rule[0], rule[1]);
	  });

	  /**
	   * Uncountable rules.
	   */
	  [
	    // Singular words with no plurals.
	    'adulthood',
	    'advice',
	    'agenda',
	    'aid',
	    'aircraft',
	    'alcohol',
	    'ammo',
	    'analytics',
	    'anime',
	    'athletics',
	    'audio',
	    'bison',
	    'blood',
	    'bream',
	    'buffalo',
	    'butter',
	    'carp',
	    'cash',
	    'chassis',
	    'chess',
	    'clothing',
	    'cod',
	    'commerce',
	    'cooperation',
	    'corps',
	    'debris',
	    'diabetes',
	    'digestion',
	    'elk',
	    'energy',
	    'equipment',
	    'excretion',
	    'expertise',
	    'firmware',
	    'flounder',
	    'fun',
	    'gallows',
	    'garbage',
	    'graffiti',
	    'hardware',
	    'headquarters',
	    'health',
	    'herpes',
	    'highjinks',
	    'homework',
	    'housework',
	    'information',
	    'jeans',
	    'justice',
	    'kudos',
	    'labour',
	    'literature',
	    'machinery',
	    'mackerel',
	    'mail',
	    'media',
	    'mews',
	    'moose',
	    'music',
	    'mud',
	    'manga',
	    'news',
	    'only',
	    'personnel',
	    'pike',
	    'plankton',
	    'pliers',
	    'police',
	    'pollution',
	    'premises',
	    'rain',
	    'research',
	    'rice',
	    'salmon',
	    'scissors',
	    'series',
	    'sewage',
	    'shambles',
	    'shrimp',
	    'software',
	    'species',
	    'staff',
	    'swine',
	    'tennis',
	    'traffic',
	    'transportation',
	    'trout',
	    'tuna',
	    'wealth',
	    'welfare',
	    'whiting',
	    'wildebeest',
	    'wildlife',
	    'you',
	    /pok[eé]mon$/i,
	    // Regexes.
	    /[^aeiou]ese$/i, // "chinese", "japanese"
	    /deer$/i, // "deer", "reindeer"
	    /fish$/i, // "fish", "blowfish", "angelfish"
	    /measles$/i,
	    /o[iu]s$/i, // "carnivorous"
	    /pox$/i, // "chickpox", "smallpox"
	    /sheep$/i
	  ].forEach(pluralize.addUncountableRule);

	  return pluralize;
	});
} (pluralize$1));

var pluralize = pluralizeExports;

var TAXON_RANK;
(function (TAXON_RANK) {
    TAXON_RANK["_0_KINGDOM"] = "Kingdom";
    TAXON_RANK["_1_PHYLUM"] = "Phylum";
    TAXON_RANK["_2_CLASS"] = "Class";
    TAXON_RANK["_3_ORDER"] = "Order";
    TAXON_RANK["_4_FAMILY"] = "Family";
    TAXON_RANK["_5_TRIBE"] = "Tribe";
    TAXON_RANK["_6_GENUS"] = "Genus";
    TAXON_RANK["_7_SECTION"] = "Section";
    TAXON_RANK["_8_SERIES"] = "Series";
    TAXON_RANK["_9_SPECIES"] = "Species";
    TAXON_RANK["_10_VARIETY"] = "Variety";
    TAXON_RANK["_11_FORM"] = "Form";
})(TAXON_RANK || (TAXON_RANK = {}));
const availableRanks = [
    TAXON_RANK._0_KINGDOM,
    TAXON_RANK._1_PHYLUM,
    TAXON_RANK._2_CLASS,
    TAXON_RANK._3_ORDER,
    TAXON_RANK._4_FAMILY,
    TAXON_RANK._6_GENUS,
    TAXON_RANK._9_SPECIES,
];
const getRankLevel = (rank) => {
    return availableRanks.indexOf(rank);
};
const getNextTaxon = (rank) => {
    const rankLevel = getRankLevel(rank);
    if (rankLevel === -1) {
        return undefined;
    }
    return availableRanks[rankLevel + 1];
};

class gmdbTaxonByTaxid extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            if (!params.tax_id) {
                return;
            }
            const apiName = "gmdb_taxonomic_rank_by_taxid";
            const result = yield getData(`${URL_API}${apiName}`, {
                tax_id: params.tax_id,
            });
            const data = parseData(result);
            const parameters = yield addRankChildren(data);
            const template = "stanza.html.hbs";
            this.renderTemplate({ template, parameters });
            importWebFontForTogoMedium(this);
        });
    }
}
const addRankChildren = (data) => __awaiter(void 0, void 0, void 0, function* () {
    if (!data.rank) {
        return data;
    }
    const rank = data.rank === "Superkingdom" ? TAXON_RANK._0_KINGDOM : data.rank;
    const nextRank = getNextTaxon(rank);
    const response = yield getData(`${URL_API}list_taxons_by_rank`, {
        tax_id: data.taxid,
        rank: nextRank,
    });
    const getId = (str) => str.split("/").pop();
    const subClasses = response
        .body.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    })
        .map((item) => ({
        label: item.name,
        link: makeLineageLink(getId(item.id), nextRank),
        rank: nextRank,
    }));
    return Object.assign(Object.assign({}, data), { subClass: {
            label: pluralize(nextRank),
            items: subClasses.map((item) => ({
                label: item.label,
                link: item.link,
            })),
        } });
});
const parseData = (data) => {
    return makeSuccessData(data.body);
};
const makeSuccessData = (body) => {
    return {
        subClass: undefined,
        scientific_name: body.scientific_name,
        taxid: body.taxid,
        togoGenomeUrl: makeTogoGenomeOrganismLink(body.taxid),
        ncbiUrl: makeNcbiOrganismLink(body.taxid),
        rank: parseRank(body.rank),
        authority_name: unescapeJsonString(body.authority_name),
        lineage: [
            ...body.lineage
                .filter((item) => item.taxid !== "NA")
                .map((item) => ({
                link: makeLineageLink(item.taxid, item.rank),
                rank: capitalizeFirstLetter(item.rank),
                label: item.label,
                togoGenomeUrl: makeTogoGenomeOrganismLink(item.taxid),
                ncbiUrl: makeNcbiOrganismLink(item.taxid),
            })),
            {
                link: makeLineageLink(body.taxid, body.rank),
                rank: parseRank(body.rank),
                label: body.scientific_name,
                current: true,
            },
        ],
    };
};
const parseRank = (str) => str.split("/").pop();
const makeLineageLink = (id, rank) => rank === TAXON_RANK._9_SPECIES ? `/organism/${id}` : `/taxon/${id}`;

var stanzaModule = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': gmdbTaxonByTaxid
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-taxon-by-taxid",
	"stanza:label": "Gmdb taxon by taxid",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Table",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-03-07",
	"stanza:updated": "2021-03-07",
	"stanza:parameter": [
	{
		"stanza:key": "tax_id",
		"stanza:example": "1678",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
	{
		"stanza:key": "--greeting-color",
		"stanza:type": "color",
		"stanza:default": "#eb7900",
		"stanza:description": "text color of greeting"
	},
	{
		"stanza:key": "--greeting-align",
		"stanza:type": "single-choice",
		"stanza:choice": [
			"left",
			"center",
			"right"
		],
		"stanza:default": "center",
		"stanza:description": "text align of greeting"
	}
]
};

var templates = [
  ["stanza.html.hbs", {"1":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return " <span>Authority name</span>:<br> "
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"authority_name") || (depth0 != null ? lookupProperty(depth0,"authority_name") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"authority_name","hash":{},"data":data,"loc":{"start":{"line":13,"column":84},"end":{"line":13,"column":102}}}) : helper)))
    + " ";
},"3":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <li class=\"list-group-item  "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(4, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":17,"column":34},"end":{"line":17,"column":61}}})) != null ? stack1 : "")
    + "\">\n        <span class=\"rank\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"rank") || (depth0 != null ? lookupProperty(depth0,"rank") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"rank","hash":{},"data":data,"loc":{"start":{"line":18,"column":27},"end":{"line":18,"column":35}}}) : helper)))
    + "</span>\n        <span class=\"label\">\n          "
    + ((stack1 = lookupProperty(helpers,"unless").call(alias1,(data && lookupProperty(data,"last")),{"name":"unless","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":20,"column":10},"end":{"line":20,"column":70}}})) != null ? stack1 : "")
    + "\n          "
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(data && lookupProperty(data,"last")),{"name":"if","hash":{},"fn":container.program(8, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":21,"column":10},"end":{"line":21,"column":39}}})) != null ? stack1 : "")
    + "\n          </span>\n      </li>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "current";
},"6":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":20,"column":36},"end":{"line":20,"column":44}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":20,"column":46},"end":{"line":20,"column":55}}}) : helper)))
    + "</a>";
},"8":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return container.escapeExpression(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"label","hash":{},"data":data,"loc":{"start":{"line":21,"column":23},"end":{"line":21,"column":32}}}) : helper)));
},"10":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "      <a href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"link") || (depth0 != null ? lookupProperty(depth0,"link") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"link","hash":{},"data":data,"loc":{"start":{"line":30,"column":15},"end":{"line":30,"column":23}}}) : helper)))
    + "\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"label") || (depth0 != null ? lookupProperty(depth0,"label") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"label","hash":{},"data":data,"loc":{"start":{"line":30,"column":25},"end":{"line":30,"column":34}}}) : helper)))
    + "</a>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class=\"wrapper\">\n  <p class=\"tax-id\">\n    <span class=\"key\">Taxonomy ID: </span>\n    <span class=\"value\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"taxid") || (depth0 != null ? lookupProperty(depth0,"taxid") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"taxid","hash":{},"data":data,"loc":{"start":{"line":4,"column":24},"end":{"line":4,"column":33}}}) : helper)))
    + "</span>\n    <span class=\"links\">\n      <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"ncbiUrl") || (depth0 != null ? lookupProperty(depth0,"ncbiUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"ncbiUrl","hash":{},"data":data,"loc":{"start":{"line":6,"column":48},"end":{"line":6,"column":59}}}) : helper)))
    + "\">NCBI</a>\n      <a class=\"link-btn\" target=\"_blank\" href=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"togoGenomeUrl") || (depth0 != null ? lookupProperty(depth0,"togoGenomeUrl") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"togoGenomeUrl","hash":{},"data":data,"loc":{"start":{"line":7,"column":48},"end":{"line":7,"column":65}}}) : helper)))
    + "\">TogoGenome</a>\n    </span>\n  </p>\n\n  <p class=\"name\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"scientific_name") || (depth0 != null ? lookupProperty(depth0,"scientific_name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"scientific_name","hash":{},"data":data,"loc":{"start":{"line":11,"column":18},"end":{"line":11,"column":37}}}) : helper)))
    + "</p>\n  <p>Rank: "
    + alias4(((helper = (helper = lookupProperty(helpers,"rank") || (depth0 != null ? lookupProperty(depth0,"rank") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"rank","hash":{},"data":data,"loc":{"start":{"line":12,"column":11},"end":{"line":12,"column":19}}}) : helper)))
    + "</p>\n  <p class=\"authority-name\">"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"authority_name") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":13,"column":28},"end":{"line":13,"column":110}}})) != null ? stack1 : "")
    + "</p>\n  <h3>Lineage</h3>\n  <ul class=\"lineage-list\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"lineage") : depth0),{"name":"each","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":16,"column":4},"end":{"line":24,"column":13}}})) != null ? stack1 : "")
    + "\n  </ul>\n  <h3>"
    + alias4(container.lambda(((stack1 = (depth0 != null ? lookupProperty(depth0,"subClass") : depth0)) != null ? lookupProperty(stack1,"label") : stack1), depth0))
    + "</h3>\n  <div class=\"sub-classes\">\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,((stack1 = (depth0 != null ? lookupProperty(depth0,"subClass") : depth0)) != null ? lookupProperty(stack1,"items") : stack1),{"name":"each","hash":{},"fn":container.program(10, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":29,"column":4},"end":{"line":31,"column":13}}})) != null ? stack1 : "")
    + "  </div>\n\n</div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-taxon-by-taxid.js.map
