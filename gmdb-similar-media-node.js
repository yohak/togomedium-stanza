import { _ as __awaiter, d as defineStanzaElement } from './stanza-be82c2ee.js';
import { Q as COLOR_ACCENT, d as COLOR_WHITE, C as COLOR_PRIMARY, j as jsx, T as TogoMediumReactStanza } from './StanzaReactProvider-87464745.js';
import { c as css, r as reactExports, g as getData } from './getData-e69d262f.js';
import { s as select, c as creator, d as dispatch, t as timer } from './transform-f2aa5726.js';
import { s as stanzaWrapper } from './common-cd178d45.js';
import { c as clone } from './clone-1fb93465.js';
import { U as URL_API } from './variables-58f3d1be.js';
import { g as getMedia } from './api-06d33a38.js';
import './index-1640bb89.js';

function create(name) {
  return select(creator(name).call(document.documentElement));
}

function sourceEvent(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}

function pointer(event, node) {
  event = sourceEvent(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}

// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation(event) {
  event.stopImmediatePropagation();
}

function noevent(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}

function dragDisable(view) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", noevent, nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", noevent, nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = select(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", noevent, nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}

var constant$1 = x => () => x;

function DragEvent(type, {
  sourceEvent,
  subject,
  target,
  identifier,
  active,
  x, y, dx, dy,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    subject: {value: subject, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    identifier: {value: identifier, enumerable: true, configurable: true},
    active: {value: active, enumerable: true, configurable: true},
    x: {value: x, enumerable: true, configurable: true},
    y: {value: y, enumerable: true, configurable: true},
    dx: {value: dx, enumerable: true, configurable: true},
    dy: {value: dy, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}

DragEvent.prototype.on = function() {
  var value = this._.on.apply(this._, arguments);
  return value === this._ ? this : value;
};

// Ignore right-click, since that should open the context menu.
function defaultFilter(event) {
  return !event.ctrlKey && !event.button;
}

function defaultContainer() {
  return this.parentNode;
}

function defaultSubject(event, d) {
  return d == null ? {x: event.x, y: event.y} : d;
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function drag() {
  var filter = defaultFilter,
      container = defaultContainer,
      subject = defaultSubject,
      touchable = defaultTouchable,
      gestures = {},
      listeners = dispatch("start", "drag", "end"),
      active = 0,
      mousedownx,
      mousedowny,
      mousemoving,
      touchending,
      clickDistance2 = 0;

  function drag(selection) {
    selection
        .on("mousedown.drag", mousedowned)
      .filter(touchable)
        .on("touchstart.drag", touchstarted)
        .on("touchmove.drag", touchmoved, nonpassive)
        .on("touchend.drag touchcancel.drag", touchended)
        .style("touch-action", "none")
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  function mousedowned(event, d) {
    if (touchending || !filter.call(this, event, d)) return;
    var gesture = beforestart(this, container.call(this, event, d), event, d, "mouse");
    if (!gesture) return;
    select(event.view)
      .on("mousemove.drag", mousemoved, nonpassivecapture)
      .on("mouseup.drag", mouseupped, nonpassivecapture);
    dragDisable(event.view);
    nopropagation(event);
    mousemoving = false;
    mousedownx = event.clientX;
    mousedowny = event.clientY;
    gesture("start", event);
  }

  function mousemoved(event) {
    noevent(event);
    if (!mousemoving) {
      var dx = event.clientX - mousedownx, dy = event.clientY - mousedowny;
      mousemoving = dx * dx + dy * dy > clickDistance2;
    }
    gestures.mouse("drag", event);
  }

  function mouseupped(event) {
    select(event.view).on("mousemove.drag mouseup.drag", null);
    yesdrag(event.view, mousemoving);
    noevent(event);
    gestures.mouse("end", event);
  }

  function touchstarted(event, d) {
    if (!filter.call(this, event, d)) return;
    var touches = event.changedTouches,
        c = container.call(this, event, d),
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = beforestart(this, c, event, d, touches[i].identifier, touches[i])) {
        nopropagation(event);
        gesture("start", event, touches[i]);
      }
    }
  }

  function touchmoved(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        noevent(event);
        gesture("drag", event, touches[i]);
      }
    }
  }

  function touchended(event) {
    var touches = event.changedTouches,
        n = touches.length, i, gesture;

    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, 500); // Ghost clicks are delayed!
    for (i = 0; i < n; ++i) {
      if (gesture = gestures[touches[i].identifier]) {
        nopropagation(event);
        gesture("end", event, touches[i]);
      }
    }
  }

  function beforestart(that, container, event, d, identifier, touch) {
    var dispatch = listeners.copy(),
        p = pointer(touch || event, container), dx, dy,
        s;

    if ((s = subject.call(that, new DragEvent("beforestart", {
        sourceEvent: event,
        target: drag,
        identifier,
        active,
        x: p[0],
        y: p[1],
        dx: 0,
        dy: 0,
        dispatch
      }), d)) == null) return;

    dx = s.x - p[0] || 0;
    dy = s.y - p[1] || 0;

    return function gesture(type, event, touch) {
      var p0 = p, n;
      switch (type) {
        case "start": gestures[identifier] = gesture, n = active++; break;
        case "end": delete gestures[identifier], --active; // falls through
        case "drag": p = pointer(touch || event, container), n = active; break;
      }
      dispatch.call(
        type,
        that,
        new DragEvent(type, {
          sourceEvent: event,
          subject: s,
          target: drag,
          identifier,
          active: n,
          x: p[0] + dx,
          y: p[1] + dy,
          dx: p[0] - p0[0],
          dy: p[1] - p0[1],
          dispatch
        }),
        d
      );
    };
  }

  drag.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : constant$1(!!_), drag) : filter;
  };

  drag.container = function(_) {
    return arguments.length ? (container = typeof _ === "function" ? _ : constant$1(_), drag) : container;
  };

  drag.subject = function(_) {
    return arguments.length ? (subject = typeof _ === "function" ? _ : constant$1(_), drag) : subject;
  };

  drag.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : constant$1(!!_), drag) : touchable;
  };

  drag.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? drag : value;
  };

  drag.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, drag) : Math.sqrt(clickDistance2);
  };

  return drag;
}

function center(x, y) {
  var nodes, strength = 1;

  if (x == null) x = 0;
  if (y == null) y = 0;

  function force() {
    var i,
        n = nodes.length,
        node,
        sx = 0,
        sy = 0;

    for (i = 0; i < n; ++i) {
      node = nodes[i], sx += node.x, sy += node.y;
    }

    for (sx = (sx / n - x) * strength, sy = (sy / n - y) * strength, i = 0; i < n; ++i) {
      node = nodes[i], node.x -= sx, node.y -= sy;
    }
  }

  force.initialize = function(_) {
    nodes = _;
  };

  force.x = function(_) {
    return arguments.length ? (x = +_, force) : x;
  };

  force.y = function(_) {
    return arguments.length ? (y = +_, force) : y;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  return force;
}

function tree_add(d) {
  const x = +this._x.call(null, d),
      y = +this._y.call(null, d);
  return add(this.cover(x, y), x, y, d);
}

function add(tree, x, y, d) {
  if (isNaN(x) || isNaN(y)) return tree; // ignore invalid points

  var parent,
      node = tree._root,
      leaf = {data: d},
      x0 = tree._x0,
      y0 = tree._y0,
      x1 = tree._x1,
      y1 = tree._y1,
      xm,
      ym,
      xp,
      yp,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return tree._root = leaf, tree;

  // Find the existing leaf for the new point, or add it.
  while (node.length) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (parent = node, !(node = node[i = bottom << 1 | right])) return parent[i] = leaf, tree;
  }

  // Is the new point is exactly coincident with the existing point?
  xp = +tree._x.call(null, node.data);
  yp = +tree._y.call(null, node.data);
  if (x === xp && y === yp) return leaf.next = node, parent ? parent[i] = leaf : tree._root = leaf, tree;

  // Otherwise, split the leaf node until the old and new point are separated.
  do {
    parent = parent ? parent[i] = new Array(4) : tree._root = new Array(4);
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
  } while ((i = bottom << 1 | right) === (j = (yp >= ym) << 1 | (xp >= xm)));
  return parent[j] = node, parent[i] = leaf, tree;
}

function addAll(data) {
  var d, i, n = data.length,
      x,
      y,
      xz = new Array(n),
      yz = new Array(n),
      x0 = Infinity,
      y0 = Infinity,
      x1 = -Infinity,
      y1 = -Infinity;

  // Compute the points and their extent.
  for (i = 0; i < n; ++i) {
    if (isNaN(x = +this._x.call(null, d = data[i])) || isNaN(y = +this._y.call(null, d))) continue;
    xz[i] = x;
    yz[i] = y;
    if (x < x0) x0 = x;
    if (x > x1) x1 = x;
    if (y < y0) y0 = y;
    if (y > y1) y1 = y;
  }

  // If there were no (valid) points, abort.
  if (x0 > x1 || y0 > y1) return this;

  // Expand the tree to cover the new points.
  this.cover(x0, y0).cover(x1, y1);

  // Add the new points.
  for (i = 0; i < n; ++i) {
    add(this, xz[i], yz[i], data[i]);
  }

  return this;
}

function tree_cover(x, y) {
  if (isNaN(x = +x) || isNaN(y = +y)) return this; // ignore invalid points

  var x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1;

  // If the quadtree has no extent, initialize them.
  // Integer extent are necessary so that if we later double the extent,
  // the existing quadrant boundaries don’t change due to floating point error!
  if (isNaN(x0)) {
    x1 = (x0 = Math.floor(x)) + 1;
    y1 = (y0 = Math.floor(y)) + 1;
  }

  // Otherwise, double repeatedly to cover.
  else {
    var z = x1 - x0 || 1,
        node = this._root,
        parent,
        i;

    while (x0 > x || x >= x1 || y0 > y || y >= y1) {
      i = (y < y0) << 1 | (x < x0);
      parent = new Array(4), parent[i] = node, node = parent, z *= 2;
      switch (i) {
        case 0: x1 = x0 + z, y1 = y0 + z; break;
        case 1: x0 = x1 - z, y1 = y0 + z; break;
        case 2: x1 = x0 + z, y0 = y1 - z; break;
        case 3: x0 = x1 - z, y0 = y1 - z; break;
      }
    }

    if (this._root && this._root.length) this._root = node;
  }

  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  return this;
}

function tree_data() {
  var data = [];
  this.visit(function(node) {
    if (!node.length) do data.push(node.data); while (node = node.next)
  });
  return data;
}

function tree_extent(_) {
  return arguments.length
      ? this.cover(+_[0][0], +_[0][1]).cover(+_[1][0], +_[1][1])
      : isNaN(this._x0) ? undefined : [[this._x0, this._y0], [this._x1, this._y1]];
}

function Quad(node, x0, y0, x1, y1) {
  this.node = node;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;
}

function tree_find(x, y, radius) {
  var data,
      x0 = this._x0,
      y0 = this._y0,
      x1,
      y1,
      x2,
      y2,
      x3 = this._x1,
      y3 = this._y1,
      quads = [],
      node = this._root,
      q,
      i;

  if (node) quads.push(new Quad(node, x0, y0, x3, y3));
  if (radius == null) radius = Infinity;
  else {
    x0 = x - radius, y0 = y - radius;
    x3 = x + radius, y3 = y + radius;
    radius *= radius;
  }

  while (q = quads.pop()) {

    // Stop searching if this quadrant can’t contain a closer node.
    if (!(node = q.node)
        || (x1 = q.x0) > x3
        || (y1 = q.y0) > y3
        || (x2 = q.x1) < x0
        || (y2 = q.y1) < y0) continue;

    // Bisect the current quadrant.
    if (node.length) {
      var xm = (x1 + x2) / 2,
          ym = (y1 + y2) / 2;

      quads.push(
        new Quad(node[3], xm, ym, x2, y2),
        new Quad(node[2], x1, ym, xm, y2),
        new Quad(node[1], xm, y1, x2, ym),
        new Quad(node[0], x1, y1, xm, ym)
      );

      // Visit the closest quadrant first.
      if (i = (y >= ym) << 1 | (x >= xm)) {
        q = quads[quads.length - 1];
        quads[quads.length - 1] = quads[quads.length - 1 - i];
        quads[quads.length - 1 - i] = q;
      }
    }

    // Visit this point. (Visiting coincident points isn’t necessary!)
    else {
      var dx = x - +this._x.call(null, node.data),
          dy = y - +this._y.call(null, node.data),
          d2 = dx * dx + dy * dy;
      if (d2 < radius) {
        var d = Math.sqrt(radius = d2);
        x0 = x - d, y0 = y - d;
        x3 = x + d, y3 = y + d;
        data = node.data;
      }
    }
  }

  return data;
}

function tree_remove(d) {
  if (isNaN(x = +this._x.call(null, d)) || isNaN(y = +this._y.call(null, d))) return this; // ignore invalid points

  var parent,
      node = this._root,
      retainer,
      previous,
      next,
      x0 = this._x0,
      y0 = this._y0,
      x1 = this._x1,
      y1 = this._y1,
      x,
      y,
      xm,
      ym,
      right,
      bottom,
      i,
      j;

  // If the tree is empty, initialize the root as a leaf.
  if (!node) return this;

  // Find the leaf node for the point.
  // While descending, also retain the deepest parent with a non-removed sibling.
  if (node.length) while (true) {
    if (right = x >= (xm = (x0 + x1) / 2)) x0 = xm; else x1 = xm;
    if (bottom = y >= (ym = (y0 + y1) / 2)) y0 = ym; else y1 = ym;
    if (!(parent = node, node = node[i = bottom << 1 | right])) return this;
    if (!node.length) break;
    if (parent[(i + 1) & 3] || parent[(i + 2) & 3] || parent[(i + 3) & 3]) retainer = parent, j = i;
  }

  // Find the point to remove.
  while (node.data !== d) if (!(previous = node, node = node.next)) return this;
  if (next = node.next) delete node.next;

  // If there are multiple coincident points, remove just the point.
  if (previous) return (next ? previous.next = next : delete previous.next), this;

  // If this is the root point, remove it.
  if (!parent) return this._root = next, this;

  // Remove this leaf.
  next ? parent[i] = next : delete parent[i];

  // If the parent now contains exactly one leaf, collapse superfluous parents.
  if ((node = parent[0] || parent[1] || parent[2] || parent[3])
      && node === (parent[3] || parent[2] || parent[1] || parent[0])
      && !node.length) {
    if (retainer) retainer[j] = node;
    else this._root = node;
  }

  return this;
}

function removeAll(data) {
  for (var i = 0, n = data.length; i < n; ++i) this.remove(data[i]);
  return this;
}

function tree_root() {
  return this._root;
}

function tree_size() {
  var size = 0;
  this.visit(function(node) {
    if (!node.length) do ++size; while (node = node.next)
  });
  return size;
}

function tree_visit(callback) {
  var quads = [], q, node = this._root, child, x0, y0, x1, y1;
  if (node) quads.push(new Quad(node, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    if (!callback(node = q.node, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1) && node.length) {
      var xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
    }
  }
  return this;
}

function tree_visitAfter(callback) {
  var quads = [], next = [], q;
  if (this._root) quads.push(new Quad(this._root, this._x0, this._y0, this._x1, this._y1));
  while (q = quads.pop()) {
    var node = q.node;
    if (node.length) {
      var child, x0 = q.x0, y0 = q.y0, x1 = q.x1, y1 = q.y1, xm = (x0 + x1) / 2, ym = (y0 + y1) / 2;
      if (child = node[0]) quads.push(new Quad(child, x0, y0, xm, ym));
      if (child = node[1]) quads.push(new Quad(child, xm, y0, x1, ym));
      if (child = node[2]) quads.push(new Quad(child, x0, ym, xm, y1));
      if (child = node[3]) quads.push(new Quad(child, xm, ym, x1, y1));
    }
    next.push(q);
  }
  while (q = next.pop()) {
    callback(q.node, q.x0, q.y0, q.x1, q.y1);
  }
  return this;
}

function defaultX(d) {
  return d[0];
}

function tree_x(_) {
  return arguments.length ? (this._x = _, this) : this._x;
}

function defaultY(d) {
  return d[1];
}

function tree_y(_) {
  return arguments.length ? (this._y = _, this) : this._y;
}

function quadtree(nodes, x, y) {
  var tree = new Quadtree(x == null ? defaultX : x, y == null ? defaultY : y, NaN, NaN, NaN, NaN);
  return nodes == null ? tree : tree.addAll(nodes);
}

function Quadtree(x, y, x0, y0, x1, y1) {
  this._x = x;
  this._y = y;
  this._x0 = x0;
  this._y0 = y0;
  this._x1 = x1;
  this._y1 = y1;
  this._root = undefined;
}

function leaf_copy(leaf) {
  var copy = {data: leaf.data}, next = copy;
  while (leaf = leaf.next) next = next.next = {data: leaf.data};
  return copy;
}

var treeProto = quadtree.prototype = Quadtree.prototype;

treeProto.copy = function() {
  var copy = new Quadtree(this._x, this._y, this._x0, this._y0, this._x1, this._y1),
      node = this._root,
      nodes,
      child;

  if (!node) return copy;

  if (!node.length) return copy._root = leaf_copy(node), copy;

  nodes = [{source: node, target: copy._root = new Array(4)}];
  while (node = nodes.pop()) {
    for (var i = 0; i < 4; ++i) {
      if (child = node.source[i]) {
        if (child.length) nodes.push({source: child, target: node.target[i] = new Array(4)});
        else node.target[i] = leaf_copy(child);
      }
    }
  }

  return copy;
};

treeProto.add = tree_add;
treeProto.addAll = addAll;
treeProto.cover = tree_cover;
treeProto.data = tree_data;
treeProto.extent = tree_extent;
treeProto.find = tree_find;
treeProto.remove = tree_remove;
treeProto.removeAll = removeAll;
treeProto.root = tree_root;
treeProto.size = tree_size;
treeProto.visit = tree_visit;
treeProto.visitAfter = tree_visitAfter;
treeProto.x = tree_x;
treeProto.y = tree_y;

function constant(x) {
  return function() {
    return x;
  };
}

function jiggle(random) {
  return (random() - 0.5) * 1e-6;
}

function x$2(d) {
  return d.x + d.vx;
}

function y$2(d) {
  return d.y + d.vy;
}

function collide(radius) {
  var nodes,
      radii,
      random,
      strength = 1,
      iterations = 1;

  if (typeof radius !== "function") radius = constant(radius == null ? 1 : +radius);

  function force() {
    var i, n = nodes.length,
        tree,
        node,
        xi,
        yi,
        ri,
        ri2;

    for (var k = 0; k < iterations; ++k) {
      tree = quadtree(nodes, x$2, y$2).visitAfter(prepare);
      for (i = 0; i < n; ++i) {
        node = nodes[i];
        ri = radii[node.index], ri2 = ri * ri;
        xi = node.x + node.vx;
        yi = node.y + node.vy;
        tree.visit(apply);
      }
    }

    function apply(quad, x0, y0, x1, y1) {
      var data = quad.data, rj = quad.r, r = ri + rj;
      if (data) {
        if (data.index > node.index) {
          var x = xi - data.x - data.vx,
              y = yi - data.y - data.vy,
              l = x * x + y * y;
          if (l < r * r) {
            if (x === 0) x = jiggle(random), l += x * x;
            if (y === 0) y = jiggle(random), l += y * y;
            l = (r - (l = Math.sqrt(l))) / l * strength;
            node.vx += (x *= l) * (r = (rj *= rj) / (ri2 + rj));
            node.vy += (y *= l) * r;
            data.vx -= x * (r = 1 - r);
            data.vy -= y * r;
          }
        }
        return;
      }
      return x0 > xi + r || x1 < xi - r || y0 > yi + r || y1 < yi - r;
    }
  }

  function prepare(quad) {
    if (quad.data) return quad.r = radii[quad.data.index];
    for (var i = quad.r = 0; i < 4; ++i) {
      if (quad[i] && quad[i].r > quad.r) {
        quad.r = quad[i].r;
      }
    }
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    radii = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], radii[node.index] = +radius(node, i, nodes);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = +_, force) : strength;
  };

  force.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : constant(+_), initialize(), force) : radius;
  };

  return force;
}

function index(d) {
  return d.index;
}

function find(nodeById, nodeId) {
  var node = nodeById.get(nodeId);
  if (!node) throw new Error("node not found: " + nodeId);
  return node;
}

function link(links) {
  var id = index,
      strength = defaultStrength,
      strengths,
      distance = constant(30),
      distances,
      nodes,
      count,
      bias,
      random,
      iterations = 1;

  if (links == null) links = [];

  function defaultStrength(link) {
    return 1 / Math.min(count[link.source.index], count[link.target.index]);
  }

  function force(alpha) {
    for (var k = 0, n = links.length; k < iterations; ++k) {
      for (var i = 0, link, source, target, x, y, l, b; i < n; ++i) {
        link = links[i], source = link.source, target = link.target;
        x = target.x + target.vx - source.x - source.vx || jiggle(random);
        y = target.y + target.vy - source.y - source.vy || jiggle(random);
        l = Math.sqrt(x * x + y * y);
        l = (l - distances[i]) / l * alpha * strengths[i];
        x *= l, y *= l;
        target.vx -= x * (b = bias[i]);
        target.vy -= y * b;
        source.vx += x * (b = 1 - b);
        source.vy += y * b;
      }
    }
  }

  function initialize() {
    if (!nodes) return;

    var i,
        n = nodes.length,
        m = links.length,
        nodeById = new Map(nodes.map((d, i) => [id(d, i, nodes), d])),
        link;

    for (i = 0, count = new Array(n); i < m; ++i) {
      link = links[i], link.index = i;
      if (typeof link.source !== "object") link.source = find(nodeById, link.source);
      if (typeof link.target !== "object") link.target = find(nodeById, link.target);
      count[link.source.index] = (count[link.source.index] || 0) + 1;
      count[link.target.index] = (count[link.target.index] || 0) + 1;
    }

    for (i = 0, bias = new Array(m); i < m; ++i) {
      link = links[i], bias[i] = count[link.source.index] / (count[link.source.index] + count[link.target.index]);
    }

    strengths = new Array(m), initializeStrength();
    distances = new Array(m), initializeDistance();
  }

  function initializeStrength() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      strengths[i] = +strength(links[i], i, links);
    }
  }

  function initializeDistance() {
    if (!nodes) return;

    for (var i = 0, n = links.length; i < n; ++i) {
      distances[i] = +distance(links[i], i, links);
    }
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.links = function(_) {
    return arguments.length ? (links = _, initialize(), force) : links;
  };

  force.id = function(_) {
    return arguments.length ? (id = _, force) : id;
  };

  force.iterations = function(_) {
    return arguments.length ? (iterations = +_, force) : iterations;
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initializeStrength(), force) : strength;
  };

  force.distance = function(_) {
    return arguments.length ? (distance = typeof _ === "function" ? _ : constant(+_), initializeDistance(), force) : distance;
  };

  return force;
}

// https://en.wikipedia.org/wiki/Linear_congruential_generator#Parameters_in_common_use
const a$2 = 1664525;
const c$2 = 1013904223;
const m$1 = 4294967296; // 2^32

function lcg() {
  let s = 1;
  return () => (s = (a$2 * s + c$2) % m$1) / m$1;
}

function x$1(d) {
  return d.x;
}

function y$1(d) {
  return d.y;
}

var initialRadius = 10,
    initialAngle = Math.PI * (3 - Math.sqrt(5));

function simulation(nodes) {
  var simulation,
      alpha = 1,
      alphaMin = 0.001,
      alphaDecay = 1 - Math.pow(alphaMin, 1 / 300),
      alphaTarget = 0,
      velocityDecay = 0.6,
      forces = new Map(),
      stepper = timer(step),
      event = dispatch("tick", "end"),
      random = lcg();

  if (nodes == null) nodes = [];

  function step() {
    tick();
    event.call("tick", simulation);
    if (alpha < alphaMin) {
      stepper.stop();
      event.call("end", simulation);
    }
  }

  function tick(iterations) {
    var i, n = nodes.length, node;

    if (iterations === undefined) iterations = 1;

    for (var k = 0; k < iterations; ++k) {
      alpha += (alphaTarget - alpha) * alphaDecay;

      forces.forEach(function(force) {
        force(alpha);
      });

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        if (node.fx == null) node.x += node.vx *= velocityDecay;
        else node.x = node.fx, node.vx = 0;
        if (node.fy == null) node.y += node.vy *= velocityDecay;
        else node.y = node.fy, node.vy = 0;
      }
    }

    return simulation;
  }

  function initializeNodes() {
    for (var i = 0, n = nodes.length, node; i < n; ++i) {
      node = nodes[i], node.index = i;
      if (node.fx != null) node.x = node.fx;
      if (node.fy != null) node.y = node.fy;
      if (isNaN(node.x) || isNaN(node.y)) {
        var radius = initialRadius * Math.sqrt(0.5 + i), angle = i * initialAngle;
        node.x = radius * Math.cos(angle);
        node.y = radius * Math.sin(angle);
      }
      if (isNaN(node.vx) || isNaN(node.vy)) {
        node.vx = node.vy = 0;
      }
    }
  }

  function initializeForce(force) {
    if (force.initialize) force.initialize(nodes, random);
    return force;
  }

  initializeNodes();

  return simulation = {
    tick: tick,

    restart: function() {
      return stepper.restart(step), simulation;
    },

    stop: function() {
      return stepper.stop(), simulation;
    },

    nodes: function(_) {
      return arguments.length ? (nodes = _, initializeNodes(), forces.forEach(initializeForce), simulation) : nodes;
    },

    alpha: function(_) {
      return arguments.length ? (alpha = +_, simulation) : alpha;
    },

    alphaMin: function(_) {
      return arguments.length ? (alphaMin = +_, simulation) : alphaMin;
    },

    alphaDecay: function(_) {
      return arguments.length ? (alphaDecay = +_, simulation) : +alphaDecay;
    },

    alphaTarget: function(_) {
      return arguments.length ? (alphaTarget = +_, simulation) : alphaTarget;
    },

    velocityDecay: function(_) {
      return arguments.length ? (velocityDecay = 1 - _, simulation) : 1 - velocityDecay;
    },

    randomSource: function(_) {
      return arguments.length ? (random = _, forces.forEach(initializeForce), simulation) : random;
    },

    force: function(name, _) {
      return arguments.length > 1 ? ((_ == null ? forces.delete(name) : forces.set(name, initializeForce(_))), simulation) : forces.get(name);
    },

    find: function(x, y, radius) {
      var i = 0,
          n = nodes.length,
          dx,
          dy,
          d2,
          node,
          closest;

      if (radius == null) radius = Infinity;
      else radius *= radius;

      for (i = 0; i < n; ++i) {
        node = nodes[i];
        dx = x - node.x;
        dy = y - node.y;
        d2 = dx * dx + dy * dy;
        if (d2 < radius) closest = node, radius = d2;
      }

      return closest;
    },

    on: function(name, _) {
      return arguments.length > 1 ? (event.on(name, _), simulation) : event.on(name);
    }
  };
}

function manyBody() {
  var nodes,
      node,
      random,
      alpha,
      strength = constant(-30),
      strengths,
      distanceMin2 = 1,
      distanceMax2 = Infinity,
      theta2 = 0.81;

  function force(_) {
    var i, n = nodes.length, tree = quadtree(nodes, x$1, y$1).visitAfter(accumulate);
    for (alpha = _, i = 0; i < n; ++i) node = nodes[i], tree.visit(apply);
  }

  function initialize() {
    if (!nodes) return;
    var i, n = nodes.length, node;
    strengths = new Array(n);
    for (i = 0; i < n; ++i) node = nodes[i], strengths[node.index] = +strength(node, i, nodes);
  }

  function accumulate(quad) {
    var strength = 0, q, c, weight = 0, x, y, i;

    // For internal nodes, accumulate forces from child quadrants.
    if (quad.length) {
      for (x = y = i = 0; i < 4; ++i) {
        if ((q = quad[i]) && (c = Math.abs(q.value))) {
          strength += q.value, weight += c, x += c * q.x, y += c * q.y;
        }
      }
      quad.x = x / weight;
      quad.y = y / weight;
    }

    // For leaf nodes, accumulate forces from coincident quadrants.
    else {
      q = quad;
      q.x = q.data.x;
      q.y = q.data.y;
      do strength += strengths[q.data.index];
      while (q = q.next);
    }

    quad.value = strength;
  }

  function apply(quad, x1, _, x2) {
    if (!quad.value) return true;

    var x = quad.x - node.x,
        y = quad.y - node.y,
        w = x2 - x1,
        l = x * x + y * y;

    // Apply the Barnes-Hut approximation if possible.
    // Limit forces for very close nodes; randomize direction if coincident.
    if (w * w / theta2 < l) {
      if (l < distanceMax2) {
        if (x === 0) x = jiggle(random), l += x * x;
        if (y === 0) y = jiggle(random), l += y * y;
        if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
        node.vx += x * quad.value * alpha / l;
        node.vy += y * quad.value * alpha / l;
      }
      return true;
    }

    // Otherwise, process points directly.
    else if (quad.length || l >= distanceMax2) return;

    // Limit forces for very close nodes; randomize direction if coincident.
    if (quad.data !== node || quad.next) {
      if (x === 0) x = jiggle(random), l += x * x;
      if (y === 0) y = jiggle(random), l += y * y;
      if (l < distanceMin2) l = Math.sqrt(distanceMin2 * l);
    }

    do if (quad.data !== node) {
      w = strengths[quad.data.index] * alpha / l;
      node.vx += x * w;
      node.vy += y * w;
    } while (quad = quad.next);
  }

  force.initialize = function(_nodes, _random) {
    nodes = _nodes;
    random = _random;
    initialize();
  };

  force.strength = function(_) {
    return arguments.length ? (strength = typeof _ === "function" ? _ : constant(+_), initialize(), force) : strength;
  };

  force.distanceMin = function(_) {
    return arguments.length ? (distanceMin2 = _ * _, force) : Math.sqrt(distanceMin2);
  };

  force.distanceMax = function(_) {
    return arguments.length ? (distanceMax2 = _ * _, force) : Math.sqrt(distanceMax2);
  };

  force.theta = function(_) {
    return arguments.length ? (theta2 = _ * _, force) : Math.sqrt(theta2);
  };

  return force;
}

var r$1={grad:.9,turn:360,rad:360/(2*Math.PI)},t$1=function(r){return "string"==typeof r?r.length>0:"number"==typeof r},n$1=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=Math.pow(10,t)),Math.round(n*r)/n+0},e$1=function(r,t,n){return void 0===t&&(t=0),void 0===n&&(n=1),r>n?n:r>t?r:t},u$1=function(r){return (r=isFinite(r)?r%360:0)>0?r:r+360},a$1=function(r){return {r:e$1(r.r,0,255),g:e$1(r.g,0,255),b:e$1(r.b,0,255),a:e$1(r.a)}},o$1=function(r){return {r:n$1(r.r),g:n$1(r.g),b:n$1(r.b),a:n$1(r.a,3)}},i$1=/^#([0-9a-f]{3,8})$/i,s=function(r){var t=r.toString(16);return t.length<2?"0"+t:t},h$1=function(r){var t=r.r,n=r.g,e=r.b,u=r.a,a=Math.max(t,n,e),o=a-Math.min(t,n,e),i=o?a===t?(n-e)/o:a===n?2+(e-t)/o:4+(t-n)/o:0;return {h:60*(i<0?i+6:i),s:a?o/a*100:0,v:a/255*100,a:u}},b=function(r){var t=r.h,n=r.s,e=r.v,u=r.a;t=t/360*6,n/=100,e/=100;var a=Math.floor(t),o=e*(1-n),i=e*(1-(t-a)*n),s=e*(1-(1-t+a)*n),h=a%6;return {r:255*[e,i,o,o,s,e][h],g:255*[s,e,e,i,o,o][h],b:255*[o,o,s,e,e,i][h],a:u}},g=function(r){return {h:u$1(r.h),s:e$1(r.s,0,100),l:e$1(r.l,0,100),a:e$1(r.a)}},d=function(r){return {h:n$1(r.h),s:n$1(r.s),l:n$1(r.l),a:n$1(r.a,3)}},f$1=function(r){return b((n=(t=r).s,{h:t.h,s:(n*=((e=t.l)<50?e:100-e)/100)>0?2*n/(e+n)*100:0,v:e+n,a:t.a}));var t,n,e;},c$1=function(r){return {h:(t=h$1(r)).h,s:(u=(200-(n=t.s))*(e=t.v)/100)>0&&u<200?n*e/100/(u<=100?u:200-u)*100:0,l:u/2,a:t.a};var t,n,e,u;},l=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s*,\s*([+-]?\d*\.?\d+)%\s*,\s*([+-]?\d*\.?\d+)%\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,p$1=/^hsla?\(\s*([+-]?\d*\.?\d+)(deg|rad|grad|turn)?\s+([+-]?\d*\.?\d+)%\s+([+-]?\d*\.?\d+)%\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,v=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*,\s*([+-]?\d*\.?\d+)(%)?\s*(?:,\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,m=/^rgba?\(\s*([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s+([+-]?\d*\.?\d+)(%)?\s*(?:\/\s*([+-]?\d*\.?\d+)(%)?\s*)?\)$/i,y={string:[[function(r){var t=i$1.exec(r);return t?(r=t[1]).length<=4?{r:parseInt(r[0]+r[0],16),g:parseInt(r[1]+r[1],16),b:parseInt(r[2]+r[2],16),a:4===r.length?n$1(parseInt(r[3]+r[3],16)/255,2):1}:6===r.length||8===r.length?{r:parseInt(r.substr(0,2),16),g:parseInt(r.substr(2,2),16),b:parseInt(r.substr(4,2),16),a:8===r.length?n$1(parseInt(r.substr(6,2),16)/255,2):1}:null:null},"hex"],[function(r){var t=v.exec(r)||m.exec(r);return t?t[2]!==t[4]||t[4]!==t[6]?null:a$1({r:Number(t[1])/(t[2]?100/255:1),g:Number(t[3])/(t[4]?100/255:1),b:Number(t[5])/(t[6]?100/255:1),a:void 0===t[7]?1:Number(t[7])/(t[8]?100:1)}):null},"rgb"],[function(t){var n=l.exec(t)||p$1.exec(t);if(!n)return null;var e,u,a=g({h:(e=n[1],u=n[2],void 0===u&&(u="deg"),Number(e)*(r$1[u]||1)),s:Number(n[3]),l:Number(n[4]),a:void 0===n[5]?1:Number(n[5])/(n[6]?100:1)});return f$1(a)},"hsl"]],object:[[function(r){var n=r.r,e=r.g,u=r.b,o=r.a,i=void 0===o?1:o;return t$1(n)&&t$1(e)&&t$1(u)?a$1({r:Number(n),g:Number(e),b:Number(u),a:Number(i)}):null},"rgb"],[function(r){var n=r.h,e=r.s,u=r.l,a=r.a,o=void 0===a?1:a;if(!t$1(n)||!t$1(e)||!t$1(u))return null;var i=g({h:Number(n),s:Number(e),l:Number(u),a:Number(o)});return f$1(i)},"hsl"],[function(r){var n=r.h,a=r.s,o=r.v,i=r.a,s=void 0===i?1:i;if(!t$1(n)||!t$1(a)||!t$1(o))return null;var h=function(r){return {h:u$1(r.h),s:e$1(r.s,0,100),v:e$1(r.v,0,100),a:e$1(r.a)}}({h:Number(n),s:Number(a),v:Number(o),a:Number(s)});return b(h)},"hsv"]]},N=function(r,t){for(var n=0;n<t.length;n++){var e=t[n][0](r);if(e)return [e,t[n][1]]}return [null,void 0]},x=function(r){return "string"==typeof r?N(r.trim(),y.string):"object"==typeof r&&null!==r?N(r,y.object):[null,void 0]},M=function(r,t){var n=c$1(r);return {h:n.h,s:e$1(n.s+100*t,0,100),l:n.l,a:n.a}},H=function(r){return (299*r.r+587*r.g+114*r.b)/1e3/255},$=function(r,t){var n=c$1(r);return {h:n.h,s:n.s,l:e$1(n.l+100*t,0,100),a:n.a}},j=function(){function r(r){this.parsed=x(r)[0],this.rgba=this.parsed||{r:0,g:0,b:0,a:1};}return r.prototype.isValid=function(){return null!==this.parsed},r.prototype.brightness=function(){return n$1(H(this.rgba),2)},r.prototype.isDark=function(){return H(this.rgba)<.5},r.prototype.isLight=function(){return H(this.rgba)>=.5},r.prototype.toHex=function(){return r=o$1(this.rgba),t=r.r,e=r.g,u=r.b,i=(a=r.a)<1?s(n$1(255*a)):"","#"+s(t)+s(e)+s(u)+i;var r,t,e,u,a,i;},r.prototype.toRgb=function(){return o$1(this.rgba)},r.prototype.toRgbString=function(){return r=o$1(this.rgba),t=r.r,n=r.g,e=r.b,(u=r.a)<1?"rgba("+t+", "+n+", "+e+", "+u+")":"rgb("+t+", "+n+", "+e+")";var r,t,n,e,u;},r.prototype.toHsl=function(){return d(c$1(this.rgba))},r.prototype.toHslString=function(){return r=d(c$1(this.rgba)),t=r.h,n=r.s,e=r.l,(u=r.a)<1?"hsla("+t+", "+n+"%, "+e+"%, "+u+")":"hsl("+t+", "+n+"%, "+e+"%)";var r,t,n,e,u;},r.prototype.toHsv=function(){return r=h$1(this.rgba),{h:n$1(r.h),s:n$1(r.s),v:n$1(r.v),a:n$1(r.a,3)};var r;},r.prototype.invert=function(){return w({r:255-(r=this.rgba).r,g:255-r.g,b:255-r.b,a:r.a});var r;},r.prototype.saturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,r))},r.prototype.desaturate=function(r){return void 0===r&&(r=.1),w(M(this.rgba,-r))},r.prototype.grayscale=function(){return w(M(this.rgba,-1))},r.prototype.lighten=function(r){return void 0===r&&(r=.1),w($(this.rgba,r))},r.prototype.darken=function(r){return void 0===r&&(r=.1),w($(this.rgba,-r))},r.prototype.rotate=function(r){return void 0===r&&(r=15),this.hue(this.hue()+r)},r.prototype.alpha=function(r){return "number"==typeof r?w({r:(t=this.rgba).r,g:t.g,b:t.b,a:r}):n$1(this.rgba.a,3);var t;},r.prototype.hue=function(r){var t=c$1(this.rgba);return "number"==typeof r?w({h:r,s:t.s,l:t.l,a:t.a}):n$1(t.h)},r.prototype.isEqual=function(r){return this.toHex()===w(r).toHex()},r}(),w=function(r){return r instanceof j?r:new j(r)},S=[],k=function(r){r.forEach(function(r){S.indexOf(r)<0&&(r(j,y),S.push(r));});};

var t=function(t,a,n){return void 0===a&&(a=0),void 0===n&&(n=1),t>n?n:t>a?t:a},a=function(t){var a=t/255;return a<.04045?a/12.92:Math.pow((a+.055)/1.055,2.4)},n=function(t){return 255*(t>.0031308?1.055*Math.pow(t,1/2.4)-.055:12.92*t)},r=96.422,o=100,u=82.521,e=function(a){var r,o,u={x:.9555766*(r=a).x+-.0230393*r.y+.0631636*r.z,y:-.0282895*r.x+1.0099416*r.y+.0210077*r.z,z:.0122982*r.x+-.020483*r.y+1.3299098*r.z};return o={r:n(.032404542*u.x-.015371385*u.y-.004985314*u.z),g:n(-.00969266*u.x+.018760108*u.y+41556e-8*u.z),b:n(556434e-9*u.x-.002040259*u.y+.010572252*u.z),a:a.a},{r:t(o.r,0,255),g:t(o.g,0,255),b:t(o.b,0,255),a:t(o.a)}},i=function(n){var e=a(n.r),i=a(n.g),p=a(n.b);return function(a){return {x:t(a.x,0,r),y:t(a.y,0,o),z:t(a.z,0,u),a:t(a.a)}}(function(t){return {x:1.0478112*t.x+.0228866*t.y+-.050127*t.z,y:.0295424*t.x+.9904844*t.y+-.0170491*t.z,z:-.0092345*t.x+.0150436*t.y+.7521316*t.z,a:t.a}}({x:100*(.4124564*e+.3575761*i+.1804375*p),y:100*(.2126729*e+.7151522*i+.072175*p),z:100*(.0193339*e+.119192*i+.9503041*p),a:n.a}))},p=216/24389,h=24389/27,f=function(t){var a=i(t),n=a.x/r,e=a.y/o,f=a.z/u;return n=n>p?Math.cbrt(n):(h*n+16)/116,{l:116*(e=e>p?Math.cbrt(e):(h*e+16)/116)-16,a:500*(n-e),b:200*(e-(f=f>p?Math.cbrt(f):(h*f+16)/116)),alpha:a.a}},c=function(a,n,i){var c,y=f(a),x=f(n);return function(t){var a=(t.l+16)/116,n=t.a/500+a,i=a-t.b/200;return e({x:(Math.pow(n,3)>p?Math.pow(n,3):(116*n-16)/h)*r,y:(t.l>8?Math.pow((t.l+16)/116,3):t.l/h)*o,z:(Math.pow(i,3)>p?Math.pow(i,3):(116*i-16)/h)*u,a:t.alpha})}({l:t((c={l:y.l*(1-i)+x.l*i,a:y.a*(1-i)+x.a*i,b:y.b*(1-i)+x.b*i,alpha:y.alpha*(1-i)+x.alpha*i}).l,0,400),a:c.a,b:c.b,alpha:t(c.alpha)})};function mixPlugin(t){function a(t,a,n){void 0===n&&(n=5);for(var r=[],o=1/(n-1),u=0;u<=n-1;u++)r.push(t.mix(a,o*u));return r}t.prototype.mix=function(a,n){void 0===n&&(n=.5);var r=a instanceof t?a:new t(a),o=c(this.toRgb(),r.toRgb(),n);return new t(o)},t.prototype.tints=function(t){return a(this,"#fff",t)},t.prototype.shades=function(t){return a(this,"#000",t)},t.prototype.tones=function(t){return a(this,"#808080",t)};}

k([mixPlugin]);
class GraphManager {
    static getInstance(wrapper) {
        if (!GraphManager.instance) {
            GraphManager.instance = new GraphManager();
        }
        GraphManager.instance.init(wrapper);
        return GraphManager.instance;
    }
    constructor() {
        this.nodesData = [];
        this.linksData = [];
        GraphManager.instance = this;
    }
    draw(data) {
        const hasAllData = includesAllData(data, this.nodesData, this.linksData);
        if (!hasAllData) {
            this.nodesData = [];
            this.linksData = [];
        }
        this.redraw(data);
    }
    init(wrapper) {
        if (this.wrapper === wrapper)
            return;
        this.wrapper = wrapper;
        const width = this.wrapper.clientWidth;
        const height = this.wrapper.clientHeight;
        this.svg = create("svg")
            .attr("width", width)
            .attr("height", height)
            .attr("viewBox", [-width / 2, -height / 2, width, height].toString())
            .attr("style", "max-width: 100%; height: auto; height: intrinsic; display: block;");
        this.linkWrapper = this.svg.append("g").classed("links", true);
        this.nodeWrapper = this.svg.append("g").classed("nodes", true);
        this.force = simulation()
            .force("charge", manyBody().strength(-5))
            .force("collision", collide(8))
            .force("center", center(0, 0));
        wrapper.appendChild(this.svg.node());
    }
    redraw(data) {
        const [nodesData, linksData] = parseNodeData(data, this.nodesData, this.linksData);
        this.nodesData = nodesData;
        this.linksData = linksData;
        const links = this.linkWrapper.selectAll("line").data(linksData);
        const newLinks = links
            .enter()
            .append("line")
            .style("opacity", 0)
            .attr("stroke-width", (d) => ((d.score - 50) / 50) * 2)
            .attr("stroke", (d) => w(COLOR_ACCENT)
            .mix(COLOR_WHITE, 1 - d.score / 100)
            .toHex());
        newLinks.transition().duration(300).style("opacity", 1);
        links.exit().remove();
        const nodes = this.nodeWrapper.selectAll("g").data(nodesData);
        const newNodes = nodes
            .enter()
            .append("g")
            .style("opacity", 0)
            .attr("transform", "scale(0.5)")
            .attr("data-id", (d) => d.id);
        nodes.exit().remove();
        newNodes.transition().duration(300).style("opacity", 1).attr("transform", "scale(1)");
        newNodes
            .append("circle")
            .attr("r", 5)
            .attr("fill", setCircleColor())
            .attr("stroke", setCircleStroke(false))
            .attr("stroke-width", setCircleStrokeWidth(false))
            .style("cursor", "pointer")
            .call(this.drag());
        this.nodeWrapper
            .selectAll("circle")
            .data(nodesData)
            .filter((d) => !d.isDragging)
            .attr("fill", setCircleColor())
            .attr("stroke", setCircleStroke(false));
        this.force = this.force
            .force("link", link(linksData).strength((d) => d.score / 100))
            .nodes(nodesData);
        this.force.alphaTarget(0.001).restart();
        this.force.on("tick", this.tick.bind(this));
    }
    tick() {
        const links = this.linkWrapper.selectAll("line").data(this.linksData);
        const nodes = this.nodeWrapper.selectAll("g").data(this.nodesData);
        links
            .attr("x1", (d) => d.source.x)
            .attr("y1", (d) => d.source.y)
            .attr("x2", (d) => d.target.x)
            .attr("y2", (d) => d.target.y);
        nodes
            .select("circle")
            .attr("cx", (d) => d.x)
            .attr("cy", (d) => d.y);
        nodes
            .select("text")
            .attr("x", (d) => d.x)
            .attr("y", (d) => d.y);
    }
    drag() {
        return drag()
            .on("start", (e) => {
            console.log(e, e.target.subject());
            if (!e.active)
                this.force.alphaTarget(0.01).restart();
            e.subject.fx = e.subject.x;
            e.subject.fy = e.subject.y;
            this.changeColor(true, e.subject.id);
        })
            .on("drag", (e) => {
            e.subject.fx = e.x;
            e.subject.fy = e.y;
        })
            .on("end", (e) => {
            if (!e.active)
                this.force.alphaTarget(0.05);
            e.subject.fx = null;
            e.subject.fy = null;
            this.changeColor(false, e.subject.id);
        });
    }
    changeColor(active, id) {
        const relatedLinkData = this.linksData.filter((d) => d.source.id === id || d.target.id === id);
        const relatedNodeData = this.nodesData.filter((node) => relatedLinkData.some((link) => link.source === node || link.target === node));
        const nodes = this.nodeWrapper.selectAll("g").data(this.nodesData);
        nodes
            .filter((d) => relatedNodeData.includes(d))
            .select("circle")
            .transition()
            .duration((d) => {
            d.isDragging = active;
            return 200;
        })
            .attr("fill", setCircleColor())
            .attr("stroke", setCircleStroke(active))
            .attr("stroke-width", setCircleStrokeWidth(active));
    }
}
const setCircleColor = (active) => (d) => {
    switch (true) {
        case d.status === "ready":
            return "#CCC";
        case d.status === "processing":
            return "white";
        default:
            return w(COLOR_PRIMARY)
                .mix(COLOR_WHITE, Math.min(d.level * 0.2, 0.8))
                .toHex();
    }
};
const setCircleStroke = (active) => (d) => {
    switch (true) {
        case active:
            return "red";
        case d.status === "processing":
            return COLOR_PRIMARY;
        default:
            return "white";
    }
};
const setCircleStrokeWidth = (active) => (active ? 1.5 : 1);
const includesAllData = (data, currentNodes, currentLinks) => currentNodes.every((node) => data.nodes.find((n) => n.id === node.id)) &&
    currentLinks.every((link) => data.links.find((l) => l.source === link.source.id && l.target === link.target.id) !== undefined);
const parseNodeData = (data, currentNodes, currentLinks) => {
    currentNodes.forEach((node) => (node.status = data.nodes.find((n) => n.id === node.id).status || false));
    const nodesData = [
        ...currentNodes,
        ...data.nodes
            .map((node) => (Object.assign({}, node)))
            .filter((node) => !currentNodes.find((n) => n.id === node.id)),
    ];
    const linksData = [
        ...currentLinks,
        ...data.links
            .map((link) => ({
            source: nodesData.find((node) => node.id === link.source),
            target: nodesData.find((node) => node.id === link.target),
            score: link.score,
        }))
            .filter((link) => !currentLinks.find((l) => l.source === link.source && l.target === link.target)),
    ];
    return [nodesData, linksData];
};
const drawGraph = (wrapper, data) => {
    GraphManager.getInstance(wrapper).draw(data);
};

const NodeCanvas = ({ css, className, data }) => {
    const ref = reactExports.useRef(null);
    reactExports.useEffect(() => {
        if (!ref.current)
            return;
        drawGraph(ref.current, data);
    }, [ref, data]);
    return jsx("div", { css: [nodeCanvas, css], className: className, ref: ref });
};
const nodeCanvas = css `
  background-color: ${COLOR_WHITE};
  min-height: 600px;
`;
css `
  display: block;
  width: 100%;
  height: 100%;
`;

const haveSameElements = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false;
    }
    for (let i = 0; i < arr1.length; i++) {
        if (arr2.indexOf(arr1[i]) === -1) {
            return false;
        }
    }
    return true;
};

function sleep(delay = 0) {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    });
}

const MAX_ITERATION_COUNT = 999999;
const INTERVAL = 2000;
const useGraphData = (initialId, maxLevel = Infinity, ignoreExactMatch = true) => {
    const [maxIterationCount, setMaxIterationCount] = reactExports.useState(MAX_ITERATION_COUNT);
    const [graphData, setGraphData] = reactExports.useState({
        links: [],
        nodes: [],
    });
    const [isInit, setIsInit] = reactExports.useState(false);
    const [iterationCount, setIterationCount] = reactExports.useState(0);
    const [queue, setQueue] = reactExports.useState([initialId]);
    const [processed, setProcessed] = reactExports.useState([]);
    const getGraphData = () => {
        let result = { links: [], nodes: [] };
        setGraphData((prev) => {
            result = prev;
            return prev;
        });
        return result;
    };
    const getProcessed = () => {
        let result = [];
        setProcessed((prev) => {
            result = prev;
            return prev;
        });
        return result;
    };
    const getQueue = () => {
        let result = [];
        setQueue((prev) => {
            result = prev;
            return prev;
        });
        return result;
    };
    const processNext = () => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (iterationCount >= maxIterationCount)
                return;
            const clonedQueue = [...getQueue()];
            const nextId = clonedQueue.shift();
            if (!nextId)
                return;
            const data = getGraphData();
            const currentLevel = getCurrentLevel(data, nextId);
            const res = yield getSimilarData(nextId);
            const processedData = processData(res, nextId, currentLevel + 1);
            setProcessed([...getProcessed(), nextId]);
            const newQueue = makeNewQueue(clonedQueue, processedData, getProcessed());
            setQueue(currentLevel < maxLevel ? newQueue : clonedQueue);
            setGraphData(mergeData(data, processedData, maxLevel, {
                currentId: nextId,
                nextId: getQueue()[0],
            }));
            console.log(iterationCount, newQueue);
        }))();
    };
    reactExports.useEffect(() => {
        (() => __awaiter(void 0, void 0, void 0, function* () {
            const initialData = yield getInitialData(initialId);
            setGraphData(initialData);
            setIsInit(true);
        }))();
    }, []);
    reactExports.useEffect(() => {
        if (!isInit)
            return;
        (() => __awaiter(void 0, void 0, void 0, function* () {
            if (iterationCount >= maxIterationCount)
                return;
            yield sleep(iterationCount === 0 ? 16 : INTERVAL);
            setIterationCount(iterationCount + 1);
            processNext();
        }))();
    }, [queue, isInit]);
    return { graphData, maxIterationCount, setMaxIterationCount };
};
const makeNewQueue = (queue, data, processed) => {
    return [...queue, ...data.nodes.map((item) => item.id)]
        .filter((id) => !processed.includes(id))
        .reduce((acc, item) => (acc.find((i) => i === item) ? acc : [...acc, item]), []);
};
const getCurrentLevel = (data, id) => {
    const node = data.nodes.find((item) => item.id === id);
    return node ? node.level : 0;
};
const mergeData = (data1, data2, maxLevel, { currentId, nextId }) => {
    const nodes = [...data1.nodes, ...data2.nodes]
        .reduce((acc, item) => {
        const hasSameItem = acc.find((i) => i.id === item.id);
        return hasSameItem ? acc : [...acc, item];
    }, [])
        .filter((item) => item.level <= maxLevel)
        .map((item) => {
        switch (true) {
            case item.id === currentId:
                return Object.assign(Object.assign({}, item), { status: "done" });
            case item.id === nextId:
                return Object.assign(Object.assign({}, item), { status: "processing" });
            default:
                return item;
        }
    });
    const links = [...data1.links, ...data2.links]
        .reduce((acc, item) => {
        const hasSameItem = acc.find((i) => haveSameElements([i.source, i.target], [item.source, item.target]));
        return hasSameItem ? acc : [...acc, item];
    }, [])
        .filter((item) => nodes.find((node) => node.id === item.source) &&
        nodes.find((node) => node.id === item.target));
    return { links, nodes };
};
const processData = (data, source, level) => {
    const links = data.map((item) => ({
        source,
        target: item.gm_id.label,
        score: item.score,
    }));
    const nodes = data.map((item) => ({
        id: item.gm_id.label,
        label: item.name,
        level,
        status: "ready",
    }));
    return { links, nodes };
};
const getInitialData = (gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    const links = [];
    const data = yield getMedia(gm_id);
    const id = (data === null || data === void 0 ? void 0 : data.id) || "";
    const label = (data === null || data === void 0 ? void 0 : data.name) || "";
    const level = 0;
    const processed = "done";
    const nodes = [{ id, label, level, status: processed }];
    return clone({ links, nodes });
});
const getSimilarData = (gm_id) => __awaiter(void 0, void 0, void 0, function* () {
    const apiName = "gmdb_list_similar_media_by_gmid";
    const data = yield getData(`${URL_API}${apiName}`, {
        gm_id,
        limit: 99,
        offset: 0,
    });
    return data.body.contents;
});

const StanzaView = ({ css, className, gmId }) => {
    const { graphData } = useGraphData(gmId);
    reactExports.useEffect(() => {
        console.log(graphData);
    }, [graphData]);
    return (jsx("div", { css: [stanzaView, css, stanzaWrapper], className: className, children: jsx(NodeCanvas, { data: graphData }) }));
};
const stanzaView = css ``;

const App = ({ gmId }) => {
    return jsx(StanzaView, { gmId: gmId });
};

class ReactStanza extends TogoMediumReactStanza {
    makeApp() {
        const gmId = this.params.gm_id;
        return jsx(App, { stanzaElement: this.root, gmId: gmId });
    }
}

var stanzaModule = /*#__PURE__*/Object.freeze({
  __proto__: null,
  'default': ReactStanza
});

var metadata = {
	"@context": {
	stanza: "http://togostanza.org/resource/stanza#"
},
	"@id": "gmdb-similar-media-node",
	"stanza:label": "Gmdb similar media node",
	"stanza:definition": "",
	"stanza:type": "Stanza",
	"stanza:display": "Text",
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
		"stanza:key": "strain_id",
		"stanza:example": "M2294",
		"stanza:description": "",
		"stanza:required": true
	}
],
	"stanza:menu-placement": "none",
	"stanza:style": [
]
};

var templates = [
  ["stanza.html.hbs", {"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<p class=\"greeting\">"
    + container.escapeExpression(((helper = (helper = lookupProperty(helpers,"greeting") || (depth0 != null ? lookupProperty(depth0,"greeting") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"greeting","hash":{},"data":data,"loc":{"start":{"line":1,"column":20},"end":{"line":1,"column":32}}}) : helper)))
    + "!!!</p>\n";
},"useData":true}]
];

const url = import.meta.url.replace(/\?.*$/, '');

defineStanzaElement({stanzaModule, metadata, templates, url});
//# sourceMappingURL=gmdb-similar-media-node.js.map
