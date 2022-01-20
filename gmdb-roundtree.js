import { S as Stanza, _ as __awaiter, d as defineStanzaElement } from './stanza-f44e302d.js';
import { s as select } from './index-7ac31beb.js';
import { A as API_GROWTH_MEDIUM } from './variables-a0dc13d9.js';

const pi = Math.PI,
    tau = 2 * pi,
    epsilon = 1e-6,
    tauEpsilon = tau - epsilon;

function Path() {
  this._x0 = this._y0 = // start of current subpath
  this._x1 = this._y1 = null; // end of current subpath
  this._ = "";
}

function path() {
  return new Path;
}

Path.prototype = path.prototype = {
  constructor: Path,
  moveTo: function(x, y) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y);
  },
  closePath: function() {
    if (this._x1 !== null) {
      this._x1 = this._x0, this._y1 = this._y0;
      this._ += "Z";
    }
  },
  lineTo: function(x, y) {
    this._ += "L" + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  quadraticCurveTo: function(x1, y1, x, y) {
    this._ += "Q" + (+x1) + "," + (+y1) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  bezierCurveTo: function(x1, y1, x2, y2, x, y) {
    this._ += "C" + (+x1) + "," + (+y1) + "," + (+x2) + "," + (+y2) + "," + (this._x1 = +x) + "," + (this._y1 = +y);
  },
  arcTo: function(x1, y1, x2, y2, r) {
    x1 = +x1, y1 = +y1, x2 = +x2, y2 = +y2, r = +r;
    var x0 = this._x1,
        y0 = this._y1,
        x21 = x2 - x1,
        y21 = y2 - y1,
        x01 = x0 - x1,
        y01 = y0 - y1,
        l01_2 = x01 * x01 + y01 * y01;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x1,y1).
    if (this._x1 === null) {
      this._ += "M" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Or, is (x1,y1) coincident with (x0,y0)? Do nothing.
    else if (!(l01_2 > epsilon));

    // Or, are (x0,y0), (x1,y1) and (x2,y2) collinear?
    // Equivalently, is (x1,y1) coincident with (x2,y2)?
    // Or, is the radius zero? Line to (x1,y1).
    else if (!(Math.abs(y01 * x21 - y21 * x01) > epsilon) || !r) {
      this._ += "L" + (this._x1 = x1) + "," + (this._y1 = y1);
    }

    // Otherwise, draw an arc!
    else {
      var x20 = x2 - x0,
          y20 = y2 - y0,
          l21_2 = x21 * x21 + y21 * y21,
          l20_2 = x20 * x20 + y20 * y20,
          l21 = Math.sqrt(l21_2),
          l01 = Math.sqrt(l01_2),
          l = r * Math.tan((pi - Math.acos((l21_2 + l01_2 - l20_2) / (2 * l21 * l01))) / 2),
          t01 = l / l01,
          t21 = l / l21;

      // If the start tangent is not coincident with (x0,y0), line to.
      if (Math.abs(t01 - 1) > epsilon) {
        this._ += "L" + (x1 + t01 * x01) + "," + (y1 + t01 * y01);
      }

      this._ += "A" + r + "," + r + ",0,0," + (+(y01 * x20 > x01 * y20)) + "," + (this._x1 = x1 + t21 * x21) + "," + (this._y1 = y1 + t21 * y21);
    }
  },
  arc: function(x, y, r, a0, a1, ccw) {
    x = +x, y = +y, r = +r, ccw = !!ccw;
    var dx = r * Math.cos(a0),
        dy = r * Math.sin(a0),
        x0 = x + dx,
        y0 = y + dy,
        cw = 1 ^ ccw,
        da = ccw ? a0 - a1 : a1 - a0;

    // Is the radius negative? Error.
    if (r < 0) throw new Error("negative radius: " + r);

    // Is this path empty? Move to (x0,y0).
    if (this._x1 === null) {
      this._ += "M" + x0 + "," + y0;
    }

    // Or, is (x0,y0) not coincident with the previous point? Line to (x0,y0).
    else if (Math.abs(this._x1 - x0) > epsilon || Math.abs(this._y1 - y0) > epsilon) {
      this._ += "L" + x0 + "," + y0;
    }

    // Is this arc empty? We’re done.
    if (!r) return;

    // Does the angle go the wrong way? Flip the direction.
    if (da < 0) da = da % tau + tau;

    // Is this a complete circle? Draw two arcs to complete the circle.
    if (da > tauEpsilon) {
      this._ += "A" + r + "," + r + ",0,1," + cw + "," + (x - dx) + "," + (y - dy) + "A" + r + "," + r + ",0,1," + cw + "," + (this._x1 = x0) + "," + (this._y1 = y0);
    }

    // Is this arc non-empty? Draw an arc!
    else if (da > epsilon) {
      this._ += "A" + r + "," + r + ",0," + (+(da >= pi)) + "," + cw + "," + (this._x1 = x + r * Math.cos(a1)) + "," + (this._y1 = y + r * Math.sin(a1));
    }
  },
  rect: function(x, y, w, h) {
    this._ += "M" + (this._x0 = this._x1 = +x) + "," + (this._y0 = this._y1 = +y) + "h" + (+w) + "v" + (+h) + "h" + (-w) + "Z";
  },
  toString: function() {
    return this._;
  }
};

function defaultSeparation$1(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

function meanX(children) {
  return children.reduce(meanXReduce, 0) / children.length;
}

function meanXReduce(x, c) {
  return x + c.x;
}

function maxY(children) {
  return 1 + children.reduce(maxYReduce, 0);
}

function maxYReduce(y, c) {
  return Math.max(y, c.y);
}

function leafLeft(node) {
  var children;
  while (children = node.children) node = children[0];
  return node;
}

function leafRight(node) {
  var children;
  while (children = node.children) node = children[children.length - 1];
  return node;
}

function cluster() {
  var separation = defaultSeparation$1,
      dx = 1,
      dy = 1,
      nodeSize = false;

  function cluster(root) {
    var previousNode,
        x = 0;

    // First walk, computing the initial x & y values.
    root.eachAfter(function(node) {
      var children = node.children;
      if (children) {
        node.x = meanX(children);
        node.y = maxY(children);
      } else {
        node.x = previousNode ? x += separation(node, previousNode) : 0;
        node.y = 0;
        previousNode = node;
      }
    });

    var left = leafLeft(root),
        right = leafRight(root),
        x0 = left.x - separation(left, right) / 2,
        x1 = right.x + separation(right, left) / 2;

    // Second walk, normalizing x & y to the desired size.
    return root.eachAfter(nodeSize ? function(node) {
      node.x = (node.x - root.x) * dx;
      node.y = (root.y - node.y) * dy;
    } : function(node) {
      node.x = (node.x - x0) / (x1 - x0) * dx;
      node.y = (1 - (root.y ? node.y / root.y : 1)) * dy;
    });
  }

  cluster.separation = function(x) {
    return arguments.length ? (separation = x, cluster) : separation;
  };

  cluster.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? null : [dx, dy]);
  };

  cluster.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], cluster) : (nodeSize ? [dx, dy] : null);
  };

  return cluster;
}

function count(node) {
  var sum = 0,
      children = node.children,
      i = children && children.length;
  if (!i) sum = 1;
  else while (--i >= 0) sum += children[i].value;
  node.value = sum;
}

function node_count() {
  return this.eachAfter(count);
}

function node_each(callback, that) {
  let index = -1;
  for (const node of this) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

function node_eachBefore(callback, that) {
  var node = this, nodes = [node], children, i, index = -1;
  while (node = nodes.pop()) {
    callback.call(that, node, ++index, this);
    if (children = node.children) {
      for (i = children.length - 1; i >= 0; --i) {
        nodes.push(children[i]);
      }
    }
  }
  return this;
}

function node_eachAfter(callback, that) {
  var node = this, nodes = [node], next = [], children, i, n, index = -1;
  while (node = nodes.pop()) {
    next.push(node);
    if (children = node.children) {
      for (i = 0, n = children.length; i < n; ++i) {
        nodes.push(children[i]);
      }
    }
  }
  while (node = next.pop()) {
    callback.call(that, node, ++index, this);
  }
  return this;
}

function node_find(callback, that) {
  let index = -1;
  for (const node of this) {
    if (callback.call(that, node, ++index, this)) {
      return node;
    }
  }
}

function node_sum(value) {
  return this.eachAfter(function(node) {
    var sum = +value(node.data) || 0,
        children = node.children,
        i = children && children.length;
    while (--i >= 0) sum += children[i].value;
    node.value = sum;
  });
}

function node_sort(compare) {
  return this.eachBefore(function(node) {
    if (node.children) {
      node.children.sort(compare);
    }
  });
}

function node_path(end) {
  var start = this,
      ancestor = leastCommonAncestor(start, end),
      nodes = [start];
  while (start !== ancestor) {
    start = start.parent;
    nodes.push(start);
  }
  var k = nodes.length;
  while (end !== ancestor) {
    nodes.splice(k, 0, end);
    end = end.parent;
  }
  return nodes;
}

function leastCommonAncestor(a, b) {
  if (a === b) return a;
  var aNodes = a.ancestors(),
      bNodes = b.ancestors(),
      c = null;
  a = aNodes.pop();
  b = bNodes.pop();
  while (a === b) {
    c = a;
    a = aNodes.pop();
    b = bNodes.pop();
  }
  return c;
}

function node_ancestors() {
  var node = this, nodes = [node];
  while (node = node.parent) {
    nodes.push(node);
  }
  return nodes;
}

function node_descendants() {
  return Array.from(this);
}

function node_leaves() {
  var leaves = [];
  this.eachBefore(function(node) {
    if (!node.children) {
      leaves.push(node);
    }
  });
  return leaves;
}

function node_links() {
  var root = this, links = [];
  root.each(function(node) {
    if (node !== root) { // Don’t include the root’s parent, if any.
      links.push({source: node.parent, target: node});
    }
  });
  return links;
}

function* node_iterator() {
  var node = this, current, next = [node], children, i, n;
  do {
    current = next.reverse(), next = [];
    while (node = current.pop()) {
      yield node;
      if (children = node.children) {
        for (i = 0, n = children.length; i < n; ++i) {
          next.push(children[i]);
        }
      }
    }
  } while (next.length);
}

function hierarchy(data, children) {
  if (data instanceof Map) {
    data = [undefined, data];
    if (children === undefined) children = mapChildren;
  } else if (children === undefined) {
    children = objectChildren;
  }

  var root = new Node(data),
      node,
      nodes = [root],
      child,
      childs,
      i,
      n;

  while (node = nodes.pop()) {
    if ((childs = children(node.data)) && (n = (childs = Array.from(childs)).length)) {
      node.children = childs;
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = childs[i] = new Node(childs[i]));
        child.parent = node;
        child.depth = node.depth + 1;
      }
    }
  }

  return root.eachBefore(computeHeight);
}

function node_copy() {
  return hierarchy(this).eachBefore(copyData);
}

function objectChildren(d) {
  return d.children;
}

function mapChildren(d) {
  return Array.isArray(d) ? d[1] : null;
}

function copyData(node) {
  if (node.data.value !== undefined) node.value = node.data.value;
  node.data = node.data.data;
}

function computeHeight(node) {
  var height = 0;
  do node.height = height;
  while ((node = node.parent) && (node.height < ++height));
}

function Node(data) {
  this.data = data;
  this.depth =
  this.height = 0;
  this.parent = null;
}

Node.prototype = hierarchy.prototype = {
  constructor: Node,
  count: node_count,
  each: node_each,
  eachAfter: node_eachAfter,
  eachBefore: node_eachBefore,
  find: node_find,
  sum: node_sum,
  sort: node_sort,
  path: node_path,
  ancestors: node_ancestors,
  descendants: node_descendants,
  leaves: node_leaves,
  links: node_links,
  copy: node_copy,
  [Symbol.iterator]: node_iterator
};

function defaultSeparation(a, b) {
  return a.parent === b.parent ? 1 : 2;
}

// function radialSeparation(a, b) {
//   return (a.parent === b.parent ? 1 : 2) / a.depth;
// }

// This function is used to traverse the left contour of a subtree (or
// subforest). It returns the successor of v on this contour. This successor is
// either given by the leftmost child of v or by the thread of v. The function
// returns null if and only if v is on the highest level of its subtree.
function nextLeft(v) {
  var children = v.children;
  return children ? children[0] : v.t;
}

// This function works analogously to nextLeft.
function nextRight(v) {
  var children = v.children;
  return children ? children[children.length - 1] : v.t;
}

// Shifts the current subtree rooted at w+. This is done by increasing
// prelim(w+) and mod(w+) by shift.
function moveSubtree(wm, wp, shift) {
  var change = shift / (wp.i - wm.i);
  wp.c -= change;
  wp.s += shift;
  wm.c += change;
  wp.z += shift;
  wp.m += shift;
}

// All other shifts, applied to the smaller subtrees between w- and w+, are
// performed by this function. To prepare the shifts, we have to adjust
// change(w+), shift(w+), and change(w-).
function executeShifts(v) {
  var shift = 0,
      change = 0,
      children = v.children,
      i = children.length,
      w;
  while (--i >= 0) {
    w = children[i];
    w.z += shift;
    w.m += shift;
    shift += w.s + (change += w.c);
  }
}

// If vi-’s ancestor is a sibling of v, returns vi-’s ancestor. Otherwise,
// returns the specified (default) ancestor.
function nextAncestor(vim, v, ancestor) {
  return vim.a.parent === v.parent ? vim.a : ancestor;
}

function TreeNode(node, i) {
  this._ = node;
  this.parent = null;
  this.children = null;
  this.A = null; // default ancestor
  this.a = this; // ancestor
  this.z = 0; // prelim
  this.m = 0; // mod
  this.c = 0; // change
  this.s = 0; // shift
  this.t = null; // thread
  this.i = i; // number
}

TreeNode.prototype = Object.create(Node.prototype);

function treeRoot(root) {
  var tree = new TreeNode(root, 0),
      node,
      nodes = [tree],
      child,
      children,
      i,
      n;

  while (node = nodes.pop()) {
    if (children = node._.children) {
      node.children = new Array(n = children.length);
      for (i = n - 1; i >= 0; --i) {
        nodes.push(child = node.children[i] = new TreeNode(children[i], i));
        child.parent = node;
      }
    }
  }

  (tree.parent = new TreeNode(null, 0)).children = [tree];
  return tree;
}

// Node-link tree diagram using the Reingold-Tilford "tidy" algorithm
function tree() {
  var separation = defaultSeparation,
      dx = 1,
      dy = 1,
      nodeSize = null;

  function tree(root) {
    var t = treeRoot(root);

    // Compute the layout using Buchheim et al.’s algorithm.
    t.eachAfter(firstWalk), t.parent.m = -t.z;
    t.eachBefore(secondWalk);

    // If a fixed node size is specified, scale x and y.
    if (nodeSize) root.eachBefore(sizeNode);

    // If a fixed tree size is specified, scale x and y based on the extent.
    // Compute the left-most, right-most, and depth-most nodes for extents.
    else {
      var left = root,
          right = root,
          bottom = root;
      root.eachBefore(function(node) {
        if (node.x < left.x) left = node;
        if (node.x > right.x) right = node;
        if (node.depth > bottom.depth) bottom = node;
      });
      var s = left === right ? 1 : separation(left, right) / 2,
          tx = s - left.x,
          kx = dx / (right.x + s + tx),
          ky = dy / (bottom.depth || 1);
      root.eachBefore(function(node) {
        node.x = (node.x + tx) * kx;
        node.y = node.depth * ky;
      });
    }

    return root;
  }

  // Computes a preliminary x-coordinate for v. Before that, FIRST WALK is
  // applied recursively to the children of v, as well as the function
  // APPORTION. After spacing out the children by calling EXECUTE SHIFTS, the
  // node v is placed to the midpoint of its outermost children.
  function firstWalk(v) {
    var children = v.children,
        siblings = v.parent.children,
        w = v.i ? siblings[v.i - 1] : null;
    if (children) {
      executeShifts(v);
      var midpoint = (children[0].z + children[children.length - 1].z) / 2;
      if (w) {
        v.z = w.z + separation(v._, w._);
        v.m = v.z - midpoint;
      } else {
        v.z = midpoint;
      }
    } else if (w) {
      v.z = w.z + separation(v._, w._);
    }
    v.parent.A = apportion(v, w, v.parent.A || siblings[0]);
  }

  // Computes all real x-coordinates by summing up the modifiers recursively.
  function secondWalk(v) {
    v._.x = v.z + v.parent.m;
    v.m += v.parent.m;
  }

  // The core of the algorithm. Here, a new subtree is combined with the
  // previous subtrees. Threads are used to traverse the inside and outside
  // contours of the left and right subtree up to the highest common level. The
  // vertices used for the traversals are vi+, vi-, vo-, and vo+, where the
  // superscript o means outside and i means inside, the subscript - means left
  // subtree and + means right subtree. For summing up the modifiers along the
  // contour, we use respective variables si+, si-, so-, and so+. Whenever two
  // nodes of the inside contours conflict, we compute the left one of the
  // greatest uncommon ancestors using the function ANCESTOR and call MOVE
  // SUBTREE to shift the subtree and prepare the shifts of smaller subtrees.
  // Finally, we add a new thread (if necessary).
  function apportion(v, w, ancestor) {
    if (w) {
      var vip = v,
          vop = v,
          vim = w,
          vom = vip.parent.children[0],
          sip = vip.m,
          sop = vop.m,
          sim = vim.m,
          som = vom.m,
          shift;
      while (vim = nextRight(vim), vip = nextLeft(vip), vim && vip) {
        vom = nextLeft(vom);
        vop = nextRight(vop);
        vop.a = v;
        shift = vim.z + sim - vip.z - sip + separation(vim._, vip._);
        if (shift > 0) {
          moveSubtree(nextAncestor(vim, v, ancestor), v, shift);
          sip += shift;
          sop += shift;
        }
        sim += vim.m;
        sip += vip.m;
        som += vom.m;
        sop += vop.m;
      }
      if (vim && !nextRight(vop)) {
        vop.t = vim;
        vop.m += sim - sop;
      }
      if (vip && !nextLeft(vom)) {
        vom.t = vip;
        vom.m += sip - som;
        ancestor = v;
      }
    }
    return ancestor;
  }

  function sizeNode(node) {
    node.x *= dx;
    node.y = node.depth * dy;
  }

  tree.separation = function(x) {
    return arguments.length ? (separation = x, tree) : separation;
  };

  tree.size = function(x) {
    return arguments.length ? (nodeSize = false, dx = +x[0], dy = +x[1], tree) : (nodeSize ? null : [dx, dy]);
  };

  tree.nodeSize = function(x) {
    return arguments.length ? (nodeSize = true, dx = +x[0], dy = +x[1], tree) : (nodeSize ? [dx, dy] : null);
  };

  return tree;
}

function constant(x) {
  return function constant() {
    return x;
  };
}

var slice = Array.prototype.slice;

function x(p) {
  return p[0];
}

function y(p) {
  return p[1];
}

function pointRadial(x, y) {
  return [(y = +y) * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}

function linkSource(d) {
  return d.source;
}

function linkTarget(d) {
  return d.target;
}

function link(curve) {
  var source = linkSource,
      target = linkTarget,
      x$1 = x,
      y$1 = y,
      context = null;

  function link() {
    var buffer, argv = slice.call(arguments), s = source.apply(this, argv), t = target.apply(this, argv);
    if (!context) context = buffer = path();
    curve(context, +x$1.apply(this, (argv[0] = s, argv)), +y$1.apply(this, argv), +x$1.apply(this, (argv[0] = t, argv)), +y$1.apply(this, argv));
    if (buffer) return context = null, buffer + "" || null;
  }

  link.source = function(_) {
    return arguments.length ? (source = _, link) : source;
  };

  link.target = function(_) {
    return arguments.length ? (target = _, link) : target;
  };

  link.x = function(_) {
    return arguments.length ? (x$1 = typeof _ === "function" ? _ : constant(+_), link) : x$1;
  };

  link.y = function(_) {
    return arguments.length ? (y$1 = typeof _ === "function" ? _ : constant(+_), link) : y$1;
  };

  link.context = function(_) {
    return arguments.length ? ((context = _ == null ? null : _), link) : context;
  };

  return link;
}

function curveRadial(context, x0, y0, x1, y1) {
  var p0 = pointRadial(x0, y0),
      p1 = pointRadial(x0, y0 = (y0 + y1) / 2),
      p2 = pointRadial(x1, y0),
      p3 = pointRadial(x1, y1);
  context.moveTo(p0[0], p0[1]);
  context.bezierCurveTo(p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]);
}

function linkRadial() {
  var l = link(curveRadial);
  l.angle = l.x, delete l.x;
  l.radius = l.y, delete l.y;
  return l;
}

const TID_API = `${API_GROWTH_MEDIUM}gms_kegg_code_tid`;
class GmdbRoundtree extends Stanza {
    render() {
        return __awaiter(this, void 0, void 0, function* () {
            const params = this.params;
            const [newicText, codeList] = yield downloadData(params.newick, TID_API);
            const newicTree = parseNewic(newicText);
            const leafList = createLeafList(newicTree, codeList);
            this.renderTemplate({
                template: "stanza.html.hbs",
                parameters: {
                    greeting: `Hello, ${params.newick}!`,
                },
            });
            renderD3(this, newicTree, codeList, leafList);
        });
    }
}
const downloadData = (newicUrl, tidApi) => __awaiter(void 0, void 0, void 0, function* () {
    return Promise.all([
        fetch(newicUrl, { method: "get", mode: "cors" }).then((res) => res.text()),
        fetch(tidApi, {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/x-www-form-urlencoded",
            },
        }).then((res) => res.json()),
    ]);
});
const parseNewic = (rawText) => {
    let newick = rawText.replace(/\n/g, "");
    if (newick.match(/\):/)) {
        const array = newick.split(/\)/);
        let count = 1;
        for (let i = 0; i < array.length; i++) {
            if (array[i].match(/^:/)) {
                array[i] = "n" + count + array[i];
                count++;
            }
        }
        newick = array.join(")");
    }
    if (newick.match(/\);$/)) {
        newick = newick.replace(/^\(/, "").replace(/\);$/, "");
    }
    const stack = [];
    let child;
    const root = [];
    let nodeObj = root;
    const array = newick.split("").reverse();
    for (let i = 0; i < array.length; i++) {
        if (array[i] === ")") {
            stack.push(nodeObj);
            nodeObj = child.children = [];
        }
        else if (array[i] === "(") {
            nodeObj = stack.pop();
        }
        else if (array[i] === ",") ;
        else {
            let string = "";
            for (let j = i; j < array.length; j++) {
                if (array[j] === "(" || array[j] === ")" || array[j] === ",") {
                    i = j - 1;
                    const element = string.split(":");
                    let obj = {
                        name: element[0],
                        distance: element[1],
                        type: "branch",
                    };
                    if (element[0].match("_")) {
                        obj = {
                            name: element[0].split("_")[1],
                            distance: element[1],
                            tag: element[0].split("_")[0],
                            type: "leaf",
                        };
                    }
                    nodeObj.push((child = obj));
                    break;
                }
                string = array[j] + string;
            }
        }
    }
    return { name: "root", children: root };
};
const createLeafList = (newicObj, codeList) => {
    const result = {};
    const process = (obj) => {
        if ("children" in obj) {
            process(obj.children[0]);
            process(obj.children[1]);
        }
        if ("type" in obj && obj.type === "leaf") {
            const id = codeList[obj.name].tid;
            result[obj.name] = id;
        }
    };
    process(newicObj);
    return result;
};
const getChildrenIDs = (d, includeBranches = true) => {
    const arr = [];
    const loopChildren = (c) => {
        c.children.forEach((child) => {
            if (child.children) {
                if (includeBranches) {
                    arr.push(child.data.name);
                }
                loopChildren(child);
            }
            else {
                arr.push(child.data.name);
            }
        });
    };
    loopChildren(d);
    return arr;
};
const renderD3 = (stanza, newicTree, codeList, leafList) => {
    const div = stanza.root.querySelector("#renderDiv");
    const d3Canvas = select(div);
    const linkGenerator = linkRadial()
        .angle((d) => {
        return ((d.x + 90) * Math.PI) / 180;
    })
        .radius((d) => {
        return d.y;
    });
    const onClickItem = (d) => {
        const taxIds = (d.children ? getChildrenIDs(d, false) : [d.data.name]).map((str) => leafList[str]);
        stanza.root.dispatchEvent(new CustomEvent("STANZA_ROUND_TREE_CLICK", {
            bubbles: true,
            composed: true,
            detail: {
                taxIds,
            },
        }));
    };
    const renderCluster = () => {
        let treeShape = 0;
        const radius = 400;
        const svg = d3Canvas
            .append("svg")
            .attr("version", 1.1)
            .attr("xmlns", "http://www.w3.org/2000/svg")
            .attr("id", "roundtree")
            .attr("width", radius * 2)
            .attr("height", radius * 2);
        d3Canvas
            .append("div")
            .attr("id", "popup")
            .style("display", "none")
            .style("position", "absolute")
            .style("padding", "10px")
            .style("background-color", "rgba(255,255,255,0.75)")
            .style("border", "solid 2px #888888")
            .style("max-width", "300px");
        const g = svg.append("g").attr("transform", "translate(" + radius + "," + radius + ")");
        let hierarchyNode = hierarchy(newicTree);
        const cluster$1 = cluster().size([360, radius - 80]);
        const tree$1 = tree()
            .size([360, radius - 80])
            .separation((a, b) => {
            return (a.parent == b.parent ? 1 : 2) / a.depth;
        });
        cluster$1(hierarchyNode);
        g
            .selectAll(".edge")
            .data(hierarchyNode.links())
            .enter()
            .append("path")
            .attr("class", "edge")
            .attr("fill", "none")
            .attr("stroke", "#555")
            .attr("stroke-width", "1.5px")
            .attr("opacity", "0.6")
            .attr("d", linkGenerator);
        const node = g
            .selectAll(".node")
            .data(hierarchyNode.descendants())
            .enter()
            .append("g")
            .attr("class", (d) => {
            let type = "";
            if (d.data) {
                type = " " + d.data.tag + "Node";
            }
            return "node " + d.data.type + "Node" + type;
        })
            .attr("transform", (d) => {
            return "rotate(" + d.x + ")translate(" + d.y + ")";
        });
        node
            .append("circle")
            .attr("id", (d) => {
            return d.data.name;
        })
            .attr("r", 4.5);
        const rePlot = () => {
            hierarchyNode = hierarchy(newicTree);
            if (treeShape == 0) {
                tree$1(hierarchyNode);
                treeShape = 1;
            }
            else {
                cluster$1(hierarchyNode);
                treeShape = 0;
            }
            g.selectAll(".edge")
                .data(hierarchyNode.links())
                .transition()
                .delay(200)
                .duration(700)
                .attr("d", linkGenerator);
            g.selectAll(".node")
                .data(hierarchyNode.descendants())
                .transition()
                .delay(200)
                .duration(700)
                .attr("transform", function (d) {
                return "rotate(" + d.x + ")translate(" + d.y + ")";
            });
        };
        return { svg, rePlot };
    };
    const setLeafLabel = (svg) => {
        svg
            .selectAll(".leafNode")
            .append("text")
            .attr("dy", 3)
            .style("text-anchor", (d) => {
            return d.x < 90 || d.x > 270 ? "start" : "end";
        })
            .attr("transform", (d) => {
            return d.x < 90 || d.x > 270 ? "translate(8)" : "rotate(180)translate(-8)";
        })
            .text((d) => {
            return d.data.name;
        })
            .on("mouseover", (e, d) => {
            d3Canvas
                .select("#popup")
                .style("left", e.offsetX + 10 + "px")
                .style("top", e.offsetY - 10 + "px")
                .style("display", "block")
                .text(codeList[d.data.name].label);
        })
            .on("mouseout", (e, d) => {
            d3Canvas.select("#popup").style("display", "none");
        });
    };
    const setBranchAction = (svg) => {
        svg
            .selectAll(".branchNode")
            .on("click", (e, d) => {
            onClickItem(d);
            svg.selectAll(".branchNode, .leafNode").selectAll("circle").classed("active", false);
            const activeIDs = getChildrenIDs(d);
            activeIDs.push(d.data.name);
            activeIDs.forEach((str) => {
                svg.select(`#${str}`).classed("active", true);
            });
        })
            .on("mouseover", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "#89ffff");
        })
            .on("mouseout", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "");
        });
    };
    const setLeafAction = (svg) => {
        svg
            .selectAll(".leafNode")
            .on("click", (e, d) => {
            onClickItem(d);
            svg.selectAll(".branchNode, .leafNode").selectAll("circle").classed("active", false);
            svg.select(`#${d.data.name}`).classed("active", true);
        })
            .on("mouseover", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "#89ffff");
        })
            .on("mouseout", (e, d) => {
            svg.select("#" + d.data.name).style("stroke", "");
        });
    };
    const appendBtn = (rePlot) => {
        const dlButtonDiv = d3Canvas.append("div").attr("id", "dl_button").style("text-align", "right");
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "change tree shape")
            .on("click", () => {
            rePlot();
        });
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "svg")
            .on("click", () => {
            downloadImg("svg");
        });
        dlButtonDiv
            .append("input")
            .attr("class", "downloadButton")
            .attr("type", "button")
            .attr("value", "png")
            .on("click", () => {
            downloadImg("png");
        });
    };
    const downloadImg = (format) => {
        let filename = "tree";
        const pngZoom = 2;
        let url, img, canvas, context;
        const treeHTML = div.querySelector("#roundtree");
        const styleString = div.parentElement.querySelector("style").outerHTML.replace(/[\r\n]/g, "");
        const tmp = treeHTML.outerHTML.match(/^([^>]+>)(.+)$/);
        const sourceString = tmp[1] + styleString + tmp[2];
        const w = parseInt(select(treeHTML).style("width"));
        const h = parseInt(select(treeHTML).style("height"));
        const aLinkClickDL = () => {
            if (format === "png") {
                context.drawImage(img, 0, 0, w, h, 0, 0, w * pngZoom, h * pngZoom);
                url = canvas.node().toDataURL("image/png");
            }
            const a = select("body").append("a");
            a.attr("class", "downloadLink")
                .attr("download", filename)
                .attr("href", url)
                .text("test")
                .style("display", "none");
            a.node().click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                if (format == "png") {
                    canvas.remove();
                }
                a.remove();
            }, 10);
        };
        if (format === "svg") {
            filename += ".svg";
            const blobObject = new Blob([sourceString], {
                type: "data:image/svg+xml;base64",
            });
            url = window.URL.createObjectURL(blobObject);
            aLinkClickDL();
        }
        else if (format === "png") {
            filename += ".png";
            img = new Image();
            img.src = "data:image/svg+xml;utf8," + encodeURIComponent(sourceString);
            img.addEventListener("load", aLinkClickDL, false);
            canvas = select("body")
                .append("canvas")
                .attr("width", w * pngZoom)
                .attr("height", h * pngZoom)
                .style("display", "none");
            context = canvas.node().getContext("2d");
        }
    };
    const { svg, rePlot } = renderCluster();
    setLeafLabel(svg);
    setBranchAction(svg);
    setLeafAction(svg);
    appendBtn(rePlot);
};

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': GmdbRoundtree
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-roundtree",
	"stanza:label": "Gmdb roundtree",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Graph",
	"stanza:provider": "",
	"stanza:license": "MIT",
	"stanza:author": "Satoshi Onoda",
	"stanza:address": "satoshionoda@gmail.com",
	"stanza:contributor": [
],
	"stanza:created": "2021-02-20",
	"stanza:updated": "2021-02-20",
	"stanza:parameter": [
	{
		"stanza:key": "newick",
		"stanza:example": "http://keggoc-rdf.dbcls.jp/tmp/phylo2.newick",
		"stanza:description": "newick tree format",
		"stanza:required": true
	}
],
	"stanza:about-link-placement": "bottom-right",
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
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    return "<style>\n  #renderDiv {\n    text-align: center;\n    padding: 12px;\n    border-radius: 5px;\n    background-color: #fff;\n    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  }\n\n  .node circle {\n    fill: #fff;\n    stroke: #cccccc;\n    stroke-width: 1.5px;\n  }\n\n  .node text {\n    font: 10px sans-serif;\n  }\n\n  .branchNode, .leafNode {\n    cursor: pointer;\n  }\n\n\n  .aeNode circle {\n    stroke: #89c4ff;\n  }\n\n  .anNode circle {\n    stroke: #ff8989;\n  }\n\n  .faNode circle {\n    stroke: #8989ff;\n  }\n\n  .oaNode circle {\n    stroke: #ffff89;\n  }\n\n  .maNode circle {\n    stroke: #ff89ff;\n  }\n\n  .onNode circle {\n    stroke: #89ff89;\n  }\n\n  circle.active {\n    fill: #FFFF00;\n  }\n\n  .edge {\n    fill: none;\n    stroke: #ccc;\n    stroke-width: 1.5px;\n  }\n\n  input.downloadButton {\n    color: #4ea0c9;\n    font-weight: bold;\n    border: solid 2px #4ea0c9;\n    background-color: transparent;\n    cursor: pointer;\n    margin-left: 10px;\n  }\n\n  div#gm_stanza {\n    /*overflow: scroll;*/\n    overflow: hidden;\n    margin-top: 20px;\n  }\n\n</style>\n\n<div id=\"renderDiv\"></div>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-roundtree.js.map
