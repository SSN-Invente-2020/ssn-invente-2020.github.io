/*!
 * perfect-scrollbar v1.3.0
 * (c) 2017 Hyunje Jun
 * @license MIT
 */
!(function (t, e) {
  "object" == typeof exports && "undefined" != typeof module
    ? (module.exports = e())
    : "function" == typeof define && define.amd
    ? define(e)
    : (t.PerfectScrollbar = e());
})(this, function () {
  "use strict";
  function t(t) {
    return getComputedStyle(t);
  }
  function e(t, e) {
    for (var i in e) {
      var r = e[i];
      "number" == typeof r && (r += "px"), (t.style[i] = r);
    }
    return t;
  }
  function i(t) {
    var e = document.createElement("div");
    return (e.className = t), e;
  }
  function r(t, e) {
    if (!v) throw new Error("No element matching method supported");
    return v.call(t, e);
  }
  function l(t) {
    t.remove ? t.remove() : t.parentNode && t.parentNode.removeChild(t);
  }
  function n(t, e) {
    return Array.prototype.filter.call(t.children, function (t) {
      return r(t, e);
    });
  }
  function o(t, e) {
    var i = t.element.classList,
      r = m.state.scrolling(e);
    i.contains(r) ? clearTimeout(Y[e]) : i.add(r);
  }
  function s(t, e) {
    Y[e] = setTimeout(function () {
      return t.isAlive && t.element.classList.remove(m.state.scrolling(e));
    }, t.settings.scrollingThreshold);
  }
  function a(t, e) {
    o(t, e), s(t, e);
  }
  function c(t) {
    if ("function" == typeof window.CustomEvent) return new CustomEvent(t);
    var e = document.createEvent("CustomEvent");
    return e.initCustomEvent(t, !1, !1, void 0), e;
  }
  function h(t, e, i, r, l) {
    var n = i[0],
      o = i[1],
      s = i[2],
      h = i[3],
      u = i[4],
      d = i[5];
    void 0 === r && (r = !0), void 0 === l && (l = !1);
    var f = t.element;
    (t.reach[h] = null),
      f[s] < 1 && (t.reach[h] = "start"),
      f[s] > t[n] - t[o] - 1 && (t.reach[h] = "end"),
      e &&
        (f.dispatchEvent(c("ps-scroll-" + h)),
        e < 0
          ? f.dispatchEvent(c("ps-scroll-" + u))
          : e > 0 && f.dispatchEvent(c("ps-scroll-" + d)),
        r && a(t, h)),
      t.reach[h] &&
        (e || l) &&
        f.dispatchEvent(c("ps-" + h + "-reach-" + t.reach[h]));
  }
  function u(t) {
    return parseInt(t, 10) || 0;
  }
  function d(t) {
    return (
      r(t, "input,[contenteditable]") ||
      r(t, "select,[contenteditable]") ||
      r(t, "textarea,[contenteditable]") ||
      r(t, "button,[contenteditable]")
    );
  }
  function f(e) {
    var i = t(e);
    return (
      u(i.width) +
      u(i.paddingLeft) +
      u(i.paddingRight) +
      u(i.borderLeftWidth) +
      u(i.borderRightWidth)
    );
  }
  function p(t, e) {
    return (
      t.settings.minScrollbarLength &&
        (e = Math.max(e, t.settings.minScrollbarLength)),
      t.settings.maxScrollbarLength &&
        (e = Math.min(e, t.settings.maxScrollbarLength)),
      e
    );
  }
  function b(t, i) {
    var r = { width: i.railXWidth };
    i.isRtl
      ? (r.left =
          i.negativeScrollAdjustment +
          t.scrollLeft +
          i.containerWidth -
          i.contentWidth)
      : (r.left = t.scrollLeft),
      i.isScrollbarXUsingBottom
        ? (r.bottom = i.scrollbarXBottom - t.scrollTop)
        : (r.top = i.scrollbarXTop + t.scrollTop),
      e(i.scrollbarXRail, r);
    var l = { top: t.scrollTop, height: i.railYHeight };
    i.isScrollbarYUsingRight
      ? i.isRtl
        ? (l.right =
            i.contentWidth -
            (i.negativeScrollAdjustment + t.scrollLeft) -
            i.scrollbarYRight -
            i.scrollbarYOuterWidth)
        : (l.right = i.scrollbarYRight - t.scrollLeft)
      : i.isRtl
      ? (l.left =
          i.negativeScrollAdjustment +
          t.scrollLeft +
          2 * i.containerWidth -
          i.contentWidth -
          i.scrollbarYLeft -
          i.scrollbarYOuterWidth)
      : (l.left = i.scrollbarYLeft + t.scrollLeft),
      e(i.scrollbarYRail, l),
      e(i.scrollbarX, {
        left: i.scrollbarXLeft,
        width: i.scrollbarXWidth - i.railBorderXWidth,
      }),
      e(i.scrollbarY, {
        top: i.scrollbarYTop,
        height: i.scrollbarYHeight - i.railBorderYWidth,
      });
  }
  function g(t, e) {
    function i(e) {
      (p[d] = b + v * (e[a] - g)),
        o(t, f),
        T(t),
        e.stopPropagation(),
        e.preventDefault();
    }
    function r() {
      s(t, f), t.event.unbind(t.ownerDocument, "mousemove", i);
    }
    var l = e[0],
      n = e[1],
      a = e[2],
      c = e[3],
      h = e[4],
      u = e[5],
      d = e[6],
      f = e[7],
      p = t.element,
      b = null,
      g = null,
      v = null;
    t.event.bind(t[h], "mousedown", function (e) {
      (b = p[d]),
        (g = e[a]),
        (v = (t[n] - t[l]) / (t[c] - t[u])),
        t.event.bind(t.ownerDocument, "mousemove", i),
        t.event.once(t.ownerDocument, "mouseup", r),
        e.stopPropagation(),
        e.preventDefault();
    });
  }
  var v =
      "undefined" != typeof Element &&
      (Element.prototype.matches ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.msMatchesSelector),
    m = {
      main: "ps",
      element: {
        thumb: function (t) {
          return "ps__thumb-" + t;
        },
        rail: function (t) {
          return "ps__rail-" + t;
        },
        consuming: "ps__child--consume",
      },
      state: {
        focus: "ps--focus",
        active: function (t) {
          return "ps--active-" + t;
        },
        scrolling: function (t) {
          return "ps--scrolling-" + t;
        },
      },
    },
    Y = { x: null, y: null },
    X = function (t) {
      (this.element = t), (this.handlers = {});
    },
    w = { isEmpty: { configurable: !0 } };
  (X.prototype.bind = function (t, e) {
    void 0 === this.handlers[t] && (this.handlers[t] = []),
      this.handlers[t].push(e),
      this.element.addEventListener(t, e, !1);
  }),
    (X.prototype.unbind = function (t, e) {
      var i = this;
      this.handlers[t] = this.handlers[t].filter(function (r) {
        return (
          !(!e || r === e) || (i.element.removeEventListener(t, r, !1), !1)
        );
      });
    }),
    (X.prototype.unbindAll = function () {
      var t = this;
      for (var e in t.handlers) t.unbind(e);
    }),
    (w.isEmpty.get = function () {
      var t = this;
      return Object.keys(this.handlers).every(function (e) {
        return 0 === t.handlers[e].length;
      });
    }),
    Object.defineProperties(X.prototype, w);
  var y = function () {
    this.eventElements = [];
  };
  (y.prototype.eventElement = function (t) {
    var e = this.eventElements.filter(function (e) {
      return e.element === t;
    })[0];
    return e || ((e = new X(t)), this.eventElements.push(e)), e;
  }),
    (y.prototype.bind = function (t, e, i) {
      this.eventElement(t).bind(e, i);
    }),
    (y.prototype.unbind = function (t, e, i) {
      var r = this.eventElement(t);
      r.unbind(e, i),
        r.isEmpty &&
          this.eventElements.splice(this.eventElements.indexOf(r), 1);
    }),
    (y.prototype.unbindAll = function () {
      this.eventElements.forEach(function (t) {
        return t.unbindAll();
      }),
        (this.eventElements = []);
    }),
    (y.prototype.once = function (t, e, i) {
      var r = this.eventElement(t),
        l = function (t) {
          r.unbind(e, l), i(t);
        };
      r.bind(e, l);
    });
  var W = function (t, e, i, r, l) {
      void 0 === r && (r = !0), void 0 === l && (l = !1);
      var n;
      if ("top" === e)
        n = [
          "contentHeight",
          "containerHeight",
          "scrollTop",
          "y",
          "up",
          "down",
        ];
      else {
        if ("left" !== e) throw new Error("A proper axis should be provided");
        n = [
          "contentWidth",
          "containerWidth",
          "scrollLeft",
          "x",
          "left",
          "right",
        ];
      }
      h(t, i, n, r, l);
    },
    L = {
      isWebKit:
        "undefined" != typeof document &&
        "WebkitAppearance" in document.documentElement.style,
      supportsTouch:
        "undefined" != typeof window &&
        ("ontouchstart" in window ||
          (window.DocumentTouch && document instanceof window.DocumentTouch)),
      supportsIePointer:
        "undefined" != typeof navigator && navigator.msMaxTouchPoints,
      isChrome:
        "undefined" != typeof navigator &&
        /Chrome/i.test(navigator && navigator.userAgent),
    },
    T = function (t) {
      var e = t.element;
      (t.containerWidth = e.clientWidth),
        (t.containerHeight = e.clientHeight),
        (t.contentWidth = e.scrollWidth),
        (t.contentHeight = e.scrollHeight),
        e.contains(t.scrollbarXRail) ||
          (n(e, m.element.rail("x")).forEach(function (t) {
            return l(t);
          }),
          e.appendChild(t.scrollbarXRail)),
        e.contains(t.scrollbarYRail) ||
          (n(e, m.element.rail("y")).forEach(function (t) {
            return l(t);
          }),
          e.appendChild(t.scrollbarYRail)),
        !t.settings.suppressScrollX &&
        t.containerWidth + t.settings.scrollXMarginOffset < t.contentWidth
          ? ((t.scrollbarXActive = !0),
            (t.railXWidth = t.containerWidth - t.railXMarginWidth),
            (t.railXRatio = t.containerWidth / t.railXWidth),
            (t.scrollbarXWidth = p(
              t,
              u((t.railXWidth * t.containerWidth) / t.contentWidth)
            )),
            (t.scrollbarXLeft = u(
              ((t.negativeScrollAdjustment + e.scrollLeft) *
                (t.railXWidth - t.scrollbarXWidth)) /
                (t.contentWidth - t.containerWidth)
            )))
          : (t.scrollbarXActive = !1),
        !t.settings.suppressScrollY &&
        t.containerHeight + t.settings.scrollYMarginOffset < t.contentHeight
          ? ((t.scrollbarYActive = !0),
            (t.railYHeight = t.containerHeight - t.railYMarginHeight),
            (t.railYRatio = t.containerHeight / t.railYHeight),
            (t.scrollbarYHeight = p(
              t,
              u((t.railYHeight * t.containerHeight) / t.contentHeight)
            )),
            (t.scrollbarYTop = u(
              (e.scrollTop * (t.railYHeight - t.scrollbarYHeight)) /
                (t.contentHeight - t.containerHeight)
            )))
          : (t.scrollbarYActive = !1),
        t.scrollbarXLeft >= t.railXWidth - t.scrollbarXWidth &&
          (t.scrollbarXLeft = t.railXWidth - t.scrollbarXWidth),
        t.scrollbarYTop >= t.railYHeight - t.scrollbarYHeight &&
          (t.scrollbarYTop = t.railYHeight - t.scrollbarYHeight),
        b(e, t),
        t.scrollbarXActive
          ? e.classList.add(m.state.active("x"))
          : (e.classList.remove(m.state.active("x")),
            (t.scrollbarXWidth = 0),
            (t.scrollbarXLeft = 0),
            (e.scrollLeft = 0)),
        t.scrollbarYActive
          ? e.classList.add(m.state.active("y"))
          : (e.classList.remove(m.state.active("y")),
            (t.scrollbarYHeight = 0),
            (t.scrollbarYTop = 0),
            (e.scrollTop = 0));
    },
    R = {
      "click-rail": function (t) {
        t.event.bind(t.scrollbarY, "mousedown", function (t) {
          return t.stopPropagation();
        }),
          t.event.bind(t.scrollbarYRail, "mousedown", function (e) {
            var i =
              e.pageY -
                window.pageYOffset -
                t.scrollbarYRail.getBoundingClientRect().top >
              t.scrollbarYTop
                ? 1
                : -1;
            (t.element.scrollTop += i * t.containerHeight),
              T(t),
              e.stopPropagation();
          }),
          t.event.bind(t.scrollbarX, "mousedown", function (t) {
            return t.stopPropagation();
          }),
          t.event.bind(t.scrollbarXRail, "mousedown", function (e) {
            var i =
              e.pageX -
                window.pageXOffset -
                t.scrollbarXRail.getBoundingClientRect().left >
              t.scrollbarXLeft
                ? 1
                : -1;
            (t.element.scrollLeft += i * t.containerWidth),
              T(t),
              e.stopPropagation();
          });
      },
      "drag-thumb": function (t) {
        g(t, [
          "containerWidth",
          "contentWidth",
          "pageX",
          "railXWidth",
          "scrollbarX",
          "scrollbarXWidth",
          "scrollLeft",
          "x",
        ]),
          g(t, [
            "containerHeight",
            "contentHeight",
            "pageY",
            "railYHeight",
            "scrollbarY",
            "scrollbarYHeight",
            "scrollTop",
            "y",
          ]);
      },
      keyboard: function (t) {
        function e(e, r) {
          var l = i.scrollTop;
          if (0 === e) {
            if (!t.scrollbarYActive) return !1;
            if (
              (0 === l && r > 0) ||
              (l >= t.contentHeight - t.containerHeight && r < 0)
            )
              return !t.settings.wheelPropagation;
          }
          var n = i.scrollLeft;
          if (0 === r) {
            if (!t.scrollbarXActive) return !1;
            if (
              (0 === n && e < 0) ||
              (n >= t.contentWidth - t.containerWidth && e > 0)
            )
              return !t.settings.wheelPropagation;
          }
          return !0;
        }
        var i = t.element,
          l = function () {
            return r(i, ":hover");
          },
          n = function () {
            return r(t.scrollbarX, ":focus") || r(t.scrollbarY, ":focus");
          };
        t.event.bind(t.ownerDocument, "keydown", function (r) {
          if (
            !(
              (r.isDefaultPrevented && r.isDefaultPrevented()) ||
              r.defaultPrevented
            ) &&
            (l() || n())
          ) {
            var o = document.activeElement
              ? document.activeElement
              : t.ownerDocument.activeElement;
            if (o) {
              if ("IFRAME" === o.tagName) o = o.contentDocument.activeElement;
              else for (; o.shadowRoot; ) o = o.shadowRoot.activeElement;
              if (d(o)) return;
            }
            var s = 0,
              a = 0;
            switch (r.which) {
              case 37:
                s = r.metaKey
                  ? -t.contentWidth
                  : r.altKey
                  ? -t.containerWidth
                  : -30;
                break;
              case 38:
                a = r.metaKey
                  ? t.contentHeight
                  : r.altKey
                  ? t.containerHeight
                  : 30;
                break;
              case 39:
                s = r.metaKey
                  ? t.contentWidth
                  : r.altKey
                  ? t.containerWidth
                  : 30;
                break;
              case 40:
                a = r.metaKey
                  ? -t.contentHeight
                  : r.altKey
                  ? -t.containerHeight
                  : -30;
                break;
              case 32:
                a = r.shiftKey ? t.containerHeight : -t.containerHeight;
                break;
              case 33:
                a = t.containerHeight;
                break;
              case 34:
                a = -t.containerHeight;
                break;
              case 36:
                a = t.contentHeight;
                break;
              case 35:
                a = -t.contentHeight;
                break;
              default:
                return;
            }
            (t.settings.suppressScrollX && 0 !== s) ||
              (t.settings.suppressScrollY && 0 !== a) ||
              ((i.scrollTop -= a),
              (i.scrollLeft += s),
              T(t),
              e(s, a) && r.preventDefault());
          }
        });
      },
      wheel: function (e) {
        function i(t, i) {
          var r = 0 === o.scrollTop,
            l = o.scrollTop + o.offsetHeight === o.scrollHeight,
            n = 0 === o.scrollLeft,
            s = o.scrollLeft + o.offsetWidth === o.offsetWidth;
          return (
            !(Math.abs(i) > Math.abs(t) ? r || l : n || s) ||
            !e.settings.wheelPropagation
          );
        }
        function r(t) {
          var e = t.deltaX,
            i = -1 * t.deltaY;
          return (
            (void 0 !== e && void 0 !== i) ||
              ((e = (-1 * t.wheelDeltaX) / 6), (i = t.wheelDeltaY / 6)),
            t.deltaMode && 1 === t.deltaMode && ((e *= 10), (i *= 10)),
            e !== e && i !== i && ((e = 0), (i = t.wheelDelta)),
            t.shiftKey ? [-i, -e] : [e, i]
          );
        }
        function l(e, i, r) {
          if (!L.isWebKit && o.querySelector("select:focus")) return !0;
          if (!o.contains(e)) return !1;
          for (var l = e; l && l !== o; ) {
            if (l.classList.contains(m.element.consuming)) return !0;
            var n = t(l);
            if (
              [n.overflow, n.overflowX, n.overflowY]
                .join("")
                .match(/(scroll|auto)/)
            ) {
              var s = l.scrollHeight - l.clientHeight;
              if (
                s > 0 &&
                !((0 === l.scrollTop && r > 0) || (l.scrollTop === s && r < 0))
              )
                return !0;
              var a = l.scrollLeft - l.clientWidth;
              if (
                a > 0 &&
                !(
                  (0 === l.scrollLeft && i < 0) ||
                  (l.scrollLeft === a && i > 0)
                )
              )
                return !0;
            }
            l = l.parentNode;
          }
          return !1;
        }
        function n(t) {
          var n = r(t),
            s = n[0],
            a = n[1];
          if (!l(t.target, s, a)) {
            var c = !1;
            e.settings.useBothWheelAxes
              ? e.scrollbarYActive && !e.scrollbarXActive
                ? (a
                    ? (o.scrollTop -= a * e.settings.wheelSpeed)
                    : (o.scrollTop += s * e.settings.wheelSpeed),
                  (c = !0))
                : e.scrollbarXActive &&
                  !e.scrollbarYActive &&
                  (s
                    ? (o.scrollLeft += s * e.settings.wheelSpeed)
                    : (o.scrollLeft -= a * e.settings.wheelSpeed),
                  (c = !0))
              : ((o.scrollTop -= a * e.settings.wheelSpeed),
                (o.scrollLeft += s * e.settings.wheelSpeed)),
              T(e),
              (c = c || i(s, a)) &&
                !t.ctrlKey &&
                (t.stopPropagation(), t.preventDefault());
          }
        }
        var o = e.element;
        void 0 !== window.onwheel
          ? e.event.bind(o, "wheel", n)
          : void 0 !== window.onmousewheel && e.event.bind(o, "mousewheel", n);
      },
      touch: function (e) {
        function i(t, i) {
          var r = h.scrollTop,
            l = h.scrollLeft,
            n = Math.abs(t),
            o = Math.abs(i);
          if (o > n) {
            if (
              (i < 0 && r === e.contentHeight - e.containerHeight) ||
              (i > 0 && 0 === r)
            )
              return 0 === window.scrollY && i > 0 && L.isChrome;
          } else if (
            n > o &&
            ((t < 0 && l === e.contentWidth - e.containerWidth) ||
              (t > 0 && 0 === l))
          )
            return !0;
          return !0;
        }
        function r(t, i) {
          (h.scrollTop -= i), (h.scrollLeft -= t), T(e);
        }
        function l(t) {
          return t.targetTouches ? t.targetTouches[0] : t;
        }
        function n(t) {
          return !(
            (t.pointerType && "pen" === t.pointerType && 0 === t.buttons) ||
            ((!t.targetTouches || 1 !== t.targetTouches.length) &&
              (!t.pointerType ||
                "mouse" === t.pointerType ||
                t.pointerType === t.MSPOINTER_TYPE_MOUSE))
          );
        }
        function o(t) {
          if (n(t)) {
            var e = l(t);
            (u.pageX = e.pageX),
              (u.pageY = e.pageY),
              (d = new Date().getTime()),
              null !== p && clearInterval(p);
          }
        }
        function s(e, i, r) {
          if (!h.contains(e)) return !1;
          for (var l = e; l && l !== h; ) {
            if (l.classList.contains(m.element.consuming)) return !0;
            var n = t(l);
            if (
              [n.overflow, n.overflowX, n.overflowY]
                .join("")
                .match(/(scroll|auto)/)
            ) {
              var o = l.scrollHeight - l.clientHeight;
              if (
                o > 0 &&
                !((0 === l.scrollTop && r > 0) || (l.scrollTop === o && r < 0))
              )
                return !0;
              var s = l.scrollLeft - l.clientWidth;
              if (
                s > 0 &&
                !(
                  (0 === l.scrollLeft && i < 0) ||
                  (l.scrollLeft === s && i > 0)
                )
              )
                return !0;
            }
            l = l.parentNode;
          }
          return !1;
        }
        function a(t) {
          if (n(t)) {
            var e = l(t),
              o = { pageX: e.pageX, pageY: e.pageY },
              a = o.pageX - u.pageX,
              c = o.pageY - u.pageY;
            if (s(t.target, a, c)) return;
            r(a, c), (u = o);
            var h = new Date().getTime(),
              p = h - d;
            p > 0 && ((f.x = a / p), (f.y = c / p), (d = h)),
              i(a, c) && t.preventDefault();
          }
        }
        function c() {
          e.settings.swipeEasing &&
            (clearInterval(p),
            (p = setInterval(function () {
              e.isInitialized
                ? clearInterval(p)
                : f.x || f.y
                ? Math.abs(f.x) < 0.01 && Math.abs(f.y) < 0.01
                  ? clearInterval(p)
                  : (r(30 * f.x, 30 * f.y), (f.x *= 0.8), (f.y *= 0.8))
                : clearInterval(p);
            }, 10)));
        }
        if (L.supportsTouch || L.supportsIePointer) {
          var h = e.element,
            u = {},
            d = 0,
            f = {},
            p = null;
          L.supportsTouch
            ? (e.event.bind(h, "touchstart", o),
              e.event.bind(h, "touchmove", a),
              e.event.bind(h, "touchend", c))
            : L.supportsIePointer &&
              (window.PointerEvent
                ? (e.event.bind(h, "pointerdown", o),
                  e.event.bind(h, "pointermove", a),
                  e.event.bind(h, "pointerup", c))
                : window.MSPointerEvent &&
                  (e.event.bind(h, "MSPointerDown", o),
                  e.event.bind(h, "MSPointerMove", a),
                  e.event.bind(h, "MSPointerUp", c)));
        }
      },
    },
    H = function (r, l) {
      var n = this;
      if (
        (void 0 === l && (l = {}),
        "string" == typeof r && (r = document.querySelector(r)),
        !r || !r.nodeName)
      )
        throw new Error(
          "no element is specified to initialize PerfectScrollbar"
        );
      (this.element = r),
        r.classList.add(m.main),
        (this.settings = {
          handlers: ["click-rail", "drag-thumb", "keyboard", "wheel", "touch"],
          maxScrollbarLength: null,
          minScrollbarLength: null,
          scrollingThreshold: 1e3,
          scrollXMarginOffset: 0,
          scrollYMarginOffset: 0,
          suppressScrollX: !1,
          suppressScrollY: !1,
          swipeEasing: !0,
          useBothWheelAxes: !1,
          wheelPropagation: !1,
          wheelSpeed: 1,
        });
      for (var o in l) n.settings[o] = l[o];
      (this.containerWidth = null),
        (this.containerHeight = null),
        (this.contentWidth = null),
        (this.contentHeight = null);
      var s = function () {
          return r.classList.add(m.state.focus);
        },
        a = function () {
          return r.classList.remove(m.state.focus);
        };
      (this.isRtl = "rtl" === t(r).direction),
        (this.isNegativeScroll = (function () {
          var t = r.scrollLeft,
            e = null;
          return (
            (r.scrollLeft = -1), (e = r.scrollLeft < 0), (r.scrollLeft = t), e
          );
        })()),
        (this.negativeScrollAdjustment = this.isNegativeScroll
          ? r.scrollWidth - r.clientWidth
          : 0),
        (this.event = new y()),
        (this.ownerDocument = r.ownerDocument || document),
        (this.scrollbarXRail = i(m.element.rail("x"))),
        r.appendChild(this.scrollbarXRail),
        (this.scrollbarX = i(m.element.thumb("x"))),
        this.scrollbarXRail.appendChild(this.scrollbarX),
        this.scrollbarX.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarX, "focus", s),
        this.event.bind(this.scrollbarX, "blur", a),
        (this.scrollbarXActive = null),
        (this.scrollbarXWidth = null),
        (this.scrollbarXLeft = null);
      var c = t(this.scrollbarXRail);
      (this.scrollbarXBottom = parseInt(c.bottom, 10)),
        isNaN(this.scrollbarXBottom)
          ? ((this.isScrollbarXUsingBottom = !1),
            (this.scrollbarXTop = u(c.top)))
          : (this.isScrollbarXUsingBottom = !0),
        (this.railBorderXWidth = u(c.borderLeftWidth) + u(c.borderRightWidth)),
        e(this.scrollbarXRail, { display: "block" }),
        (this.railXMarginWidth = u(c.marginLeft) + u(c.marginRight)),
        e(this.scrollbarXRail, { display: "" }),
        (this.railXWidth = null),
        (this.railXRatio = null),
        (this.scrollbarYRail = i(m.element.rail("y"))),
        r.appendChild(this.scrollbarYRail),
        (this.scrollbarY = i(m.element.thumb("y"))),
        this.scrollbarYRail.appendChild(this.scrollbarY),
        this.scrollbarY.setAttribute("tabindex", 0),
        this.event.bind(this.scrollbarY, "focus", s),
        this.event.bind(this.scrollbarY, "blur", a),
        (this.scrollbarYActive = null),
        (this.scrollbarYHeight = null),
        (this.scrollbarYTop = null);
      var h = t(this.scrollbarYRail);
      (this.scrollbarYRight = parseInt(h.right, 10)),
        isNaN(this.scrollbarYRight)
          ? ((this.isScrollbarYUsingRight = !1),
            (this.scrollbarYLeft = u(h.left)))
          : (this.isScrollbarYUsingRight = !0),
        (this.scrollbarYOuterWidth = this.isRtl ? f(this.scrollbarY) : null),
        (this.railBorderYWidth = u(h.borderTopWidth) + u(h.borderBottomWidth)),
        e(this.scrollbarYRail, { display: "block" }),
        (this.railYMarginHeight = u(h.marginTop) + u(h.marginBottom)),
        e(this.scrollbarYRail, { display: "" }),
        (this.railYHeight = null),
        (this.railYRatio = null),
        (this.reach = {
          x:
            r.scrollLeft <= 0
              ? "start"
              : r.scrollLeft >= this.contentWidth - this.containerWidth
              ? "end"
              : null,
          y:
            r.scrollTop <= 0
              ? "start"
              : r.scrollTop >= this.contentHeight - this.containerHeight
              ? "end"
              : null,
        }),
        (this.isAlive = !0),
        this.settings.handlers.forEach(function (t) {
          return R[t](n);
        }),
        (this.lastScrollTop = r.scrollTop),
        (this.lastScrollLeft = r.scrollLeft),
        this.event.bind(this.element, "scroll", function (t) {
          return n.onScroll(t);
        }),
        T(this);
    };
  return (
    (H.prototype.update = function () {
      this.isAlive &&
        ((this.negativeScrollAdjustment = this.isNegativeScroll
          ? this.element.scrollWidth - this.element.clientWidth
          : 0),
        e(this.scrollbarXRail, { display: "block" }),
        e(this.scrollbarYRail, { display: "block" }),
        (this.railXMarginWidth =
          u(t(this.scrollbarXRail).marginLeft) +
          u(t(this.scrollbarXRail).marginRight)),
        (this.railYMarginHeight =
          u(t(this.scrollbarYRail).marginTop) +
          u(t(this.scrollbarYRail).marginBottom)),
        e(this.scrollbarXRail, { display: "none" }),
        e(this.scrollbarYRail, { display: "none" }),
        T(this),
        W(this, "top", 0, !1, !0),
        W(this, "left", 0, !1, !0),
        e(this.scrollbarXRail, { display: "" }),
        e(this.scrollbarYRail, { display: "" }));
    }),
    (H.prototype.onScroll = function (t) {
      this.isAlive &&
        (T(this),
        W(this, "top", this.element.scrollTop - this.lastScrollTop),
        W(this, "left", this.element.scrollLeft - this.lastScrollLeft),
        (this.lastScrollTop = this.element.scrollTop),
        (this.lastScrollLeft = this.element.scrollLeft));
    }),
    (H.prototype.destroy = function () {
      this.isAlive &&
        (this.event.unbindAll(),
        l(this.scrollbarX),
        l(this.scrollbarY),
        l(this.scrollbarXRail),
        l(this.scrollbarYRail),
        this.removePsClasses(),
        (this.element = null),
        (this.scrollbarX = null),
        (this.scrollbarY = null),
        (this.scrollbarXRail = null),
        (this.scrollbarYRail = null),
        (this.isAlive = !1));
    }),
    (H.prototype.removePsClasses = function () {
      this.element.className = this.element.className
        .split(" ")
        .filter(function (t) {
          return !t.match(/^ps([-_].+|)$/);
        })
        .join(" ");
    }),
    H
  );
});
/*! lightgallery - v1.6.10 - 2018-05-01
 * https://sachinchoolur.github.io/lightGallery/
 * Copyright (c) 2018 Sachin N; Licensed GPLv3 */
!(function (a, b) {
  "function" == typeof define && define.amd
    ? define(["jquery"], function (a) {
        return b(a);
      })
    : "object" == typeof module && module.exports
    ? (module.exports = b(require("jquery")))
    : b(a.jQuery);
})(this, function (a) {
  !(function () {
    "use strict";
    function b(b, d) {
      if (
        ((this.el = b),
        (this.$el = a(b)),
        (this.s = a.extend({}, c, d)),
        this.s.dynamic &&
          "undefined" !== this.s.dynamicEl &&
          this.s.dynamicEl.constructor === Array &&
          !this.s.dynamicEl.length)
      )
        throw "When using dynamic mode, you must also define dynamicEl as an Array.";
      return (
        (this.modules = {}),
        (this.lGalleryOn = !1),
        (this.lgBusy = !1),
        (this.hideBartimeout = !1),
        (this.isTouch = "ontouchstart" in document.documentElement),
        this.s.slideEndAnimatoin && (this.s.hideControlOnEnd = !1),
        this.s.dynamic
          ? (this.$items = this.s.dynamicEl)
          : "this" === this.s.selector
          ? (this.$items = this.$el)
          : "" !== this.s.selector
          ? this.s.selectWithin
            ? (this.$items = a(this.s.selectWithin).find(this.s.selector))
            : (this.$items = this.$el.find(a(this.s.selector)))
          : (this.$items = this.$el.children()),
        (this.$slide = ""),
        (this.$outer = ""),
        this.init(),
        this
      );
    }
    var c = {
      mode: "lg-slide",
      cssEasing: "ease",
      easing: "linear",
      speed: 600,
      height: "100%",
      width: "100%",
      addClass: "",
      startClass: "lg-start-zoom",
      backdropDuration: 150,
      hideBarsDelay: 6e3,
      useLeft: !1,
      closable: !0,
      loop: !0,
      escKey: !0,
      keyPress: !0,
      controls: !0,
      slideEndAnimatoin: !0,
      hideControlOnEnd: !1,
      mousewheel: !0,
      getCaptionFromTitleOrAlt: !0,
      appendSubHtmlTo: ".lg-sub-html",
      subHtmlSelectorRelative: !1,
      preload: 1,
      showAfterLoad: !0,
      selector: "",
      selectWithin: "",
      nextHtml: "",
      prevHtml: "",
      index: !1,
      iframeMaxWidth: "100%",
      download: !0,
      counter: !0,
      appendCounterTo: ".lg-toolbar",
      swipeThreshold: 50,
      enableSwipe: !0,
      enableDrag: !0,
      dynamic: !1,
      dynamicEl: [],
      galleryId: 1,
    };
    (b.prototype.init = function () {
      var b = this;
      b.s.preload > b.$items.length && (b.s.preload = b.$items.length);
      var c = window.location.hash;
      c.indexOf("lg=" + this.s.galleryId) > 0 &&
        ((b.index = parseInt(c.split("&slide=")[1], 10)),
        a("body").addClass("lg-from-hash"),
        a("body").hasClass("lg-on") ||
          (setTimeout(function () {
            b.build(b.index);
          }),
          a("body").addClass("lg-on"))),
        b.s.dynamic
          ? (b.$el.trigger("onBeforeOpen.lg"),
            (b.index = b.s.index || 0),
            a("body").hasClass("lg-on") ||
              setTimeout(function () {
                b.build(b.index), a("body").addClass("lg-on");
              }))
          : b.$items.on("click.lgcustom", function (c) {
              try {
                c.preventDefault(), c.preventDefault();
              } catch (a) {
                c.returnValue = !1;
              }
              b.$el.trigger("onBeforeOpen.lg"),
                (b.index = b.s.index || b.$items.index(this)),
                a("body").hasClass("lg-on") ||
                  (b.build(b.index), a("body").addClass("lg-on"));
            });
    }),
      (b.prototype.build = function (b) {
        var c = this;
        c.structure(),
          a.each(a.fn.lightGallery.modules, function (b) {
            c.modules[b] = new a.fn.lightGallery.modules[b](c.el);
          }),
          c.slide(b, !1, !1, !1),
          c.s.keyPress && c.keyPress(),
          c.$items.length > 1
            ? (c.arrow(),
              setTimeout(function () {
                c.enableDrag(), c.enableSwipe();
              }, 50),
              c.s.mousewheel && c.mousewheel())
            : c.$slide.on("click.lg", function () {
                c.$el.trigger("onSlideClick.lg");
              }),
          c.counter(),
          c.closeGallery(),
          c.$el.trigger("onAfterOpen.lg"),
          c.$outer.on("mousemove.lg click.lg touchstart.lg", function () {
            c.$outer.removeClass("lg-hide-items"),
              clearTimeout(c.hideBartimeout),
              (c.hideBartimeout = setTimeout(function () {
                c.$outer.addClass("lg-hide-items");
              }, c.s.hideBarsDelay));
          }),
          c.$outer.trigger("mousemove.lg");
      }),
      (b.prototype.structure = function () {
        var b,
          c = "",
          d = "",
          e = 0,
          f = "",
          g = this;
        for (
          a("body").append('<div class="lg-backdrop"></div>'),
            a(".lg-backdrop").css(
              "transition-duration",
              this.s.backdropDuration + "ms"
            ),
            e = 0;
          e < this.$items.length;
          e++
        )
          c += '<div class="lg-item"></div>';
        if (
          (this.s.controls &&
            this.$items.length > 1 &&
            (d =
              '<div class="lg-actions"><button class="lg-prev lg-icon">' +
              this.s.prevHtml +
              '</button><button class="lg-next lg-icon">' +
              this.s.nextHtml +
              "</button></div>"),
          ".lg-sub-html" === this.s.appendSubHtmlTo &&
            (f = '<div class="lg-sub-html"></div>'),
          (b =
            '<div class="lg-outer ' +
            this.s.addClass +
            " " +
            this.s.startClass +
            '"><div class="lg" style="width:' +
            this.s.width +
            "; height:" +
            this.s.height +
            '"><div class="lg-inner">' +
            c +
            '</div><div class="lg-toolbar lg-group"><span class="lg-close lg-icon"></span></div>' +
            d +
            f +
            "</div></div>"),
          a("body").append(b),
          (this.$outer = a(".lg-outer")),
          (this.$slide = this.$outer.find(".lg-item")),
          this.s.useLeft
            ? (this.$outer.addClass("lg-use-left"), (this.s.mode = "lg-slide"))
            : this.$outer.addClass("lg-use-css3"),
          g.setTop(),
          a(window).on("resize.lg orientationchange.lg", function () {
            setTimeout(function () {
              g.setTop();
            }, 100);
          }),
          this.$slide.eq(this.index).addClass("lg-current"),
          this.doCss()
            ? this.$outer.addClass("lg-css3")
            : (this.$outer.addClass("lg-css"), (this.s.speed = 0)),
          this.$outer.addClass(this.s.mode),
          this.s.enableDrag &&
            this.$items.length > 1 &&
            this.$outer.addClass("lg-grab"),
          this.s.showAfterLoad && this.$outer.addClass("lg-show-after-load"),
          this.doCss())
        ) {
          var h = this.$outer.find(".lg-inner");
          h.css("transition-timing-function", this.s.cssEasing),
            h.css("transition-duration", this.s.speed + "ms");
        }
        setTimeout(function () {
          a(".lg-backdrop").addClass("in");
        }),
          setTimeout(function () {
            g.$outer.addClass("lg-visible");
          }, this.s.backdropDuration),
          this.s.download &&
            this.$outer
              .find(".lg-toolbar")
              .append(
                '<a id="lg-download" target="_blank" download class="lg-download lg-icon"></a>'
              ),
          (this.prevScrollTop = a(window).scrollTop());
      }),
      (b.prototype.setTop = function () {
        if ("100%" !== this.s.height) {
          var b = a(window).height(),
            c = (b - parseInt(this.s.height, 10)) / 2,
            d = this.$outer.find(".lg");
          b >= parseInt(this.s.height, 10)
            ? d.css("top", c + "px")
            : d.css("top", "0px");
        }
      }),
      (b.prototype.doCss = function () {
        return !!(function () {
          var a = [
              "transition",
              "MozTransition",
              "WebkitTransition",
              "OTransition",
              "msTransition",
              "KhtmlTransition",
            ],
            b = document.documentElement,
            c = 0;
          for (c = 0; c < a.length; c++) if (a[c] in b.style) return !0;
        })();
      }),
      (b.prototype.isVideo = function (a, b) {
        var c;
        if (
          ((c = this.s.dynamic
            ? this.s.dynamicEl[b].html
            : this.$items.eq(b).attr("data-html")),
          !a)
        )
          return c
            ? { html5: !0 }
            : (console.error(
                "lightGallery :- data-src is not pvovided on slide item " +
                  (b + 1) +
                  ". Please make sure the selector property is properly configured. More info - https://sachinchoolur.github.io/lightGallery/demos/html-markup.html"
              ),
              !1);
        var d = a.match(
            /\/\/(?:www\.)?youtu(?:\.be|be\.com)\/(?:watch\?v=|embed\/)?([a-z0-9\-\_\%]+)/i
          ),
          e = a.match(/\/\/(?:www\.)?vimeo.com\/([0-9a-z\-_]+)/i),
          f = a.match(/\/\/(?:www\.)?dai.ly\/([0-9a-z\-_]+)/i),
          g = a.match(
            /\/\/(?:www\.)?(?:vk\.com|vkontakte\.ru)\/(?:video_ext\.php\?)(.*)/i
          );
        return d
          ? { youtube: d }
          : e
          ? { vimeo: e }
          : f
          ? { dailymotion: f }
          : g
          ? { vk: g }
          : void 0;
      }),
      (b.prototype.counter = function () {
        this.s.counter &&
          a(this.s.appendCounterTo).append(
            '<div id="lg-counter"><span id="lg-counter-current">' +
              (parseInt(this.index, 10) + 1) +
              '</span> / <span id="lg-counter-all">' +
              this.$items.length +
              "</span></div>"
          );
      }),
      (b.prototype.addHtml = function (b) {
        var c,
          d,
          e = null;
        if (
          (this.s.dynamic
            ? this.s.dynamicEl[b].subHtmlUrl
              ? (c = this.s.dynamicEl[b].subHtmlUrl)
              : (e = this.s.dynamicEl[b].subHtml)
            : ((d = this.$items.eq(b)),
              d.attr("data-sub-html-url")
                ? (c = d.attr("data-sub-html-url"))
                : ((e = d.attr("data-sub-html")),
                  this.s.getCaptionFromTitleOrAlt &&
                    !e &&
                    (e =
                      d.attr("title") || d.find("img").first().attr("alt")))),
          !c)
        )
          if (void 0 !== e && null !== e) {
            var f = e.substring(0, 1);
            ("." !== f && "#" !== f) ||
              (e =
                this.s.subHtmlSelectorRelative && !this.s.dynamic
                  ? d.find(e).html()
                  : a(e).html());
          } else e = "";
        ".lg-sub-html" === this.s.appendSubHtmlTo
          ? c
            ? this.$outer.find(this.s.appendSubHtmlTo).load(c)
            : this.$outer.find(this.s.appendSubHtmlTo).html(e)
          : c
          ? this.$slide.eq(b).load(c)
          : this.$slide.eq(b).append(e),
          void 0 !== e &&
            null !== e &&
            ("" === e
              ? this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .addClass("lg-empty-html")
              : this.$outer
                  .find(this.s.appendSubHtmlTo)
                  .removeClass("lg-empty-html")),
          this.$el.trigger("onAfterAppendSubHtml.lg", [b]);
      }),
      (b.prototype.preload = function (a) {
        var b = 1,
          c = 1;
        for (b = 1; b <= this.s.preload && !(b >= this.$items.length - a); b++)
          this.loadContent(a + b, !1, 0);
        for (c = 1; c <= this.s.preload && !(a - c < 0); c++)
          this.loadContent(a - c, !1, 0);
      }),
      (b.prototype.loadContent = function (b, c, d) {
        var e,
          f,
          g,
          h,
          i,
          j,
          k = this,
          l = !1,
          m = function (b) {
            for (var c = [], d = [], e = 0; e < b.length; e++) {
              var g = b[e].split(" ");
              "" === g[0] && g.splice(0, 1), d.push(g[0]), c.push(g[1]);
            }
            for (var h = a(window).width(), i = 0; i < c.length; i++)
              if (parseInt(c[i], 10) > h) {
                f = d[i];
                break;
              }
          };
        if (k.s.dynamic) {
          if (
            (k.s.dynamicEl[b].poster &&
              ((l = !0), (g = k.s.dynamicEl[b].poster)),
            (j = k.s.dynamicEl[b].html),
            (f = k.s.dynamicEl[b].src),
            k.s.dynamicEl[b].responsive)
          ) {
            m(k.s.dynamicEl[b].responsive.split(","));
          }
          (h = k.s.dynamicEl[b].srcset), (i = k.s.dynamicEl[b].sizes);
        } else {
          if (
            (k.$items.eq(b).attr("data-poster") &&
              ((l = !0), (g = k.$items.eq(b).attr("data-poster"))),
            (j = k.$items.eq(b).attr("data-html")),
            (f =
              k.$items.eq(b).attr("href") || k.$items.eq(b).attr("data-src")),
            k.$items.eq(b).attr("data-responsive"))
          ) {
            m(k.$items.eq(b).attr("data-responsive").split(","));
          }
          (h = k.$items.eq(b).attr("data-srcset")),
            (i = k.$items.eq(b).attr("data-sizes"));
        }
        var n = !1;
        k.s.dynamic
          ? k.s.dynamicEl[b].iframe && (n = !0)
          : "true" === k.$items.eq(b).attr("data-iframe") && (n = !0);
        var o = k.isVideo(f, b);
        if (!k.$slide.eq(b).hasClass("lg-loaded")) {
          if (n)
            k.$slide
              .eq(b)
              .prepend(
                '<div class="lg-video-cont lg-has-iframe" style="max-width:' +
                  k.s.iframeMaxWidth +
                  '"><div class="lg-video"><iframe class="lg-object" frameborder="0" src="' +
                  f +
                  '"  allowfullscreen="true"></iframe></div></div>'
              );
          else if (l) {
            var p = "";
            (p =
              o && o.youtube
                ? "lg-has-youtube"
                : o && o.vimeo
                ? "lg-has-vimeo"
                : "lg-has-html5"),
              k.$slide
                .eq(b)
                .prepend(
                  '<div class="lg-video-cont ' +
                    p +
                    ' "><div class="lg-video"><span class="lg-video-play"></span><img class="lg-object lg-has-poster" src="' +
                    g +
                    '" /></div></div>'
                );
          } else
            o
              ? (k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-video-cont "><div class="lg-video"></div></div>'
                  ),
                k.$el.trigger("hasVideo.lg", [b, f, j]))
              : k.$slide
                  .eq(b)
                  .prepend(
                    '<div class="lg-img-wrap"><img class="lg-object lg-image" src="' +
                      f +
                      '" /></div>'
                  );
          if (
            (k.$el.trigger("onAferAppendSlide.lg", [b]),
            (e = k.$slide.eq(b).find(".lg-object")),
            i && e.attr("sizes", i),
            h)
          ) {
            e.attr("srcset", h);
            try {
              picturefill({ elements: [e[0]] });
            } catch (a) {
              console.warn(
                "lightGallery :- If you want srcset to be supported for older browser please include picturefil version 2 javascript library in your document."
              );
            }
          }
          ".lg-sub-html" !== this.s.appendSubHtmlTo && k.addHtml(b),
            k.$slide.eq(b).addClass("lg-loaded");
        }
        k.$slide
          .eq(b)
          .find(".lg-object")
          .on("load.lg error.lg", function () {
            var c = 0;
            d && !a("body").hasClass("lg-from-hash") && (c = d),
              setTimeout(function () {
                k.$slide.eq(b).addClass("lg-complete"),
                  k.$el.trigger("onSlideItemLoad.lg", [b, d || 0]);
              }, c);
          }),
          o && o.html5 && !l && k.$slide.eq(b).addClass("lg-complete"),
          !0 === c &&
            (k.$slide.eq(b).hasClass("lg-complete")
              ? k.preload(b)
              : k.$slide
                  .eq(b)
                  .find(".lg-object")
                  .on("load.lg error.lg", function () {
                    k.preload(b);
                  }));
      }),
      (b.prototype.slide = function (b, c, d, e) {
        var f = this.$outer.find(".lg-current").index(),
          g = this;
        if (!g.lGalleryOn || f !== b) {
          var h = this.$slide.length,
            i = g.lGalleryOn ? this.s.speed : 0;
          if (!g.lgBusy) {
            if (this.s.download) {
              var j;
              (j = g.s.dynamic
                ? !1 !== g.s.dynamicEl[b].downloadUrl &&
                  (g.s.dynamicEl[b].downloadUrl || g.s.dynamicEl[b].src)
                : "false" !== g.$items.eq(b).attr("data-download-url") &&
                  (g.$items.eq(b).attr("data-download-url") ||
                    g.$items.eq(b).attr("href") ||
                    g.$items.eq(b).attr("data-src"))),
                j
                  ? (a("#lg-download").attr("href", j),
                    g.$outer.removeClass("lg-hide-download"))
                  : g.$outer.addClass("lg-hide-download");
            }
            if (
              (this.$el.trigger("onBeforeSlide.lg", [f, b, c, d]),
              (g.lgBusy = !0),
              clearTimeout(g.hideBartimeout),
              ".lg-sub-html" === this.s.appendSubHtmlTo &&
                setTimeout(function () {
                  g.addHtml(b);
                }, i),
              this.arrowDisable(b),
              e || (b < f ? (e = "prev") : b > f && (e = "next")),
              c)
            ) {
              this.$slide.removeClass("lg-prev-slide lg-current lg-next-slide");
              var k, l;
              h > 2
                ? ((k = b - 1),
                  (l = b + 1),
                  0 === b && f === h - 1
                    ? ((l = 0), (k = h - 1))
                    : b === h - 1 && 0 === f && ((l = 0), (k = h - 1)))
                : ((k = 0), (l = 1)),
                "prev" === e
                  ? g.$slide.eq(l).addClass("lg-next-slide")
                  : g.$slide.eq(k).addClass("lg-prev-slide"),
                g.$slide.eq(b).addClass("lg-current");
            } else
              g.$outer.addClass("lg-no-trans"),
                this.$slide.removeClass("lg-prev-slide lg-next-slide"),
                "prev" === e
                  ? (this.$slide.eq(b).addClass("lg-prev-slide"),
                    this.$slide.eq(f).addClass("lg-next-slide"))
                  : (this.$slide.eq(b).addClass("lg-next-slide"),
                    this.$slide.eq(f).addClass("lg-prev-slide")),
                setTimeout(function () {
                  g.$slide.removeClass("lg-current"),
                    g.$slide.eq(b).addClass("lg-current"),
                    g.$outer.removeClass("lg-no-trans");
                }, 50);
            g.lGalleryOn
              ? (setTimeout(function () {
                  g.loadContent(b, !0, 0);
                }, this.s.speed + 50),
                setTimeout(function () {
                  (g.lgBusy = !1),
                    g.$el.trigger("onAfterSlide.lg", [f, b, c, d]);
                }, this.s.speed))
              : (g.loadContent(b, !0, g.s.backdropDuration),
                (g.lgBusy = !1),
                g.$el.trigger("onAfterSlide.lg", [f, b, c, d])),
              (g.lGalleryOn = !0),
              this.s.counter && a("#lg-counter-current").text(b + 1);
          }
          g.index = b;
        }
      }),
      (b.prototype.goToNextSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index + 1 < b.$slide.length
              ? (b.index++,
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : c
              ? ((b.index = 0),
                b.$el.trigger("onBeforeNextSlide.lg", [b.index]),
                b.slide(b.index, a, !1, "next"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-right-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-right-end");
                }, 400)));
      }),
      (b.prototype.goToPrevSlide = function (a) {
        var b = this,
          c = b.s.loop;
        a && b.$slide.length < 3 && (c = !1),
          b.lgBusy ||
            (b.index > 0
              ? (b.index--,
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : c
              ? ((b.index = b.$items.length - 1),
                b.$el.trigger("onBeforePrevSlide.lg", [b.index, a]),
                b.slide(b.index, a, !1, "prev"))
              : b.s.slideEndAnimatoin &&
                !a &&
                (b.$outer.addClass("lg-left-end"),
                setTimeout(function () {
                  b.$outer.removeClass("lg-left-end");
                }, 400)));
      }),
      (b.prototype.keyPress = function () {
        var b = this;
        this.$items.length > 1 &&
          a(window).on("keyup.lg", function (a) {
            b.$items.length > 1 &&
              (37 === a.keyCode && (a.preventDefault(), b.goToPrevSlide()),
              39 === a.keyCode && (a.preventDefault(), b.goToNextSlide()));
          }),
          a(window).on("keydown.lg", function (a) {
            !0 === b.s.escKey &&
              27 === a.keyCode &&
              (a.preventDefault(),
              b.$outer.hasClass("lg-thumb-open")
                ? b.$outer.removeClass("lg-thumb-open")
                : b.destroy());
          });
      }),
      (b.prototype.arrow = function () {
        var a = this;
        this.$outer.find(".lg-prev").on("click.lg", function () {
          a.goToPrevSlide();
        }),
          this.$outer.find(".lg-next").on("click.lg", function () {
            a.goToNextSlide();
          });
      }),
      (b.prototype.arrowDisable = function (a) {
        !this.s.loop &&
          this.s.hideControlOnEnd &&
          (a + 1 < this.$slide.length
            ? this.$outer
                .find(".lg-next")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-next")
                .attr("disabled", "disabled")
                .addClass("disabled"),
          a > 0
            ? this.$outer
                .find(".lg-prev")
                .removeAttr("disabled")
                .removeClass("disabled")
            : this.$outer
                .find(".lg-prev")
                .attr("disabled", "disabled")
                .addClass("disabled"));
      }),
      (b.prototype.setTranslate = function (a, b, c) {
        this.s.useLeft
          ? a.css("left", b)
          : a.css({ transform: "translate3d(" + b + "px, " + c + "px, 0px)" });
      }),
      (b.prototype.touchMove = function (b, c) {
        var d = c - b;
        Math.abs(d) > 15 &&
          (this.$outer.addClass("lg-dragging"),
          this.setTranslate(this.$slide.eq(this.index), d, 0),
          this.setTranslate(
            a(".lg-prev-slide"),
            -this.$slide.eq(this.index).width() + d,
            0
          ),
          this.setTranslate(
            a(".lg-next-slide"),
            this.$slide.eq(this.index).width() + d,
            0
          ));
      }),
      (b.prototype.touchEnd = function (a) {
        var b = this;
        "lg-slide" !== b.s.mode && b.$outer.addClass("lg-slide"),
          this.$slide
            .not(".lg-current, .lg-prev-slide, .lg-next-slide")
            .css("opacity", "0"),
          setTimeout(function () {
            b.$outer.removeClass("lg-dragging"),
              a < 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToNextSlide(!0)
                : a > 0 && Math.abs(a) > b.s.swipeThreshold
                ? b.goToPrevSlide(!0)
                : Math.abs(a) < 5 && b.$el.trigger("onSlideClick.lg"),
              b.$slide.removeAttr("style");
          }),
          setTimeout(function () {
            b.$outer.hasClass("lg-dragging") ||
              "lg-slide" === b.s.mode ||
              b.$outer.removeClass("lg-slide");
          }, b.s.speed + 100);
      }),
      (b.prototype.enableSwipe = function () {
        var a = this,
          b = 0,
          c = 0,
          d = !1;
        a.s.enableSwipe &&
          a.doCss() &&
          (a.$slide.on("touchstart.lg", function (c) {
            a.$outer.hasClass("lg-zoomed") ||
              a.lgBusy ||
              (c.preventDefault(),
              a.manageSwipeClass(),
              (b = c.originalEvent.targetTouches[0].pageX));
          }),
          a.$slide.on("touchmove.lg", function (e) {
            a.$outer.hasClass("lg-zoomed") ||
              (e.preventDefault(),
              (c = e.originalEvent.targetTouches[0].pageX),
              a.touchMove(b, c),
              (d = !0));
          }),
          a.$slide.on("touchend.lg", function () {
            a.$outer.hasClass("lg-zoomed") ||
              (d
                ? ((d = !1), a.touchEnd(c - b))
                : a.$el.trigger("onSlideClick.lg"));
          }));
      }),
      (b.prototype.enableDrag = function () {
        var b = this,
          c = 0,
          d = 0,
          e = !1,
          f = !1;
        b.s.enableDrag &&
          b.doCss() &&
          (b.$slide.on("mousedown.lg", function (d) {
            b.$outer.hasClass("lg-zoomed") ||
              b.lgBusy ||
              a(d.target).text().trim() ||
              (d.preventDefault(),
              b.manageSwipeClass(),
              (c = d.pageX),
              (e = !0),
              (b.$outer.scrollLeft += 1),
              (b.$outer.scrollLeft -= 1),
              b.$outer.removeClass("lg-grab").addClass("lg-grabbing"),
              b.$el.trigger("onDragstart.lg"));
          }),
          a(window).on("mousemove.lg", function (a) {
            e &&
              ((f = !0),
              (d = a.pageX),
              b.touchMove(c, d),
              b.$el.trigger("onDragmove.lg"));
          }),
          a(window).on("mouseup.lg", function (g) {
            f
              ? ((f = !1), b.touchEnd(d - c), b.$el.trigger("onDragend.lg"))
              : (a(g.target).hasClass("lg-object") ||
                  a(g.target).hasClass("lg-video-play")) &&
                b.$el.trigger("onSlideClick.lg"),
              e &&
                ((e = !1),
                b.$outer.removeClass("lg-grabbing").addClass("lg-grab"));
          }));
      }),
      (b.prototype.manageSwipeClass = function () {
        var a = this.index + 1,
          b = this.index - 1;
        this.s.loop &&
          this.$slide.length > 2 &&
          (0 === this.index
            ? (b = this.$slide.length - 1)
            : this.index === this.$slide.length - 1 && (a = 0)),
          this.$slide.removeClass("lg-next-slide lg-prev-slide"),
          b > -1 && this.$slide.eq(b).addClass("lg-prev-slide"),
          this.$slide.eq(a).addClass("lg-next-slide");
      }),
      (b.prototype.mousewheel = function () {
        var a = this;
        a.$outer.on("mousewheel.lg", function (b) {
          b.deltaY &&
            (b.deltaY > 0 ? a.goToPrevSlide() : a.goToNextSlide(),
            b.preventDefault());
        });
      }),
      (b.prototype.closeGallery = function () {
        var b = this,
          c = !1;
        this.$outer.find(".lg-close").on("click.lg", function () {
          b.destroy();
        }),
          b.s.closable &&
            (b.$outer.on("mousedown.lg", function (b) {
              c = !!(
                a(b.target).is(".lg-outer") ||
                a(b.target).is(".lg-item ") ||
                a(b.target).is(".lg-img-wrap")
              );
            }),
            b.$outer.on("mousemove.lg", function () {
              c = !1;
            }),
            b.$outer.on("mouseup.lg", function (d) {
              (a(d.target).is(".lg-outer") ||
                a(d.target).is(".lg-item ") ||
                (a(d.target).is(".lg-img-wrap") && c)) &&
                (b.$outer.hasClass("lg-dragging") || b.destroy());
            }));
      }),
      (b.prototype.destroy = function (b) {
        var c = this;
        b ||
          (c.$el.trigger("onBeforeClose.lg"),
          a(window).scrollTop(c.prevScrollTop)),
          b &&
            (c.s.dynamic || this.$items.off("click.lg click.lgcustom"),
            a.removeData(c.el, "lightGallery")),
          this.$el.off(".lg.tm"),
          a.each(a.fn.lightGallery.modules, function (a) {
            c.modules[a] && c.modules[a].destroy();
          }),
          (this.lGalleryOn = !1),
          clearTimeout(c.hideBartimeout),
          (this.hideBartimeout = !1),
          a(window).off(".lg"),
          a("body").removeClass("lg-on lg-from-hash"),
          c.$outer && c.$outer.removeClass("lg-visible"),
          a(".lg-backdrop").removeClass("in"),
          setTimeout(function () {
            c.$outer && c.$outer.remove(),
              a(".lg-backdrop").remove(),
              b || c.$el.trigger("onCloseAfter.lg");
          }, c.s.backdropDuration + 50);
      }),
      (a.fn.lightGallery = function (c) {
        return this.each(function () {
          if (a.data(this, "lightGallery"))
            try {
              a(this).data("lightGallery").init();
            } catch (a) {
              console.error("lightGallery has not initiated properly");
            }
          else a.data(this, "lightGallery", new b(this, c));
        });
      }),
      (a.fn.lightGallery.modules = {});
  })();
}),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          autoplay: !1,
          pause: 5e3,
          progressBar: !0,
          fourceAutoplay: !1,
          autoplayControls: !0,
          appendAutoplayControlsTo: ".lg-toolbar",
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.$el = a(c)),
            !(this.core.$items.length < 2) &&
              ((this.core.s = a.extend({}, b, this.core.s)),
              (this.interval = !1),
              (this.fromAuto = !0),
              (this.canceledOnTouch = !1),
              (this.fourceAutoplayTemp = this.core.s.fourceAutoplay),
              this.core.doCss() || (this.core.s.progressBar = !1),
              this.init(),
              this)
          );
        };
      (c.prototype.init = function () {
        var a = this;
        a.core.s.autoplayControls && a.controls(),
          a.core.s.progressBar &&
            a.core.$outer
              .find(".lg")
              .append(
                '<div class="lg-progress-bar"><div class="lg-progress"></div></div>'
              ),
          a.progress(),
          a.core.s.autoplay &&
            a.$el.one("onSlideItemLoad.lg.tm", function () {
              a.startlAuto();
            }),
          a.$el.on("onDragstart.lg.tm touchstart.lg.tm", function () {
            a.interval && (a.cancelAuto(), (a.canceledOnTouch = !0));
          }),
          a.$el.on(
            "onDragend.lg.tm touchend.lg.tm onSlideClick.lg.tm",
            function () {
              !a.interval &&
                a.canceledOnTouch &&
                (a.startlAuto(), (a.canceledOnTouch = !1));
            }
          );
      }),
        (c.prototype.progress = function () {
          var a,
            b,
            c = this;
          c.$el.on("onBeforeSlide.lg.tm", function () {
            c.core.s.progressBar &&
              c.fromAuto &&
              ((a = c.core.$outer.find(".lg-progress-bar")),
              (b = c.core.$outer.find(".lg-progress")),
              c.interval &&
                (b.removeAttr("style"),
                a.removeClass("lg-start"),
                setTimeout(function () {
                  b.css(
                    "transition",
                    "width " + (c.core.s.speed + c.core.s.pause) + "ms ease 0s"
                  ),
                    a.addClass("lg-start");
                }, 20))),
              c.fromAuto || c.core.s.fourceAutoplay || c.cancelAuto(),
              (c.fromAuto = !1);
          });
        }),
        (c.prototype.controls = function () {
          var b = this;
          a(this.core.s.appendAutoplayControlsTo).append(
            '<span class="lg-autoplay-button lg-icon"></span>'
          ),
            b.core.$outer
              .find(".lg-autoplay-button")
              .on("click.lg", function () {
                a(b.core.$outer).hasClass("lg-show-autoplay")
                  ? (b.cancelAuto(), (b.core.s.fourceAutoplay = !1))
                  : b.interval ||
                    (b.startlAuto(),
                    (b.core.s.fourceAutoplay = b.fourceAutoplayTemp));
              });
        }),
        (c.prototype.startlAuto = function () {
          var a = this;
          a.core.$outer
            .find(".lg-progress")
            .css(
              "transition",
              "width " + (a.core.s.speed + a.core.s.pause) + "ms ease 0s"
            ),
            a.core.$outer.addClass("lg-show-autoplay"),
            a.core.$outer.find(".lg-progress-bar").addClass("lg-start"),
            (a.interval = setInterval(function () {
              a.core.index + 1 < a.core.$items.length
                ? a.core.index++
                : (a.core.index = 0),
                (a.fromAuto = !0),
                a.core.slide(a.core.index, !1, !1, "next");
            }, a.core.s.speed + a.core.s.pause));
        }),
        (c.prototype.cancelAuto = function () {
          clearInterval(this.interval),
            (this.interval = !1),
            this.core.$outer.find(".lg-progress").removeAttr("style"),
            this.core.$outer.removeClass("lg-show-autoplay"),
            this.core.$outer.find(".lg-progress-bar").removeClass("lg-start");
        }),
        (c.prototype.destroy = function () {
          this.cancelAuto(), this.core.$outer.find(".lg-progress-bar").remove();
        }),
        (a.fn.lightGallery.modules.autoplay = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = { fullScreen: !0 },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.$el = a(c)),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var a = "";
        if (this.core.s.fullScreen) {
          if (
            !(
              document.fullscreenEnabled ||
              document.webkitFullscreenEnabled ||
              document.mozFullScreenEnabled ||
              document.msFullscreenEnabled
            )
          )
            return;
          (a = '<span class="lg-fullscreen lg-icon"></span>'),
            this.core.$outer.find(".lg-toolbar").append(a),
            this.fullScreen();
        }
      }),
        (c.prototype.requestFullscreen = function () {
          var a = document.documentElement;
          a.requestFullscreen
            ? a.requestFullscreen()
            : a.msRequestFullscreen
            ? a.msRequestFullscreen()
            : a.mozRequestFullScreen
            ? a.mozRequestFullScreen()
            : a.webkitRequestFullscreen && a.webkitRequestFullscreen();
        }),
        (c.prototype.exitFullscreen = function () {
          document.exitFullscreen
            ? document.exitFullscreen()
            : document.msExitFullscreen
            ? document.msExitFullscreen()
            : document.mozCancelFullScreen
            ? document.mozCancelFullScreen()
            : document.webkitExitFullscreen && document.webkitExitFullscreen();
        }),
        (c.prototype.fullScreen = function () {
          var b = this;
          a(document).on(
            "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg",
            function () {
              b.core.$outer.toggleClass("lg-fullscreen-on");
            }
          ),
            this.core.$outer.find(".lg-fullscreen").on("click.lg", function () {
              document.fullscreenElement ||
              document.mozFullScreenElement ||
              document.webkitFullscreenElement ||
              document.msFullscreenElement
                ? b.exitFullscreen()
                : b.requestFullscreen();
            });
        }),
        (c.prototype.destroy = function () {
          this.exitFullscreen(),
            a(document).off(
              "fullscreenchange.lg webkitfullscreenchange.lg mozfullscreenchange.lg MSFullscreenChange.lg"
            );
        }),
        (a.fn.lightGallery.modules.fullscreen = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = { pager: !1 },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.$el = a(c)),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.pager && this.core.$items.length > 1 && this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var b,
          c,
          d,
          e = this,
          f = "";
        if (
          (e.core.$outer
            .find(".lg")
            .append('<div class="lg-pager-outer"></div>'),
          e.core.s.dynamic)
        )
          for (var g = 0; g < e.core.s.dynamicEl.length; g++)
            f +=
              '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
              e.core.s.dynamicEl[g].thumb +
              '" /></div></span>';
        else
          e.core.$items.each(function () {
            e.core.s.exThumbImage
              ? (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).attr(e.core.s.exThumbImage) +
                  '" /></div></span>')
              : (f +=
                  '<span class="lg-pager-cont"> <span class="lg-pager"></span><div class="lg-pager-thumb-cont"><span class="lg-caret"></span> <img src="' +
                  a(this).find("img").attr("src") +
                  '" /></div></span>');
          });
        (c = e.core.$outer.find(".lg-pager-outer")),
          c.html(f),
          (b = e.core.$outer.find(".lg-pager-cont")),
          b.on("click.lg touchend.lg", function () {
            var b = a(this);
            (e.core.index = b.index()), e.core.slide(e.core.index, !1, !0, !1);
          }),
          c.on("mouseover.lg", function () {
            clearTimeout(d), c.addClass("lg-pager-hover");
          }),
          c.on("mouseout.lg", function () {
            d = setTimeout(function () {
              c.removeClass("lg-pager-hover");
            });
          }),
          e.core.$el.on("onBeforeSlide.lg.tm", function (a, c, d) {
            b.removeClass("lg-pager-active"),
              b.eq(d).addClass("lg-pager-active");
          });
      }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.pager = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          thumbnail: !0,
          animateThumb: !0,
          currentPagerPosition: "middle",
          thumbWidth: 100,
          thumbHeight: "80px",
          thumbContHeight: 100,
          thumbMargin: 5,
          exThumbImage: !1,
          showThumbByDefault: !0,
          toogleThumb: !0,
          pullCaptionUp: !0,
          enableThumbDrag: !0,
          enableThumbSwipe: !0,
          swipeThreshold: 50,
          loadYoutubeThumbnail: !0,
          youtubeThumbSize: 1,
          loadVimeoThumbnail: !0,
          vimeoThumbSize: "thumbnail_small",
          loadDailymotionThumbnail: !0,
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            (this.$el = a(c)),
            (this.$thumbOuter = null),
            (this.thumbOuterWidth = 0),
            (this.thumbTotalWidth =
              this.core.$items.length *
              (this.core.s.thumbWidth + this.core.s.thumbMargin)),
            (this.thumbIndex = this.core.index),
            this.core.s.animateThumb && (this.core.s.thumbHeight = "100%"),
            (this.left = 0),
            this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var a = this;
        this.core.s.thumbnail &&
          this.core.$items.length > 1 &&
          (this.core.s.showThumbByDefault &&
            setTimeout(function () {
              a.core.$outer.addClass("lg-thumb-open");
            }, 700),
          this.core.s.pullCaptionUp &&
            this.core.$outer.addClass("lg-pull-caption-up"),
          this.build(),
          this.core.s.animateThumb && this.core.doCss()
            ? (this.core.s.enableThumbDrag && this.enableThumbDrag(),
              this.core.s.enableThumbSwipe && this.enableThumbSwipe(),
              (this.thumbClickable = !1))
            : (this.thumbClickable = !0),
          this.toogle(),
          this.thumbkeyPress());
      }),
        (c.prototype.build = function () {
          function b(a, b, c) {
            var g,
              h = d.core.isVideo(a, c) || {},
              i = "";
            h.youtube || h.vimeo || h.dailymotion
              ? h.youtube
                ? (g = d.core.s.loadYoutubeThumbnail
                    ? "//img.youtube.com/vi/" +
                      h.youtube[1] +
                      "/" +
                      d.core.s.youtubeThumbSize +
                      ".jpg"
                    : b)
                : h.vimeo
                ? d.core.s.loadVimeoThumbnail
                  ? ((g = "//i.vimeocdn.com/video/error_" + f + ".jpg"),
                    (i = h.vimeo[1]))
                  : (g = b)
                : h.dailymotion &&
                  (g = d.core.s.loadDailymotionThumbnail
                    ? "//www.dailymotion.com/thumbnail/video/" +
                      h.dailymotion[1]
                    : b)
              : (g = b),
              (e +=
                '<div data-vimeo-id="' +
                i +
                '" class="lg-thumb-item" style="width:' +
                d.core.s.thumbWidth +
                "px; height: " +
                d.core.s.thumbHeight +
                "; margin-right: " +
                d.core.s.thumbMargin +
                'px"><img src="' +
                g +
                '" /></div>'),
              (i = "");
          }
          var c,
            d = this,
            e = "",
            f = "",
            g =
              '<div class="lg-thumb-outer"><div class="lg-thumb lg-group"></div></div>';
          switch (this.core.s.vimeoThumbSize) {
            case "thumbnail_large":
              f = "640";
              break;
            case "thumbnail_medium":
              f = "200x150";
              break;
            case "thumbnail_small":
              f = "100x75";
          }
          if (
            (d.core.$outer.addClass("lg-has-thumb"),
            d.core.$outer.find(".lg").append(g),
            (d.$thumbOuter = d.core.$outer.find(".lg-thumb-outer")),
            (d.thumbOuterWidth = d.$thumbOuter.width()),
            d.core.s.animateThumb &&
              d.core.$outer
                .find(".lg-thumb")
                .css({ width: d.thumbTotalWidth + "px", position: "relative" }),
            this.core.s.animateThumb &&
              d.$thumbOuter.css("height", d.core.s.thumbContHeight + "px"),
            d.core.s.dynamic)
          )
            for (var h = 0; h < d.core.s.dynamicEl.length; h++)
              b(d.core.s.dynamicEl[h].src, d.core.s.dynamicEl[h].thumb, h);
          else
            d.core.$items.each(function (c) {
              d.core.s.exThumbImage
                ? b(
                    a(this).attr("href") || a(this).attr("data-src"),
                    a(this).attr(d.core.s.exThumbImage),
                    c
                  )
                : b(
                    a(this).attr("href") || a(this).attr("data-src"),
                    a(this).find("img").attr("src"),
                    c
                  );
            });
          d.core.$outer.find(".lg-thumb").html(e),
            (c = d.core.$outer.find(".lg-thumb-item")),
            c.each(function () {
              var b = a(this),
                c = b.attr("data-vimeo-id");
              c &&
                a.getJSON(
                  "//www.vimeo.com/api/v2/video/" + c + ".json?callback=?",
                  { format: "json" },
                  function (a) {
                    b.find("img").attr("src", a[0][d.core.s.vimeoThumbSize]);
                  }
                );
            }),
            c.eq(d.core.index).addClass("active"),
            d.core.$el.on("onBeforeSlide.lg.tm", function () {
              c.removeClass("active"), c.eq(d.core.index).addClass("active");
            }),
            c.on("click.lg touchend.lg", function () {
              var b = a(this);
              setTimeout(function () {
                ((d.thumbClickable && !d.core.lgBusy) || !d.core.doCss()) &&
                  ((d.core.index = b.index()),
                  d.core.slide(d.core.index, !1, !0, !1));
              }, 50);
            }),
            d.core.$el.on("onBeforeSlide.lg.tm", function () {
              d.animateThumb(d.core.index);
            }),
            a(window).on(
              "resize.lg.thumb orientationchange.lg.thumb",
              function () {
                setTimeout(function () {
                  d.animateThumb(d.core.index),
                    (d.thumbOuterWidth = d.$thumbOuter.width());
                }, 200);
              }
            );
        }),
        (c.prototype.setTranslate = function (a) {
          this.core.$outer
            .find(".lg-thumb")
            .css({ transform: "translate3d(-" + a + "px, 0px, 0px)" });
        }),
        (c.prototype.animateThumb = function (a) {
          var b = this.core.$outer.find(".lg-thumb");
          if (this.core.s.animateThumb) {
            var c;
            switch (this.core.s.currentPagerPosition) {
              case "left":
                c = 0;
                break;
              case "middle":
                c = this.thumbOuterWidth / 2 - this.core.s.thumbWidth / 2;
                break;
              case "right":
                c = this.thumbOuterWidth - this.core.s.thumbWidth;
            }
            (this.left =
              (this.core.s.thumbWidth + this.core.s.thumbMargin) * a - 1 - c),
              this.left > this.thumbTotalWidth - this.thumbOuterWidth &&
                (this.left = this.thumbTotalWidth - this.thumbOuterWidth),
              this.left < 0 && (this.left = 0),
              this.core.lGalleryOn
                ? (b.hasClass("on") ||
                    this.core.$outer
                      .find(".lg-thumb")
                      .css("transition-duration", this.core.s.speed + "ms"),
                  this.core.doCss() ||
                    b.animate({ left: -this.left + "px" }, this.core.s.speed))
                : this.core.doCss() || b.css("left", -this.left + "px"),
              this.setTranslate(this.left);
          }
        }),
        (c.prototype.enableThumbDrag = function () {
          var b = this,
            c = 0,
            d = 0,
            e = !1,
            f = !1,
            g = 0;
          b.$thumbOuter.addClass("lg-grab"),
            b.core.$outer
              .find(".lg-thumb")
              .on("mousedown.lg.thumb", function (a) {
                b.thumbTotalWidth > b.thumbOuterWidth &&
                  (a.preventDefault(),
                  (c = a.pageX),
                  (e = !0),
                  (b.core.$outer.scrollLeft += 1),
                  (b.core.$outer.scrollLeft -= 1),
                  (b.thumbClickable = !1),
                  b.$thumbOuter.removeClass("lg-grab").addClass("lg-grabbing"));
              }),
            a(window).on("mousemove.lg.thumb", function (a) {
              e &&
                ((g = b.left),
                (f = !0),
                (d = a.pageX),
                b.$thumbOuter.addClass("lg-dragging"),
                (g -= d - c),
                g > b.thumbTotalWidth - b.thumbOuterWidth &&
                  (g = b.thumbTotalWidth - b.thumbOuterWidth),
                g < 0 && (g = 0),
                b.setTranslate(g));
            }),
            a(window).on("mouseup.lg.thumb", function () {
              f
                ? ((f = !1),
                  b.$thumbOuter.removeClass("lg-dragging"),
                  (b.left = g),
                  Math.abs(d - c) < b.core.s.swipeThreshold &&
                    (b.thumbClickable = !0))
                : (b.thumbClickable = !0),
                e &&
                  ((e = !1),
                  b.$thumbOuter.removeClass("lg-grabbing").addClass("lg-grab"));
            });
        }),
        (c.prototype.enableThumbSwipe = function () {
          var a = this,
            b = 0,
            c = 0,
            d = !1,
            e = 0;
          a.core.$outer.find(".lg-thumb").on("touchstart.lg", function (c) {
            a.thumbTotalWidth > a.thumbOuterWidth &&
              (c.preventDefault(),
              (b = c.originalEvent.targetTouches[0].pageX),
              (a.thumbClickable = !1));
          }),
            a.core.$outer.find(".lg-thumb").on("touchmove.lg", function (f) {
              a.thumbTotalWidth > a.thumbOuterWidth &&
                (f.preventDefault(),
                (c = f.originalEvent.targetTouches[0].pageX),
                (d = !0),
                a.$thumbOuter.addClass("lg-dragging"),
                (e = a.left),
                (e -= c - b),
                e > a.thumbTotalWidth - a.thumbOuterWidth &&
                  (e = a.thumbTotalWidth - a.thumbOuterWidth),
                e < 0 && (e = 0),
                a.setTranslate(e));
            }),
            a.core.$outer.find(".lg-thumb").on("touchend.lg", function () {
              a.thumbTotalWidth > a.thumbOuterWidth && d
                ? ((d = !1),
                  a.$thumbOuter.removeClass("lg-dragging"),
                  Math.abs(c - b) < a.core.s.swipeThreshold &&
                    (a.thumbClickable = !0),
                  (a.left = e))
                : (a.thumbClickable = !0);
            });
        }),
        (c.prototype.toogle = function () {
          var a = this;
          a.core.s.toogleThumb &&
            (a.core.$outer.addClass("lg-can-toggle"),
            a.$thumbOuter.append(
              '<span class="lg-toogle-thumb lg-icon"></span>'
            ),
            a.core.$outer.find(".lg-toogle-thumb").on("click.lg", function () {
              a.core.$outer.toggleClass("lg-thumb-open");
            }));
        }),
        (c.prototype.thumbkeyPress = function () {
          var b = this;
          a(window).on("keydown.lg.thumb", function (a) {
            38 === a.keyCode
              ? (a.preventDefault(), b.core.$outer.addClass("lg-thumb-open"))
              : 40 === a.keyCode &&
                (a.preventDefault(),
                b.core.$outer.removeClass("lg-thumb-open"));
          });
        }),
        (c.prototype.destroy = function () {
          this.core.s.thumbnail &&
            this.core.$items.length > 1 &&
            (a(window).off(
              "resize.lg.thumb orientationchange.lg.thumb keydown.lg.thumb"
            ),
            this.$thumbOuter.remove(),
            this.core.$outer.removeClass("lg-has-thumb"));
        }),
        (a.fn.lightGallery.modules.Thumbnail = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof module && module.exports
      ? (module.exports = b(require("jquery")))
      : b(a.jQuery);
  })(this, function (a) {
    !(function () {
      "use strict";
      function b(a, b, c, d) {
        var e = this;
        if (
          (e.core.$slide
            .eq(b)
            .find(".lg-video")
            .append(e.loadVideo(c, "lg-object", !0, b, d)),
          d)
        )
          if (e.core.s.videojs)
            try {
              videojs(
                e.core.$slide.eq(b).find(".lg-html5").get(0),
                e.core.s.videojsOptions,
                function () {
                  !e.videoLoaded && e.core.s.autoplayFirstVideo && this.play();
                }
              );
            } catch (a) {
              console.error("Make sure you have included videojs");
            }
          else
            !e.videoLoaded &&
              e.core.s.autoplayFirstVideo &&
              e.core.$slide.eq(b).find(".lg-html5").get(0).play();
      }
      function c(a, b) {
        var c = this.core.$slide.eq(b).find(".lg-video-cont");
        c.hasClass("lg-has-iframe") ||
          (c.css("max-width", this.core.s.videoMaxWidth),
          (this.videoLoaded = !0));
      }
      function d(b, c, d) {
        var e = this,
          f = e.core.$slide.eq(c),
          g = f.find(".lg-youtube").get(0),
          h = f.find(".lg-vimeo").get(0),
          i = f.find(".lg-dailymotion").get(0),
          j = f.find(".lg-vk").get(0),
          k = f.find(".lg-html5").get(0);
        if (g)
          g.contentWindow.postMessage(
            '{"event":"command","func":"pauseVideo","args":""}',
            "*"
          );
        else if (h)
          try {
            $f(h).api("pause");
          } catch (a) {
            console.error("Make sure you have included froogaloop2 js");
          }
        else if (i) i.contentWindow.postMessage("pause", "*");
        else if (k)
          if (e.core.s.videojs)
            try {
              videojs(k).pause();
            } catch (a) {
              console.error("Make sure you have included videojs");
            }
          else k.pause();
        j && a(j).attr("src", a(j).attr("src").replace("&autoplay", "&noplay"));
        var l;
        l = e.core.s.dynamic
          ? e.core.s.dynamicEl[d].src
          : e.core.$items.eq(d).attr("href") ||
            e.core.$items.eq(d).attr("data-src");
        var m = e.core.isVideo(l, d) || {};
        (m.youtube || m.vimeo || m.dailymotion || m.vk) &&
          e.core.$outer.addClass("lg-hide-download");
      }
      var e = {
          videoMaxWidth: "855px",
          autoplayFirstVideo: !0,
          youtubePlayerParams: !1,
          vimeoPlayerParams: !1,
          dailymotionPlayerParams: !1,
          vkPlayerParams: !1,
          videojs: !1,
          videojsOptions: {},
        },
        f = function (b) {
          return (
            (this.core = a(b).data("lightGallery")),
            (this.$el = a(b)),
            (this.core.s = a.extend({}, e, this.core.s)),
            (this.videoLoaded = !1),
            this.init(),
            this
          );
        };
      (f.prototype.init = function () {
        var e = this;
        e.core.$el.on("hasVideo.lg.tm", b.bind(this)),
          e.core.$el.on("onAferAppendSlide.lg.tm", c.bind(this)),
          e.core.doCss() &&
          e.core.$items.length > 1 &&
          (e.core.s.enableSwipe || e.core.s.enableDrag)
            ? e.core.$el.on("onSlideClick.lg.tm", function () {
                var a = e.core.$slide.eq(e.core.index);
                e.loadVideoOnclick(a);
              })
            : e.core.$slide.on("click.lg", function () {
                e.loadVideoOnclick(a(this));
              }),
          e.core.$el.on("onBeforeSlide.lg.tm", d.bind(this)),
          e.core.$el.on("onAfterSlide.lg.tm", function (a, b) {
            e.core.$slide.eq(b).removeClass("lg-video-playing");
          }),
          e.core.s.autoplayFirstVideo &&
            e.core.$el.on("onAferAppendSlide.lg.tm", function (a, b) {
              if (!e.core.lGalleryOn) {
                var c = e.core.$slide.eq(b);
                setTimeout(function () {
                  e.loadVideoOnclick(c);
                }, 100);
              }
            });
      }),
        (f.prototype.loadVideo = function (b, c, d, e, f) {
          var g = "",
            h = 1,
            i = "",
            j = this.core.isVideo(b, e) || {};
          if (
            (d &&
              (h = this.videoLoaded
                ? 0
                : this.core.s.autoplayFirstVideo
                ? 1
                : 0),
            j.youtube)
          )
            (i = "?wmode=opaque&autoplay=" + h + "&enablejsapi=1"),
              this.core.s.youtubePlayerParams &&
                (i = i + "&" + a.param(this.core.s.youtubePlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-youtube ' +
                c +
                '" width="560" height="315" src="//www.youtube.com/embed/' +
                j.youtube[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>');
          else if (j.vimeo)
            (i = "?autoplay=" + h + "&api=1"),
              this.core.s.vimeoPlayerParams &&
                (i = i + "&" + a.param(this.core.s.vimeoPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vimeo ' +
                c +
                '" width="560" height="315"  src="//player.vimeo.com/video/' +
                j.vimeo[1] +
                i +
                '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>');
          else if (j.dailymotion)
            (i = "?wmode=opaque&autoplay=" + h + "&api=postMessage"),
              this.core.s.dailymotionPlayerParams &&
                (i = i + "&" + a.param(this.core.s.dailymotionPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-dailymotion ' +
                c +
                '" width="560" height="315" src="//www.dailymotion.com/embed/video/' +
                j.dailymotion[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>');
          else if (j.html5) {
            var k = f.substring(0, 1);
            ("." !== k && "#" !== k) || (f = a(f).html()), (g = f);
          } else
            j.vk &&
              ((i = "&autoplay=" + h),
              this.core.s.vkPlayerParams &&
                (i = i + "&" + a.param(this.core.s.vkPlayerParams)),
              (g =
                '<iframe class="lg-video-object lg-vk ' +
                c +
                '" width="560" height="315" src="//vk.com/video_ext.php?' +
                j.vk[1] +
                i +
                '" frameborder="0" allowfullscreen></iframe>'));
          return g;
        }),
        (f.prototype.loadVideoOnclick = function (a) {
          var b = this;
          if (
            a.find(".lg-object").hasClass("lg-has-poster") &&
            a.find(".lg-object").is(":visible")
          )
            if (a.hasClass("lg-has-video")) {
              var c = a.find(".lg-youtube").get(0),
                d = a.find(".lg-vimeo").get(0),
                e = a.find(".lg-dailymotion").get(0),
                f = a.find(".lg-html5").get(0);
              if (c)
                c.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  "*"
                );
              else if (d)
                try {
                  $f(d).api("play");
                } catch (a) {
                  console.error("Make sure you have included froogaloop2 js");
                }
              else if (e) e.contentWindow.postMessage("play", "*");
              else if (f)
                if (b.core.s.videojs)
                  try {
                    videojs(f).play();
                  } catch (a) {
                    console.error("Make sure you have included videojs");
                  }
                else f.play();
              a.addClass("lg-video-playing");
            } else {
              a.addClass("lg-video-playing lg-has-video");
              var g,
                h,
                i = function (c, d) {
                  if (
                    (a
                      .find(".lg-video")
                      .append(b.loadVideo(c, "", !1, b.core.index, d)),
                    d)
                  )
                    if (b.core.s.videojs)
                      try {
                        videojs(
                          b.core.$slide
                            .eq(b.core.index)
                            .find(".lg-html5")
                            .get(0),
                          b.core.s.videojsOptions,
                          function () {
                            this.play();
                          }
                        );
                      } catch (a) {
                        console.error("Make sure you have included videojs");
                      }
                    else
                      b.core.$slide
                        .eq(b.core.index)
                        .find(".lg-html5")
                        .get(0)
                        .play();
                };
              b.core.s.dynamic
                ? ((g = b.core.s.dynamicEl[b.core.index].src),
                  (h = b.core.s.dynamicEl[b.core.index].html),
                  i(g, h))
                : ((g =
                    b.core.$items.eq(b.core.index).attr("href") ||
                    b.core.$items.eq(b.core.index).attr("data-src")),
                  (h = b.core.$items.eq(b.core.index).attr("data-html")),
                  i(g, h));
              var j = a.find(".lg-object");
              a.find(".lg-video").append(j),
                a.find(".lg-video-object").hasClass("lg-html5") ||
                  (a.removeClass("lg-complete"),
                  a
                    .find(".lg-video-object")
                    .on("load.lg error.lg", function () {
                      a.addClass("lg-complete");
                    }));
            }
        }),
        (f.prototype.destroy = function () {
          this.videoLoaded = !1;
        }),
        (a.fn.lightGallery.modules.video = f);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = function () {
          var a = !1,
            b = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
          return b && parseInt(b[2], 10) < 54 && (a = !0), a;
        },
        c = {
          scale: 1,
          zoom: !0,
          actualSize: !0,
          enableZoomAfter: 300,
          useLeftForZoom: b(),
        },
        d = function (b) {
          return (
            (this.core = a(b).data("lightGallery")),
            (this.core.s = a.extend({}, c, this.core.s)),
            this.core.s.zoom &&
              this.core.doCss() &&
              (this.init(),
              (this.zoomabletimeout = !1),
              (this.pageX = a(window).width() / 2),
              (this.pageY = a(window).height() / 2 + a(window).scrollTop())),
            this
          );
        };
      (d.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-zoom-in" class="lg-icon"></span><span id="lg-zoom-out" class="lg-icon"></span>';
        b.core.s.actualSize &&
          (c += '<span id="lg-actual-size" class="lg-icon"></span>'),
          b.core.s.useLeftForZoom
            ? b.core.$outer.addClass("lg-use-left-for-zoom")
            : b.core.$outer.addClass("lg-use-transition-for-zoom"),
          this.core.$outer.find(".lg-toolbar").append(c),
          b.core.$el.on("onSlideItemLoad.lg.tm.zoom", function (c, d, e) {
            var f = b.core.s.enableZoomAfter + e;
            a("body").hasClass("lg-from-hash") && e
              ? (f = 0)
              : a("body").removeClass("lg-from-hash"),
              (b.zoomabletimeout = setTimeout(function () {
                b.core.$slide.eq(d).addClass("lg-zoomable");
              }, f + 30));
          });
        var d = 1,
          e = function (c) {
            var d,
              e,
              f = b.core.$outer.find(".lg-current .lg-image"),
              g = (a(window).width() - f.prop("offsetWidth")) / 2,
              h =
                (a(window).height() - f.prop("offsetHeight")) / 2 +
                a(window).scrollTop();
            (d = b.pageX - g), (e = b.pageY - h);
            var i = (c - 1) * d,
              j = (c - 1) * e;
            f
              .css("transform", "scale3d(" + c + ", " + c + ", 1)")
              .attr("data-scale", c),
              b.core.s.useLeftForZoom
                ? f
                    .parent()
                    .css({ left: -i + "px", top: -j + "px" })
                    .attr("data-x", i)
                    .attr("data-y", j)
                : f
                    .parent()
                    .css(
                      "transform",
                      "translate3d(-" + i + "px, -" + j + "px, 0)"
                    )
                    .attr("data-x", i)
                    .attr("data-y", j);
          },
          f = function () {
            d > 1 ? b.core.$outer.addClass("lg-zoomed") : b.resetZoom(),
              d < 1 && (d = 1),
              e(d);
          },
          g = function (c, e, g, h) {
            var i,
              j = e.prop("offsetWidth");
            i = b.core.s.dynamic
              ? b.core.s.dynamicEl[g].width || e[0].naturalWidth || j
              : b.core.$items.eq(g).attr("data-width") ||
                e[0].naturalWidth ||
                j;
            var k;
            b.core.$outer.hasClass("lg-zoomed")
              ? (d = 1)
              : i > j && ((k = i / j), (d = k || 2)),
              h
                ? ((b.pageX = a(window).width() / 2),
                  (b.pageY = a(window).height() / 2 + a(window).scrollTop()))
                : ((b.pageX =
                    c.pageX || c.originalEvent.targetTouches[0].pageX),
                  (b.pageY =
                    c.pageY || c.originalEvent.targetTouches[0].pageY)),
              f(),
              setTimeout(function () {
                b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
              }, 10);
          },
          h = !1;
        b.core.$el.on("onAferAppendSlide.lg.tm.zoom", function (a, c) {
          var d = b.core.$slide.eq(c).find(".lg-image");
          d.on("dblclick", function (a) {
            g(a, d, c);
          }),
            d.on("touchstart", function (a) {
              h
                ? (clearTimeout(h), (h = null), g(a, d, c))
                : (h = setTimeout(function () {
                    h = null;
                  }, 300)),
                a.preventDefault();
            });
        }),
          a(window).on(
            "resize.lg.zoom scroll.lg.zoom orientationchange.lg.zoom",
            function () {
              (b.pageX = a(window).width() / 2),
                (b.pageY = a(window).height() / 2 + a(window).scrollTop()),
                e(d);
            }
          ),
          a("#lg-zoom-out").on("click.lg", function () {
            b.core.$outer.find(".lg-current .lg-image").length &&
              ((d -= b.core.s.scale), f());
          }),
          a("#lg-zoom-in").on("click.lg", function () {
            b.core.$outer.find(".lg-current .lg-image").length &&
              ((d += b.core.s.scale), f());
          }),
          a("#lg-actual-size").on("click.lg", function (a) {
            g(
              a,
              b.core.$slide.eq(b.core.index).find(".lg-image"),
              b.core.index,
              !0
            );
          }),
          b.core.$el.on("onBeforeSlide.lg.tm", function () {
            (d = 1), b.resetZoom();
          }),
          b.zoomDrag(),
          b.zoomSwipe();
      }),
        (d.prototype.resetZoom = function () {
          this.core.$outer.removeClass("lg-zoomed"),
            this.core.$slide
              .find(".lg-img-wrap")
              .removeAttr("style data-x data-y"),
            this.core.$slide.find(".lg-image").removeAttr("style data-scale"),
            (this.pageX = a(window).width() / 2),
            (this.pageY = a(window).height() / 2 + a(window).scrollTop());
        }),
        (d.prototype.zoomSwipe = function () {
          var a = this,
            b = {},
            c = {},
            d = !1,
            e = !1,
            f = !1;
          a.core.$slide.on("touchstart.lg", function (c) {
            if (a.core.$outer.hasClass("lg-zoomed")) {
              var d = a.core.$slide.eq(a.core.index).find(".lg-object");
              (f =
                d.prop("offsetHeight") * d.attr("data-scale") >
                a.core.$outer.find(".lg").height()),
                (e =
                  d.prop("offsetWidth") * d.attr("data-scale") >
                  a.core.$outer.find(".lg").width()),
                (e || f) &&
                  (c.preventDefault(),
                  (b = {
                    x: c.originalEvent.targetTouches[0].pageX,
                    y: c.originalEvent.targetTouches[0].pageY,
                  }));
            }
          }),
            a.core.$slide.on("touchmove.lg", function (g) {
              if (a.core.$outer.hasClass("lg-zoomed")) {
                var h,
                  i,
                  j = a.core.$slide.eq(a.core.index).find(".lg-img-wrap");
                g.preventDefault(),
                  (d = !0),
                  (c = {
                    x: g.originalEvent.targetTouches[0].pageX,
                    y: g.originalEvent.targetTouches[0].pageY,
                  }),
                  a.core.$outer.addClass("lg-zoom-dragging"),
                  (i = f
                    ? -Math.abs(j.attr("data-y")) + (c.y - b.y)
                    : -Math.abs(j.attr("data-y"))),
                  (h = e
                    ? -Math.abs(j.attr("data-x")) + (c.x - b.x)
                    : -Math.abs(j.attr("data-x"))),
                  (Math.abs(c.x - b.x) > 15 || Math.abs(c.y - b.y) > 15) &&
                    (a.core.s.useLeftForZoom
                      ? j.css({ left: h + "px", top: i + "px" })
                      : j.css(
                          "transform",
                          "translate3d(" + h + "px, " + i + "px, 0)"
                        ));
              }
            }),
            a.core.$slide.on("touchend.lg", function () {
              a.core.$outer.hasClass("lg-zoomed") &&
                d &&
                ((d = !1),
                a.core.$outer.removeClass("lg-zoom-dragging"),
                a.touchendZoom(b, c, e, f));
            });
        }),
        (d.prototype.zoomDrag = function () {
          var b = this,
            c = {},
            d = {},
            e = !1,
            f = !1,
            g = !1,
            h = !1;
          b.core.$slide.on("mousedown.lg.zoom", function (d) {
            var f = b.core.$slide.eq(b.core.index).find(".lg-object");
            (h =
              f.prop("offsetHeight") * f.attr("data-scale") >
              b.core.$outer.find(".lg").height()),
              (g =
                f.prop("offsetWidth") * f.attr("data-scale") >
                b.core.$outer.find(".lg").width()),
              b.core.$outer.hasClass("lg-zoomed") &&
                a(d.target).hasClass("lg-object") &&
                (g || h) &&
                (d.preventDefault(),
                (c = { x: d.pageX, y: d.pageY }),
                (e = !0),
                (b.core.$outer.scrollLeft += 1),
                (b.core.$outer.scrollLeft -= 1),
                b.core.$outer.removeClass("lg-grab").addClass("lg-grabbing"));
          }),
            a(window).on("mousemove.lg.zoom", function (a) {
              if (e) {
                var i,
                  j,
                  k = b.core.$slide.eq(b.core.index).find(".lg-img-wrap");
                (f = !0),
                  (d = { x: a.pageX, y: a.pageY }),
                  b.core.$outer.addClass("lg-zoom-dragging"),
                  (j = h
                    ? -Math.abs(k.attr("data-y")) + (d.y - c.y)
                    : -Math.abs(k.attr("data-y"))),
                  (i = g
                    ? -Math.abs(k.attr("data-x")) + (d.x - c.x)
                    : -Math.abs(k.attr("data-x"))),
                  b.core.s.useLeftForZoom
                    ? k.css({ left: i + "px", top: j + "px" })
                    : k.css(
                        "transform",
                        "translate3d(" + i + "px, " + j + "px, 0)"
                      );
              }
            }),
            a(window).on("mouseup.lg.zoom", function (a) {
              e &&
                ((e = !1),
                b.core.$outer.removeClass("lg-zoom-dragging"),
                !f ||
                  (c.x === d.x && c.y === d.y) ||
                  ((d = { x: a.pageX, y: a.pageY }),
                  b.touchendZoom(c, d, g, h)),
                (f = !1)),
                b.core.$outer.removeClass("lg-grabbing").addClass("lg-grab");
            });
        }),
        (d.prototype.touchendZoom = function (a, b, c, d) {
          var e = this,
            f = e.core.$slide.eq(e.core.index).find(".lg-img-wrap"),
            g = e.core.$slide.eq(e.core.index).find(".lg-object"),
            h = -Math.abs(f.attr("data-x")) + (b.x - a.x),
            i = -Math.abs(f.attr("data-y")) + (b.y - a.y),
            j =
              (e.core.$outer.find(".lg").height() - g.prop("offsetHeight")) / 2,
            k = Math.abs(
              g.prop("offsetHeight") * Math.abs(g.attr("data-scale")) -
                e.core.$outer.find(".lg").height() +
                j
            ),
            l = (e.core.$outer.find(".lg").width() - g.prop("offsetWidth")) / 2,
            m = Math.abs(
              g.prop("offsetWidth") * Math.abs(g.attr("data-scale")) -
                e.core.$outer.find(".lg").width() +
                l
            );
          (Math.abs(b.x - a.x) > 15 || Math.abs(b.y - a.y) > 15) &&
            (d && (i <= -k ? (i = -k) : i >= -j && (i = -j)),
            c && (h <= -m ? (h = -m) : h >= -l && (h = -l)),
            d
              ? f.attr("data-y", Math.abs(i))
              : (i = -Math.abs(f.attr("data-y"))),
            c
              ? f.attr("data-x", Math.abs(h))
              : (h = -Math.abs(f.attr("data-x"))),
            e.core.s.useLeftForZoom
              ? f.css({ left: h + "px", top: i + "px" })
              : f.css("transform", "translate3d(" + h + "px, " + i + "px, 0)"));
        }),
        (d.prototype.destroy = function () {
          var b = this;
          b.core.$el.off(".lg.zoom"),
            a(window).off(".lg.zoom"),
            b.core.$slide.off(".lg.zoom"),
            b.core.$el.off(".lg.tm.zoom"),
            b.resetZoom(),
            clearTimeout(b.zoomabletimeout),
            (b.zoomabletimeout = !1);
        }),
        (a.fn.lightGallery.modules.zoom = d);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = { hash: !0 },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.hash &&
              ((this.oldHash = window.location.hash), this.init()),
            this
          );
        };
      (c.prototype.init = function () {
        var b,
          c = this;
        c.core.$el.on("onAfterSlide.lg.tm", function (a, b, d) {
          history.replaceState
            ? history.replaceState(
                null,
                null,
                window.location.pathname +
                  window.location.search +
                  "#lg=" +
                  c.core.s.galleryId +
                  "&slide=" +
                  d
              )
            : (window.location.hash =
                "lg=" + c.core.s.galleryId + "&slide=" + d);
        }),
          a(window).on("hashchange.lg.hash", function () {
            b = window.location.hash;
            var a = parseInt(b.split("&slide=")[1], 10);
            b.indexOf("lg=" + c.core.s.galleryId) > -1
              ? c.core.slide(a, !1, !1)
              : c.core.lGalleryOn && c.core.destroy();
          });
      }),
        (c.prototype.destroy = function () {
          this.core.s.hash &&
            (this.oldHash &&
            this.oldHash.indexOf("lg=" + this.core.s.galleryId) < 0
              ? history.replaceState
                ? history.replaceState(null, null, this.oldHash)
                : (window.location.hash = this.oldHash)
              : history.replaceState
              ? history.replaceState(
                  null,
                  document.title,
                  window.location.pathname + window.location.search
                )
              : (window.location.hash = ""),
            this.core.$el.off(".lg.hash"));
        }),
        (a.fn.lightGallery.modules.hash = c);
    })();
  }),
  (function (a, b) {
    "function" == typeof define && define.amd
      ? define(["jquery"], function (a) {
          return b(a);
        })
      : "object" == typeof exports
      ? (module.exports = b(require("jquery")))
      : b(jQuery);
  })(0, function (a) {
    !(function () {
      "use strict";
      var b = {
          share: !0,
          facebook: !0,
          facebookDropdownText: "Facebook",
          twitter: !0,
          twitterDropdownText: "Twitter",
          googlePlus: !0,
          googlePlusDropdownText: "GooglePlus",
          pinterest: !0,
          pinterestDropdownText: "Pinterest",
        },
        c = function (c) {
          return (
            (this.core = a(c).data("lightGallery")),
            (this.core.s = a.extend({}, b, this.core.s)),
            this.core.s.share && this.init(),
            this
          );
        };
      (c.prototype.init = function () {
        var b = this,
          c =
            '<span id="lg-share" class="lg-icon"><ul class="lg-dropdown" style="position: absolute;">';
        (c += b.core.s.facebook
          ? '<li><a id="lg-share-facebook" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
            this.core.s.facebookDropdownText +
            "</span></a></li>"
          : ""),
          (c += b.core.s.twitter
            ? '<li><a id="lg-share-twitter" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.twitterDropdownText +
              "</span></a></li>"
            : ""),
          (c += b.core.s.googlePlus
            ? '<li><a id="lg-share-googleplus" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.googlePlusDropdownText +
              "</span></a></li>"
            : ""),
          (c += b.core.s.pinterest
            ? '<li><a id="lg-share-pinterest" target="_blank"><span class="lg-icon"></span><span class="lg-dropdown-text">' +
              this.core.s.pinterestDropdownText +
              "</span></a></li>"
            : ""),
          (c += "</ul></span>"),
          this.core.$outer.find(".lg-toolbar").append(c),
          this.core.$outer
            .find(".lg")
            .append('<div id="lg-dropdown-overlay"></div>'),
          a("#lg-share").on("click.lg", function () {
            b.core.$outer.toggleClass("lg-dropdown-active");
          }),
          a("#lg-dropdown-overlay").on("click.lg", function () {
            b.core.$outer.removeClass("lg-dropdown-active");
          }),
          b.core.$el.on("onAfterSlide.lg.tm", function (c, d, e) {
            setTimeout(function () {
              a("#lg-share-facebook").attr(
                "href",
                "https://www.facebook.com/sharer/sharer.php?u=" +
                  encodeURIComponent(
                    b.getSahreProps(e, "facebookShareUrl") ||
                      window.location.href
                  )
              ),
                a("#lg-share-twitter").attr(
                  "href",
                  "https://twitter.com/intent/tweet?text=" +
                    b.getSahreProps(e, "tweetText") +
                    "&url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "twitterShareUrl") ||
                        window.location.href
                    )
                ),
                a("#lg-share-googleplus").attr(
                  "href",
                  "https://plus.google.com/share?url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "googleplusShareUrl") ||
                        window.location.href
                    )
                ),
                a("#lg-share-pinterest").attr(
                  "href",
                  "https://www.pinterest.com/pin/create/button/?url=" +
                    encodeURIComponent(
                      b.getSahreProps(e, "pinterestShareUrl") ||
                        window.location.href
                    ) +
                    "&media=" +
                    encodeURIComponent(b.getSahreProps(e, "src")) +
                    "&description=" +
                    b.getSahreProps(e, "pinterestText")
                );
            }, 100);
          });
      }),
        (c.prototype.getSahreProps = function (a, b) {
          var c = "";
          if (this.core.s.dynamic) c = this.core.s.dynamicEl[a][b];
          else {
            var d = this.core.$items.eq(a).attr("href"),
              e = this.core.$items.eq(a).data(b);
            c = "src" === b ? d || e : e;
          }
          return c;
        }),
        (c.prototype.destroy = function () {}),
        (a.fn.lightGallery.modules.share = c);
    })();
  });
/*! lightslider - v1.1.6 - 2016-10-25
 * https://github.com/sachinchoolur/lightslider
 * Copyright (c) 2016 Sachin N; Licensed MIT */
!(function (a, b) {
  "use strict";
  var c = {
    item: 3,
    autoWidth: !1,
    slideMove: 1,
    slideMargin: 10,
    addClass: "",
    mode: "slide",
    useCSS: !0,
    cssEasing: "ease",
    easing: "linear",
    speed: 400,
    auto: !1,
    pauseOnHover: !1,
    loop: !1,
    slideEndAnimation: !0,
    pause: 2e3,
    keyPress: !1,
    controls: !0,
    prevHtml: "",
    nextHtml: "",
    rtl: !1,
    adaptiveHeight: !1,
    vertical: !1,
    verticalHeight: 500,
    vThumbWidth: 100,
    thumbItem: 10,
    pager: !0,
    gallery: !1,
    galleryMargin: 5,
    thumbMargin: 5,
    currentPagerPosition: "middle",
    enableTouch: !0,
    enableDrag: !0,
    freeMove: !0,
    swipeThreshold: 40,
    responsive: [],
    onBeforeStart: function (a) {},
    onSliderLoad: function (a) {},
    onBeforeSlide: function (a, b) {},
    onAfterSlide: function (a, b) {},
    onBeforeNextSlide: function (a, b) {},
    onBeforePrevSlide: function (a, b) {},
  };
  a.fn.lightSlider = function (b) {
    if (0 === this.length) return this;
    if (this.length > 1)
      return (
        this.each(function () {
          a(this).lightSlider(b);
        }),
        this
      );
    var d = {},
      e = a.extend(!0, {}, c, b),
      f = {},
      g = this;
    (d.$el = this), "fade" === e.mode && (e.vertical = !1);
    var h = g.children(),
      i = a(window).width(),
      j = null,
      k = null,
      l = 0,
      m = 0,
      n = !1,
      o = 0,
      p = "",
      q = 0,
      r = e.vertical === !0 ? "height" : "width",
      s = e.vertical === !0 ? "margin-bottom" : "margin-right",
      t = 0,
      u = 0,
      v = 0,
      w = 0,
      x = null,
      y = "ontouchstart" in document.documentElement,
      z = {};
    return (
      (z.chbreakpoint = function () {
        if (((i = a(window).width()), e.responsive.length)) {
          var b;
          if (
            (e.autoWidth === !1 && (b = e.item), i < e.responsive[0].breakpoint)
          )
            for (var c = 0; c < e.responsive.length; c++)
              i < e.responsive[c].breakpoint &&
                ((j = e.responsive[c].breakpoint), (k = e.responsive[c]));
          if ("undefined" != typeof k && null !== k)
            for (var d in k.settings)
              k.settings.hasOwnProperty(d) &&
                (("undefined" == typeof f[d] || null === f[d]) && (f[d] = e[d]),
                (e[d] = k.settings[d]));
          if (!a.isEmptyObject(f) && i > e.responsive[0].breakpoint)
            for (var g in f) f.hasOwnProperty(g) && (e[g] = f[g]);
          e.autoWidth === !1 &&
            t > 0 &&
            v > 0 &&
            b !== e.item &&
            (q = Math.round(t / ((v + e.slideMargin) * e.slideMove)));
        }
      }),
      (z.calSW = function () {
        e.autoWidth === !1 &&
          (v = (o - (e.item * e.slideMargin - e.slideMargin)) / e.item);
      }),
      (z.calWidth = function (a) {
        var b = a === !0 ? p.find(".lslide").length : h.length;
        if (e.autoWidth === !1) m = b * (v + e.slideMargin);
        else {
          m = 0;
          for (var c = 0; b > c; c++)
            m += parseInt(h.eq(c).width()) + e.slideMargin;
        }
        return m;
      }),
      (d = {
        doCss: function () {
          var a = function () {
            for (
              var a = [
                  "transition",
                  "MozTransition",
                  "WebkitTransition",
                  "OTransition",
                  "msTransition",
                  "KhtmlTransition",
                ],
                b = document.documentElement,
                c = 0;
              c < a.length;
              c++
            )
              if (a[c] in b.style) return !0;
          };
          return e.useCSS && a() ? !0 : !1;
        },
        keyPress: function () {
          e.keyPress &&
            a(document).on("keyup.lightslider", function (b) {
              a(":focus").is("input, textarea") ||
                (b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
                37 === b.keyCode
                  ? g.goToPrevSlide()
                  : 39 === b.keyCode && g.goToNextSlide());
            });
        },
        controls: function () {
          e.controls &&
            (g.after(
              '<div class="lSAction"><a class="lSPrev">' +
                e.prevHtml +
                '</a><a class="lSNext">' +
                e.nextHtml +
                "</a></div>"
            ),
            e.autoWidth
              ? z.calWidth(!1) < o && p.find(".lSAction").hide()
              : l <= e.item && p.find(".lSAction").hide(),
            p.find(".lSAction a").on("click", function (b) {
              return (
                b.preventDefault ? b.preventDefault() : (b.returnValue = !1),
                "lSPrev" === a(this).attr("class")
                  ? g.goToPrevSlide()
                  : g.goToNextSlide(),
                !1
              );
            }));
        },
        initialStyle: function () {
          var a = this;
          "fade" === e.mode && ((e.autoWidth = !1), (e.slideEndAnimation = !1)),
            e.auto && (e.slideEndAnimation = !1),
            e.autoWidth && ((e.slideMove = 1), (e.item = 1)),
            e.loop && ((e.slideMove = 1), (e.freeMove = !1)),
            e.onBeforeStart.call(this, g),
            z.chbreakpoint(),
            g
              .addClass("lightSlider")
              .wrap(
                '<div class="lSSlideOuter ' +
                  e.addClass +
                  '"><div class="lSSlideWrapper"></div></div>'
              ),
            (p = g.parent(".lSSlideWrapper")),
            e.rtl === !0 && p.parent().addClass("lSrtl"),
            e.vertical
              ? (p.parent().addClass("vertical"),
                (o = e.verticalHeight),
                p.css("height", o + "px"))
              : (o = g.outerWidth()),
            h.addClass("lslide"),
            e.loop === !0 &&
              "slide" === e.mode &&
              (z.calSW(),
              (z.clone = function () {
                if (z.calWidth(!0) > o) {
                  for (
                    var b = 0, c = 0, d = 0;
                    d < h.length &&
                    ((b +=
                      parseInt(g.find(".lslide").eq(d).width()) +
                      e.slideMargin),
                    c++,
                    !(b >= o + e.slideMargin));
                    d++
                  );
                  var f = e.autoWidth === !0 ? c : e.item;
                  if (f < g.find(".clone.left").length)
                    for (var i = 0; i < g.find(".clone.left").length - f; i++)
                      h.eq(i).remove();
                  if (f < g.find(".clone.right").length)
                    for (
                      var j = h.length - 1;
                      j > h.length - 1 - g.find(".clone.right").length;
                      j--
                    )
                      q--, h.eq(j).remove();
                  for (var k = g.find(".clone.right").length; f > k; k++)
                    g
                      .find(".lslide")
                      .eq(k)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone right")
                      .appendTo(g),
                      q++;
                  for (
                    var l =
                      g.find(".lslide").length - g.find(".clone.left").length;
                    l > g.find(".lslide").length - f;
                    l--
                  )
                    g.find(".lslide")
                      .eq(l - 1)
                      .clone()
                      .removeClass("lslide")
                      .addClass("clone left")
                      .prependTo(g);
                  h = g.children();
                } else
                  h.hasClass("clone") &&
                    (g.find(".clone").remove(), a.move(g, 0));
              }),
              z.clone()),
            (z.sSW = function () {
              (l = h.length),
                e.rtl === !0 && e.vertical === !1 && (s = "margin-left"),
                e.autoWidth === !1 && h.css(r, v + "px"),
                h.css(s, e.slideMargin + "px"),
                (m = z.calWidth(!1)),
                g.css(r, m + "px"),
                e.loop === !0 &&
                  "slide" === e.mode &&
                  n === !1 &&
                  (q = g.find(".clone.left").length);
            }),
            (z.calL = function () {
              (h = g.children()), (l = h.length);
            }),
            this.doCss() && p.addClass("usingCss"),
            z.calL(),
            "slide" === e.mode
              ? (z.calSW(),
                z.sSW(),
                e.loop === !0 && ((t = a.slideValue()), this.move(g, t)),
                e.vertical === !1 && this.setHeight(g, !1))
              : (this.setHeight(g, !0),
                g.addClass("lSFade"),
                this.doCss() || (h.fadeOut(0), h.eq(q).fadeIn(0))),
            e.loop === !0 && "slide" === e.mode
              ? h.eq(q).addClass("active")
              : h.first().addClass("active");
        },
        pager: function () {
          var a = this;
          if (
            ((z.createPager = function () {
              w =
                (o - (e.thumbItem * e.thumbMargin - e.thumbMargin)) /
                e.thumbItem;
              var b = p.find(".lslide"),
                c = p.find(".lslide").length,
                d = 0,
                f = "",
                h = 0;
              for (d = 0; c > d; d++) {
                "slide" === e.mode &&
                  (e.autoWidth
                    ? (h +=
                        (parseInt(b.eq(d).width()) + e.slideMargin) *
                        e.slideMove)
                    : (h = d * (v + e.slideMargin) * e.slideMove));
                var i = b.eq(d * e.slideMove).attr("data-thumb");
                if (
                  ((f +=
                    e.gallery === !0
                      ? '<li style="width:100%;' +
                        r +
                        ":" +
                        w +
                        "px;" +
                        s +
                        ":" +
                        e.thumbMargin +
                        'px"><a href="#"><img src="' +
                        i +
                        '" /></a></li>'
                      : '<li><a href="#">' + (d + 1) + "</a></li>"),
                  "slide" === e.mode && h >= m - o - e.slideMargin)
                ) {
                  d += 1;
                  var j = 2;
                  e.autoWidth &&
                    ((f += '<li><a href="#">' + (d + 1) + "</a></li>"),
                    (j = 1)),
                    j > d
                      ? ((f = null), p.parent().addClass("noPager"))
                      : p.parent().removeClass("noPager");
                  break;
                }
              }
              var k = p.parent();
              k.find(".lSPager").html(f),
                e.gallery === !0 &&
                  (e.vertical === !0 &&
                    k.find(".lSPager").css("width", e.vThumbWidth + "px"),
                  (u = d * (e.thumbMargin + w) + 0.5),
                  k
                    .find(".lSPager")
                    .css({
                      property: u + "px",
                      "transition-duration": e.speed + "ms",
                    }),
                  e.vertical === !0 &&
                    p
                      .parent()
                      .css(
                        "padding-right",
                        e.vThumbWidth + e.galleryMargin + "px"
                      ),
                  k.find(".lSPager").css(r, u + "px"));
              var l = k.find(".lSPager").find("li");
              l.first().addClass("active"),
                l.on("click", function () {
                  return (
                    e.loop === !0 && "slide" === e.mode
                      ? (q +=
                          l.index(this) -
                          k.find(".lSPager").find("li.active").index())
                      : (q = l.index(this)),
                    g.mode(!1),
                    e.gallery === !0 && a.slideThumb(),
                    !1
                  );
                });
            }),
            e.pager)
          ) {
            var b = "lSpg";
            e.gallery && (b = "lSGallery"),
              p.after('<ul class="lSPager ' + b + '"></ul>');
            var c = e.vertical ? "margin-left" : "margin-top";
            p
              .parent()
              .find(".lSPager")
              .css(c, e.galleryMargin + "px"),
              z.createPager();
          }
          setTimeout(function () {
            z.init();
          }, 0);
        },
        setHeight: function (a, b) {
          var c = null,
            d = this;
          c = e.loop ? a.children(".lslide ").first() : a.children().first();
          var f = function () {
            var d = c.outerHeight(),
              e = 0,
              f = d;
            b && ((d = 0), (e = (100 * f) / o)),
              a.css({ height: d + "px", "padding-bottom": e + "%" });
          };
          f(),
            c.find("img").length
              ? c.find("img")[0].complete
                ? (f(), x || d.auto())
                : c.find("img").on("load", function () {
                    setTimeout(function () {
                      f(), x || d.auto();
                    }, 100);
                  })
              : x || d.auto();
        },
        active: function (a, b) {
          this.doCss() && "fade" === e.mode && p.addClass("on");
          var c = 0;
          if (q * e.slideMove < l) {
            a.removeClass("active"),
              this.doCss() ||
                "fade" !== e.mode ||
                b !== !1 ||
                a.fadeOut(e.speed),
              (c = b === !0 ? q : q * e.slideMove);
            var d, f;
            b === !0 && ((d = a.length), (f = d - 1), c + 1 >= d && (c = f)),
              e.loop === !0 &&
                "slide" === e.mode &&
                ((c =
                  b === !0
                    ? q - g.find(".clone.left").length
                    : q * e.slideMove),
                b === !0 &&
                  ((d = a.length),
                  (f = d - 1),
                  c + 1 === d ? (c = f) : c + 1 > d && (c = 0))),
              this.doCss() ||
                "fade" !== e.mode ||
                b !== !1 ||
                a.eq(c).fadeIn(e.speed),
              a.eq(c).addClass("active");
          } else
            a.removeClass("active"),
              a.eq(a.length - 1).addClass("active"),
              this.doCss() ||
                "fade" !== e.mode ||
                b !== !1 ||
                (a.fadeOut(e.speed), a.eq(c).fadeIn(e.speed));
        },
        move: function (a, b) {
          e.rtl === !0 && (b = -b),
            this.doCss()
              ? a.css(
                  e.vertical === !0
                    ? {
                        transform: "translate3d(0px, " + -b + "px, 0px)",
                        "-webkit-transform":
                          "translate3d(0px, " + -b + "px, 0px)",
                      }
                    : {
                        transform: "translate3d(" + -b + "px, 0px, 0px)",
                        "-webkit-transform":
                          "translate3d(" + -b + "px, 0px, 0px)",
                      }
                )
              : e.vertical === !0
              ? a
                  .css("position", "relative")
                  .animate({ top: -b + "px" }, e.speed, e.easing)
              : a
                  .css("position", "relative")
                  .animate({ left: -b + "px" }, e.speed, e.easing);
          var c = p.parent().find(".lSPager").find("li");
          this.active(c, !0);
        },
        fade: function () {
          this.active(h, !1);
          var a = p.parent().find(".lSPager").find("li");
          this.active(a, !0);
        },
        slide: function () {
          var a = this;
          (z.calSlide = function () {
            m > o &&
              ((t = a.slideValue()),
              a.active(h, !1),
              t > m - o - e.slideMargin
                ? (t = m - o - e.slideMargin)
                : 0 > t && (t = 0),
              a.move(g, t),
              e.loop === !0 &&
                "slide" === e.mode &&
                (q >= l - g.find(".clone.left").length / e.slideMove &&
                  a.resetSlide(g.find(".clone.left").length),
                0 === q && a.resetSlide(p.find(".lslide").length)));
          }),
            z.calSlide();
        },
        resetSlide: function (a) {
          var b = this;
          p.find(".lSAction a").addClass("disabled"),
            setTimeout(function () {
              (q = a),
                p.css("transition-duration", "0ms"),
                (t = b.slideValue()),
                b.active(h, !1),
                d.move(g, t),
                setTimeout(function () {
                  p.css("transition-duration", e.speed + "ms"),
                    p.find(".lSAction a").removeClass("disabled");
                }, 50);
            }, e.speed + 100);
        },
        slideValue: function () {
          var a = 0;
          if (e.autoWidth === !1) a = q * (v + e.slideMargin) * e.slideMove;
          else {
            a = 0;
            for (var b = 0; q > b; b++)
              a += parseInt(h.eq(b).width()) + e.slideMargin;
          }
          return a;
        },
        slideThumb: function () {
          var a;
          switch (e.currentPagerPosition) {
            case "left":
              a = 0;
              break;
            case "middle":
              a = o / 2 - w / 2;
              break;
            case "right":
              a = o - w;
          }
          var b = q - g.find(".clone.left").length,
            c = p.parent().find(".lSPager");
          "slide" === e.mode &&
            e.loop === !0 &&
            (b >= c.children().length
              ? (b = 0)
              : 0 > b && (b = c.children().length));
          var d = b * (w + e.thumbMargin) - a;
          d + o > u && (d = u - o - e.thumbMargin),
            0 > d && (d = 0),
            this.move(c, d);
        },
        auto: function () {
          e.auto &&
            (clearInterval(x),
            (x = setInterval(function () {
              g.goToNextSlide();
            }, e.pause)));
        },
        pauseOnHover: function () {
          var b = this;
          e.auto &&
            e.pauseOnHover &&
            (p.on("mouseenter", function () {
              a(this).addClass("ls-hover"), g.pause(), (e.auto = !0);
            }),
            p.on("mouseleave", function () {
              a(this).removeClass("ls-hover"),
                p.find(".lightSlider").hasClass("lsGrabbing") || b.auto();
            }));
        },
        touchMove: function (a, b) {
          if ((p.css("transition-duration", "0ms"), "slide" === e.mode)) {
            var c = a - b,
              d = t - c;
            if (d >= m - o - e.slideMargin)
              if (e.freeMove === !1) d = m - o - e.slideMargin;
              else {
                var f = m - o - e.slideMargin;
                d = f + (d - f) / 5;
              }
            else 0 > d && (e.freeMove === !1 ? (d = 0) : (d /= 5));
            this.move(g, d);
          }
        },
        touchEnd: function (a) {
          if (
            (p.css("transition-duration", e.speed + "ms"), "slide" === e.mode)
          ) {
            var b = !1,
              c = !0;
            (t -= a),
              t > m - o - e.slideMargin
                ? ((t = m - o - e.slideMargin), e.autoWidth === !1 && (b = !0))
                : 0 > t && (t = 0);
            var d = function (a) {
              var c = 0;
              if ((b || (a && (c = 1)), e.autoWidth))
                for (
                  var d = 0, f = 0;
                  f < h.length &&
                  ((d += parseInt(h.eq(f).width()) + e.slideMargin),
                  (q = f + c),
                  !(d >= t));
                  f++
                );
              else {
                var g = t / ((v + e.slideMargin) * e.slideMove);
                (q = parseInt(g) + c),
                  t >= m - o - e.slideMargin && g % 1 !== 0 && q++;
              }
            };
            a >= e.swipeThreshold
              ? (d(!1), (c = !1))
              : a <= -e.swipeThreshold && (d(!0), (c = !1)),
              g.mode(c),
              this.slideThumb();
          } else
            a >= e.swipeThreshold
              ? g.goToPrevSlide()
              : a <= -e.swipeThreshold && g.goToNextSlide();
        },
        enableDrag: function () {
          var b = this;
          if (!y) {
            var c = 0,
              d = 0,
              f = !1;
            p.find(".lightSlider").addClass("lsGrab"),
              p.on("mousedown", function (b) {
                return o > m && 0 !== m
                  ? !1
                  : void (
                      "lSPrev" !== a(b.target).attr("class") &&
                      "lSNext" !== a(b.target).attr("class") &&
                      ((c = e.vertical === !0 ? b.pageY : b.pageX),
                      (f = !0),
                      b.preventDefault
                        ? b.preventDefault()
                        : (b.returnValue = !1),
                      (p.scrollLeft += 1),
                      (p.scrollLeft -= 1),
                      p
                        .find(".lightSlider")
                        .removeClass("lsGrab")
                        .addClass("lsGrabbing"),
                      clearInterval(x))
                    );
              }),
              a(window).on("mousemove", function (a) {
                f &&
                  ((d = e.vertical === !0 ? a.pageY : a.pageX),
                  b.touchMove(d, c));
              }),
              a(window).on("mouseup", function (g) {
                if (f) {
                  p
                    .find(".lightSlider")
                    .removeClass("lsGrabbing")
                    .addClass("lsGrab"),
                    (f = !1),
                    (d = e.vertical === !0 ? g.pageY : g.pageX);
                  var h = d - c;
                  Math.abs(h) >= e.swipeThreshold &&
                    a(window).on("click.ls", function (b) {
                      b.preventDefault
                        ? b.preventDefault()
                        : (b.returnValue = !1),
                        b.stopImmediatePropagation(),
                        b.stopPropagation(),
                        a(window).off("click.ls");
                    }),
                    b.touchEnd(h);
                }
              });
          }
        },
        enableTouch: function () {
          var a = this;
          if (y) {
            var b = {},
              c = {};
            p.on("touchstart", function (a) {
              (c = a.originalEvent.targetTouches[0]),
                (b.pageX = a.originalEvent.targetTouches[0].pageX),
                (b.pageY = a.originalEvent.targetTouches[0].pageY),
                clearInterval(x);
            }),
              p.on("touchmove", function (d) {
                if (o > m && 0 !== m) return !1;
                var f = d.originalEvent;
                c = f.targetTouches[0];
                var g = Math.abs(c.pageX - b.pageX),
                  h = Math.abs(c.pageY - b.pageY);
                e.vertical === !0
                  ? (3 * h > g && d.preventDefault(),
                    a.touchMove(c.pageY, b.pageY))
                  : (3 * g > h && d.preventDefault(),
                    a.touchMove(c.pageX, b.pageX));
              }),
              p.on("touchend", function () {
                if (o > m && 0 !== m) return !1;
                var d;
                (d = e.vertical === !0 ? c.pageY - b.pageY : c.pageX - b.pageX),
                  a.touchEnd(d);
              });
          }
        },
        build: function () {
          var b = this;
          b.initialStyle(),
            this.doCss() &&
              (e.enableTouch === !0 && b.enableTouch(),
              e.enableDrag === !0 && b.enableDrag()),
            a(window).on("focus", function () {
              b.auto();
            }),
            a(window).on("blur", function () {
              clearInterval(x);
            }),
            b.pager(),
            b.pauseOnHover(),
            b.controls(),
            b.keyPress();
        },
      }),
      d.build(),
      (z.init = function () {
        z.chbreakpoint(),
          e.vertical === !0
            ? ((o = e.item > 1 ? e.verticalHeight : h.outerHeight()),
              p.css("height", o + "px"))
            : (o = p.outerWidth()),
          e.loop === !0 && "slide" === e.mode && z.clone(),
          z.calL(),
          "slide" === e.mode && g.removeClass("lSSlide"),
          "slide" === e.mode && (z.calSW(), z.sSW()),
          setTimeout(function () {
            "slide" === e.mode && g.addClass("lSSlide");
          }, 1e3),
          e.pager && z.createPager(),
          e.adaptiveHeight === !0 &&
            e.vertical === !1 &&
            g.css("height", h.eq(q).outerHeight(!0)),
          e.adaptiveHeight === !1 &&
            ("slide" === e.mode
              ? e.vertical === !1
                ? d.setHeight(g, !1)
                : d.auto()
              : d.setHeight(g, !0)),
          e.gallery === !0 && d.slideThumb(),
          "slide" === e.mode && d.slide(),
          e.autoWidth === !1
            ? h.length <= e.item
              ? p.find(".lSAction").hide()
              : p.find(".lSAction").show()
            : z.calWidth(!1) < o && 0 !== m
            ? p.find(".lSAction").hide()
            : p.find(".lSAction").show();
      }),
      (g.goToPrevSlide = function () {
        if (q > 0)
          e.onBeforePrevSlide.call(this, g, q),
            q--,
            g.mode(!1),
            e.gallery === !0 && d.slideThumb();
        else if (e.loop === !0) {
          if ((e.onBeforePrevSlide.call(this, g, q), "fade" === e.mode)) {
            var a = l - 1;
            q = parseInt(a / e.slideMove);
          }
          g.mode(!1), e.gallery === !0 && d.slideThumb();
        } else
          e.slideEndAnimation === !0 &&
            (g.addClass("leftEnd"),
            setTimeout(function () {
              g.removeClass("leftEnd");
            }, 400));
      }),
      (g.goToNextSlide = function () {
        var a = !0;
        if ("slide" === e.mode) {
          var b = d.slideValue();
          a = b < m - o - e.slideMargin;
        }
        q * e.slideMove < l - e.slideMove && a
          ? (e.onBeforeNextSlide.call(this, g, q),
            q++,
            g.mode(!1),
            e.gallery === !0 && d.slideThumb())
          : e.loop === !0
          ? (e.onBeforeNextSlide.call(this, g, q),
            (q = 0),
            g.mode(!1),
            e.gallery === !0 && d.slideThumb())
          : e.slideEndAnimation === !0 &&
            (g.addClass("rightEnd"),
            setTimeout(function () {
              g.removeClass("rightEnd");
            }, 400));
      }),
      (g.mode = function (a) {
        e.adaptiveHeight === !0 &&
          e.vertical === !1 &&
          g.css("height", h.eq(q).outerHeight(!0)),
          n === !1 &&
            ("slide" === e.mode
              ? d.doCss() &&
                (g.addClass("lSSlide"),
                "" !== e.speed && p.css("transition-duration", e.speed + "ms"),
                "" !== e.cssEasing &&
                  p.css("transition-timing-function", e.cssEasing))
              : d.doCss() &&
                ("" !== e.speed && g.css("transition-duration", e.speed + "ms"),
                "" !== e.cssEasing &&
                  g.css("transition-timing-function", e.cssEasing))),
          a || e.onBeforeSlide.call(this, g, q),
          "slide" === e.mode ? d.slide() : d.fade(),
          p.hasClass("ls-hover") || d.auto(),
          setTimeout(function () {
            a || e.onAfterSlide.call(this, g, q);
          }, e.speed),
          (n = !0);
      }),
      (g.play = function () {
        g.goToNextSlide(), (e.auto = !0), d.auto();
      }),
      (g.pause = function () {
        (e.auto = !1), clearInterval(x);
      }),
      (g.refresh = function () {
        z.init();
      }),
      (g.getCurrentSlideCount = function () {
        var a = q;
        if (e.loop) {
          var b = p.find(".lslide").length,
            c = g.find(".clone.left").length;
          a = c - 1 >= q ? b + (q - c) : q >= b + c ? q - b - c : q - c;
        }
        return a + 1;
      }),
      (g.getTotalSlideCount = function () {
        return p.find(".lslide").length;
      }),
      (g.goToSlide = function (a) {
        (q = e.loop ? a + g.find(".clone.left").length - 1 : a),
          g.mode(!1),
          e.gallery === !0 && d.slideThumb();
      }),
      (g.destroy = function () {
        g.lightSlider &&
          ((g.goToPrevSlide = function () {}),
          (g.goToNextSlide = function () {}),
          (g.mode = function () {}),
          (g.play = function () {}),
          (g.pause = function () {}),
          (g.refresh = function () {}),
          (g.getCurrentSlideCount = function () {}),
          (g.getTotalSlideCount = function () {}),
          (g.goToSlide = function () {}),
          (g.lightSlider = null),
          (z = { init: function () {} }),
          g.parent().parent().find(".lSAction, .lSPager").remove(),
          g
            .removeClass(
              "lightSlider lSFade lSSlide lsGrab lsGrabbing leftEnd right"
            )
            .removeAttr("style")
            .unwrap()
            .unwrap(),
          g.children().removeAttr("style"),
          h.removeClass("lslide active"),
          g.find(".clone").remove(),
          (h = null),
          (x = null),
          (n = !1),
          (q = 0));
      }),
      setTimeout(function () {
        e.onSliderLoad.call(this, g);
      }, 10),
      a(window).on("resize orientationchange", function (a) {
        setTimeout(function () {
          a.preventDefault ? a.preventDefault() : (a.returnValue = !1),
            z.init();
        }, 200);
      }),
      this
    );
  };
})(jQuery);

$(document).ready(function () {
  $("#imageGallery").lightSlider({
    gallery: true,
    item: 1,
    loop: true,
    thumbItem: 4,
    slideMargin: 0,
    auto: true,
    pauseOnHover: true,
    enableDrag: false,
    thumbMargin: 5,
    currentPagerPosition: "left",
    onSliderLoad: function (el) {
      el.lightGallery({
        selector: "#imageGallery .lslide",
        download: false,
        share: false,
      });
    },
  });
});

var ps = new PerfectScrollbar("#bio-content");
