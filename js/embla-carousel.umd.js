!(function (n, t) {
    'object' == typeof exports && 'undefined' != typeof module
        ? (module.exports = t())
        : 'function' == typeof define && define.amd
        ? define(t)
        : ((n = 'undefined' != typeof globalThis ? globalThis : n || self).EmblaCarousel = t());
})(this, function () {
    'use strict';
    function n(n) {
        return 'number' == typeof n;
    }
    function t(n) {
        return '[object Object]' === Object.prototype.toString.call(n);
    }
    function e(n) {
        return (
            t(n) ||
            (function (n) {
                return Array.isArray(n);
            })(n)
        );
    }
    function r(n) {
        return Math.abs(n);
    }
    function o(n) {
        return n ? n / r(n) : 0;
    }
    function i(n, t) {
        return r(n - t);
    }
    function u(n) {
        return s(n).map(Number);
    }
    function c(n) {
        return n[a(n)];
    }
    function a(n) {
        return Math.max(0, n.length - 1);
    }
    function s(n) {
        return Object.keys(n);
    }
    function f(n, e) {
        return [n, e].reduce(function (n, e) {
            return (
                s(e).forEach(function (r) {
                    var o = n[r],
                        i = e[r],
                        u = t(o) && t(i);
                    n[r] = u ? f(o, i) : i;
                }),
                n
            );
        }, {});
    }
    function d(n, t) {
        var r = s(n),
            o = s(t);
        return (
            r.length === o.length &&
            r.every(function (r) {
                var o = n[r],
                    i = t[r];
                return 'function' == typeof o ? ''.concat(o) === ''.concat(i) : e(o) && e(i) ? d(o, i) : o === i;
            })
        );
    }
    function l(t, e) {
        var r = {
            start: function () {
                return 0;
            },
            center: function (n) {
                return o(n) / 2;
            },
            end: o,
        };
        function o(n) {
            return e - n;
        }
        return {
            measure: function (o) {
                return n(t) ? e * Number(t) : r[t](o);
            },
        };
    }
    function p(n, t) {
        var e = r(n - t);
        function o(t) {
            return t < n;
        }
        function i(n) {
            return n > t;
        }
        function u(n) {
            return o(n) || i(n);
        }
        return {
            length: e,
            max: t,
            min: n,
            constrain: function (e) {
                return u(e) ? (o(e) ? n : t) : e;
            },
            reachedAny: u,
            reachedMax: i,
            reachedMin: o,
            removeOffset: function (n) {
                return e ? n - e * Math.ceil((n - t) / e) : n;
            },
        };
    }
    function v(n, t, e) {
        var o = p(0, n),
            i = o.min,
            u = o.constrain,
            c = n + 1,
            a = s(t);
        function s(n) {
            return e ? r((c + n) % c) : u(n);
        }
        function f() {
            return a;
        }
        function d(n) {
            return (a = s(n)), l;
        }
        var l = {
            add: function (n) {
                return d(f() + n);
            },
            clone: function () {
                return v(n, f(), e);
            },
            get: f,
            set: d,
            min: i,
            max: n,
        };
        return l;
    }
    function m() {
        var n = [];
        var t = {
            add: function (e, r, o, i) {
                return (
                    void 0 === i && (i = { passive: !0 }),
                    e.addEventListener(r, o, i),
                    n.push(function () {
                        return e.removeEventListener(r, o, i);
                    }),
                    t
                );
            },
            removeAll: function () {
                return (
                    (n = n.filter(function (n) {
                        return n();
                    })),
                    t
                );
            },
        };
        return t;
    }
    function g(t) {
        var e = t;
        function r(n) {
            return (e /= n), i;
        }
        function o(t) {
            return n(t) ? t : t.get();
        }
        var i = {
            add: function (n) {
                return (e += o(n)), i;
            },
            divide: r,
            get: function () {
                return e;
            },
            multiply: function (n) {
                return (e *= n), i;
            },
            normalize: function () {
                return 0 !== e && r(e), i;
            },
            set: function (n) {
                return (e = o(n)), i;
            },
            subtract: function (n) {
                return (e -= o(n)), i;
            },
        };
        return i;
    }
    function x(n, t, e, u, c, a, s, f, d, l, p, v, x, h, y, S) {
        var b = n.cross,
            E = ['INPUT', 'SELECT', 'TEXTAREA'],
            w = { passive: !1 },
            A = g(0),
            M = m(),
            T = m(),
            O = x.measure(20),
            P = { mouse: 300, touch: 400 },
            B = { mouse: 500, touch: 600 },
            k = y ? 5 : 16,
            I = 0,
            z = 0,
            D = !1,
            L = !1,
            N = !1,
            C = !1;
        function V(n) {
            if (!(((C = !c.isTouchEvent(n)) && 0 !== n.button) || ((t = n.target), (r = t.nodeName || ''), E.indexOf(r) > -1))) {
                var t,
                    r,
                    o = i(u.get(), a.get()) >= 2,
                    s = C || !o;
                (D = !0),
                    c.pointerDown(n),
                    A.set(u),
                    u.set(a),
                    d.useBaseMass().useSpeed(80),
                    (function () {
                        var n = C ? document : e;
                        T.add(n, 'touchmove', H, w).add(n, 'touchend', R).add(n, 'mousemove', H, w).add(n, 'mouseup', R);
                    })(),
                    (I = c.readPoint(n)),
                    (z = c.readPoint(n, b)),
                    v.emit('pointerDown'),
                    s && (N = !1);
            }
        }
        function H(n) {
            if (!L && !C) {
                if (!n.cancelable) return R(n);
                var e = c.readPoint(n),
                    r = c.readPoint(n, b),
                    o = i(e, I),
                    a = i(r, z);
                if (!(L = o > a) && !N) return R(n);
            }
            var f = c.pointerMove(n);
            !N && f && (N = !0), s.start(), u.add(t.apply(f)), n.preventDefault();
        }
        function R(n) {
            var e = l.byDistance(0, !1).index !== p.get(),
                a = c.pointerUp(n) * (y ? B : P)[C ? 'mouse' : 'touch'],
                s = (function (n, t) {
                    var e = p.clone().add(-1 * o(n)),
                        i = e.get() === p.min || e.get() === p.max,
                        u = l.byDistance(n, !y).distance;
                    return y || r(n) < O ? u : !h && i ? 0.4 * u : S && t ? 0.5 * u : l.byIndex(e.get(), 0).distance;
                })(t.apply(a), e),
                m = (function (n, t) {
                    if (0 === n || 0 === t) return 0;
                    if (r(n) <= r(t)) return 0;
                    var e = i(r(n), r(t));
                    return r(e / n);
                })(a, s),
                g = i(u.get(), A.get()) >= 0.5,
                x = e && m > 0.75,
                b = r(a) < O,
                E = x ? 10 : k,
                w = x ? 1 + 2.5 * m : 1;
            g && !C && (N = !0), (L = !1), (D = !1), T.removeAll(), d.useSpeed(b ? 9 : E).useMass(w), f.distance(s, !y), (C = !1), v.emit('pointerUp');
        }
        function j(n) {
            N && (n.stopPropagation(), n.preventDefault());
        }
        return {
            addActivationEvents: function () {
                var n = e;
                M.add(
                    n,
                    'dragstart',
                    function (n) {
                        return n.preventDefault();
                    },
                    w
                )
                    .add(n, 'touchmove', function () {}, w)
                    .add(n, 'touchend', function () {})
                    .add(n, 'touchstart', V)
                    .add(n, 'mousedown', V)
                    .add(n, 'touchcancel', R)
                    .add(n, 'contextmenu', R)
                    .add(n, 'click', j, !0);
            },
            clickAllowed: function () {
                return !N;
            },
            pointerDown: function () {
                return D;
            },
            removeAllEvents: function () {
                M.removeAll(), T.removeAll();
            },
        };
    }
    function h(n, t, e) {
        var r,
            i,
            u =
                ((r = 2),
                (i = Math.pow(10, r)),
                function (n) {
                    return Math.round(n * i) / i;
                }),
            c = g(0),
            a = g(0),
            s = g(0),
            f = 0,
            d = t,
            l = e;
        function p(n) {
            return (d = n), m;
        }
        function v(n) {
            return (l = n), m;
        }
        var m = {
            direction: function () {
                return f;
            },
            seek: function (t) {
                s.set(t).subtract(n);
                var e,
                    r,
                    i,
                    u,
                    p = ((e = s.get()), (i = 0) + ((e - (r = 0)) / (100 - r)) * (d - i));
                return (f = o(s.get())), s.normalize().multiply(p).subtract(c), (u = s).divide(l), a.add(u), m;
            },
            settle: function (t) {
                var e = t.get() - n.get(),
                    r = !u(e);
                return r && n.set(t), r;
            },
            update: function () {
                c.add(a), n.add(c), a.multiply(0);
            },
            useBaseMass: function () {
                return v(e);
            },
            useBaseSpeed: function () {
                return p(t);
            },
            useMass: v,
            useSpeed: p,
        };
        return m;
    }
    function y(n, t, e, o, i) {
        var u = i.measure(10),
            c = i.measure(50),
            a = !1;
        return {
            constrain: function (i) {
                if (!a && n.reachedAny(e.get()) && n.reachedAny(t.get())) {
                    var s = n.reachedMin(t.get()) ? 'min' : 'max',
                        f = r(n[s] - t.get()),
                        d = e.get() - t.get(),
                        l = Math.min(f / c, 0.85);
                    e.subtract(d * l), !i && r(d) < u && (e.set(n.constrain(e.get())), o.useSpeed(10).useMass(3));
                }
            },
            toggleActive: function (n) {
                a = !n;
            },
        };
    }
    function S(n, t, e, r) {
        var o = p(-t + n, e[0]),
            i = e.map(o.constrain);
        return {
            snapsContained: (function () {
                if (t <= n) return [o.max];
                if ('keepSnaps' === r) return i;
                var e = (function () {
                        var n = i[0],
                            t = c(i),
                            e = i.lastIndexOf(n),
                            r = i.indexOf(t) + 1;
                        return p(e, r);
                    })(),
                    u = e.min,
                    a = e.max;
                return i.slice(u, a);
            })(),
        };
    }
    function b(n, t, e, r) {
        var o = p(t.min + 0.1, t.max + 0.1),
            i = o.reachedMin,
            u = o.reachedMax;
        return {
            loop: function (t) {
                if (
                    (function (n) {
                        return 1 === n ? u(e.get()) : -1 === n && i(e.get());
                    })(t)
                ) {
                    var o = n * (-1 * t);
                    r.forEach(function (n) {
                        return n.add(o);
                    });
                }
            },
        };
    }
    function E(n) {
        var t = n.max,
            e = n.length;
        return {
            get: function (n) {
                return (n - t) / -e;
            },
        };
    }
    function w(n, t, e, i, u) {
        var c = i.reachedAny,
            a = i.removeOffset,
            s = i.constrain;
        function f(n) {
            return n.concat().sort(function (n, t) {
                return r(n) - r(t);
            })[0];
        }
        function d(t, r) {
            var i = [t, t + e, t - e];
            return n
                ? f(
                      r
                          ? i.filter(function (n) {
                                return o(n) === r;
                            })
                          : i
                  )
                : i[0];
        }
        return {
            byDistance: function (e, o) {
                var i = u.get() + e,
                    f = (function (e) {
                        var o = n ? a(e) : s(e);
                        return {
                            index: t
                                .map(function (n) {
                                    return n - o;
                                })
                                .map(function (n) {
                                    return d(n, 0);
                                })
                                .map(function (n, t) {
                                    return { diff: n, index: t };
                                })
                                .sort(function (n, t) {
                                    return r(n.diff) - r(t.diff);
                                })[0].index,
                            distance: o,
                        };
                    })(i),
                    l = f.index,
                    p = f.distance,
                    v = !n && c(i);
                return !o || v ? { index: l, distance: e } : { index: l, distance: e + d(t[l] - p, 0) };
            },
            byIndex: function (n, e) {
                return { index: n, distance: d(t[n] - u.get(), e) };
            },
            shortcut: d,
        };
    }
    function A(n, t, e) {
        var r =
                'x' === n.scroll
                    ? function (n) {
                          return 'translate3d('.concat(n, 'px,0px,0px)');
                      }
                    : function (n) {
                          return 'translate3d(0px,'.concat(n, 'px,0px)');
                      },
            o = e.style,
            i = !1;
        return {
            clear: function () {
                i || ((o.transform = ''), e.getAttribute('style') || e.removeAttribute('style'));
            },
            to: function (n) {
                i || (o.transform = r(t.apply(n.get())));
            },
            toggleActive: function (n) {
                i = !n;
            },
        };
    }
    function M(n, t, e, r, o, i, c, a, s) {
        var f,
            d = u(o),
            l = u(o).reverse(),
            p = ((f = i[0] - 1), x(m(l, f), 'end')).concat(
                (function () {
                    var n = e - i[0] - 1;
                    return x(m(d, n), 'start');
                })()
            );
        function v(n, t) {
            return n.reduce(function (n, t) {
                return n - o[t];
            }, t);
        }
        function m(n, t) {
            return n.reduce(function (n, e) {
                return v(n, t) > 0 ? n.concat([e]) : n;
            }, []);
        }
        function x(e, o) {
            var i = 'start' === o,
                u = i ? -r : r,
                f = c.findSlideBounds([u]);
            return e.map(function (e) {
                var o = i ? 0 : -r,
                    u = i ? r : 0,
                    c = f.filter(function (n) {
                        return n.index === e;
                    })[0][i ? 'end' : 'start'],
                    d = g(-1),
                    l = g(-1),
                    p = A(n, t, s[e]);
                return {
                    index: e,
                    location: l,
                    translate: p,
                    target: function () {
                        return d.set(a.get() > c ? o : u);
                    },
                };
            });
        }
        return {
            canLoop: function () {
                return p.every(function (n) {
                    var t = n.index;
                    return (
                        v(
                            d.filter(function (n) {
                                return n !== t;
                            }),
                            e
                        ) <= 0.1
                    );
                });
            },
            clear: function () {
                p.forEach(function (n) {
                    return n.translate.clear();
                });
            },
            loop: function () {
                p.forEach(function (n) {
                    var t = n.target,
                        e = n.translate,
                        r = n.location,
                        o = t();
                    o.get() !== r.get() && (0 === o.get() ? e.clear() : e.to(o), r.set(o));
                });
            },
            loopPoints: p,
        };
    }
    function T(n, t, e, r, o, i, u) {
        var c = o.removeOffset,
            a = o.constrain,
            s = i ? [0, t, -t] : [0],
            f = d(s, u);
        function d(t, o) {
            var i = t || s,
                u = (function (n) {
                    var t = n || 0;
                    return e.map(function (n) {
                        return p(0.5, n - 0.5).constrain(n * t);
                    });
                })(o);
            return i.reduce(function (t, o) {
                var i = r.map(function (t, r) {
                    return {
                        start: t - e[r] + u[r] + o,
                        end: t + n - u[r] + o,
                        index: r,
                    };
                });
                return t.concat(i);
            }, []);
        }
        return {
            check: function (n, t) {
                var e = i ? c(n) : a(n);
                return (t || f).reduce(function (n, t) {
                    var r = t.index,
                        o = t.start,
                        i = t.end;
                    return !(-1 !== n.indexOf(r)) && o < e && i > e ? n.concat([r]) : n;
                }, []);
            },
            findSlideBounds: d,
        };
    }
    function O(t, e, r) {
        var o = n(r);
        return {
            groupSlides: function (n) {
                return o
                    ? (function (n, t) {
                          return u(n)
                              .filter(function (n) {
                                  return n % t == 0;
                              })
                              .map(function (e) {
                                  return n.slice(e, e + t);
                              });
                      })(n, r)
                    : (function (n) {
                          return u(n)
                              .reduce(function (n, r) {
                                  var o = e.slice(c(n), r + 1).reduce(function (n, t) {
                                      return n + t;
                                  }, 0);
                                  return !r || o > t ? n.concat(r) : n;
                              }, [])
                              .map(function (t, e, r) {
                                  return n.slice(t, r[e + 1]);
                              });
                      })(n);
            },
        };
    }
    function P(n, t, e, o, i) {
        var s = o.align,
            f = o.axis,
            d = o.direction,
            P = o.startIndex,
            B = o.inViewThreshold,
            k = o.loop,
            I = o.speed,
            z = o.dragFree,
            D = o.slidesToScroll,
            L = o.skipSnaps,
            N = o.containScroll,
            C = t.getBoundingClientRect(),
            V = e.map(function (n) {
                return n.getBoundingClientRect();
            }),
            H = (function (n) {
                var t = 'rtl' === n ? -1 : 1;
                return {
                    apply: function (n) {
                        return n * t;
                    },
                };
            })(d),
            R = (function (n, t) {
                var e = 'y' === n ? 'y' : 'x';
                return {
                    scroll: e,
                    cross: 'y' === n ? 'x' : 'y',
                    startEdge: 'y' === e ? 'top' : 'rtl' === t ? 'right' : 'left',
                    endEdge: 'y' === e ? 'bottom' : 'rtl' === t ? 'left' : 'right',
                    measureSize: function (n) {
                        var t = n.width,
                            r = n.height;
                        return 'x' === e ? t : r;
                    },
                };
            })(f, d),
            j = R.measureSize(C),
            F = (function (n) {
                return {
                    measure: function (t) {
                        return n * (t / 100);
                    },
                };
            })(j),
            q = l(s, j),
            U = !k && '' !== N,
            G = (function (n, t, e, o, i) {
                var u = n.measureSize,
                    s = n.startEdge,
                    f = n.endEdge,
                    d = e[0] && i,
                    l = (function () {
                        if (!d) return 0;
                        var n = e[0];
                        return r(t[s] - n[s]);
                    })(),
                    p = (function () {
                        if (!d) return 0;
                        var n = window.getComputedStyle(c(o));
                        return parseFloat(n.getPropertyValue('margin-'.concat(f)));
                    })(),
                    v = e.map(u),
                    m = e
                        .map(function (n, t, e) {
                            var r = !t,
                                o = t === a(e);
                            return r ? v[t] + l : o ? v[t] + p : e[t + 1][s] - n[s];
                        })
                        .map(r);
                return { slideSizes: v, slideSizesWithGaps: m };
            })(R, C, V, e, k || '' !== N),
            J = G.slideSizes,
            W = G.slideSizesWithGaps,
            X = O(j, W, D),
            Y = (function (n, t, e, o, i, u, s) {
                var f,
                    d = n.startEdge,
                    l = n.endEdge,
                    p = u.groupSlides,
                    v = p(o)
                        .map(function (n) {
                            return c(n)[l] - n[0][d];
                        })
                        .map(r)
                        .map(t.measure),
                    m = o
                        .map(function (n) {
                            return e[d] - n[d];
                        })
                        .map(function (n) {
                            return -r(n);
                        }),
                    g =
                        ((f = c(m) - c(i)),
                        p(m)
                            .map(function (n) {
                                return n[0];
                            })
                            .map(function (n, t, e) {
                                var r = !t,
                                    o = t === a(e);
                                return s && r ? 0 : s && o ? f : n + v[t];
                            }));
                return { snaps: m, snapsAligned: g };
            })(R, q, C, V, W, X, U),
            K = Y.snaps,
            Q = Y.snapsAligned,
            Z = -c(K) + c(W),
            $ = S(j, Z, Q, N).snapsContained,
            _ = U ? $ : Q,
            nn = (function (n, t, e) {
                var r, o;
                return { limit: ((r = t[0]), (o = c(t)), p(e ? r - n : o, r)) };
            })(Z, _, k).limit,
            tn = v(a(_), P, k),
            en = tn.clone(),
            rn = u(e),
            on = (function (n) {
                var t = 0;
                function e(n, e) {
                    return function () {
                        n === !!t && e();
                    };
                }
                function r() {
                    t = window.requestAnimationFrame(n);
                }
                return {
                    proceed: e(!0, r),
                    start: e(!1, r),
                    stop: e(!0, function () {
                        window.cancelAnimationFrame(t), (t = 0);
                    }),
                };
            })(function () {
                k || vn.scrollBounds.constrain(vn.dragHandler.pointerDown()), vn.scrollBody.seek(an).update();
                var n = vn.scrollBody.settle(an);
                n && !vn.dragHandler.pointerDown() && (vn.animation.stop(), i.emit('settle')),
                    n || i.emit('scroll'),
                    k && (vn.scrollLooper.loop(vn.scrollBody.direction()), vn.slideLooper.loop()),
                    vn.translate.to(cn),
                    vn.animation.proceed();
            }),
            un = _[tn.get()],
            cn = g(un),
            an = g(un),
            sn = h(cn, I, 1),
            fn = w(k, _, Z, nn, an),
            dn = (function (n, t, e, r, o, i) {
                function u(r) {
                    var u = r.distance,
                        c = r.index !== t.get();
                    u && (n.start(), o.add(u)), c && (e.set(t.get()), t.set(r.index), i.emit('select'));
                }
                return {
                    distance: function (n, t) {
                        u(r.byDistance(n, t));
                    },
                    index: function (n, e) {
                        var o = t.clone().set(n);
                        u(r.byIndex(o.get(), e));
                    },
                };
            })(on, tn, en, fn, an, i),
            ln = T(j, Z, J, K, nn, k, B),
            pn = x(
                R,
                H,
                n,
                an,
                (function (n) {
                    var t, e;
                    function o(n) {
                        return 'undefined' != typeof TouchEvent && n instanceof TouchEvent;
                    }
                    function i(n) {
                        return n.timeStamp;
                    }
                    function u(t, e) {
                        var r = e || n.scroll,
                            i = 'client'.concat('x' === r ? 'X' : 'Y');
                        return (o(t) ? t.touches[0] : t)[i];
                    }
                    return {
                        isTouchEvent: o,
                        pointerDown: function (n) {
                            return (t = n), (e = n), u(n);
                        },
                        pointerMove: function (n) {
                            var r = u(n) - u(e),
                                o = i(n) - i(t) > 170;
                            return (e = n), o && (t = n), r;
                        },
                        pointerUp: function (n) {
                            if (!t || !e) return 0;
                            var o = u(e) - u(t),
                                c = i(n) - i(t),
                                a = i(n) - i(e) > 170,
                                s = o / c;
                            return c && !a && r(s) > 0.1 ? s : 0;
                        },
                        readPoint: u,
                    };
                })(R),
                cn,
                on,
                dn,
                sn,
                fn,
                tn,
                i,
                F,
                k,
                z,
                L
            ),
            vn = {
                containerRect: C,
                slideRects: V,
                animation: on,
                axis: R,
                direction: H,
                dragHandler: pn,
                eventStore: m(),
                percentOfView: F,
                index: tn,
                indexPrevious: en,
                limit: nn,
                location: cn,
                options: o,
                scrollBody: sn,
                scrollBounds: y(nn, cn, an, sn, F),
                scrollLooper: b(Z, nn, cn, [cn, an]),
                scrollProgress: E(nn),
                scrollSnaps: _,
                scrollTarget: fn,
                scrollTo: dn,
                slideLooper: M(R, H, j, Z, W, _, ln, cn, e),
                slidesToScroll: X,
                slidesInView: ln,
                slideIndexes: rn,
                target: an,
                translate: A(R, H, t),
            };
        return vn;
    }
    var B = {
        align: 'center',
        axis: 'x',
        containScroll: '',
        direction: 'ltr',
        slidesToScroll: 1,
        breakpoints: {},
        dragFree: !1,
        draggable: !0,
        inViewThreshold: 0,
        loop: !1,
        skipSnaps: !1,
        speed: 10,
        startIndex: 0,
        active: !0,
    };
    function k() {
        function n(n, t) {
            return f(n, t || {});
        }
        return {
            merge: n,
            areEqual: function (n, t) {
                return JSON.stringify(s(n.breakpoints || {})) === JSON.stringify(s(t.breakpoints || {})) && d(n, t);
            },
            atMedia: function (t) {
                var e = t.breakpoints || {},
                    r = s(e)
                        .filter(function (n) {
                            return window.matchMedia(n).matches;
                        })
                        .map(function (n) {
                            return e[n];
                        })
                        .reduce(function (t, e) {
                            return n(t, e);
                        }, {});
                return n(t, r);
            },
        };
    }
    function I(n, t, e) {
        var r,
            o,
            i,
            u,
            c,
            a = m(),
            s = k(),
            f = (function () {
                var n = k(),
                    t = n.atMedia,
                    e = n.areEqual,
                    r = [],
                    o = [];
                function i(n) {
                    var r = t(n.options);
                    return function () {
                        return !e(r, t(n.options));
                    };
                }
                var u = {
                    init: function (n, e) {
                        return (
                            (o = n.map(i)),
                            (r = n.filter(function (n) {
                                return t(n.options).active;
                            })).forEach(function (n) {
                                return n.init(e);
                            }),
                            n.reduce(function (n, t) {
                                var e;
                                return Object.assign(n, (((e = {})[t.name] = t), e));
                            }, {})
                        );
                    },
                    destroy: function () {
                        r = r.filter(function (n) {
                            return n.destroy();
                        });
                    },
                    haveChanged: function () {
                        return o.some(function (n) {
                            return n();
                        });
                    },
                };
                return u;
            })(),
            d = (function () {
                var n = {};
                function t(t) {
                    return n[t] || [];
                }
                var e = {
                    emit: function (n) {
                        return (
                            t(n).forEach(function (t) {
                                return t(n);
                            }),
                            e
                        );
                    },
                    off: function (r, o) {
                        return (
                            (n[r] = t(r).filter(function (n) {
                                return n !== o;
                            })),
                            e
                        );
                    },
                    on: function (r, o) {
                        return (n[r] = t(r).concat([o])), e;
                    },
                };
                return e;
            })(),
            l = d.on,
            p = d.off,
            v = E,
            g = !1,
            x = s.merge(B, I.globalOptions),
            h = s.merge(x),
            y = [],
            S = 0;
        function b(t, e) {
            if (!g) {
                var a, l;
                if (
                    ((a = 'container' in n && n.container),
                    (l = 'slides' in n && n.slides),
                    (i = 'root' in n ? n.root : n),
                    (u = a || i.children[0]),
                    (c = l || [].slice.call(u.children)),
                    (x = s.merge(x, t)),
                    (h = s.atMedia(x)),
                    (r = P(i, u, c, h, d)),
                    (S = r.axis.measureSize(i.getBoundingClientRect())),
                    !h.active)
                )
                    return w();
                if ((r.translate.to(r.location), (y = e || y), (o = f.init(y, O)), h.loop)) {
                    if (!r.slideLooper.canLoop()) return w(), b({ loop: !1 }, e), void (x = s.merge(x, { loop: !0 }));
                    r.slideLooper.loop();
                }
                h.draggable && u.offsetParent && c.length && r.dragHandler.addActivationEvents();
            }
        }
        function E(n, t) {
            var e = T();
            w(), b(s.merge({ startIndex: e }, n), t), d.emit('reInit');
        }
        function w() {
            r.dragHandler.removeAllEvents(), r.animation.stop(), r.eventStore.removeAll(), r.translate.clear(), r.slideLooper.clear(), f.destroy();
        }
        function A(n) {
            var t = r[n ? 'target' : 'location'].get(),
                e = h.loop ? 'removeOffset' : 'constrain';
            return r.slidesInView.check(r.limit[e](t));
        }
        function M(n, t, e) {
            h.active && !g && (r.scrollBody.useBaseMass().useSpeed(t ? 100 : h.speed), r.scrollTo.index(n, e || 0));
        }
        function T() {
            return r.index.get();
        }
        var O = {
            canScrollNext: function () {
                return r.index.clone().add(1).get() !== T();
            },
            canScrollPrev: function () {
                return r.index.clone().add(-1).get() !== T();
            },
            clickAllowed: function () {
                return r.dragHandler.clickAllowed();
            },
            containerNode: function () {
                return u;
            },
            internalEngine: function () {
                return r;
            },
            destroy: function () {
                g || ((g = !0), a.removeAll(), w(), d.emit('destroy'));
            },
            off: p,
            on: l,
            plugins: function () {
                return o;
            },
            previousScrollSnap: function () {
                return r.indexPrevious.get();
            },
            reInit: v,
            rootNode: function () {
                return i;
            },
            scrollNext: function (n) {
                M(r.index.clone().add(1).get(), !0 === n, -1);
            },
            scrollPrev: function (n) {
                M(r.index.clone().add(-1).get(), !0 === n, 1);
            },
            scrollProgress: function () {
                return r.scrollProgress.get(r.location.get());
            },
            scrollSnapList: function () {
                return r.scrollSnaps.map(r.scrollProgress.get);
            },
            scrollTo: M,
            selectedScrollSnap: T,
            slideNodes: function () {
                return c;
            },
            slidesInView: A,
            slidesNotInView: function (n) {
                var t = A(n);
                return r.slideIndexes.filter(function (n) {
                    return -1 === t.indexOf(n);
                });
            },
        };
        return (
            b(t, e),
            a.add(window, 'resize', function () {
                var n = s.atMedia(x),
                    t = !s.areEqual(n, h),
                    e = r.axis.measureSize(i.getBoundingClientRect()),
                    o = S !== e,
                    u = f.haveChanged();
                (o || t || u) && E(), d.emit('resize');
            }),
            setTimeout(function () {
                return d.emit('init');
            }, 0),
            O
        );
    }
    return (I.globalOptions = void 0), (I.optionsHandler = k), I;
});
