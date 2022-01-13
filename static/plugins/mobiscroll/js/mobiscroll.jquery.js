!function (Ma, Mb) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = Mb(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], Mb) : Ma.mobiscroll = Mb(Ma.jQuery)
}(this, function (Ma) {
    function Mb(b, a, c) {
        var d = b;
        return "object" === (void 0 === a ? "undefined" : mc(a)) ? b.each(function () {
            new a.component(this, a)
        }) : ("string" == typeof a && b.each(function () {
            var b, f = G.instances[this.id];
            if (f && f[a] && void 0 !== (b = f[a].apply(this, Array.prototype.slice.call(c, 1)))) return d = b, !1
        }), d)
    }

    function na(b, a, c) {
        ld[b] = function (d) {
            return Mb(this, md(d, {component: a, preset: !1 === c ? void 0 : b}), arguments)
        }
    }

    function la() {
    }

    function Nb(b) {
        var a, c = [];
        for (a in b) c.push(b[a]);
        return c
    }

    function rb(b) {
        var a, c = {};
        if (b) for (a = 0; a < b.length; a++) c[b[a]] = b[a];
        return c
    }

    function Ka(b) {
        return 0 <= b - parseFloat(b)
    }

    function sb(b) {
        return "string" == typeof b
    }

    function Ia(b, a, c) {
        return Math.max(a, Math.min(b, c))
    }

    function Ca(b, a) {
        b += "";
        for (a = a || 2; b.length < a;) b = "0" + b;
        return b
    }

    function nd(b, a) {
        var c, d;
        return a = a || 100, function () {
            var e = this, f = +new Date, h = arguments;
            c && f < c + a ? (clearTimeout(d), d = setTimeout(function () {
                c = f;
                b.apply(e, h)
            }, a)) : (c = f, b.apply(e, h))
        }
    }

    function Ic(b) {
        "vibrate" in navigator && navigator.vibrate(b || 50)
    }

    function Da(b, a, c) {
        return 100 * (b - a) / (c - a)
    }

    function Jc(b, a, c) {
        b = c.attr(b);
        return void 0 === b || "" === b ? a : "true" === b
    }

    function Ob() {
        Pb++;
        setTimeout(function () {
            Pb--
        }, 500)
    }

    function Kc(b, a) {
        if (!a.mbscClick) {
            var c = (b.originalEvent || b).changedTouches[0], d = document.createEvent("MouseEvents");
            d.initMouseEvent("click", !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null);
            d.isMbscTap = !0;
            Lc = d.isIonicTap = !0;
            a.mbscChange = !0;
            a.mbscClick = !0;
            a.dispatchEvent(d);
            Lc = !1;
            Ob();
            setTimeout(function () {
                delete a.mbscClick
            })
        }
    }

    function ja(b, a, c) {
        var d = b.originalEvent || b;
        a = (c ? "page" : "client") + a;
        return d.targetTouches && d.targetTouches[0] ? d.targetTouches[0][a] : d.changedTouches && d.changedTouches[0] ? d.changedTouches[0][a] : b[a]
    }

    function Mc(b, a, c, d, e, f) {
        var h, k, g, q, ga;
        a = (0, G.$)(a);
        e = e || 9;
        b.settings.tap && a.on("touchstart.mbsc", function (a) {
            g || (d && a.preventDefault(), g = this, h = ja(a, "X"), k = ja(a, "Y"), q = !1, ga = new Date)
        }).on("touchcancel.mbsc", function () {
            g = !1
        }).on("touchmove.mbsc", function (a) {
            g && !q && (Math.abs(ja(a, "X") - h) > e || Math.abs(ja(a, "Y") - k) > e) && (q = !0)
        }).on("touchend.mbsc", function (a) {
            g && ((f && 100 > new Date - ga || !q) && (a.preventDefault(), c.call(g, a, b)), g = !1, Ob())
        });
        a.on("click.mbsc", function (a) {
            d && a.preventDefault();
            c.call(this, a, b)
        })
    }

    function Td(b) {
        if (Pb && !Lc && !b.isMbscTap && ("TEXTAREA" != b.target.nodeName || "mousedown" != b.type)) return b.stopPropagation(), b.preventDefault(), !1
    }

    function tb(b, a, c, d, e, f, h) {
        b = new Date(b, a, c, d || 0, e || 0, f || 0, h || 0);
        return 23 == b.getHours() && 0 === (d || 0) && b.setHours(b.getHours() + 2), b
    }

    function ra(b, a, c) {
        if (!a) return null;
        var d, e;
        c = U({}, Xb, c);
        var f = function (a) {
            for (var c = 0; d + 1 < b.length && b.charAt(d + 1) == a;) c++, d++;
            return c
        }, h = function (a, c, b) {
            c = "" + c;
            if (f(a)) for (; c.length < b;) c = "0" + c;
            return c
        }, k = function (a, c, b, d) {
            return f(a) ? d[c] : b[c]
        }, g = "", q = !1;
        for (d = 0; d < b.length; d++) if (q) "'" != b.charAt(d) || f("'") ? g += b.charAt(d) : q = !1; else switch (b.charAt(d)) {
            case "d":
                g += h("d", c.getDay(a), 2);
                break;
            case "D":
                g += k("D", a.getDay(), c.dayNamesShort, c.dayNames);
                break;
            case "o":
                g += h("o", (a.getTime() - (new Date(a.getFullYear(), 0, 0)).getTime()) / 864E5, 3);
                break;
            case "m":
                g += h("m", c.getMonth(a) + 1, 2);
                break;
            case "M":
                g += k("M", c.getMonth(a), c.monthNamesShort, c.monthNames);
                break;
            case "y":
                e = c.getYear(a);
                g += f("y") ? e : (10 > e % 100 ? "0" : "") + e % 100;
                break;
            case "h":
                e = a.getHours();
                g += h("h", 12 < e ? e - 12 : 0 === e ? 12 : e, 2);
                break;
            case "H":
                g += h("H", a.getHours(), 2);
                break;
            case "i":
                g += h("i", a.getMinutes(), 2);
                break;
            case "s":
                g += h("s", a.getSeconds(), 2);
                break;
            case "a":
                g += 11 < a.getHours() ? c.pmText : c.amText;
                break;
            case "A":
                g += 11 < a.getHours() ? c.pmText.toUpperCase() : c.amText.toUpperCase();
                break;
            case "'":
                f("'") ? g += "'" : q = !0;
                break;
            default:
                g += b.charAt(d)
        }
        return g
    }

    function cb(b, a, c) {
        c = U({}, Xb, c);
        var d = oa(c.defaultValue || new Date);
        if (!b || !a) return d;
        if (a.getTime) return a;
        a = "object" == (void 0 === a ? "undefined" : mc(a)) ? a.toString() : a + "";
        var e, f = c.shortYearCutoff, h = c.getYear(d), k = c.getMonth(d) + 1, g = c.getDay(d), q = -1,
            ga = d.getHours(), I = d.getMinutes(), n = 0, L = -1, x = !1, u = function (a) {
                a = e + 1 < b.length && b.charAt(e + 1) == a;
                return a && e++, a
            }, v = function (c) {
                u(c);
                c = new RegExp("^\\d{1," + ("@" == c ? 14 : "!" == c ? 20 : "y" == c ? 4 : "o" == c ? 3 : 2) + "}");
                return (c = a.substr(H).match(c)) ? (H += c[0].length, parseInt(c[0], 10)) : 0
            }, m = function (c, b, d) {
                b = u(c) ? d : b;
                for (c = 0; c < b.length; c++) if (a.substr(H, b[c].length).toLowerCase() == b[c].toLowerCase()) return H += b[c].length, c + 1;
                return 0
            }, H = 0;
        for (e = 0; e < b.length; e++) if (x) "'" != b.charAt(e) || u("'") ? H++ : x = !1; else switch (b.charAt(e)) {
            case "d":
                g = v("d");
                break;
            case "D":
                m("D", c.dayNamesShort, c.dayNames);
                break;
            case "o":
                q = v("o");
                break;
            case "m":
                k = v("m");
                break;
            case "M":
                k = m("M", c.monthNamesShort, c.monthNames);
                break;
            case "y":
                h = v("y");
                break;
            case "H":
                ga = v("H");
                break;
            case "h":
                ga = v("h");
                break;
            case "i":
                I = v("i");
                break;
            case "s":
                n = v("s");
                break;
            case "a":
                L = m("a", [c.amText, c.pmText], [c.amText, c.pmText]) - 1;
                break;
            case "A":
                L = m("A", [c.amText, c.pmText], [c.amText, c.pmText]) - 1;
                break;
            case "'":
                u("'") ? H++ : x = !0;
                break;
            default:
                H++
        }
        if (100 > h && (h += (new Date).getFullYear() - (new Date).getFullYear() % 100 + (h <= ("string" != typeof f ? f : (new Date).getFullYear() % 100 + parseInt(f, 10)) ? 0 : -100)), -1 < q) {
            k = 1;
            g = q;
            do f = 32 - (new Date(h, k - 1, 32, 12)).getDate(), g > f && (k++, g -= f); while (g > f)
        }
        ga = c.getDate(h, k - 1, g, -1 == L ? ga : L && 12 > ga ? ga + 12 : L || 12 != ga ? ga : 0, I, n);
        return c.getYear(ga) != h || c.getMonth(ga) + 1 != k || c.getDay(ga) != g ? d : ga
    }

    function Ab(b) {
        return tb(b.getFullYear(), b.getMonth(), b.getDate())
    }

    function od(b, a) {
        var c = "", d = "";
        return b && (a.h && (d += Ca(b.getHours()) + ":" + Ca(b.getMinutes()), a.s && (d += ":" + Ca(b.getSeconds())), a.u && (d += "." + Ca(b.getMilliseconds(), 3)), a.tz && (d += a.tz)), a.y ? (c += b.getFullYear(), a.m && (c += "-" + Ca(b.getMonth() + 1), a.d && (c += "-" + Ca(b.getDate())), a.h && (c += "T" + d))) : a.h && (c = d)), c
    }

    function pd(b, a, c) {
        var d, e, f = {y: 1, m: 2, d: 3, h: 4, i: 5, s: 6, u: 7, tz: 8};
        if (c) for (d in f) (e = b[f[d] - a]) && (c[d] = "tz" == d ? e : 1)
    }

    function ub(b, a, c) {
        var d = window.moment || a.moment, e = a.returnFormat;
        if (b) {
            if ("moment" == e && d) return d(b);
            if ("locale" == e) return ra(c, b, a);
            if ("iso8601" == e) return od(b, a.isoParts)
        }
        return b
    }

    function oa(b, a, c, d) {
        var e;
        return b ? b.getTime ? b : b.toDate ? b.toDate() : ("string" == typeof b && (b = b.trim()), (e = qd.exec(b)) ? (pd(e, 2, d), new Date(1970, 0, 1, e[2] ? +e[2] : 0, e[3] ? +e[3] : 0, e[4] ? +e[4] : 0, e[5] ? +e[5] : 0)) : (e || (e = Ud.exec(b)), e ? (pd(e, 0, d), new Date(e[1] ? +e[1] : 1970, e[2] ? e[2] - 1 : 0, e[3] ? +e[3] : 1, e[4] ? +e[4] : 0, e[5] ? +e[5] : 0, e[6] ? +e[6] : 0, e[7] ? +e[7] : 0)) : cb(a, b, c))) : null
    }

    function Nc(ga, a, c) {
        Sa && b(function () {
            b(ga).each(function () {
                new a(this)
            });
            b(document).on("mbsc-enhance", function (c, e) {
                b(c.target).is(ga) ? new a(c.target, e) : b(ga, c.target).each(function () {
                    new a(this, e)
                })
            });
            c && b(document).on("mbsc-refresh", function (a) {
                var c;
                b(a.target).is(ga) ? (c = Xa[a.target.id]) && c.refresh() : b(ga, a.target).each(function () {
                    (c = Xa[this.id]) && c.refresh()
                })
            })
        })
    }

    function Yb(ga, a) {
        if ("touchstart" == ga.type) b(a).attr("data-touch", "1"); else if (b(a).attr("data-touch")) return b(a).removeAttr("data-touch"), !1;
        return !0
    }

    function Oc(ga, a) {
        var c, d = getComputedStyle(ga[0]);
        return b.each(["t", "webkitT", "MozT", "OT", "msT"], function (a, b) {
            if (void 0 !== d[b + "ransform"]) return c = d[b + "ransform"], !1
        }), c = c.split(")")[0].split(", "), a ? c[13] || c[5] : c[12] || c[4]
    }

    function rd(ga) {
        if (ga) {
            if (Pc[ga]) return Pc[ga];
            var a = b('\x3cdiv style\x3d"background-color:' + ga + ';"\x3e\x3c/div\x3e').appendTo("body"),
                c = getComputedStyle(a[0]).backgroundColor.replace(/rgb|rgba|\(|\)|\s/g, "").split(","),
                c = 130 > .299 * c[0] + .587 * c[1] + .114 * c[2] ? "#fff" : "#000";
            return a.remove(), Pc[ga] = c, c
        }
    }

    function Qb(ga, a, c, d, e, f) {
        function h(a) {
            var c;
            n = b(this);
            H = +n.attr("data-step");
            x = +n.attr("data-index");
            L = !0;
            e && a.stopPropagation();
            "mousedown" == a.type && a.preventDefault();
            "keydown" != a.type ? (v = ja(a, "X"), m = ja(a, "Y"), c = Yb(a, this)) : c = 32 === a.keyCode;
            u || !c || n.hasClass("mbsc-disabled") || (K(x, H) && (n.addClass("mbsc-active"), f && f.addRipple(n.find(".mbsc-segmented-content"), a)), "mousedown" == a.type && b(document).on("mousemove", k).on("mouseup", g))
        }

        function k(a) {
            (7 < Math.abs(v - ja(a, "X")) || 7 < Math.abs(m - ja(a, "Y"))) && (L = !0, q())
        }

        function g(a) {
            "touchend" == a.type && a.preventDefault();
            q();
            "mouseup" == a.type && b(document).off("mousemove", k).off("mouseup", g)
        }

        function q() {
            u = !1;
            clearInterval(l);
            n && (n.removeClass("mbsc-active"), f && setTimeout(function () {
                f.removeRipple()
            }, 100))
        }

        function K(a, c) {
            return u || w(a) || (x = a, H = c, u = !0, L = !1, setTimeout(I, 100)), u
        }

        function I() {
            n && n.hasClass("mbsc-disabled") ? q() : (!u && L || (L = !0, a(x, H, I)), u && c && (clearInterval(l), l = setInterval(function () {
                a(x, H)
            }, c)))
        }

        var n, L, x, u, v, m, H, l, w = d || la;
        return ga.on("touchstart mousedown keydown", h).on("touchmove", k).on("touchend touchcancel keyup", g), {
            start: K,
            stop: q,
            destroy: function () {
                ga.off("touchstart mousedown keydown", h).off("touchmove", k).off("touchend touchcancel keyup", g)
            }
        }
    }

    function sd(ga, a) {
        var c = {}, d = ga.parent(), e = d.find(".mbsc-err-msg"), f = ga.attr("data-icon-align") || "left",
            h = ga.attr("data-icon");
        d.hasClass("mbsc-input-wrap") ? d = d.parent() : b('\x3cspan class\x3d"mbsc-input-wrap"\x3e\x3c/span\x3e').insertAfter(ga).append(ga);
        e && d.find(".mbsc-input-wrap").append(e);
        h && (-1 !== h.indexOf("{") ? c = JSON.parse(h) : c[f] = h);
        (h || a) && (U(c, a), d.addClass((c.right ? "mbsc-ic-right " : "") + (c.left ? " mbsc-ic-left" : "")).find(".mbsc-input-wrap").append(c.left ? '\x3cspan class\x3d"mbsc-input-ic mbsc-left-ic mbsc-ic mbsc-ic-' + c.left + '"\x3e\x3c/span\x3e' : "").append(c.right ? '\x3cspan class\x3d"mbsc-input-ic mbsc-right-ic mbsc-ic mbsc-ic-' + c.right + '"\x3e\x3c/span\x3e' : ""))
    }

    function td(ga, a) {
        "button" != a && "submit" != a && "segmented" != a && (ga.addClass("mbsc-control-w").find("label").addClass("mbsc-label").each(function (a, d) {
            b(d).attr("title", b(d).text())
        }), ga.contents().filter(function () {
            return 3 == this.nodeType && this.nodeValue && /\S/.test(this.nodeValue)
        }).each(function () {
            b('\x3cspan class\x3d"mbsc-label" title\x3d"' + this.textContent.trim() + '"\x3e\x3c/span\x3e').insertAfter(this).append(this)
        }))
    }

    function ud(b) {
        var a = b[0], c = b.attr("data-role");
        b = b.attr("type") || a.nodeName.toLowerCase();
        return /(switch|range|rating|segmented|stepper)/.test(c) && (b = c), b
    }

    function vd(b) {
        return (b = G.themes.form[b]) && b.addRipple ? b : null
    }

    function wd() {
        clearTimeout(Qc);
        Qc = setTimeout(function () {
            b("textarea.mbsc-control").each(function () {
                Zb(this)
            })
        }, 100)
    }

    function Zb(ga) {
        var a = void 0, c = void 0, d = void 0, e = b(ga).attr("rows") || 6;
        ga.offsetHeight && (ga.style.height = "", d = ga.scrollHeight - ga.offsetHeight, a = ga.offsetHeight + (0 < d ? d : 0), (c = Math.round(a / 24)) > e ? (a = 24 * e + (a - 24 * c), b(ga).addClass("mbsc-textarea-scroll")) : b(ga).removeClass("mbsc-textarea-scroll"), a && (ga.style.height = a + "px"))
    }

    function xd(ga, a, c, d) {
        b("input,select,textarea,progress,button", ga).each(function () {
            var d = b(this), f = ud(d);
            if ("false" != d.attr("data-enhance")) if (d.hasClass("mbsc-control")) this.mbscInst && this.mbscInst.option({
                theme: c.theme,
                lang: c.lang,
                rtl: c.rtl,
                onText: c.onText,
                offText: c.offText,
                stopProp: c.stopProp
            }); else switch (this.id || (this.id = "mbsc-form-control-" + ++yd), f) {
                case "button":
                case "submit":
                    a[this.id] = new Vd(this, {theme: c.theme, tap: c.tap});
                    break;
                case "switch":
                    a[this.id] = new Rb(this, {
                        theme: c.theme,
                        lang: c.lang,
                        rtl: c.rtl,
                        tap: c.tap,
                        onText: c.onText,
                        offText: c.offText,
                        stopProp: c.stopProp
                    });
                    break;
                case "checkbox":
                    a[this.id] = new Wd(this, {tap: c.tap});
                    break;
                case "range":
                    b(this).parent().hasClass("mbsc-slider") || (a[this.id] = new Bb(this, {
                        theme: c.theme,
                        lang: c.lang,
                        rtl: c.rtl,
                        stopProp: c.stopProp
                    }));
                    break;
                case "rating":
                    a[this.id] = new ic(this, {theme: c.theme, lang: c.lang, rtl: c.rtl, stopProp: c.stopProp});
                    break;
                case "progress":
                    a[this.id] = new $b(this, {theme: c.theme, lang: c.lang, rtl: c.rtl});
                    break;
                case "radio":
                    a[this.id] = new Xd(this, {tap: c.tap});
                    break;
                case "select":
                case "select-one":
                case "select-multiple":
                    a[this.id] = new Yd(this, {tap: c.tap});
                    break;
                case "textarea":
                    a[this.id] = new Zd(this, {tap: c.tap});
                    break;
                case "segmented":
                    a[this.id] = new $d(this, {theme: c.theme, tap: c.tap});
                    break;
                case "stepper":
                    a[this.id] = new ac(this, {theme: c.theme});
                    break;
                case "hidden":
                    break;
                default:
                    a[this.id] = new Rc(this, {tap: c.tap})
            }
        });
        b("[data-collapsible]:not(.mbsc-collapsible)", ga).each(function () {
            var c = b(this), d = c.attr("data-open");
            this.id || (this.id = "mbsc-form-control-" + ++yd);
            a[this.id] = new Sc(c, {isOpen: void 0 !== d && "false" != d});
            Xa[this.id] = a[this.id]
        });
        d || wd()
    }

    function Sb(ga) {
        var a = [Math.round(ga.r).toString(16), Math.round(ga.g).toString(16), Math.round(ga.b).toString(16)];
        return b.each(a, function (b, d) {
            1 == d.length && (a[b] = "0" + d)
        }), "#" + a.join("")
    }

    function rc(b) {
        return {
            r: (b = parseInt(-1 < b.indexOf("#") ? b.substring(1) : b, 16)) >> 16,
            g: (65280 & b) >> 8,
            b: 255 & b,
            toString: function () {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
            }
        }
    }

    function zd(b) {
        var a, c, d, e = b.h, f = 255 * b.s / 100;
        b = 255 * b.v / 100;
        if (0 === f) a = c = d = b; else {
            var f = (255 - f) * b / 255, h = e % 60 * (b - f) / 60;
            360 == e && (e = 0);
            60 > e ? (a = b, d = f, c = f + h) : 120 > e ? (c = b, d = f, a = b - h) : 180 > e ? (c = b, a = f, d = f + h) : 240 > e ? (d = b, a = f, c = b - h) : 300 > e ? (d = b, c = f, a = f + h) : 360 > e ? (a = b, c = f, d = b - h) : a = c = d = 0
        }
        return {
            r: a, g: c, b: d, toString: function () {
                return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
            }
        }
    }

    function Ad(b) {
        var a, c, d = 0, e = Math.max(b.r, b.g, b.b), f = e - Math.min(b.r, b.g, b.b);
        return c = e, d = (a = e ? 255 * f / e : 0) ? b.r == e ? (b.g - b.b) / f : b.g == e ? 2 + (b.b - b.r) / f : 4 + (b.r - b.g) / f : -1, 0 > (d *= 60) && (d += 360), {
            h: d,
            s: a *= 100 / 255,
            v: c *= 100 / 255,
            toString: function () {
                return "hsv(" + Math.round(this.h) + "," + Math.round(this.s) + "%," + Math.round(this.v) + "%)"
            }
        }
    }

    function Bd(b) {
        var a, c, d = b.r / 255, e = b.g / 255;
        b = b.b / 255;
        var f = Math.max(d, e, b);
        c = Math.min(d, e, b);
        var h = (f + c) / 2;
        if (f == c) a = c = 0; else {
            var k = f - c;
            switch (c = .5 < h ? k / (2 - f - c) : k / (f + c), f) {
                case d:
                    a = (e - b) / k + (e < b ? 6 : 0);
                    break;
                case e:
                    a = (b - d) / k + 2;
                    break;
                case b:
                    a = (d - e) / k + 4
            }
            a /= 6
        }
        return {
            h: Math.round(360 * a), s: Math.round(100 * c), l: Math.round(100 * h), toString: function () {
                return "hsl(" + this.h + "," + this.s + "%," + this.l + "%)"
            }
        }
    }

    function Cd(b) {
        return Bd(rc(b))
    }

    function ae(b) {
        return Sb(function (a) {
            var b, d, e, f, h, k, g = a.h, q = a.s;
            a = a.l;
            return isFinite(g) || (g = 0), isFinite(q) || (q = 0), isFinite(a) || (a = 0), 0 > (g /= 60) && (g = 6 - -g % 6), g %= 6, q = Math.max(0, Math.min(1, q / 100)), a = Math.max(0, Math.min(1, a / 100)), k = (h = (1 - Math.abs(2 * a - 1)) * q) * (1 - Math.abs(g % 2 - 1)), 1 > g ? (b = h, d = k, e = 0) : 2 > g ? (b = k, d = h, e = 0) : 3 > g ? (b = 0, d = h, e = k) : 4 > g ? (b = 0, d = k, e = h) : 5 > g ? (b = k, d = 0, e = h) : (b = h, d = 0, e = k), f = a - h / 2, {
                r: Math.round(255 * (b + f)),
                g: Math.round(255 * (d + f)),
                b: Math.round(255 * (e + f)),
                toString: function () {
                    return "rgb(" + this.r + "," + this.g + "," + this.b + ")"
                }
            }
        }(b))
    }

    function Dd(b) {
        return Sb(zd(b))
    }

    function Ed(b) {
        return Ad(rc(b))
    }

    function Tc(b) {
        db.length || b.show();
        db.push(b)
    }

    function sc(b, a, c, d) {
        return U({
            display: a.display || "center",
            cssClass: "mbsc-alert",
            okText: a.okText,
            cancelText: a.cancelText,
            context: a.context,
            theme: a.theme,
            closeOnOverlayTap: !1,
            onBeforeClose: function () {
                b.shift()
            },
            onBeforeShow: function () {
                G.activeInstance = null
            },
            onHide: function (b, d) {
                c && c(d._resolve);
                a.callback && a.callback(d._resolve);
                d && d.destroy();
                db.length ? db[0].show() : jb.length && jb[0].show(!1, !0)
            }
        }, d)
    }

    function Uc(b) {
        return (b.title ? "\x3ch2\x3e" + b.title + "\x3c/h2\x3e" : "") + "\x3cp\x3e" + (b.message || "") + "\x3c/p\x3e"
    }

    function be(b, a, c) {
        Tc(new Ya(b, sc(db, a, c)))
    }

    function ce(b, a, c) {
        var d = new Ya(b, sc(db, a, c, {
            buttons: ["cancel", "ok"], onSet: function () {
                d._resolve = !0
            }
        }));
        d._resolve = !1;
        Tc(d)
    }

    function de(b, a, c) {
        var d = void 0, e = new Ya(b, sc(db, a, c, {
            buttons: ["cancel", "ok"], onMarkupReady: function (a, b) {
                d = b._markup.find("input")[0];
                setTimeout(function () {
                    d.focus();
                    d.setSelectionRange(0, d.value.length)
                }, 300)
            }, onSet: function () {
                e._resolve = d.value
            }
        }));
        e._resolve = null;
        Tc(e)
    }

    function Fd(ga, a, c, d, e) {
        var f = void 0;
        ga = new Ya(ga, sc(jb, a, c, {
            display: a.display || "bottom",
            animate: e,
            cssClass: (d || "mbsc-snackbar") + (a.color ? " mbsc-" + a.color : ""),
            scrollLock: !1,
            focusTrap: !1,
            buttons: [],
            onShow: function (c, d) {
                !1 !== a.duration && (f = setTimeout(function () {
                    d && d.hide()
                }, a.duration || 3E3));
                a.button && d.tap(b(".mbsc-snackbar-btn", c.target), function () {
                    d.hide();
                    a.button.action && a.button.action.call(this)
                })
            },
            onClose: function () {
                clearTimeout(f)
            }
        }));
        c = jb.length;
        jb.push(ga);
        db.length || (c ? jb[0].hide() : ga.show(!1, !0))
    }

    function ee(b, a, c) {
        Fd(b, a, c, "mbsc-toast", "fade")
    }

    function bc(b, a, c) {
        var d = void 0;
        return fe ? d = new Promise(function (d) {
            b(a, c, d)
        }) : b(a, c), d
    }

    function Vc(b) {
        for (var a = 0, c = 1, d = 0; b.length;) 3 < a ? c = 3600 : 1 < a && (c = 60), d += b.pop() * c * (a % 2 ? 10 : 1), a++;
        return d
    }

    function Wc(b, a, c) {
        "jsonp" == c ? function (a, b) {
            var c = document.createElement("script"), d = "mbscjsonp" + ++ge;
            window[d] = function (a) {
                c.parentNode.removeChild(c);
                delete window[d];
                a && b(a)
            };
            c.src = a + (0 <= a.indexOf("?") ? "\x26" : "?") + "callback\x3d" + d;
            document.body.appendChild(c)
        }(b, a) : function (a, b) {
            var c = new XMLHttpRequest;
            c.open("GET", a, !0);
            c.onload = function () {
                200 <= this.status && 400 > this.status && b(JSON.parse(this.response))
            };
            c.onerror = function () {
            };
            c.send()
        }(b, a)
    }

    function Xc(G, a) {
        var c = ja(a, "X", !0), d = ja(a, "Y", !0), e = G.offset(), f = c - e.left, h = d - e.top,
            f = 2 * Math.sqrt(Math.pow(Math.max(f, G[0].offsetWidth - f), 2) + Math.pow(Math.max(h, G[0].offsetHeight - h), 2));
        Fb(vb);
        vb = b('\x3cspan class\x3d"mbsc-ripple"\x3e\x3c/span\x3e').css({
            width: f,
            height: f,
            top: d - e.top - f / 2,
            left: c - e.left - f / 2
        }).appendTo(G);
        setTimeout(function () {
            vb.addClass("mbsc-ripple-scaled mbsc-ripple-visible")
        }, 10)
    }

    function Fb(b) {
        setTimeout(function () {
            b && (b.removeClass("mbsc-ripple-visible"), setTimeout(function () {
                b.remove()
            }, 2E3))
        }, 100)
    }

    function Gd(G, a, c, d) {
        var e, f;
        G.off(".mbsc-ripple").on("touchstart.mbsc-ripple mousedown.mbsc-ripple", a, function (a) {
            Yb(a, this) && (e = ja(a, "X"), f = ja(a, "Y"), (kb = b(this)).hasClass(c) || kb.hasClass(d) ? kb = null : Xc(kb, a))
        }).on("touchmove.mbsc-ripple mousemove.mbsc-ripple", a, function (a) {
            (kb && 9 < Math.abs(ja(a, "X") - e) || 9 < Math.abs(ja(a, "Y") - f)) && (Fb(vb), kb = null)
        }).on("touchend.mbsc-ripple touchcancel.mbsc-ripple mouseleave.mbsc-ripple mouseup.mbsc-ripple", a, function () {
            kb && (setTimeout(function () {
                Fb(vb)
            }, 100), kb = null)
        })
    }

    Ma = Ma && Ma.hasOwnProperty("default") ? Ma["default"] : Ma;
    var Fa, tc, wb, Hd, G = G || {}, Gb = {},
        mc = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (b) {
            return typeof b
        } : function (b) {
            return b && "function" == typeof Symbol && b.constructor === Symbol && b !== Symbol.prototype ? "symbol" : typeof b
        }, lb = function (b, a) {
            if (!(b instanceof a)) throw new TypeError("Cannot call a class as a function");
        }, Tb = function () {
            function b(a, b) {
                for (var c = 0; c < b.length; c++) {
                    var e = b[c];
                    e.enumerable = e.enumerable || !1;
                    e.configurable = !0;
                    "value" in e && (e.writable = !0);
                    Object.defineProperty(a, e.key, e)
                }
            }

            return function (a, c, d) {
                return c && b(a.prototype, c), d && b(a, d), a
            }
        }(), he = function (b, a, c) {
            return a in b ? Object.defineProperty(b, a, {
                value: c,
                enumerable: !0,
                configurable: !0,
                writable: !0
            }) : b[a] = c, b
        }, uc = function a(b, d, e) {
            null === b && (b = Function.prototype);
            var c = Object.getOwnPropertyDescriptor(b, d);
            if (void 0 === c) return b = Object.getPrototypeOf(b), null === b ? void 0 : a(b, d, e);
            if ("value" in c) return c.value;
            d = c.get;
            return void 0 !== d ? d.call(e) : void 0
        }, Hb = function (a, b) {
            if ("function" != typeof b && null !== b) throw new TypeError("Super expression must either be null or a function, not " + typeof b);
            a.prototype = Object.create(b && b.prototype, {
                constructor: {
                    value: a,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            });
            b && (Object.setPrototypeOf ? Object.setPrototypeOf(a, b) : a.__proto__ = b)
        }, Cb = function (a, b) {
            if (!a) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !b || "object" != typeof b && "function" != typeof b ? a : b
        }, md = Ma.extend, ld = {};
    G.$ = Ma;
    Ma.mobiscroll = G;
    Ma.fn.mobiscroll = function (a) {
        return md(this, ld), Mb(this, a, arguments)
    };
    var vc = [], Sa = "undefined" != typeof window, wc = Sa ? navigator.userAgent : "",
        xc = wc.match(/Android|iPhone|iPad|iPod|Windows Phone|Windows|MSIE/i),
        Yc = Sa && window.requestAnimationFrame || function (a) {
            a()
        }, Zc = Sa && window.cancelAnimationFrame || function () {
        };
    /Android/i.test(xc) ? (Fa = "android", (tc = wc.match(/Android\s+([\d\.]+)/i)) && (vc = tc[0].replace("Android ", "").split("."))) : /iPhone|iPad|iPod/i.test(xc) ? (Fa = "ios", (tc = wc.match(/OS\s+([\d\_]+)/i)) && (vc = tc[0].replace(/_/g, ".").replace("OS ", "").split("."))) : /Windows Phone/i.test(xc) ? Fa = "wp" : /Windows|MSIE/i.test(xc) && (Fa = "windows");
    wb = vc[0];
    Hd = vc[1];
    var Pb = 0, Lc = void 0;
    Sa && (["mouseover", "mousedown", "mouseup", "click"].forEach(function (a) {
        document.addEventListener(a, Td, !0)
    }), "android" == Fa && 5 > wb && document.addEventListener("change", function (a) {
        Pb && "checkbox" == a.target.type && !a.target.mbscChange && (a.stopPropagation(), a.preventDefault());
        delete a.target.mbscChange
    }, !0));
    var mb,
        Ud = /^(\d{4}|[+\-]\d{6})(?:-(\d{2})(?:-(\d{2}))?)?(?:T(\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?((Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,
        qd = /^((\d{2}):(\d{2})(?::(\d{2})(?:\.(\d{3}))?)?(?:(Z)|([+\-])(\d{2})(?::(\d{2}))?)?)?$/,
        eb = /^\d{1,2}(\/\d{1,2})?$/, Za = /^w\d$/i, Xb = {
            shortYearCutoff: "+10",
            monthNames: "January February March April May June July August September October November December".split(" "),
            monthNamesShort: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
            dayNames: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),
            dayNamesShort: "Sun Mon Tue Wed Thu Fri Sat".split(" "),
            dayNamesMin: "SMTWTFS".split(""),
            amText: "am",
            pmText: "pm",
            getYear: function (a) {
                return a.getFullYear()
            },
            getMonth: function (a) {
                return a.getMonth()
            },
            getDay: function (a) {
                return a.getDate()
            },
            getDate: tb,
            getMaxDayOfMonth: function (a, b) {
                return 32 - (new Date(a, b, 32, 12)).getDate()
            },
            getWeekNumber: function (a) {
                (a = new Date(a)).setHours(0, 0, 0);
                a.setDate(a.getDate() + 4 - (a.getDay() || 7));
                var b = new Date(a.getFullYear(), 0, 1);
                return Math.ceil(((a - b) / 864E5 + 1) / 7)
            }
        };
    Gb.datetime = {formatDate: ra, parseDate: cb};
    var b = G.$, ie = +new Date, Xa = {}, Ea = {}, je = {xsmall: 0, small: 576, medium: 768, large: 992, xlarge: 1200},
        U = b.extend;
    U(Gb, {getCoord: ja, preventClick: Ob, vibrate: Ic});
    mb = U(G, {
        $: b,
        version: "4.3.2",
        bLikN: 1,
        autoTheme: "mobiscroll",
        themes: {form: {}, page: {}, frame: {}, scroller: {}, listview: {}, navigation: {}, progress: {}, card: {}},
        platform: {name: Fa, majorVersion: wb, minorVersion: Hd},
        i18n: {},
        instances: Xa,
        classes: Ea,
        util: Gb,
        settings: {},
        setDefaults: function (a) {
            U(this.settings, a)
        },
        customTheme: function (a, b) {
            var c, e = G.themes, f = "frame scroller listview navigation form page progress card".split(" ");
            for (c = 0; c < f.length; c++) e[f[c]][a] = U({}, e[f[c]][b], {baseTheme: b})
        }
    });
    var $a, cc, Ub, $c, ad, Qa, Vb = function (a, c) {
        function d(a) {
            var c, d;
            return k.responsive && (d = a || e.offsetWidth, b.each(k.responsive, function (a, b) {
                d >= (b.breakpoint || je[a]) && (c = b)
            })), c
        }

        var e, f, h, k, g, q, K, I, n = this;
        n.settings = {};
        n.element = a;
        n._init = la;
        n._destroy = la;
        n._processSettings = la;
        n._checkResp = function (a) {
            if (n._responsive && h !== d(a)) return n.init({}), !0
        };
        n.init = function (L) {
            function x(a) {
                return "string" == typeof a ? a : od(oa(a), {y: 1, m: 1, d: 1, h: 1, i: 1, s: 1, u: 1})
            }

            function u() {
                n._init(L);
                L && n.setVal && n.setVal(m, !0);
                K("onInit")
            }

            var v, m;
            for (v in L && n.getVal && (m = n.getVal()), n.settings) delete n.settings[v];
            k = n.settings;
            U(c, L);
            n._hasDef && (I = mb.settings);
            U(k, n._defaults, I, c);
            n._hasTheme && ("auto" != (q = k.theme) && q || (q = mb.autoTheme), "default" == q && (q = "mobiscroll"), c.theme = q, g = mb.themes[n._class] ? mb.themes[n._class][q] : {});
            n._hasLang && (V = mb.i18n[k.lang]);
            U(k, g, V, I, c);
            e = b(k.context)[0];
            n._responsive && (h = d(), U(k, h));
            n._processSettings(h || {});
            if (!n._class || {
                    form: !0,
                    page: !0,
                    progress: !0,
                    "switch": !0,
                    slider: !0,
                    stepper: !0
                }[n._class]) u(); else {
                var H, l;
                b(a).find(k.listSelector || "ul,ol");
                v = k.buttons;
                x(k.max);
                x(k.min);
                var w = [], V = {},
                    z = "refresh redraw navigate changeTab getDate setDate addEvent removeEvent getEvents setEvents setActiveDate start stop reset lap resetlap getTime setTime getEllapsedTime setEllapsedTime".split(" ");
                H = {jsonp: 1, getInst: 1, init: 1, destroy: 1};
                var A = function (a) {
                    n[a] = function () {
                        w.push({func: a, args: arguments})
                    }
                };
                for (l in n) "function" != typeof n[l] || H[l] || (V[l] = n[l], A(l));
                for (H = 0; H < z.length; H++) A(z[H]);
                "timer" != k.preset || c.buttons || (v = ["resetlap", "toggle"], "inline" !== k.display && v.unshift("hide"));
                "eventcalendar" != k.preset || c.buttons || "inline" == k.display || (v = ["close"]);
                if (n) {
                    for (l in n.remote = e, V) n[l] = V[l];
                    var V = U({}, c);
                    delete V.data;
                    n._presets && (f = n._presets[k.preset]) && (f = f.call(a, n, c), U(k, f, V, h));
                    u();
                    for (H = 0; H < w.length; H++) n[w[H].func].apply(n, w[H].args);
                    V = w = null
                }
            }
        };
        n.destroy = function () {
            n && (n._destroy(), K("onDestroy"), delete Xa[a.id], n = null)
        };
        n.tap = function (a, b, c, d, e) {
            Mc(n, a, b, c, d, e)
        };
        n.trigger = function (b, d) {
            var e, h, m, k = [I, g, f, c];
            for (h = 0; 4 > h; h++) (m = k[h]) && m[b] && (e = m[b].call(a, d || {}, n));
            return e
        };
        n.option = function (a, b) {
            var d = {};
            "object" === (void 0 === a ? "undefined" : mc(a)) ? d = a : d[a] = b;
            "data invalid valid marked labels colors readonly".split(" ").forEach(function (a) {
                c[a] = k[a]
            });
            n.init(d)
        };
        n.getInst = function () {
            return n
        };
        n.zone = {
            run: function (a) {
                a()
            }
        };
        c = c || {};
        K = n.trigger;
        n.__ready || (b(a).addClass("mbsc-comp"), a.id ? Xa[a.id] && Xa[a.id].destroy() : a.id = "mobiscroll" + ++ie, Xa[a.id] = n, n.__ready = !0)
    }, yc, zc, Pc = {};
    Sa && (cc = document.createElement("modernizr").style, Ub = function () {
        var a, b = ["Webkit", "Moz", "O", "ms"];
        for (a in b) {
            var d;
            a:{
                d = [b[a] + "Transform"];
                var e = void 0;
                for (e in d) if (void 0 !== cc[d[e]]) {
                    d = !0;
                    break a
                }
                d = !1
            }
            if (d) return "-" + b[a].toLowerCase() + "-"
        }
        return ""
    }(), Qa = Ub.replace(/^\-/, "").replace(/\-$/, "").replace("moz", "Moz"), $a = void 0 !== cc.animation ? "animationend" : "webkitAnimationEnd", $c = void 0 !== cc.touchAction, ad = void 0 !== cc.transition);
    var bd = G.themes, ke = /(iphone|ipod)/i.test(wc) && 7 <= wb, cd = "android" == Fa, dd = "ios" == Fa,
        le = dd && 7 < wb, me = function (a) {
            a.preventDefault()
        }, Ua = function (a, c, d) {
            function e(a) {
                B && B.removeClass("mbsc-active");
                (B = b(this)).hasClass("mbsc-disabled") || B.hasClass("mbsc-fr-btn-nhl") || B.addClass("mbsc-active");
                "mousedown" === a.type ? b(document).on("mouseup", f) : "pointerdown" === a.type && b(document).on("pointerup", f)
            }

            function f(a) {
                B && (B.removeClass("mbsc-active"), B = null);
                "mouseup" === a.type ? b(document).off("mouseup", f) : "pointerup" === a.type && b(document).off("pointerup", f)
            }

            function h(a) {
                13 == a.keyCode ? E.select() : 27 == a.keyCode && E.cancel()
            }

            function k(a) {
                var c = yc, d = r.focusOnClose;
                E._markupRemove();
                H.remove();
                W && (Q.mbscModals--, r.scrollLock && Q.mbscLock--, Q.mbscLock || m.removeClass("mbsc-fr-lock"), Q.mbscModals || (m.removeClass("mbsc-fr-lock-ios mbsc-fr-lock-ctx"), ba && (u.css({
                    top: "",
                    left: ""
                }), z.scrollLeft(p), z.scrollTop(ka)), a || (c || (c = T), setTimeout(function () {
                    void 0 === d || !0 === d ? (zc = !0, c[0].focus()) : d && b(d)[0].focus()
                }, 200))));
                P = !1;
                R("onHide")
            }

            function g(a) {
                clearTimeout(J);
                J = setTimeout(function () {
                    E.position(!0);
                    "orientationchange" == a.type && (Z.style.display = "none", Z.offsetHeight, Z.style.display = "")
                }, 200)
            }

            function q(a) {
                a.target.nodeType && !X.contains(a.target) && 100 < ea - new Date && (X.focus(), ea = new Date)
            }

            function K(a, c) {
                if (W) H.appendTo(u); else if (T.is("div") && !E._hasContent) T.empty().append(H); else if (T.hasClass("mbsc-control")) {
                    var p = T.closest(".mbsc-control-w");
                    H.insertAfter(p);
                    p.hasClass("mbsc-select") && p.addClass("mbsc-select-inline")
                } else H.insertAfter(T);
                P = !0;
                E._markupInserted(H);
                R("onMarkupInserted", {target: C});
                H.on("mousedown", ".mbsc-btn-e,.mbsc-fr-btn-e", me).on("touchstart mousedown", function (a) {
                    r.stopProp && a.stopPropagation()
                }).on("keydown", ".mbsc-fr-btn-e", function (a) {
                    32 == a.keyCode && (a.preventDefault(), a.stopPropagation(), this.click())
                }).on("keydown", function (a) {
                    if (32 == a.keyCode) a.preventDefault(); else if (9 == a.keyCode && W && r.focusTrap) {
                        var c = H.find('input,select,textarea,button,[tabindex\x3d"0"]').filter(function () {
                            return 0 < this.offsetWidth || 0 < this.offsetHeight
                        }), p = c.index(b(":focus", H)), d = c.length - 1, e = 0;
                        a.shiftKey && (d = 0, e = -1);
                        p === d && (c.eq(e)[0].focus(), a.preventDefault())
                    }
                }).on("touchstart mousedown pointerdown", ".mbsc-fr-btn-e", e).on("touchend", ".mbsc-fr-btn-e", f);
                V.on("keydown", "input,select,textarea", function (a) {
                    32 != a.keyCode && 13 != a.keyCode || a.stopPropagation()
                });
                C.addEventListener("touchstart", function () {
                    Y || (Y = !0, u.find(".mbsc-no-touch").removeClass("mbsc-no-touch"))
                }, !0);
                b.each(t, function (a, c) {
                    E.tap(b(".mbsc-fr-btn" + a, H), function (a) {
                        (sb((c = sb(c) ? E.buttons[c] : c).handler) ? E.handlers[c.handler] : c.handler).call(this, a, E)
                    }, !0)
                });
                E._attachEvents(H);
                !1 !== E.position() && (z.on(O, g), W && (M && !a ? H.addClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + M).on($a, function nb() {
                    H.off($a, nb).removeClass("mbsc-anim-in mbsc-anim-trans mbsc-anim-trans-" + M).find(".mbsc-fr-popup").removeClass("mbsc-anim-" + M);
                    c || cd || !E._activeElm || E._activeElm.focus()
                }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + M) : c || cd || !E._activeElm || E._activeElm.focus()), R("onShow", {
                    target: C,
                    valueText: E._tempValue
                }))
            }

            function I(a, b) {
                a && a();
                !1 !== E.show() && (yc = b)
            }

            function n() {
                E._fillValue();
                R("onSet", {valueText: E._value})
            }

            function L() {
                R("onCancel", {valueText: E._value})
            }

            function x() {
                E.setVal(null, !0)
            }

            var u, v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, ca, y, F, ba, X, Z, J, O, r, p, S, ka, Y, R, wa, Ba,
                E = this, T = b(a), aa = [], ea = new Date;
            Vb.call(this, a, c, !0);
            E.position = function (a) {
                var c, p, d, e, f, g, m, h, Oa, v, ka, B, k, l, t, q, n, M = {}, x = 0, Y = 0, aa = 0, K = 0;
                if (!P) return !1;
                if (k = C.offsetHeight, l = C.offsetWidth, wa !== l || Ba !== k || !a) {
                    if (E._checkResp(l)) return !1;
                    E._isFullScreen || /top|bottom/.test(r.display) ? V.width(l) : W && A.width("");
                    E._position(H);
                    b(".mbsc-comp", H).each(function () {
                        var a = Xa[this.id];
                        a && a !== E && a.position && a.position()
                    });
                    !E._isFullScreen && /center|bubble/.test(r.display) && (b(".mbsc-w-p", H).each(function () {
                        t = this.getBoundingClientRect().width;
                        K += t;
                        aa = t > aa ? t : aa
                    }), B = K > l - 16 || !0 === r.tabs, A.css({
                        width: E._isLiquid ? Math.min(r.maxPopupWidth, l - 16) : Math.ceil(B ? aa : K),
                        "white-space": B ? "" : "nowrap"
                    }));
                    !1 !== R("onPosition", {
                        target: C,
                        popup: Z,
                        hasTabs: B,
                        windowWidth: l,
                        windowHeight: k
                    }) && W && (F && (x = z.scrollLeft(), Y = z.scrollTop(), wa && w.css({
                        width: "",
                        height: ""
                    })), ca = Z.offsetWidth, y = Z.offsetHeight, S = y <= k && ca <= l, "center" == r.display ? (n = Math.max(0, x + (l - ca) / 2), q = Math.max(0, Y + (k - y) / 2)) : "bubble" == r.display ? (c = void 0 === r.anchor ? T : b(r.anchor), m = b(".mbsc-fr-arr-i", H)[0], f = (e = c.offset()).top + (N ? Y - u.offset().top : 0), g = e.left + (N ? x - u.offset().left : 0), p = c[0].offsetWidth, d = c[0].offsetHeight, h = m.offsetWidth, Oa = m.offsetHeight, n = Ia(g - (ca - p) / 2, x + 3, x + l - ca - 3), (q = f + d + Oa / 2) + y + 8 > Y + k && f - y - Oa / 2 > Y ? (V.removeClass("mbsc-fr-bubble-bottom").addClass("mbsc-fr-bubble-top"), q = f - y - Oa / 2) : V.removeClass("mbsc-fr-bubble-top").addClass("mbsc-fr-bubble-bottom"), b(".mbsc-fr-arr", H).css({left: Ia(g + p / 2 - (n + (ca - h) / 2), 0, h)}), S = q > Y && n > x && q + y <= Y + k && n + ca <= x + l) : (n = x, q = "top" == r.display ? Y : Math.max(0, Y + k - y)), F && (v = Math.max(q + y, N ? Q.scrollHeight : b(document).height()), ka = Math.max(n + ca, N ? Q.scrollWidth : b(document).width()), w.css({
                        width: ka,
                        height: v
                    }), r.scroll && "bubble" == r.display && (q + y + 8 > Y + k || f > Y + k || f + d < Y) && z.scrollTop(Math.min(f, q + y - k + 8, v - k))), M.top = Math.floor(q), M.left = Math.floor(n), V.css(M), H.removeClass("mbsc-fr-pos"), wa = l, Ba = k)
                }
            };
            E.attachShow = function (a, c) {
                var p, d = b(a), e = d.prop("readonly");
                "inline" !== r.display && ((r.showOnFocus || r.showOnTap) && d.is("input,select") && (d.prop("readonly", !0).on("mousedown.mbsc", function (a) {
                    a.preventDefault()
                }).on("focus.mbsc", function () {
                    E._isVisible && this.blur()
                }), (p = b('label[for\x3d"' + d.attr("id") + '"]')).length || (p = d.closest("label"))), d.is("select") || (r.showOnFocus && d.on("focus.mbsc", function () {
                    zc ? zc = !1 : I(c, d)
                }), r.showOnTap && (d.on("keydown.mbsc", function (a) {
                    32 != a.keyCode && 13 != a.keyCode || (a.preventDefault(), a.stopPropagation(), I(c, d))
                }), E.tap(d, function (a) {
                    a.isMbscTap && (Y = !0);
                    I(c, d)
                }), p && p.length && E.tap(p, function (a) {
                    a.target !== d[0] && I(c, d)
                }))), aa.push({readOnly: e, el: d, lbl: p}))
            };
            E.select = function () {
                W ? E.hide(!1, "set", !1, n) : n()
            };
            E.cancel = function () {
                W ? E.hide(!1, "cancel", !1, L) : L()
            };
            E.clear = function () {
                E._clearValue();
                R("onClear");
                W && E._isVisible && !E.live ? E.hide(!1, "clear", !1, x) : x()
            };
            E.enable = function () {
                r.disabled = !1;
                b.each(aa, function (a, b) {
                    b.el.is("input,select") && (b.el[0].disabled = !1)
                })
            };
            E.disable = function () {
                r.disabled = !0;
                b.each(aa, function (a, b) {
                    b.el.is("input,select") && (b.el[0].disabled = !0)
                })
            };
            E.show = function (a, c) {
                var d;
                if (!r.disabled && !E._isVisible) {
                    if (E._readValue(), !1 === R("onBeforeShow")) return !1;
                    var e, f, g, k;
                    if (yc = null, M = r.animate, t = r.buttons || [], F = N || "bubble" == r.display, ba = ke && !F && r.scrollLock, !1 !== M && ("top" == r.display ? M = M || "slidedown" : "bottom" == r.display ? M = M || "slideup" : "center" != r.display && "bubble" != r.display || (M = M || "pop")), W && (ka = Math.max(0, z.scrollTop()), p = Math.max(0, z.scrollLeft()), wa = 0, Ba = 0, ba && !m.hasClass("mbsc-fr-lock-ios") && u.css({
                            top: -ka + "px",
                            left: -p + "px"
                        }), m.addClass((r.scrollLock ? "mbsc-fr-lock" : "") + (ba ? " mbsc-fr-lock-ios" : "") + (N ? " mbsc-fr-lock-ctx" : "")), b(document.activeElement).is("input,textarea") && document.activeElement.blur(), G.activeInstance && G.activeInstance.hide(), G.activeInstance = E, Q.mbscModals = Q.mbscModals || 0, Q.mbscLock = Q.mbscLock || 0, Q.mbscModals++, r.scrollLock && Q.mbscLock++), d = '\x3cdiv lang\x3d"' + r.lang + '" class\x3d"mbsc-fr mbsc-' + r.theme + (r.baseTheme ? " mbsc-" + r.baseTheme : "") + " mbsc-fr-" + r.display + " " + (r.cssClass || "") + " " + (r.compClass || "") + (E._isLiquid ? " mbsc-fr-liq" : "") + (le ? " mbsc-fr-hb" : "") + (Y ? "" : " mbsc-no-touch") + (ba ? " mbsc-platform-ios" : "") + (0 < t.length ? 3 <= t.length ? " mbsc-fr-btn-block " : "" : " mbsc-fr-nobtn") + '"\x3e' + (W ? '\x3cdiv class\x3d"mbsc-fr-persp"\x3e\x3cdiv class\x3d"mbsc-fr-overlay"\x3e\x3c/div\x3e\x3cdiv role\x3d"dialog" tabindex\x3d"-1" class\x3d"mbsc-fr-scroll"\x3e' : "") + '\x3cdiv class\x3d"mbsc-fr-popup' + (r.rtl ? " mbsc-rtl" : " mbsc-ltr") + (r.headerText ? " mbsc-fr-has-hdr" : "") + '"\x3e' + ("bubble" === r.display ? '\x3cdiv class\x3d"mbsc-fr-arr-w"\x3e\x3cdiv class\x3d"mbsc-fr-arr-i"\x3e\x3cdiv class\x3d"mbsc-fr-arr"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e' : "") + '\x3cdiv class\x3d"mbsc-fr-w"\x3e' + (r.headerText ? '\x3cdiv class\x3d"mbsc-fr-hdr"\x3e' + (sb(r.headerText) ? r.headerText : "") + "\x3c/div\x3e" : "") + '\x3cdiv class\x3d"mbsc-fr-c"\x3e', d += E._generateContent(), d += "\x3c/div\x3e", 0 < t.length) d += function () {
                        var a, b, c, d = t.length, p;
                        p = '\x3cdiv class\x3d"mbsc-fr-btn-cont"\x3e';
                        for (b = 0; b < t.length; b++) c = r.btnReverse ? d - b - 1 : b, a = t[c], a = sb(a) ? E.buttons[a] : a, "set" === a.handler && (a.parentClass = "mbsc-fr-btn-s"), "cancel" === a.handler && (a.parentClass = "mbsc-fr-btn-c"), p += "\x3cdiv" + (r.btnWidth ? ' style\x3d"width:' + 100 / t.length + '%"' : "") + ' class\x3d"mbsc-fr-btn-w ' + (a.parentClass || "") + '"\x3e\x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"mbsc-fr-btn' + c + " mbsc-fr-btn-e " + (void 0 === a.cssClass ? r.btnClass : a.cssClass) + (a.icon ? " mbsc-ic mbsc-ic-" + a.icon : "") + '"\x3e' + (a.text || "") + "\x3c/div\x3e\x3c/div\x3e";
                        return p
                    }(), d += "\x3c/div\x3e";
                    if (d += "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e" + (W ? "\x3c/div\x3e\x3c/div\x3e" : ""), H = b(d), w = b(".mbsc-fr-persp", H), l = b(".mbsc-fr-scroll", H), A = b(".mbsc-fr-w", H), V = b(".mbsc-fr-popup", H), v = b(".mbsc-fr-hdr", H), C = H[0], X = l[0], Z = V[0], E._activeElm = b(".mbsc-fr-focus", H)[0], E._markup = H, E._isVisible = !0, E.markup = C, O = "orientationchange resize", E._markupReady(H), R("onMarkupReady", {target: C}), W) if (b(window).on("keydown", h), r.scrollLock && H.on("touchmove mousewheel wheel", function (a) {
                            S && a.preventDefault()
                        }), r.focusTrap && z.on("focusin", q), r.closeOnOverlayTap) l.on("touchstart mousedown", function (a) {
                        f || a.target != X || (f = !0, e = !1, g = ja(a, "X"), k = ja(a, "Y"))
                    }).on("touchmove mousemove", function (a) {
                        f && !e && (9 < Math.abs(ja(a, "X") - g) || 9 < Math.abs(ja(a, "Y") - k)) && (e = !0)
                    }).on("touchcancel", function () {
                        f = !1
                    }).on("touchend click", function (a) {
                        f && !e && (E.cancel(), "touchend" == a.type && Ob());
                        f = !1
                    });
                    W && ba ? setTimeout(function () {
                        K(a, c)
                    }, 100) : K(a, c)
                }
            };
            E.hide = function (a, c, d, p) {
                if (!E._isVisible || !d && !E._isValid && "set" == c || !d && !1 === R("onBeforeClose", {
                        valueText: E._tempValue,
                        button: c
                    })) return !1;
                E._isVisible = !1;
                W && (b(document.activeElement).is("input,textarea") && Z.contains(document.activeElement) && document.activeElement.blur(), G.activeInstance == E && delete G.activeInstance, b(window).off("keydown", h));
                H && (W && M && !a ? H.addClass("mbsc-anim-out mbsc-anim-trans mbsc-anim-trans-" + M).on($a, function ne() {
                    H.off($a, ne);
                    k(a)
                }).find(".mbsc-fr-popup").addClass("mbsc-anim-" + M) : k(a), E._detachEvents(H), z.off(O, g).off("focusin", q));
                p && p();
                T.trigger("blur");
                R("onClose", {valueText: E._value})
            };
            E.isVisible = function () {
                return E._isVisible
            };
            E.setVal = la;
            E.getVal = la;
            E._generateContent = la;
            E._attachEvents = la;
            E._detachEvents = la;
            E._readValue = la;
            E._clearValue = la;
            E._fillValue = la;
            E._markupReady = la;
            E._markupInserted = la;
            E._markupRemove = la;
            E._position = la;
            E.__processSettings = la;
            E.__init = la;
            E.__destroy = la;
            E._destroy = function () {
                E.hide(!0, !1, !0);
                T.off(".mbsc");
                b.each(aa, function (a, b) {
                    b.el.off(".mbsc").prop("readonly", b.readOnly);
                    b.lbl && b.lbl.off(".mbsc")
                });
                E.__destroy()
            };
            E._updateHeader = function () {
                var b = r.headerText,
                    b = b ? "function" == typeof b ? b.call(a, E._tempValue) : b.replace(/\{value\}/i, E._tempValue) : "";
                v.html(b || "\x26nbsp;")
            };
            E._processSettings = function (a) {
                var d;
                E.__processSettings(a);
                !r.touchUi && (r.display = a.display || c.display || "bubble", r.buttons = a.buttons || c.buttons || []);
                r.buttons = r.buttons || ("inline" !== r.display ? ["cancel", "set"] : []);
                r.headerText = void 0 === r.headerText ? "inline" !== r.display && "{value}" : r.headerText;
                t = r.buttons || [];
                W = "inline" !== r.display;
                N = "body" != r.context;
                u = b(r.context);
                m = N ? u : b("body,html");
                Q = u[0];
                E._$window = z = b(N ? r.context : window);
                E.live = !0;
                for (a = 0; a < t.length; a++) "ok" != (d = t[a]) && "set" != d && "set" != d.handler || (E.live = !1);
                E.buttons.set = {text: r.setText, icon: r.setIcon, handler: "set"};
                E.buttons.cancel = {text: r.cancelText, icon: r.cancelIcon, handler: "cancel"};
                E.buttons.close = {text: r.closeText, icon: r.closeIcon, handler: "cancel"};
                E.buttons.clear = {text: r.clearText, icon: r.clearIcon, handler: "clear"};
                E._isInput = T.is("input")
            };
            E._init = function (a) {
                var b = E._isVisible, c = b && !H.hasClass("mbsc-fr-pos");
                b && E.hide(!0, !1, !0);
                T.off(".mbsc");
                E.__init(a);
                E._isLiquid = "liquid" == r.layout;
                W ? (E._readValue(), E._hasContent || r.skipShow || E.attachShow(T), b && E.show(c)) : E.show();
                T.removeClass("mbsc-cloak").filter("input, select, textarea").on("change.mbsc", function () {
                    E._preventChange || E.setVal(T.val(), !0, !1);
                    E._preventChange = !1
                })
            };
            E.buttons = {};
            E.handlers = {set: E.select, cancel: E.cancel, clear: E.clear};
            E._value = null;
            E._isValid = !0;
            E._isVisible = !1;
            r = E.settings;
            R = E.trigger;
            d || E.init()
        };
    Ua.prototype._defaults = {
        lang: "en",
        setText: "Set",
        selectedText: "{count} selected",
        closeText: "Close",
        cancelText: "Cancel",
        clearText: "Clear",
        context: "body",
        maxPopupWidth: 600,
        disabled: !1,
        closeOnOverlayTap: !0,
        showOnFocus: cd || dd,
        showOnTap: !0,
        display: "center",
        scroll: !0,
        scrollLock: !0,
        tap: !0,
        touchUi: !0,
        btnClass: "mbsc-fr-btn",
        btnWidth: !0,
        focusTrap: !0,
        focusOnClose: !(dd && 8 == wb)
    };
    Ea.Frame = Ua;
    bd.frame.mobiscroll = {headerText: !1, btnWidth: !1};
    bd.scroller.mobiscroll = U({}, bd.frame.mobiscroll, {
        rows: 5,
        showLabel: !1,
        selectedLineBorder: 1,
        weekDays: "min",
        checkIcon: "ion-ios7-checkmark-empty",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    });
    Sa && b(window).on("focus", function () {
        yc && (zc = !0)
    });
    var oe = "ios" == Fa, xb = function (a, c, d) {
        function e(a) {
            Ja("onStart", {domEvent: a});
            ia.stopProp && a.stopPropagation();
            ia.prevDef && a.preventDefault();
            ia.readonly || ia.lock && X || Yb(a, this) && !ba && G.bLikN && (v && v.removeClass("mbsc-active"), P = !1, X || (v = b(a.target).closest(".mbsc-btn-e", this)).length && !v.hasClass("mbsc-disabled") && (P = !0, l = setTimeout(function () {
                v.addClass("mbsc-active")
            }, 100)), ba = !0, Y = !1, Z = !1, qa.scrolled = X, Oa = ja(a, "X"), Ha = ja(a, "Y"), M = Oa, V = 0, z = 0, A = 0, ea = new Date, aa = +Oc(sa, ma) || 0, X && u(aa, oe ? 0 : 1), "mousedown" === a.type && b(document).on("mousemove", f).on("mouseup", k))
        }

        function f(a) {
            ba && (ia.stopProp && a.stopPropagation(), M = ja(a, "X"), N = ja(a, "Y"), V = M - Oa, z = N - Ha, A = ma ? z : V, P && (Math.abs(z) > ia.thresholdY || Math.abs(V) > ia.thresholdX) && (clearTimeout(l), v.removeClass("mbsc-active"), P = !1), (qa.scrolled || !Z && Math.abs(A) > U) && (Y || Ja("onGestureStart", W), qa.scrolled = Y = !0, O || (O = !0, J = Yc(h))), ma || ia.scrollLock ? a.preventDefault() : qa.scrolled ? a.preventDefault() : 7 < Math.abs(z) && (Z = !0, qa.scrolled = !0, kc.trigger("touchend")))
        }

        function h() {
            y && (A = Ia(A, -E * y, E * y));
            u(Ia(aa + A, F - Q, ca + Q));
            O = !1
        }

        function k(a) {
            if (ba) {
                var c, d = new Date - ea;
                ia.stopProp && a.stopPropagation();
                Zc(J);
                O = !1;
                !Z && qa.scrolled && (ia.momentum && 300 > d && (c = A / d, A = Math.max(Math.abs(A), c * c / ia.speedUnit) * (0 > A ? -1 : 1)), x(A));
                P && (clearTimeout(l), v.addClass("mbsc-active"), setTimeout(function () {
                    v.removeClass("mbsc-active")
                }, 100), Z || qa.scrolled || Ja("onBtnTap", {target: v[0], domEvent: a}));
                "mouseup" == a.type && b(document).off("mousemove", f).off("mouseup", k);
                ba = !1
            }
        }

        function g(a) {
            (a = a.originalEvent || a, A = ma ? void 0 == a.deltaY ? a.wheelDelta || a.detail : a.deltaY : a.deltaX, Ja("onStart", {domEvent: a}), ia.stopProp && a.stopPropagation(), A && G.bLikN) && (a.preventDefault(), a.deltaMode && 1 == a.deltaMode && (A *= 15), A = Ia(-A, -wa, wa), aa = pa, !ia.readonly) && (Y || L(), aa + A < F && (aa = F, A = 0), aa + A > ca && (aa = ca, A = 0), O || (O = !0, J = Yc(h)), A || !Y) && (Y = !0, clearTimeout(R), R = setTimeout(function () {
                Zc(J);
                Y = O = !1;
                x(A)
            }, 200))
        }

        function q(a) {
            Ja("onStart", {domEvent: a});
            ia.readonly || (a.stopPropagation(), aa = pa, Y = !1, a.target == r ? (Ha = ja(a, "Y", !0), b(document).on("mousemove", K).on("mouseup", I)) : (Ha = m.offset().top, K(a), I()))
        }

        function K(a) {
            a = (ja(a, "Y", !0) - Ha) / w;
            A = C ? Ia(A = -(y * E * 2 + w) * a, -E * y, E * y) : (F - ca - w) * a;
            Y || L();
            Y = !0;
            u(Ia(aa + A, F - Q, ca + Q))
        }

        function I() {
            aa = pa;
            x(0);
            b(document).off("mousemove", K).off("mouseup", I)
        }

        function n(a) {
            a.stopPropagation()
        }

        function L() {
            Ja("onGestureStart", W = {
                posX: ma ? 0 : pa,
                posY: ma ? pa : 0,
                originX: ma ? 0 : aa,
                originY: ma ? aa : 0,
                direction: 0 < A ? ma ? 270 : 360 : ma ? 90 : 180
            })
        }

        function x(a) {
            var b;
            if (y && (a = Ia(a, -E * y, E * y)), b = Ia(Math.round((aa + a) / E) * E, F, ca), T) {
                if (0 > a) for (a = T.length - 1; 0 <= a; a--) {
                    if (Math.abs(b) + w >= T[a].breakpoint) {
                        xa = a;
                        la = 2;
                        b = T[a].snap2;
                        break
                    }
                } else if (0 <= a) for (a = 0; a < T.length; a++) if (Math.abs(b) <= T[a].breakpoint) {
                    xa = a;
                    la = 1;
                    b = T[a].snap1;
                    break
                }
                b = Ia(b, F, ca)
            }
            a = ia.time || (pa < F || pa > ca ? 1E3 : Math.max(1E3, Math.abs(b - pa) * ia.timeUnit));
            W.destinationX = ma ? 0 : b;
            W.destinationY = ma ? b : 0;
            W.duration = a;
            W.transitionTiming = B;
            Ja("onGestureEnd", W);
            qa.scroll(b, a)
        }

        function u(a, b, c, d) {
            var e, f = a != pa, R = 1 < b, g = b ? Ub + "transform " + Math.round(b) + "ms " + B : "", m = function () {
                clearInterval(Ba);
                clearTimeout(nb);
                X = !1;
                pa = a;
                W.posX = ma ? 0 : a;
                W.posY = ma ? a : 0;
                f && Ja("onMove", W);
                R && Ja("onAnimationEnd", W);
                d && d()
            };
            W = {
                posX: ma ? 0 : pa,
                posY: ma ? pa : 0,
                originX: ma ? 0 : aa,
                originY: ma ? aa : 0,
                direction: 0 < a - pa ? ma ? 270 : 360 : ma ? 90 : 180
            };
            pa = a;
            R && (W.destinationX = ma ? 0 : a, W.destinationY = ma ? a : 0, W.duration = b, W.transitionTiming = B, Ja("onAnimationStart", W));
            jc[Qa + "Transition"] = g;
            jc[Qa + "Transform"] = "translate3d(" + (ma ? "0," + a + "px," : a + "px,0,") + "0)";
            r && p && (e = C ? (S - a) / (y * E * 2) : (a - ca) / (F - ca), r.style[Qa + "Transition"] = g, r.style[Qa + "Transform"] = "translate3d(0," + Math.max(0, Math.min((w - p) * e, w - p)) + "px,0)");
            !f && !X || !b || 1 >= b ? m() : b && (X = !c, clearInterval(Ba), Ba = setInterval(function () {
                var b = +Oc(sa, ma) || 0;
                W.posX = ma ? 0 : b;
                W.posY = ma ? b : 0;
                Ja("onMove", W);
                2 > Math.abs(b - a) && m()
            }, 100), clearTimeout(nb), nb = setTimeout(function () {
                m()
            }, b));
            ia.sync && ia.sync(a, b, B)
        }

        var v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, ca, y, F, ba, X, Z, J, O, r, p, S, ka, Y, R, wa, Ba, E, T,
            aa, ea, Oa, Ha, jc, sa, nb, U, Ja, ma, pa, qa = this, xa = 0, la = 1, ia = c, kc = b(a);
        Vb.call(this, a, c, !0);
        qa.scrolled = !1;
        qa.scroll = function (c, d, p, e) {
            c = Ia(c = Ka(c) ? Math.round(c / E) * E : Math.ceil((b(c, a).length ? Math.round(sa.offset()[t] - b(c, a).offset()[t]) : pa) / E) * E, F, ca);
            xa = Math.round(c / E);
            aa = pa;
            S = y * E + c;
            u(c, d, p, e)
        };
        qa.refresh = function (a) {
            var b;
            w = void 0 === ia.contSize ? ma ? kc.height() : kc.width() : ia.contSize;
            ca = void 0 === ia.maxScroll ? 0 : ia.maxScroll;
            F = Math.min(ca, void 0 === ia.minScroll ? Math.min(0, ma ? w - sa.height() : w - sa.width()) : ia.minScroll);
            T = null;
            !ma && ia.rtl && (b = ca, ca = -F, F = -b);
            sb(ia.snap) && (T = [], sa.find(ia.snap).each(function () {
                var a = ma ? this.offsetTop : this.offsetLeft, b = ma ? this.offsetHeight : this.offsetWidth;
                T.push({breakpoint: a + b / 2, snap1: -a, snap2: w - a - b})
            }));
            E = Ka(ia.snap) ? ia.snap : 1;
            y = ia.snap ? ia.maxSnapScroll : 0;
            B = ia.easing;
            Q = ia.elastic ? Ka(ia.snap) ? E : Ka(ia.elastic) ? ia.elastic : 0 : 0;
            for (wa = E; 44 < wa;) wa /= 2;
            wa *= Math.round(44 / wa);
            r && (C = F == -1 / 0 || ca == 1 / 0, p = F < ca ? Math.max(20, w * w / (ca - F + w)) : 0, r.style.height = p + "px", ka.style.height = p ? "" : 0);
            void 0 === pa && (pa = ia.initialPos, xa = Math.round(pa / E));
            a || qa.scroll(ia.snap ? T ? T[xa]["snap" + la] : xa * E : pa)
        };
        qa._processSettings = function () {
            t = (ma = "Y" == ia.axis) ? "top" : "left";
            sa = ia.moveElement || kc.children().eq(0);
            jc = sa[0].style;
            U = ma ? ia.thresholdY : ia.thresholdX;
            ia.scrollbar && (H = ia.scrollbar, m = H.find(".mbsc-sc-bar"), r = m[0], ka = H[0])
        };
        qa._init = function () {
            qa.refresh();
            kc.on("touchstart mousedown", e).on("touchmove", f).on("touchend touchcancel", k);
            ia.mousewheel && kc.on("wheel mousewheel", g);
            r && H.on("mousedown", q).on("click", n);
            a.addEventListener && a.addEventListener("click", function (a) {
                qa.scrolled && (qa.scrolled = !1, a.stopPropagation(), a.preventDefault())
            }, !0)
        };
        qa._destroy = function () {
            clearInterval(Ba);
            kc.off("touchstart mousedown", e).off("touchmove", f).off("touchend touchcancel", k).off("wheel mousewheel", g);
            r && H.off("mousedown", q).off("click", n)
        };
        ia = qa.settings;
        Ja = qa.trigger;
        d || qa.init()
    };
    xb.prototype = {
        _defaults: {
            speedUnit: .0022,
            timeUnit: 3,
            initialPos: 0,
            axis: "Y",
            thresholdX: 10,
            thresholdY: 5,
            easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
            stopProp: !0,
            momentum: !0,
            mousewheel: !0,
            elastic: !0
        }
    };
    var ta = {}, ed = Sa ? window.CSS : null,
        pe = !(ed && ed.supports && ed.supports("(transform-style: preserve-3d)")) || "wp" == Fa || "android" == Fa,
        za = function (a, c, d) {
            function e(a) {
                var c, d, p = +b(this).attr("data-index");
                38 == a.keyCode ? (c = !0, d = -1) : 40 == a.keyCode ? (c = !0, d = 1) : 32 == a.keyCode && (c = !0, h(p, Z[p]._$markup.find('.mbsc-sc-itm[data-val\x3d"' + N[p] + '"]')));
                c && (a.stopPropagation(), a.preventDefault(), d && M.start(p, d))
            }

            function f() {
                M.stop()
            }

            function h(a, b) {
                var c = Z[a], d = +b.attr("data-index"), p = n(c, d), e = O._tempSelected[a],
                    f = Ka(c.multiple) ? c.multiple : 1 / 0;
                !1 !== G("onItemTap", {
                    target: b[0],
                    index: a,
                    value: p,
                    selected: b.hasClass("mbsc-sc-itm-sel")
                }) && (c.multiple && !c._disabled[p] && (void 0 !== e[p] ? (b.removeClass(B).removeAttr("aria-selected"), delete e[p]) : (1 == f && (O._tempSelected[a] = e = {}, c._$markup.find(".mbsc-sc-itm-sel").removeClass(B).removeAttr("aria-selected")), Nb(e).length < f && (b.addClass(B).attr("aria-selected", "true"), e[p] = p))), l(c, a, d, 1E3, !0, !0, c.multiple), O.live && (!c.multiple || 1 === c.multiple && F.tapSelect) && (!0 === F.setOnTap || F.setOnTap[a]) && setTimeout(function () {
                    O.select()
                }, F.tapSelect ? 0 : 200))
            }

            function k(a) {
                return -(a.max - a._offset - (a.multiple && !t ? Math.floor(F.rows / 2) : 0)) * P
            }

            function g(a) {
                return -(a.min - a._offset + (a.multiple && !t ? Math.floor(F.rows / 2) : 0)) * P
            }

            function q(a, b) {
                return (a._array ? a._map[b] : +a.getIndex(b, O)) || 0
            }

            function K(a, c) {
                var d = a.data;
                if (c >= a.min && c <= a.max) return a._array ? a.circular ? b(d).get(c % a._length) : d[c] : b.isFunction(d) ? d(c, O) : ""
            }

            function I(a) {
                return b.isPlainObject(a) ? void 0 !== a.value ? a.value : a.display : a
            }

            function n(a, b) {
                return I(K(a, b))
            }

            function L(a, b) {
                var c = Z[a];
                l(c, a, c._current + b, F.delay + 100, 1 == b ? 1 : 2)
            }

            function x(a) {
                return b.isArray(F.readonly) ? F.readonly[a] : F.readonly
            }

            function u(a, c, d) {
                var e = a._index - a._batch;
                return a.data = a.data || [], a.key = void 0 !== a.key ? a.key : c, a.label = void 0 !== a.label ? a.label : c, a._map = {}, a._array = b.isArray(a.data), a._array && (a._length = a.data.length, b.each(a.data, function (b, c) {
                    a._map[I(c)] = b
                })), a.circular = void 0 === F.circular ? void 0 === a.circular ? a._array && a._length > F.rows : a.circular : b.isArray(F.circular) ? F.circular[c] : F.circular, a.min = a._array ? a.circular ? -1 / 0 : 0 : void 0 === a.min ? -1 / 0 : a.min, a.max = a._array ? a.circular ? 1 / 0 : a._length - 1 : void 0 === a.max ? 1 / 0 : a.max, a._nr = c, a._index = q(a, N[c]), a._disabled = {}, a._batch = 0, a._current = a._index, a._first = a._index - 40, a._last = a._index + 40, a._offset = a._first, d ? (a._offset -= a._margin / P + (a._index - e), a._margin += (a._index - e) * P) : a._margin = 0, a._refresh = function (b) {
                    U(a._scroller.settings, {minScroll: k(a), maxScroll: g(a)});
                    a._scroller.refresh(b)
                }, J[a.key] = a, a
            }

            function v(a, c, d, e, f) {
                for (var p, R, S, g, m, h, r = "", k = O._tempSelected[c], v = a._disabled || {}; d <= e; d++) p = R = K(a, d), p = b.isPlainObject(p) ? p.display : p, g = void 0 === p ? "" : p, S = I(R), p = R && void 0 !== R.cssClass ? R.cssClass : "", m = R && void 0 !== R.label ? R.label : "", R = R && R.invalid, h = void 0 !== S && S == N[c] && !a.multiple, r += '\x3cdiv role\x3d"option" aria-selected\x3d"' + !!k[S] + '" class\x3d"mbsc-sc-itm ' + (f ? "mbsc-sc-itm-3d " : "") + p + " " + (h ? "mbsc-sc-itm-sel " : "") + (k[S] ? B : "") + (void 0 === S ? " mbsc-sc-itm-ph" : " mbsc-btn-e") + (R ? " mbsc-sc-itm-inv-h mbsc-disabled" : "") + (v[S] ? " mbsc-sc-itm-inv mbsc-disabled" : "") + '" data-index\x3d"' + d + '" data-val\x3d"' + S + '"' + (m ? ' aria-label\x3d"' + m + '"' : "") + (h ? ' aria-selected\x3d"true"' : "") + ' style\x3d"height:' + P + "px;line-height:" + P + "px;" + (f ? Ub + "transform:rotateX(" + (a._offset - d) * A % 360 + "deg) translateZ(" + P * F.rows / 2 + "px);" : "") + '"\x3e' + (1 < X ? '\x3cdiv class\x3d"mbsc-sc-itm-ml" style\x3d"line-height:' + Math.round(P / X) + "px;font-size:" + Math.round(P / X * .8) + 'px;"\x3e' : "") + g + (1 < X ? "\x3c/div\x3e" : "") + "\x3c/div\x3e";
                return r
            }

            function m(a, b, c, d) {
                a = Z[a];
                d = d || a._disabled;
                var e = q(a, b), f = b, p = b, S = 0, g = 0;
                if (void 0 === b && (b = n(a, e)), !0 === d[b]) {
                    for (b = 0; e - S >= a.min && d[f] && 100 > b;) b++, f = n(a, e - ++S);
                    for (b = 0; e + g < a.max && d[p] && 100 > b;) b++, p = n(a, e + ++g);
                    b = (g < S && g && 2 !== c || !S || 0 > e - S || 1 == c) && !d[p] ? p : f
                }
                return b
            }

            function H(c, d, e, f, R, g) {
                var p, S, h, r, k = O._isVisible;
                y = !0;
                r = F.validate.call(a, {values: N.slice(0), index: d, direction: e}, O) || {};
                y = !1;
                r.valid && (O._tempWheelArray = N = r.valid.slice(0));
                g || b.each(Z, function (a, f) {
                    if (k && f._$markup.find(".mbsc-sc-itm-inv").removeClass("mbsc-sc-itm-inv mbsc-disabled"), f._disabled = {}, r.disabled && r.disabled[a] && b.each(r.disabled[a], function (a, b) {
                            f._disabled[b] = !0;
                            k && f._$markup.find('.mbsc-sc-itm[data-val\x3d"' + b + '"]').addClass("mbsc-sc-itm-inv mbsc-disabled")
                        }), N[a] = f.multiple ? N[a] : m(a, N[a], e), k) {
                        if (f.multiple && void 0 !== d || f._$markup.find(".mbsc-sc-itm-sel").removeClass(B).removeAttr("aria-selected"), f.multiple) {
                            if (void 0 === d) for (var g in O._tempSelected[a]) f._$markup.find('.mbsc-sc-itm[data-val\x3d"' + g + '"]').addClass(B).attr("aria-selected", "true")
                        } else f._$markup.find('.mbsc-sc-itm[data-val\x3d"' + N[a] + '"]').addClass("mbsc-sc-itm-sel").attr("aria-selected", "true");
                        S = q(f, N[a]);
                        p = S - f._index + f._batch;
                        81 < Math.abs(p) && (h = p + 81 * (0 < p ? -1 : 1), f._offset += h, f._margin -= h * P, f._refresh());
                        f._index = S + f._batch;
                        f._scroller.scroll(-(S - f._offset + f._batch) * P, d === a || void 0 === d ? c : 1E3, R)
                    }
                });
                G("onValidated", {index: d, time: c});
                O._tempValue = F.formatValue.call(a, N, O);
                k && O._updateHeader();
                O.live && function (a, b) {
                    var c = Z[a];
                    return c && (!c.multiple || 1 !== c.multiple && b && (!0 === F.setOnTap || F.setOnTap[a]))
                }(d, g) && (O._hasValue = f || O._hasValue, w(f, f, 0, !0), f && G("onSet", {valueText: O._value}));
                f && G("onChange", {index: d, valueText: O._tempValue})
            }

            function l(a, b, c, d, e, f, g) {
                var p = n(a, c);
                void 0 !== p && (N[b] = p, a._batch = a._array ? Math.floor(c / a._length) * a._length : 0, a._index = c, setTimeout(function () {
                    H(d, b, e, !0, f, g)
                }, 10))
            }

            function w(b, c, d, e, f) {
                if (e ? O._tempValue = F.formatValue.call(a, O._tempWheelArray, O) : H(d), !f) {
                    O._wheelArray = [];
                    for (d = 0; d < N.length; d++) O._wheelArray[d] = Z[d] && Z[d].multiple ? Object.keys(O._tempSelected[d])[0] : N[d];
                    O._value = O._hasValue ? O._tempValue : null;
                    O._selected = U(!0, {}, O._tempSelected)
                }
                b && (O._isInput && r.val(O._hasValue ? O._tempValue : ""), G("onFill", {
                    valueText: O._hasValue ? O._tempValue : "",
                    change: c
                }), c && (O._preventChange = !0, r.trigger("change")))
            }

            var V, z, A, t, B, Q, M, N, W, P, C, ca, y, F, G, X, Z, J, O = this, r = b(a);
            Ua.call(this, a, c, !0);
            O.setVal = O._setVal = function (c, d, e, f, R) {
                O._hasValue = null !== c && void 0 !== c;
                O._tempWheelArray = N = b.isArray(c) ? c.slice(0) : F.parseValue.call(a, c, O) || [];
                w(d, void 0 === e ? d : e, R, !1, f)
            };
            O.getVal = O._getVal = function (a) {
                a = O._hasValue || a ? O[a ? "_tempValue" : "_value"] : null;
                return Ka(a) ? +a : a
            };
            O.setArrayVal = O.setVal;
            O.getArrayVal = function (a) {
                return a ? O._tempWheelArray : O._wheelArray
            };
            O.changeWheel = function (a, c, d) {
                var e, f;
                b.each(a, function (a, b) {
                    (f = J[a]) && (e = f._nr, U(f, b), u(f, e, !0), O._isVisible && (t && f._$3d.html(v(f, e, f._first + 40 - z + 1, f._last - 40 + z, !0)), f._$scroller.html(v(f, e, f._first, f._last)).css("margin-top", f._margin + "px"), f._refresh(y)))
                });
                !O._isVisible || O._isLiquid || y || O.position();
                y || H(c, void 0, void 0, d)
            };
            O.getValidValue = m;
            O._generateContent = function () {
                var a, c = 0, d = "", e = t ? Ub + "transform: translateZ(" + (P * F.rows / 2 + 3) + "px);" : "",
                    f = '\x3cdiv class\x3d"mbsc-sc-whl-l" style\x3d"' + e + "height:" + P + "px;margin-top:-" + (P / 2 + (F.selectedLineBorder || 0)) + 'px;"\x3e\x3c/div\x3e',
                    g = 0;
                return b.each(F.wheels, function (p, R) {
                    d += '\x3cdiv class\x3d"mbsc-w-p mbsc-sc-whl-gr-c' + (t ? " mbsc-sc-whl-gr-3d-c" : "") + (F.showLabel ? " mbsc-sc-lbl-v" : "") + '"\x3e' + f + '\x3cdiv class\x3d"mbsc-sc-whl-gr' + (t ? " mbsc-sc-whl-gr-3d" : "") + (Q ? " mbsc-sc-cp" : "") + (F.width || F.maxWidth ? '"' : '" style\x3d"max-width:' + F.maxPopupWidth + 'px;"') + "\x3e";
                    b.each(R, function (b, p) {
                        O._tempSelected[g] = U({}, O._selected[g]);
                        Z[g] = u(p, g);
                        c += F.maxWidth ? F.maxWidth[g] || F.maxWidth : F.width ? F.width[g] || F.width : 0;
                        a = void 0 !== p.label ? p.label : b;
                        d += '\x3cdiv class\x3d"mbsc-sc-whl-w ' + (p.cssClass || "") + (p.multiple ? " mbsc-sc-whl-multi" : "") + '" style\x3d"' + (F.width ? "width:" + (F.width[g] || F.width) + "px;" : (F.minWidth ? "min-width:" + (F.minWidth[g] || F.minWidth) + "px;" : "") + (F.maxWidth ? "max-width:" + (F.maxWidth[g] || F.maxWidth) + "px;" : "")) + '"\x3e' + (W ? '\x3cdiv class\x3d"mbsc-sc-bar-c"\x3e\x3cdiv class\x3d"mbsc-sc-bar"\x3e\x3c/div\x3e\x3c/div\x3e' : "") + '\x3cdiv class\x3d"mbsc-sc-whl-o" style\x3d"' + e + '"\x3e\x3c/div\x3e' + f + '\x3cdiv tabindex\x3d"0" aria-live\x3d"off" aria-label\x3d"' + a + '"' + (p.multiple ? ' aria-multiselectable\x3d"true"' : "") + ' role\x3d"listbox" data-index\x3d"' + g + '" class\x3d"mbsc-sc-whl" style\x3d"height:' + F.rows * P * (t ? 1.1 : 1) + 'px;"\x3e' + (Q ? '\x3cdiv data-index\x3d"' + g + '" data-step\x3d"1" class\x3d"mbsc-sc-btn mbsc-sc-btn-plus ' + (F.btnPlusClass || "") + '" style\x3d"height:' + P + "px;line-height:" + P + 'px;"\x3e\x3c/div\x3e\x3cdiv data-index\x3d"' + g + '" data-step\x3d"-1" class\x3d"mbsc-sc-btn mbsc-sc-btn-minus ' + (F.btnMinusClass || "") + '" style\x3d"height:' + P + "px;line-height:" + P + 'px;"\x3e\x3c/div\x3e' : "") + '\x3cdiv class\x3d"mbsc-sc-lbl"\x3e' + a + '\x3c/div\x3e\x3cdiv class\x3d"mbsc-sc-whl-c" style\x3d"height:' + C + "px;margin-top:-" + (C / 2 + 1) + "px;" + e + '"\x3e\x3cdiv class\x3d"mbsc-sc-whl-sc" style\x3d"top:' + (C - P) / 2 + 'px;"\x3e';
                        d += v(p, g, p._first, p._last) + "\x3c/div\x3e\x3c/div\x3e";
                        t && (d += '\x3cdiv class\x3d"mbsc-sc-whl-3d" style\x3d"height:' + P + "px;margin-top:-" + P / 2 + 'px;"\x3e', d += v(p, g, p._first + 40 - z + 1, p._last - 40 + z, !0), d += "\x3c/div\x3e");
                        d += "\x3c/div\x3e\x3c/div\x3e";
                        g++
                    });
                    d += "\x3c/div\x3e\x3c/div\x3e"
                }), c && (F.maxPopupWidth = c), d
            };
            O._attachEvents = function (a) {
                M = Qb(b(".mbsc-sc-btn", a), L, F.delay, x, !0);
                b(".mbsc-sc-whl", a).on("keydown", e).on("keyup", f)
            };
            O._detachEvents = function () {
                for (var a = 0; a < Z.length; a++) Z[a]._scroller.destroy()
            };
            O._markupReady = function (a) {
                b(".mbsc-sc-whl-w", V = a).each(function (a) {
                    var c, d = b(this), e = Z[a];
                    e._$markup = d;
                    e._$scroller = b(".mbsc-sc-whl-sc", this);
                    e._$3d = b(".mbsc-sc-whl-3d", this);
                    e._scroller = new xb(this, {
                        mousewheel: F.mousewheel,
                        moveElement: e._$scroller,
                        scrollbar: b(".mbsc-sc-bar-c", this),
                        initialPos: (e._first - e._index) * P,
                        contSize: F.rows * P,
                        snap: P,
                        minScroll: k(e),
                        maxScroll: g(e),
                        maxSnapScroll: 40,
                        prevDef: !0,
                        stopProp: !0,
                        timeUnit: 3,
                        easing: "cubic-bezier(0.190, 1.000, 0.220, 1.000)",
                        sync: function (a, b, c) {
                            b = b ? Ub + "transform " + Math.round(b) + "ms " + c : "";
                            t && (e._$3d[0].style[Qa + "Transition"] = b, e._$3d[0].style[Qa + "Transform"] = "rotateX(" + -a / P * A + "deg)")
                        },
                        onStart: function (b, c) {
                            c.settings.readonly = x(a)
                        },
                        onGestureStart: function () {
                            d.addClass("mbsc-sc-whl-a mbsc-sc-whl-anim");
                            G("onWheelGestureStart", {index: a})
                        },
                        onGestureEnd: function (b) {
                            var d = 90 == b.direction ? 1 : 2, f = b.duration;
                            c = Math.round(-b.destinationY / P) + e._offset;
                            l(e, a, c, f, d)
                        },
                        onAnimationStart: function () {
                            d.addClass("mbsc-sc-whl-anim")
                        },
                        onAnimationEnd: function () {
                            d.removeClass("mbsc-sc-whl-a mbsc-sc-whl-anim");
                            G("onWheelAnimationEnd", {index: a});
                            e._$3d.find(".mbsc-sc-itm-del").remove()
                        },
                        onMove: function (c) {
                            c = Math.round(-c.posY / P) + e._offset;
                            var d = c - e._current, f = e._first, p = e._last, g = f + 40 - z + 1, m = p - 40 + z;
                            d && (e._first += d, e._last += d, e._current = c, 0 < d ? (e._$scroller.append(v(e, a, Math.max(p + 1, f + d), p + d)), b(".mbsc-sc-itm", e._$scroller).slice(0, Math.min(d, p - f + 1)).remove(), t && (e._$3d.append(v(e, a, Math.max(m + 1, g + d), m + d, !0)), b(".mbsc-sc-itm", e._$3d).slice(0, Math.min(d, m - g + 1)).attr("class", "mbsc-sc-itm-del"))) : 0 > d && (e._$scroller.prepend(v(e, a, f + d, Math.min(f - 1, p + d))), b(".mbsc-sc-itm", e._$scroller).slice(Math.max(d, f - p - 1)).remove(), t && (e._$3d.prepend(v(e, a, g + d, Math.min(g - 1, m + d), !0)), b(".mbsc-sc-itm", e._$3d).slice(Math.max(d, g - m - 1)).attr("class", "mbsc-sc-itm-del"))), e._margin += d * P, e._$scroller.css("margin-top", e._margin + "px"));
                            !0
                        },
                        onBtnTap: function (c) {
                            h(a, b(c.target))
                        }
                    })
                });
                H()
            };
            O._fillValue = function () {
                O._hasValue = !0;
                w(!0, !0, 0, !0)
            };
            O._clearValue = function () {
                b(".mbsc-sc-whl-multi .mbsc-sc-itm-sel", V).removeClass(B).removeAttr("aria-selected")
            };
            O._readValue = function () {
                var c = r.val() || "", d = 0;
                "" !== c && (O._hasValue = !0);
                O._tempWheelArray = N = O._hasValue && O._wheelArray ? O._wheelArray.slice(0) : F.parseValue.call(a, c, O) || [];
                O._tempSelected = U(!0, {}, O._selected);
                b.each(F.wheels, function (a, c) {
                    b.each(c, function (a, b) {
                        Z[d] = u(b, d);
                        d++
                    })
                });
                w(!1, !1, 0, !0);
                G("onRead")
            };
            O.__processSettings = function (a) {
                F = O.settings;
                G = O.trigger;
                X = F.multiline;
                B = "mbsc-sc-itm-sel mbsc-ic mbsc-ic-" + F.checkIcon;
                (ca = !F.touchUi) && (F.tapSelect = !0, F.circular = !1, F.rows = a.rows || c.rows || 7)
            };
            O.__init = function (a) {
                a && (O._wheelArray = null);
                ca ? (F.scroll3d = !1, W = !0) : W = !1;
                Z = [];
                J = {};
                Q = F.showScrollArrows;
                t = F.scroll3d && !pe && !Q;
                P = F.height;
                C = t ? 2 * Math.round((P - .03 * (P * F.rows / 2 + 3)) / 2) : P;
                z = Math.round(1.8 * F.rows);
                A = 360 / (2 * z);
                Q && (F.rows = Math.max(3, F.rows))
            };
            O._getItemValue = I;
            O._tempSelected = {};
            O._selected = {};
            d || O.init()
        };
    za.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _responsive: !0,
        _class: "scroller",
        _presets: ta,
        _defaults: U({}, Ua.prototype._defaults, {
            minWidth: 80,
            height: 40,
            rows: 3,
            multiline: 1,
            delay: 200,
            readonly: !1,
            showLabel: !0,
            setOnTap: !1,
            wheels: [],
            preset: "",
            speedUnit: .0012,
            timeUnit: .08,
            checkIcon: "checkmark",
            compClass: "mbsc-sc",
            validate: function () {
            },
            formatValue: function (a) {
                return a.join(" ")
            },
            parseValue: function (a, c) {
                var d, e, f = [], h = [], k = 0;
                return null !== a && void 0 !== a && (f = (a + "").split(" ")), b.each(c.settings.wheels, function (a, q) {
                    b.each(q, function (a, g) {
                        e = g.data;
                        d = c._getItemValue(e[0]);
                        b.each(e, function (a, b) {
                            if (f[k] == c._getItemValue(b)) return d = c._getItemValue(b), !1
                        });
                        h.push(d);
                        k++
                    })
                }), h
            }
        })
    };
    Ea.Scroller = za;
    var qe = {
        separator: " ",
        dateFormat: "mm/dd/yy",
        dateDisplay: "MMddyy",
        timeFormat: "h:ii A",
        dayText: "Day",
        monthText: "Month",
        yearText: "Year",
        hourText: "Hours",
        minuteText: "Minutes",
        ampmText: "\x26nbsp;",
        secText: "Seconds",
        nowText: "Now",
        todayText: "Today"
    }, Ac = function (a) {
        function c(a) {
            var b, c, d, e, f = [];
            if (a) {
                for (b = 0; b < a.length; b++) if ((c = a[b]).start && c.end && !qd.test(c.start)) for (d = new Date(oa(c.start, N, B)), e = new Date(oa(c.end, N, B)); d <= e;) f.push(tb(d.getFullYear(), d.getMonth(), d.getDate())), d.setDate(d.getDate() + 1); else f.push(c);
                return f
            }
            return a
        }

        function d(a, b, c, d) {
            return Math.min(d, Math.floor(a / b) * b + c)
        }

        function e(a) {
            return a.getFullYear() + "-" + Ca(a.getMonth() + 1) + "-" + Ca(a.getDate())
        }

        function f(a, b, c, d) {
            var e;
            return void 0 === w[b] || (e = +a[w[b]], isNaN(e)) ? c ? ea[b](c) : void 0 !== V[b] ? V[b] : ea[b](d) : e
        }

        function h(a) {
            var b, c = new Date((new Date).setHours(0, 0, 0, 0));
            if (null === a) return a;
            void 0 !== w.dd && (b = a[w.dd].split("-"), b = new Date(b[0], b[1] - 1, b[2]));
            void 0 !== w.tt && (b = b || c, b = new Date(b.getTime() + a[w.tt] % 86400 * 1E3));
            var d = f(a, "y", b, c), e = f(a, "m", b, c), g = Math.min(f(a, "d", b, c), B.getMaxDayOfMonth(d, e)),
                p = f(a, "h", b, c);
            return B.getDate(d, e, g, Z && f(a, "a", b, c) ? p + 12 : p, f(a, "i", b, c), f(a, "s", b, c), f(a, "u", b, c))
        }

        function k(a, b) {
            var c, d, e = "y m d a h i s u dd tt".split(" "), f = [];
            if (null === a || void 0 === a) return a;
            for (c = 0; c < e.length; c++) void 0 !== w[d = e[c]] && (f[w[d]] = ea[d](a)), b && (V[d] = ea[d](a));
            return f
        }

        function g(a, b) {
            return !(!b && a < F) && !(!b && a > ba) && (!!q(a, y) || !q(a, G))
        }

        function q(a, b) {
            var c, d, e;
            if (b) for (d = 0; d < b.length; d++) if (e = (c = b[d]) + "", !c.start) if (Za.test(e)) {
                if (+e.replace("w", "") == a.getDay()) return !0
            } else if (eb.test(e)) if ((e = e.split("/"))[1]) {
                if (e[0] - 1 == a.getMonth() && e[1] == a.getDate()) return !0
            } else {
                if (e[0] == a.getDate()) return !0
            } else if (c = oa(c, N, B), a.getFullYear() == c.getFullYear() && a.getMonth() == c.getMonth() && a.getDate() == c.getDate()) return !0;
            return !1
        }

        function K(a, b, c, d, e, f, g) {
            var p, m, h;
            if (a) for (m = 0; m < a.length; m++) if (h = (p = a[m]) + "", !p.start) if (Za.test(h)) for (h = +h.replace("w", "") - d; h < e; h += 7) 0 <= h && (f[h + 1] = g); else eb.test(h) ? (h = h.split("/"))[1] ? h[0] - 1 == c && (f[h[1]] = g) : f[h[0]] = g : (p = oa(p, N, B), B.getYear(p) == b && B.getMonth(p) == c && (f[B.getDay(p)] = g))
        }

        function I(a, b, c, e, f, p, g, h) {
            var r, S, R, k, v, l, q, t, u, n, w, A, H, M, x = {}, Q = B.getDate(e, f, p), ka = ["a", "h", "i", "s"];
            if (a) {
                for (v = 0; v < a.length; v++) (q = a[v]).start && (q.apply = !1, t = (l = (r = q.d) + "").split("/"), r && (r.getTime && e == B.getYear(r) && f == B.getMonth(r) && p == B.getDay(r) || !Za.test(l) && (t[1] && p == t[1] && f == t[0] - 1 || !t[1] && p == t[0]) || Za.test(l) && Q.getDay() == +l.replace("w", "")) && (q.apply = !0, x[Q] = !0));
                for (v = 0; v < a.length; v++) if (q = a[v], e = 0, A = 0, p = E[c], r = T[c], n = !0, w = !0, f = !1, q.start && (q.apply || !q.d && !x[Q])) {
                    t = q.start.split(":");
                    u = q.end.split(":");
                    for (l = 0; 3 > l; l++) void 0 === t[l] && (t[l] = 0), void 0 === u[l] && (u[l] = 59), t[l] = +t[l], u[l] = +u[l];
                    if ("tt" == c) p = d(Math.round(((new Date(Q)).setHours(t[0], t[1], t[2]) - (new Date(Q)).setHours(0, 0, 0, 0)) / 1E3), m, 0, 86400), r = d(Math.round(((new Date(Q)).setHours(u[0], u[1], u[2]) - (new Date(Q)).setHours(0, 0, 0, 0)) / 1E3), m, 0, 86400); else {
                        t.unshift(11 < t[0] ? 1 : 0);
                        u.unshift(11 < u[0] ? 1 : 0);
                        Z && (12 <= t[1] && (t[1] -= 12), 12 <= u[1] && (u[1] -= 12));
                        for (l = 0; l < b; l++) void 0 !== z[l] && (H = d(t[l], aa[ka[l]], E[ka[l]], T[ka[l]]), M = d(u[l], aa[ka[l]], E[ka[l]], T[ka[l]]), S = 0, R = 0, k = 0, Z && 1 == l && (S = t[0] ? 12 : 0, R = u[0] ? 12 : 0, k = z[0] ? 12 : 0), n || (H = 0), w || (M = T[ka[l]]), (n || w) && H + S < z[l] + k && z[l] + k < M + R && (f = !0), z[l] != H && (n = !1), z[l] != M && (w = !1));
                        if (!h) for (l = b + 1; 4 > l; l++) 0 < t[l] && (e = aa[c]), u[l] < T[ka[l]] && (A = aa[c]);
                        f || (H = d(t[b], aa[c], E[c], T[c]) + e, M = d(u[b], aa[c], E[c], T[c]) - A, n && (p = H), w && (r = M))
                    }
                    if (n || w || f) for (l = p; l <= r; l += aa[c]) g[l] = !h
                }
            }
        }

        function n(a) {
            return a
        }

        function L(a, b) {
            return b ? Math.floor(new Date(a) / 864E5) : a.getMonth() + 12 * (a.getFullYear() - 1970)
        }

        function x(a) {
            return {value: a, display: (/yy/i.test(C) ? a : (a + "").substr(2, 2)) + (B.yearSuffix || "")}
        }

        function u(a) {
            var b, c, d, e = [];
            /s/i.test(a) ? c = Qc : /i/i.test(a) ? c = 60 * r : /h/i.test(a) && (c = 3600 * O);
            Ca = aa.tt = c;
            for (b = 0; 86400 > b; b += c) d = new Date((new Date).setHours(0, 0, 0, 0) + 1E3 * b), e.push({
                value: b,
                display: ra(a, d, F)
            });
            return {label: "", cssClass: "mbsc-dt-whl-time", data: e}
        }

        function v(a) {
            var b = /d/i.test(a);
            return {
                label: "",
                cssClass: "mbsc-dt-whl-date",
                min: F ? L(e(F), b) : void 0,
                max: ba ? L(e(ba), b) : void 0,
                data: function (c) {
                    var d = new Date((new Date).setHours(0, 0, 0, 0)),
                        e = b ? new Date(864E5 * c) : new Date(1970, c, 1);
                    return b && (e = new Date(e.getUTCFullYear(), e.getUTCMonth(), e.getUTCDate())), {
                        invalid: b && !g(e, !0),
                        value: c(e),
                        display: d.getTime() == e.getTime() ? B.todayText : ra(a, e, B)
                    }
                },
                getIndex: function (a) {
                    return L(a, b)
                }
            }
        }

        var m, H, l, w = {}, V = {}, z = [], A = function (a) {
                var b, c, d = {};
                if (a.is("input")) {
                    switch (a.attr("type")) {
                        case "date":
                            b = "yy-mm-dd";
                            break;
                        case "datetime":
                            b = "yy-mm-ddTHH:ii:ssZ";
                            break;
                        case "datetime-local":
                            b = "yy-mm-ddTHH:ii:ss";
                            break;
                        case "month":
                            b = "yy-mm";
                            d.dateOrder = "mmyy";
                            break;
                        case "time":
                            b = "HH:ii:ss"
                    }
                    d.format = b;
                    c = a.attr("min");
                    a = a.attr("max");
                    c && "undefined" != c && (d.min = cb(b, c));
                    a && "undefined" != a && (d.max = cb(b, a))
                }
                return d
            }(b(this)), t = U({}, a.settings), B = U(a.settings, Xb, qe, A, t), Q = B.preset,
            M = "datetime" == Q ? B.dateFormat + B.separator + B.timeFormat : "time" == Q ? B.timeFormat : B.dateFormat,
            N = A.format || M, W = B.dateWheels || B.dateFormat, P = B.timeWheels || B.timeFormat,
            C = B.dateWheels || B.dateDisplay, A = B.baseTheme || B.theme, G = c(B.invalid), y = c(B.valid),
            F = oa(B.min, N, B), ba = oa(B.max, N, B), X = /time/i.test(Q), Z = /h/.test(W), J = /D/.test(C),
            t = B.steps || {}, O = t.hour || B.stepHour || 1, r = t.minute || B.stepMinute || 1,
            p = t.second || B.stepSecond || 1, S = t.zeroBased, ka = S || !F ? 0 : F.getHours() % O,
            Y = S || !F ? 0 : F.getMinutes() % r, R = S || !F ? 0 : F.getSeconds() % p,
            wa = Math.floor(((Z ? 11 : 23) - ka) / O) * O + ka, Ba = Math.floor((59 - Y) / r) * r + Y,
            L = Math.floor((59 - Y) / r) * r + Y,
            E = {y: F ? F.getFullYear() : -1 / 0, m: 0, d: 1, h: ka, i: Y, s: R, a: 0, tt: 0},
            T = {y: ba ? ba.getFullYear() : 1 / 0, m: 11, d: 31, h: wa, i: Ba, s: L, a: 1, tt: 86400},
            aa = {y: 1, m: 1, d: 1, h: O, i: r, s: p, a: 1, tt: 1}, ea = {
                y: function (a) {
                    return B.getYear(a)
                }, m: function (a) {
                    return B.getMonth(a)
                }, d: function (a) {
                    return B.getDay(a)
                }, h: function (a) {
                    a = a.getHours();
                    return d(Z && 12 <= a ? a - 12 : a, O, ka, wa)
                }, i: function (a) {
                    return d(a.getMinutes(), r, Y, Ba)
                }, s: function (a) {
                    return d(a.getSeconds(), p, R, L)
                }, u: function (a) {
                    return a.getMilliseconds()
                }, a: function (a) {
                    return 11 < a.getHours() ? 1 : 0
                }, dd: e, tt: function (a) {
                    return d(Math.round((a.getTime() - (new Date(a)).setHours(0, 0, 0, 0)) / 1E3), m, 0, 86400)
                }
            };
        return a.getVal = function (b) {
            return a._hasValue || b ? ub(h(a.getArrayVal(b)), B, N) : null
        }, a.getDate = function (b) {
            return a._hasValue || b ? h(a.getArrayVal(b)) : null
        }, a.setDate = function (b, c, d, e, f) {
            a.setArrayVal(k(b), c, f, e, d)
        }, l = function () {
            var a, b, c, d, e, f, g, m = 0, h = [], l = [], k = [];
            if (/date/i.test(Q)) {
                a = W.split(/\|/.test(W) ? "|" : "");
                for (c = 0; c < a.length; c++) if (b = a[c], e = 0, b.length) if (/y/i.test(b) && (V.y = 1, e++), /m/i.test(b) && (V.y = 1, V.m = 1, e++), /d/i.test(b) && (V.y = 1, V.m = 1, V.d = 1, e++), 1 < e && void 0 === w.dd) w.dd = m, m++, l.push(v(b)), k = l, H = !0; else if (/y/i.test(b) && void 0 === w.y) w.y = m, m++, l.push({
                    cssClass: "mbsc-dt-whl-y",
                    label: B.yearText,
                    min: F ? B.getYear(F) : void 0,
                    max: ba ? B.getYear(ba) : void 0,
                    data: x,
                    getIndex: n
                }); else if (/m/i.test(b) && void 0 === w.m) {
                    w.m = m;
                    f = [];
                    m++;
                    for (d = 0; 12 > d; d++) g = C.replace(/[dy]/gi, "").replace(/mm/, Ca(d + 1) + (B.monthSuffix || "")).replace(/m/, d + 1 + (B.monthSuffix || "")), f.push({
                        value: d,
                        display: /MM/.test(g) ? g.replace(/MM/, '\x3cspan class\x3d"mbsc-dt-month"\x3e' + B.monthNames[d] + "\x3c/span\x3e") : g.replace(/M/, '\x3cspan class\x3d"mbsc-dt-month"\x3e' + B.monthNamesShort[d] + "\x3c/span\x3e")
                    });
                    l.push({cssClass: "mbsc-dt-whl-m", label: B.monthText, data: f})
                } else if (/d/i.test(b) && void 0 === w.d) {
                    w.d = m;
                    f = [];
                    m++;
                    for (d = 1; 32 > d; d++) f.push({
                        value: d,
                        display: (/dd/i.test(oa) ? Ca(d) : d) + (B.daySuffix || "")
                    });
                    l.push({cssClass: "mbsc-dt-whl-d", label: B.dayText, data: f})
                }
                h.push(l)
            }
            if (/time/i.test(Q)) {
                a = P.split(/\|/.test(P) ? "|" : "");
                for (c = 0; c < a.length; c++) if (b = a[c], e = 0, b.length && (/h/i.test(b) && (V.h = 1, e++), /i/i.test(b) && (V.i = 1, e++), /s/i.test(b) && (V.s = 1, e++), /a/i.test(b) && e++), 1 < e && void 0 === w.tt) w.tt = m, m++, k.push(u(b)); else if (/h/i.test(b) && void 0 === w.h) {
                    f = [];
                    w.h = m;
                    V.h = 1;
                    m++;
                    for (d = ka; d < (Z ? 12 : 24); d += O) f.push({
                        value: d,
                        display: Z && 0 === d ? 12 : /hh/i.test(S) ? Ca(d) : d
                    });
                    k.push({cssClass: "mbsc-dt-whl-h", label: B.hourText, data: f})
                } else if (/i/i.test(b) && void 0 === w.i) {
                    f = [];
                    w.i = m;
                    V.i = 1;
                    m++;
                    for (d = Y; 60 > d; d += r) f.push({value: d, display: /ii/i.test(S) ? Ca(d) : d});
                    k.push({cssClass: "mbsc-dt-whl-i", label: B.minuteText, data: f})
                } else if (/s/i.test(b) && void 0 === w.s) {
                    f = [];
                    w.s = m;
                    V.s = 1;
                    m++;
                    for (d = R; 60 > d; d += p) f.push({value: d, display: /ss/i.test(S) ? Ca(d) : d});
                    k.push({cssClass: "mbsc-dt-whl-s", label: B.secText, data: f})
                } else /a/i.test(b) && void 0 === w.a && (w.a = m, m++, k.push({
                    cssClass: "mbsc-dt-whl-a",
                    label: B.ampmText,
                    data: /b/.test(b) ? [{value: 0, display: B.amText.toUpperCase()}, {
                        value: 1,
                        display: B.pmText.toUpperCase()
                    }] : [{value: 0, display: B.amText}, {value: 1, display: B.pmText}]
                }));
                k != l && h.push(k)
            }
            return h
        }(), a._format = M, a._order = w, a.handlers.now = function () {
            a.setDate(new Date, a.live, 1E3, !0, !0)
        }, a.buttons.now = {text: B.nowText, icon: B.nowIcon, handler: "now"}, {
            minWidth: H && X ? {
                bootstrap: 46,
                ios: 50,
                material: 46,
                mobiscroll: 46,
                windows: 50
            }[A] : void 0, compClass: "mbsc-dt mbsc-sc", wheels: l, headerText: !!B.headerText && function () {
                return ra(M, h(a.getArrayVal(!0)), B)
            }, formatValue: function (a) {
                return ra(N, h(a), B)
            }, parseValue: function (a) {
                return a || (V = {}), k(oa(a || B.defaultValue || new Date, N, B, void 0), !!a)
            }, validate: function (c) {
                var d, e, f, p;
                d = c.index;
                var m = c.direction, l = B.wheels[0][w.d], r = function (a, b) {
                    var c, d, e = !1, f = !1, p = 0, m = 0, l = F ? h(k(F)) : -1 / 0, r = ba ? h(k(ba)) : 1 / 0;
                    if (g(a)) return a;
                    if (a < l && (a = l), a > r && (a = r), c = a, d = a, 2 !== b) for (e = g(c, !0); !e && c < r;) e = g(c = new Date(c.getTime() + 864E5), !0), p++;
                    if (1 !== b) for (f = g(d, !0); !f && d > l;) f = g(d = new Date(d.getTime() - 864E5), !0), m++;
                    return 1 === b && e ? c : 2 === b && f ? d : m <= p && f ? d : c
                }(h(c.values), m);
                c = k(r);
                var S = [], R = {}, v = ea.y(r), t = ea.m(r), q = B.getMaxDayOfMonth(v, t), u = !0, n = !0;
                if (b.each("dd y m d tt a h i s".split(" "), function (a, c) {
                        if (void 0 !== w[c]) {
                            var d = E[c], f = T[c], p = ea[c](r);
                            if (S[w[c]] = [], u && F && (d = ea[c](F)), n && ba && (f = ea[c](ba)), "y" != c && "dd" != c) for (e = E[c]; e <= T[c]; e += aa[c]) (e < d || e > f) && S[w[c]].push(e);
                            if (p < d && (p = d), p > f && (p = f), u && (u = p == d), n && (n = p == f), "d" == c) d = B.getDate(v, t, 1).getDay(), f = {}, K(G, v, t, d, q, f, 1), K(y, v, t, d, q, f, 0), b.each(f, function (a, b) {
                                b && S[w[c]].push(a)
                            })
                        }
                    }), X && b.each(["a", "h", "i", "s", "tt"], function (c, d) {
                        var e = ea[d](r), f = ea.d(r), p = {};
                        void 0 !== w[d] && (I(G, c, d, v, t, f, p, 0), I(y, c, d, v, t, f, p, 1), b.each(p, function (a, b) {
                            b && S[w[d]].push(a)
                        }), z[c] = a.getValidValue(w[d], e, m, p))
                    }), l && (l._length !== q || J && (void 0 === d || d === w.y || d === w.m))) {
                    R[w.d] = l;
                    l.data = [];
                    for (d = 1; d <= q; d++) p = B.getDate(v, t, d).getDay(), f = C.replace(/[my|]/gi, "").replace(/dd/, (10 > d ? "0" + d : d) + (B.daySuffix || "")).replace(/d/, d + (B.daySuffix || "")), l.data.push({
                        value: d,
                        display: /DD/.test(f) ? f.replace(/DD/, '\x3cspan class\x3d"mbsc-dt-day"\x3e' + B.dayNames[p] + "\x3c/span\x3e") : f.replace(/D/, '\x3cspan class\x3d"mbsc-dt-day"\x3e' + B.dayNamesShort[p] + "\x3c/span\x3e")
                    });
                    a._tempWheelArray[w.d] = c[w.d];
                    a.changeWheel(R)
                }
                return {disabled: S, valid: c}
            }
        }
    }, re = {
        controls: ["calendar"],
        firstDay: 0,
        weekDays: "short",
        maxMonthWidth: 170,
        breakPointMd: 768,
        months: 1,
        pageBuffer: 1,
        weeks: 6,
        highlight: !0,
        outerMonthChange: !0,
        quickNav: !0,
        yearChange: !0,
        tabs: "auto",
        todayClass: "mbsc-cal-today",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left6",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right6",
        dateText: "Date",
        timeText: "Time",
        todayText: "Today",
        prevMonthText: "Previous Month",
        nextMonthText: "Next Month",
        prevYearText: "Previous Year",
        nextYearText: "Next Year"
    }, fd = function (a) {
        function c(a) {
            a.hasClass("mbsc-cal-h") || a.addClass("mbsc-cal-h")
        }

        function d(b) {
            b.hasClass("mbsc-cal-h") ? b.hasClass("mbsc-cal-h") && (b.removeClass("mbsc-cal-h"), a._onSelectShow()) : c(b)
        }

        function e(a, b, c) {
            a[b] = a[b] || [];
            a[b].push(c)
        }

        function f(a, c, d) {
            var f, p, g, m, l = D.getYear(c), h = D.getMonth(c), r = {};
            return a && b.each(a, function (a, b) {
                if (f = b.d || b.start || b, p = f + "", b.start && b.end) for (m = Ab(oa(b.start, Oa, D)), g = Ab(oa(b.end, Oa, D)); m <= g;) e(r, m, b), m.setDate(m.getDate() + 1); else if (Za.test(p)) {
                    var S = +p.replace("w", ""), k = 0, R = c.getDay();
                    1 < D.firstDay - R + 1 && (k = 7);
                    for (m = D.getDate(l, h, S - k - R + D.getDay(c)); m <= d;) e(r, m, b), m.setDate(m.getDate() + 7)
                } else if (eb.test(p)) if ((p = p.split("/"))[1]) for (m = D.getDate(l, p[0] - 1, p[1]); m <= d;) e(r, m, b), m = D.getDate(D.getYear(m) + 1, D.getMonth(m), p[0]); else for (m = D.getDate(l, h, p[0]); m <= d;) e(r, m, b), m = D.getDate(D.getYear(m), D.getMonth(m) + 1, p[0]); else e(r, Ab(oa(f, Oa, D)), b)
            }), r
        }

        function h(a) {
            return ' style\x3d"' + (xa ? "transform: translateY(" + 100 * a + "%)" : "left:" + 100 * a * va + "%") + '"'
        }

        function k(a) {
            return A(a, Ga - 1) > ia && (a = A(ia, 1 - Ga)), a < ya && (a = ya), a
        }

        function g(b) {
            var c = A(b, -hb - ob);
            b = A(b, -hb + Ga + ob);
            ja = f(D.invalid, c, b);
            Na = f(D.valid, c, b);
            na = f(D.labels || D.events || D.marked || D.colors, c, b);
            a._onGenMonth(c, b)
        }

        function q(a) {
            var b = D.getYear(a), c = D.getMonth(a);
            J = T = a;
            m(a);
            Aa("onMonthChange", {year: b, month: c});
            Aa("onMonthLoading", {year: b, month: c});
            Aa("onPageChange", {firstDay: a});
            Aa("onPageLoading", {firstDay: a});
            g(a)
        }

        function K(a) {
            var c = D.getYear(a), d = D.getMonth(a);
            void 0 !== fb && L(a, fb, !0);
            b(".mbsc-cal-slide", ea.$scroller).removeClass("mbsc-cal-slide-a");
            b(".mbsc-cal-slide", ea.$scroller).slice(ob, ob + Ga).addClass("mbsc-cal-slide-a");
            void 0 === fb && (Aa("onMonthLoaded", {year: c, month: d}), Aa("onPageLoaded", {firstDay: a}));
            x(J, ea.focus);
            ea.focus = !1
        }

        function I(a, b) {
            var c, d = D.getYear(a),
                e = '\x3cdiv class\x3d"mbsc-cal-slide"' + h(b) + '\x3e\x3cdiv role\x3d"grid" class\x3d"mbsc-cal-table"\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e';
            for (c = 0; 12 > c; c++) c && 0 == c % 3 && (e += '\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e'), e += '\x3cdiv role\x3d"gridcell" tabindex\x3d"-1" aria-label\x3d"' + d + '" data-val\x3d"' + d + '" class\x3d"mbsc-cal-cell mbsc-btn-e ' + (d < Ia || d > za ? " mbsc-disabled " : "") + (d == D.getYear(T) ? Ba : "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-cell-i mbsc-cal-cell-txt"\x3e' + d + Xa + "\x3c/div\x3e\x3c/div\x3e", d++;
            return e + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
        }

        function n(c, d) {
            var e, f, p, m, g, l, S, k, R, v, t, q, u, B, n, w, z = 1, A = 0, T = D.getYear(c), H = D.getMonth(c),
                M = D.getDay(c), x = null !== D.defaultValue || a._hasValue ? a.getDate(!0) : null,
                Q = D.getDate(T, H, M).getDay(),
                E = '\x3cdiv class\x3d"mbsc-cal-slide"' + h(d) + '\x3e\x3cdiv role\x3d"grid" class\x3d"mbsc-cal-table"\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e';
            0 < D.firstDay - Q && (A = 7);
            for (w = 0; w < 7 * r; w++) {
                n = w + D.firstDay - A;
                p = (e = D.getDate(T, H, n - Q + M)).getFullYear();
                m = e.getMonth();
                g = e.getDate();
                l = D.getMonth(e);
                S = D.getDay(e);
                B = D.getMaxDayOfMonth(p, m);
                k = p + "-" + (m + 1) + "-" + g;
                f = U;
                R = {
                    valid: !(e < ya) && !(e > ia) && (void 0 === ja[e] || void 0 !== Na[e]),
                    selected: x && x.getFullYear() === p && x.getMonth() === m && x.getDate() === g
                };
                t = e;
                var ka = u = void 0, y, C = void 0, K = void 0;
                v = void 0;
                var N = !!na[t] && na[t], I = N && N[0].background, J = "", Y = "";
                if (N) {
                    C = '\x3cdiv class\x3d"mbsc-cal-marks"\x3e';
                    for (q = 0; q < N.length; q++) J += ((y = N[q]).cssClass || "") + " ", C += '\x3cdiv class\x3d"mbsc-cal-mark"' + (y.color ? ' style\x3d"background:' + y.color + ';"' : "") + "\x3e\x3c/div\x3e", y.icon && (Y += '\x3cspan class\x3d"mbsc-ic mbsc-ic-' + y.icon + '"' + (y.text ? "" : y.color ? ' style\x3d"color:' + y.color + ';"' : "") + "\x3e\x3c/span\x3e\n");
                    C += "\x3c/div\x3e";
                    sa && (N[0] && (u = N[0].text, ka = N[0].color), u ? K = '\x3cdiv class\x3d"mbsc-cal-txt" title\x3d"' + b("\x3cdiv\x3e" + u + "\x3c/div\x3e").text() + '"' + (ka ? ' style\x3d"background:' + ka + ";color:" + rd(ka) + ';"' : "") + "\x3e" + Y + u + "\x3c/div\x3e" : Y && (K = '\x3cdiv class\x3d"mbsc-cal-txt mbsc-cal-icons"\x3e' + Y + "\x3c/div\x3e"))
                }
                t = U(v = {
                    marked: N,
                    background: I,
                    cssClass: J,
                    ariaLabel: sa ? u : "",
                    markup: sa ? K : jc ? C : ""
                }, a._getDayProps(t, v));
                v = (R = f(R, t)).valid;
                t = R.selected;
                f = R.cssClass;
                q = (new Date(e)).setHours(12, 0, 0, 0) === (new Date).setHours(12, 0, 0, 0);
                u = l !== H;
                aa[k] = R;
                w && 0 == w % 7 && (E += '\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e');
                da && 0 == w % 7 && ("month" == da && u && 1 < z ? z = 1 == g ? 1 : 2 : "year" == da && (z = D.getWeekNumber(D.getDate(p, m, g + (7 - D.firstDay + 1) % 7))), E += '\x3cdiv role\x3d"gridcell" class\x3d"mbsc-cal-cell mbsc-cal-week-nr"\x3e' + z + "\x3c/div\x3e", z++);
                E += '\x3cdiv role\x3d"gridcell" tabindex\x3d"-1" aria-label\x3d"' + (q ? D.todayText + ", " : "") + D.dayNames[e.getDay()] + ", " + D.monthNames[l] + " " + S + " " + (R.ariaLabel ? ", " + R.ariaLabel : "") + '"' + (u && !Sa ? ' aria-hidden\x3d"true"' : ' data-full\x3d"' + k + '"') + (t ? ' aria-selected\x3d"true"' : "") + (v ? "" : ' aria-disabled\x3d"true"') + ' class\x3d"mbsc-cal-cell mbsc-cal-day mbsc-cal-day' + n % 7 + " " + (D.dayClass || "") + " " + (t ? Ba : "") + (q ? " " + D.todayClass : "") + (f ? " " + f : "") + (1 == S ? " mbsc-cal-day-first" : "") + (S == B ? " mbsc-cal-day-last" : "") + (u ? " mbsc-cal-day-diff" : "") + (v ? " mbsc-btn-e" : " mbsc-disabled") + (R.marked ? " mbsc-cal-day-marked" : "") + (R.background ? " mbsc-cal-day-colored" : "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-cell-i mbsc-cal-day-i"\x3e\x3cdiv class\x3d"mbsc-cal-day-date mbsc-cal-cell-txt"' + (R.background ? ' style\x3d"background:' + R.background + ";color:" + rd(R.background) + '"' : "") + "\x3e" + S + "\x3c/div\x3e" + (R.markup || "") + "\x3c/div\x3e\x3c/div\x3e"
            }
            return E + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
        }

        function L(a, b, c) {
            var d = D.getYear(a), e = D.getMonth(a), f = ea ? ea.pos : 0, p = "";
            if (r) for (b || (Aa("onMonthLoading", {
                year: d,
                month: e
            }), Aa("onPageLoading", {firstDay: a})), g(a), b = 0; b < Da; b++) p += n(A(a, b - hb - ob), f + b - ob);
            return fb = void 0, c && ea && (ea.$scroller.html(p), Aa("onMonthLoaded", {
                year: d,
                month: e
            }), Aa("onPageLoaded", {firstDay: a})), p
        }

        function x(a, c) {
            ea.$active && ea.$active.attr("tabindex", "-1");
            ea.$active = b('.mbsc-cal-slide-a .mbsc-cal-day[data-full\x3d"' + a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate() + '"]', ea.$scroller).attr("tabindex", "0");
            c && ea.$active.length && ea.$active[0].focus()
        }

        function u(a, c) {
            b(".mbsc-selected", c).removeClass(Ba).removeAttr("aria-selected");
            b('.mbsc-cal-cell[data-val\x3d"' + a + '"]', c).addClass(Ba).attr("aria-selected", "true")
        }

        function v(c, d, e, f) {
            var p, g;
            c < ya && (c = ya);
            c > ia && (c = ia);
            if ("calendar" === Ta || d) Ha && r && (g = k(z(c)), Ma && (c < A(T, -hb) || c >= A(T, Ga - hb)) && (p = pa ? D.getMonth(g) - D.getMonth(T) + 12 * (D.getYear(g) - D.getYear(T)) : Math.trunc(Math.round((g - T) / 864E5) / (7 * r))) && (ea.queue = [], ea.focus = f && e, a._isSetDate = !0, B(ea, p, e), a._isSetDate = !1), p && e || x(c, f), d || (d = c, e = ea && ea.$scroller, D.highlight && ea && (b(".mbsc-selected", e).removeClass(Ba).removeAttr("aria-selected"), (null !== D.defaultValue || a._hasValue) && b('.mbsc-cal-day[data-full\x3d"' + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + '"]', e).addClass(Ba).attr("aria-selected", "true"))), pa || m(c, !0), J = c, Ma = !0), a._onSetDate(c, p)
        }

        function m(a, c) {
            var d, e, f, p = D.getYear(a), g = D.getMonth(a);
            e = p + Xa;
            if (nb) {
                if (u(g, Ka.$scroller), u(p, Wa.$scroller), B(Wa, Math.floor(p / 12) - Math.floor(D.getYear(Wa.first) / 12), !0), b(".mbsc-cal-cell", Ka.$scroller).removeClass("mbsc-disabled"), p === Ia) for (d = 0; d < Qa; d++) b('.mbsc-cal-cell[data-val\x3d"' + d + '"]', Ka.$scroller).addClass("mbsc-disabled");
                if (p === za) for (d = ra + 1; 12 >= d; d++) b('.mbsc-cal-cell[data-val\x3d"' + d + '"]', Ka.$scroller).addClass("mbsc-disabled")
            }
            c || (H(b(".mbsc-cal-prev-m", C), A(a, -hb) <= ya), H(b(".mbsc-cal-next-m", C), A(a, Ga - hb) > ia), H(b(".mbsc-cal-prev-y", C), D.getDate(p - 1, g + 1, 1) <= ya), H(b(".mbsc-cal-next-y", C), D.getDate(p + 1, g, 1) > ia));
            X.attr("aria-label", p).html(e);
            for (d = 0; d < Ga; d++) a = D.getDate(p, g - hb + d, 1), e = D.getYear(a), f = D.getMonth(a), e += Xa, G.eq(d).attr("aria-label", D.monthNames[f] + (ua ? "" : " " + p)).html((!ua && yb < Ca ? e + " " : "") + Fa[f] + (!ua && yb > Ca ? " " + e : ""))
        }

        function H(a, b) {
            b ? a.addClass(wa).attr("aria-disabled", "true") : a.removeClass(wa).removeAttr("aria-disabled")
        }

        function l(b) {
            var c = a.getDate(!0), d = b.attr("data-full"), e = d ? d.split("-") : [], e = tb(e[0], e[1] - 1, e[2]),
                c = tb(e.getFullYear(), e.getMonth(), e.getDate(), c.getHours(), c.getMinutes(), c.getSeconds()),
                f = b.hasClass("mbsc-selected");
            !Sa && b.hasClass("mbsc-cal-day-diff") || !1 === Aa("onDayChange", U(aa[d], {
                date: c,
                target: b[0],
                selected: f
            })) || D.readonly || b.hasClass("mbsc-disabled") || a._selectDay(b, e, c, f)
        }

        function w(a) {
            c(y);
            v(D.getDate(D.getYear(ea.first), a.attr("data-val"), 1), !0, !0)
        }

        function V(a) {
            c(Z);
            v(D.getDate(a.attr("data-val"), D.getMonth(ea.first), 1), !0, !0)
        }

        function z(a) {
            var b = D.getYear(a), c = D.getMonth(a), d = a.getDay(), e = 0;
            return 0 < D.firstDay - d && (e = 7), pa ? D.getDate(b, c, 1) : D.getDate(b, c, D.firstDay - e - d + D.getDay(a))
        }

        function A(a, b) {
            var c = D.getYear(a), d = D.getMonth(a), e = D.getDay(a);
            return pa ? D.getDate(c, d + b, 1) : D.getDate(c, d, e + b * r * 7)
        }

        function t(a, b) {
            var c = 12 * Math.floor(D.getYear(a) / 12);
            return D.getDate(c + 12 * b, 0, 1)
        }

        function B(c, d, e, f) {
            d && a._isVisible && (c.queue.push(arguments), 1 == c.queue.length && function se(a, c, d, e) {
                var f, p, g = "", m = a.$scroller, l = a.buffer, h = a.offset, r = a.pages, S = a.total, R = a.first,
                    k = a.genPage, t = a.getFirst, v = 0 < c ? Math.min(c, l) : Math.max(c, -l),
                    q = a.pos * va + v - c + h, u = Math.abs(c) > l;
                a.callback && (a.load(), a.callback());
                a.first = t(R, c);
                a.pos += v * va;
                a.changing = !0;
                a.load = function () {
                    if (u) {
                        for (f = 0; f < r; f++) g += k(t(R, p = c + f - h), q + p);
                        0 < c ? (b(".mbsc-cal-slide", m).slice(-r).remove(), m.append(g)) : 0 > c && (b(".mbsc-cal-slide", m).slice(0, r).remove(), m.prepend(g))
                    }
                };
                a.callback = function () {
                    var d = Math.abs(v), g = "";
                    for (f = 0; f < d; f++) g += k(t(R, p = c + f - h - l + (0 < c ? S - d : 0)), q + p);
                    if (0 < c ? (m.append(g), b(".mbsc-cal-slide", m).slice(0, v).remove()) : 0 > c && (m.prepend(g), b(".mbsc-cal-slide", m).slice(v).remove()), u) {
                        g = "";
                        for (f = 0; f < d; f++) g += k(t(R, p = c + f - h - l + (0 < c ? 0 : S - d)), q + p);
                        0 < c ? (b(".mbsc-cal-slide", m).slice(0, v).remove(), m.prepend(g)) : 0 > c && (b(".mbsc-cal-slide", m).slice(v).remove(), m.append(g))
                    }
                    M(a);
                    e && e();
                    a.callback = null;
                    a.load = null;
                    a.queue.shift();
                    u = !1;
                    a.queue.length ? se.apply(this, a.queue[0]) : (a.changing = !1, a.onAfterChange(a.first))
                };
                a.onBeforeChange(a.first);
                a.load();
                a.scroller.scroll(-a.pos * a.size, d ? 200 : 0, !1, a.callback)
            }(c, d, e, f))
        }

        function Q(c, d, e, f, p, g, m, l, h, r, S, R, k) {
            var v = xa ? "Y" : "X", t = {
                $scroller: b(".mbsc-cal-scroll", c),
                queue: [],
                buffer: f,
                offset: p,
                pages: g,
                first: l,
                total: m,
                pos: 0,
                min: d,
                max: e,
                genPage: R,
                getFirst: k,
                onBeforeChange: r,
                onAfterChange: S
            };
            return t.scroller = new xb(c, {
                axis: v,
                easing: "",
                contSize: 0,
                maxSnapScroll: f,
                mousewheel: D.mousewheel,
                time: 200,
                lock: !0,
                rtl: qa,
                stopProp: !1,
                minScroll: 0,
                maxScroll: 0,
                onBtnTap: function (a) {
                    "touchend" == a.domEvent.type && Ob();
                    h(b(a.target))
                },
                onAnimationEnd: function (a) {
                    R && B(t, Math.round((-t.pos * t.size - a["pos" + v]) / t.size) * va)
                }
            }), a._scrollers.push(t.scroller), t
        }

        function M(a) {
            var b, c = 0, d = 0;
            b = a.first;
            if (a.getFirst) {
                for (d = c = a.buffer; d && a.getFirst(b, d + a.pages - a.offset - 1) > a.max;) d--;
                for (; c && a.getFirst(b, 1 - c - a.offset) <= a.min;) c--
            }
            b = Math.round(p / a.pages);
            ma && a.size != b && a.$scroller[xa ? "height" : "width"](b);
            U(a.scroller.settings, {snap: b, minScroll: (-a.pos * va - d) * b, maxScroll: (-a.pos * va + c) * b});
            a.size = b;
            a.scroller.refresh()
        }

        function N(b) {
            a._isVisible && Ha && r && (ea && ea.changing ? fb = b : L(T, b, !0));
            a._onRefresh(b)
        }

        var W, P, C, G, y, F, ba, X, Z, J, O, r, p, S, ka, Y, R, wa, Ba, E, T, aa, ea, Oa, Ha, jc, sa, nb, ja, Ja, ma,
            pa, qa, xa, na, ia, ta, ra, za, ya, Ea, Qa, Ia, Ca, Fa, Ka, Ma, fb, ob, Ga, hb, Da, va, D, Sa, Aa, Na, Ta,
            da, Pa, ua, yb, Wa, Xa, $a, pb, Ua, Ya = this;
        return Y = {}, R = [], Aa = a.trigger, W = b(Ya), Ua = U({}, a.settings), $a = (D = U(a.settings, re, Ua)).controls.join(","), qa = D.rtl, ob = D.pageBuffer, da = D.weekCounter, r = D.weeks, pa = 6 == r, xa = "vertical" == D.calendarScroll, ka = "inline" == D.display ? W.is("div") ? W : W.parent() : a._$window, Pa = "full" == D.weekDays ? "" : "min" == D.weekDays ? "Min" : "Short", pb = D.layout || ("inline" == D.display || /top|bottom/.test(D.display) && D.touchUi ? "liquid" : ""), S = (ma = "liquid" == pb) ? null : D.calendarWidth, va = qa && !xa ? -1 : 1, wa = "mbsc-disabled " + (D.disabledClass || ""), E = "mbsc-selected " + (D.selectedTabClass || ""), Ba = "mbsc-selected " + (D.selectedClass || ""), $a.match(/calendar/) && (Y.calendar = 1, Ha = !0), $a.match(/date/) && !Ha && (Y.date = 1), $a.match(/time/) && (Y.time = 1), D.controls.forEach(function (a) {
            Y[a] && R.push(a)
        }), nb = D.quickNav && Ha && pa, ua = D.yearChange && pa, ma && Ha && "center" == D.display && (a._isFullScreen = !0), D.layout = pb, D.preset = (Y.date || Ha ? "date" : "") + (Y.time ? "time" : ""), O = Ac.call(this, a), Fa = ua ? D.monthNamesShort : D.monthNames, Xa = D.yearSuffix || "", Ca = (D.dateWheels || D.dateFormat).search(/m/i), yb = (D.dateWheels || D.dateFormat).search(/y/i), Oa = a._format, D.min && (ya = Ab(oa(D.min, Oa, D)), Ia = D.getYear(ya), Qa = D.getMonth(ya), Ea = D.getDate(12 * Math.floor(Ia / 12), 0, 1)), D.max && (ia = Ab(oa(D.max, Oa, D)), za = D.getYear(ia), ra = D.getMonth(ia), ta = D.getDate(12 * Math.floor(za / 12), 0, 1)), a.refresh = function () {
            N(!1)
        }, a.redraw = function () {
            N(!0)
        }, a.navigate = function (a, b) {
            v(a, !0, b)
        }, a.changeTab = function (c) {
            a._isVisible && Y[c] && Ta != c && (Ta = c, b(".mbsc-cal-tab", C).removeClass(E).removeAttr("aria-selected"), b('.mbsc-cal-tab[data-control\x3d"' + c + '"]', C).addClass(E).attr("aria-selected", "true"), ba.addClass("mbsc-cal-h"), Y[Ta].removeClass("mbsc-cal-h"), "calendar" == Ta && v(a.getDate(!0), !1, !0), a._showDayPicker(), a.trigger("onTabChange", {tab: Ta}))
        }, a._onGenMonth = la, a._onSelectShow = la, a._onSetDate = la, a._onRefresh = la, a._getDayProps = la, a._prepareObj = f, a._showDayPicker = function () {
            nb && (c(Z), c(y))
        }, a._selectDay = a.__selectDay = function (b, c, d) {
            b = a.live;
            Ma = D.outerMonthChange;
            Ja = !0;
            a.setDate(d, b, 1E3, !b, !0);
            b && Aa("onSet", {valueText: a._value})
        }, U(O, {
            labels: null, compClass: "mbsc-calendar mbsc-dt mbsc-sc", onMarkupReady: function (e) {
                var f, g, m, u = 0;
                C = b(e.target);
                F = b(".mbsc-fr-c", C);
                aa = {};
                J = a.getDate(!0);
                Ha && (jc = !(!D.marked && !D.data), sa = D.showEventCount || !(!D.events && !D.labels), Ma = !0, Ta = "calendar", Ga = "auto" == D.months ? Math.max(1, Math.min(3, Math.floor((S || (f = ka)[0].innerWidth || f.innerWidth()) / 280))) : +D.months, Da = Ga + 2 * ob, hb = 0, xa = xa && 2 > Ga, Sa = void 0 === D.showOuterDays ? 2 > Ga && !xa : D.showOuterDays, p = S || 280 * Ga, T = k(z(J)), F.append(function () {
                    var a, b, c, d = "";
                    a = qa ? D.btnCalNextClass : D.btnCalPrevClass;
                    var e = qa ? D.btnCalPrevClass : D.btnCalNextClass;
                    c = '\x3cdiv class\x3d"mbsc-cal-btn-w"\x3e\x3cdiv data-step\x3d"-1" role\x3d"button" tabindex\x3d"0" aria-label\x3d"' + D.prevMonthText + '" class\x3d"' + a + ' mbsc-cal-prev mbsc-cal-prev-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"\x3e\x3c/div\x3e';
                    for (b = 0; b < (r ? Ga : 1); b++) c += '\x3cdiv role\x3d"button" class\x3d"mbsc-cal-month"\x3e\x3c/div\x3e';
                    if (c += '\x3cdiv data-step\x3d"1" role\x3d"button" tabindex\x3d"0" aria-label\x3d"' + D.nextMonthText + '" class\x3d"' + e + ' mbsc-cal-next mbsc-cal-next-m mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"\x3e\x3c/div\x3e\x3c/div\x3e', ua && (d = '\x3cdiv class\x3d"mbsc-cal-btn-w"\x3e\x3cdiv data-step\x3d"-12" role\x3d"button" tabindex\x3d"0" aria-label\x3d"' + D.prevYearText + '" class\x3d"' + a + ' mbsc-cal-prev mbsc-cal-prev-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"\x3e\x3c/div\x3e\x3cdiv role\x3d"button" class\x3d"mbsc-cal-year"\x3e\x3c/div\x3e\x3cdiv data-step\x3d"12" role\x3d"button" tabindex\x3d"0" aria-label\x3d"' + D.nextYearText + '" class\x3d"' + e + ' mbsc-cal-next mbsc-cal-next-y mbsc-cal-btn mbsc-fr-btn mbsc-fr-btn-e"\x3e\x3c/div\x3e\x3c/div\x3e'), a = '\x3cdiv class\x3d"mbsc-w-p mbsc-cal-c"\x3e\x3cdiv class\x3d"mbsc-cal ' + (pa ? "" : " mbsc-cal-week-view") + (1 < Ga ? " mbsc-cal-multi " : "") + (da ? " mbsc-cal-weeks " : "") + (xa ? " mbsc-cal-vertical" : "") + (jc ? " mbsc-cal-has-marks" : "") + (sa ? " mbsc-cal-has-txt" : "") + (Sa ? "" : " mbsc-cal-hide-diff ") + (D.calendarClass || "") + '"' + (ma ? "" : ' style\x3d"min-width:' + (S || 280 * Ga) + 'px;"') + '\x3e\x3cdiv class\x3d"mbsc-cal-hdr"\x3e' + (yb < Ca || 1 < Ga ? d + c : c + d) + "\x3c/div\x3e", r) {
                        a += '\x3cdiv class\x3d"mbsc-cal-body"\x3e\x3cdiv class\x3d"mbsc-cal-day-picker"\x3e\x3cdiv class\x3d"mbsc-cal-days-c"\x3e';
                        for (c = 0; c < Ga; c++) {
                            a += '\x3cdiv class\x3d"mbsc-cal-days"\x3e';
                            for (b = 0; 7 > b; b++) a += '\x3cdiv aria-label\x3d"' + D.dayNames[(b + D.firstDay) % 7] + '"\x3e' + D["dayNames" + Pa][(b + D.firstDay) % 7] + "\x3c/div\x3e";
                            a += "\x3c/div\x3e"
                        }
                        a += '\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-scroll-c mbsc-cal-day-scroll-c ' + (D.calendarClass || "") + '"' + (D.calendarHeight ? ' style\x3d"height:' + D.calendarHeight + 'px"' : "") + '\x3e\x3cdiv class\x3d"mbsc-cal-scroll" style\x3d"width:' + 100 / Ga + '%"\x3e' + L(T) + "\x3c/div\x3e\x3c/div\x3e"
                    }
                    if (a += "\x3c/div\x3e", nb) {
                        a += '\x3cdiv class\x3d"mbsc-cal-month-picker mbsc-cal-picker mbsc-cal-h"\x3e\x3cdiv class\x3d"mbsc-cal-scroll-c ' + (D.calendarClass || "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-scroll"\x3e';
                        for (b = 0; 3 > b; b++) {
                            a += '\x3cdiv class\x3d"mbsc-cal-slide"' + h(b - 1) + '\x3e\x3cdiv role\x3d"grid" class\x3d"mbsc-cal-table"\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e';
                            for (c = 0; 12 > c; c++) c && 0 == c % 3 && (a += '\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-row"\x3e'), a += '\x3cdiv role\x3d"gridcell"' + (1 == b ? ' tabindex\x3d"-1" aria-label\x3d"' + D.monthNames[c] + '" data-val\x3d"' + c + '"' : "") + ' class\x3d"mbsc-cal-cell' + (1 == b ? " mbsc-btn-e" : "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-cell-i mbsc-cal-cell-txt"\x3e' + (1 == b ? D.monthNamesShort[c] : "\x26nbsp;") + "\x3c/div\x3e\x3c/div\x3e";
                            a += "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
                        }
                        a = a + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e" + ('\x3cdiv class\x3d"mbsc-cal-year-picker mbsc-cal-picker mbsc-cal-h"\x3e\x3cdiv class\x3d"mbsc-cal-scroll-c ' + (D.calendarClass || "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-scroll"\x3e');
                        for (b = -1; 2 > b; b++) a += I(t(T, b), b);
                        a += "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
                    }
                    return a + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e"
                }()), G = b(".mbsc-cal-month", C), X = b(".mbsc-cal-year", C), P = b(".mbsc-cal-day-scroll-c", C));
                nb && (Z = b(".mbsc-cal-year-picker", C), y = b(".mbsc-cal-month-picker", C));
                ba = b(".mbsc-w-p", C);
                1 < R.length && F.before((g = '\x3cdiv class\x3d"mbsc-cal-tabs-c"\x3e\x3cul class\x3d"mbsc-cal-tabs" role\x3d"tablist"\x3e', R.forEach(function (a, b) {
                    m = D[("calendar" == a ? "date" : a) + "Text"];
                    g += '\x3cli role\x3d"tab" aria-controls\x3d"' + Ya.id + "-mbsc-pnl-" + b + '" class\x3d"mbsc-cal-tab mbsc-fr-btn-e ' + (b ? "" : E) + '" data-control\x3d"' + a + '"' + (D.tabLink ? '\x3e\x3ca href\x3d"#"\x3e' + m + "\x3c/a\x3e" : ' tabindex\x3d"0"\x3e' + m) + "\x3c/li\x3e"
                }), g += "\x3c/ul\x3e\x3c/div\x3e"));
                ["date", "time", "calendar"].forEach(function (a) {
                    Y[a] ? (Y[a] = ba.eq(u).addClass("mbsc-cal-h"), u++) : "date" == a && !Y.date && Ha && (ba.eq(u).remove(), u++)
                });
                R.forEach(function (a) {
                    F.append(Y[a])
                });
                !Ha && Y.date && Y.date.css("position", "relative");
                a._scrollers = [];
                (function () {
                    if (Ha && r) {
                        var e = b(".mbsc-cal-scroll-c", C);
                        ea = Q(e[0], ya, ia, ob, hb, Ga, Da, T, l, q, K, n, A);
                        nb && (Ka = Q(e[1], null, null, 1, 0, 1, 3, T, w), Wa = Q(e[2], Ea, ta, 1, 0, 1, 3, T, V, la, la, I, t), a.tap(G, function () {
                            d(y);
                            c(Z)
                        }), a.tap(X, function () {
                            d(Z);
                            c(y)
                        }));
                        Qb(b(".mbsc-cal-btn", C), function (a, b, c) {
                            B(ea, b, !0, c)
                        });
                        K(T);
                        null === D.defaultValue && !a._hasValue || a._multiple || (a._activeElm = ea.$active[0]);
                        P.on("keydown", function (a) {
                            var b, c = D.getYear(J), d = D.getMonth(J), e = D.getDay(J);
                            switch (a.keyCode) {
                                case 32:
                                    l(ea.$active);
                                    break;
                                case 37:
                                    b = D.getDate(c, d, e - 1);
                                    break;
                                case 39:
                                    b = D.getDate(c, d, e + 1);
                                    break;
                                case 38:
                                    b = D.getDate(c, d, e - 7);
                                    break;
                                case 40:
                                    b = D.getDate(c, d, e + 7);
                                    break;
                                case 36:
                                    b = D.getDate(c, d, 1);
                                    break;
                                case 35:
                                    b = D.getDate(c, d + 1, 0);
                                    break;
                                case 33:
                                    b = a.altKey ? D.getDate(c - 1, d, e) : pa ? D.getDate(c, d - 1, e) : D.getDate(c, d, e - 7 * r);
                                    break;
                                case 34:
                                    b = a.altKey ? D.getDate(c + 1, d, e) : pa ? D.getDate(c, d + 1, e) : D.getDate(c, d, e + 7 * r)
                            }
                            b && (a.preventDefault(), v(b, !0, !1, !0))
                        })
                    }
                    a.tap(b(".mbsc-cal-tab", C), function () {
                        a.changeTab(b(this).attr("data-control"))
                    })
                })()
            }, onShow: function () {
                Ha && r && m(pa ? T : J)
            }, onHide: function () {
                a._scrollers.forEach(function (a) {
                    a.destroy()
                });
                Ta = Wa = Ka = ea = null
            }, onValidated: function (b) {
                var c, d, e = b.index, f = a._order;
                d = a.getDate(!0);
                Ja ? c = "calendar" : void 0 !== e && (c = f.dd == e || f.d == e || f.m == e || f.y == e ? "date" : "time");
                Aa("onSetDate", {date: d, control: c});
                "time" !== c && v(d, !1, !!b.time, Ja && !a._multiple);
                Ja = !1
            }, onPosition: function (c) {
                var d, e;
                e = c.windowHeight;
                var f = (c.hasTabs || !0 === D.tabs || !1 !== D.tabs && ma) && 1 < R.length;
                if (ma && (c.windowWidth >= D.breakPointMd ? b(c.target).addClass("mbsc-fr-md") : b(c.target).removeClass("mbsc-fr-md")), f ? (C.addClass("mbsc-cal-tabbed"), Ta = b(".mbsc-cal-tab.mbsc-selected", C).attr("data-control"), ba.addClass("mbsc-cal-h"), Y[Ta].removeClass("mbsc-cal-h")) : (Ta = "calendar", C.removeClass("mbsc-cal-tabbed"), ba.removeClass("mbsc-cal-h")), a._isFullScreen && (P.height(""), e >= (d = c.popup.offsetHeight) && P.height(e - d + P[0].offsetHeight)), Ha && r) {
                    if ((ma || xa || f) && (p = P[0][xa ? "offsetHeight" : "offsetWidth"]), ma && ua) for (Fa = D.maxMonthWidth > G[0].offsetWidth ? D.monthNamesShort : D.monthNames, d = D.getYear(T), e = D.getMonth(T), c = 0; c < Ga; c++) G.eq(c).text(Fa[D.getMonth(D.getDate(d, e - hb + c, 1))]);
                    M(ea)
                }
                nb && (M(Ka), M(Wa))
            }
        })
    }, te = {};
    ta.calendar = function (a) {
        function c(a) {
            var b, c, d = null;
            if (x = {}, a && a.length) for (c = 0; c < a.length; c++) {
                b = oa(a[c], f, q, q.isoParts);
                var d = d || b, e = x, g;
                g = b;
                g = tb(g.getFullYear(), g.getMonth(), g.getDate());
                e[g] = b
            }
            return d
        }

        var d, e, f, h, k, g = U({}, a.settings), q = U(a.settings, te, g),
            K = "mbsc-selected " + (q.selectedClass || ""), I = q.defaultValue,
            n = "multiple" == q.select || 1 < q.select || "week" == q.selectType, L = Ka(q.select) ? q.select : 1 / 0,
            x = {};
        return d = fd.call(this, a), h = void 0 === q.firstSelectDay ? q.firstDay : q.firstSelectDay, f = a._format, n && c(I), a._multiple = n, a._getDayProps = function (a) {
            return {selected: n ? void 0 !== x[a] : void 0}
        }, a._selectDay = function (c, d, f, g) {
            if (q.setOnDayTap && "multiple" != q.select && "inline" != q.display) return a.setDate(f), void a.select();
            if (n) if ("week" == q.selectType) {
                var m, k, v = d.getDay() - h, v = 0 > v ? 7 + v : v;
                "multiple" != q.select && (x = {});
                for (m = 0; 7 > m; m++) k = tb(d.getFullYear(), d.getMonth(), d.getDate() - v + m), g ? delete x[k] : Nb(x).length / 7 < L && (x[k] = k);
                a.redraw()
            } else m = b('.mbsc-cal-day[data-full\x3d"' + c.attr("data-full") + '"]', e), g ? (m.removeClass(K).removeAttr("aria-selected"), delete x[d]) : Nb(x).length < L && (m.addClass(K).attr("aria-selected", "true"), x[d] = d);
            a.__selectDay(c, d, f)
        }, a.setVal = function (b, d, e, f, g) {
            n && (b = c(b));
            a._setVal(b, d, e, f, g);
            n && a.redraw()
        }, a.getVal = function (b) {
            var c, d = [];
            if (n) {
                for (c in x) d.push(ub(x[c], q, f));
                return d
            }
            return ub(a.getDate(b), q, f)
        }, U({}, d, {
            highlight: !n, outerMonthChange: !n, parseValue: function (a) {
                return n && a && "string" == typeof a && (a = c(a.split(","))), n && I && I.length && (q.defaultValue = I[0]), d.parseValue.call(this, a)
            }, formatValue: function (b) {
                var c, e = [];
                if (n) {
                    for (c in x) e.push(ra(f, x[c], q));
                    return e.join(", ")
                }
                return d.formatValue.call(this, b, a)
            }, onClear: function () {
                n && (x = {}, a.redraw())
            }, onBeforeShow: function () {
                void 0 !== q.setOnDayTap || q.buttons && q.buttons.length || 1 != q.controls.length || (q.setOnDayTap = !0);
                q.setOnDayTap && "inline" != q.display && (q.outerMonthChange = !1);
                q.counter && n && (q.headerText = function () {
                    var a = 0, c = "week" == q.selectType ? 7 : 1;
                    return b.each(x, function () {
                        a++
                    }), (1 < (a = Math.round(a / c)) && q.selectedPluralText || q.selectedText).replace(/{count}/, a)
                })
            }, onMarkupReady: function (a) {
                d.onMarkupReady.call(this, a);
                e = b(a.target);
                n && (b(".mbsc-fr-hdr", e).attr("aria-live", "off"), k = U({}, x))
            }, onCancel: function () {
                !a.live && n && (x = U({}, k))
            }
        })
    };
    na("calendar", za);
    var Id = "touchstart touchmove touchend touchcancel mousedown mousemove mouseup mouseleave".split(" "),
        ue = {tap: !$c}, Bc = void 0, Ib = function () {
            function a(c, d) {
                var e = this;
                lb(this, a);
                var f = U({}, ue, G.settings, d), h = b(c), k = h.parent(),
                    k = k.hasClass("mbsc-input-wrap") ? k.parent() : k, g = h.next().hasClass("mbsc-fr") ? h.next() : null,
                    q = ud(h);
                g && g.insertAfter(k);
                td(k, q);
                h.addClass("mbsc-control");
                Id.forEach(function (a) {
                    c.addEventListener(a, e)
                });
                this.settings = f;
                this._type = q;
                this._elm = c;
                this._$elm = h;
                this._$parent = k;
                this._$frame = g;
                this._ripple = vd(f.theme);
                c.mbscInst = this
            }

            return Tb(a, [{
                key: "destroy", value: function () {
                    var a = this;
                    this._$elm.removeClass("mbsc-control");
                    Id.forEach(function (b) {
                        a._elm.removeEventListener(b, a)
                    });
                    delete this._elm.mbscInst
                }
            }, {
                key: "option", value: function (a) {
                    U(this.settings, a);
                    this._ripple = vd(this.settings.theme)
                }
            }, {
                key: "handleEvent", value: function (a) {
                    switch (a.type) {
                        case "touchstart":
                        case "mousedown":
                            this._onStart(a);
                            break;
                        case "touchmove":
                        case "mousemove":
                            this._onMove(a);
                            break;
                        case "touchend":
                        case "touchcancel":
                        case "mouseup":
                        case "mouseleave":
                            this._onEnd(a)
                    }
                }
            }, {
                key: "_addRipple", value: function (a) {
                    this._ripple && this._$rippleElm && this._ripple.addRipple(this._$rippleElm, a)
                }
            }, {
                key: "_removeRipple", value: function () {
                    this._ripple && this._$rippleElm && this._ripple.removeRipple()
                }
            }, {
                key: "_onStart", value: function (a) {
                    var b = this._elm;
                    Yb(a, b) && (this._startX = ja(a, "X"), this._startY = ja(a, "Y"), Bc && Bc.removeClass("mbsc-active"), b.disabled || (this._isActive = !0, (Bc = this._$elm).addClass("mbsc-active"), this._addRipple(a)))
                }
            }, {
                key: "_onMove", value: function (a) {
                    (this._isActive && 9 < Math.abs(ja(a, "X") - this._startX) || 9 < Math.abs(ja(a, "Y") - this._startY)) && (this._$elm.removeClass("mbsc-active"), this._removeRipple(), this._isActive = !1)
                }
            }, {
                key: "_onEnd", value: function (a) {
                    var b = this, c = this._elm, f = this._type;
                    this._isActive && this.settings.tap && "touchend" == a.type && !c.readOnly && (c.focus(), /(button|submit|checkbox|switch|radio)/.test(f) && a.preventDefault(), /select/.test(f) || Kc(a, c));
                    this._isActive && setTimeout(function () {
                        b._$elm.removeClass("mbsc-active");
                        b._removeRipple()
                    }, 100);
                    this._isActive = !1;
                    Bc = null
                }
            }]), a
        }(), Rc = function (a) {
            function c(a, e) {
                lb(this, c);
                var d, h, k, g, q, K, I, n = Cb(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a, e));
                return d = n._$parent, h = n._$elm, k = {}, g = h[0], q = h.attr("data-password-toggle"), K = h.attr("data-icon-show") || "eye", I = h.attr("data-icon-hide") || "eye-blocked", q && (k.right = "password" == g.type ? K : I), sd(h, k), q && Mc(n, d.find(".mbsc-right-ic").addClass("mbsc-input-toggle"), function () {
                    "text" == g.type ? (g.type = "password", b(this).addClass("mbsc-ic-" + K).removeClass("mbsc-ic-" + I)) : (g.type = "text", b(this).removeClass("mbsc-ic-" + K).addClass("mbsc-ic-" + I))
                }), n._$parent.addClass("mbsc-input"), n
            }

            return Hb(c, Ib), Tb(c, [{
                key: "destroy", value: function () {
                    uc(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "destroy", this).call(this);
                    this._$parent.removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-input-ic").remove()
                }
            }]), c
        }(), Vd = function (a) {
            function b(a, c) {
                lb(this, b);
                var d = Cb(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, a, c)), e = d._$elm,
                    k = e.attr("data-icon");
                return e.addClass("mbsc-btn").find(".mbsc-btn-ic").remove(), k && (e.prepend('\x3cspan class\x3d"mbsc-btn-ic mbsc-ic mbsc-ic-' + k + '"\x3e\x3c/span\x3e'), "" === e.text() && e.addClass("mbsc-btn-icon-only")), d._$rippleElm = e, d
            }

            return Hb(b, Ib), b
        }(), Wd = function (a) {
            function b(a, c) {
                lb(this, b);
                var d = Cb(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, a, c));
                return d._$parent.prepend(d._$elm).addClass("mbsc-checkbox mbsc-control-w").find(".mbsc-checkbox-box").remove(), d._$elm.after('\x3cspan class\x3d"mbsc-checkbox-box"\x3e\x3c/span\x3e'), d
            }

            return Hb(b, Ib), b
        }(), Xd = function (a) {
            function b(a, c) {
                lb(this, b);
                var d = Cb(this, (b.__proto__ || Object.getPrototypeOf(b)).call(this, a, c));
                return d._$parent.addClass("mbsc-radio mbsc-control-w").find(".mbsc-radio-box").remove(), d._$elm.after('\x3cspan class\x3d"mbsc-radio-box"\x3e\x3cspan\x3e\x3c/span\x3e\x3c/span\x3e'), d
            }

            return Hb(b, Ib), b
        }(), Yd = function (a) {
            function c(a, e) {
                lb(this, c);
                var d = Cb(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a, e)), h = d._$elm, k = d._$parent,
                    g = k.find("input.mbsc-control"),
                    g = g.length ? g : b('\x3cinput tabindex\x3d"-1" class\x3d"mbsc-control" readonly\x3e');
                return d._$input = g, d._setText = d._setText.bind(d), k.addClass("mbsc-select" + (d._$frame ? " mbsc-select-inline" : "")), h.after(g), g.after('\x3cspan class\x3d"mbsc-select-ic mbsc-ic mbsc-ic-arrow-down5"\x3e\x3c/span\x3e'), h.hasClass("mbsc-comp") || (h.on("change", d._setText), d._setText()), d
            }

            return Hb(c, Rc), Tb(c, [{
                key: "destroy", value: function () {
                    uc(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "destroy", this).call(this);
                    this._$parent.find(".mbsc-select-ic").remove();
                    this._$elm.off("change", this._setText)
                }
            }, {
                key: "_setText", value: function () {
                    var a = this._elm;
                    this._$elm.hasClass("mbsc-comp") || this._$input.val(-1 != a.selectedIndex ? a.options[a.selectedIndex].text : "")
                }
            }]), c
        }(), Jd = ["keydown", "input", "scroll"], Qc = void 0;
    Sa && b(window).on("resize orientationchange", wd);
    var Zd = function (a) {
        function c(a, b) {
            lb(this, c);
            var d = Cb(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a, b));
            return d._$parent.addClass("mbsc-textarea"), Jd.forEach(function (a) {
                d._elm.addEventListener(a, d)
            }), Zb(a), d
        }

        return Hb(c, Rc), Tb(c, [{
            key: "destroy", value: function () {
                var a = this;
                uc(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "destroy", this).call(this);
                Jd.forEach(function (b) {
                    a._elm.removeEventListener(b, a)
                })
            }
        }, {
            key: "handleEvent", value: function (a) {
                switch (uc(c.prototype.__proto__ || Object.getPrototypeOf(c.prototype), "handleEvent", this).call(this, a), a.type) {
                    case "keydown":
                    case "input":
                        this._onInput(a);
                        break;
                    case "scroll":
                        a = this._elm;
                        var d = b(a);
                        if (!d.hasClass("mbsc-textarea-scroll")) {
                            var f = a.offsetHeight + (a.scrollHeight - a.offsetHeight);
                            Math.round(f / 24) <= (d.attr("rows") || 6) && (a.scrollTop = 0, a.style.height = f + "px")
                        }
                        !0
                }
            }
        }, {
            key: "_onInput", value: function () {
                var a = this;
                clearTimeout(this._debounce);
                this._debounce = setTimeout(function () {
                    Zb(a._elm)
                }, 100)
            }
        }, {
            key: "resize", value: function () {
                clearTimeout(this._debounce);
                Zb(this._elm)
            }
        }]), c
    }(), $d = function (a) {
        function c(a, e) {
            lb(this, c);
            var d = Cb(this, (c.__proto__ || Object.getPrototypeOf(c)).call(this, a, e)), h = void 0, k = void 0,
                g = d._$elm, q = d._$parent;
            return q.hasClass("mbsc-segmented-item-ready") || (h = b('\x3cdiv class\x3d"mbsc-segmented"\x3e\x3c/div\x3e'), q.after(h), q.parent().find('input[name\x3d"' + g.attr("name") + '"]').each(function () {
                var a = b(this);
                k = a.parent().addClass("mbsc-segmented-item mbsc-segmented-item-ready");
                b('\x3cspan class\x3d"mbsc-segmented-content"\x3e' + (a.attr("data-icon") ? '\x3cspan class\x3d"mbsc-ic mbsc-ic-' + a.attr("data-icon") + '"\x3e\x3c/span\x3e' : "") + "\x3c/span\x3e").append(k.contents()).appendTo(k);
                k.prepend(a);
                h.append(k)
            })), d._$rippleElm = g.next(), d
        }

        return Hb(c, Ib), c
    }(), ac = function (a, c) {
        function d() {
            var c;
            a.disabled || (c = parseFloat(b(this).val()), h(isNaN(c) ? l : c))
        }

        function e() {
            return a.disabled
        }

        function f(a, b) {
            h(l + b * u)
        }

        function h(a, b, c) {
            t = l;
            void 0 === b && (b = !0);
            void 0 === c && (c = b);
            l = Math.min(n, Math.max(Math.round(a / u) * u, L));
            K.removeClass("mbsc-disabled");
            b && A.val(l);
            l == L ? q.addClass("mbsc-disabled") : l == n && g.addClass("mbsc-disabled");
            l !== t && c && A.trigger("change")
        }

        function k(a, b) {
            var c = A.attr(a);
            return void 0 === c || "" === c ? b : +c
        }

        var g, q, K, I, n, L, x, u, v, m, H, l, w, V, z = this, A = b(a), t = l;
        Vb.call(this, a, c, !0);
        z.getVal = function () {
            var a = parseFloat(A.val());
            return a = isNaN(a) ? l : a, Math.min(n, Math.max(Math.round(a / u) * u, L))
        };
        z.setVal = function (a, b, c) {
            a = parseFloat(a);
            h(isNaN(a) ? l : a, b, c)
        };
        z._init = function () {
            V = (w = A.parent().hasClass("mbsc-stepper")) ? A.closest(".mbsc-stepper-cont") : A.parent();
            m = z.settings;
            L = void 0 === c.min ? k("min", m.min) : c.min;
            n = void 0 === c.max ? k("max", m.max) : c.max;
            u = void 0 === c.step ? k("step", m.step) : c.step;
            I = A.attr("data-val") || m.val;
            l = Math.min(n, Math.max(Math.round(+a.value / u) * u || 0, L));
            x = (H = G.themes.form[m.theme]) && H.addRipple ? H : null;
            w || V.addClass("mbsc-stepper-cont mbsc-control-w").append('\x3cspan class\x3d"mbsc-segmented mbsc-stepper"\x3e\x3c/span\x3e').find(".mbsc-stepper").append('\x3cspan class\x3d"mbsc-segmented-item mbsc-stepper-control mbsc-stepper-minus ' + (l == L ? "mbsc-disabled" : "") + '" data-step\x3d"-1" tabindex\x3d"0"\x3e\x3cspan class\x3d"mbsc-segmented-content"\x3e\x3cspan class\x3d"mbsc-ic mbsc-ic-minus"\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e').append('\x3cspan class\x3d"mbsc-segmented-item mbsc-stepper-control mbsc-stepper-plus ' + (l == n ? "mbsc-disabled" : "") + '"  data-step\x3d"1" tabindex\x3d"0"\x3e\x3cspan class\x3d"mbsc-segmented-content"\x3e \x3cspan class\x3d"mbsc-ic mbsc-ic-plus"\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e').prepend(A);
            q = b(".mbsc-stepper-minus", V);
            g = b(".mbsc-stepper-plus", V);
            K = b(".mbsc-stepper-control", V);
            w || ("left" == I ? (V.addClass("mbsc-stepper-val-left"), A.after('\x3cspan class\x3d"mbsc-segmented-item"\x3e\x3cspan class\x3d"mbsc-segmented-content"\x3e\x3c/span\x3e\x3c/span\x3e')) : "right" == I ? (V.addClass("mbsc-stepper-val-right"), g.after('\x3cspan class\x3d"mbsc-segmented-item"\x3e\x3cspan class\x3d"mbsc-segmented-content"\x3e\x3c/span\x3e\x3c/span\x3e')) : q.after('\x3cspan class\x3d"mbsc-segmented-item"\x3e\x3cspan class\x3d"mbsc-segmented-content mbsc-stepper-val"\x3e\x3c/span\x3e\x3c/span\x3e'));
            v || (A.on("change", d), v = Qb(K, f, 150, e, !1, x));
            A.val(l).attr("data-role", "stepper").attr("min", L).attr("max", n).attr("step", u).addClass("mbsc-control");
            a.mbscInst = z
        };
        z._destroy = function () {
            A.removeClass("mbsc-control").off("change", d);
            v.destroy();
            delete a.mbscInst
        };
        z.init()
    };
    ac.prototype = {_class: "stepper", _hasDef: !0, _hasTheme: !0, _defaults: {min: 0, max: 100, step: 1}};
    Ea.Stepper = ac;
    var Kd = function (a, c, d) {
        var e, f, h, k, g = this;
        Vb.call(this, a, c, !0);
        g.__init = la;
        g.__destroy = la;
        g._init = function () {
            var c;
            k = g.settings;
            e = b(a);
            c = !!f;
            f = (f = e.parent()).hasClass("mbsc-input-wrap") ? f.parent() : f;
            g._$parent = f;
            h && f.removeClass(h);
            h = g._css + " mbsc-progress-w mbsc-control-w mbsc-" + k.theme + (k.baseTheme ? " mbsc-" + k.baseTheme : "") + (k.rtl ? " mbsc-rtl" : " mbsc-ltr");
            f.addClass(h);
            e.addClass("mbsc-control");
            g.__init();
            c || g._attachChange();
            g.refresh();
            a.mbscInst = g
        };
        g._destroy = function () {
            g.__destroy();
            f.removeClass(h);
            e.removeClass("mbsc-control");
            delete a.mbscInst
        };
        d || g.init()
    }, Ld = function (a, c, d) {
        function e(c) {
            "mousedown" === c.type && c.preventDefault();
            !Yb(c, this) || A && !G || a.disabled || a.readOnly || (S.stopProp && c.stopPropagation(), A = !0, J = !1, B = !1, Y = ja(c, "X"), R = ja(c, "Y"), W = Y, z.removeClass("mbsc-progress-anim"), m = O ? b(".mbsc-slider-handle", this) : l, H && H.removeClass("mbsc-handle-curr"), H = m.parent().addClass("mbsc-active mbsc-handle-curr"), v.addClass("mbsc-active"), C = +m.attr("data-index"), E = z[0].offsetWidth, N = z[0].getBoundingClientRect().left, "mousedown" === c.type && (y = !0, b(document).on("mousemove", f).on("mouseup", h)), "mouseenter" === c.type && (G = !0, b(document).on("mousemove", f)))
        }

        function f(a) {
            A && (W = ja(a, "X"), P = ja(a, "Y"), Q = W - Y, M = P - R, 5 < Math.abs(Q) && (J = !0), (J || y || G) && 50 < Math.abs(ea - new Date) && (ea = new Date, x(W, S.round, U && (!G || y))), J ? a.preventDefault() : 7 < Math.abs(M) && "touchmove" == a.type && L())
        }

        function h(a) {
            A && (a.preventDefault(), O || z.addClass("mbsc-progress-anim"), G && !y ? u(T[C], C, !1, !1, !0) : x(W, !0, !0), J || B || ("touchend" == a.type && Ob(), aa._onTap(T[C])), "mouseup" == a.type && (y = !1), "mouseleave" == a.type && (G = !1), G || L())
        }

        function k() {
            A && L()
        }

        function g() {
            var a = aa._readValue(b(this)), c = +b(this).attr("data-index");
            a !== T[c] && (T[c] = a, r[c] = a, u(a, c))
        }

        function q(a) {
            a.stopPropagation()
        }

        function K(a) {
            a.preventDefault()
        }

        function I(c) {
            var d;
            if (!a.disabled) {
                switch (c.keyCode) {
                    case 38:
                    case 39:
                        d = 1;
                        break;
                    case 40:
                    case 37:
                        d = -1
                }
                d && (c.preventDefault(), Ba || (C = +b(this).attr("data-index"), u(T[C] + p * d, C, !0), Ba = setInterval(function () {
                    u(T[C] + p * d, C, !0)
                }, 200)))
            }
        }

        function n(a) {
            a.preventDefault();
            clearInterval(Ba);
            Ba = null
        }

        function L() {
            A = !1;
            H.removeClass("mbsc-active");
            v.removeClass("mbsc-active");
            b(document).off("mousemove", f).off("mouseup", h)
        }

        function x(a, b, c) {
            a = b ? Math.min(Math[aa._rounding || "round"](Math.max(100 * (a - N) / E, 0) / ka / p) * p * 100 / (X - Z + t), 100) : Math.max(0, Math.min(100 * (a - N) / E, 100));
            F && (a = 100 - a);
            u(Math.round((Z - t + a / ka) * wa) / wa, C, c, a)
        }

        function u(a, b, c, d, e, f) {
            var p = l.eq(b), g = p.parent();
            a = Math.min(X, Math.max(a, Z));
            void 0 === f && (f = c);
            aa._update ? a = aa._update(a, T, b, d, O, e, g) : g.css({
                left: F ? "auto" : (d || Da(a, Z, X)) + "%",
                right: F ? (d || Da(a, Z, X)) + "%" : "auto"
            });
            a > Z ? g.removeClass("mbsc-slider-start") : (T[b] > Z || e) && g.addClass("mbsc-slider-start");
            T[b] = a;
            c && r[b] != a && (B = !0, r[b] = a, aa._fillValue(a, b, f));
            p.attr("aria-valuenow", a)
        }

        var v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, G, y, F, U, X, Z, J, O, r, p, S, ka, Y, R, wa, Ba, E, T,
            aa = this, ea = new Date;
        Kd.call(this, a, c, !0);
        aa._onTap = la;
        aa.___init = la;
        aa.___destroy = la;
        aa._attachChange = function () {
            v.on(S.changeEvent, g)
        };
        aa.__init = function () {
            var a;
            l && (a = !0, l.parent().remove());
            aa.___init();
            V = aa._$parent;
            z = aa._$track;
            v = V.find("input");
            S = aa.settings;
            Z = aa._min;
            X = aa._max;
            t = aa._base || 0;
            p = aa._step;
            U = aa._live;
            wa = 0 != p % 1 ? 100 / (100 * +(p % 1).toFixed(2)) : 1;
            ka = 100 / (X - Z + t) || 100;
            O = 1 < v.length;
            F = S.rtl;
            T = [];
            r = [];
            v.each(function (a) {
                T[a] = aa._readValue(b(this));
                b(this).attr("data-index", a)
            });
            l = V.find(".mbsc-slider-handle");
            w = V.find(O ? ".mbsc-slider-handle-cont" : ".mbsc-progress-cont");
            l.on("keydown", I).on("keyup", n).on("blur", n);
            w.on("touchstart mousedown" + (S.hover ? " mouseenter" : ""), e).on("touchmove", f).on("touchend touchcancel" + (S.hover ? " mouseleave" : ""), h).on("pointercancel", k);
            a || (v.on("click", q), V.on("click", K))
        };
        aa.__destroy = function () {
            V.off("click", K);
            v.off(S.changeEvent, g).off("click", q);
            l.off("keydown", I).off("keyup", n).off("blur", n);
            w.off("touchstart mousedown mouseenter", e).off("touchmove", f).off("touchend touchcancel mouseleave", h).off("pointercancel", k);
            aa.___destroy()
        };
        aa.refresh = function () {
            v.each(function (a) {
                u(aa._readValue(b(this)), a, !0, !1, !0, !1)
            })
        };
        aa.getVal = function () {
            return O ? T.slice(0) : T[0]
        };
        aa.setVal = aa._setVal = function (a, c, d) {
            b.isArray(a) || (a = [a]);
            b.each(a, function (a, b) {
                T[a] = b
            });
            b.each(a, function (a, b) {
                u(b, a, !0, !1, !0, d)
            })
        };
        d || aa.init()
    }, Rb = function (a, c) {
        var d, e, f, h, k = this;
        U(c = c || {}, {changeEvent: "click", round: !1});
        Ld.call(this, a, c, !0);
        k._readValue = function () {
            return a.checked ? 1 : 0
        };
        k._fillValue = function (a, b, c) {
            d.prop("checked", !!a);
            c && d.trigger("change")
        };
        k._onTap = function (a) {
            k._setVal(a ? 0 : 1)
        };
        k.___init = function () {
            f = k.settings;
            d = b(a);
            (e = d.parent()).find(".mbsc-switch-track").remove();
            e.prepend(d);
            d.attr("data-role", "switch").after('\x3cspan class\x3d"mbsc-progress-cont mbsc-switch-track"\x3e\x3cspan class\x3d"mbsc-progress-track mbsc-progress-anim"\x3e\x3cspan class\x3d"mbsc-slider-handle-cont"\x3e\x3cspan class\x3d"mbsc-slider-handle mbsc-switch-handle" data-index\x3d"0"\x3e\x3cspan class\x3d"mbsc-switch-txt-off"\x3e' + f.offText + '\x3c/span\x3e\x3cspan class\x3d"mbsc-switch-txt-on"\x3e' + f.onText + "\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e");
            h && h.destroy();
            h = new Ib(a, f);
            k._$track = e.find(".mbsc-progress-track");
            k._min = 0;
            k._max = 1;
            k._step = 1
        };
        k.___destroy = function () {
            h.destroy()
        };
        k.getVal = function () {
            return a.checked
        };
        k.setVal = function (a, b, c) {
            k._setVal(a ? 1 : 0, b, c)
        };
        k.init()
    };
    Rb.prototype = {
        _class: "switch",
        _css: "mbsc-switch",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {stopProp: !0, offText: "Off", onText: "On"}
    };
    Ea.Switch = Rb;
    var $b = function (a, c, d) {
        function e() {
            var a = f("value", L);
            a !== m && h(a)
        }

        function f(a, b) {
            var c = g.attr(a);
            return void 0 === c || "" === c ? b : +c
        }

        function h(a, b, c, d) {
            a = Math.min(x, Math.max(a, L));
            K.css("width", 100 * (a - L) / (x - L) + "%");
            void 0 === c && (c = !0);
            void 0 === d && (d = c);
            (a !== m || b) && l._display(a);
            a !== m && (m = a, c && g.attr("value", m), d && g.trigger("change"))
        }

        var k, g, q, K, I, n, L, x, u, v, m, H, l = this;
        Kd.call(this, a, c, !0);
        l._display = function (a) {
            H = v && u.returnAffix ? v.replace(/\{value\}/, a).replace(/\{max\}/, x) : a;
            I && I.html(H);
            k && k.html(H)
        };
        l._attachChange = function () {
            g.on("change", e)
        };
        l.__init = function () {
            var d, e, h;
            if (u = l.settings, g = b(a), h = !!q, q = l._$parent, L = l._min = void 0 === c.min ? f("min", u.min) : c.min, x = l._max = void 0 === c.max ? f("max", u.max) : c.max, m = f("value", L), d = g.attr("data-val") || u.val, e = (e = g.attr("data-step-labels")) ? JSON.parse(e) : u.stepLabels, v = g.attr("data-template") || (100 != x || u.template ? u.template : "{value}%"), h ? (d && (k.remove(), q.removeClass("mbsc-progress-value-" + ("right" == d ? "right" : "left"))), e && b(".mbsc-progress-step-label", n).remove()) : (td(q), sd(g), q.find(".mbsc-input-wrap").append('\x3cspan class\x3d"mbsc-progress-cont"\x3e\x3cspan class\x3d"mbsc-progress-track mbsc-progress-anim"\x3e\x3cspan class\x3d"mbsc-progress-bar"\x3e\x3c/span\x3e\x3c/span\x3e\x3c/span\x3e'), K = l._$progress = q.find(".mbsc-progress-bar"), n = l._$track = q.find(".mbsc-progress-track")), g.attr("min", L).attr("max", x), d && (k = b('\x3cspan class\x3d"mbsc-progress-value"\x3e\x3c/span\x3e'), q.addClass("mbsc-progress-value-" + ("right" == d ? "right" : "left")).find(".mbsc-input-wrap").append(k)), e) for (d = 0; d < e.length; ++d) n.append('\x3cspan class\x3d"mbsc-progress-step-label" style\x3d"' + (u.rtl ? "right" : "left") + ": " + 100 * (e[d] - L) / (x - L) + '%" \x3e' + e[d] + "\x3c/span\x3e");
            I = b(g.attr("data-target") || u.target)
        };
        l.__destroy = function () {
            q.removeClass("mbsc-ic-left mbsc-ic-right").find(".mbsc-progress-cont").remove();
            q.find(".mbsc-input-ic").remove();
            g.off("change", e)
        };
        l.refresh = function () {
            h(f("value", L), !0, !1)
        };
        l.getVal = function () {
            return m
        };
        l.setVal = function (a, b, c) {
            h(a, !0, b, c)
        };
        d || l.init()
    };
    $b.prototype = {
        _class: "progress",
        _css: "mbsc-progress",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {min: 0, max: 100, returnAffix: !0}
    };
    Ea.Progress = $b;
    var Bb = function (a, c, d) {
        var e, f, h, k, g, q, K, I, n, L, x, u, v, m = this;
        $b.call(this, a, c, !0);
        var H = m.__init, l = m.__destroy;
        Ld.call(this, a, c, !0);
        var w = m.__init, V = m.__destroy;
        m.__init = function () {
            H();
            w()
        };
        m.__destroy = function () {
            l();
            V()
        };
        m._update = function (a, b, c, d, e, f, g) {
            return I ? 0 === c ? (a = Math.min(a, b[1]), h.css({
                width: Da(b[1], x, L) - Da(a, x, L) + "%",
                left: n ? "auto" : Da(a, x, L) + "%",
                right: n ? Da(a, x, L) + "%" : "auto"
            })) : (a = Math.max(a, b[0]), h.css({width: Da(a, x, L) - Da(b[0], x, L) + "%"})) : e || !q ? g.css({
                left: n ? "auto" : (d || Da(a, x, L)) + "%",
                right: n ? (d || Da(a, x, L)) + "%" : "auto"
            }) : h.css("width", (d || Da(a, x, L)) + "%"), K && k.eq(c).html(a), e || b[c] == a && !f || m._display(a), a
        };
        m._readValue = function (a) {
            return +a.val()
        };
        m._fillValue = function (a, b, c) {
            e.eq(b).val(a);
            c && e.eq(b).trigger("change")
        };
        m._markupReady = function () {
            var a, c;
            if (K && f.addClass("mbsc-slider-has-tooltip"), 1 != u) for (c = (L - x) / u, a = 0; a <= c; ++a) g.append('\x3cspan class\x3d"mbsc-slider-step" style\x3d"' + (n ? "right" : "left") + ":" + 100 / c * a + '%"\x3e\x3c/span\x3e');
            e.each(function (a) {
                "range" == this.type && b(this).attr("min", x).attr("max", L).attr("step", u);
                (q ? h : g).append('\x3cspan class\x3d"mbsc-slider-handle-cont' + (I && !a ? " mbsc-slider-handle-left" : "") + '"\x3e\x3cspan tabindex\x3d"0" class\x3d"mbsc-slider-handle" aria-valuemin\x3d"' + x + '" aria-valuemax\x3d"' + L + '" data-index\x3d"' + a + '"\x3e\x3c/span\x3e' + (K ? '\x3cspan class\x3d"mbsc-slider-tooltip"\x3e\x3c/span\x3e' : "") + "\x3c/span\x3e")
            });
            k = f.find(".mbsc-slider-tooltip")
        };
        m.___init = function () {
            f && (f.removeClass("mbsc-slider-has-tooltip"), 1 != u && b(".mbsc-slider-step", g).remove());
            f = m._$parent;
            g = m._$track;
            h = m._$progress;
            e = f.find("input");
            v = m.settings;
            x = m._min;
            L = m._max;
            m._step = u = void 0 === c.step ? +e.attr("step") || v.step : c.step;
            m._live = Jc("data-live", v.live, e);
            K = Jc("data-tooltip", v.tooltip, e);
            I = (q = Jc("data-highlight", v.highlight, e) && 3 > e.length) && 2 == e.length;
            n = v.rtl;
            m._markupReady()
        };
        d || m.init()
    };
    Bb.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-slider",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {
            changeEvent: "change",
            stopProp: !0,
            min: 0,
            max: 100,
            step: 1,
            live: !0,
            highlight: !0,
            round: !0,
            returnAffix: !0
        }
    };
    Ea.Slider = Bb;
    var ic = function (a, c, d) {
        var e, f, h, k, g, q, K, I = this, n = b(a);
        Bb.call(this, a, c, !0);
        I._update = function (a, b, c, d, f, g) {
            return e.css("width", Da(a, 0, h) + "%"), f || b[c] == a && !g || I._display(a), a
        };
        I._markupReady = function () {
            var a, b = "", c = "";
            f = I._$track;
            e = I._$progress;
            K = I.settings;
            k = I._min;
            h = I._max;
            I._base = k;
            I._rounding = K.rtl ? "floor" : "ceil";
            g = n.attr("data-empty") || K.empty;
            q = n.attr("data-filled") || K.filled;
            for (a = 0; a < h; ++a) b += '\x3cspan class\x3d"mbsc-ic mbsc-ic-' + g + '"\x3e\x3c/span\x3e', c += '\x3cspan class\x3d"mbsc-ic mbsc-ic-' + q + '"\x3e\x3c/span\x3e';
            f.html(b);
            f.append(e);
            e.html(c);
            f.append('\x3cspan class\x3d"mbsc-rating-handle-cont"\x3e\x3cspan tabindex\x3d"0" class\x3d"mbsc-slider-handle" aria-valuemin\x3d"' + k + '" aria-valuemax\x3d"' + h + '" data-index\x3d"0"\x3e\x3c/span\x3e\x3c/span\x3e')
        };
        d || I.init()
    };
    ic.prototype = {
        _class: "progress",
        _css: "mbsc-progress mbsc-rating",
        _hasTheme: !0,
        _hasLang: !0,
        _hasDef: !0,
        _defaults: {
            changeEvent: "change",
            stopProp: !0,
            min: 1,
            max: 5,
            step: 1,
            live: !0,
            round: !0,
            hover: !0,
            highlight: !0,
            returnAffix: !0,
            empty: "star",
            filled: "star3"
        }
    };
    Ea.Rating = ic;
    var ve = 1, Sc = function () {
        function a(c, d) {
            var e = this;
            lb(this, a);
            var f = b(c);
            if (this._$elm = f, this.settings = d, this._isOpen = d.isOpen || !1, this._$accordionParent = f.parent("[mbsc-accordion], mbsc-accordion, .mbsc-accordion"), f.addClass("mbsc-collapsible " + (this._isOpen ? "mbsc-collapsible-open" : "")), f.hasClass("mbsc-card") ? (this._$header = f.find(".mbsc-card-header").addClass("mbsc-collapsible-header"), this._$content = f.find(".mbsc-card-content").addClass("mbsc-collapsible-content")) : f.hasClass("mbsc-form-group") || f.hasClass("mbsc-form-group-inset") ? (this._$header = f.find(".mbsc-form-group-title").addClass("mbsc-collapsible-header"), this._$content = f.find(".mbsc-form-group-content").addClass("mbsc-collapsible-content")) : (this._$header = f.find(".mbsc-collapsible-header"), this._$content = f.find(".mbsc-collapsible-content")), this._$content[0].id || (this._$content[0].id = "mbsc-collapsible-" + ve++), this._$header) {
                var h = b('\x3cspan class\x3d"mbsc-collapsible-icon mbsc-ic mbsc-ic-arrow-down5"\x3e\x3c/span\x3e');
                Mc(this, this._$header, function () {
                    e.collapse()
                });
                this._$header.attr("role", "button").attr("aria-expanded", this._isOpen).attr("aria-controls", this._$content[0].id).attr("tabindex", "0").on("mousedown", function (a) {
                    a.preventDefault()
                }).on("keydown", function (a) {
                    32 !== a.which && 13 != a.keyCode || (a.preventDefault(), e.collapse())
                }).append(h)
            }
            f[0].mbscInst = this;
            this.show = this.show.bind(this);
            this.hide = this.hide.bind(this);
            this.toggle = this.toggle.bind(this)
        }

        return Tb(a, [{
            key: "collapse", value: function (a) {
                var b = this, c = this._$elm;
                void 0 === a && (a = !this._isOpen);
                a && this._isOpen || !a && !this._isOpen || (a ? (ad && this._$content.on("transitionend", function h() {
                    b._$content.off("transitionend", h).css("height", "")
                }).css("height", this._$content[0].scrollHeight), c.addClass("mbsc-collapsible-open")) : (ad && this._$content.css("height", getComputedStyle(this._$content[0]).height), setTimeout(function () {
                    b._$content.css("height", 0);
                    c.removeClass("mbsc-collapsible-open")
                })), a && this._$accordionParent && this._$accordionParent.find(".mbsc-collapsible-open").each(function () {
                    this !== c[0] && this.mbscInst.hide()
                }), this._isOpen = a, this._$header.attr("aria-expanded", this._isOpen))
            }
        }, {
            key: "show", value: function () {
                this.collapse(!0)
            }
        }, {
            key: "hide", value: function () {
                this.collapse(!1)
            }
        }, {
            key: "toggle", value: function () {
                this.collapse()
            }
        }, {
            key: "destroy", value: function () {
                this._$header.find("mbsc-collapsible-icon").remove();
                this._$elm.removeClass("mbsc-collapsible mbsc-collapsible-open");
                this._$header.removeClass("mbsc-collapsible-header");
                this._$content.removeClass("mbsc-collapsible-content")
            }
        }]), a
    }();
    Ea.CollapsibleBase = Sc;
    var yd = 0, Cc = function (a, c) {
        function d() {
            k.removeClass("mbsc-no-touch")
        }

        var e, f, h = "", k = b(a), g = {}, q = this;
        Vb.call(this, a, c, !0);
        q.refresh = function (a) {
            xd(k, g, e, a)
        };
        q._init = function () {
            var a = void 0 !== e.collapsible || void 0 !== k.attr("data-collapsible");
            if (k.hasClass("mbsc-card") || k.on("touchstart", d).show(), h && k.removeClass(h), h = q.remote.cards.cssClass, k.addClass(h).removeClass("mbsc-cloak"), a && !f) a = k.attr("data-open"), f = new Sc(k, {isOpen: void 0 !== a && "false" != a || !0 === e.collapsible});
            q.refresh()
        };
        q._destroy = function () {
            for (var a in k.removeClass(h).off("touchstart", d), g) g[a].destroy();
            f && f.destroy()
        };
        q.toggle = function () {
            f && f.toggle()
        };
        q.hide = function () {
            f && f.hide()
        };
        q.show = function () {
            f && f.show()
        };
        e = q.settings;
        q.init()
    };
    Cc.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "card",
        _defaults: {tap: !0, stopProp: !0, lang: "en"}
    };
    Ea.Card = Cc;
    Nc("[mbsc-card]", Cc, !0);
    na("card", Cc, !1);
    var gd = function (a, c, d) {
        function e(a, b, c) {
            if (!c) for (r._value = r._hasValue ? r._tempValue.slice(0) : null, c = 0; c < m.length; ++c) m[c].tempChangedColor && r._value && -1 != r._value.indexOf(m[c].tempChangedColor) && (m[c].changedColor = m[c].tempChangedColor), delete m[c].tempChangedColor;
            a && (r._isInput && p.val(r._hasValue ? r._tempValue : ""), H("onFill", {
                valueText: r._hasValue ? r._tempValue : "",
                change: b
            }), b && (ka = U(!0, {}, Y), r._preventChange = !0, p.trigger("change")), K(r._value, !0))
        }

        function f(a, b) {
            return '\x3cdiv class\x3d"mbsc-color-input-item" data-color\x3d"' + (void 0 !== (b = void 0 !== b ? b : k(a)) ? b : a) + '" style\x3d"background: ' + a + ';"\x3e' + (ca ? "" : '\x3cdiv class\x3d"mbsc-color-input-item-close mbsc-ic mbsc-ic-material-close"\x3e\x3c/div\x3e') + "\x3c/div\x3e"
        }

        function h(a) {
            Q[0].style.background = a ? Ub + "linear-gradient(left, " + (u.rtl ? "#000000" : "#FFFFFF") + " 0%, " + a + " 50%, " + (u.rtl ? "#FFFFFF" : "#000000") + " 100%)" : ""
        }

        function k(a) {
            if (Object.keys(Y).length && !isNaN(a)) return a;
            for (var b in m) if (a == m[b].color || a == m[b].changedColor) return b
        }

        function g(a, b) {
            var c, d = a.match(/\d+/gim);
            switch (!0) {
                case -1 < a.indexOf("rgb"):
                    c = Sb({r: d[0], g: d[1], b: d[2]});
                    break;
                case -1 < a.indexOf("hsl"):
                    c = ae({h: d[0], s: d[1], l: d[2]});
                    break;
                case -1 < a.indexOf("hsv"):
                    c = Dd({h: d[0], s: d[1], v: d[2]});
                    break;
                case -1 < a.indexOf("#"):
                    c = a
            }
            return function (a, b) {
                switch (b) {
                    case "rgb":
                        return rc(a);
                    case "hsl":
                        return Cd(a);
                    case "hsv":
                        return Ed(a);
                    default:
                        return a
                }
            }(c, b || u.format)
        }

        function q(a, c) {
            b(".mbsc-color-active", c).removeClass("mbsc-color-active");
            M && (a.parent().addClass("mbsc-color-active"), B && a && void 0 !== S && Z.eq(S).parent().addClass("mbsc-color-active"))
        }

        function K(a, c) {
            var d, e, p = [], g = 0, h = b.map(m, function (a) {
                return a.changedColor || a.color
            });
            if (ca) {
                if (a = b.isArray(a) ? a[0] : a, -1 < (e = h.indexOf(a)) && p.push(e), a && !p.length && M) e = +b(".mbsc-color-input-item", ba).attr("data-color"), isNaN(e) || p.push(e), P = e
            } else if (a) if (B && M) for (d in ka) void 0 !== ka[d].colorIndex && p.push(+ka[d].colorIndex); else for (d = 0; d < a.length; ++d) -1 < (e = h.indexOf(a[d])) && (p.push(e), h[e] = "temp" + d);
            for (d = 0; d < p.length; ++d) m[p[d]] && I(!0, p[d], g++, m[p[d]].changedColor || m[p[d]].color, !0);
            for (d = 0; d < m.length; ++d) -1 == p.indexOf(d) && I(!1, d, void 0, m[d].changedColor || m[d].color, !1);
            if (B) for (d = g; d < u.select; ++d) Y[d] = {}, Z && Z.eq(d).addClass("mbsc-color-preview-item-empty").css({background: "transparent"});
            ka = U(!0, {}, Y);
            !1 !== c && function () {
                if (C) {
                    var a, c = "";
                    if (ba.empty(), r._hasValue) {
                        if (ca) c += f(r._value, P); else for (a = 0; a < r._value.length; ++a) c += f(r._value[a], Object.keys(Y).length && Y[a].colorIndex ? Y[a].colorIndex : k(r._value[a]));
                        ba.append(c);
                        r.tap(b(".mbsc-color-input-item", ba), function (a) {
                            if (b(a.target).hasClass("mbsc-color-input-item-close")) {
                                var c = b(this).index();
                                a.stopPropagation();
                                a.preventDefault();
                                void 0 === P && (P = b(a.target).parent().attr("data-color"));
                                B && (S = m[P].previewInd, Z.eq(S).parent().removeClass("mbsc-color-active"), ka[c] = {}, Y[c] = {});
                                r._value.splice(c, 1);
                                r.setVal(r._value, !0, !0)
                            } else M && "inline" !== u.display && (P = b(a.target).attr("data-color"), isNaN(P) && (P = k(P)), P && m[P] && (m[P].selected = !0, S = m[P].previewInd, setTimeout(function () {
                                l.scroll(X.eq(P), 400);
                                B && w.scroll(Z.eq(S), 400)
                            }, 200)))
                        })
                    }
                }
            }()
        }

        function I(a, b, c, d, e, f) {
            B && e && (Y[c].colorIndex = a ? b : void 0, Y[c].color = a ? d : void 0, Z) && (e = Z.eq(c), e.removeClass("mbsc-color-preview-item-empty").css({background: a ? d : "transparent"}), a || e.addClass("mbsc-color-preview-item-empty").parent().removeClass("mbsc-color-active"));
            f && (a ? r._tempValue.splice(c, 0, d) : r._tempValue.splice(r._tempValue.indexOf(d), 1));
            X && (a ? X.eq(b).addClass("mbsc-color-selected") : X.eq(b).removeClass("mbsc-color-selected").parent().removeClass("mbsc-color-active"));
            m[b].previewInd = a ? c : void 0;
            m[b].selected = a
        }

        function n(a, b) {
            void 0 !== a && (ca || m[a].selected) ? (P = a, m[a] && (z = m[a].changedColor || m[a].color, J = X.eq(a), M && (q(X.eq(a), b || ""), (A = g(m[a].color, "hsl")).l = g(z, "hsl").l, h(m[a].color), W.setVal(100 - A.l, !1, !1)))) : M && h()
        }

        function L(a, c) {
            var d = b(a.target).index();
            P = Y[d].colorIndex;
            J = X.eq(P);
            S = d;
            n(P, c);
            l.scroll(J, 250);
            H("onPreviewItemTap", {target: a.target, value: Y[d].color, index: d})
        }

        function x(a, c) {
            var d = !1, e = b(".mbsc-color-selected", c);
            if ((J = b(a.target)).hasClass("mbsc-color-clear-item")) return z = "", void r.clear();
            if ((ca || y > +e.length || J.hasClass("mbsc-color-selected")) && G.bLikN) {
                P = J.attr("data-index");
                if (B) {
                    if (void 0 !== m[P].previewInd) d = m[P].previewInd; else a:{
                        for (d = 0; d < u.select; ++d) if (void 0 === Y[d].colorIndex) break a;
                        d = void 0
                    }
                    S = d;
                    d = M && J.hasClass("mbsc-color-selected") && !J.parent().hasClass("mbsc-color-active");
                    6 < Z.length && w.scroll(Z.eq(S))
                }
                z = m[P].changedColor || m[P].color;
                ca ? (e.removeClass("mbsc-color-selected"), r._tempValue = z, z && J.toggleClass("mbsc-color-selected"), q(J, c)) : (q(J, c), d || I(!m[P].selected, P, S, z, !0, !0));
                n(P, c);
                r.live && (r._fillValue(), H("onSet", {value: r._value}));
                H("onItemTap", {target: a.target, value: z, selected: m[P].selected, index: P});
                r._updateHeader()
            }
        }

        var u, v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, ca, y, F, ba, X, Z, J, O, r = this, p = b(a), S = 0,
            ka = {}, Y = {};
        Ua.call(this, a, c, !0);
        r.setVal = r._setVal = function (a, c, d, f) {
            r._hasValue = null !== a && void 0 !== a;
            r._tempValue = ca ? b.isArray(a) ? a[0] : a : b.isArray(a) ? a : a ? [a] : [];
            e(c, void 0 === d ? c : d, f)
        };
        r.getVal = r._getVal = function (a) {
            if (r._hasValue || a) if (F) {
                var b = [];
                for (a = 0; a < m.length; ++a) m[a].selected && b.push(m[a]);
                a = b
            } else a = r[a ? "_tempValue" : "_value"]; else a = null;
            return a
        };
        r._readValue = function () {
            var a = p.val() || "";
            r._hasValue = !1;
            0 !== a.length && "" !== a && (r._hasValue = !0);
            r._hasValue ? (r._tempValue = ca ? a : "hex" == u.format ? a.split(",") : a.match(/[a-z]{3}\((\d+\.?\d{0,}?),\s*([\d.]+)%{0,},\s*([\d.]+)%{0,}\)/gim), e(!0)) : r._tempValue = [];
            K(r._tempValue, r._hasValue)
        };
        r._fillValue = function () {
            r._hasValue = !0;
            e(!0, !0)
        };
        r._generateContent = function () {
            var a, b, c, d = V ? 1 : 0;
            N = t ? Math.ceil((m.length + d) / u.rows) : u.rows;
            b = '\x3cdiv class\x3d"mbsc-color-scroll-cont mbsc-w-p ' + (t ? "" : "mbsc-color-vertical") + '"\x3e\x3cdiv class\x3d"mbsc-color-cont"\x3e' + (t ? '\x3cdiv class\x3d"mbsc-color-row"\x3e' : "");
            for (a = 0; a < m.length; ++a) c = m[a].changedColor || m[a].color, V && 0 === a && (b += '\x3cdiv class\x3d"mbsc-color-item-c"\x3e\x3cdiv tabindex\x3d"0" class\x3d"mbsc-color-clear-item mbsc-btn-e mbsc-color-selected"\x3e\x3cdiv class\x3d"mbsc-color-clear-cross"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e'), 0 !== a && 0 == (a + d) % N && (b += t ? '\x3c/div\x3e\x3cdiv class\x3d"mbsc-color-row"\x3e' : ""), b += '\x3cdiv class\x3d"mbsc-color-item-c"\x3e\x3cdiv tabindex\x3d"0" data-index\x3d"' + a + '" class\x3d"mbsc-color-item mbsc-btn-e mbsc-ic mbsc-ic-material-check mbsc-color-btn-e ' + (m[a].selected ? "mbsc-color-selected" : "") + '"  style\x3d"background:' + c + '"\x3e\x3c/div\x3e\x3c/div\x3e';
            if (b += "\x3c/div\x3e\x3c/div\x3e" + (t ? "\x3c/div\x3e" : ""), M && (b += '\x3cdiv class\x3d"mbsc-color-slider-cont"\x3e\x3cinput class\x3d"mbsc-color-slider" type\x3d"range" data-highlight\x3d"false" value\x3d"50" min\x3d"0" max\x3d"100"/\x3e\x3c/div\x3e'), B) {
                for (var e in b += '\x3cdiv class\x3d"mbsc-color-preview-cont"\x3e\x3cdiv class\x3d"mbsc-color-refine-preview"\x3e', ka) b += '\x3cdiv class\x3d"mbsc-color-preview-item-c mbsc-btn-e mbsc-color-btn-e" tabindex\x3d"0"\x3e\x3cdiv class\x3d"mbsc-color-preview-item ' + (ka[e].color ? "" : "mbsc-color-preview-item-empty") + '" style\x3d"background: ' + (ka[e].color || "initial") + ';"\x3e\x3c/div\x3e\x3c/div\x3e';
                b += "\x3c/div\x3e\x3c/div\x3e"
            }
            return b
        };
        r._position = function (a) {
            var b, c;
            t || (b = a.find(".mbsc-color-cont"), c = Math.ceil(b.find(".mbsc-color-item-c")[0].offsetWidth), b.width(Math.min(Math.floor(a.find(".mbsc-fr-c").width() / c), Math.round(m.length / u.rows)) * c + 1));
            l && l.refresh();
            w && w.refresh()
        };
        r._markupInserted = function (a) {
            t || a.find(".mbsc-color-scroll-cont").css("max-height", a.find(".mbsc-color-item-c")[0].offsetHeight * u.rows);
            l = new xb(a.find(".mbsc-color-scroll-cont")[0], {
                axis: t ? "X" : "Y",
                rtl: u.rtl,
                elastic: 60,
                stopProp: !1,
                mousewheel: u.mousewheel,
                onBtnTap: function (b) {
                    x(b, a)
                }
            })
        };
        r._attachEvents = function (a) {
            var c;
            X = b(".mbsc-color-item", a);
            a.on("keydown", ".mbsc-color-btn-e", function (b) {
                b.stopPropagation();
                32 == b.keyCode && (b.target.classList.contains("mbsc-color-item") ? x(b, a) : L(b, a))
            });
            B && (Z = b(".mbsc-color-preview-item", a));
            M && (a.addClass("mbsc-color-refine"), O = b(".mbsc-color-slider", a), W = new Bb(O[0], {
                theme: u.theme,
                rtl: u.rtl
            }), Q = a.find(".mbsc-progress-track"), P && r._value && n(P, a), O.on("change", function () {
                void 0 !== P && (ca || m[P].selected) && (A.l = 100 - this.value, c = g(A.toString()).toString(), ca ? r._tempValue = c : r._tempValue[void 0 !== S ? S : r._tempValue.length] = c, m[P].tempChangedColor = c, X.eq(P).css("background", c), B && (Y[S].color = c, Z.eq(S).removeClass("mbsc-color-preview-item-empty").css({background: c})), r.live && nd(r._fillValue()))
            }));
            B && (w = new xb(a.find(".mbsc-color-preview-cont")[0], {
                axis: "X",
                rtl: u.rtl,
                stopProp: !1,
                mousewheel: u.mousewheel,
                onBtnTap: function (b) {
                    L(b, a)
                }
            }));
            r._updateHeader()
        };
        r._markupRemove = function () {
            l && l.destroy();
            W && W.destroy();
            w && w.destroy()
        };
        r.__processSettings = function () {
            var c, d;
            if (u = r.settings, H = r.trigger, t = "horizontal" == u.navigation, r._value = [], r._tempValue = [], ca = "single" == u.select, V = void 0 !== u.clear ? u.clear : ca, !(d = u.data || []).length) switch (u.format) {
                case "rgb":
                    d = "rgb(255,235,60) rgb(255,153,0) rgb(244,68,55) rgb(234,30,99) rgb(156,38,176) rgb(104,58,183) rgb(63,81,181) rgb(33,150,243) rgb(0,151,136) rgb(75,175,79) rgb(126,93,78) rgb(158,158,158)".split(" ");
                    V && d.splice(10, 0, "rgb(83, 71, 65)");
                    break;
                case "hsl":
                    d = "hsl(54,100%,62%) hsl(36,100%,50%) hsl(4,90%,59%) hsl(340,83%,52%) hsl(291,64%,42%) hsl(262,52%,47%) hsl(231,48%,48%) hsl(207,90%,54%) hsl(174,100%,30%) hsl(122,40%,49%) hsl(19,24%,40%) hsl(0,0%,62%)".split(" ");
                    V && d.splice(10, 0, "hsl(20, 12%, 29%)");
                    break;
                default:
                    d = "#ffeb3c #ff9900 #f44437 #ea1e63 #9c26b0 #683ab7 #3f51b5 #2196f3 #009788 #4baf4f #7e5d4e #9e9e9e".split(" "), V && d.splice(10, 0, "#534741")
            }
            if (M = "refine" == u.mode, B = !isNaN(u.select), y = isNaN(u.select) ? ca ? 2 : d.length : u.select, F = b.isPlainObject(d[0]), B && !Object.keys(ka).length) for (c = 0; c < u.select; ++c) ka[c] = {}, Y[c] = {};
            m = d.slice(0);
            for (c = 0; c < m.length; ++c) b.isPlainObject(d[c]) ? m[c].color = d[c].color : (d[c] = d[c].toLowerCase(), m[c] = {
                key: c,
                name: d[c],
                color: d[c]
            });
            v = u.defaultValue || m[0].color;
            A = g(z = v, "hsl");
            (C = u.enhance && p.is("input")) && (p.hasClass("mbsc-color-input-hdn") ? ba = p.prev() : ((ba = b("\x3cdiv " + (a.placeholder ? 'data-placeholder\x3d"' + a.placeholder + '"' : "") + ' class\x3d"mbsc-control mbsc-color-input ' + (u.inputClass || "") + '" readonly \x3e\x3c/div\x3e')).insertBefore(p), p.addClass("mbsc-color-input-hdn").attr("tabindex", -1)), u.anchor = ba, r.attachShow(ba))
        };
        r.__destroy = function () {
            C && (p.removeClass("mbsc-color-input-hdn"), ba.remove())
        };
        d || r.init()
    };
    gd.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "color",
        _defaults: U({}, Ua.prototype._defaults, {
            headerText: !1,
            validate: la,
            parseValue: la,
            enhance: !0,
            rows: 2,
            select: "single",
            format: "hex",
            navigation: "horizontal",
            compClass: "mbsc-color"
        })
    };
    Ea.Color = gd;
    G.themes.color = G.themes.frame;
    Gb.color = {hsv2hex: Dd, hsv2rgb: zd, rgb2hsv: Ad, rgb2hex: Sb, rgb2hsl: Bd, hex2rgb: rc, hex2hsv: Ed, hex2hsl: Cd};
    na("color", gd, !1);
    ta.date = Ac;
    ta.time = Ac;
    ta.datetime = Ac;
    na("date", za);
    na("time", za);
    na("datetime", za);
    var we = {
        view: {calendar: {type: "month", popover: !0}},
        allDayText: "All-day",
        labelsShort: "Yrs Mths Days Hrs Mins Secs".split(" "),
        eventText: "event",
        eventsText: "events",
        noEventsText: "No events"
    }, xe = {yearChange: !1, weekDays: "short"};
    ta.eventcalendar = function (a, c) {
        function d(c, d, e) {
            var g, h = 0, l = [], k = "", t = [];
            e || (e = a._prepareObj(r, c, d));
            for (c = Ab(c); c <= d; c.setDate(c.getDate() + 1)) (g = e[c]) && g.length && t.push({
                d: new Date(c),
                list: f(g)
            });
            if (0 < t.length) for (d = 0; d < t.length; d++) for (k += '\x3cli class\x3d"mbsc-lv-gr-title mbsc-event-day"\x3e' + ra(J.dateFormat, t[d].d, J) + "\x3c/li\x3e", e = 0; e < t[d].list.length; e++) {
                g = t[d].list[e];
                var S = g.start ? oa(g.start) : null;
                c = g.end ? oa(g.end) : null;
                var v = g.color, q = Za.test(g.d) || eb.test(g.d), n = g.d ? q ? g.d : oa(g.d) : S,
                    S = g.allDay || q || S && c && S.toDateString() !== c.toDateString();
                l.push({d: t[d].d, e: g});
                k += '\x3cli class\x3d"mbsc-lv-item" data-index\x3d"' + h + '"\x3e\x3cdiv class\x3d"mbsc-event-time"\x3e' + (S ? J.allDayText : n && n.getTime ? ra(J.timeFormat, n) : "") + (!S && c && c.getTime ? "\x3cbr/\x3e" + ra(J.timeFormat, c) : "") + '\x3c/div\x3e\x3cdiv class\x3d"mbsc-event-color"' + (v ? ' style\x3d"background:' + v + ';"' : "") + '\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-event-txt"\x3e' + g.text + "\x3c/div\x3e\x3c/li\x3e";
                h++
            } else k += '\x3cli class\x3d"mbsc-lv-gr-title mbsc-event-empty"\x3e\x3cdiv class\x3d"mbsc-empty"\x3e\x3ch3\x3e' + J.noEventsText + "\x3c/h3\x3e\x3c/div\x3e\x3c/li\x3e";
            m.html('\x3cul class\x3d"mbsc-lv mbsc-lv-v"\x3e' + k + "\x3c/ul\x3e");
            a.tap(b(".mbsc-lv-item", m), function (a) {
                var c = l[b(this).attr("data-index")];
                p("onEventSelect", {domEvent: a, event: c.e, date: c.d})
            })
        }

        function e() {
            if (W) {
                var c = Ab(W.d);
                !function (c, d, e) {
                    if (c) {
                        var g, m, l, r, S, q, n, u, B = '\x3cul class\x3d"mbsc-cal-event-list"\x3e';
                        x.parent().off($a, k).removeClass("mbsc-anim-out").addClass("mbsc-anim-in");
                        V = e;
                        c = f(c);
                        b.each(c, function (a, b) {
                            var c, d, e, f, p, h, k;
                            q = b.start ? oa(b.start) : null;
                            n = b.end ? oa(b.end) : null;
                            u = Za.test(b.d) || eb.test(b.d);
                            r = b.d ? u ? b.d : oa(b.d) : q;
                            S = q && n && q.toDateString() !== n.toDateString();
                            l = b.color;
                            m = g = "";
                            r.getTime && (g = ra((S ? "MM d yy " : "") + J.timeFormat, r));
                            n && (m = ra((S ? "MM d yy " : "") + J.timeFormat, n));
                            B += '\x3cli role\x3d"button" aria-label\x3d"' + b.text + (g ? ", " + J.fromText + " " + g : "") + (m ? ", " + J.toText + " " + m : "") + '" class\x3d"mbsc-cal-event"\x3e\x3cdiv class\x3d"mbsc-cal-event-color" style\x3d"' + (l ? "background:" + l + ";" : "") + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-event-text"\x3e\x3cdiv class\x3d"mbsc-cal-event-time"\x3e' + (!r.getTime || S || b.allDay ? J.allDayText : ra(J.timeFormat, r)) + "\x3c/div\x3e" + b.text + "\x3c/div\x3e" + (q && n ? '\x3cdiv class\x3d"mbsc-cal-event-dur"\x3e' + (c = n - q, d = J.labelsShort, e = Math.abs(c) / 1E3, k = (h = (p = (f = e / 60) / 60) / 24) / 365, 45 > e && Math.round(e) + " " + d[5].toLowerCase() || 45 > f && Math.round(f) + " " + d[4].toLowerCase() || 24 > p && Math.round(p) + " " + d[3].toLowerCase() || 30 > h && Math.round(h) + " " + d[2].toLowerCase() || 365 > h && Math.round(h / 30) + " " + d[1].toLowerCase() || Math.round(k) + " " + d[0].toLowerCase()) + "\x3c/div\x3e" : "") + "\x3c/li\x3e"
                        });
                        B += "\x3c/ul\x3e";
                        v.html(B);
                        p("onEventBubbleShow", {target: V, eventList: x[0]});
                        h(V);
                        a.tap(b(".mbsc-cal-event", v), function (a) {
                            A.scrolled || p("onEventSelect", {domEvent: a, event: c[b(this).index()], date: d})
                        });
                        t = !0
                    }
                }(W.events || z[c], c, W.cell || b('.mbsc-cal-slide-a .mbsc-cal-day[data-full\x3d"' + c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate() + '"]', a._markup)[0]);
                W = null
            }
        }

        function f(a) {
            return a.sort(function (a, b) {
                var c = a.start ? oa(a.start) : null, d = b.start ? oa(b.start) : null, e = a.end ? oa(a.end) : null,
                    f = b.end ? oa(b.end) : null, p = Za.test(a.d) || eb.test(a.d), g = Za.test(b.d) || eb.test(b.d),
                    p = a.d ? p ? a.d : oa(a.d) : c, g = b.d ? g ? b.d : oa(b.d) : d,
                    c = p.getTime ? c && e && c.toDateString() !== e.toDateString() ? 1 : a.allDay ? 2 : p.getTime() : 0,
                    d = g.getTime ? d && f && d.toDateString() !== f.toDateString() ? 1 : b.allDay ? 2 : g.getTime() : 0;
                return c == d ? a.text > b.text ? 1 : -1 : c - d
            })
        }

        function h(a) {
            var c = n[0].offsetHeight, d = n[0].offsetWidth, e = n.offset(), f = e.left, p = b(a), g = a.offsetHeight;
            a = a.offsetWidth;
            var m = p.offset(), h = m.left, e = m.top - e.top, p = 2 > p.closest(".mbsc-cal-row").index(),
                c = getComputedStyle(x.addClass("mbsc-cal-events-t").css({
                    left: 0,
                    top: p ? e + g : 0,
                    bottom: p ? 0 : c - e
                }).addClass("mbsc-cal-events-v")[0]).height, g = x[0].offsetWidth,
                d = Ia(h - f - (g - a) / 2, 0, d - g);
            x.css(he({left: d}, p ? "bottom" : "top", "auto")).removeClass("mbsc-cal-events-t");
            u.css("max-height", c);
            A.refresh();
            A.scroll(0);
            p ? x.addClass("mbsc-cal-events-b") : x.removeClass("mbsc-cal-events-b");
            b(".mbsc-cal-events-arr", x).css("left", h - f + a / 2 - d)
        }

        function k() {
            x.removeClass("mbsc-cal-events-v");
            x.parent().off($a, k).removeClass("mbsc-anim-in mbsc-anim-out")
        }

        function g() {
            x && t && x.parent().addClass("mbsc-anim-out").on($a, k);
            V = null;
            t = !1
        }

        function q(a) {
            var b = J.getYear(a), c = J.getMonth(a), d = J.getDay(a);
            (l = a, "day" == M) ? w = J.getDate(b, c, d + N - 1) : "week" == M ? (a = l.getDay(), d = d + J.firstDay - (0 < J.firstDay - a ? 7 : 0) - a, l = J.getDate(b, c, d), w = J.getDate(b, c, d + 7 * N - 1)) : "month" == M ? (l = J.getDate(b, c, 1), w = J.getDate(b, c + N, 0)) : "year" == M && (l = J.getDate(b, 0, 1), w = J.getDate(b + N, 0, 0))
        }

        function K(a, b) {
            a && p("onPageChange", {firstDay: l, lastDay: w});
            b || p("onPageLoading", {firstDay: l, lastDay: w});
            p("onPageLoaded", {firstDay: l, lastDay: w})
        }

        var I, n, L, x, u, v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, G, y, F, ba, X, Z = U({}, a.settings),
            J = U(a.settings, we, Z, xe, c), O = 0, r = U(!0, [], J.data), p = a.trigger;
        return J.data = r, b.each(r, function (a, b) {
            void 0 === b._id && (b._id = O++)
        }), G = J.view, y = G.calendar, F = G.eventList, ba = J.months, X = J.weeks, y ? ("week" == y.type ? X = y.size || 1 : y.size && (ba = y.size), Q = !1) : (X = 0, Q = !0), F && (M = F.type, N = F.size || 1), P = G.eventList, C = y && y.popover && !1 !== J.eventBubble || J.eventBubble, J.weeks = X, J.months = ba, I = fd.call(this, a), a._onSelectShow = function () {
            g()
        }, a._onGenMonth = function (b, c) {
            z = a._prepareObj(r, b, c)
        }, a._onRefresh = function (a) {
            Q && K(!1, a)
        }, a._onSetDate = function (a, b) {
            Q ? (q(a), K(!0)) : b || B || (P && "day" == M ? d(a, a, z) : C && e())
        }, a._getDayProps = function (a) {
            a = z[a];
            var b = {events: a};
            return J.marked || J.labels || (a ? (b.background = a[0] && a[0].background, b.marked = a, b.markup = J.showEventCount ? '\x3cdiv class\x3d"mbsc-cal-txt"\x3e' + a.length + " " + (1 < a.length ? J.eventsText : J.eventText) + "\x3c/div\x3e" : '\x3cdiv class\x3d"mbsc-cal-marks"\x3e\x3cdiv class\x3d"mbsc-cal-mark"\x3e\x3c/div\x3e\x3c/div\x3e') : b.markup = ""), b
        }, a.addEvent = function (c) {
            var d = [];
            c = U(!0, [], b.isArray(c) ? c : [c]);
            b.each(c, function (a, b) {
                void 0 === b._id && (b._id = O++);
                r.push(b);
                d.push(b._id)
            });
            g();
            a.redraw();
            return d
        }, a.removeEvent = function (c) {
            c = b.isArray(c) ? c : [c];
            b.each(c, function (a, c) {
                b.each(r, function (a, b) {
                    if (b._id === c) return r.splice(a, 1), !1
                })
            });
            g();
            a.redraw()
        }, a.getEvents = function (b) {
            var c;
            return b ? (b.setHours(0, 0, 0, 0), (c = a._prepareObj(r, b, b))[b] ? f(c[b]) : []) : U(!0, [], r)
        }, a.setEvents = function (c) {
            var d = [];
            J.data = r = U(!0, [], c);
            b.each(r, function (a, b) {
                void 0 === b._id && (b._id = O++);
                d.push(b._id)
            });
            g();
            a.redraw();
            return d
        }, a.navigate = function (b, c, d) {
            d && (W = {d: b});
            a.setVal(b, !0, !0, !1, c ? 200 : 0)
        }, U({}, I, {
            outerMonthChange: !1,
            headerText: !1,
            buttons: "inline" !== J.display ? ["close"] : J.buttons,
            compClass: "mbsc-ev-cal mbsc-calendar mbsc-dt mbsc-sc",
            onMarkupReady: function (a, c) {
                L = b(a.target);
                m = b('\x3cdiv class\x3d"mbsc-lv-cont mbsc-lv-' + J.theme + (J.baseTheme ? " mbsc-lv-" + J.baseTheme : "") + ' mbsc-event-list"\x3e\x3c/div\x3e').appendTo(b(".mbsc-fr-w", L));
                I.onMarkupReady.call(this, a);
                n = b(".mbsc-cal-c", L);
                x = b('\x3cdiv class\x3d"mbsc-cal-events mbsc-anim-pop ' + (J.eventBubbleClass || "") + '"\x3e\x3cdiv class\x3d"mbsc-cal-events-arr"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-cal-events-i"\x3e\x3cdiv class\x3d"mbsc-cal-events-sc"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-sc-bar-c"\x3e\x3cdiv class\x3d"mbsc-sc-bar"\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e').appendTo(n);
                u = b(".mbsc-cal-events-i", x);
                v = b(".mbsc-cal-events-sc", x);
                H = b(".mbsc-cal-month", L);
                A = new xb(u[0], {scrollbar: b(".mbsc-sc-bar-c", x)});
                t = !1;
                q(c.getDate(!0));
                c.tap(u, function () {
                    A.scrolled || g()
                });
                P && Q && (K(), Qb(b(".mbsc-cal-btn", L), function (a, b) {
                    var c = J.getYear(l), d = J.getMonth(l), e = J.getDay(l);
                    "day" == M ? (l = J.getDate(c, d, e + b * N), w = J.getDate(c, d, e + (b + 1) * N - 1)) : "week" == M ? (l = J.getDate(c, d, e + b * N * 7), w = J.getDate(c, d, e + (b + 1) * N * 7 - 1)) : "month" == M ? (l = J.getDate(c, d + b * N, 1), w = J.getDate(c, d + (b + 1) * N, 0)) : "year" == M && (l = J.getDate(c + b * N, 0, 1), w = J.getDate(c + (b + 1) * N, 0, 0));
                    K(!0)
                }, 200))
            },
            onDayChange: function (a) {
                var b = a.target !== V;
                g();
                b && (W = {d: a.date, cell: a.target, events: a.events})
            },
            onPageChange: function (b) {
                g();
                B = !0;
                Q || a._isSetDate || a.setVal(b.firstDay)
            },
            onPageLoaded: function (b) {
                var c = b.firstDay;
                b = b.lastDay;
                if (P) if (Q) {
                    d(c, b);
                    var f, p = (J.dateWheels || J.dateFormat).search(/m/i),
                        g = (J.dateWheels || J.dateFormat).search(/y/i), m = J.getYear(c), h = J.getMonth(c),
                        r = J.getYear(b), l = J.getMonth(b);
                    "day" == M ? f = ra(J.dateFormat, c, J) + (1 < N ? " - " + ra(J.dateFormat, b, J) : "") : "week" == M ? f = ra(J.dateFormat, c, J) + " - " + ra(J.dateFormat, b, J) : "month" == M ? f = 1 == N ? g < p ? m + " " + J.monthNames[h] : J.monthNames[h] + " " + m : g < p ? m + " " + J.monthNamesShort[h] + " - " + r + " " + J.monthNamesShort[l] : J.monthNamesShort[h] + " " + m + " - " + J.monthNamesShort[l] + " " + r : "year" == M && (f = m + (1 < N ? " - " + r : ""));
                    H.html(f)
                } else b = "month" == M ? J.getDate(J.getYear(c), J.getMonth(c) + N, 0) : "week" == M ? J.getDate(J.getYear(c), J.getMonth(c), J.getDay(c) + 7 * N - 1) : c = a.getVal(!0), d(c, b, z); else C && e();
                B = !1
            },
            onPosition: function (a) {
                I.onPosition.call(this, a);
                t && h(V)
            },
            onHide: function () {
                I.onHide.call(this);
                A && A.destroy()
            }
        })
    };
    na("eventcalendar", za);
    var Ya = function (a, c, d) {
        function e(a) {
            !b(".mbsc-fr-c", a).hasClass("mbsc-wdg-c") && G.bLikN && (b(".mbsc-fr-c", a).addClass("mbsc-wdg-c").append(k.show()), b(".mbsc-w-p", a).length || b(".mbsc-fr-c", a).addClass("mbsc-w-p"))
        }

        var f, h, k = b(a), g = this;
        Ua.call(this, a, c, !0);
        g._generateContent = function () {
            return ""
        };
        g._markupReady = function (a) {
            "inline" != f.display && e(a)
        };
        g._markupInserted = function (a) {
            "inline" == f.display && e(a);
            a.trigger("mbsc-enhance", [{theme: f.theme, lang: f.lang}])
        };
        g._markupRemove = function () {
            k.hide();
            h && h.parent().length && h.after(k)
        };
        g.__processSettings = function () {
            f = g.settings;
            g.buttons.ok = {text: f.okText, icon: f.okIcon, handler: "set"};
            f.buttons = f.buttons || ("inline" == f.display ? [] : ["ok"]);
            !h && k.parent().length && (h = b(document.createComment("popup")), k.before(h));
            k.hide()
        };
        d || g.init()
    };
    Ya.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasContent: !0,
        _hasLang: !0,
        _class: "popup",
        _defaults: U({}, Ua.prototype._defaults, {compClass: "mbsc-wdg", okText: "OK", headerText: !1})
    };
    Ea.Popup = Ya;
    var ye = Ea.Widget = Ya;
    G.themes.popup = G.themes.frame;
    var fe = Sa && !!window.Promise, db = [], jb = [];
    G.alert = function (a) {
        var b = document.createElement("div");
        return b.innerHTML = Uc(a), bc(be, b, a)
    };
    G.confirm = function (a) {
        var b = document.createElement("div");
        return b.innerHTML = Uc(a), bc(ce, b, a)
    };
    G.prompt = function (a) {
        var b = document.createElement("div");
        return b.innerHTML = Uc(a) + '\x3clabel class\x3d"mbsc-input"\x3e' + (a.label ? '\x3cspan class\x3d"mbsc-label"\x3e' + a.label + "\x3c/span\x3e" : "") + '\x3cinput tabindex\x3d"0" type\x3d"' + (a.inputType || "text") + '" placeholder\x3d"' + (a.placeholder || "") + '" value\x3d"' + (a.value || "") + '"\x3e\x3c/label\x3e', bc(de, b, a)
    };
    G.snackbar = function (a) {
        var b = document.createElement("div"), d = a.button;
        return b.innerHTML = '\x3cdiv class\x3d"mbsc-snackbar-cont"\x3e\x3cdiv class\x3d"mbsc-snackbar-msg"\x3e' + (a.message || "") + "\x3c/div\x3e" + (d ? '\x3cbutton class\x3d"mbsc-snackbar-btn mbsc-btn mbsc-btn-flat"\x3e' + (d.icon ? '\x3cspan class\x3d"mbsc-ic ' + (d.text ? "mbsc-btn-ic " : "") + "mbsc-ic-" + d.icon + '"\x3e\x3c/span\x3e' : "") + (d.text || "") + "\x3c/button\x3e" : "") + "\x3c/div\x3e", bc(Fd, b, a)
    };
    G.toast = function (a) {
        var b = document.createElement("div");
        return b.innerHTML = '\x3cdiv class\x3d"mbsc-toast-msg"\x3e' + (a.message || "") + "\x3c/div\x3e", bc(ee, b, a)
    };
    var Md = "ios" == Fa && 7 < wb, Dc = function (a, c) {
        function d() {
            h.removeClass("mbsc-no-touch")
        }

        var e, f = "", h = b(a), k = {}, g = this;
        Vb.call(this, a, c, !0);
        g.refresh = function (a) {
            xd(h, k, e, a)
        };
        g._init = function () {
            G.themes.form[e.theme] || (e.theme = "mobiscroll");
            h.hasClass("mbsc-form") || h.on("touchstart", d).show();
            f && h.removeClass(f);
            f = "mbsc-form mbsc-no-touch mbsc-" + e.theme + (Md ? " mbsc-form-hb" : "") + (e.baseTheme ? " mbsc-" + e.baseTheme : "") + (e.rtl ? " mbsc-rtl" : " mbsc-ltr");
            h.addClass(f).removeClass("mbsc-cloak");
            g.refresh()
        };
        g._destroy = function () {
            for (var a in h.removeClass(f).off("touchstart", d), k) k[a].destroy()
        };
        g.controls = k;
        e = g.settings;
        g.init()
    };
    Dc.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "form",
        _defaults: {tap: !$c, stopProp: !0, lang: "en"}
    };
    G.themes.form.mobiscroll = {};
    Ea.Form = Dc;
    Nc("[mbsc-enhance],[mbsc-form]", Dc, !0);
    var Ec = function (a, c) {
        var d = "", e = b(a), f = this.settings;
        Vb.call(this, a, c, !0);
        this._init = function () {
            var a = f.context, c = b(a), g = c.find(".mbsc-ms-top .mbsc-ms"), q = c.find(".mbsc-ms-bottom .mbsc-ms"),
                K = {};
            "body" == a ? b("body,html").addClass("mbsc-page-ctx") : c.addClass("mbsc-page-ctx");
            d && e.removeClass(d);
            g.length && (K.paddingTop = g[0].offsetHeight);
            q.length && (K.paddingBottom = q[0].offsetHeight);
            d = "mbsc-page mbsc-" + f.theme + (f.baseTheme ? " mbsc-" + f.baseTheme : "") + (f.rtl ? " mbsc-rtl" : " mbsc-ltr");
            e.addClass(d).removeClass("mbsc-cloak").css(K)
        };
        this._destroy = function () {
            e.removeClass(d)
        };
        f = this.settings;
        this.init()
    };
    Ec.prototype = {_hasDef: !0, _hasTheme: !0, _hasLang: !0, _class: "page", _defaults: {context: "body"}};
    Ea.Page = Ec;
    G.themes.page.mobiscroll = {};
    Nc("[mbsc-page]", Ec);
    na("page", Ec, !1);
    na("form", Dc, !1);
    na("progress", $b, !1);
    na("slider", Bb, !1);
    na("stepper", ac, !1);
    na("switch", Rb, !1);
    na("rating", ic, !1);
    var lc, ze = {invalid: [], showInput: !0, inputClass: "", itemSelector: "li"}, Nd = function (a) {
        function c(a, b, c) {
            var f, g, m = 0, h = [[]], l = w;
            if (b) for (f = 0; f < b; f++) L ? h[0][f] = {} : h[f] = [{}];
            for (; m < a.length;) {
                L ? h[0][m] = e(l, m) : h[m] = [e(l, m)];
                f = 0;
                for (b = void 0; f < l.length && void 0 === b;) l[f].key == a[m] && (void 0 !== c && m <= c || void 0 === c) && (b = f), f++;
                if (void 0 !== b && l[b].children) m++, l = l[b].children; else {
                    if (!(g = d(l)) || !g.children) break;
                    m++;
                    l = g.children
                }
            }
            return h
        }

        function d(a, b) {
            if (!a) return !1;
            for (var c, d = 0; d < a.length;) if (!(c = a[d++]).invalid) return b ? d - 1 : c;
            return !1
        }

        function e(a, b) {
            for (var c = {
                data: [],
                label: n.labels && n.labels[b] ? n.labels[b] : b
            }, d = 0; d < a.length;) c.data.push({value: a[d].key, display: a[d].value}), d++;
            return c
        }

        function f(c) {
            a._isVisible && b(".mbsc-sc-whl-w", a._markup).css("display", "").slice(c).hide()
        }

        function h(a, b) {
            var c, e, f, g = [], m = w, h = 0;
            if (void 0 !== a[h] && h <= b) for (c = 0, e = a[h], f = void 0; c < m.length && void 0 === f;) m[c].key != a[h] || m[c].invalid || (f = c), c++; else e = m[f = d(m, !0)] && m[f].key;
            c = !!m[f] && m[f].children;
            for (g[h] = e; c;) {
                if (m = m[f].children, f = void 0, void 0 !== a[++h] && h <= b) for (c = 0, e = a[h], f = void 0; c < m.length && void 0 === f;) m[c].key != a[h] || m[c].invalid || (f = c), c++; else e = m[f = !1 === (f = d(m, !0)) ? void 0 : f].key;
                c = !(void 0 === f || !d(m[f].children)) && m[f].children;
                g[h] = e
            }
            return {lvl: h + 1, nVector: g}
        }

        function k(b, d, e) {
            var g, m = (d || 0) + 1, h = [], k = {};
            g = c(b, null, d);
            for (d = 0; d < b.length; d++) a._tempWheelArray[d] = b[d] = e.nVector[d] || 0;
            for (; m < e.lvl;) k[m] = L ? g[0][m] : g[m][0], h.push(m++);
            f(e.lvl);
            l = b.slice(0);
            h.length && (q = !0, a.changeWheel(k))
        }

        var g, q, K, I = U({}, a.settings), n = U(a.settings, ze, I),
            I = n.layout || (/top|bottom/.test(n.display) ? "liquid" : ""), L = "liquid" == I, x = n.readonly,
            u = b(this), v = this.id + "_dummy", m = 0, H = 0, l = [], w = n.wheelArray || function t(c) {
                var d = [];
                m = m > H++ ? m : H;
                (1 < c.length ? c : c.children(n.itemSelector)).each(function (c) {
                    var e = b(this), f = e.clone();
                    f.children("ul,ol").remove();
                    f.children(n.itemSelector).remove();
                    var f = a._processMarkup ? a._processMarkup(f) : f.html().replace(/^\s\s*/, "").replace(/\s\s*$/, ""),
                        g = !!e.attr("data-invalid");
                    c = {
                        key: void 0 === e.attr("data-val") || null === e.attr("data-val") ? c : e.attr("data-val"),
                        value: f,
                        invalid: g,
                        children: null
                    };
                    e = "li" === n.itemSelector ? e.children("ul,ol") : e.children(n.itemSelector);
                    e.length && (c.children = t(e));
                    d.push(c)
                });
                H--;
                return d
            }(u), V = function (a) {
                for (var b = [], c = a, e = !0, f = 0; e;) a = d(c), b[f++] = a.key, (e = a.children) && (c = e);
                return b
            }(w), z = c(V, m);
        return b("#" + v).remove(), n.input ? g = b(n.input) : n.showInput && (g = b('\x3cinput type\x3d"text" id\x3d"' + v + '" value\x3d"" class\x3d"' + n.inputClass + '" placeholder\x3d"' + (n.placeholder || "") + '" readonly /\x3e').insertBefore(u)), g && a.attachShow(g), n.wheelArray || u.hide(), {
            wheels: z,
            anchor: g,
            layout: I,
            headerText: !1,
            setOnTap: 1 == m,
            formatValue: function (a) {
                return void 0 === K && (K = h(a, a.length).lvl), a.slice(0, K).join(" ")
            },
            parseValue: function (a) {
                return a ? (a + "").split(" ") : (n.defaultValue || V).slice(0)
            },
            onBeforeShow: function () {
                var b = a.getArrayVal(!0);
                l = b.slice(0);
                n.wheels = c(b, m, m);
                q = !0
            },
            onWheelGestureStart: function (a) {
                var b;
                b = m;
                a = a.index;
                for (var c = []; b;) c[--b] = !0;
                b = (c[a] = !1, c);
                n.readonly = b
            },
            onWheelAnimationEnd: function (b) {
                b = b.index;
                var c = a.getArrayVal(!0), d = h(c, b);
                K = d.lvl;
                n.readonly = x;
                c[b] != l[b] && k(c, b, d)
            },
            onFill: function (a) {
                K = void 0;
                g && g.val(a.valueText)
            },
            validate: function (a) {
                var b = a.values;
                a = a.index;
                var c = h(b, b.length);
                K = c.lvl;
                void 0 === a && (f(c.lvl), q || k(b, a, c));
                q = !1;
                a = K;
                for (var c = w, d = 0, e = []; d < a;) {
                    for (var g = d, m = void 0, l = 0, v = c, n = []; l < d;) {
                        var u = b[l];
                        for (m in v) if (v[m].key == u) {
                            v = v[m].children;
                            break
                        }
                        l++
                    }
                    for (l = 0; l < v.length;) v[l].invalid && n.push(v[l].key), l++;
                    e[g] = n;
                    d++
                }
                return {disabled: e}
            },
            onDestroy: function () {
                g && b("#" + v).remove();
                u.show()
            }
        }
    };
    ta.image = function (a) {
        return a.settings.enhance && (a._processMarkup = function (a) {
            var c = a.attr("data-icon");
            return a.children().each(function (a, c) {
                (c = b(c)).is("img") ? b('\x3cdiv class\x3d"mbsc-img-c"\x3e\x3c/div\x3e').insertAfter(c).append(c.addClass("mbsc-img")) : c.is("p") && c.addClass("mbsc-img-txt")
            }), c && a.prepend('\x3cdiv class\x3d"mbsc-ic mbsc-ic-' + c + '"\x3e\x3c/div'), a.html('\x3cdiv class\x3d"mbsc-img-w"\x3e' + a.html() + "\x3c/div\x3e"), a.html()
        }), Nd.call(this, a)
    };
    na("image", za);
    var Fc = 1, hd = function (a, c) {
        function d() {
            vb = xb = !1;
            $b = R = 0;
            bc = new Date;
            Ta = ea.width();
            na = C(ea);
            ua = na.index(da);
            Pa = da[0].offsetHeight;
            ab = da[0].offsetTop;
            La = Eb[da.attr("data-type") || "defaults"];
            qb = La.stages
        }

        function e(a) {
            var c;
            "touchstart" === a.type && (wb = !0, clearTimeout(Hb));
            !Yb(a, this) || S || hc || lc || Rb || !G.bLikN || (S = !0, wa = !0, Fb = ja(a, "X"), Gb = ja(a, "Y"), ma = 0, pa = 0, da = b(this), c = da, d(), Wb = ha.onItemTap || La.tap || da.hasClass("mbsc-lv-parent") || da.hasClass("mbsc-lv-back"), sb = da.offset().top, Wb && (Y = setTimeout(function () {
                c.addClass("mbsc-lv-item-active");
                ya("onItemActivate", {target: c[0], domEvent: a})
            }, 120)), fa.sortable && !da.hasClass("mbsc-lv-back") && (fa.sortable.group || (Ab = da.nextUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item"), Cb = da.prevUntil(".mbsc-lv-gr-title").filter(".mbsc-lv-item")), rb = (fa.sortable.group ? ea.children(Wa).eq(0) : Cb.length ? Cb.eq(-1) : da)[0].offsetTop - ab, kb = (fa.sortable.group ? ea.children(Wa).eq(-1) : Ab.length ? Ab.eq(-1) : da)[0].offsetTop - ab, fa.sortable.handle ? b(a.target).hasClass("mbsc-lv-handle") && (clearTimeout(Y), "Moz" === Qa ? (a.preventDefault(), K()) : Kb = setTimeout(function () {
                K()
            }, 100)) : Kb = setTimeout(function () {
                Ca.appendTo(da);
                Ca[0].style[Qa + "Animation"] = "mbsc-lv-fill " + (ha.sortDelay - 100) + "ms linear";
                clearTimeout(za);
                clearTimeout(Y);
                wa = !1;
                Kb = setTimeout(function () {
                    Ca[0].style[Qa + "Animation"] = "";
                    K()
                }, ha.sortDelay - 80)
            }, 80)), "mousedown" == a.type && b(document).on("mousemove", f).on("mouseup", h))
        }

        function f(a) {
            var b = !1, c = !0, d = R;
            if (S) if (Ea = ja(a, "X"), Ia = ja(a, "Y"), ma = Ea - Fb, pa = Ia - Gb, clearTimeout(za), ra || gc || jb || da.hasClass("mbsc-lv-back") || (10 < Math.abs(pa) ? (jb = !0, h(U({}, a, {type: "mousemove" == a.type ? "mouseup" : "touchend"})), clearTimeout(Y)) : 7 < Math.abs(ma) && k()), gc) a.preventDefault(), R = ma / Ta * 100, g(d); else if (ra) {
                a.preventDefault();
                var e;
                a = Ra.scrollTop();
                var d = Math.max(rb, Math.min(pa + qc, kb)), f = Da ? sb - Xb + a - qc : sb;
                nc + a < f + d + Pa ? (Ra.scrollTop(f + d - nc + Pa), e = !0) : f + d < a && (Ra.scrollTop(f + d), e = !0);
                e && (qc += Ra.scrollTop() - a);
                dc && (fa.sortable.multiLevel && gb.hasClass("mbsc-lv-parent") ? ab + Pa / 4 + d > dc ? b = !0 : ab + Pa - Pa / 4 + d > dc && (qa = gb.addClass("mbsc-lv-item-hl"), c = !1) : ab + Pa / 2 + d > dc && (gb.hasClass("mbsc-lv-back") ? fa.sortable.multiLevel && (xa = gb.addClass("mbsc-lv-item-hl"), c = !1) : b = !0), b && (Db.insertAfter(gb), Va = gb, gb = y(gb, "next"), ec = dc, dc = gb.length && gb[0].offsetTop, aa++));
                !b && ec && (fa.sortable.multiLevel && Va.hasClass("mbsc-lv-parent") ? ab + Pa - Pa / 4 + d < ec ? b = !0 : ab + Pa / 4 + d < ec && (qa = Va.addClass("mbsc-lv-item-hl"), c = !1) : ab + Pa / 2 + d < ec && (Va.hasClass("mbsc-lv-back") ? fa.sortable.multiLevel && (xa = Va.addClass("mbsc-lv-item-hl"), c = !1) : b = !0), b && (Db.insertBefore(Va), gb = Va, Va = y(Va, "prev"), dc = ec, ec = Va.length && Va[0].offsetTop + Va[0].offsetHeight, aa--));
                c && (qa && (qa.removeClass("mbsc-lv-item-hl"), qa = !1), xa && (xa.removeClass("mbsc-lv-item-hl"), xa = !1));
                b && ya("onSortChange", {target: da[0], index: aa});
                z(da, d);
                ya("onSort", {target: da[0], index: aa})
            } else (5 < Math.abs(ma) || 5 < Math.abs(pa)) && A()
        }

        function h(a) {
            var c, d, e, g = da;
            S && (S = !1, A(), "mouseup" == a.type && b(document).off("mousemove", f).off("mouseup", h), jb || (Hb = setTimeout(function () {
                wb = !1
            }, 300)), (gc || jb || ra) && (vb = !0), gc ? q() : ra ? (e = ea, qa ? (M(da.detach()), d = zb[qa.attr("data-ref")], aa = C(d.child).length, qa.removeClass("mbsc-lv-item-hl"), ha.navigateOnDrop ? J(qa, function () {
                fa.add(null, da, null, null, qa, !0);
                X(da);
                I(da, ua, e, !0)
            }) : (fa.add(null, da, null, null, qa, !0), I(da, ua, e, !0))) : xa ? (M(da.detach()), d = zb[xa.attr("data-back")], aa = C(d.parent).index(d.item) + 1, xa.removeClass("mbsc-lv-item-hl"), ha.navigateOnDrop ? J(xa, function () {
                fa.add(null, da, aa, null, ea, !0);
                X(da);
                I(da, ua, e, !0)
            }) : (fa.add(null, da, aa, null, d.parent, !0), I(da, ua, e, !0))) : (c = Db[0].offsetTop - ab, z(da, c, 6 * Math.abs(c - Math.max(rb, Math.min(pa + qc, kb))), function () {
                M(da);
                da.insertBefore(Db);
                I(da, ua, e, aa !== ua)
            })), ra = !1) : !jb && 5 > Math.abs(ma) && 5 > Math.abs(pa) && (La.tap && La.tap.call(bb, {
                target: da,
                index: ua,
                domEvent: a
            }, fa), Wb && ("touchend" === a.type && Ob(), da.addClass("mbsc-lv-item-active"), ya("onItemActivate", {
                target: da[0],
                domEvent: a
            })), !1 !== ya("onItemTap", {
                target: da[0],
                index: ua,
                domEvent: a
            }) && J(da)), clearTimeout(Y), setTimeout(function () {
                g.removeClass("mbsc-lv-item-active");
                ya("onItemDeactivate", {target: g[0]})
            }, 100), jb = !1, sa = null)
        }

        function k() {
            (gc = N(La.swipe, {
                target: da[0],
                index: ua,
                direction: 0 < ma ? "right" : "left"
            })) && (A(), clearTimeout(Y), La.actions ? (ka = ba(La, ma), tb.html(La.icons).show().children().css("width", ka + "%"), Aa.hide(), b(".mbsc-lv-ic-m", Na).removeClass("mbsc-lv-ic-disabled"), b(La.leftMenu).each(v), b(La.rightMenu).each(v)) : (Aa.show(), tb.hide(), oa = La.start, sa = qb[oa], eb = qb[oa - 1], cb = qb[oa + 1]), da.addClass("mbsc-lv-item-swiping").removeClass("mbsc-lv-item-active"), Jb.css("line-height", Pa + "px"), Na.css({
                top: ab,
                height: Pa,
                backgroundColor: (0 < ma ? La.right : La.left).color || "transparent"
            }).addClass("mbsc-lv-stage-c-v").appendTo(ea.parent()), ha.iconSlide && da.append(Aa), ya("onSlideStart", {
                target: da[0],
                index: ua
            }))
        }

        function g(a) {
            var b = !1;
            Bb || (La.actions ? Na.attr("class", "mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-" + (0 > R ? "right" : "left")) : (eb && (0 > R ? R <= eb.percent : R < sa.percent) ? (cb = sa, sa = eb, eb = qb[--oa - 1], b = !0) : cb && (0 > R ? R > sa.percent : R >= cb.percent) && (eb = sa, sa = cb, cb = qb[++oa + 1], b = !0), sa && ((b || 0 < R == 0 >= a) && t(sa, ha.iconSlide), b && ya("onStageChange", {
                target: da[0],
                index: ua,
                stage: sa
            }))), mb || (Bb = !0, Mb = Yc(l)))
        }

        function q(a) {
            var c, d, e = !1;
            Zc(Mb);
            Bb = !1;
            mb || l();
            La.actions ? 10 < Math.abs(R) && ka && (V(da, 0 > R ? -ka : ka, 200), e = !0, lc = !0, Ba = da, E = ua, b(document).on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (b) {
                b.preventDefault();
                w(da, !0, a)
            })) : R && (ha.quickSwipe && !mb && (c = 300 > (d = new Date - bc) && 50 < ma, 300 > d && -50 > ma ? (xb = !0, t(sa = La.left, ha.iconSlide)) : c && (xb = !0, t(sa = La.right, ha.iconSlide))), sa && sa.action && (N(sa.disabled, {
                target: da[0],
                index: ua
            }) || (e = !0, (lc = mb || N(sa.confirm, {
                target: da[0],
                index: ua
            })) ? (V(da, (0 > R ? -1 : 1) * Aa[0].offsetWidth * 100 / Ta, 200, !0), H(sa, da, ua, !1, a)) : m(sa, da, ua, a))));
            e || w(da, !0, a);
            gc = !1
        }

        function K() {
            ra = !0;
            xa = qa = !1;
            qc = 0;
            aa = ua;
            ha.vibrate && Ic();
            gb = y(da, "next");
            dc = gb.length && gb[0].offsetTop;
            Va = y(da, "prev");
            ec = Va.length && Va[0].offsetTop + Va[0].offsetHeight;
            Db.height(Pa).insertAfter(da);
            da.css({top: ab}).addClass("mbsc-lv-item-dragging").removeClass("mbsc-lv-item-active").appendTo(ia);
            ya("onSortStart", {target: da[0], index: aa})
        }

        function I(a, b, c, d) {
            a.removeClass("mbsc-lv-item-dragging");
            Db.remove();
            ya("onSortEnd", {target: a[0], index: aa});
            ha.vibrate && Ic();
            d && (fa.addUndoAction(function (d) {
                fa.move(a, b, null, d, c, !0)
            }, !0), ya("onSortUpdate", {target: a[0], index: aa}))
        }

        function n() {
            wb || (clearTimeout(Ya), lc && b(document).trigger("touchstart"), ob && (fa.close(fb, Ga), ob = !1, fb = null))
        }

        function L() {
            clearTimeout(ta);
            ta = setTimeout(function () {
                nc = Ra[0].innerHeight || Ra.innerHeight();
                Xb = Da ? Ra.offset().top : 0;
                S && (ab = da[0].offsetTop, Pa = da[0].offsetHeight, Na.css({top: ab, height: Pa}))
            }, 200)
        }

        function x(a) {
            vb && (a.stopPropagation(), a.preventDefault(), vb = !1)
        }

        function u() {
            if (ra || !S) {
                var a, c = Ra.scrollTop(), d = ib.offset().top, e = ib[0].offsetHeight, f = Da ? Ra.offset().top : c;
                b(".mbsc-lv-gr-title", ib).each(function (c, d) {
                    b(d).offset().top < f && (a = d)
                });
                d < f && d + e > f ? va.show().empty().append(b(a).clone()) : va.hide()
            }
        }

        function v(a, c) {
            N(c.disabled, {target: da[0], index: ua}) && b(".mbsc-ic-" + c.icon, Na).addClass("mbsc-lv-ic-disabled")
        }

        function m(a, c, d, e) {
            var f, g = {
                icon: "undo2", text: ha.undoText, action: function () {
                    fa.undo()
                }
            };
            a.undo && (fa.startActionTrack(), b.isFunction(a.undo) && fa.addUndoAction(function () {
                a.undo.call(bb, {target: c[0], index: d}, fa)
            }), Nb = c.attr("data-ref"));
            f = a.action.call(bb, {target: c[0], index: d}, fa);
            a.undo ? (fa.endActionTrack(), !1 !== f && V(c, 0 > +c.attr("data-pos") ? -100 : 100, 200), Db.height(Pa).insertAfter(c), c.css("top", ab).addClass("mbsc-lv-item-undo"), tb.hide(), Aa.show(), Na.append(Aa), t(g), H(g, c, d, !0, e)) : w(c, f, e)
        }

        function H(a, c, d, e, f) {
            var g, p;
            lc = !0;
            b(document).off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (a) {
                a.preventDefault();
                e && Q(c);
                w(c, !0, f)
            });
            Ja || Aa.off(".mbsc-lv-conf").on("touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf", function (a) {
                a.stopPropagation();
                g = ja(a, "X");
                p = ja(a, "Y")
            }).on("touchend.mbsc-lv-conf mouseup.mbsc-lv-conf", function (b) {
                b.preventDefault();
                "touchend" === b.type && Ob();
                10 > Math.abs(ja(b, "X") - g) && 10 > Math.abs(ja(b, "Y") - p) && (m(a, c, d, f), e && (Pb = null, Q(c)))
            })
        }

        function l() {
            V(da, $b + 100 * ma / Ta);
            Bb = !1
        }

        function w(a, c, d) {
            b(document).off(".mbsc-lv-conf");
            Aa.off(".mbsc-lv-conf");
            !1 !== c ? V(a, 0, "0" !== a.attr("data-pos") ? 200 : 0, !1, function () {
                B(a, d);
                M(a)
            }) : B(a, d);
            lc = !1
        }

        function V(a, b, c, d, e) {
            b = Math.max("right" == gc ? 0 : -100, Math.min(b, "left" == gc ? 0 : 100));
            fc = a[0].style;
            a.attr("data-pos", b);
            fc[Qa + "Transform"] = "translate3d(" + (d ? Ta * b / 100 + "px" : b + "%") + ",0,0)";
            fc[Qa + "Transition"] = Ub + "transform " + (c || 0) + "ms";
            e && (hc++, setTimeout(function () {
                e();
                hc--
            }, c));
            R = b
        }

        function z(a, b, c, d) {
            b = Math.max(rb, Math.min(b, kb));
            (fc = a[0].style)[Qa + "Transform"] = "translate3d(0," + b + "px,0)";
            fc[Qa + "Transition"] = Ub + "transform " + (c || 0) + "ms ease-out";
            d && (hc++, setTimeout(function () {
                d();
                hc--
            }, c))
        }

        function A() {
            clearTimeout(Kb);
            !wa && fa.sortable && (wa = !0, Ca.remove())
        }

        function t(a, b) {
            var c = N(a.text, {target: da[0], index: ua}) || "";
            N(a.disabled, {
                target: da[0],
                index: ua
            }) ? Na.addClass("mbsc-lv-ic-disabled") : Na.removeClass("mbsc-lv-ic-disabled");
            Na.css("background-color", a.color || (0 === a.percent ? (0 < R ? La.right : La.left).color || "transparent" : "transparent"));
            Aa.attr("class", "mbsc-lv-ic-c mbsc-lv-ic-" + (b ? "move-" : "") + (0 > R ? "right" : "left"));
            Za.attr("class", " mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-" + (a.icon || "none"));
            Jb.attr("class", "mbsc-lv-ic-text" + (a.icon ? "" : " mbsc-lv-ic-text-only") + (c ? "" : " mbsc-lv-ic-only")).html(c || "\x26nbsp;");
            ha.animateIcons && (xb ? Za.addClass("mbsc-lv-ic-v") : setTimeout(function () {
                Za.addClass("mbsc-lv-ic-a")
            }, 10))
        }

        function B(a, b) {
            S || (Za.attr("class", "mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"), Na.attr("style", "").removeClass("mbsc-lv-stage-c-v"), Jb.html(""));
            Na.removeClass("mbsc-lv-left mbsc-lv-right");
            a && (ya("onSlideEnd", {target: a[0], index: ua}), b && b())
        }

        function Q(a) {
            a.css("top", "").removeClass("mbsc-lv-item-undo");
            Pb ? fa.animate(Db, "collapse", function () {
                Db.remove()
            }) : Db.remove();
            B();
            Pb = Nb = null
        }

        function M(a) {
            (fc = a[0].style)[Qa + "Transform"] = "";
            fc[Qa + "Transition"] = "";
            fc.top = "";
            a.removeClass("mbsc-lv-item-swiping")
        }

        function N(a, c) {
            return b.isFunction(a) ? a.call(this, c, fa) : a
        }

        function W(a) {
            var c, d = a.attr("data-role");
            if (a.attr("data-ref") || (c = Fc++, a.attr("data-ref", c), zb[c] = {
                    item: a,
                    child: a.children(pb),
                    parent: a.parent(),
                    ref: a.parent()[0] === bb ? null : a.parent().parent().attr("data-ref")
                }), a.addClass("list-divider" == d ? "mbsc-lv-gr-title" : "mbsc-lv-item"), fa.sortable.handle && "list-divider" != d && !a.children(".mbsc-lv-handle-c").length && a.append(Sa), ha.enhance && !a.hasClass("mbsc-lv-item-enhanced")) c = a.attr("data-icon"), d = a.find("img").eq(0).addClass("mbsc-lv-img"), d.is(":first-child") ? a.addClass("mbsc-lv-img-" + (ha.rtl ? "right" : "left")) : d.length && a.addClass("mbsc-lv-img-" + (ha.rtl ? "left" : "right")), a.addClass("mbsc-lv-item-enhanced").children().each(function (a, c) {
                (c = b(c)).is("p, h1, h2, h3, h4, h5, h6") && c.addClass("mbsc-lv-txt")
            }), c && a.addClass("mbsc-lv-item-ic-" + (a.attr("data-icon-align") || (ha.rtl ? "right" : "left"))).append('\x3cdiv class\x3d"mbsc-lv-item-ic mbsc-ic mbsc-ic-' + c + '"\x3e\x3c/div\x3e')
        }

        function P(a) {
            b(Wa, a).not(".mbsc-lv-item").each(function () {
                W(b(this))
            });
            b(pb, a).not(".mbsc-lv").addClass("mbsc-lv").prepend(lb).parent().addClass("mbsc-lv-parent").prepend(D);
            b(".mbsc-lv-back", a).each(function () {
                b(this).attr("data-back", b(this).parent().parent().attr("data-ref"))
            })
        }

        function C(a) {
            return a.children(Wa).not(".mbsc-lv-back").not(".mbsc-lv-removed").not(".mbsc-lv-ph")
        }

        function ca(a) {
            return "object" !== (void 0 === a ? "undefined" : mc(a)) && (a = b(Wa, T).filter('[data-id\x3d"' + a + '"]')), b(a)
        }

        function y(a, b) {
            for (a = a[b](); a.length && (!a.hasClass("mbsc-lv-item") || a.hasClass("mbsc-lv-ph") || a.hasClass("mbsc-lv-item-dragging"));) {
                if (!fa.sortable.group && a.hasClass("mbsc-lv-gr-title")) return !1;
                a = a[b]()
            }
            return a
        }

        function F(a) {
            return Ka(a) ? a + "" : 0
        }

        function ba(a, b) {
            return +(0 > b ? F((a.actionsWidth || 0).right) || F(a.actionsWidth) || F(ha.actionsWidth.right) || F(ha.actionsWidth) : F((a.actionsWidth || 0).left) || F(a.actionsWidth) || F(ha.actionsWidth.left) || F(ha.actionsWidth))
        }

        function X(a, b) {
            if (a) {
                var c = Ra.scrollTop(), d = a.is(".mbsc-lv-item") ? a[0].offsetHeight : 0,
                    e = a.offset().top + (Da ? c - Xb : 0);
                b ? (e < c || e + d > c + nc) && Ra.scrollTop(e) : e < c ? Ra.scrollTop(e) : e + d > c + nc && Ra.scrollTop(Math.min(e, e + d - nc / 2))
            }
        }

        function Z(a, b, c, d, e) {
            var f = b.parent(), g = b.prev();
            d = d || la;
            g[0] === Aa[0] && (g = Aa.prev());
            ea[0] !== b[0] ? (ya("onNavStart", {
                level: oc,
                direction: a,
                list: b[0]
            }), Ib.prepend(b.addClass("mbsc-lv-v mbsc-lv-sl-new")), X(T), O(Ib, "mbsc-lv-sl-" + a, function () {
                ea.removeClass("mbsc-lv-sl-curr");
                b.removeClass("mbsc-lv-sl-new").addClass("mbsc-lv-sl-curr");
                Oa && Oa.length ? ea.removeClass("mbsc-lv-v").insertAfter(Oa) : Ha.append(ea.removeClass("mbsc-lv-v"));
                Oa = g;
                Ha = f;
                ea = b;
                X(c, e);
                d.call(bb, c);
                ya("onNavEnd", {level: oc, direction: a, list: b[0]})
            })) : (X(c, e), d.call(bb, c))
        }

        function J(a, b) {
            hc || (a.hasClass("mbsc-lv-parent") ? (oc++, Z("r", zb[a.attr("data-ref")].child, null, b)) : a.hasClass("mbsc-lv-back") && (oc--, Z("l", zb[a.attr("data-back")].parent, zb[a.attr("data-back")].item, b)))
        }

        function O(a, b, c) {
            function d() {
                clearTimeout(e);
                hc--;
                a.off($a, d).removeClass(b);
                c.call(bb, a)
            }

            var e;
            c = c || la;
            ha.animation && "mbsc-lv-item-none" !== b ? (hc++, a.on($a, d).addClass(b), e = setTimeout(d, 250)) : c.call(bb, a)
        }

        function r(a, b) {
            var c, d = a.attr("data-ref");
            c = Zb[d] = Zb[d] || [];
            b && c.push(b);
            a.attr("data-action") || (b = c.shift()) && (a.attr("data-action", 1), b(function () {
                a.removeAttr("data-action");
                c.length ? r(a) : delete Zb[d]
            }))
        }

        function p(a, c, d) {
            var e, f;
            a && a.length && (e = 100 / (a.length + 2), b.each(a, function (b, g) {
                void 0 === g.key && (g.key = Lb++);
                void 0 === g.percent && (g.percent = c * e * (b + 1), d && ((f = U({}, g)).key = Lb++, f.percent = -e * (b + 1), a.push(f), Qb[f.key] = f));
                Qb[g.key] = g
            }))
        }

        var S, ka, Y, R, wa, Ba, E, T, aa, ea, Oa, Ha, na, sa, oa, ta, Ja, ma, pa, qa, xa, ra, ia, za, Ea, Ia, ya, Ca,
            Fa, va, Ma, Da, Sa, Ua, fb, ob, Ga, hb, Ya, lb, D, Za, Aa, Na, Ta, da, Pa, ua, yb, Wa, sb, db, pb, kb, rb,
            tb, gb, dc, cb, Ab, ub, vb, wb, Hb, Cb, Db, Va, ec, eb, xb, Mb, Bb, ha, jb, mb, Ib, Lb, qb, $b, bc, Fb, Gb,
            fc, gc, Tb, cc, Wb, Jb, Kb, La, Eb, Nb, Pb, Ra, nc, qc, Xb, fa = this, bb = a, ib = b(bb), hc = 0, oc = 0,
            ab = 0, Qb = {}, Zb = {}, zb = {};
        Vb.call(this, a, c, !0);
        fa.animate = function (a, b, c) {
            O(a, "mbsc-lv-item-" + b, c)
        };
        fa.add = function (a, c, d, e, f, g) {
            var p, m, h, l, k, v, q = "", n = void 0 === f ? ib : ca(f), u = n,
                t = "object" !== (void 0 === c ? "undefined" : mc(c)) ? b("\x3c" + yb + ' data-ref\x3d"' + Fc++ + '" data-id\x3d"' + a + '"\x3e' + c + "\x3c/" + yb + "\x3e") : b(c),
                S = t[0], w = S.style, H = 0 > t.attr("data-pos") ? "left" : "right", z = t.attr("data-ref");
            e = e || la;
            z || (z = Fc++, t.attr("data-ref", z));
            W(t);
            g || fa.addUndoAction(function (a) {
                l ? fa.navigate(n, function () {
                    u.remove();
                    n.removeClass("mbsc-lv-parent").children(".mbsc-lv-arr").remove();
                    k.child = n.children(pb);
                    fa.remove(t, null, a, !0)
                }) : fa.remove(t, null, a, !0)
            }, !0);
            r(t, function (a) {
                M(t.css("top", "").removeClass("mbsc-lv-item-undo"));
                n.is(Wa) ? (v = n.attr("data-ref"), n.children(pb).length || (l = !0, n.append("\x3c" + db + "\x3e\x3c/" + db + "\x3e"))) : v = n.children(".mbsc-lv-back").attr("data-back");
                (k = zb[v]) && (k.child.length ? u = k.child : (n.addClass("mbsc-lv-parent").prepend(D), u = n.children(pb).prepend(lb).addClass("mbsc-lv"), k.child = u, b(".mbsc-lv-back", n).attr("data-back", v)));
                zb[z] = {item: t, child: t.children(pb), parent: u, ref: v};
                h = C(u);
                m = h.length;
                void 0 !== d && null !== d || (d = m);
                g && (q = "mbsc-lv-item-new-" + (g ? H : ""));
                P(t.addClass(q));
                !1 !== d && (m ? d < m ? t.insertBefore(h.eq(d)) : t.insertAfter(h.eq(m - 1)) : (p = b(".mbsc-lv-back", u)).length ? t.insertAfter(p) : u.append(t));
                T.trigger("mbsc-refresh");
                u.hasClass("mbsc-lv-v") ? (w.height = S.offsetHeight + "px", fa.animate(t, g && Nb === z ? "none" : "expand", function (b) {
                    fa.animate(b, g ? "add-" + H : "pop-in", function (b) {
                        w.height = "";
                        e.call(bb, b.removeClass(q));
                        a()
                    })
                })) : (e.call(bb, t.removeClass(q)), a());
                ya("onItemAdd", {target: S})
            })
        };
        fa.swipe = function (a, b, c, e, f) {
            var p;
            da = a = ca(a);
            Ja = e;
            S = mb = !0;
            c = void 0 === c ? 300 : c;
            ma = 0 < b ? 1 : -1;
            d();
            k();
            V(a, b, c);
            clearTimeout(cc);
            clearInterval(Tb);
            Tb = setInterval(function () {
                p = R;
                R = Oc(a) / Ta * 100;
                g(p)
            }, 10);
            cc = setTimeout(function () {
                clearInterval(Tb);
                p = R;
                R = b;
                g(p);
                q(f);
                S = mb = Ja = !1
            }, c)
        };
        fa.openStage = function (a, b, c, d) {
            Qb[b] && fa.swipe(a, Qb[b].percent, c, d)
        };
        fa.openActions = function (a, b, c, d) {
            a = ca(a);
            var e = ba(Eb[a.attr("data-type") || "defaults"], "left" == b ? -1 : 1);
            fa.swipe(a, "left" == b ? -e : e, c, d)
        };
        fa.close = function (a, b) {
            fa.swipe(a, 0, b)
        };
        fa.remove = function (a, b, c, d) {
            var e, f, g, p;
            c = c || la;
            (a = ca(a)).length && (f = a.parent(), e = C(f).index(a), p = a[0].style, g = a.attr("data-ref"), delete zb[g], d || (a.attr("data-ref") === Nb && (Pb = !0), fa.addUndoAction(function (b) {
                fa.add(null, a, e, b, f, !0)
            }, !0)), r(a, function (e) {
                b = b || (0 > a.attr("data-pos") ? "left" : "right");
                f.hasClass("mbsc-lv-v") ? fa.animate(a.addClass("mbsc-lv-removed"), d ? "pop-out" : "remove-" + b, function (a) {
                    p.height = a[0].offsetHeight + "px";
                    fa.animate(a, "collapse", function (a) {
                        p.height = "";
                        M(a.removeClass("mbsc-lv-removed"));
                        !1 !== c.call(bb, a) && a.remove();
                        e()
                    })
                }) : (!1 !== c.call(bb, a) && a.remove(), e());
                ya("onItemRemove", {target: a[0]})
            }))
        };
        fa.move = function (a, b, c, d, e, f) {
            a = ca(a);
            f || fa.startActionTrack();
            Na.append(Aa);
            fa.remove(a, c, null, f);
            fa.add(null, a, b, d, e, f);
            f || fa.endActionTrack()
        };
        fa.navigate = function (a, b) {
            var c, d;
            a = ca(a);
            c = zb[a.attr("data-ref")];
            d = 0;
            for (var e = zb[a.attr("data-ref")]; e && e.ref;) d++, e = zb[e.ref];
            c && (Z(d >= oc ? "r" : "l", c.parent, a, b, !0), oc = d)
        };
        fa._processSettings = function () {
            ib.is("[mbsc-enhance]") && (Ma = !0, ib.removeAttr("mbsc-enhance"))
        };
        fa._init = function () {
            var a, c, d, g = 0;
            a = ib.find(pb).length ? "left" : "right";
            var l = "", r = "", k = "";
            db = ha.listNode;
            pb = ha.listSelector;
            yb = ha.itemNode;
            Wa = ha.itemSelector;
            d = ha.sort || ha.sortable || !1;
            "group" === d && (d = {group: !1, multiLevel: !0});
            !0 === d && (d = {group: !0, multiLevel: !0, handle: ha.sortHandle});
            d && void 0 === d.handle && (d.handle = ha.sortHandle);
            d.handle && (v = !0 === d.handle ? a : d.handle, Sa = '\x3cdiv class\x3d"mbsc-lv-handle-c mbsc-lv-item-h-' + v + ' mbsc-lv-handle"\x3e\x3cdiv class\x3d"' + ha.handleClass + ' mbsc-lv-handle-bar-c mbsc-lv-handle"\x3e' + ha.handleMarkup + "\x3c/div\x3e\x3c/div\x3e");
            lb = "\x3c" + yb + ' class\x3d"mbsc-lv-item mbsc-lv-back"\x3e' + ha.backText + '\x3cdiv class\x3d"mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ha.leftArrowClass + '"\x3e\x3c/div\x3e\x3c/' + yb + "\x3e";
            D = '\x3cdiv class\x3d"mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + ha.rightArrowClass + '"\x3e\x3c/div\x3e';
            a = "mbsc-lv-cont mbsc-lv-" + ha.theme + (Md ? " mbsc-lv-hb" : "") + (ha.rtl ? " mbsc-lv-rtl" : "") + (ha.baseTheme ? " mbsc-lv-" + ha.baseTheme : "") + (ha.animateIcons ? " mbsc-lv-ic-anim" : "") + (ha.striped ? " mbsc-lv-alt-row" : "") + (ha.fixedHeader ? " mbsc-lv-has-fixed-header" : "") + (d.handle ? " mbsc-lv-handle-" + v : "");
            fa.sortable = d || !1;
            T ? (T.attr("class", a), b(".mbsc-lv-handle-c", T).remove(), b(Wa, T).not(".mbsc-lv-back").removeClass("mbsc-lv-item")) : (l += '\x3cdiv class\x3d"mbsc-lv-multi-c"\x3e\x3c/div\x3e', l += '\x3cdiv class\x3d"mbsc-lv-ic-c"\x3e\x3cdiv class\x3d"mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-lv-ic-text"\x3e\x3c/div\x3e\x3c/div\x3e', ib.addClass("mbsc-lv mbsc-lv-v mbsc-lv-root").removeClass("mbsc-cloak").show(), Na = b('\x3cdiv class\x3d"mbsc-lv-stage-c"\x3e' + l + "\x3c/div\x3e"), Aa = b(".mbsc-lv-ic-c", Na), tb = b(".mbsc-lv-multi-c", Na), Za = b(".mbsc-lv-ic-s", Na), Jb = b(".mbsc-lv-ic-text", Na), Db = b("\x3c" + yb + ' class\x3d"mbsc-lv-item mbsc-lv-ph"\x3e\x3c/' + yb + "\x3e"), Ca = b('\x3cdiv class\x3d"mbsc-lv-fill-item"\x3e\x3c/div\x3e'), T = b('\x3cdiv class\x3d"' + a + '"\x3e\x3c' + db + ' class\x3d"mbsc-lv mbsc-lv-dummy"\x3e\x3c/' + db + '\x3e\x3cdiv class\x3d"mbsc-lv-sl-c"\x3e\x3c/div\x3e\x3c/div\x3e'), Da = "body" !== ha.context, Ra = b(Da ? ha.context : window), ia = b(".mbsc-lv-dummy", T), T.insertAfter(ib), Ra.on("orientationchange resize", L), L(), T.on("touchstart mousedown", ".mbsc-lv-item", e).on("touchmove", ".mbsc-lv-item", f).on("touchend touchcancel", ".mbsc-lv-item", h), bb.addEventListener("click", x, !0), T.on("touchstart mousedown", ".mbsc-lv-ic-m", function (a) {
                Ja || (a.stopPropagation(), a.preventDefault());
                Fb = ja(a, "X");
                Gb = ja(a, "Y")
            }).on("touchend mouseup", ".mbsc-lv-ic-m", function (a) {
                Ja || ("touchend" === a.type && Ob(), lc && !b(this).hasClass("mbsc-lv-ic-disabled") && 10 > Math.abs(ja(a, "X") - Fb) && 10 > Math.abs(ja(a, "Y") - Gb) && m((0 > R ? La.rightMenu : La.leftMenu)[b(this).index()], Ba, E))
            }), Ib = b(".mbsc-lv-sl-c", T).append(ib.addClass("mbsc-lv-sl-curr")).attr("data-ref", Fc++), ea = ib, Ha = T);
            P(ib);
            Lb = 0;
            (Eb = ha.itemGroups || {}).defaults = {
                swipeleft: ha.swipeleft,
                swiperight: ha.swiperight,
                stages: ha.stages,
                actions: ha.actions,
                actionsWidth: ha.actionsWidth
            };
            b.each(Eb, function (a, c) {
                if (c.swipe = void 0 !== c.swipe ? c.swipe : ha.swipe, c.stages = c.stages || [], p(c.stages, 1, !0), p(c.stages.left, 1), p(c.stages.right, -1), (c.stages.left || c.stages.right) && (c.stages = [].concat(c.stages.left || [], c.stages.right || [])), Fa = !1, c.stages.length || (c.swipeleft && c.stages.push({
                        percent: -30,
                        action: c.swipeleft
                    }), c.swiperight && c.stages.push({
                        percent: 30,
                        action: c.swiperight
                    })), b.each(c.stages, function (a, b) {
                        if (0 === b.percent) return Fa = !0, !1
                    }), Fa || c.stages.push({percent: 0}), c.stages.sort(function (a, b) {
                        return a.percent - b.percent
                    }), b.each(c.stages, function (a, b) {
                        if (0 === b.percent) return c.start = a, !1
                    }), Fa ? c.left = c.right = c.stages[c.start] : (c.left = c.stages[c.start - 1] || {}, c.right = c.stages[c.start + 1] || {}), c.actions) {
                    c.leftMenu = c.actions.left || c.actions;
                    c.rightMenu = c.actions.right || c.leftMenu;
                    k = r = "";
                    for (g = 0; g < c.leftMenu.length; g++) r += "\x3cdiv " + (c.leftMenu[g].color ? 'style\x3d"background-color: ' + c.leftMenu[g].color + '"' : "") + ' class\x3d"mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + c.leftMenu[g].icon + '"\x3e' + (c.leftMenu[g].text || "") + "\x3c/div\x3e";
                    for (g = 0; g < c.rightMenu.length; ++g) k += "\x3cdiv " + (c.rightMenu[g].color ? 'style\x3d"background-color: ' + c.rightMenu[g].color + '"' : "") + ' class\x3d"mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + c.rightMenu[g].icon + '"\x3e' + (c.rightMenu[g].text || "") + "\x3c/div\x3e";
                    c.actions.left && (c.swipe = c.actions.right ? c.swipe : "right");
                    c.actions.right && (c.swipe = c.actions.left ? c.swipe : "left");
                    c.icons = '\x3cdiv class\x3d"mbsc-lv-multi mbsc-lv-multi-ic-left"\x3e' + r + '\x3c/div\x3e\x3cdiv class\x3d"mbsc-lv-multi mbsc-lv-multi-ic-right"\x3e' + k + "\x3c/div\x3e"
                }
            });
            ha.fixedHeader && (c = "mbsc-lv-fixed-header" + (Da ? " mbsc-lv-fixed-header-ctx mbsc-lv-" + ha.theme + (ha.baseTheme ? " mbsc-lv-" + ha.baseTheme : "") : ""), va ? va.attr("class", c) : (va = b('\x3cdiv class\x3d"' + c + '"\x3e\x3c/div\x3e'), Da ? Ra.before(va) : T.prepend(va), ub = nd(u, 200), Ra.on("scroll touchmove", ub)));
            ha.hover && (Ga || T.on("mouseover.mbsc-lv", ".mbsc-lv-item", function () {
                fb && fb[0] == this || (n(), fb = b(this), Eb[fb.attr("data-type") || "defaults"].actions && (Ya = setTimeout(function () {
                    wb ? fb = null : (ob = !0, fa.openActions(fb, Ua, Ga, !1))
                }, hb)))
            }).on("mouseleave.mbsc-lv", n), Ga = ha.hover.time || 200, hb = ha.hover.timeout || 200, Ua = ha.hover.direction || ha.hover || "right");
            Ma && T.attr("mbsc-enhance", "");
            T.trigger("mbsc-enhance", [{theme: ha.theme, lang: ha.lang}])
        };
        fa._destroy = function () {
            var a;
            Ha.append(ea);
            Da && va && va.remove();
            Ma && (ib.attr("mbsc-enhance", ""), (a = Xa[T[0].id]) && a.destroy());
            bb.removeEventListener("click", x, !0);
            T.find(".mbsc-lv-txt,.mbsc-lv-img").removeClass("mbsc-lv-txt mbsc-lv-img");
            T.find(pb).removeClass("mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr").find(Wa).removeClass("mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right").removeAttr("data-ref");
            b(".mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic", T).remove();
            ib.insertAfter(T);
            T.remove();
            Na.remove();
            Ra.off("orientationchange resize", L);
            ub && Ra.off("scroll touchmove", ub)
        };
        var Rb, ic = [], pc = [], ac = [], Sb = 0;
        fa.startActionTrack = function () {
            Sb || (ac = []);
            Sb++
        };
        fa.endActionTrack = function () {
            --Sb || pc.push(ac)
        };
        fa.addUndoAction = function (a, b) {
            var c = {action: a, async: b};
            Sb ? ac.push(c) : (pc.push([c]), pc.length > ha.undoLimit && pc.shift())
        };
        fa.undo = function () {
            function a() {
                0 > d ? (Rb = !1, b()) : (c = e[d], d--, c.async ? c.action(a) : (c.action(), a()))
            }

            function b() {
                (e = ic.shift()) && (Rb = !0, d = e.length - 1, a())
            }

            var c, d, e;
            pc.length && ic.push(pc.pop());
            Rb || b()
        };
        ha = fa.settings;
        ya = fa.trigger;
        fa.init()
    };
    hd.prototype = {
        _class: "listview",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: {
            context: "body",
            actionsWidth: 90,
            sortDelay: 250,
            undoLimit: 10,
            swipe: !0,
            quickSwipe: !0,
            animateIcons: !0,
            animation: !0,
            revert: !0,
            vibrate: !0,
            handleClass: "",
            handleMarkup: '\x3cdiv class\x3d"mbsc-lv-handle-bar mbsc-lv-handle"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-lv-handle-bar mbsc-lv-handle"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-lv-handle-bar mbsc-lv-handle"\x3e\x3c/div\x3e',
            listNode: "ul",
            listSelector: "ul,ol",
            itemNode: "li",
            itemSelector: "li",
            leftArrowClass: "mbsc-ic-arrow-left4",
            rightArrowClass: "mbsc-ic-arrow-right4",
            backText: "Back",
            undoText: "Undo",
            stages: []
        }
    };
    Ea.ListView = hd;
    G.themes.listview.mobiscroll = {leftArrowClass: "mbsc-ic-arrow-left5", rightArrowClass: "mbsc-ic-arrow-right5"};
    na("listview", hd, !1);
    var Ae = {
        batch: 50,
        min: 0,
        max: 100,
        defaultUnit: "",
        units: null,
        unitNames: null,
        invalid: [],
        sign: !1,
        step: .05,
        scale: 2,
        convert: function (a) {
            return a
        },
        signText: "\x26nbsp;",
        wholeText: "Whole",
        fractionText: "Fraction",
        unitText: "Unit"
    };
    ta.measurement = function (a) {
        function c(a) {
            return Math.max(H, Math.min(l, F ? 0 > a ? Math.ceil(a) : Math.floor(a) : h(Math.round(a - O), J) + O))
        }

        function d(a) {
            return F ? h((Math.abs(a) - Math.abs(c(a))) * Z - 0, J) + 0 : 0
        }

        function e(a) {
            var b = c(a), e = d(a);
            return e >= Z && (0 > a ? b-- : b++, e = 0), [0 > a ? "-" : "+", b, e]
        }

        function f(a) {
            var b = +a[x];
            return (P && "-" == a[0] ? -1 : 1) * (b + (F ? a[L] / Z * (0 > b ? -1 : 1) : 0))
        }

        function h(a, b) {
            return Math.round(a / b) * b
        }

        function k(a, b, c) {
            return b !== c && t.convert ? t.convert.call(this, a, b, c) : a
        }

        function g(a) {
            var b;
            v = k(t.min, ca, a);
            m = k(t.max, ca, a);
            F ? (H = 0 > v ? Math.ceil(v) : Math.floor(v), l = 0 > m ? Math.ceil(m) : Math.floor(m), w = d(v), V = d(m)) : (H = Math.round(v), l = Math.round(m), l = H + Math.floor((l - H) / J) * J, O = H % J);
            a = H;
            b = l;
            P && (b = Math.abs(a) > Math.abs(b) ? Math.abs(a) : Math.abs(b), a = 0 > a ? 0 : a);
            M.min = 0 > a ? Math.ceil(a / ba) : Math.floor(a / ba);
            M.max = 0 > b ? Math.ceil(b / ba) : Math.floor(b / ba)
        }

        function q(a) {
            return f(a).toFixed(F ? X : 0) + (C ? " " + y[a[u]] : "")
        }

        var K, I, n, L, x, u, v, m, H, l, w, V, z, A;
        A = U({}, a.settings);
        var t = U(a.settings, Ae, A);
        z = {};
        var B = [[]], Q = {}, M = {}, N = {}, G = [], P = t.sign, C = t.units && t.units.length,
            ca = C ? t.defaultUnit || t.units[0] : "", y = [], F = 1 > t.step, ba = 1 < t.step ? t.step : 1,
            X = F ? Math.max(t.scale, (t.step + "").split(".")[1].length) : 1, Z = Math.pow(10, X),
            J = Math.round(F ? t.step * Z : t.step), O = 0, r = 0;
        if (a.setVal = function (c, d, e, f, g) {
                a._setVal(b.isArray(c) ? q(c) : c, d, e, f, g)
            }, t.units) for (A = 0; A < t.units.length; ++A) z = t.units[A], y.push(t.unitNames && t.unitNames[z] || z);
        if (P) if (P = !1, C) for (A = 0; A < t.units.length; A++) 0 > k(t.min, ca, t.units[A]) && (P = !0); else P = 0 > t.min;
        if (P && (B[0].push({data: ["-", "+"], label: t.signText}), r++), M = {
                label: t.wholeText, data: function (a) {
                    return H % ba + a * ba
                }, getIndex: function (a) {
                    return Math.round((a - H % ba) / ba)
                }
            }, B[0].push(M), x = r++, g(ca), F) {
            B[0].push(N);
            N.data = [];
            N.label = t.fractionText;
            for (A = 0; A < Z; A += J) G.push(A), N.data.push({value: A, display: "." + Ca(A, X)});
            L = r++;
            K = Math.ceil(100 / J);
            t.invalid && t.invalid.length && (b.each(t.invalid, function (a, b) {
                var c = 0 < b ? Math.floor(b) : Math.ceil(b);
                0 === c && (c = 0 >= b ? -.001 : .001);
                Q[c] = (Q[c] || 0) + 1;
                0 === b && (Q[c = .001] = (Q[c] || 0) + 1)
            }), b.each(Q, function (a, b) {
                b < K ? delete Q[a] : Q[a] = a
            }))
        }
        if (C) {
            z = {data: [], label: t.unitText, cssClass: "mbsc-msr-whl-unit", circular: !1};
            for (A = 0; A < t.units.length; A++) z.data.push({value: A, display: y[A]});
            B[0].push(z)
        }
        return u = r, {
            wheels: B,
            minWidth: P && F ? 70 : 80,
            showLabel: !1,
            formatValue: q,
            compClass: "mbsc-msr mbsc-sc",
            parseValue: function (a) {
                var c;
                a = ((("number" == typeof a ? a + "" : a) || t.defaultValue) + "").split(" ");
                var d = +a[0], f = [], p = "";
                return C && (p = -1 == (p = -1 == (p = b.inArray(a[1], y)) ? b.inArray(ca, t.units) : p) ? 0 : p), g(n = C ? t.units[p] : ""), (c = e(d = Ia(d = isNaN(d) ? 0 : d, v, m)))[1] = Ia(c[1], H, l), I = d, P && (f[0] = c[0], c[1] = Math.abs(c[1])), f[x] = c[1], F && (f[L] = c[2]), C && (f[u] = p), f
            },
            onCancel: function () {
                I = void 0
            },
            validate: function (c) {
                var d, p, q, z, y, A = c.values;
                y = c.index;
                c = c.direction;
                var B = {}, T = [], K = {}, N = C ? t.units[A[u]] : "";
                if (P && 0 === y && (I = Math.abs(I) * ("-" == A[0] ? -1 : 1)), (y === x || y === L && F || void 0 === I || void 0 === y) && (I = f(A), n = N), (C && y === u && n !== N || void 0 === y) && (g(N), I = k(I, n, N), n = N, p = e(I), void 0 !== y && (K[x] = M, a.changeWheel(K)), P && (A[0] = p[0])), T[x] = [], P) for (T[0] = [], 0 < v && (T[0].push("-"), A[0] = "+"), 0 > m && (T[0].push("+"), A[0] = "-"), y = Math.abs("-" == A[0] ? H : l), r = y + ba; r < y + 20 * ba; r += ba) T[x].push(r), B[r] = !0;
                if (I = Ia(I, v, m), p = e(I), q = P ? Math.abs(p[1]) : p[1], d = P ? "-" == A[0] : 0 > I, A[x] = q, d && (p[0] = "-"), F && (A[L] = p[2]), b.each(F ? Q : t.invalid, function (a, b) {
                        if (P && d) {
                            if (!(0 >= b)) return;
                            b = Math.abs(b)
                        }
                        b = h(k(b, ca, N), F ? 1 : J);
                        B[b] = !0;
                        T[x].push(b)
                    }), A[x] = a.getValidValue(x, q, c, B), p[1] = A[x] * (P && d ? -1 : 1), F) T[L] = [], q = P ? A[0] + A[1] : (0 > I ? "-" : "+") + Math.abs(p[1]), y = (0 > m ? "-" : "+") + Math.abs(l), q === (0 > v ? "-" : "+") + Math.abs(H) && b(G).each(function (a, b) {
                    (d ? b > w : b < w) && T[L].push(b)
                }), q === y && b(G).each(function (a, b) {
                    (d ? b < V : b > V) && T[L].push(b)
                }), b.each(t.invalid, function (a, b) {
                    z = e(k(b, ca, N));
                    (p[0] === z[0] || 0 === p[1] && 0 === z[1] && 0 === z[2]) && p[1] === z[1] && T[L].push(z[2])
                });
                return {disabled: T, valid: A}
            }
        }
    };
    var Be = {min: 0, max: 100, defaultUnit: "km", units: "m km in ft yd mi".split(" ")}, Od = {
        mm: .001,
        cm: .01,
        dm: .1,
        m: 1,
        dam: 10,
        hm: 100,
        km: 1E3,
        "in": .0254,
        ft: .3048,
        yd: .9144,
        ch: 20.1168,
        fur: 201.168,
        mi: 1609.344,
        lea: 4828.032
    };
    ta.distance = function (a) {
        var b = U({}, Be, a.settings);
        return U(a.settings, b, {
            sign: !1, convert: function (a, b, c) {
                return a * Od[b] / Od[c]
            }
        }), ta.measurement.call(this, a)
    };
    var Ce = {min: 0, max: 100, defaultUnit: "N", units: ["N", "kp", "lbf", "pdl"]},
        Pd = {N: 1, kp: 9.80665, lbf: 4.448222, pdl: .138255};
    ta.force = function (a) {
        var b = U({}, Ce, a.settings);
        return U(a.settings, b, {
            sign: !1, convert: function (a, b, c) {
                return a * Pd[b] / Pd[c]
            }
        }), ta.measurement.call(this, a)
    };
    var De = {
        min: 0,
        max: 1E3,
        defaultUnit: "kg",
        units: ["g", "kg", "oz", "lb"],
        unitNames: {tlong: "t (long)", tshort: "t (short)"}
    }, Qd = {
        mg: .001,
        cg: .01,
        dg: .1,
        g: 1,
        dag: 10,
        hg: 100,
        kg: 1E3,
        t: 1E6,
        drc: 1.7718452,
        oz: 28.3495,
        lb: 453.59237,
        st: 6350.29318,
        qtr: 12700.58636,
        cwt: 50802.34544,
        tlong: 1016046.9088,
        tshort: 907184.74
    };
    ta.mass = function (a) {
        var b = U({}, De, a.settings);
        return U(a.settings, b, {
            sign: !1, convert: function (a, b, c) {
                return a * Qd[b] / Qd[c]
            }
        }), ta.measurement.call(this, a)
    };
    var Ee = {
        min: 0,
        max: 100,
        defaultUnit: "kph",
        units: ["kph", "mph", "mps", "fps", "knot"],
        unitNames: {kph: "km/h", mph: "mi/h", mps: "m/s", fps: "ft/s", knot: "knot"}
    }, Rd = {kph: 1, mph: 1.60934, mps: 3.6, fps: 1.09728, knot: 1.852};
    ta.speed = function (a) {
        var b = U({}, Ee, a.settings);
        return U(a.settings, b, {
            sign: !1, convert: function (a, b, c) {
                return a * Rd[b] / Rd[c]
            }
        }), ta.measurement.call(this, a)
    };
    var Fe = {
        min: -20,
        max: 40,
        defaultUnit: "c",
        units: ["c", "k", "f", "r"],
        unitNames: {c: "\u00b0C", k: "K", f: "\u00b0F", r: "\u00b0R"}
    }, Ge = {
        c2k: function (a) {
            return a + 273.15
        }, c2f: function (a) {
            return 9 * a / 5 + 32
        }, c2r: function (a) {
            return 9 * (a + 273.15) / 5
        }, k2c: function (a) {
            return a - 273.15
        }, k2f: function (a) {
            return 9 * a / 5 - 459.67
        }, k2r: function (a) {
            return 9 * a / 5
        }, f2c: function (a) {
            return 5 * (a - 32) / 9
        }, f2k: function (a) {
            return 5 * (a + 459.67) / 9
        }, f2r: function (a) {
            return a + 459.67
        }, r2c: function (a) {
            return 5 * (a - 491.67) / 9
        }, r2k: function (a) {
            return 5 * a / 9
        }, r2f: function (a) {
            return a - 459.67
        }
    };
    ta.temperature = function (a) {
        var b = U({}, Fe, a.settings);
        return U(a.settings, b, {
            sign: !0, convert: function (a, b, c) {
                return Ge[b + "2" + c](a)
            }
        }), ta.measurement.call(this, a)
    };
    na("measurement", za);
    na("distance", za);
    na("force", za);
    na("mass", za);
    na("speed", za);
    na("temperature", za);
    var He = 1, Wb = function (a, c, d) {
        function e(a) {
            clearTimeout(u);
            u = setTimeout(function () {
                k("load" !== a.type)
            }, 200)
        }

        function f(b, c) {
            if (b.length) {
                if (c = t._onItemTap(b, c), g = b, b.parent()[0] == a) {
                    var d = b.offset().left, e = b[0].offsetLeft, f = b[0].offsetWidth, h = q.offset().left;
                    v && (e = w - e - f);
                    "a" == l.variant ? d < h ? m.scroll(v ? e + f - n : -e, 1E3, !0) : d + f > h + n && m.scroll(v ? e : n - e - f, 1E3, !0) : m.scroll(n / 2 - e - f / 2, 1E3, !0)
                }
                c && z("onItemTap", {target: b[0]})
            }
        }

        function h() {
            var a;
            t._initMarkup(q);
            B.find(".mbsc-ripple").remove();
            t._$items = B.children();
            t._$items.each(function (c) {
                var d = b(this), e = d.attr("data-ref");
                e || (e = He++);
                0 === c && (a = d);
                g || (g = t._getActiveItem(d));
                c = "mbsc-scv-item mbsc-btn-e " + ((t._getItemProps(d) || {}).cssClass || "");
                d.attr("data-ref", e).removeClass(A[e]).addClass(c);
                A[e] = c
            });
            g || (g = a);
            t._markupReady(q)
        }

        function k(b, c) {
            var d = l.itemWidth, e = l.layout;
            t.contWidth = n = q.width();
            b && x === n || !n || (x = n, Ka(e) && (L = n ? n / e : d) < d && (e = "liquid"), d && ("liquid" == e ? L = n ? n / Math.min(Math.floor(n / d), t._$items.length) : d : "fixed" == e && (L = d)), t._size(n, L), L && B.children().css("width", L + "px"), t.totalWidth = w = a.offsetWidth, U(m.settings, {
                contSize: n,
                maxSnapScroll: !!l.paging && 1,
                maxScroll: 0,
                minScroll: w > n ? n - w : 0,
                snap: l.paging ? n : !!H && (L || ".mbsc-scv-item"),
                elastic: w > n && (L || n)
            }), m.refresh(c))
        }

        var g, q, K, I, n, L, x, u, v, m, H, l, w, G, z, A = {}, t = this, B = b(a);
        Vb.call(this, a, c, !0);
        t.navigate = function (a, b) {
            f(t._getItem(a), b)
        };
        t.next = function (a) {
            if (g) {
                var b = g.next();
                b.length && f(g = b, a)
            }
        };
        t.prev = function (a) {
            if (g) {
                var b = g.prev();
                b.length && f(g = b, a)
            }
        };
        t.refresh = t.position = function (a) {
            h();
            k(!1, a)
        };
        t._init = function () {
            var a;
            K = b(l.context);
            I = b("body" == l.context ? window : l.context);
            t.__init();
            v = l.rtl;
            H = !(!l.itemWidth || void 0 !== l.snap) || l.snap;
            a = "mbsc-scv-c mbsc-no-touch mbsc-" + l.theme + " " + (l.cssClass || "") + " " + (l.wrapperClass || "") + (l.baseTheme ? " mbsc-" + l.baseTheme : "") + (v ? " mbsc-rtl" : " mbsc-ltr") + (l.itemWidth ? " mbsc-scv-hasw" : "") + ("body" == l.context ? "" : " mbsc-scv-ctx") + " " + (t._getContClass() || "");
            q ? (q.attr("class", a), B.off(".mbsc-ripple")) : ((q = b('\x3cdiv class\x3d"' + a + '"\x3e\x3cdiv class\x3d"mbsc-scv-sc"\x3e\x3c/div\x3e\x3c/div\x3e').insertAfter(B)).find(".mbsc-scv-sc").append(B), m = new xb(q[0], {
                axis: "X",
                contSize: 0,
                maxScroll: 0,
                maxSnapScroll: 1,
                minScroll: 0,
                snap: 1,
                elastic: 1,
                rtl: v,
                mousewheel: l.mousewheel,
                thresholdX: l.threshold,
                stopProp: l.stopProp,
                onStart: function (a) {
                    G || "touchstart" != a.domEvent.type || (G = !0, K.find(".mbsc-no-touch").removeClass("mbsc-no-touch"))
                },
                onBtnTap: function (a) {
                    "touchend" === a.domEvent.type && Kc(a.domEvent, a.domEvent.target);
                    f(b(a.target), !0)
                },
                onGestureStart: function (a) {
                    z("onGestureStart", a)
                },
                onGestureEnd: function (a) {
                    z("onGestureEnd", a)
                },
                onMove: function (a) {
                    z("onMove", a)
                },
                onAnimationStart: function (a) {
                    z("onAnimationStart", a)
                },
                onAnimationEnd: function (a) {
                    z("onAnimationEnd", a)
                }
            }));
            B.css("display", "").addClass("mbsc-scv").removeClass("mbsc-cloak");
            h();
            z("onMarkupReady", {target: q[0]});
            k();
            q.find("img").on("load", e);
            I.on("orientationchange resize", e)
        };
        t._size = la;
        t._initMarkup = la;
        t._markupReady = la;
        t._getContClass = la;
        t._getItemProps = la;
        t._getActiveItem = la;
        t.__init = la;
        t.__destroy = la;
        t._destroy = function () {
            t.__destroy();
            I.off("orientationchange resize", e);
            B.removeClass("mbsc-scv").insertAfter(q).find(".mbsc-scv-item").each(function () {
                var a = b(this);
                a.width("").removeClass(A[a.attr("data-ref")])
            });
            q.remove();
            m.destroy()
        };
        t._getItem = function (a) {
            return "object" !== (void 0 === a ? "undefined" : mc(a)) && (a = t._$items.filter('[data-id\x3d"' + a + '"]')), b(a)
        };
        t._onItemTap = function (a, b) {
            return void 0 === b || b
        };
        l = t.settings;
        z = t.trigger;
        d || t.init()
    };
    Wb.prototype = {
        _class: "scrollview",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: {tap: !0, stopProp: !1, context: "body", layout: "liquid"}
    };
    Ea.ScrollView = Wb;
    var Jb = function (a, c, d) {
        function e() {
            g && "inline" != g && k.find(".mbsc-page").css("padding-" + g, "")
        }

        function f(a) {
            a.addClass(I).attr("data-selected", "true").attr("aria-selected", "true")
        }

        function h(a) {
            a.removeClass(I).removeAttr("data-selected").removeAttr("aria-selected")
        }

        var k, g, q, K, I, n, L = b(a), x = this;
        Wb.call(this, a, c, !0);
        x.select = function (a) {
            q || h(x._$items.filter(".mbsc-ms-item-sel"));
            f(x._getItem(a))
        };
        x.deselect = function (a) {
            h(x._getItem(a))
        };
        x.enable = function (a) {
            x._getItem(a).removeClass("mbsc-disabled").removeAttr("data-disabled").removeAttr("aria-disabled")
        };
        x.disable = function (a) {
            x._getItem(a).addClass("mbsc-disabled").attr("data-disabled", "true").attr("aria-disabled", "true")
        };
        x.setBadge = function (a, c) {
            var d;
            a = x._getItem(a).attr("data-badge", c);
            (d = b(".mbsc-ms-badge", a)).length ? c ? d.html(c) : d.remove() : c && a.append('\x3cspan class\x3d"mbsc-ms-badge"\x3e' + c + "\x3c/span\x3e")
        };
        x._markupReady = function (a) {
            x._hasIcons ? a.addClass("mbsc-ms-icons") : a.removeClass("mbsc-ms-icons");
            x._hasText ? a.addClass("mbsc-ms-txt") : a.removeClass("mbsc-ms-txt");
            x.__markupReady(a)
        };
        x._size = function (b, c) {
            x.__size(b, c);
            "inline" != g && k.find(".mbsc-page").css("padding-" + g, a.offsetHeight + "px")
        };
        x._onItemTap = function (a, b) {
            return !1 !== x.__onItemTap(a, b) && (void 0 === b && (b = !q), K && b && !a.hasClass("mbsc-disabled") && (q ? "true" == a.attr("data-selected") ? h(a) : f(a) : (h(x._$items.filter(".mbsc-ms-item-sel")), f(a))), b)
        };
        x._getActiveItem = function (a) {
            var b = "true" == a.attr("data-selected");
            if (K && !q && b) return a
        };
        x._getItemProps = function (a) {
            var b = "true" == a.attr("data-selected"), c = "true" == a.attr("data-disabled"), d = a.attr("data-icon"),
                e = a.attr("data-badge");
            return a.attr("data-role", "button").attr("aria-selected", b ? "true" : "false").attr("aria-disabled", c ? "true" : "false"), e && a.append('\x3cspan class\x3d"mbsc-ms-badge"\x3e' + e + "\x3c/span\x3e"), d && (x._hasIcons = !0), a.text() && (x._hasText = !0), {cssClass: "mbsc-ms-item " + (n.itemClass || "") + " " + (b ? I : "") + (c ? " mbsc-disabled " + (n.disabledClass || "") : "") + (d ? " mbsc-ms-ic mbsc-ic mbsc-ic-" + d : "")}
        };
        x._getContClass = function () {
            return " mbsc-ms-c mbsc-ms-" + n.variant + " mbsc-ms-" + g + (K ? "" : " mbsc-ms-nosel") + (x.__getContClass() || "")
        };
        x.__init = function () {
            x.___init();
            k = b(n.context);
            e();
            g = n.display;
            q = "multiple" == n.select;
            K = "off" != n.select;
            I = " mbsc-ms-item-sel " + (n.activeClass || "");
            L.addClass("mbsc-ms mbsc-ms-base " + (n.groupClass || ""))
        };
        x.__destroy = function () {
            L.removeClass("mbsc-ms mbsc-ms-base " + (n.groupClass || ""));
            e();
            x.___destroy()
        };
        x.__onItemTap = la;
        x.__getContClass = la;
        x.__markupReady = la;
        x.__size = la;
        x.___init = la;
        x.___destroy = la;
        n = x.settings;
        d || x.init()
    };
    Jb.prototype = {_defaults: U({}, Wb.prototype._defaults)};
    var id = function (a, b) {
        Jb.call(this, a, b, !0);
        this.___init = function () {
        };
        this.init()
    };
    id.prototype = {
        _class: "optionlist",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: U({}, Jb.prototype._defaults, {select: "multiple", variant: "a", display: "inline"})
    };
    Ea.Optionlist = id;
    G.themes.optionlist = G.themes.navigation;
    na("optionlist", id, !1);
    var jd = function (a, c) {
        var d, e, f, h, k, g = b(a), q = g.is("ul,ol"), K = this;
        Jb.call(this, a, c, !0);
        K._initMarkup = function () {
            d && d.remove();
            e && g.append(e.children())
        };
        K.__size = function (a, c) {
            var q, n = c || 72, u = K._$items.length, v = 0;
            k.hide();
            "bottom" == h.type && (g.removeClass("mbsc-scv-liq"), d.remove(), K._$items.remove().each(function (d) {
                var f = b(this);
                g.append(f);
                v += c || this.offsetWidth || 0;
                Math.round(v + (d < u - 1 ? n : 0)) > a && (q = !0, e.append(f.css("width", "").addClass("mbsc-fr-btn-e")))
            }), d.attr("class", f + (h.moreIcon ? " mbsc-menu-item-ic mbsc-ms-ic mbsc-ic mbsc-ic-" + h.moreIcon : "")).html(K._hasIcons && K._hasText ? h.moreText : ""), q && g.append(d));
            "liquid" == h.layout && g.addClass("mbsc-scv-liq")
        };
        K.__onItemTap = function (a) {
            if (a.hasClass("mbsc-menu-item") && !1 !== K.trigger("onMenuShow", {
                    target: a[0],
                    menu: k
                })) return k.show(!1, !0), !1
        };
        K.__getContClass = function () {
            return "hamburger" == h.type ? " mbsc-ms-hamburger" : ""
        };
        K.__markupReady = function (a) {
            "hamburger" == h.type && (e.append(K._$items.addClass("mbsc-fr-btn-e")), d.attr("class", f + (h.menuIcon ? " mbsc-menu-item-ic mbsc-ms-ic mbsc-ic mbsc-ic-" + h.menuIcon : "")).html(h.menuText || ""), g.append(d), h.menuText && h.menuIcon || a.removeClass("mbsc-ms-icons"), h.menuText ? a.addClass("mbsc-ms-txt") : a.removeClass("mbsc-ms-txt"))
        };
        K.___init = function () {
            var a;
            "tab" == h.type ? (h.display = h.display || "top", h.variant = h.variant || "b") : "bottom" == h.type ? (h.display = h.display || "bottom", h.variant = h.variant || "a") : "hamburger" == h.type && (h.display = h.display || "inline", h.variant = h.variant || "a");
            f = "mbsc-scv-item mbsc-ms-item mbsc-btn-e mbsc-menu-item " + (h.itemClass || "");
            d || (d = b(q ? "\x3cli\x3e\x3c/li\x3e" : "\x3cdiv\x3e\x3c/div\x3e"), e = b(q ? "\x3cul\x3e\x3c/ul\x3e" : "\x3cdiv\x3e\x3c/div\x3e").addClass("mbsc-scv mbsc-ms"));
            k = new Ya(e[0], {
                display: "bubble",
                theme: h.theme,
                lang: h.lang,
                context: h.context,
                buttons: [],
                anchor: d,
                onBeforeShow: function (b, c) {
                    a = null;
                    c.settings.cssClass = "mbsc-wdg mbsc-ms-a mbsc-ms-more" + (K._hasText ? "" : " mbsc-ms-more-icons")
                },
                onBeforeClose: function () {
                    return K.trigger("onMenuHide", {target: a && a[0], menu: k})
                },
                onMarkupReady: function (c, d) {
                    K.tap(d._markup.find(".mbsc-fr-c"), function (c) {
                        (a = b(c.target).closest(".mbsc-ms-item")).length && !a.hasClass("mbsc-disabled") && ("touchend" === c.type ? Kc(c, c.target) : (K.navigate(a, !0), k.hide()))
                    })
                }
            })
        };
        K.___destroy = function () {
            k.destroy();
            g.append(K._$items);
            d.remove()
        };
        h = K.settings;
        K.init()
    };
    jd.prototype = {
        _class: "navigation",
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _defaults: U({}, Jb.prototype._defaults, {
            type: "bottom",
            moreText: "More",
            moreIcon: "material-more-horiz",
            menuIcon: "material-menu"
        })
    };
    Ea.Navigation = jd;
    na("nav", jd, !1);
    ta.number = ta.measurement;
    na("number", za);
    var Kb = {}, kd = function (a, c, d) {
        function e(c) {
            var d, e = (d = m.validate.call(a, {values: M.slice(0), variables: X}, y) || [], d.disabled) || [];
            if (y._isValid = !d.invalid, y._tempValue = m.formatValue.call(a, M.slice(0), X, y), v = M.length, N = d.length || P, y._isVisible && G.bLikN) {
                if (b(".mbsc-np-ph", L).each(function (a) {
                        b(this).html("ltr" == m.fill ? a >= v ? u : H || M[a] : a >= P - N ? a + v < P ? u : H || M[a + v - P] : "")
                    }), b(".mbsc-np-cph", L).each(function () {
                        b(this).html(X[b(this).attr("data-var")] || b(this).attr("data-ph"))
                    }), v === P) for (d = 0; 9 >= d; d++) e.push(d);
                b(".mbsc-np-btn", L).removeClass(x);
                for (d = 0; d < e.length; d++) b('.mbsc-np-btn[data-val\x3d"' + e[d] + '"]', L).addClass(x);
                y._isValid ? b(".mbsc-fr-btn-s .mbsc-fr-btn", L).removeClass(x) : b(".mbsc-fr-btn-s .mbsc-fr-btn", L).addClass(x);
                y.live && (y._hasValue = c || y._hasValue, f(c, !1, c), c && W("onSet", {valueText: y._value}))
            }
        }

        function f(a, b, c, d) {
            b && e();
            d || (C = M.slice(0), Z = U({}, X), F = ba.slice(0), y._value = y._hasValue ? y._tempValue : null);
            a && (y._isInput && ca.val(y._hasValue && y._isValid ? y._value : ""), W("onFill", {
                valueText: y._hasValue ? y._tempValue : "",
                change: c
            }), c && (y._preventChange = !0, ca.trigger("change")))
        }

        function h(a) {
            var b, c = a || [], d = [];
            ba = [];
            X = {};
            for (a = 0; a < c.length; a++) /:/.test(c[a]) ? (b = c[a].split(":"), X[b[0]] = b[1], ba.push(b[0])) : (d.push(c[a]), ba.push("digit"));
            return d
        }

        function k(a, b) {
            !(v || b || m.allowLeadingZero) || a.hasClass("mbsc-disabled") || a.hasClass("mbsc-np-btn-empty") || v < P && G.bLikN && (ba.push("digit"), M.push(b), e(!0))
        }

        function g(a) {
            var b, c = a.attr("data-val"), d = "false" !== a.attr("data-track"), f = a.attr("data-var");
            if (!a.hasClass("mbsc-disabled")) {
                if (f && (b = f.split(":"), d && ba.push(b[0]), X[b[0]] = void 0 === b[2] ? b[1] : X[b[0]] == b[1] ? b[2] : b[1]), c.length + v <= N) for (a = 0; a < c.length; ++a) b = Ka(c[a]) ? +c[a] : c[a], (m.allowLeadingZero || v || b) && (ba.push("digit"), M.push(b), v = M.length);
                e(!0)
            }
        }

        function q() {
            var a, b, c = ba.pop();
            if (v || "digit" !== c) {
                if ("digit" !== c && X[c]) for (delete X[c], b = ba.slice(0), ba = [], a = 0; a < b.length; a++) b[a] !== c && ba.push(b[a]); else M.pop();
                e(!0)
            }
        }

        function K(a) {
            !Yb(a, this) || "keydown" == a.type && 32 != a.keyCode || (!function (a) {
                B = !0;
                l = ja(a, "X");
                w = ja(a, "Y");
                clearInterval(Q);
                clearTimeout(Q);
                q();
                Q = setInterval(function () {
                    q()
                }, 150)
            }(a), "mousedown" == a.type && b(document).on("mousemove", I).on("mouseup", n))
        }

        function I(a) {
            B && (V = ja(a, "X"), z = ja(a, "Y"), A = V - l, t = z - w, 7 < Math.abs(A) || 7 < Math.abs(t)) && (clearInterval(Q), B = !1)
        }

        function n(a) {
            B && (a.preventDefault(), clearInterval(Q), B = !1, "mouseup" == a.type && b(document).off("mousemove", I).off("mouseup", n))
        }

        var L, x, u, v, m, H, l, w, V, z, A, t, B, Q, M, N, W, P, C, ca = b(a), y = this, F = [], ba = [], X = {},
            Z = {}, J = {107: "+", 109: "-"}, O = {
                48: 0,
                49: 1,
                50: 2,
                51: 3,
                52: 4,
                53: 5,
                54: 6,
                55: 7,
                56: 8,
                57: 9,
                96: 0,
                97: 1,
                98: 2,
                99: 3,
                100: 4,
                101: 5,
                102: 6,
                103: 7,
                104: 8,
                105: 9
            };
        Ua.call(this, a, c, !0);
        y.setVal = y._setVal = function (c, d, e, g) {
            y._hasValue = null !== c && void 0 !== c;
            M = h(b.isArray(c) ? c.slice(0) : m.parseValue.call(a, c, y));
            f(d, !0, void 0 === e ? d : e, g)
        };
        y.getVal = y._getVal = function (a) {
            return y._hasValue || a ? y[a ? "_tempValue" : "_value"] : null
        };
        y.setArrayVal = y.setVal;
        y.getArrayVal = function (a) {
            return a ? M.slice(0) : y._hasValue ? C.slice(0) : null
        };
        y._readValue = function () {
            var b = ca.val() || "";
            "" !== b && (y._hasValue = !0);
            H ? (X = {}, ba = [], M = []) : (X = y._hasValue ? Z : {}, ba = y._hasValue ? F : [], M = y._hasValue && C ? C.slice(0) : h(m.parseValue.call(a, b, y)), f(!1, !0))
        };
        y._fillValue = function () {
            y._hasValue = !0;
            f(!0, !1, !0)
        };
        y._generateContent = function () {
            var a, b, c, d = 1, e;
            e = "" + ('\x3cdiv class\x3d"mbsc-np-hdr"\x3e\x3cdiv role\x3d"button" tabindex\x3d"0" aria-label\x3d"' + m.deleteText + '" class\x3d"mbsc-np-del mbsc-fr-btn-e mbsc-ic mbsc-ic-' + m.deleteIcon + '"\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-np-dsp"\x3e');
            e += m.template.replace(/d/g, '\x3cspan class\x3d"mbsc-np-ph"\x3e' + u + "\x3c/span\x3e").replace(/&#100;/g, "d").replace(/{([a-zA-Z0-9]*)\:?([a-zA-Z0-9\-\_]*)}/g, '\x3cspan class\x3d"mbsc-np-cph" data-var\x3d"$1" data-ph\x3d"$2"\x3e$2\x3c/span\x3e');
            e += '\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-np-tbl-c mbsc-w-p"\x3e\x3cdiv class\x3d"mbsc-np-tbl"\x3e';
            for (a = 0; 4 > a; a++) {
                e += '\x3cdiv class\x3d"mbsc-np-row"\x3e';
                for (b = 0; 3 > b; b++) c = d, 10 == d || 12 == d ? c = "" : 11 == d && (c = 0), "" === c ? 10 == d && m.leftKey ? e += '\x3cdiv role\x3d"button" tabindex\x3d"0" class\x3d"mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (m.leftKey.variable ? 'data-var\x3d"' + m.leftKey.variable + '"' : "") + ' data-val\x3d"' + (m.leftKey.value || "") + '" ' + (void 0 !== m.leftKey.track ? ' data-track\x3d"' + m.leftKey.track + '"' : "") + "\x3e" + m.leftKey.text + "\x3c/div\x3e" : 12 == d && m.rightKey ? e += '\x3cdiv role\x3d"button" tabindex\x3d"0" class\x3d"mbsc-np-btn mbsc-np-btn-custom mbsc-fr-btn-e" ' + (m.rightKey.variable ? 'data-var\x3d"' + m.rightKey.variable + '"' : "") + ' data-val\x3d"' + (m.rightKey.value || "") + '" ' + (void 0 !== m.rightKey.track ? ' data-track\x3d"' + m.rightKey.track + '"' : "") + " \x3e" + m.rightKey.text + "\x3c/div\x3e" : e += '\x3cdiv class\x3d"mbsc-np-btn mbsc-np-btn-empty"\x3e\x3c/div\x3e' : e += '\x3cdiv tabindex\x3d"0" role\x3d"button" class\x3d"mbsc-np-btn mbsc-fr-btn-e" data-val\x3d"' + c + '"\x3e' + c + "\x3c/div\x3e", d++;
                e += "\x3c/div\x3e"
            }
            return e + "\x3c/div\x3e\x3c/div\x3e"
        };
        y._markupReady = function () {
            L = y._markup;
            e()
        };
        y._attachEvents = function (a) {
            a.on("keydown", function (c) {
                var d;
                void 0 !== J[c.keyCode] ? (d = b('.mbsc-np-btn[data-var\x3d"sign:-:"]', a)).length && (X.sign = 107 == c.keyCode ? "-" : "", g(d)) : void 0 !== O[c.keyCode] ? k(b('.mbsc-np-btn[data-val\x3d"' + O[c.keyCode] + '"]', a), O[c.keyCode]) : 8 == c.keyCode && (c.preventDefault(), q())
            });
            y.tap(b(".mbsc-np-btn", a), function () {
                var a = b(this);
                a.hasClass("mbsc-np-btn-custom") ? g(a) : k(a, +a.attr("data-val"))
            }, !1, 30, !0);
            b(".mbsc-np-del", a).on("touchstart mousedown keydown", K).on("touchmove mousemove", I).on("touchend mouseup keyup", n)
        };
        y.__init = function () {
            (m = y.settings).template = m.template.replace(/\\d/, "\x26#100;");
            u = m.placeholder;
            P = (m.template.match(/d/g) || []).length;
            x = "mbsc-disabled " + (m.disabledClass || "");
            H = m.mask;
            W = y.trigger;
            H && ca.is("input") && ca.attr("type", "password")
        };
        y._indexOf = function (a, b) {
            var c;
            for (c = 0; c < a.length; ++c) if (a[c].toString() === b.toString()) return c;
            return -1
        };
        d || y.init()
    };
    kd.prototype = {
        _hasDef: !0,
        _hasTheme: !0,
        _hasLang: !0,
        _class: "numpad",
        _presets: Kb,
        _defaults: U({}, Ua.prototype._defaults, {
            template: "dd.dd",
            placeholder: "0",
            deleteIcon: "backspace",
            allowLeadingZero: !1,
            headerText: !1,
            fill: "rtl",
            compClass: "mbsc-np",
            deleteText: "Delete",
            decimalSeparator: ".",
            thousandsSeparator: ",",
            validate: la,
            parseValue: la,
            formatValue: function (a, c, d) {
                var e, f = 1;
                e = d.settings;
                d = e.placeholder;
                var h = e.template, k = a.length, g = h.length, q = "";
                for (e = 0; e < g; e++) "d" == h[g - e - 1] ? (q = f <= k ? a[k - f] + q : d + q, f++) : q = h[g - e - 1] + q;
                return b.each(c, function (a, b) {
                    q = q.replace("{" + a + "}", b)
                }), b("\x3cdiv\x3e" + q + "\x3c/div\x3e").text()
            }
        })
    };
    Ea.Numpad = kd;
    G.themes.numpad = G.themes.frame;
    var Ie = {min: 0, max: 99.99, scale: 2, prefix: "", suffix: "", returnAffix: !1};
    Kb.decimal = function (a) {
        function c(a, b) {
            var c;
            c = a.slice(0);
            for (var d = 0; c.length;) d = 10 * d + c.shift();
            for (c = 0; c < f.scale; c++) d /= 10;
            return b ? -1 * d : d
        }

        function d(a) {
            return c(a).toFixed(f.scale).replace(".", f.decimalSeparator).replace(/\B(?=(\d{3})+(?!\d))/g, f.thousandsSeparator)
        }

        var e = U({}, a.settings), f = U(a.settings, Ie, e), e = 0 > f.min, h = new RegExp(f.thousandsSeparator, "g");
        return a.getVal = function (b) {
            b = a._getVal(b);
            var c = (b + "").replace(h, "").replace(f.decimalSeparator, ".");
            return Ka(c) ? +c : b
        }, {
            template: (e ? "{sign}" : "") + f.prefix.replace(/d/g, "\\d") + Array((Math.floor(Math.max(f.max, Math.abs(f.min))) + "").length + 1).join("d") + (f.scale ? "." + Array(f.scale + 1).join("d") : "") + f.suffix.replace(/d/g, "\\d"),
            leftKey: e ? {text: "-/+", variable: "sign:-:", track: !1} : void 0,
            parseValue: function (a) {
                var b, c;
                b = a || f.defaultValue;
                var d = [];
                if (b && (c = (b + "").replace(h, "").replace(f.decimalSeparator, ".").match(/\d+\.?\d*/g))) for (c = (+c[0]).toFixed(f.scale), b = 0; b < c.length; b++) "." != c[b] && (+c[b] ? d.push(+c[b]) : d.length && d.push(0));
                return 0 > a && d.push("sign:-"), d
            },
            formatValue: function (a, b) {
                var e = d(a);
                return (0 > c(a, b && "-" == b.sign) ? "-" : "") + (f.returnAffix ? f.prefix + e + f.suffix : e)
            },
            validate: function (e) {
                var g = e.values, h = d(g), k = c(g, e.variables && "-" == e.variables.sign), I = [];
                return g.length || f.allowLeadingZero || I.push(0), a.isVisible() && b(".mbsc-np-dsp", a._markup).html((e.variables.sign || "") + f.prefix + h + f.suffix), {
                    disabled: I,
                    invalid: k > f.max || k < f.min || !!f.invalid && -1 != a._indexOf(f.invalid, k)
                }
            }
        }
    };
    var Sd = ["h", "m", "s"],
        Je = {min: 0, max: 362439, defaultValue: 0, hourTextShort: "h", minuteTextShort: "m", secTextShort: "s"};
    Kb.timespan = function (a) {
        function c(a) {
            var c, d = "", e = 3600;
            return b(Sd).each(function (b, g) {
                c = Math.floor(a / e);
                a -= c * e;
                e /= 60;
                (0 < c || "s" == g && !d) && (d = d + (d ? " " : "") + c + f[g])
            }), d
        }

        var d = U({}, a.settings), e = U(a.settings, Je, d), f = {
            h: e.hourTextShort.replace(/d/g, "\\d"),
            m: e.minuteTextShort.replace(/d/g, "\\d"),
            s: e.secTextShort.replace(/d/g, "\\d")
        }, d = 'd\x3cspan class\x3d"mbsc-np-sup mbsc-np-time"\x3e' + f.s + "\x3c/span\x3e";
        return 9 < e.max && (d = "d" + d), 99 < e.max && (d = '\x3cspan class\x3d"mbsc-np-ts-m"\x3e' + (639 < e.max ? "d" : "") + 'd\x3c/span\x3e\x3cspan class\x3d"mbsc-np-sup mbsc-np-time"\x3e' + f.m + "\x3c/span\x3e" + d), 6039 < e.max && (d = '\x3cspan class\x3d"mbsc-np-ts-h"\x3e' + (38439 < e.max ? "d" : "") + 'd\x3c/span\x3e\x3cspan class\x3d"mbsc-np-sup mbsc-np-time"\x3e' + f.h + "\x3c/span\x3e" + d), a.setVal = function (b, d, e, f) {
            return Ka(b) && (b = c(b)), a._setVal(b, d, e, f)
        }, a.getVal = function (b) {
            return a._hasValue || b ? Vc(a.getArrayVal(b)) : null
        }, {
            template: d, parseValue: function (a) {
                var d, g = a || c(e.defaultValue), h = [];
                return g && b(Sd).each(function (a, b) {
                    (d = (new RegExp("(\\d+)" + f[b], "gi")).exec(g)) ? 9 < (d = +d[1]) ? (h.push(Math.floor(d / 10)), h.push(d % 10)) : (h.length && h.push(0), (d || h.length) && h.push(d)) : h.length && (h.push(0), h.push(0))
                }), h
            }, formatValue: function (a) {
                return c(Vc(a))
            }, validate: function (b) {
                b = b.values;
                var c = Vc(b.slice(0)), d = [];
                return b.length || d.push(0), {
                    disabled: d,
                    invalid: c > e.max || c < e.min || !!e.invalid && -1 != a._indexOf(e.invalid, +c)
                }
            }
        }
    };
    var Ke = {timeFormat: "hh:ii A", amText: "am", pmText: "pm"};
    Kb.time = function (a) {
        function c(a, c) {
            var d, e = "";
            for (d = 0; d < a.length; ++d) e += a[d] + (d % 2 == (1 == a.length % 2 ? 0 : 1) && d != a.length - 1 ? ":" : "");
            return b.each(c, function (a, b) {
                e += " " + b
            }), e
        }

        var d = U({}, a.settings), e = U(a.settings, Ke, d), f = e.timeFormat.split(":"), h = e.timeFormat.match(/a/i),
            k = h ? "a" == h[0] ? e.amText : e.amText.toUpperCase() : "",
            g = h ? "a" == h[0] ? e.pmText : e.pmText.toUpperCase() : "", q = 0, K = e.min ? "" + e.min.getHours() : "",
            I = e.max ? "" + e.max.getHours() : "",
            n = e.min ? "" + (10 > e.min.getMinutes() ? "0" + e.min.getMinutes() : e.min.getMinutes()) : "",
            L = e.max ? "" + (10 > e.max.getMinutes() ? "0" + e.max.getMinutes() : e.max.getMinutes()) : "",
            x = e.min ? "" + (10 > e.min.getSeconds() ? "0" + e.min.getSeconds() : e.min.getSeconds()) : "",
            u = e.max ? "" + (10 > e.max.getSeconds() ? "0" + e.max.getSeconds() : e.max.getSeconds()) : "";
        return e.min && e.min.setFullYear(2014, 7, 20), e.max && e.max.setFullYear(2014, 7, 20), {
            placeholder: "-",
            allowLeadingZero: !0,
            template: (3 == f.length ? "dd:dd:dd" : 2 == f.length ? "dd:dd" : "dd") + (h ? '\x3cspan class\x3d"mbsc-np-sup"\x3e{ampm:--}\x3c/span\x3e' : ""),
            leftKey: h ? {text: k, variable: "ampm:" + k, value: "00"} : {text: ":00", value: "00"},
            rightKey: h ? {text: g, variable: "ampm:" + g, value: "00"} : {text: ":30", value: "30"},
            parseValue: function (a) {
                var b, c = a || e.defaultValue, d = [];
                if (c) {
                    if (b = (c += "").match(/\d/g)) for (a = 0; a < b.length; a++) d.push(+b[a]);
                    h && d.push("ampm:" + (c.match(new RegExp(e.pmText, "gi")) ? g : k))
                }
                return d
            },
            formatValue: function (a, b) {
                return c(a, b)
            },
            validate: function (b) {
                var d = b.values;
                b = c(d, b.variables);
                var g = 3 <= d.length ? new Date(2014, 7, 20, "" + d[0] + (0 == d.length % 2 ? d[1] : ""), "" + d[0 == d.length % 2 ? 2 : 1] + d[0 == d.length % 2 ? 3 : 2]) : "",
                    l, k, v, z, A, t, B, Q = [];
                l = 2 * f.length;
                if (q = l, d.length || (h && (Q.push(0), Q.push(e.leftKey.value)), Q.push(e.rightKey.value)), !h && (2 > l - d.length || 1 != d[0] && (2 < d[0] || 3 < d[1]) && 2 >= l - d.length) && (Q.push("30"), Q.push("00")), (h ? 1 < d[0] || 2 < d[1] : 1 != d[0] && (2 < d[0] || 3 < d[1])) && d[0] && (d.unshift(0), q = l - 1), d.length == l) for (l = 0; 9 >= l; ++l) Q.push(l); else if (1 == d.length && h && 1 == d[0] || d.length && 0 == d.length % 2 || !h && 2 == d[0] && 3 < d[1] && 1 == d.length % 2) for (l = 6; 9 >= l; ++l) Q.push(l);
                if (B = void 0 !== d[1] ? "" + d[0] + d[1] : "", z = +L == +(void 0 !== d[3] ? "" + d[2] + d[3] : 0), e.invalid) for (l = 0; l < e.invalid.length; ++l) if (v = e.invalid[l].getHours(), A = e.invalid[l].getMinutes(), t = e.invalid[l].getSeconds(), v == +B) {
                    if (2 == f.length && (10 > A ? 0 : +("" + A)[0]) == +d[2]) {
                        Q.push(10 > A ? A : +("" + A)[1]);
                        break
                    }
                    if ((10 > t ? 0 : +("" + t)[0]) == +d[4]) {
                        Q.push(10 > t ? t : +("" + t)[1]);
                        break
                    }
                }
                if (e.min || e.max) {
                    if (k = +K == +B, A = (v = +I == +B) && z, z = k && z, 0 === d.length) {
                        for (l = h ? 2 : 19 < K ? K[0] : 3; l <= (1 == K[0] ? 9 : K[0] - 1); ++l) Q.push(l);
                        if (10 <= K && (Q.push(0), 2 == K[0])) for (l = 3; 9 >= l; ++l) Q.push(l);
                        if (I && 10 > I || K && 10 <= K) for (l = I && 10 > I ? +I[0] + 1 : 0; l < (K && 10 <= K ? K[0] : 10); ++l) Q.push(l)
                    }
                    if (1 == d.length) {
                        if (0 === d[0]) for (l = 0; l < K[0]; ++l) Q.push(l);
                        if (K && 0 !== d[0] && (h ? 1 == d[0] : 2 == d[0])) for (l = h ? 3 : 4; 9 >= l; ++l) Q.push(l);
                        if (d[0] == K[0]) for (l = 0; l < K[1]; ++l) Q.push(l);
                        if (d[0] == I[0] && !h) for (l = +I[1] + 1; 9 >= l; ++l) Q.push(l)
                    }
                    if (2 == d.length && (k || v)) for (l = v ? +L[0] + 1 : 0; l < (k ? +n[0] : 10); ++l) Q.push(l);
                    if (3 == d.length && (v && d[2] == L[0] || k && d[2] == n[0])) for (l = v && d[2] == L[0] ? +L[1] + 1 : 0; l < (k && d[2] == n[0] ? +n[1] : 10); ++l) Q.push(l);
                    if (4 == d.length && (z || A)) for (l = A ? +u[0] + 1 : 0; l < (z ? +x[0] : 10); ++l) Q.push(l);
                    if (5 == d.length && (z && d[4] == x[0] || A && d[4] == u[0])) for (l = A && d[4] == u[0] ? +u[1] + 1 : 0; l < (z && d[4] == x[0] ? +x[1] : 10); ++l) Q.push(l)
                }
                return {
                    disabled: Q,
                    length: q,
                    invalid: (h ? !(new RegExp("^(0?[1-9]|1[012])(:[0-5]\\d)?(:[0-5][0-9]) (?:" + e.amText + "|" + e.pmText + ")$", "i")).test(b) : !/^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(b)) || !!e.invalid && -1 != a._indexOf(e.invalid, g) || !((!e.min || e.min <= g) && (!e.max || g <= e.max))
                }
            }
        }
    };
    var Le = {dateOrder: "mdy", dateFormat: "mm/dd/yy", delimiter: "/"};
    Kb.date = function (a) {
        function c(a) {
            return new Date(+("" + a[d] + a[d + 1] + a[d + 2] + a[d + 3]), +("" + a[e] + a[e + 1]) - 1, +("" + a[f] + a[f + 1]))
        }

        var d, e, f, h, k = [];
        h = U({}, a.settings);
        var g = U(a.settings, Xb, Le, h), q = g.dateOrder, K = g.min ? "" + (g.getMonth(g.min) + 1) : 0,
            I = g.max ? "" + (g.getMonth(g.max) + 1) : 0, n = g.min ? "" + g.getDay(g.min) : 0,
            L = g.max ? "" + g.getDay(g.max) : 0, x = g.min ? "" + g.getYear(g.min) : 0,
            u = g.max ? "" + g.getYear(g.max) : 0,
            q = (q = (q = q.replace(/y+/gi, "yyyy")).replace(/m+/gi, "mm")).replace(/d+/gi, "dd");
        d = q.toUpperCase().indexOf("Y");
        e = q.toUpperCase().indexOf("M");
        f = q.toUpperCase().indexOf("D");
        q = "";
        k.push({val: d, n: "yyyy"}, {val: e, n: "mm"}, {val: f, n: "dd"});
        k.sort(function (a, b) {
            return a.val - b.val
        });
        b.each(k, function (a, b) {
            q += b.n
        });
        d = q.indexOf("y");
        e = q.indexOf("m");
        f = q.indexOf("d");
        q = "";
        for (h = 0; 8 > h; ++h) q += "d", h + 1 != d && h + 1 != e && h + 1 != f || (q += g.delimiter);
        return a.getVal = function (b) {
            return a._hasValue || b ? c(a.getArrayVal(b)) : null
        }, {
            placeholder: "-", fill: "ltr", allowLeadingZero: !0, template: q, parseValue: function (a) {
                var b, c = [];
                b = a || g.defaultValue;
                a = cb(g.dateFormat, b, g);
                if (b) for (b = 0; b < k.length; ++b) c = /m/i.test(k[b].n) ? c.concat(((9 > g.getMonth(a) ? "0" : "") + (g.getMonth(a) + 1)).split("")) : /d/i.test(k[b].n) ? c.concat(((10 > g.getDay(a) ? "0" : "") + g.getDay(a)).split("")) : c.concat((g.getYear(a) + "").split(""));
                return c
            }, formatValue: function (a) {
                return ra(g.dateFormat, c(a), g)
            }, validate: function (b) {
                b = b.values;
                var h = c(b), k, l, q, v, z = [],
                    A = void 0 !== b[d + 3] ? "" + b[d] + b[d + 1] + b[d + 2] + b[d + 3] : "",
                    t = void 0 !== b[e + 1] ? "" + b[e] + b[e + 1] : "",
                    B = void 0 !== b[f + 1] ? "" + b[f] + b[f + 1] : "",
                    Q = "" + g.getMaxDayOfMonth(A || 2012, t - 1 || 0), M = x === A && +K == +t,
                    N = u === A && +I == +t;
                if (g.invalid) for (k = 0; k < g.invalid.length; ++k) {
                    if (l = g.getYear(g.invalid[k]), q = g.getMonth(g.invalid[k]), v = g.getDay(g.invalid[k]), l == +A && q + 1 == +t && (10 > v ? 0 : +("" + v)[0]) == +b[f]) {
                        z.push(10 > v ? v : +("" + v)[1]);
                        break
                    }
                    if (q + 1 == +t && v == +B && ("" + l).substring(0, 3) == "" + b[d] + b[d + 1] + b[d + 2]) {
                        z.push(("" + l)[3]);
                        break
                    }
                    if (l == +A && v == +B && (10 > q ? 0 : +("" + (q + 1))[0]) == +b[e]) {
                        z.push(10 > q ? q : +("" + (q + 1))[1]);
                        break
                    }
                }
                if ("31" != B || b.length != e && b.length != e + 1 || (1 != b[e] ? z.push(2, 4, 6, 9, 11) : z.push(1)), "30" == B && 0 === b[e] && b.length <= e + 1 && z.push(2), b.length == e) {
                    for (k = u === A && 10 > +I ? 1 : 2; 9 >= k; ++k) z.push(k);
                    x === A && 10 <= +K && z.push(0)
                }
                if (b.length == e + 1) {
                    if (1 == b[e]) {
                        for (k = u === A ? +I[1] + 1 : 3; 9 >= k; ++k) z.push(k);
                        if (x == A) for (k = 0; k < +K[1]; ++k) z.push(k)
                    }
                    if (0 === b[e] && (z.push(0), u === A || x === A)) for (k = u === A ? +B > +L ? +I : +I + 1 : 0; k <= (x === A ? +K - 1 : 9); ++k) z.push(k)
                }
                if (b.length == f) {
                    for (k = N ? 1 + (10 < +L ? +L[0] : 0) : +Q[0] + 1; 9 >= k; ++k) z.push(k);
                    if (M) for (k = 0; k < (10 > +n ? 0 : n[0]); ++k) z.push(k)
                }
                if (b.length == f + 1) {
                    if (3 <= b[f] || "02" == t) for (k = +Q[1] + 1; 9 >= k; ++k) z.push(k);
                    if (N && +L[0] == b[f]) for (k = +L[1] + 1; 9 >= k; ++k) z.push(k);
                    if (M && n[0] == b[f]) for (k = 0; k < +n[1]; ++k) z.push(k);
                    if (0 === b[f] && (z.push(0), N || M)) for (k = N ? +L + 1 : 1; k <= (M ? +n - 1 : 9); ++k) z.push(k)
                }
                if (void 0 !== b[d + 2] && "02" == t && "29" == B) for (l = +("" + b[d] + b[d + 1] + b[d + 2] + 0); l <= +("" + b[d] + b[d + 1] + b[d + 2] + 9); ++l) z.push(0 == l % 4 && 0 != l % 100 || 0 == l % 400 ? "" : l % 10);
                if (b.length == d) {
                    if (g.min) for (k = 0; k < +x[0]; ++k) z.push(k);
                    if (g.max) for (k = +u[0] + 1; 9 >= k; ++k) z.push(k);
                    z.push(0)
                }
                if (g.min || g.max) for (l = 1; 4 > l; ++l) if (b.length == d + l) {
                    if (b[d + l - 1] == +x[l - 1] && (3 != l || b[d + l - 2] == +x[l - 2])) for (k = 0; k < +x[l] + (3 == l && b[e + 1] && +K > +t ? 1 : 0); ++k) z.push(k);
                    if (b[d + l - 1] == +u[l - 1] && (3 != l || b[d + l - 2] == +u[l - 2])) for (k = +u[l] + (3 == l && +I < +t ? 0 : 1); 9 >= k; ++k) z.push(k)
                }
                return {
                    disabled: z,
                    invalid: !("Invalid Date" != h && (!g.min || g.min <= h) && (!g.max || h <= g.max)) || !!g.invalid && -1 != a._indexOf(g.invalid, h)
                }
            }
        }
    };
    na("numpad", kd, !1);
    var Me = {autoCorrect: !0, showSelector: !0, minRange: 1, rangeTap: !0, fromText: "Start", toText: "End"};
    ta.range = function (a) {
        function c(a, b) {
            a && (a.setFullYear(b.getFullYear()), a.setMonth(b.getMonth()), a.setDate(b.getDate()))
        }

        function d(b, c) {
            var d = a._order, e = new Date(b);
            return void 0 === d.h && e.setHours(c ? 23 : 0), void 0 === d.i && e.setMinutes(c ? 59 : 0), void 0 === d.s && e.setSeconds(c ? 59 : 0), e.setMilliseconds(c ? 999 : 0), e
        }

        function e(a, b) {
            return new Date(a.getFullYear(), a.getMonth(), a.getDate() + b)
        }

        function f(a) {
            u ? (z - w > C.maxRange - 1 && (a ? w = new Date(Math.max(H, z - C.maxRange + 1)) : z = new Date(Math.min(m, +w + C.maxRange - 1))), z - w < C.minRange - 1 && (a ? w = new Date(Math.max(H, z - C.minRange + 1)) : z = new Date(Math.min(m, +w + C.minRange - 1)))) : (Math.ceil((z - w) / F) > X && (a ? w = d(Math.max(H, e(z, 1 - X)), !1) : z = d(Math.min(m, e(w, X - 1)), !0)), Math.ceil((z - w) / F) < ba && (a ? w = d(Math.max(H, e(z, 1 - ba)), !1) : z = d(Math.min(m, e(w, ba - 1)), !0)))
        }

        function h(a, b) {
            var c = !0;
            return a && w && z && (f(N), f(!N)), w && z || (c = !1), b && g(), c
        }

        function k() {
            B && n && (b(".mbsc-range-btn", n).removeClass(J).removeAttr("aria-checked"), b(".mbsc-range-btn", n).eq(N).addClass(J).attr("aria-checked", "true"))
        }

        function g() {
            var c, d, e, f, g, h = 0, k = y || !N ? " mbsc-cal-day-hl mbsc-cal-sel-start" : " mbsc-cal-sel-start",
                l = y || N ? " mbsc-cal-day-hl mbsc-cal-sel-end" : " mbsc-cal-sel-end";
            if (a.startVal = w ? ra(x, w, C) : "", a.endVal = z ? ra(x, z, C) : "", n && (b(".mbsc-range-btn-v-start", n).html(a.startVal || "\x26nbsp;"), b(".mbsc-range-btn-v-end", n).html(a.endVal || "\x26nbsp;"), c = w ? new Date(w) : null, e = z ? new Date(z) : null, !c && e && (c = new Date(e)), !e && c && (e = new Date(c)), g = N ? e : c, b(".mbsc-cal-day-picker .mbsc-cal-day-hl", n).removeClass(O), b(".mbsc-cal-day-picker .mbsc-selected", n).removeClass("mbsc-cal-sel-start mbsc-cal-sel-end " + J).removeAttr("aria-selected"), c && e)) for (d = c.setHours(0, 0, 0, 0), f = e.setHours(0, 0, 0, 0); e >= c && 126 > h;) b('.mbsc-cal-day[data-full\x3d"' + g.getFullYear() + "-" + (g.getMonth() + 1) + "-" + g.getDate() + '"]', n).addClass(J + " " + (g.getTime() === d ? k : "") + (g.getTime() === f ? l : "")).attr("aria-selected", "true"), g.setDate(g.getDate() + (N ? -1 : 1)), h++
        }

        function q(a, b) {
            return {
                h: a ? a.getHours() : b ? 23 : 0,
                i: a ? a.getMinutes() : b ? 59 : 0,
                s: a ? a.getSeconds() : b ? 59 : 0
            }
        }

        function K() {
            w && (v = !0, a.setDate(w, !1, 0, !0), w = a.getDate(!0));
            z && (v = !0, a.setDate(z, !1, 0, !0), z = a.getDate(!0))
        }

        var I, n, L, x, u, v, m, H, l, w, G, z, A, t, B, Q = a._startDate, M = a._endDate, N = 0, W = new Date,
            P = U({}, a.settings), C = U(a.settings, Me, P), ca = C.anchor, y = C.rangeTap, F = 864E5,
            ba = Math.max(1, Math.ceil(C.minRange / F)), X = Math.max(1, Math.ceil(C.maxRange / F)),
            Z = "mbsc-disabled " + (C.disabledClass || ""), J = "mbsc-selected " + (C.selectedClass || ""),
            O = "mbsc-cal-day-hl",
            r = null === C.defaultValue ? [] : C.defaultValue || [new Date(W.setHours(0, 0, 0, 0)), new Date(W.getFullYear(), W.getMonth(), W.getDate() + 6, 23, 59, 59, 999)];
        return y && (C.tabs = !0), I = fd.call(this, a), x = a._format, u = /time/i.test(C.controls.join(",")), t = "time" === C.controls.join(""), B = 1 != C.controls.length || "calendar" != C.controls[0] || C.showSelector, m = C.max ? d(oa(C.max, x, C), !0) : 1 / 0, H = C.min ? d(oa(C.min, x, C), !1) : -1 / 0, r[0] = oa(r[0], x, C, C.isoParts), r[1] = oa(r[1], x, C, C.isoParts), C.startInput && a.attachShow(b(C.startInput), function () {
            N = 0;
            C.anchor = ca || b(C.startInput)
        }), C.endInput && a.attachShow(b(C.endInput), function () {
            N = 1;
            C.anchor = ca || b(C.endInput)
        }), a._getDayProps = function (a, b) {
            var c = w ? new Date(w.getFullYear(), w.getMonth(), w.getDate()) : null,
                d = z ? new Date(z.getFullYear(), z.getMonth(), z.getDate()) : null;
            return {
                selected: c && d && a >= c && a <= z,
                cssClass: b.cssClass + " " + ((y || !N) && c && c.getTime() === a.getTime() || (y || N) && d && d.getTime() === a.getTime() ? O : "") + (c && c.getTime() === a.getTime() ? " mbsc-cal-sel-start" : "") + (d && d.getTime() === a.getTime() ? " mbsc-cal-sel-end" : "")
            }
        }, a.setVal = function (b, c, d, e, f) {
            b = b || [];
            l = !0;
            w = oa(b[0], x, C, C.isoParts);
            z = oa(b[1], x, C, C.isoParts);
            K();
            a.startVal = w ? ra(x, w, C) : "";
            a.endVal = z ? ra(x, z, C) : "";
            b = I.parseValue(N ? z : w, a);
            e || (a._startDate = Q = w, a._endDate = M = z);
            a._setVal(b, c, d, e, f)
        }, a.getVal = function (b) {
            return b ? [ub(w, C, x), ub(z, C, x)] : a._hasValue ? [ub(Q, C, x), ub(M, C, x)] : null
        }, a.setActiveDate = function (c) {
            N = "start" == c ? 0 : 1;
            c = "start" == c ? w : z;
            a.isVisible() && (k(), y || (b(".mbsc-cal-table .mbsc-cal-day-hl", n).removeClass(O), c && b('.mbsc-cal-day[data-full\x3d"' + c.getFullYear() + "-" + (c.getMonth() + 1) + "-" + c.getDate() + '"]', n).addClass(O)), c && (v = !0, a.setDate(c, !1, 1E3, !0)))
        }, a.getValue = a.getVal, U({}, I, {
            highlight: !1, outerMonthChange: !1, formatValue: function () {
                return a.startVal + (C.endInput ? "" : a.endVal ? " - " + a.endVal : "")
            }, parseValue: function (c) {
                c = c ? c.split(" - ") : [];
                return C.defaultValue = r[1], M = cb(x, C.endInput ? b(C.endInput).val() : c[1], C), C.defaultValue = r[0], Q = cb(x, C.startInput ? b(C.startInput).val() : c[0], C), C.defaultValue = r[N], a.startVal = Q ? ra(x, Q, C) : "", a.endVal = M ? ra(x, M, C) : "", a._startDate = Q, a._endDate = M, I.parseValue(N ? M : Q, a)
            }, onFill: function (c) {
                c = c.change;
                a._startDate = Q = w;
                a._endDate = M = z;
                C.startInput && (b(C.startInput).val(a.startVal), c && b(C.startInput).trigger("change"));
                C.endInput && (b(C.endInput).val(a.endVal), c && b(C.endInput).trigger("change"))
            }, onBeforeClose: function (b) {
                if ("set" === b.button && !h(!0, !0)) return a.setActiveDate(N ? "start" : "end"), !1
            }, onHide: function () {
                I.onHide.call(a);
                N = 0;
                n = null;
                C.anchor = ca
            }, onClear: function () {
                y && (N = 0)
            }, onBeforeShow: function () {
                w = Q || r[0];
                z = M || r[1];
                G = q(w, 0);
                A = q(z, 1);
                C.counter && (C.headerText = function () {
                    var a = w && z ? Math.max(1, Math.round(((new Date(z)).setHours(0, 0, 0, 0) - (new Date(w)).setHours(0, 0, 0, 0)) / 864E5) + 1) : 0;
                    return (1 < a && C.selectedPluralText || C.selectedText).replace(/{count}/, a)
                });
                l = !0
            }, onMarkupReady: function (c) {
                var d;
                K();
                (N && z || !N && w) && (v = !0, a.setDate(N ? z : w, !1, 0, !0));
                g();
                I.onMarkupReady.call(this, c);
                (n = b(c.target)).addClass("mbsc-range");
                B && (d = '\x3cdiv class\x3d"mbsc-range-btn-t" role\x3d"radiogroup"\x3e\x3cdiv class\x3d"mbsc-range-btn-c mbsc-range-btn-start"\x3e\x3cdiv role\x3d"radio" data-select\x3d"start" class\x3d"mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn"\x3e' + C.fromText + '\x3cdiv class\x3d"mbsc-range-btn-v mbsc-range-btn-v-start"\x3e' + (a.startVal || "\x26nbsp;") + '\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3cdiv class\x3d"mbsc-range-btn-c mbsc-range-btn-end"\x3e\x3cdiv role\x3d"radio" data-select\x3d"end" class\x3d"mbsc-fr-btn-e mbsc-fr-btn-nhl mbsc-range-btn"\x3e' + C.toText + '\x3cdiv class\x3d"mbsc-range-btn-v mbsc-range-btn-v-end"\x3e' + (a.endVal || "\x26nbsp;") + "\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e\x3c/div\x3e", C.headerText ? b(".mbsc-fr-hdr", n).after(d) : b(".mbsc-fr-w", n).prepend(d), k());
                b(".mbsc-range-btn", n).on("touchstart click", function (c) {
                    Yb(c, this) && (a._showDayPicker(), a.setActiveDate(b(this).attr("data-select")))
                })
            }, onDayChange: function (a) {
                a.active = N ? "end" : "start";
                L = !0
            }, onSetDate: function (e) {
                var f;
                v || (f = d(e.date, N), l && !L || (y && L && (1 == N && f < w && (N = 0), N ? f.setHours(A.h, A.i, A.s, 999) : f.setHours(G.h, G.i, G.s, 0)), N ? (z = new Date(f), A = q(z)) : (w = new Date(f), G = q(w)), t && C.autoCorrect && (c(w, f), c(z, f)), y && L && !N && (z = null)));
                t && !C.autoCorrect && z < w && (z = new Date(z.setDate(z.getDate() + 1)));
                a._isValid = h(l || L || C.autoCorrect, !v);
                e.active = N ? "end" : "start";
                !v && y && (L && (N = N ? 0 : 1), k());
                a.isVisible() && (a._isValid ? b(".mbsc-fr-btn-s .mbsc-fr-btn", a._markup).removeClass(Z) : b(".mbsc-fr-btn-s .mbsc-fr-btn", a._markup).addClass(Z));
                v = l = L = !1
            }, onTabChange: function (b) {
                "calendar" != b.tab && a.setDate(N ? z : w, !1, 1E3, !0);
                h(!0, !0)
            }
        })
    };
    na("range", za);
    na("scroller", za, !1);
    na("scrollview", Wb, !1);
    var ge = 0;
    Gb.getJson = Wc;
    var Ne = {
        inputClass: "",
        invalid: [],
        rtl: !1,
        showInput: !0,
        groupLabel: "Groups",
        dataHtml: "html",
        dataText: "text",
        dataValue: "value",
        dataGroup: "group",
        dataDisabled: "disabled",
        filterPlaceholderText: "Type to filter",
        filterEmptyText: "No results",
        filterClearIcon: "material-close"
    };
    ta.select = function (a) {
        function c(a) {
            var c, d, e, f, g, h, k = 0, l = 0, p = {};
            if (X = {}, z = {}, Q = [], G = [], E.length = 0, ka) b.each(v, function (b, k) {
                g = k[y.dataText] + "";
                d = k[y.dataHtml];
                h = k[y.dataValue];
                e = k[y.dataGroup];
                f = {value: h, html: d, text: g, index: b, cssClass: na ? "mbsc-sel-gr-itm" : ""};
                X[h] = f;
                a && !I(g, a) || (Q.push(f), Y && (void 0 === p[e] ? (c = {
                    text: e,
                    value: l,
                    options: [],
                    index: l
                }, z[l] = c, p[e] = l, G.push(c), l++) : c = z[p[e]], ja && (f.index = c.options.length), f.group = p[e], c.options.push(f)), k[y.dataDisabled] && E.push(h))
            }); else if (Y) {
                var n = !0;
                b("optgroup", C).each(function (c) {
                    z[c] = {text: this.label, value: c, options: [], index: c};
                    n = !0;
                    b("option", this).each(function (b) {
                        f = {
                            value: this.value,
                            text: this.text,
                            index: ja ? b : k++,
                            group: c,
                            cssClass: na ? "mbsc-sel-gr-itm" : ""
                        };
                        X[this.value] = f;
                        a && !I(this.text, a) || (n && (G.push(z[c]), n = !1), Q.push(f), z[c].options.push(f), this.disabled && E.push(this.value))
                    })
                })
            } else b("option", C).each(function (b) {
                f = {value: this.value, text: this.text, index: b};
                X[this.value] = f;
                a && !I(this.text, a) || (Q.push(f), this.disabled && E.push(this.value))
            });
            y.defaultValue ? m = y.defaultValue : Q.length && (m = Q[0].value);
            na && (Q = [], k = 0, b.each(z, function (a, c) {
                c.options.length && (h = "__group" + a, f = {
                    text: c.text,
                    value: h,
                    group: a,
                    index: k++,
                    cssClass: "mbsc-sel-gr"
                }, X[h] = f, Q.push(f), E.push(f.value), b.each(c.options, function (a, b) {
                    b.index = k++;
                    Q.push(b)
                }))
            }));
            F && (Q.length ? F.removeClass("mbsc-sel-empty-v") : F.addClass("mbsc-sel-empty-v"))
        }

        function d(a, b, c, d, e) {
            var f, g = [];
            for (f = 0; f < a.length; f++) g.push({
                value: a[f].value,
                display: a[f].html || a[f].text,
                cssClass: a[f].cssClass
            });
            return {
                circular: !1,
                multiple: b && !d ? 1 : d,
                cssClass: (b && !d ? "mbsc-sel-one" : "") + " " + e,
                data: g,
                label: c
            }
        }

        function e() {
            return d(G, O, y.groupLabel, !1, "mbsc-sel-gr-whl")
        }

        function f() {
            return d(ja ? z[w].options : Q, O, S, J, "")
        }

        function h() {
            var a, b, c = [[]];
            return R && (a = e(), Z ? c[0][A] = a : c[A] = [a]), b = f(), Z ? c[0][M] = b : c[M] = [b], c
        }

        function k(a) {
            J && (a && sb(a) && (a = a.split(",")), b.isArray(a) && (a = a[0]));
            B = void 0 === a || null === a || "" === a ? m : a;
            R && (w = X[B] ? X[B].group : null)
        }

        function g(a) {
            return W[a] || (X[a] ? X[a].text : "")
        }

        function q() {
            var b, c = "", d = a.getVal();
            b = y.formatValue.call(P, a.getArrayVal(), a);
            if (y.filter && "inline" == y.display || u.val(b), C.is("select") && ka) {
                if (J) for (b = 0; b < d.length; b++) c += '\x3coption value\x3d"' + d[b] + '"\x3e' + g(d[b]) + "\x3c/option\x3e"; else c = '\x3coption value\x3d"' + d + '"\x3e' + b + "\x3c/option\x3e";
                C.html(c)
            }
            P !== u[0] && C.val(d)
        }

        function K() {
            var b = {};
            b[M] = f();
            N = !0;
            a.changeWheel(b)
        }

        function I(a, b) {
            return b = b.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$\x26"), a.match(new RegExp(b, "ig"))
        }

        function n(a) {
            return y.data.dataField ? a[y.data.dataField] : y.data.processResponse ? y.data.processResponse(a) : a
        }

        function L(b) {
            var d = {};
            c(b);
            y.wheels = h();
            k(B);
            d[M] = f();
            a._tempWheelArray[M] = B;
            R && (d[A] = e(), a._tempWheelArray[A] = w);
            a._isVisible && a.changeWheel(d, 0, !0)
        }

        function x(b) {
            b[A] != w && (w = b[A], B = z[w].options[0].value, b[M] = B, ja ? K() : a.setArrayVal(b, !1, !1, !0, 1E3))
        }

        var u, v, m, H, l, w, G, z, A, t, B, Q, M, N, W = {}, P = this, C = b(P), ca = U({}, a.settings),
            y = U(a.settings, Ne, ca),
            F = b('\x3cdiv class\x3d"mbsc-sel-empty"\x3e' + y.filterEmptyText + "\x3c/div\x3e"), ba = y.readonly,
            X = {}, ca = y.layout || (/top|bottom|inline/.test(y.display) || y.filter ? "liquid" : ""),
            Z = "liquid" == ca || !y.touchUi,
            J = Ka(y.select) ? y.select : "multiple" == y.select || C.prop("multiple"),
            O = J || !(!y.filter && !y.tapSelect) && 1, r = this.id + "_dummy",
            p = b('label[for\x3d"' + this.id + '"]').attr("for", r),
            S = void 0 !== y.label ? y.label : p.length ? p.text() : C.attr("name"), ka = !!y.data,
            Y = ka ? !!y.group : b("optgroup", C).length, p = y.group, R = Y && p && !1 !== p.groupWheel,
            ja = Y && p && R && !0 === p.clustered, na = Y && (!p || !1 !== p.header && !ja),
            p = C.val() || (J ? [] : [""]), E = [];
        return a.setVal = function (b, c, d, e, f) {
            if (O && (null === b || void 0 === b || J || (b = [b]), b && sb(b) && (b = b.split(",")), a._tempSelected[M] = rb(b), e || (a._selected[M] = rb(b)), b = b ? b[0] : null, R)) {
                var g = X[b], g = g && g.group;
                a._tempSelected[A] = rb([g]);
                e || (a._selected[A] = rb([g]))
            }
            a._setVal(b, c, d, e, f)
        }, a.getVal = function (b, c) {
            var d;
            return O ? (d = Nb(b ? a._tempSelected[M] : a._selected[M]), d = J ? d : d.length ? d[0] : null) : d = (d = b ? a._tempWheelArray : a._hasValue ? a._wheelArray : null) ? d[M] : null, J ? d : void 0 !== d ? Y && c ? [X[d] ? X[d].group : null, d] : d : null
        }, a.refresh = function (a, c, d) {
            d = d || la;
            a ? (v = a, t || (y.data = a)) : b.isArray(y.data) && (v = y.data);
            !a && t && void 0 === c ? Wc(y.data.url, function (a) {
                v = n(a);
                L();
                d()
            }, y.data.dataType) : (L(c), d())
        }, y.invalid.length || (y.invalid = E), R ? (A = 0, M = 1) : (A = -1, M = 0), O && (J && C.prop("multiple", !0), p && sb(p) && (p = p.split(",")), a._selected[M] = rb(p)), a._$input && a._$input.remove(), C.next().is("input.mbsc-control") ? u = C.next().removeAttr("tabindex") : y.input ? u = b(y.input) : (y.filter && "inline" == y.display ? a._$input = b('\x3cdiv class\x3d"mbsc-sel-input-wrap"\x3e\x3cinput type\x3d"text" id\x3d"' + r + '" class\x3d"mbsc-control ' + y.inputClass + '" readonly /\x3e\x3c/div\x3e') : (u = b('\x3cinput type\x3d"text" id\x3d"' + r + '" class\x3d"mbsc-control ' + y.inputClass + '" readonly /\x3e'), a._$input = u), y.showInput && (a._$input.insertBefore(C), u || (u = a._$input.find("#" + r)))), a.attachShow(u.attr("placeholder", y.placeholder || "")), u[0] !== P && C.addClass("mbsc-sel-hdn").attr("tabindex", -1), !O || y.rows % 2 || --y.rows, y.filter && (H = y.filter.minLength || 0), (t = y.data && y.data.url) ? a.refresh(void 0, void 0, q) : (ka && (v = y.data), c(), k(C.val())), {
            layout: ca,
            headerText: !1,
            anchor: u,
            compClass: "mbsc-sc mbsc-sel" + (O ? " mbsc-sel-multi" : ""),
            setOnTap: !R || [!1, !0],
            formatValue: function (b) {
                var c, d = [];
                if (O) {
                    for (c in a._tempSelected[M]) d.push(g(c));
                    return d.join(", ")
                }
                return g(b[M])
            },
            tapSelect: O,
            parseValue: function (a) {
                return k(void 0 === a ? C.val() : a), R ? [w, B] : [B]
            },
            validate: function (a) {
                a = a.index;
                var b = [];
                return b[M] = y.invalid, ja && !N && void 0 === a && K(), N = !1, {disabled: b}
            },
            onRead: q,
            onFill: q,
            onMarkupReady: function (c, d) {
                if (y.filter) {
                    var e, f, g, h = b(".mbsc-fr-w", c.target),
                        k = b('\x3cspan class\x3d"mbsc-sel-filter-clear mbsc-ic mbsc-ic-' + y.filterClearIcon + '"\x3e\x3c/span\x3e');
                    "inline" == y.display ? (e = u, u.parent().find(".mbsc-sel-filter-clear").remove()) : (h.find(".mbsc-fr-c").before('\x3cdiv class\x3d"mbsc-input mbsc-sel-filter-cont mbsc-control-w"\x3e\x3cspan class\x3d"mbsc-input-wrap"\x3e\x3cinput tabindex\x3d"0" type\x3d"text" class\x3d"mbsc-sel-filter-input mbsc-control"/\x3e\x3c/span\x3e\x3c/div\x3e'), e = h.find(".mbsc-sel-filter-input"));
                    l = null;
                    g = e[0];
                    e.prop("readonly", !1).attr("placeholder", y.filterPlaceholderText).parent().append(k);
                    h.find(".mbsc-fr-c").prepend(F);
                    d._activeElm = g;
                    d.tap(k, function () {
                        l = null;
                        g.value = "";
                        d.refresh();
                        k.removeClass("mbsc-sel-filter-show-clear");
                        a.trigger("onFilter", {filterText: ""})
                    });
                    e.on("keydown", function (a) {
                        13 != a.keyCode && 27 != a.keyCode || (a.stopPropagation(), g.blur())
                    }).on("keyup", function () {
                        clearTimeout(f);
                        g.value.length ? k.addClass("mbsc-sel-filter-show-clear") : k.removeClass("mbsc-sel-filter-show-clear");
                        f = setTimeout(function () {
                            l !== g.value && !1 !== a.trigger("onFilter", {filterText: g.value}) && ((l = g.value).length >= H || !l.length) && (t && y.data.remoteFilter ? Wc(y.data.url + encodeURIComponent(l), function (a) {
                                d.refresh(n(a))
                            }, y.data.dataType) : d.refresh(void 0, l))
                        }, 500)
                    })
                }
            },
            onBeforeShow: function () {
                J && y.counter && (y.headerText = function () {
                    var c = 0;
                    return b.each(a._tempSelected[M], function () {
                        c++
                    }), (1 < c && y.selectedPluralText || y.selectedText).replace(/{count}/, c)
                });
                k(C.val());
                O && R && (a._selected[A] = rb([w]));
                y.filter && c(void 0);
                a.settings.wheels = h();
                N = !0
            },
            onWheelGestureStart: function (a) {
                a.index == A && (y.readonly = [!1, !0])
            },
            onWheelAnimationEnd: function (b) {
                var c = a.getArrayVal(!0);
                b.index == A ? (y.readonly = ba, O || x(c)) : b.index == M && c[M] != B && (B = c[M], R && X[B] && X[B].group != w && (w = X[B].group, c[A] = w, a._tempSelected[A] = rb([w]), a.setArrayVal(c, !1, !1, !0, 1E3)))
            },
            onItemTap: function (b) {
                var c;
                if (b.index == M && (W[b.value] = X[b.value].text, O && !J && b.selected)) return !1;
                if (b.index == A && O) {
                    if (b.selected) return !1;
                    (c = a.getArrayVal(!0))[A] = b.value;
                    x(c)
                }
            },
            onClose: function () {
                t && y.data.remoteFilter && l && a.refresh()
            },
            onDestroy: function () {
                a._$input && a._$input.remove();
                C.removeClass("mbsc-sel-hdn").removeAttr("tabindex")
            }
        }
    };
    na("select", za);
    var Oe = {
        autostart: !1,
        step: 1,
        useShortLabels: !1,
        labels: "Years Months Days Hours Minutes Seconds ".split(" "),
        labelsShort: "Yrs Mths Days Hrs Mins Secs ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Lap",
        hideText: "Hide",
        mode: "countdown"
    };
    ta.timer = function (a) {
        function c(a) {
            return new Date(a.getUTCFullYear(), a.getUTCMonth(), a.getUTCDate(), a.getUTCHours(), a.getUTCMinutes(), a.getUTCSeconds(), a.getUTCMilliseconds())
        }

        function d(a) {
            var c = 1, d = A[a], f = d.wheel, h = d.prefix, k = d.until, l = A[z[b.inArray(a, z) - 1]];
            if (d.index <= A[C].index && (!l || l.limit > P)) if (t[a] || ba[0].push(f), t[a] = 1, f.data = [], f.label = d.label || "", f.cssClass = "mbsc-timer-whl-" + a, P >= d.limit && (c = Math.max(Math.round(P / d.limit), 1), K = c * d.limit), a == C) f.min = 0, f.data = function (a) {
                return {value: a, display: e(a, h, d.label)}
            }, f.getIndex = function (a) {
                return a
            }; else for (g = 0; g <= k; g += c) f.data.push({value: g, display: e(g, h, d.label)})
        }

        function e(a, b, c) {
            return (b || "") + (10 > a ? "0" : "") + a + '\x3cspan class\x3d"mbsc-timer-lbl"\x3e' + c + "\x3c/span\x3e"
        }

        function f(a) {
            var d, e = [], f = function (a) {
                var d = {};
                if (F && A[C].index > A.days.index) {
                    var e, f, g, h;
                    e = new Date;
                    var k = v ? e : y;
                    e = v ? y : e;
                    e = c(e);
                    k = c(k);
                    d.years = k.getFullYear() - e.getFullYear();
                    d.months = k.getMonth() - e.getMonth();
                    d.days = k.getDate() - e.getDate();
                    d.hours = k.getHours() - e.getHours();
                    d.minutes = k.getMinutes() - e.getMinutes();
                    d.seconds = k.getSeconds() - e.getSeconds();
                    d.fract = (k.getMilliseconds() - e.getMilliseconds()) / 10;
                    for (e = z.length; 0 < e; e--) f = z[e - 1], g = A[f], h = z[b.inArray(f, z) - 1], A[h] && 0 > d[f] && (d[h]--, d[f] += "months" == h ? 32 - (new Date(k.getFullYear(), k.getMonth(), 32)).getDate() : g.until + 1);
                    "months" == C && (d.months += 12 * d.years, delete d.years)
                } else b(z).each(function (b, c) {
                    A[c].index <= A[C].index && (d[c] = Math.floor(a / A[c].limit), a -= d[c] * A[c].limit)
                });
                return d
            }(a);
            return b(z).each(function (a, b) {
                t[b] && (d = Math.max(Math.round(P / A[b].limit), 1), e.push(Math.round(f[b] / d) * d))
            }), e
        }

        function h(a) {
            F ? (0 > (x = y - new Date) ? (x *= -1, v = !0) : v = !1, u = 0, W = !0) : void 0 !== y ? (W = !1, x = 1E3 * y, v = "countdown" != w.mode, a && (u = 0)) : (x = 0, v = "countdown" != w.mode, W = v, a && (u = 0))
        }

        function k() {
            M ? (b(".mbsc-fr-w", m).addClass("mbsc-timer-running mbsc-timer-locked"), b(".mbsc-timer-btn-toggle-c \x3e div", m).text(w.stopText), a.buttons.start.icon && b(".mbsc-timer-btn-toggle-c \x3e div", m).removeClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && b(".mbsc-timer-btn-toggle-c \x3e div", m).addClass("mbsc-ic-" + a.buttons.stop.icon), "stopwatch" == w.mode && (b(".mbsc-timer-btn-resetlap-c \x3e div", m).text(w.lapText), a.buttons.reset.icon && b(".mbsc-timer-btn-resetlap-c \x3e div", m).removeClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && b(".mbsc-timer-btn-resetlap-c \x3e div", m).addClass("mbsc-ic-" + a.buttons.lap.icon))) : (b(".mbsc-fr-w", m).removeClass("mbsc-timer-running"), b(".mbsc-timer-btn-toggle-c \x3e div", m).text(w.startText), a.buttons.start.icon && b(".mbsc-timer-btn-toggle-c \x3e div", m).addClass("mbsc-ic-" + a.buttons.start.icon), a.buttons.stop.icon && b(".mbsc-timer-btn-toggle-c \x3e div", m).removeClass("mbsc-ic-" + a.buttons.stop.icon), "stopwatch" == w.mode && (b(".mbsc-timer-btn-resetlap-c \x3e div", m).text(w.resetText), a.buttons.reset.icon && b(".mbsc-timer-btn-resetlap-c \x3e div", m).addClass("mbsc-ic-" + a.buttons.reset.icon), a.buttons.lap.icon && b(".mbsc-timer-btn-resetlap-c \x3e div", m).removeClass("mbsc-ic-" + a.buttons.lap.icon)))
        }

        var g, q, K, I, n, L, x, u, v, m, H, l = U({}, a.settings), w = U(a.settings, Oe, l),
            G = w.useShortLabels ? w.labelsShort : w.labels, l = ["resetlap", "toggle"],
            z = "years months days hours minutes seconds fract".split(" "), A = {
                years: {index: 6, until: 10, limit: 31536E6, label: G[0], wheel: {}},
                months: {index: 5, until: 11, limit: 2592E6, label: G[1], wheel: {}},
                days: {index: 4, until: 31, limit: 864E5, label: G[2], wheel: {}},
                hours: {index: 3, until: 23, limit: 36E5, label: G[3], wheel: {}},
                minutes: {index: 2, until: 59, limit: 6E4, label: G[4], wheel: {}},
                seconds: {index: 1, until: 59, limit: 1E3, label: G[5], wheel: {}},
                fract: {index: 0, until: 99, limit: 10, label: G[6], prefix: ".", wheel: {}}
            }, t = {}, B = [], Q = 0, M = !1, N = !0, W = !1, P = Math.max(10, 1E3 * w.step), C = w.maxWheel,
            ca = "stopwatch" == w.mode || F, y = w.targetTime, F = y && void 0 !== y.getTime, ba = [[]];
        return a.start = function () {
            (N && a.reset(), M) || (h(), !W && u >= x) || (M = !0, N = !1, n = new Date, I = u, w.readonly = !0, a.setVal(f(v ? u : x - u), !0, !0, !1, 100), q = setInterval(function () {
                u = new Date - n + I;
                a.setVal(f(v ? u : x - u), !0, !0, !1, Math.min(100, K - 10));
                !W && u + K >= x && (clearInterval(q), setTimeout(function () {
                    a.stop();
                    u = x;
                    a.setVal(f(v ? u : 0), !0, !0, !1, 100);
                    a.trigger("onFinish", {time: x});
                    N = !0
                }, x - u))
            }, K), k(), a.trigger("onStart"))
        }, a.stop = function () {
            M && (M = !1, clearInterval(q), u = new Date - n + I, k(), a.trigger("onStop", {ellapsed: u}))
        }, a.toggle = function () {
            M ? a.stop() : a.start()
        }, a.reset = function () {
            a.stop();
            u = 0;
            B = [];
            Q = 0;
            a.setVal(f(v ? 0 : x), !0, !0, !1, 1E3);
            a.settings.readonly = ca;
            N = !0;
            ca || b(".mbsc-fr-w", m).removeClass("mbsc-timer-locked");
            a.trigger("onReset")
        }, a.lap = function () {
            M && (L = new Date - n + I, H = L - Q, Q = L, B.push(L), a.trigger("onLap", {ellapsed: L, lap: H, laps: B}))
        }, a.resetlap = function () {
            M && "stopwatch" == w.mode ? a.lap() : a.reset()
        }, a.getTime = function () {
            return x
        }, a.setTime = function (a) {
            y = a / 1E3;
            x = a
        }, a.getEllapsedTime = function () {
            return N ? 0 : M ? new Date - n + I : u
        }, a.setEllapsedTime = function (b, c) {
            N || (I = u = b, n = new Date, a.setVal(f(v ? u : x - u), !0, c, !1, 1E3))
        }, h(!0), C || x || (C = "minutes"), "inline" !== w.display && l.unshift("hide"), C || b(z).each(function (a, b) {
            if (!C && x >= A[b].limit) return C = b, !1
        }), b(z).each(function (a, b) {
            d(b)
        }), K = Math.max(97, K), w.autostart && setTimeout(function () {
            a.start()
        }, 0), a.handlers.toggle = a.toggle, a.handlers.start = a.start, a.handlers.stop = a.stop, a.handlers.resetlap = a.resetlap, a.handlers.reset = a.reset, a.handlers.lap = a.lap, a.buttons.toggle = {
            parentClass: "mbsc-timer-btn-toggle-c",
            text: w.startText,
            icon: w.startIcon,
            handler: "toggle"
        }, a.buttons.start = {
            text: w.startText,
            icon: w.startIcon,
            handler: "start"
        }, a.buttons.stop = {text: w.stopText, icon: w.stopIcon, handler: "stop"}, a.buttons.reset = {
            text: w.resetText,
            icon: w.resetIcon,
            handler: "reset"
        }, a.buttons.lap = {
            text: w.lapText,
            icon: w.lapIcon,
            handler: "lap"
        }, a.buttons.resetlap = {
            parentClass: "mbsc-timer-btn-resetlap-c",
            text: w.resetText,
            icon: w.resetIcon,
            handler: "resetlap"
        }, a.buttons.hide = {
            parentClass: "mbsc-timer-btn-hide-c",
            text: w.hideText,
            icon: w.closeIcon,
            handler: "cancel"
        }, {
            wheels: ba,
            headerText: !1,
            readonly: ca,
            buttons: l,
            compClass: "mbsc-timer mbsc-sc",
            parseValue: function () {
                return f(v ? 0 : x)
            },
            formatValue: function (a) {
                var c = "", d = 0;
                return b(z).each(function (b, e) {
                    "fract" != e && t[e] && (c += a[d] + ("seconds" == e && t.fract ? "." + a[d + 1] : "") + " " + G[b] + " ", d++)
                }), c
            },
            validate: function (a) {
                var c = a.values;
                a = a.index;
                var d = 0;
                N && void 0 !== a && (y = 0, b(z).each(function (a, b) {
                    t[b] && (y += A[b].limit * c[d], d++)
                }), y /= 1E3, h(!0))
            },
            onBeforeShow: function () {
                w.showLabel = !0
            },
            onMarkupReady: function (a) {
                m = b(a.target);
                k();
                ca && b(".mbsc-fr-w", m).addClass("mbsc-timer-locked")
            },
            onPosition: function (a) {
                b(".mbsc-fr-w", a.target).css("min-width", 0).css("min-width", b(".mbsc-fr-btn-cont", a.target)[0].offsetWidth)
            },
            onDestroy: function () {
                clearInterval(q)
            }
        }
    };
    na("timer", za);
    var Pe = {
        wheelOrder: "hhiiss",
        useShortLabels: !1,
        min: 0,
        max: 1 / 0,
        labels: "Years Months Days Hours Minutes Seconds".split(" "),
        labelsShort: "Yrs Mths Days Hrs Mins Secs".split(" ")
    };
    ta.timespan = function (a) {
        function c(a) {
            var c = {};
            return b(x).each(function (b, d) {
                c[d] = H[d] ? Math.floor(a / u[d].limit) : 0;
                a -= c[d] * u[d].limit
            }), c
        }

        function d(a) {
            var b = !1, c = m[H[a] - 1] || 1, d = u[a], f = d.label, g = d.wheel;
            if (g.data = [], g.label = d.label, L.match(new RegExp(d.re + d.re, "i")) && (b = !0), a == l) g.min = q[a], g.max = G[a], g.data = function (a) {
                return {value: a * c, display: e(a * c, b, f)}
            }, g.getIndex = function (a) {
                return Math.round(a / c)
            }; else for (h = 0; h <= d.until; h += c) g.data.push({value: h, display: e(h, b, f)})
        }

        function e(a, b, c) {
            return (10 > a && b ? "0" : "") + a + '\x3cspan class\x3d"mbsc-ts-lbl"\x3e' + c + "\x3c/span\x3e"
        }

        function f(a) {
            var c = 0;
            return b.each(v, function (b, d) {
                isNaN(+a[0]) || (c += u[d.v].limit * a[b])
            }), c
        }

        var h, k, g, q, G, I = U({}, a.settings), n = U(a.settings, Pe, I), L = n.wheelOrder,
            I = n.useShortLabels ? n.labelsShort : n.labels, x = "years months days hours minutes seconds".split(" "),
            u = {
                years: {ord: 0, index: 6, until: 10, limit: 31536E6, label: I[0], re: "y", wheel: {}},
                months: {ord: 1, index: 5, until: 11, limit: 2592E6, label: I[1], re: "m", wheel: {}},
                days: {ord: 2, index: 4, until: 31, limit: 864E5, label: I[2], re: "d", wheel: {}},
                hours: {ord: 3, index: 3, until: 23, limit: 36E5, label: I[3], re: "h", wheel: {}},
                minutes: {ord: 4, index: 2, until: 59, limit: 6E4, label: I[4], re: "i", wheel: {}},
                seconds: {ord: 5, index: 1, until: 59, limit: 1E3, label: I[5], re: "s", wheel: {}}
            }, v = [], m = n.steps || [], H = {}, l = "seconds",
            w = n.defaultValue || Math.max(n.min, Math.min(0, n.max)), V = [[]];
        return b(x).each(function (a, b) {
            -1 < (k = L.search(new RegExp(u[b].re, "i"))) && (v.push({o: k, v: b}), u[b].index > u[l].index && (l = b))
        }), v.sort(function (a, b) {
            return a.o > b.o ? 1 : -1
        }), b.each(v, function (a, b) {
            H[b.v] = a + 1;
            V[0].push(u[b.v].wheel)
        }), q = c(n.min), G = c(n.max), b.each(v, function (a, b) {
            d(b.v)
        }), a.getVal = function (b, c) {
            return c ? a._getVal(b) : a._hasValue || b ? f(a.getArrayVal(b)) : null
        }, {
            showLabel: !0, wheels: V, compClass: "mbsc-ts mbsc-sc", parseValue: function (a) {
                var d, e = [];
                return Ka(a) || !a ? (g = c(a || w), b.each(v, function (a, b) {
                    e.push(g[b.v])
                })) : b.each(v, function (b, c) {
                    d = (new RegExp("(\\d+)\\s?(" + n.labels[u[c.v].ord] + "|" + n.labelsShort[u[c.v].ord] + ")", "gi")).exec(a);
                    e.push(d ? d[1] : 0)
                }), b(e).each(function (a, b) {
                    var c = m[a] || 1;
                    e[a] = Math.floor(b / c) * c
                }), e
            }, formatValue: function (a) {
                var c = "";
                return b.each(v, function (b, d) {
                    c += +a[b] ? a[b] + " " + u[d.v].label + " " : ""
                }), c ? c.replace(/\s+$/g, "") : 0
            }, validate: function (d) {
                var e, g, h, k, m = d.values, n = d.direction, v = [], w = !0, z = !0;
                return b(x).each(function (d, t) {
                    if (void 0 !== H[t]) {
                        if (h = H[t] - 1, v[h] = [], k = {}, t != l) {
                            if (w) for (g = G[t] + 1; g <= u[t].until; g++) k[g] = !0;
                            if (z) for (g = 0; g < q[t]; g++) k[g] = !0
                        }
                        m[h] = a.getValidValue(h, m[h], n, k);
                        e = c(f(m));
                        w = w && e[t] == G[t];
                        z = z && e[t] == q[t];
                        b.each(k, function (a) {
                            v[h].push(a)
                        })
                    }
                }), {disabled: v}
            }
        }
    };
    na("timespan", za);
    ta.treelist = Nd;
    na("treelist", za);
    na("popup", Ya, !1);
    na("widget", ye, !1);
    G.i18n.ar = {
        rtl: !0,
        setText: "\u062a\u0639\u064a\u064a\u0646",
        cancelText: "\u0625\u0644\u063a\u0627\u0621",
        clearText: "\u0645\u0633\u062d",
        selectedText: "{count} \u0627\u0644\u0645\u062d\u062f\u062f",
        dateFormat: "dd/mm/yy",
        dayNames: "\u0627\u0644\u0623\u062d\u062f \u0627\u0644\u0627\u062b\u0646\u064a\u0646 \u0627\u0644\u062b\u0644\u0627\u062b\u0627\u0621 \u0627\u0644\u0623\u0631\u0628\u0639\u0627\u0621 \u0627\u0644\u062e\u0645\u064a\u0633 \u0627\u0644\u062c\u0645\u0639\u0629 \u0627\u0644\u0633\u0628\u062a".split(" "),
        dayNamesShort: "\u0623\u062d\u062f \u0627\u062b\u0646\u064a\u0646 \u062b\u0644\u0627\u062b\u0627\u0621 \u0623\u0631\u0628\u0639\u0627\u0621 \u062e\u0645\u064a\u0633 \u062c\u0645\u0639\u0629 \u0633\u0628\u062a".split(" "),
        dayNamesMin: "\u062d\u0646\u062b\u0631\u062e\u062c\u0633".split(""),
        dayText: "\u064a\u0648\u0645",
        hourText: "\u0633\u0627\u0639\u0627\u062a",
        minuteText: "\u0627\u0644\u062f\u0642\u0627\u0626\u0642",
        monthNames: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a;\u0634\u0647\u0631 \u0641\u0628\u0631\u0627\u064a\u0631;\u0645\u0627\u0631\u0633;\u0623\u0628\u0631\u064a\u0644;\u0642\u062f;\u064a\u0648\u0646\u064a\u0648;\u064a\u0648\u0644\u064a\u0648;\u0623\u063a\u0633\u0637\u0633;\u0633\u0628\u062a\u0645\u0628\u0631;\u0634\u0647\u0631 \u0627\u0643\u062a\u0648\u0628\u0631;\u0634\u0647\u0631 \u0646\u0648\u0641\u0645\u0628\u0631;\u062f\u064a\u0633\u0645\u0628\u0631".split(";"),
        monthNamesShort: "\u0643\u0627\u0646\u0648\u0646 \u0627\u0644\u062b\u0627\u0646\u064a;\u0634\u0647\u0631 \u0641\u0628\u0631\u0627\u064a\u0631;\u0645\u0627\u0631\u0633;\u0623\u0628\u0631\u064a\u0644;\u0642\u062f;\u064a\u0648\u0646\u064a\u0648;\u064a\u0648\u0644\u064a\u0648;\u0623\u063a\u0633\u0637\u0633;\u0633\u0628\u062a\u0645\u0628\u0631;\u0634\u0647\u0631 \u0627\u0643\u062a\u0648\u0628\u0631;\u0634\u0647\u0631 \u0646\u0648\u0641\u0645\u0628\u0631;\u062f\u064a\u0633\u0645\u0628\u0631".split(";"),
        monthText: "\u0634\u0647\u0631",
        secText: "\u062b\u0648\u0627\u0646\u064a",
        amText: "\u0635",
        pmText: "\u0645",
        timeFormat: "hh:ii A",
        yearText: "\u0639\u0627\u0645",
        nowText: "\u0627\u0644\u0622\u0646",
        firstDay: 0,
        dateText: "\u062a\u0627\u0631\u064a\u062e",
        timeText: "\u0648\u0642\u062a",
        closeText: "\u0625\u063a\u0644\u0627\u0642",
        todayText: "\u0627\u0644\u064a\u0648\u0645",
        prevMonthText: "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0633\u0627\u0628\u0642",
        nextMonthText: "\u0627\u0644\u0634\u0647\u0631 \u0627\u0644\u0642\u0627\u062f\u0645",
        prevYearText: "\u0627\u0644\u0633\u0646\u0647 \u0627\u0644\u0633\u0627\u0628\u0642\u0629",
        nextYearText: "\u0627\u0644\u0639\u0627\u0645 \u0627\u0644\u0642\u0627\u062f\u0645",
        allDayText: "\u0627\u0644\u064a\u0648\u0645 \u0643\u0644\u0647",
        noEventsText: "\u0644\u0627 \u062a\u0648\u062c\u062f \u0627\u062d\u062f\u0627\u062b",
        eventText: "\u0627\u0644\u062d\u062f\u062b",
        eventsText: "\u0623\u062d\u062f\u0627\u062b",
        fromText: "\u064a\u0628\u062f\u0627",
        toText: "\u064a\u0646\u062a\u0647\u064a",
        wholeText: "\u0643\u0627\u0645\u0644",
        fractionText: "\u062c\u0632\u0621",
        unitText: "\u0648\u062d\u062f\u0629",
        delimiter: "/",
        decimalSeparator: ".",
        thousandsSeparator: ",",
        labels: "\u0633\u0646\u0648\u0627\u062a \u0623\u0634\u0647\u0631 \u0623\u064a\u0627\u0645 \u0633\u0627\u0639\u0629 \u062f\u0642\u0627\u0626\u0642 \u062b\u0648\u0627\u0646\u064a ".split(" "),
        labelsShort: "\u0633\u0646\u0648\u0627\u062a \u0623\u0634\u0647\u0631 \u0623\u064a\u0627\u0645 \u0633\u0627\u0639\u0629 \u062f\u0642\u0627\u0626\u0642 \u062b\u0648\u0627\u0646\u064a ".split(" "),
        startText: "\u0628\u062f\u0621",
        stopText: "\u0625\u064a\u0642\u0627\u0641",
        resetText: "\u0625\u0639\u0627\u062f\u0629 \u0636\u0628\u0637",
        lapText: "\u0627\u0644\u062f\u0648\u0631\u0629",
        hideText: "\u0625\u062e\u0641\u0627\u0621",
        offText: "\u0625\u064a\u0642\u0627\u0641",
        onText: "\u062a\u0634\u063a\u064a\u0644",
        backText: "\u0631\u062c\u0648\u0639",
        undoText: "\u062a\u0631\u0627\u062c\u0639"
    };
    G.i18n.bg = {
        setText: "\u0417\u0430\u0434\u0430\u0432\u0430\u043d\u0435",
        cancelText: "\u041e\u0442\u043c\u044f\u043d\u0430",
        clearText: "\u0418\u0437\u0447\u0438\u0441\u0442\u0432\u0430\u043d\u0435",
        selectedText: "{count} \u043f\u043e\u0434\u0431\u0440\u0430\u043d",
        dateFormat: "dd.mm.yy",
        dayNames: "\u041d\u0435\u0434\u0435\u043b\u044f \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u044f\u0434\u0430 \u0427\u0435\u0442\u0432\u044a\u0440\u0442\u044a\u043a \u041f\u0435\u0442\u044a\u043a \u0421\u044a\u0431\u043e\u0442\u0430".split(" "),
        dayNamesShort: "\u041d\u0435\u0434 \u041f\u043e\u043d \u0412\u0442\u043e \u0421\u0440\u044f \u0427\u0435\u0442 \u041f\u0435\u0442 \u0421\u044a\u0431".split(" "),
        dayNamesMin: "\u041d\u0435 \u041f\u043e \u0412\u0442 \u0421\u0440 \u0427\u0435 \u041f\u0435 \u0421\u044a".split(" "),
        dayText: "\u0434\u0435\u043d",
        delimiter: ".",
        hourText: "\u0447\u0430\u0441",
        minuteText: "\u043c\u0438\u043d\u0443\u0442\u0430",
        monthNames: "\u042f\u043d\u0443\u0430\u0440\u0438 \u0424\u0435\u0432\u0440\u0443\u0430\u0440\u0438 \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0438\u043b \u041c\u0430\u0439 \u042e\u043d\u0438 \u042e\u043b\u0438 \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043f\u0442\u0435\u043c\u0432\u0440\u0438 \u041e\u043a\u0442\u043e\u043c\u0432\u0440\u0438 \u041d\u043e\u0435\u043c\u0432\u0440\u0438 \u0414\u0435\u043a\u0435\u043c\u0432\u0440\u0438".split(" "),
        monthNamesShort: "\u042f\u043d\u0443 \u0424\u0435\u0432 \u041c\u0430\u0440 \u0410\u043f\u0440 \u041c\u0430\u0439 \u042e\u043d\u0438 \u042e\u043b\u0438 \u0410\u0432\u0433 \u0421\u0435\u043f \u041e\u043a\u0442 \u041d\u043e\u0432 \u0414\u0435\u043a".split(" "),
        monthText: "\u043c\u0435\u0441\u0435\u0446",
        secText: "\u0441\u0435\u043a\u0443\u043d\u0434\u0438",
        timeFormat: "H:ii",
        yearText: "\u0433\u043e\u0434\u0438\u043d\u0430",
        nowText: "\u0421\u0435\u0433\u0430",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0430",
        timeText: "\u043f\u044a\u0442",
        todayText: "\u0434\u043d\u0435\u0441",
        prevMonthText: "\u041f\u0440\u0435\u0434\u0438\u0448\u043d\u0438\u044f \u043c\u0435\u0441\u0435\u0446",
        nextMonthText: "\u0421\u043b\u0435\u0434\u0432\u0430\u0449\u0438\u044f\u0442 \u043c\u0435\u0441\u0435\u0446",
        prevYearText: "\u041f\u0440\u0435\u0434\u0445\u043e\u0434\u043d\u0430\u0442\u0430 \u0433\u043e\u0434\u0438\u043d\u0430",
        nextYearText: "\u0421\u043b\u0435\u0434\u0432\u0430\u0449\u0430\u0442\u0430 \u0433\u043e\u0434\u0438\u043d\u0430",
        closeText: "\u0437\u0430\u0442\u0432\u043e\u0440\u0438",
        eventText: "\u0421\u044a\u0431\u0438\u0442\u0438\u0435",
        eventsText: "\u0421\u044a\u0431\u0438\u0442\u0438\u044f",
        allDayText: "\u0426\u044f\u043b \u0434\u0435\u043d",
        noEventsText: "\u041d\u044f\u043c\u0430 \u0441\u044a\u0431\u0438\u0442\u0438\u044f",
        fromText: "\u041e\u0422",
        toText: "\u0414\u041e",
        wholeText: "\u0446\u044f\u043b\u043e",
        fractionText: "\u0444\u0440\u0430\u043a\u0446\u0438\u044f",
        unitText: "\u0435\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u0413\u043e\u0434\u0438\u043d\u0438 \u043c\u0435\u0441\u0435\u0446\u0430 \u0434\u043d\u0438 \u0447\u0430\u0441\u0430 \u043c\u0438\u043d\u0443\u0442\u0438 \u0441\u0435\u043a\u0443\u043d\u0434\u0438 ".split(" "),
        labelsShort: "\u0413\u043e\u0434\u0438\u043d\u0438 \u043c\u0435\u0441\u0435\u0446\u0430 \u0434\u043d\u0438 \u0447\u0430\u0441\u0430 \u043c\u0438\u043d\u0443\u0442\u0438 \u0441\u0435\u043a\u0443\u043d\u0434\u0438 ".split(" "),
        startText: "\u0421\u0442\u0430\u0440\u0442",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: "\u041d\u0443\u043b\u0438\u0440\u0430\u043d\u0435",
        lapText: "\u041e\u0431\u0438\u043a\u043e\u043b\u043a\u0430",
        hideText: "\u043a\u0440\u0438\u044f",
        backText: "\u0432\u0440\u044a\u0449\u0430\u043d\u0435",
        undoText: "\u041e\u0422\u041c\u042f\u041d\u0410",
        offText: "\u0418\u0417\u041a\u041b",
        onText: "\u0412\u041a\u041b",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.ca = {
        setText: "Acceptar",
        cancelText: "Cancel\u00b7lar",
        clearText: "Esborrar",
        selectedText: "{count} seleccionat",
        selectedPluralText: "{count} seleccionats",
        dateFormat: "dd/mm/yy",
        dayNames: "Diumenge Dilluns Dimarts Dimecres Dijous Divendres Dissabte".split(" "),
        dayNamesShort: "Dg Dl Dt Dc Dj Dv Ds".split(" "),
        dayNamesMin: "Dg Dl Dt Dc Dj Dv Ds".split(" "),
        dayText: "Dia",
        hourText: "Hores",
        minuteText: "Minuts",
        monthNames: "Gener Febrer Mar\u00e7 Abril Maig Juny Juliol Agost Setembre Octubre Novembre Desembre".split(" "),
        monthNamesShort: "Gen Feb Mar Abr Mai Jun Jul Ago Set Oct Nov Des".split(" "),
        monthText: "Mes",
        secText: "Segons",
        timeFormat: "HH:ii",
        yearText: "Any",
        nowText: "Ara",
        pmText: "pm",
        amText: "am",
        todayText: "Avui",
        firstDay: 1,
        dateText: "Data",
        timeText: "Temps",
        closeText: "Tancar",
        allDayText: "Tot el dia",
        noEventsText: "Cap esdeveniment",
        eventText: "Esdeveniments",
        eventsText: "Esdeveniments",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Sencer",
        fractionText: "Fracci\u00f3",
        unitText: "Unitat",
        labels: "Anys Mesos Dies Hores Minuts Segons ".split(" "),
        labelsShort: "Anys Mesos Dies Hrs Mins Secs ".split(" "),
        startText: "Iniciar",
        stopText: "Aturar",
        resetText: "Reiniciar",
        lapText: "Volta",
        hideText: "Amagar",
        backText: "Enrere",
        undoText: "Desf\u00e9s",
        offText: "No",
        onText: "Si"
    };
    G.i18n.cs = {
        setText: "Zadej",
        cancelText: "Storno",
        clearText: "Vymazat",
        selectedText: "Ozna\u010den\u00fd: {count}",
        dateFormat: "dd.mm.yy",
        dayNames: "Ned\u011ble Pond\u011bl\u00ed \u00dater\u00fd St\u0159eda \u010ctvrtek P\u00e1tek Sobota".split(" "),
        dayNamesShort: "Ne Po \u00dat St \u010ct P\u00e1 So".split(" "),
        dayNamesMin: "NP\u00daS\u010cPS".split(""),
        dayText: "Den",
        hourText: "Hodiny",
        minuteText: "Minuty",
        monthNames: "Leden \u00danor B\u0159ezen Duben Kv\u011bten \u010cerven \u010cervenec Srpen Z\u00e1\u0159\u00ed \u0158\u00edjen Listopad Prosinec".split(" "),
        monthNamesShort: "Led \u00dano B\u0159e Dub Kv\u011b \u010cer \u010cvc Spr Z\u00e1\u0159 \u0158\u00edj Lis Pro".split(" "),
        monthText: "M\u011bs\u00edc",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Te\u010f",
        amText: "am",
        pmText: "pm",
        todayText: "Dnes",
        firstDay: 1,
        dateText: "Datum",
        timeText: "\u010cas",
        closeText: "Zav\u0159\u00edt",
        allDayText: "Cel\u00fd den",
        noEventsText: "\u017d\u00e1dn\u00e9 ud\u00e1losti",
        eventText: "Ud\u00e1lost\u00ed",
        eventsText: "Ud\u00e1losti",
        fromText: "Za\u010d\u00e1tek",
        toText: "Konec",
        wholeText: "Cel\u00fd",
        fractionText: "\u010c\u00e1st",
        unitText: "Jednotka",
        labels: "Roky M\u011bs\u00edce Dny Hodiny Minuty Sekundy ".split(" "),
        labelsShort: "Rok M\u011bs Dny Hod Min Sec ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetovat",
        lapText: "Etapa",
        hideText: "Schovat",
        backText: "Zp\u011bt",
        undoText: "Zp\u011bt",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.da = {
        setText: "S\u00e6t",
        cancelText: "Annuller",
        clearText: "Ryd",
        selectedText: "{count} valgt",
        selectedPluralText: "{count} valgt",
        dateFormat: "dd/mm/yy",
        dayNames: "S\u00f8ndag Mandag Tirsdag Onsdag Torsdag Fredag L\u00f8rdag".split(" "),
        dayNamesShort: "S\u00f8n Man Tir Ons Tor Fre L\u00f8r".split(" "),
        dayNamesMin: "SMTOTFL".split(""),
        dayText: "Dag",
        hourText: "Timer",
        minuteText: "Minutter",
        monthNames: "Januar Februar Marts April Maj Juni Juli August September Oktober November December".split(" "),
        monthNamesShort: "Jan Feb Mar Apr Maj Jun Jul Aug Sep Okt Nov Dec".split(" "),
        monthText: "M\u00e5ned",
        secText: "Sekunder",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH.ii",
        yearText: "\u00c5r",
        nowText: "Nu",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        closeText: "Luk",
        allDayText: "Hele dagen",
        noEventsText: "Ingen begivenheder",
        eventText: "Begivenheder",
        eventsText: "Begivenheder",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hele",
        fractionText: "Dele",
        unitText: "Enhed",
        labels: "\u00c5r M\u00e5neder Dage Timer Minutter Sekunder ".split(" "),
        labelsShort: "\u00c5r Mdr Dg Timer Min Sek ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Nulstil",
        lapText: "Omgang",
        hideText: "Skjul",
        offText: "Fra",
        onText: "Til",
        backText: "Tilbage",
        undoText: "Fortryd"
    };
    G.i18n.de = {
        setText: "OK",
        cancelText: "Abbrechen",
        clearText: "L\u00f6schen",
        selectedText: "{count} ausgew\u00e4hlt",
        dateFormat: "dd.mm.yy",
        dayNames: "Sonntag Montag Dienstag Mittwoch Donnerstag Freitag Samstag".split(" "),
        dayNamesShort: "So Mo Di Mi Do Fr Sa".split(" "),
        dayNamesMin: "SMDMDFS".split(""),
        dayText: "Tag",
        delimiter: ".",
        hourText: "Stunde",
        minuteText: "Minuten",
        monthNames: "Januar Februar M\u00e4rz April Mai Juni Juli August September Oktober November Dezember".split(" "),
        monthNamesShort: "Jan Feb M\u00e4r Apr Mai Jun Jul Aug Sep Okt Nov Dez".split(" "),
        monthText: "Monat",
        secText: "Sekunden",
        timeFormat: "HH:ii",
        yearText: "Jahr",
        nowText: "Jetzt",
        pmText: "pm",
        amText: "am",
        todayText: "Heute",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Zeit",
        closeText: "Schlie\u00dfen",
        allDayText: "Ganzt\u00e4gig",
        noEventsText: "Keine Ereignisse",
        eventText: "Ereignis",
        eventsText: "Ereignisse",
        fromText: "Von",
        toText: "Bis",
        wholeText: "Ganze Zahl",
        fractionText: "Bruchzahl",
        unitText: "Ma\u00dfeinheit",
        labels: "Jahre Monate Tage Stunden Minuten Sekunden ".split(" "),
        labelsShort: "Jahr. Mon. Tag. Std. Min. Sek. ".split(" "),
        startText: "Starten",
        stopText: "Stoppen",
        resetText: "Zur\u00fccksetzen",
        lapText: "Lap",
        hideText: "Ausblenden",
        backText: "Zur\u00fcck",
        undoText: "R\u00fcckg\u00e4ngig machen",
        offText: "Aus",
        onText: "Ein",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.el = {
        setText: "\u039f\u03c1\u03b9\u03c3\u03bc\u03bf\u03c2",
        cancelText: "\u0391\u03ba\u03c5\u03c1\u03c9\u03c3\u03b7",
        clearText: "\u0394\u03b9\u03b1\u03b3\u03c1\u03b1\u03c6\u03b7",
        selectedText: "{count} \u03b5\u03c0\u03b9\u03bb\u03b5\u03b3\u03bc\u03ad\u03bd\u03b1",
        dateFormat: "dd/mm/yy",
        dayNames: "\u039a\u03c5\u03c1\u03b9\u03b1\u03ba\u03ae \u0394\u03b5\u03c5\u03c4\u03ad\u03c1\u03b1 \u03a4\u03c1\u03af\u03c4\u03b7 \u03a4\u03b5\u03c4\u03ac\u03c1\u03c4\u03b7 \u03a0\u03ad\u03bc\u03c0\u03c4\u03b7 \u03a0\u03b1\u03c1\u03b1\u03c3\u03ba\u03b5\u03c5\u03ae \u03a3\u03ac\u03b2\u03b2\u03b1\u03c4\u03bf".split(" "),
        dayNamesShort: "\u039a\u03c5\u03c1 \u0394\u03b5\u03c5 \u03a4\u03c1\u03b9 \u03a4\u03b5\u03c4 \u03a0\u03b5\u03bc \u03a0\u03b1\u03c1 \u03a3\u03b1\u03b2".split(" "),
        dayNamesMin: "\u039a\u03c5 \u0394\u03b5 \u03a4\u03c1 \u03a4\u03b5 \u03a0\u03b5 \u03a0\u03b1 \u03a3\u03b1".split(" "),
        dayText: "\u03b7\u03bc\u03ad\u03c1\u03b1",
        delimiter: "/",
        hourText: "\u03ce\u03c1\u03b1",
        minuteText: "\u03bb\u03b5\u03c0\u03c4\u03cc",
        monthNames: "\u0399\u03b1\u03bd\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2 \u03a6\u03b5\u03b2\u03c1\u03bf\u03c5\u03ac\u03c1\u03b9\u03bf\u03c2 \u039c\u03ac\u03c1\u03c4\u03b9\u03bf\u03c2 \u0391\u03c0\u03c1\u03af\u03bb\u03b9\u03bf\u03c2 \u039c\u03ac\u03b9\u03bf\u03c2 \u0399\u03bf\u03cd\u03bd\u03b9\u03bf\u03c2 \u0399\u03bf\u03cd\u03bb\u03b9\u03bf\u03c2 \u0391\u03cd\u03b3\u03bf\u03c5\u03c3\u03c4\u03bf\u03c2 \u03a3\u03b5\u03c0\u03c4\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2 \u039f\u03ba\u03c4\u03ce\u03b2\u03c1\u03b9\u03bf\u03c2 \u039d\u03bf\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2 \u0394\u03b5\u03ba\u03ad\u03bc\u03b2\u03c1\u03b9\u03bf\u03c2".split(" "),
        monthNamesShort: "\u0399\u03b1\u03bd \u03a6\u03b5\u03b2 \u039c\u03b1\u03c1 \u0391\u03c0\u03c1 \u039c\u03b1\u03b9 \u0399\u03bf\u03c5\u03bd \u0399\u03bf\u03c5\u03bb \u0391\u03c5\u03b3 \u03a3\u03b5\u03c0 \u039f\u03ba\u03c4 \u039d\u03bf\u03b5 \u0394\u03b5\u03ba".split(" "),
        monthText: "\u039c\u03ae\u03bd\u03b1\u03c2",
        secText: "\u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1",
        timeFormat: "H:ii",
        yearText: "\u03ad\u03c4\u03bf\u03c2",
        nowText: "\u03c4\u03ce\u03c1\u03b1",
        pmText: "\u03bc\u03bc",
        amText: "\u03c0\u03bc",
        firstDay: 1,
        dateText: "\u0397\u03bc\u03b5\u03c1\u03bf\u03bc\u03b7\u03bd\u03af\u03b1",
        timeText: "\u03c6\u03bf\u03c1\u03ac",
        todayText: "\u03a3\u03ae\u03bc\u03b5\u03c1\u03b1",
        prevMonthText: "\u03a0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf \u03bc\u03ae\u03bd\u03b1",
        nextMonthText: "\u0395\u03c0\u03cc\u03bc\u03b5\u03bd\u03bf \u03bc\u03ae\u03bd\u03b1",
        prevYearText: "\u03a0\u03c1\u03bf\u03b7\u03b3\u03bf\u03cd\u03bc\u03b5\u03bd\u03bf \u03ad\u03c4\u03bf\u03c2",
        nextYearText: "\u0395\u03c0\u03cc\u03bc\u03b5\u03bd\u03bf \u03ad\u03c4\u03bf\u03c2",
        closeText: "\u039a\u03bb\u03b5\u03af\u03c3\u03b9\u03bc\u03bf",
        eventText: "\u0393\u03b5\u03b3\u03bf\u03bd\u03cc\u03c4\u03b1",
        eventsText: "\u0393\u03b5\u03b3\u03bf\u03bd\u03cc\u03c4\u03b1",
        allDayText: "\u039f\u03bb\u03bf\u03ae\u03bc\u03b5\u03c1\u03bf",
        noEventsText: "\u0394\u03b5\u03bd \u03c5\u03c0\u03ac\u03c1\u03c7\u03bf\u03c5\u03bd \u03b3\u03b5\u03b3\u03bf\u03bd\u03cc\u03c4\u03b1",
        fromText: "\u0391\u03c1\u03c7\u03ae",
        toText: "\u03a4\u03ad\u03bb\u03bf\u03c2",
        wholeText: "\u039f\u03bb\u03cc\u03ba\u03bb\u03b7\u03c1\u03bf\u03c2",
        fractionText: "\u03ba\u03bb\u03ac\u03c3\u03bc\u03b1",
        unitText: "\u039c\u03bf\u03bd\u03ac\u03b4\u03b1",
        labels: "\u03a7\u03c1\u03cc\u03bd\u03b9\u03b1 \u039c\u03ae\u03bd\u03b5\u03c2 \u0397\u03bc\u03ad\u03c1\u03b5\u03c2 \u03a9\u03c1\u03b5\u03c2 \u039b\u03b5\u03c0\u03c4\u03ac \u03b4\u03b5\u03c5\u03c4\u03b5\u03c1\u03cc\u03bb\u03b5\u03c0\u03c4\u03b1 ".split(" "),
        labelsShort: "\u03a7\u03c1\u03cc\u03bd\u03b9\u03b1 \u039c\u03ae\u03bd\u03b5\u03c2 \u0397\u03bc\u03ad\u03c1\u03b5\u03c2 \u03a9\u03c1\u03b5\u03c2 \u039b\u03b5\u03c0\u03c4\u03ac \u03b4\u03b5\u03c5\u03c4 ".split(" "),
        startText: "\u0384\u0395\u03bd\u03b1\u03c1\u03be\u03b7",
        stopText: "\u0394\u03b9\u03b1\u03ba\u03bf\u03c0\u03ae",
        resetText: "\u0395\u03c0\u03b1\u03bd\u03b1\u03c6\u03bf\u03c1\u03ac",
        lapText: "\u0393\u03cd\u03c1\u03bf\u03c2",
        hideText: "\u03ba\u03c1\u03cd\u03b2\u03c9",
        backText: "\u03a0\u03af\u03c3\u03c9",
        undoText: "\u0391\u03bd\u03b1\u03b9\u03c1\u03b5\u03c3\u03b7",
        offText: "\u0391\u03bd\u03b5\u03bd\u03b5\u03c1\u03b3\u03cc",
        onText: "\u0395\u03bd\u03b5\u03c1\u03b3\u03cc",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n["en-GB"] = G.i18n["en-UK"] = {dateFormat: "dd/mm/yy", timeFormat: "HH:ii"};
    G.i18n.es = {
        setText: "Aceptar",
        cancelText: "Cancelar",
        clearText: "Borrar",
        selectedText: "{count} seleccionado",
        selectedPluralText: "{count} seleccionados",
        dateFormat: "dd/mm/yy",
        dayNames: "Domingo Lunes Martes Mi\u00e9rcoles Jueves Viernes S\u00e1bado".split(" "),
        dayNamesShort: "Do Lu Ma Mi Ju Vi S\u00e1".split(" "),
        dayNamesMin: "DLMMJVS".split(""),
        dayText: "D\u00eda",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: "Enero Febrero Marzo Abril Mayo Junio Julio Agosto Septiembre Octubre Noviembre Diciembre".split(" "),
        monthNamesShort: "Ene Feb Mar Abr May Jun Jul Ago Sep Oct Nov Dic".split(" "),
        monthText: "Mes",
        secText: "Segundos",
        timeFormat: "HH:ii",
        yearText: "A\x26ntilde;o",
        nowText: "Ahora",
        pmText: "pm",
        amText: "am",
        todayText: "Hoy",
        firstDay: 1,
        dateText: "Fecha",
        timeText: "Tiempo",
        closeText: "Cerrar",
        allDayText: "Todo el d\u00eda",
        noEventsText: "No hay eventos",
        eventText: "Evento",
        eventsText: "Eventos",
        fromText: "Iniciar",
        toText: "Final",
        wholeText: "Entero",
        fractionText: "Fracci\u00f3n",
        unitText: "Unidad",
        labels: "A\u00f1os Meses D\u00edas Horas Minutos Segundos ".split(" "),
        labelsShort: "A\u00f1o Mes D\u00eda Hora Min Seg ".split(" "),
        startText: "Iniciar",
        stopText: "Det\u00e9ngase",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Atr\u00e1s",
        undoText: "Deshacer",
        offText: "No",
        onText: "S\u00ed",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    var va = {
        gDaysInMonth: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
        jDaysInMonth: [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, 30, 29],
        jalaliToGregorian: function (a, b, d) {
            a = parseInt(a) - 979;
            b = parseInt(b) - 1;
            var c = parseInt(d) - 1;
            a = 365 * a + 8 * parseInt(a / 33) + parseInt((a % 33 + 3) / 4);
            for (d = 0; d < b; ++d) a += va.jDaysInMonth[d];
            b = a + c + 79;
            a = 1600 + 400 * parseInt(b / 146097);
            c = !0;
            36525 <= (b %= 146097) && (b--, a += 100 * parseInt(b / 36524), 365 <= (b %= 36524) ? b++ : c = !1);
            a += 4 * parseInt(b / 1461);
            366 <= (b %= 1461) && (c = !1, b--, a += parseInt(b / 365), b %= 365);
            for (d = 0; b >= va.gDaysInMonth[d] + (1 == d && c); d++) b -= va.gDaysInMonth[d] + (1 == d && c);
            return [a, d + 1, b + 1]
        },
        checkDate: function (a, b, d) {
            return !(0 > a || 32767 < a || 1 > b || 12 < b || 1 > d || d > va.jDaysInMonth[b - 1] + (12 == b && 0 == (a - 979) % 33 % 4))
        },
        gregorianToJalali: function (a, b, d) {
            a = parseInt(a) - 1600;
            b = parseInt(b) - 1;
            var c = parseInt(d) - 1,
                f = 365 * a + parseInt((a + 3) / 4) - parseInt((a + 99) / 100) + parseInt((a + 399) / 400);
            for (d = 0; d < b; ++d) f += va.gDaysInMonth[d];
            1 < b && (0 == a % 4 && 0 != a % 100 || 0 == a % 400) && ++f;
            a = f + c - 79;
            d = parseInt(a / 12053);
            a %= 12053;
            b = 979 + 33 * d + 4 * parseInt(a / 1461);
            366 <= (a %= 1461) && (b += parseInt((a - 1) / 365), a = (a - 1) % 365);
            for (d = 0; 11 > d && a >= va.jDaysInMonth[d]; ++d) a -= va.jDaysInMonth[d];
            return [b, d + 1, a + 1]
        }
    };
    G.i18n.fa = {
        setText: "\u062a\u0627\u064a\u064a\u062f",
        cancelText: "\u0627\u0646\u0635\u0631\u0627\u0641",
        clearText: "\u0648\u0627\u0636\u062d ",
        selectedText: "{count} \u0645\u0646\u062a\u062e\u0628",
        dateFormat: "yy/mm/dd",
        dayNames: "\u064a\u06a9\u0634\u0646\u0628\u0647 \u062f\u0648\u0634\u0646\u0628\u0647 \u0633\u0647\u200c\u0634\u0646\u0628\u0647 \u0686\u0647\u0627\u0631\u0634\u0646\u0628\u0647 \u067e\u0646\u062c\u200c\u0634\u0646\u0628\u0647 \u062c\u0645\u0639\u0647 \u0634\u0646\u0628\u0647".split(" "),
        dayNamesShort: "\u06cc\u062f\u0633\u0686\u067e\u062c\u0634".split(""),
        dayNamesMin: "\u06cc\u062f\u0633\u0686\u067e\u062c\u0634".split(""),
        dayText: "\u0631\u0648\u0632",
        hourText: "\u0633\u0627\u0639\u062a",
        minuteText: "\u062f\u0642\u064a\u0642\u0647",
        monthNames: "\u0641\u0631\u0648\u0631\u062f\u064a\u0646 \u0627\u0631\u062f\u064a\u0628\u0647\u0634\u062a \u062e\u0631\u062f\u0627\u062f \u062a\u064a\u0631 \u0645\u0631\u062f\u0627\u062f \u0634\u0647\u0631\u064a\u0648\u0631 \u0645\u0647\u0631 \u0622\u0628\u0627\u0646 \u0622\u0630\u0631 \u062f\u06cc \u0628\u0647\u0645\u0646 \u0627\u0633\u0641\u0646\u062f".split(" "),
        monthNamesShort: "\u0641\u0631\u0648\u0631\u062f\u064a\u0646 \u0627\u0631\u062f\u064a\u0628\u0647\u0634\u062a \u062e\u0631\u062f\u0627\u062f \u062a\u064a\u0631 \u0645\u0631\u062f\u0627\u062f \u0634\u0647\u0631\u064a\u0648\u0631 \u0645\u0647\u0631 \u0622\u0628\u0627\u0646 \u0622\u0630\u0631 \u062f\u06cc \u0628\u0647\u0645\u0646 \u0627\u0633\u0641\u0646\u062f".split(" "),
        monthText: "\u0645\u0627\u0647",
        secText: "\u062b\u0627\u0646\u064a\u0647",
        timeFormat: "HH:ii",
        timeWheels: "iiHH",
        yearText: "\u0633\u0627\u0644",
        nowText: "\u0627\u06a9\u0646\u0648\u0646",
        amText: "\u0628",
        pmText: "\u0635",
        todayText: "\u0627\u0645\u0631\u0648\u0632",
        getYear: function (a) {
            return va.gregorianToJalali(a.getFullYear(), a.getMonth() + 1, a.getDate())[0]
        },
        getMonth: function (a) {
            return --va.gregorianToJalali(a.getFullYear(), a.getMonth() + 1, a.getDate())[1]
        },
        getDay: function (a) {
            return va.gregorianToJalali(a.getFullYear(), a.getMonth() + 1, a.getDate())[2]
        },
        getDate: function (a, b, d, e, f, h, k) {
            0 > b && (a += Math.floor(b / 12), b = 12 + b % 12);
            11 < b && (a += Math.floor(b / 12), b %= 12);
            a = va.jalaliToGregorian(a, +b + 1, d);
            return new Date(a[0], a[1] - 1, a[2], e || 0, f || 0, h || 0, k || 0)
        },
        getMaxDayOfMonth: function (a, b) {
            for (var c = 31; !1 === va.checkDate(a, b + 1, c);) c--;
            return c
        },
        firstDay: 6,
        rtl: !0,
        dateText: "\u062a\u0627\u0631\u06cc\u062e ",
        timeText: "\u0632\u0645\u0627\u0646 ",
        closeText: "\u0646\u0632\u062f\u06cc\u06a9",
        allDayText: "\u062a\u0645\u0627\u0645 \u0631\u0648\u0632",
        noEventsText: "\u0647\u06cc\u0686 \u0631\u0648\u06cc\u062f\u0627\u062f",
        eventText: "\u0631\u0648\u06cc\u062f\u0627\u062f",
        eventsText: "\u0631\u0648\u06cc\u062f\u0627\u062f\u0647\u0627",
        fromText: "\u0634\u0631\u0648\u0639 ",
        toText: "\u067e\u0627\u06cc\u0627\u0646",
        wholeText: "\u062a\u0645\u0627\u0645",
        fractionText: "\u06a9\u0633\u0631",
        unitText: "\u0648\u0627\u062d\u062f",
        labels: "\u0633\u0627\u0644 \u0645\u0627\u0647 \u0631\u0648\u0632 \u0633\u0627\u0639\u062a \u062f\u0642\u06cc\u0642\u0647 \u062b\u0627\u0646\u06cc\u0647 ".split(" "),
        labelsShort: "\u0633\u0627\u0644 \u0645\u0627\u0647 \u0631\u0648\u0632 \u0633\u0627\u0639\u062a \u062f\u0642\u06cc\u0642\u0647 \u062b\u0627\u0646\u06cc\u0647 ".split(" "),
        startText: "\u0634\u0631\u0648\u0639",
        stopText: "\u067e\u0627\u064a\u0627\u0646",
        resetText: "\u062a\u0646\u0638\u06cc\u0645 \u0645\u062c\u062f\u062f",
        lapText: "Lap",
        hideText: "\u067e\u0646\u0647\u0627\u0646 \u06a9\u0631\u062f\u0646",
        backText: "\u067e\u0634\u062a",
        undoText: "\u0648\u0627\u0686\u06cc\u062f\u0646"
    };
    G.i18n.fi = {
        setText: "Aseta",
        cancelText: "Peruuta",
        clearText: "Tyhjenn\u00e4",
        selectedText: "{count} valita",
        dateFormat: "d. MM yy",
        dayNames: "Sunnuntai Maanantai Tiistai Keskiviiko Torstai Perjantai Lauantai".split(" "),
        dayNamesShort: "Su Ma Ti Ke To Pe La".split(" "),
        dayNamesMin: "SMTKTPL".split(""),
        dayText: "P\u00e4iv\u00e4",
        delimiter: ".",
        hourText: "Tuntia",
        minuteText: "Minuutti",
        monthNames: "Tammikuu Helmikuu Maaliskuu Huhtikuu Toukokuu Kes\u00e4kuu Hein\u00e4kuu Elokuu Syyskuu Lokakuu Marraskuu Joulukuu".split(" "),
        monthNamesShort: "Tam Hel Maa Huh Tou Kes Hei Elo Syy Lok Mar Jou".split(" "),
        monthText: "Kuukausi",
        secText: "Sekunda",
        timeFormat: "H:ii",
        yearText: "Vuosi",
        nowText: "Nyt",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "P\u00e4iv\u00e4ys",
        timeText: "Aika",
        todayText: "T\u00e4n\u00e4\u00e4n",
        prevMonthText: "Edellinen kuukausi",
        nextMonthText: "Ensi kuussa",
        prevYearText: "Edellinen vuosi",
        nextYearText: "Ensi vuosi",
        closeText: "Sulje",
        eventText: "Tapahtumia",
        eventsText: "Tapahtumia",
        allDayText: "Koko p\u00e4iv\u00e4",
        noEventsText: "Ei tapahtumia",
        fromText: "Alkaa",
        toText: "P\u00e4\u00e4ttyy",
        wholeText: "Kokonainen",
        fractionText: "Murtoluku",
        unitText: "Yksikk\u00f6",
        labels: "Vuosi Kuukausi P\u00e4iv\u00e4 Tunnin Minuutti sekuntia ".split(" "),
        labelsShort: "Vuo Kuu P\u00e4i Tun Min Sek ".split(" "),
        startText: "K\u00e4ynnistys",
        stopText: "Seis",
        resetText: "Aseta uudelleen",
        lapText: "Kierros",
        hideText: "Vuota",
        backText: "Edellinen",
        undoText: "Kumoa",
        offText: "Pois",
        onText: "P\u00e4\u00e4ll\u00e4",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.fr = {
        setText: "Terminer",
        cancelText: "Annuler",
        clearText: "Effacer",
        selectedText: "{count} s\u00e9lectionn\u00e9",
        selectedPluralText: "{count} s\u00e9lectionn\u00e9s",
        dateFormat: "dd/mm/yy",
        dayNames: "\x26#68;imanche Lundi Mardi Mercredi Jeudi Vendredi Samedi".split(" "),
        dayNamesShort: "\x26#68;im. Lun. Mar. Mer. Jeu. Ven. Sam.".split(" "),
        dayNamesMin: "\x26#68; L M M J V S".split(" "),
        dayText: "Jour",
        monthText: "Mois",
        monthNames: "Janvier F\u00e9vrier Mars Avril Mai Juin Juillet Ao\u00fbt Septembre Octobre Novembre D\u00e9cembre".split(" "),
        monthNamesShort: "Janv. F\u00e9vr. Mars Avril Mai Juin Juil. Ao\u00fbt Sept. Oct. Nov. D\u00e9c.".split(" "),
        hourText: "Heures",
        minuteText: "Minutes",
        secText: "Secondes",
        timeFormat: "HH:ii",
        yearText: "Ann\u00e9e",
        nowText: "Maintenant",
        pmText: "pm",
        amText: "am",
        todayText: "Aujourd'hui",
        firstDay: 1,
        dateText: "Date",
        timeText: "Heure",
        closeText: "Fermer",
        allDayText: "Toute la journ\u00e9e",
        noEventsText: "Aucun \u00e9v\u00e9nement",
        eventText: "\u00c9v\u00e9nement",
        eventsText: "\u00c9v\u00e9nements",
        fromText: "D\u00e9marrer",
        toText: "Fin",
        wholeText: "Entier",
        fractionText: "Fraction",
        unitText: "Unit\u00e9",
        labels: "Ans Mois Jours Heures Minutes Secondes ".split(" "),
        labelsShort: "Ans Mois Jours Hrs Min Sec ".split(" "),
        startText: "D\u00e9marrer",
        stopText: "Arr\u00eater",
        resetText: "R\u00e9initialiser",
        lapText: "Lap",
        hideText: "Cachez",
        backText: "Retour",
        undoText: "Annuler",
        offText: "Non",
        onText: "Oui",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.he = {
        rtl: !0,
        setText: "\u05e9\u05de\u05d9\u05e8\u05d4",
        cancelText: "\u05d1\u05d9\u05d8\u05d5\u05dc",
        clearText: "\u05e0\u05e7\u05d4",
        selectedText: "{count} \u05e0\u05d1\u05d7\u05e8",
        selectedPluralText: "{count} \u05e0\u05d1\u05d7\u05e8\u05d5",
        dateFormat: "dd/mm/yy",
        dayNames: "\u05e8\u05d0\u05e9\u05d5\u05df \u05e9\u05e0\u05d9 \u05e9\u05dc\u05d9\u05e9\u05d9 \u05e8\u05d1\u05d9\u05e2\u05d9 \u05d7\u05de\u05d9\u05e9\u05d9 \u05e9\u05d9\u05e9\u05d9 \u05e9\u05d1\u05ea".split(" "),
        dayNamesShort: "\u05d0' \u05d1' \u05d2' \u05d3' \u05d4' \u05d5' \u05e9'".split(" "),
        dayNamesMin: "\u05d0\u05d1\u05d2\u05d3\u05d4\u05d5\u05e9".split(""),
        dayText: "\u05d9\u05d5\u05dd",
        hourText: "\u05e9\u05e2\u05d5\u05ea",
        minuteText: "\u05d3\u05e7\u05d5\u05ea",
        monthNames: "\u05d9\u05e0\u05d5\u05d0\u05e8 \u05e4\u05d1\u05e8\u05d5\u05d0\u05e8 \u05de\u05e8\u05e5 \u05d0\u05e4\u05e8\u05d9\u05dc \u05de\u05d0\u05d9 \u05d9\u05d5\u05e0\u05d9 \u05d9\u05d5\u05dc\u05d9 \u05d0\u05d5\u05d2\u05d5\u05e1\u05d8 \u05e1\u05e4\u05d8\u05de\u05d1\u05e8 \u05d0\u05d5\u05e7\u05d8\u05d5\u05d1\u05e8 \u05e0\u05d5\u05d1\u05de\u05d1\u05e8 \u05d3\u05e6\u05de\u05d1\u05e8".split(" "),
        monthNamesShort: "\u05d9\u05e0\u05d5 \u05e4\u05d1\u05e8 \u05de\u05e8\u05e5 \u05d0\u05e4\u05e8 \u05de\u05d0\u05d9 \u05d9\u05d5\u05e0 \u05d9\u05d5\u05dc \u05d0\u05d5\u05d2 \u05e1\u05e4\u05d8 \u05d0\u05d5\u05e7 \u05e0\u05d5\u05d1 \u05d3\u05e6\u05de".split(" "),
        monthText: "\u05d7\u05d5\u05d3\u05e9",
        secText: "\u05e9\u05e0\u05d9\u05d5\u05ea",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        timeWheels: "iiHH",
        yearText: "\u05e9\u05e0\u05d4",
        nowText: "\u05e2\u05db\u05e9\u05d9\u05d5",
        firstDay: 0,
        dateText: "\u05ea\u05d0\u05e8\u05d9\u05da",
        timeText: "\u05d6\u05de\u05df",
        closeText: "\u05e1\u05d2\u05d9\u05e8\u05d4",
        todayText: "\u05d4\u05d9\u05d5\u05dd",
        allDayText: "\u05db\u05dc \u05d4\u05d9\u05d5\u05dd",
        noEventsText: "\u05d0\u05d9\u05df \u05d0\u05d9\u05e8\u05d5\u05e2\u05d9\u05dd",
        eventText: "\u05de\u05b4\u05e7\u05e8\u05b6\u05d4",
        eventsText: "\u05de\u05b4\u05e7\u05e8\u05b6\u05d4",
        fromText: "\u05d4\u05ea\u05d7\u05dc\u05d4",
        toText: "\u05e1\u05d9\u05d5\u05dd",
        wholeText: "\u05db\u05b9\u05bc\u05dc",
        fractionText: "\u05e9\u05d1\u05e8\u05d9\u05e8",
        unitText: "\u05d9\u05d7\u05d9\u05d3\u05d4",
        labels: "\u05e9\u05e0\u05d9\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d9\u05de\u05d9\u05dd \u05e9\u05e2\u05d5\u05ea \u05d3\u05e7\u05d5\u05ea \u05e9\u05e0\u05d9\u05d9\u05dd ".split(" "),
        labelsShort: "\u05e9\u05e0\u05d9\u05dd \u05d7\u05d5\u05d3\u05e9\u05d9\u05dd \u05d9\u05de\u05d9\u05dd \u05e9\u05e2\u05d5\u05ea \u05d3\u05e7\u05d5\u05ea \u05e9\u05e0\u05d9\u05d9\u05dd ".split(" "),
        startText: "\u05d4\u05ea\u05d7\u05dc",
        stopText: "\u05e2\u05e6\u05d5\u05e8",
        resetText: "\u05d0\u05ea\u05d7\u05d5\u05dc",
        lapText: "\u05d4\u05e7\u05e4\u05d4",
        hideText: "\u05d4\u05e1\u05ea\u05e8",
        offText: "\u05db\u05d9\u05d1\u05d5\u05d9",
        onText: "\u05d4\u05e4\u05e2\u05dc\u05d4",
        backText: "\u05d7\u05d6\u05d5\u05e8",
        undoText: "\u05d1\u05d9\u05d8\u05d5\u05dc \u05e4\u05e2\u05d5\u05dc\u05d4"
    };
    G.i18n.hi = {
        setText: "\u0938\u0948\u091f \u0915\u0930\u0947\u0902",
        cancelText: "\u0930\u0926\u094d\u0926 \u0915\u0930\u0947\u0902",
        clearText: "\u0938\u093e\u092b\u093c \u0915\u094b",
        selectedText: "{count} \u091a\u092f\u0928\u093f\u0924",
        dateFormat: "dd/mm/yy",
        dayNames: "\u0930\u0935\u093f\u0935\u093e\u0930 \u0938\u094b\u092e\u0935\u093e\u0930 \u092e\u0902\u0917\u0932\u0935\u093e\u0930 \u092c\u0941\u0927\u0935\u093e\u0930 \u0917\u0941\u0930\u0941\u0935\u093e\u0930 \u0936\u0941\u0915\u094d\u0930\u0935\u093e\u0930 \u0936\u0928\u093f\u0935\u093e\u0930".split(" "),
        dayNamesShort: "\u0930\u0935\u093f \u0938\u094b\u092e \u092e\u0902\u0917\u0932 \u092c\u0941\u0927 \u0917\u0941\u0930\u0941 \u0936\u0941\u0915\u094d\u0930 \u0936\u0928\u093f".split(" "),
        dayNamesMin: "\u0930\u0935\u093f \u0938\u094b\u092e \u092e\u0902\u0917\u0932 \u092c\u0941\u0927 \u0917\u0941\u0930\u0941 \u0936\u0941\u0915\u094d\u0930 \u0936\u0928\u093f".split(" "),
        dayText: "\u0926\u093f\u0928",
        delimiter: ".",
        hourText: "\u0918\u0902\u091f\u093e",
        minuteText: "\u092e\u093f\u0928\u091f",
        monthNames: "\u091c\u0928\u0935\u0930\u0940 ;\u092b\u0930\u0935\u0930\u0940;\u092e\u093e\u0930\u094d\u091a;\u0905\u092a\u094d\u0930\u0947\u0932;\u092e\u0908;\u091c\u0942\u0928;\u091c\u0942\u0932\u093e\u0908;\u0905\u0917\u0938\u094d\u0924 ;\u0938\u093f\u0924\u092e\u094d\u092c\u0930;\u0905\u0915\u094d\u091f\u0942\u092c\u0930;\u0928\u0935\u092e\u094d\u092c\u0930;\u0926\u093f\u0938\u092e\u094d\u092c\u0930".split(";"),
        monthNamesShort: "\u091c\u0928 \u092b\u0930 \u092e\u093e\u0930\u094d\u091a \u0905\u092a\u094d\u0930\u0947\u0932 \u092e\u0908 \u091c\u0942\u0928 \u091c\u0942\u0932\u093e\u0908 \u0905\u0917 \u0938\u093f\u0924 \u0905\u0915\u094d\u091f \u0928\u0935 \u0926\u093f".split(" "),
        monthText: "\u092e\u0939\u0940\u0928\u093e",
        secText: "\u0938\u0947\u0915\u0902\u0921",
        timeFormat: "H:ii",
        yearText: "\u0938\u093e\u0932",
        nowText: "\u0905\u092c",
        pmText: "\u0905\u092a\u0930\u093e\u0939\u094d\u0928",
        amText: "\u092a\u0942\u0930\u094d\u0935\u093e\u0939\u094d\u0928",
        firstDay: 1,
        dateText: "\u0924\u093f\u0925\u093f",
        timeText: "\u0938\u092e\u092f",
        todayText: "\u0906\u091c",
        prevMonthText: "\u092a\u093f\u091b\u094d\u0932\u093e \u092e\u0939\u093f\u0928\u093e",
        nextMonthText: "\u0905\u0917\u0932\u0947 \u092e\u0939\u0940\u0928\u0947",
        prevYearText: "\u092a\u093f\u091b\u0932\u093e \u0938\u093e\u0932",
        nextYearText: "\u0905\u0917\u0932\u0947 \u0935\u0930\u094d\u0937",
        closeText: "\u092c\u0902\u0926",
        eventText: "\u0907\u0935\u0947\u091f\u0969",
        eventsText: "\u0907\u0935\u0947\u091f\u0969",
        allDayText: "\u092a\u0942\u0930\u0947 \u0926\u093f\u0928",
        noEventsText: "Ei tapahtumia",
        fromText: "\u0938\u0947",
        toText: "\u0924\u0915",
        wholeText: "\u0938\u092e\u0942\u091a\u093e",
        fractionText: "\u0905\u0902\u0936",
        unitText: "\u0907\u0915\u093e\u0908",
        labels: "\u0938\u093e\u0932 \u092e\u0939\u0940\u0928\u0947 \u0926\u093f\u0928 \u0918\u0902\u091f\u0947 \u092e\u093f\u0928\u091f \u0938\u0947\u0915\u0902\u0921 ".split(" "),
        labelsShort: "\u0938\u093e\u0932 \u092e\u0939\u0940\u0928\u0947 \u0926\u093f\u0928 \u0918\u0902\u091f\u0947 \u092e\u093f\u0928\u091f \u0938\u0947\u0915\u0902\u0921 ".split(" "),
        startText: "\u092a\u094d\u0930\u093e\u0930\u0902\u092d",
        stopText: "\u0930\u094b\u0915\u0947\u0902",
        resetText: "\u0930\u0940\u0938\u0947\u091f \u0915\u0930\u0947\u0902",
        lapText: "\u0932\u0948\u092a",
        hideText: "\u091b\u093f\u092a\u093e\u0928\u093e",
        backText: "\u0935\u093e\u092a\u0938",
        undoText: "\u0935\u093e\u092a\u0938 \u0932\u093e\u090f\u0902",
        offText: "\u092c\u0902\u0926",
        onText: "\u091a\u093e\u0932\u0942",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.hr = {
        setText: "Postavi",
        cancelText: "Izlaz",
        clearText: "Izbri\u0161i",
        selectedText: "{count} odabran",
        dateFormat: "dd.mm.yy",
        dayNames: "Nedjelja Ponedjeljak Utorak Srijeda \u010cetvrtak Petak Subota".split(" "),
        dayNamesShort: "Ned Pon Uto Sri \u010cet Pet Sub".split(" "),
        dayNamesMin: "Ne Po Ut Sr \u010ce Pe Su".split(" "),
        dayText: "Dan",
        delimiter: ".",
        hourText: "Sat",
        minuteText: "Minuta",
        monthNames: "Sije\u010danj Velja\u010da O\u017eujak Travanj Svibanj Lipanj Srpanj Kolovoz Rujan Listopad Studeni Prosinac".split(" "),
        monthNamesShort: "Sij Velj O\u017eu Tra Svi Lip Srp Kol Ruj Lis Stu Pro".split(" "),
        monthText: "Mjesec",
        secText: "Sekunda",
        timeFormat: "H:ii",
        yearText: "Godina",
        nowText: "Sada",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Vrijeme",
        todayText: "Danas",
        prevMonthText: "Prethodni mjesec",
        nextMonthText: "Sljede\u0107i mjesec",
        prevYearText: "Prethodni godina",
        nextYearText: "Slijede\u0107e godine",
        closeText: "Zatvori",
        eventText: "Doga\u0111aj",
        eventsText: "doga\u0111aja",
        allDayText: "Cijeli dan",
        noEventsText: "Bez doga\u0111aja",
        fromText: "Po\u010dinje",
        toText: "Zavr\u0161ava",
        wholeText: "Cjelina",
        fractionText: "Frakcija",
        unitText: "Jedinica",
        labels: "godina mjesec dan sat minuta sekunda ".split(" "),
        labelsShort: "god mje dan sat min sec ".split(" "),
        startText: "Po\u010detak",
        stopText: "Prekid",
        resetText: "Resetiraj",
        lapText: "Ciklus",
        hideText: "Sakriti",
        backText: "Natrag",
        undoText: "Poni\u0161tavanje",
        offText: "Uklj.",
        onText: "Isklj.",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.hu = {
        setText: "OK",
        cancelText: "M\u00e9gse",
        clearText: "T\u00f6rl\u00e9s",
        selectedText: "{count} kiv\u00e1lasztva",
        dateFormat: "yy.mm.dd.",
        dayNames: "Vas\u00e1rnap H\u00e9tf\u0151 Kedd Szerda Cs\u00fct\u00f6rt\u00f6k P\u00e9ntek Szombat".split(" "),
        dayNamesShort: "Va H\u00e9 Ke Sze Cs\u00fc P\u00e9 Szo".split(" "),
        dayNamesMin: "V H K Sz Cs P Sz".split(" "),
        dayText: "Nap",
        delimiter: ".",
        hourText: "\u00d3ra",
        minuteText: "Perc",
        monthNames: "Janu\u00e1r Febru\u00e1r M\u00e1rcius \u00c1prilis M\u00e1jus J\u00fanius J\u00falius Augusztus Szeptember Okt\u00f3ber November December".split(" "),
        monthNamesShort: "Jan Feb M\u00e1r \u00c1pr M\u00e1j J\u00fan J\u00fal Aug Szep Okt Nov Dec".split(" "),
        monthText: "H\u00f3nap",
        secText: "M\u00e1sodperc",
        timeFormat: "H:ii",
        yearText: "\u00c9v",
        nowText: "Most",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "D\u00e1tum",
        timeText: "Id\u0151",
        todayText: "Ma",
        prevMonthText: "El\u0151z\u0151 h\u00f3nap",
        nextMonthText: "K\u00f6vetkez\u0151 h\u00f3nap",
        prevYearText: "El\u0151z\u0151 \u00e9v",
        nextYearText: "K\u00f6vetkez\u0151 \u00e9v",
        closeText: "Bez\u00e1r",
        eventText: "esem\u00e9ny",
        eventsText: "esem\u00e9ny",
        allDayText: "Eg\u00e9sz napos",
        noEventsText: "Nincs esem\u00e9ny",
        fromText: "Eleje",
        toText: "V\u00e9ge",
        wholeText: "Eg\u00e9sz",
        fractionText: "T\u00f6rt",
        unitText: "Egys\u00e9g",
        labels: "\u00c9v H\u00f3nap Nap \u00d3ra Perc M\u00e1sodperc ".split(" "),
        labelsShort: "\u00c9v H\u00f3. Nap \u00d3ra Perc Mp. ".split(" "),
        startText: "Ind\u00edt",
        stopText: "Meg\u00e1ll\u00edt",
        resetText: "Vissza\u00e1ll\u00edt",
        lapText: "Lap",
        hideText: "Elrejt",
        backText: "Vissza",
        undoText: "Visszavon",
        offText: "Ki",
        onText: "Be",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.it = {
        setText: "OK",
        cancelText: "Annulla",
        clearText: "Chiarire",
        selectedText: "{count} selezionato",
        selectedPluralText: "{count} selezionati",
        dateFormat: "dd/mm/yy",
        dayNames: "Domenica Luned\u00ec Merted\u00ec Mercoled\u00ec Gioved\u00ec Venerd\u00ec Sabato".split(" "),
        dayNamesShort: "Do Lu Ma Me Gi Ve Sa".split(" "),
        dayNamesMin: "DLMMGVS".split(""),
        dayText: "Giorno",
        hourText: "Ore",
        minuteText: "Minuti",
        monthNames: "Gennaio Febbraio Marzo Aprile Maggio Giugno Luglio Agosto Settembre Ottobre Novembre Dicembre".split(" "),
        monthNamesShort: "Gen Feb Mar Apr Mag Giu Lug Ago Set Ott Nov Dic".split(" "),
        monthText: "Mese",
        secText: "Secondi",
        timeFormat: "HH:ii",
        yearText: "Anno",
        nowText: "Ora",
        pmText: "pm",
        amText: "am",
        todayText: "Oggi",
        firstDay: 1,
        dateText: "Data",
        timeText: "Volta",
        closeText: "Chiudere",
        allDayText: "Tutto il giorno",
        noEventsText: "Nessun evento",
        eventText: "Evento",
        eventsText: "Eventi",
        fromText: "Inizio",
        toText: "Fine",
        wholeText: "Intero",
        fractionText: "Frazione",
        unitText: "Unit\u00e0",
        labels: "Anni Mesi Giorni Ore Minuti Secondi ".split(" "),
        labelsShort: "Anni Mesi Gio Ore Min Sec ".split(" "),
        startText: "Inizio",
        stopText: "Arresto",
        resetText: "Ripristina",
        lapText: "Lap",
        hideText: "Nascondi",
        backText: "Indietro",
        undoText: "Annulla",
        offText: "Via",
        onText: "Su",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.ja = {
        setText: "\u30bb\u30c3\u30c8",
        cancelText: "\u30ad\u30e3\u30f3\u30bb\u30eb",
        clearText: "\u30af\u30ea\u30a2",
        selectedText: "{count} \u9078\u629e",
        dateFormat: "yy\u5e74mm\u6708dd\u65e5",
        dayNames: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
        dayNamesShort: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
        dayNamesMin: "\u65e5\u6708\u706b\u6c34\u6728\u91d1\u571f".split(""),
        dayText: "\u65e5",
        hourText: "\u6642",
        minuteText: "\u5206",
        monthNames: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
        monthNamesShort: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
        monthText: "\u6708",
        secText: "\u79d2",
        timeFormat: "HH:ii",
        yearText: "\u5e74",
        nowText: "\u4eca",
        pmText: "\u5348\u5f8c",
        amText: "\u5348\u524d",
        yearSuffix: "\u5e74",
        monthSuffix: "\u6708",
        daySuffix: "\u65e5",
        todayText: "\u4eca\u65e5",
        dateText: "\u65e5\u4ed8",
        timeText: "\u6642\u9593",
        closeText: "\u30af\u30ed\u30fc\u30ba",
        allDayText: "\u7d42\u65e5",
        noEventsText: "\u30a4\u30d9\u30f3\u30c8\u306f\u3042\u308a\u307e\u305b\u3093",
        eventText: "\u30a4\u30d9\u30f3\u30c8",
        eventsText: "\u30a4\u30d9\u30f3\u30c8",
        fromText: "\u958b\u59cb",
        toText: "\u7d42\u308f\u308a",
        wholeText: "\u5168\u6570",
        fractionText: "\u5206\u6570",
        unitText: "\u5358\u4f4d",
        labels: "\u5e74\u9593 \u6708\u9593 \u65e5\u9593 \u6642\u9593 \u5206 \u79d2 ".split(" "),
        labelsShort: "\u5e74\u9593 \u6708\u9593 \u65e5\u9593 \u6642\u9593 \u5206 \u79d2 ".split(" "),
        startText: "\u958b\u59cb",
        stopText: "\u505c\u6b62",
        resetText: "\u30ea\u30bb\u30c3\u30c8",
        lapText: "\u30e9\u30c3\u30d7",
        hideText: "\u96a0\u3059",
        backText: "\u30d0\u30c3\u30af",
        undoText: "\u30a2\u30f3\u30c9\u30a5"
    };
    G.i18n.ko = {
        setText: "\uc124\uc815",
        cancelText: "\ucde8\uc18c",
        clearText: "\uc0ad\uc81c",
        selectedText: "{count} \uc120\ud0dd\ub41c",
        dateFormat: "yy-mm-dd",
        dayNames: "\uc77c\uc694\uc77c \uc6d4\uc694\uc77c \ud654\uc694\uc77c \uc218\uc694\uc77c \ubaa9\uc694\uc77c \uae08\uc694\uc77c \ud1a0\uc694\uc77c".split(" "),
        dayNamesShort: "\uc77c\uc6d4\ud654\uc218\ubaa9\uae08\ud1a0".split(""),
        dayNamesMin: "\uc77c\uc6d4\ud654\uc218\ubaa9\uae08\ud1a0".split(""),
        dayText: "\uc77c",
        delimiter: "-",
        hourText: "\uc2dc\uac04",
        minuteText: "\ubd84",
        monthNames: "1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "),
        monthNamesShort: "1\uc6d4 2\uc6d4 3\uc6d4 4\uc6d4 5\uc6d4 6\uc6d4 7\uc6d4 8\uc6d4 9\uc6d4 10\uc6d4 11\uc6d4 12\uc6d4".split(" "),
        monthText: "\ub2ec",
        secText: "\ucd08",
        timeFormat: "H:ii",
        yearText: "\ub144",
        nowText: "\uc9c0\uae08",
        pmText: "\uc624\ud6c4",
        amText: "\uc624\uc804",
        firstDay: 0,
        dateText: "\ub0a0\uc9dc",
        timeText: "\uc2dc\uac04",
        todayText: "\uc624\ub298",
        prevMonthText: "\uc774\uc804 \ub2ec",
        nextMonthText: "\ub2e4\uc74c \ub2ec",
        prevYearText: "\uc774\uc804 \ub144",
        nextYearText: "\ub2e4\uc74c \ub144",
        closeText: "\ub2eb\uae30",
        eventText: "\uc774\ubca4\ud2b8",
        eventsText: "\uc774\ubca4\ud2b8",
        allDayText: "\uc885\uc77c",
        noEventsText: "\uc774\ubca4\ud2b8 \uc5c6\uc74c",
        fromText: "\uc2dc\uc791",
        toText: "\uc885\ub8cc",
        wholeText: "\uc815\uc218",
        fractionText: "\ubd84\uc218",
        unitText: "\ub2e8\uc704",
        labels: "\ub144 \ub2ec \uc77c \uc2dc\uac04 \ubd84 \ucd08 ".split(" "),
        labelsShort: "\ub144 \ub2ec \uc77c \uc2dc\uac04 \ubd84 \ucd08 ".split(" "),
        startText: "\uc2dc\uc791",
        stopText: "\uc911\uc9c0 ",
        resetText: "\ucd08\uae30\ud654",
        lapText: "\uae30\ub85d",
        hideText: "\uc228\ub294 \uc7a5\uc18c",
        backText: "\ub4a4\ub85c",
        undoText: "\uc2e4\ud589\ucde8\uc18c",
        offText: "\ub054",
        onText: "\ucf2c",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.lt = {
        setText: "OK",
        cancelText: "At\u0161aukti",
        clearText: "I\u0161valyti",
        selectedText: "Pasirinktas {count}",
        selectedPluralText: "Pasirinkti {count}",
        dateFormat: "yy-mm-dd",
        dayNames: "Sekmadienis Pirmadienis Antradienis Tre\u010diadienis Ketvirtadienis Penktadienis \u0160e\u0161tadienis".split(" "),
        dayNamesShort: "S Pr A T K Pn \u0160".split(" "),
        dayNamesMin: "S Pr A T K Pn \u0160".split(" "),
        dayText: "Diena",
        hourText: "Valanda",
        minuteText: "Minutes",
        monthNames: "Sausis Vasaris Kovas Balandis Gegu\u017e\u0117 Bir\u017eelis Liepa Rugpj\u016btis Rugs\u0117jis Spalis Lapkritis Gruodis".split(" "),
        monthNamesShort: "Sau Vas Kov Bal Geg Bir Lie Rugp Rugs Spa Lap Gruo".split(" "),
        monthText: "M\u0117nuo",
        secText: "Sekundes",
        amText: "am",
        pmText: "pm",
        timeFormat: "HH:ii",
        yearText: "Metai",
        nowText: "Dabar",
        todayText: "\u0160iandien",
        firstDay: 1,
        dateText: "Data",
        timeText: "Laikas",
        closeText: "U\u017edaryti",
        allDayText: "Vis\u0105 dien\u0105",
        noEventsText: "N\u0117ra \u012fvyki\u0173",
        eventText: "\u012evyki\u0173",
        eventsText: "\u012evykiai",
        fromText: "Nuo",
        toText: "Iki",
        wholeText: "Visas",
        fractionText: "Frakcija",
        unitText: "Vienetas",
        labels: "Metai M\u0117nesiai Dienos Valandos Minutes Sekundes ".split(" "),
        labelsShort: "m m\u0117n. d h min s ".split(" "),
        startText: "Prad\u0117ti",
        stopText: "Sustabdyti",
        resetText: "I\u0161naujo",
        lapText: "Ratas",
        hideText: "Sl\u0117pti",
        backText: "Atgal",
        undoText: "Anuliuoti",
        offText: "I\u0161j.",
        onText: "\u012ej.",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.nl = {
        setText: "Instellen",
        cancelText: "Annuleren",
        clearText: "Leegmaken",
        selectedText: "{count} gekozen",
        dateFormat: "dd-mm-yy",
        dayNames: "zondag maandag Dinsdag Woensdag Donderdag Vrijdag Zaterdag".split(" "),
        dayNamesShort: "zo ma di wo do vr za".split(" "),
        dayNamesMin: "zmdwdvz".split(""),
        dayText: "Dag",
        hourText: "Uur",
        minuteText: "Minuten",
        monthNames: "januari februari maart april mei juni juli augustus september oktober november december".split(" "),
        monthNamesShort: "jan feb mrt apr mei jun jul aug sep okt nov dec".split(" "),
        monthText: "Maand",
        secText: "Seconden",
        timeFormat: "HH:ii",
        yearText: "Jaar",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        todayText: "Vandaag",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tijd",
        closeText: "Sluiten",
        allDayText: "Hele dag",
        noEventsText: "Geen activiteiten",
        eventText: "Activiteit",
        eventsText: "Activiteiten",
        fromText: "Start",
        toText: "Einde",
        wholeText: "geheel",
        fractionText: "fractie",
        unitText: "eenheid",
        labels: "Jaren Maanden Dagen Uren Minuten Seconden ".split(" "),
        labelsShort: "j m d u min sec ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Reset",
        lapText: "Ronde",
        hideText: "Verbergen",
        backText: "Terug",
        undoText: "Onged. maken",
        offText: "Uit",
        onText: "Aan",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.no = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "T\u00f8mme",
        selectedText: "{count} valgt",
        dateFormat: "dd.mm.yy",
        dayNames: "S\u00f8ndag Mandag Tirsdag Onsdag Torsdag Fredag L\u00f8rdag".split(" "),
        dayNamesShort: "S\u00f8 Ma Ti On To Fr L\u00f8".split(" "),
        dayNamesMin: "SMTOTFL".split(""),
        dayText: "Dag",
        delimiter: ".",
        hourText: "Time",
        minuteText: "Minutt",
        monthNames: "Januar Februar Mars April Mai Juni Juli August September Oktober November Desember".split(" "),
        monthNamesShort: "Jan Feb Mar Apr Mai Jun Jul Aug Sep Okt Nov Des".split(" "),
        monthText: "M\u00e5ned",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "\u00c5r",
        nowText: "N\u00e5",
        pmText: "pm",
        amText: "am",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Dato",
        timeText: "Tid",
        closeText: "Lukk",
        allDayText: "Hele dagen",
        noEventsText: "Ingen hendelser",
        eventText: "Hendelse",
        eventsText: "Hendelser",
        fromText: "Start",
        toText: "End",
        wholeText: "Hele",
        fractionText: "Fraksjon",
        unitText: "Enhet",
        labels: "\u00c5r M\u00e5neder Dager Timer Minutter Sekunder ".split(" "),
        labelsShort: "\u00c5r M\u00e5n Dag Time Min Sek ".split(" "),
        startText: "Start",
        stopText: "Stopp",
        resetText: "Tilbakestille",
        lapText: "Runde",
        hideText: "Skjul",
        backText: "Tilbake",
        undoText: "Angre",
        offText: "Av",
        onText: "P\u00e5",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.pl = {
        setText: "Zestaw",
        cancelText: "Anuluj",
        clearText: "Oczy\u015bci\u0107",
        selectedText: "Wyb\u00f3r: {count}",
        dateFormat: "yy-mm-dd",
        dayNames: "Niedziela Poniedzia\u0142ek Wtorek \u015aroda Czwartek Pi\u0105tek Sobota".split(" "),
        dayNamesShort: "Niedz. Pon. Wt. \u015ar. Czw. Pt. Sob.".split(" "),
        dayNamesMin: "NPW\u015aCPS".split(""),
        dayText: "Dzie\u0144",
        hourText: "Godziny",
        minuteText: "Minuty",
        monthNames: "Stycze\u0144 Luty Marzec Kwiecie\u0144 Maj Czerwiec Lipiec Sierpie\u0144 Wrzesie\u0144 Pa\u017adziernik Listopad Grudzie\u0144".split(" "),
        monthNamesShort: "Sty Lut Mar Kwi Maj Cze Lip Sie Wrz Pa\u017a Lis Gru".split(" "),
        monthText: "Miesi\u0105c",
        secText: "Sekundy",
        timeFormat: "HH:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "am",
        pmText: "pm",
        todayText: "Dzisiaj",
        firstDay: 1,
        dateText: "Data",
        timeText: "Czas",
        closeText: "Zako\u0144czenie",
        allDayText: "Ca\u0142y dzie\u0144",
        noEventsText: "Brak wydarze\u0144",
        eventText: "Wydarze\u0144",
        eventsText: "Wydarzenia",
        fromText: "Rozpocz\u0119cie",
        toText: "Koniec",
        wholeText: "Ca\u0142y",
        fractionText: "U\u0142amek",
        unitText: "Jednostka",
        labels: "Lata Miesi\u0105c Dni Godziny Minuty Sekundy ".split(" "),
        labelsShort: "R M Dz Godz Min Sek ".split(" "),
        startText: "Rozpocz\u0119cie",
        stopText: "Zatrzyma\u0107",
        resetText: "Zresetowa\u0107",
        lapText: "Zak\u0142adka",
        hideText: "Ukry\u0107",
        backText: "Wr\u00f3\u0107",
        undoText: "Cofnij",
        offText: "Wy\u0142",
        onText: "W\u0142",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n["pt-BR"] = {
        setText: "Selecionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd/mm/yy",
        dayNames: "Domingo Segunda-feira Ter\u00e7a-feira Quarta-feira Quinta-feira Sexta-feira S\u00e1bado".split(" "),
        dayNamesShort: "Dom Seg Ter Qua Qui Sex S\u00e1b".split(" "),
        dayNamesMin: "DSTQQSS".split(""),
        dayText: "Dia",
        hourText: "Hora",
        minuteText: "Minutos",
        monthNames: "Janeiro Fevereiro Mar\u00e7o Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro".split(" "),
        monthNamesShort: "Jan Fev Mar Abr Mai Jun Jul Ago Set Out Nov Dez".split(" "),
        monthText: "M\u00eas",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Agora",
        pmText: "pm",
        amText: "am",
        todayText: "Hoje",
        dateText: "Data",
        timeText: "Tempo",
        closeText: "Fechar",
        allDayText: "Dia inteiro",
        noEventsText: "Nenhum evento",
        eventText: "Evento",
        eventsText: "Eventos",
        fromText: "In\x26iacute;cio",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Fra\u00e7\u00e3o",
        unitText: "Unidade",
        labels: "Anos Meses Dias Horas Minutos Segundos ".split(" "),
        labelsShort: "Ano M\x26ecirc;s Dia Hora Min Seg ".split(" "),
        startText: "Come\u00e7ar",
        stopText: "Pare",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Anterior",
        undoText: "Desfazer",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n["pt-PT"] = {
        setText: "Seleccionar",
        cancelText: "Cancelar",
        clearText: "Claro",
        selectedText: "{count} selecionado",
        selectedPluralText: "{count} selecionados",
        dateFormat: "dd-mm-yy",
        dayNames: "Domingo Segunda-feira Ter\u00e7a-feira Quarta-feira Quinta-feira Sexta-feira S\u00e1bado".split(" "),
        dayNamesShort: "Dom Seg Ter Qua Qui Sex S\u00e1b".split(" "),
        dayNamesMin: "DSTQQSS".split(""),
        dayText: "Dia",
        hourText: "Horas",
        minuteText: "Minutos",
        monthNames: "Janeiro Fevereiro Mar\u00e7o Abril Maio Junho Julho Agosto Setembro Outubro Novembro Dezembro".split(" "),
        monthNamesShort: "Jan Fev Mar Abr Mai Jun Jul Ago Set Out Nov Dez".split(" "),
        monthText: "M\u00eas",
        secText: "Segundo",
        timeFormat: "HH:ii",
        yearText: "Ano",
        nowText: "Actualizar",
        pmText: "pm",
        amText: "am",
        todayText: "Hoy",
        firstDay: 1,
        dateText: "Data",
        timeText: "Tempo",
        closeText: "Fechar",
        allDayText: "Todo o dia",
        noEventsText: "Nenhum evento",
        eventText: "Evento",
        eventsText: "Eventos",
        fromText: "In\u00edcio",
        toText: "Fim",
        wholeText: "Inteiro",
        fractionText: "Frac\u00e7\u00e3o",
        unitText: "Unidade",
        labels: "Anos Meses Dias Horas Minutos Segundos ".split(" "),
        labelsShort: "Ano M\u00eas Dia Hora Min Seg ".split(" "),
        startText: "Come\u00e7ar",
        stopText: "Parar",
        resetText: "Reinicializar",
        lapText: "Lap",
        hideText: "Esconder",
        backText: "Anterior",
        undoText: "Anular",
        offText: "Desl",
        onText: "Lig",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.ro = {
        setText: "Setare",
        cancelText: "Anulare",
        clearText: "\u015etergere",
        selectedText: "{count} selectat",
        selectedPluralText: "{count} selectate",
        dateFormat: "dd.mm.yy",
        dayNames: "Duminic\u0103 Luni Mar\u021bi Miercuri Joi Vineri S\u00e2mb\u0103t\u0103".split(" "),
        dayNamesShort: "Du Lu Ma Mi Jo Vi S\u00e2".split(" "),
        dayNamesMin: "DLMMJVS".split(""),
        dayText: " Ziua",
        delimiter: ".",
        hourText: " Ore ",
        minuteText: "Minute",
        monthNames: "Ianuarie Februarie Martie Aprilie Mai Iunie Iulie August Septembrie Octombrie Noiembrie Decembrie".split(" "),
        monthNamesShort: "Ian. Feb. Mar. Apr. Mai Iun. Iul. Aug. Sept. Oct. Nov. Dec.".split(" "),
        monthText: "Luna",
        secText: "Secunde",
        timeFormat: "HH:ii",
        yearText: "Anul",
        nowText: "Acum",
        amText: "am",
        pmText: "pm",
        todayText: "Ast\u0103zi",
        prevMonthText: "Luna anterioar\u0103",
        nextMonthText: "Luna urm\u0103toare",
        prevYearText: "Anul anterior",
        nextYearText: "Anul urm\u0103tor",
        eventText: "Eveniment",
        eventsText: "Evenimente",
        allDayText: "Toat\u0103 ziua",
        noEventsText: "Niciun eveniment",
        firstDay: 1,
        dateText: "Data",
        timeText: "Ora",
        closeText: "\u00cenchidere",
        fromText: "Start",
        toText: "Final",
        wholeText: "Complet",
        fractionText: "Par\u0163ial",
        unitText: "Unitate",
        labels: "Ani Luni Zile Ore Minute Secunde ".split(" "),
        labelsShort: "Ani Luni Zile Ore Min. Sec. ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetare",
        lapText: "Tur\u0103",
        hideText: "Ascundere",
        backText: "\u00cenapoi",
        undoText: "Anuleaz\u0103",
        offText: "Nu",
        onText: "Da",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n["ru-UA"] = {
        setText: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c",
        cancelText: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u044c",
        clearText: "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044cr",
        selectedText: "{count} \u0412\u0456\u0431\u0440\u0430\u0442\u044c",
        dateFormat: "dd.mm.yy",
        dayNames: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u0432\u0442\u043e\u0440\u043d\u0438\u043a \u0441\u0440\u0435\u0434\u0430 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 \u043f\u044f\u0442\u043d\u0438\u0446\u0430 \u0441\u0443\u0431\u0431\u043e\u0442\u0430".split(" "),
        dayNamesShort: "\u0432\u0441 \u043f\u043d \u0432\u0442 \u0441\u0440 \u0447\u0442 \u043f\u0442 \u0441\u0431".split(" "),
        dayNamesMin: "\u0432\u043f\u0432\u0441\u0447\u043f\u0441".split(""),
        dayText: "\u0414\u0435\u043d\u044c",
        delimiter: ".",
        hourText: "\u0427\u0430\u0441\u044b",
        minuteText: "\u041c\u0438\u043d\u0443\u0442\u044b",
        monthNames: "\u042f\u043d\u0432\u0430\u0440\u044c \u0424\u0435\u0432\u0440\u0430\u043b\u044c \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0435\u043b\u044c \u041c\u0430\u0439 \u0418\u044e\u043d\u044c \u0418\u044e\u043b\u044c \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u041e\u043a\u0442\u044f\u0431\u0440\u044c \u041d\u043e\u044f\u0431\u0440\u044c \u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
        monthNamesShort: "\u042f\u043d\u0432. \u0424\u0435\u0432\u0440. \u041c\u0430\u0440\u0442 \u0410\u043f\u0440. \u041c\u0430\u0439 \u0418\u044e\u043d\u044c \u0418\u044e\u043b\u044c \u0410\u0432\u0433. \u0421\u0435\u043d\u0442. \u041e\u043a\u0442. \u041d\u043e\u044f\u0431. \u0414\u0435\u043a.".split(" "),
        monthText: "\u041c\u0435\u0441\u044f\u0446\u044b",
        secText: "\u0421\u0438\u043a\u0443\u043d\u0434\u044b",
        timeFormat: "HH:ii",
        yearText: "\u0413\u043e\u0434",
        nowText: "\u0421\u0435\u0439\u0447\u0430\u0441",
        amText: "am",
        pmText: "pm",
        todayText: "C\u0435\u0433\u043e\u0434\u043d\u044f",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0430",
        timeText: "\u0412\u0440\u0435\u043c\u044f",
        closeText: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
        allDayText: "\u0412\u0435\u0441\u044c \u0434\u0435\u043d\u044c",
        noEventsText: "\u041d\u0435\u0442 \u0441\u043e\u0431\u044b\u0442\u0438\u0439",
        eventText: "\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f",
        eventsText: "\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f",
        fromText: "\u041d\u0430\u0447\u0430\u043b\u043e",
        toText: "\u041a\u043e\u043d\u0435\u0446",
        wholeText: "\u0412\u0435\u0441\u044c",
        fractionText: "\u0427\u0430\u0441\u0442\u044c",
        unitText: "\u0415\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u0413\u043e\u0434\u044b; \u041c\u0435\u0441\u044f\u0446\u044b ; \u0414\u043d\u0438 ; \u0427\u0430\u0441\u044b ; \u041c\u0438\u043d\u0443\u0442\u044b ; \u0421\u0435\u043a\u0443\u043d\u0434\u044b;".split(";"),
        labelsShort: "\u0413\u043e\u0434 \u041c\u0435\u0441. \u0414\u043d. \u0427. \u041c\u0438\u043d. \u0421\u0435\u043a. ".split(" "),
        startText: "\u0421\u0442\u0430\u0440\u0442",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: " \u0421\u0431\u0440\u043e\u0441 ",
        lapText: " \u042d\u0442\u0430\u043f ",
        hideText: " \u0421\u043a\u0440\u044b\u0442\u044c ",
        backText: "\u043d\u0430\u0437\u0430\u0434",
        undoText: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u042c",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n["ru-RU"] = G.i18n.ru = {
        setText: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c",
        cancelText: "\u041e\u0442\u043c\u0435\u043d\u0430",
        clearText: "\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c",
        selectedText: "{count} \u0412\u044b\u0431\u0440\u0430\u0442\u044c",
        dateFormat: "dd.mm.yy",
        dayNames: "\u0432\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435 \u043f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u0432\u0442\u043e\u0440\u043d\u0438\u043a \u0441\u0440\u0435\u0434\u0430 \u0447\u0435\u0442\u0432\u0435\u0440\u0433 \u043f\u044f\u0442\u043d\u0438\u0446\u0430 \u0441\u0443\u0431\u0431\u043e\u0442\u0430".split(" "),
        dayNamesShort: "\u0432\u0441 \u043f\u043d \u0432\u0442 \u0441\u0440 \u0447\u0442 \u043f\u0442 \u0441\u0431".split(" "),
        dayNamesMin: "\u0432\u043f\u0432\u0441\u0447\u043f\u0441".split(""),
        dayText: "\u0414\u0435\u043d\u044c",
        delimiter: ".",
        hourText: "\u0427\u0430\u0441",
        minuteText: "\u041c\u0438\u043d\u0443\u0442",
        monthNames: "\u042f\u043d\u0432\u0430\u0440\u044c \u0424\u0435\u0432\u0440\u0430\u043b\u044c \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0435\u043b\u044c \u041c\u0430\u0439 \u0418\u044e\u043d\u044c \u0418\u044e\u043b\u044c \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c \u041e\u043a\u0442\u044f\u0431\u0440\u044c \u041d\u043e\u044f\u0431\u0440\u044c \u0414\u0435\u043a\u0430\u0431\u0440\u044c".split(" "),
        monthNamesShort: "\u042f\u043d\u0432 \u0424\u0435\u0432 \u041c\u0430\u0440 \u0410\u043f\u0440 \u041c\u0430\u0439 \u0418\u044e\u043d \u0418\u044e\u043b \u0410\u0432\u0433 \u0421\u0435\u043d \u041e\u043a\u0442 \u041d\u043e\u044f \u0414\u0435\u043a".split(" "),
        monthText: "\u041c\u0435\u0441\u044f\u0446",
        secText: "\u0421\u0435\u043a\u0443\u043d\u0434",
        timeFormat: "HH:ii",
        yearText: "\u0413\u043e\u0434",
        nowText: "\u0421\u0435\u0439\u0447\u0430\u0441",
        amText: "am",
        pmText: "pm",
        todayText: "C\u0435\u0433\u043e\u0434\u043d\u044f",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0430",
        timeText: "\u0412\u0440\u0435\u043c\u044f",
        closeText: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c",
        allDayText: "\u0412\u0435\u0441\u044c \u0434\u0435\u043d\u044c",
        noEventsText: "\u041d\u0435\u0442 \u0441\u043e\u0431\u044b\u0442\u0438\u0439",
        eventText: "\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f",
        eventsText: "\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u044f",
        fromText: "\u041d\u0430\u0447\u0430\u043b\u043e",
        toText: "\u041a\u043e\u043d\u0435\u0446",
        wholeText: "\u0426\u0435\u043b\u043e\u0435",
        fractionText: "\u0414\u0440\u043e\u0431\u043d\u043e\u0435",
        unitText: "\u0415\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u041b\u0435\u0442 \u041c\u0435\u0441\u044f\u0446\u0435\u0432 \u0414\u043d\u0435\u0439 \u0427\u0430\u0441\u043e\u0432 \u041c\u0438\u043d\u0443\u0442 \u0421\u0435\u043a\u0443\u043d\u0434 ".split(" "),
        labelsShort: "\u041b\u0435\u0442 \u041c\u0435\u0441 \u0414\u043d \u0427\u0430\u0441 \u041c\u0438\u043d \u0421\u0435\u043a ".split(" "),
        startText: "\u0421\u0442\u0430\u0440\u0442",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: "\u0421\u0431\u0440\u043e\u0441\u0438\u0442\u044c",
        lapText: "\u041a\u0440\u0443\u0433",
        hideText: "\u0421\u043a\u0440\u044b\u0442\u044c",
        backText: "\u043d\u0430\u0437\u0430\u0434",
        undoText: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u042c",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.sk = {
        setText: "Zadaj",
        cancelText: "Zru\u0161i\u0165",
        clearText: "Vymaza\u0165",
        selectedText: "Ozna\u010den\u00fd: {count}",
        dateFormat: "d.m.yy",
        dayNames: "Nede\u013ea Pondelok Utorok Streda \u0160tvrtok Piatok Sobota".split(" "),
        dayNamesShort: "Ne Po Ut St \u0160t Pi So".split(" "),
        dayNamesMin: "NPUS\u0160PS".split(""),
        dayText: "\u010ee\u0148",
        hourText: "Hodiny",
        minuteText: "Min\u00faty",
        monthNames: "Janu\u00e1r Febru\u00e1r Marec Apr\u00edl M\u00e1j J\u00fan J\u00fal August September Okt\u00f3ber November December".split(" "),
        monthNamesShort: "Jan Feb Mar Apr M\u00e1j J\u00fan J\u00fal Aug Sep Okt Nov Dec".split(" "),
        monthText: "Mesiac",
        secText: "Sekundy",
        timeFormat: "H:ii",
        yearText: "Rok",
        nowText: "Teraz",
        amText: "am",
        pmText: "pm",
        todayText: "Dnes",
        firstDay: 1,
        dateText: "Datum",
        timeText: "\u010cas",
        closeText: "Zavrie\u0165",
        allDayText: "Cel\u00fd de\u0148",
        noEventsText: "\u017diadne udalosti",
        eventText: "Udalost\u00ed",
        eventsText: "Udalosti",
        fromText: "Za\u010diatok",
        toText: "Koniec",
        wholeText: "Cel\u00fd",
        fractionText: "\u010cas\u0165",
        unitText: "Jednotka",
        labels: "Roky Mesiace Dni Hodiny Min\u00faty Sekundy ".split(" "),
        labelsShort: "Rok Mes Dni Hod Min Sec ".split(" "),
        startText: "Start",
        stopText: "Stop",
        resetText: "Resetova\u0165",
        lapText: "Etapa",
        hideText: "Schova\u0165",
        backText: "Sp\u00e4\u0165",
        undoText: "Sp\u00e4\u0165",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.sr = {
        setText: "\u041f\u043e\u0441\u0442\u0430\u0432\u0438",
        cancelText: "\u041e\u0442\u043a\u0430\u0436\u0438",
        clearText: "\u041e\u0431\u0440\u0438\u0448\u0438",
        selectedText: "{count} \u0438\u0437\u0430\u0431\u0440\u0430\u043d\u0430",
        dateFormat: "dd.mm.yy",
        dayNames: "\u041d\u0435\u0434\u0435\u0459\u0430 \u041f\u043e\u043d\u0435\u0434\u0435\u0459\u0430\u043a \u0423\u0442\u043e\u0440\u0430\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0440\u0442\u0430\u043a \u041f\u0435\u0442\u0430\u043a \u0421\u0443\u0431\u043e\u0442\u0430".split(" "),
        dayNamesShort: "\u041d\u0435\u0434 \u041f\u043e\u043d \u0423\u0442\u043e \u0421\u0440\u0435 \u0427\u0435\u0442 \u041f\u0435\u0442 \u0421\u0443\u0431".split(" "),
        dayNamesMin: "\u041d\u0435 \u041f\u043e \u0423\u0442 \u0421\u0440 \u0427\u0435 \u041f\u0435 \u0421\u0443".split(" "),
        dayText: "\u0414\u0430\u043d",
        delimiter: ".",
        hourText: "\u0427\u0430\u0441",
        minuteText: "\u041c\u0438\u043d\u0443\u0442",
        monthNames: "\u0408\u0430\u043d\u0443\u0430\u0440 \u0424\u0435\u0431\u0440\u0443\u0430\u0440 \u041c\u0430\u0440\u0442 \u0410\u043f\u0440\u0438\u043b \u041c\u0430\u0458 \u0408\u0443\u043d \u0408\u0443\u043b \u0410\u0432\u0433\u0443\u0441\u0442 \u0421\u0435\u043f\u0442\u0435\u043c\u0431\u0430\u0440 \u041e\u043a\u0442\u043e\u0431\u0430\u0440 \u041d\u043e\u0432\u0435\u043c\u0431\u0430\u0440 \u0414\u0435\u0446\u0435\u043c\u0431\u0430\u0440".split(" "),
        monthNamesShort: "\u0408\u0430\u043d \u0424\u0435\u0431 \u041c\u0430\u0440 \u0410\u043f\u0440 \u041c\u0430\u0458 \u0408\u0443\u043d \u0408\u0443\u043b \u0410\u0432\u0433 \u0421\u0435\u043f \u041e\u043a\u0442 \u041d\u043e\u0432 \u0414\u0435\u0446".split(" "),
        monthText: "\u043c\u0435\u0441\u0435\u0446",
        secText: "\u0421\u0435\u043a\u0443\u043d\u0434",
        timeFormat: "H:ii",
        yearText: "\u0433\u043e\u0434\u0438\u043d\u0430",
        nowText: "\u0441\u0430\u0434\u0430",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "\u0414\u0430\u0442\u0443\u043c",
        timeText: "\u0432\u0440\u0435\u043c\u0435",
        todayText: "\u0414\u0430\u043d\u0430\u0441",
        prevMonthText: "\u041f\u0440\u0435\u0442\u0445\u043e\u0434\u043d\u0438 \u043c\u0458\u0435\u0441\u0435\u0446",
        nextMonthText: "\u0421\u043b\u0435\u0434\u0435\u045b\u0435\u0433 \u043c\u0435\u0441\u0435\u0446\u0430",
        prevYearText: "\u041f\u0440\u0435\u0442\u0445\u043e\u0434\u043d\u0430 \u0433\u043e\u0434\u0438\u043d\u0435",
        nextYearText: "\u0421\u043b\u0435\u0434\u0435\u045b\u0435 \u0433\u043e\u0434\u0438\u043d\u0435",
        closeText: "\u0417\u0430\u0442\u0432\u043e\u0440\u0438",
        eventText: "\u0414\u043e\u0433\u0430\u0452\u0430\u0458",
        eventsText: "\u0414\u043e\u0433\u0430\u0452\u0430\u0458\u0438",
        allDayText: "\u0426\u0435\u043e \u0434\u0430\u043d",
        noEventsText: "\u041d\u0435\u043c\u0430 \u0434\u043e\u0433\u0430\u0452\u0430\u0458\u0430",
        fromText: "\u041e\u0434",
        toText: "\u0414\u043e",
        wholeText: "\u0446\u0435\u043e",
        fractionText: "\u0424\u0440\u0430\u043a\u0446\u0438\u0458\u0430",
        unitText: "\u0435\u0434\u0438\u043d\u0438\u0446\u0430",
        labels: "\u0413\u043e\u0434\u0438\u043d\u0435 \u041c\u0435\u0441\u0435\u0446\u0438 \u0414\u0430\u043d\u0430 \u0421\u0430\u0442\u0438 \u041c\u0438\u043d\u0443\u0442\u0430 \u0421\u0435\u043a\u0443\u043d\u0434\u0438 ".split(" "),
        labelsShort: "\u0413\u043e\u0434 \u041c\u0435\u0441 \u0414\u0430\u043d\u0430 \u0421\u0430\u0442\u0438 \u041c\u0438\u043d\u0443 \u0421\u0435\u043a\u0443 ".split(" "),
        startText: "\u0417\u0430\u043f\u043e\u0447\u043d\u0438",
        stopText: "\u0421\u0442\u043e\u043f",
        resetText: "\u0420\u0435\u0441\u0435\u0442\u0443\u0458",
        lapText: "\u041a\u0440\u0443\u0433",
        hideText: "\u0421\u0430\u043a\u0440\u0438\u0442\u0438",
        backText: "\u041f\u043e\u0432\u0440\u0430\u0442\u0430\u043a",
        undoText: "\u041e\u043f\u043e\u0437\u043e\u0432\u0438",
        offText: "\u043de",
        onText: "\u0434\u0430",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.sv = {
        setText: "OK",
        cancelText: "Avbryt",
        clearText: "Klara",
        selectedText: "{count} vald",
        dateFormat: "yy-mm-dd",
        dayNames: "S\u00f6ndag M\u00e5ndag Tisdag Onsdag Torsdag Fredag L\u00f6rdag".split(" "),
        dayNamesShort: "S\u00f6 M\u00e5 Ti On To Fr L\u00f6".split(" "),
        dayNamesMin: "SMTOTFL".split(""),
        dayText: "Dag",
        hourText: "Timme",
        minuteText: "Minut",
        monthNames: "Januari Februari Mars April Maj Juni Juli Augusti September Oktober November December".split(" "),
        monthNamesShort: "Jan Feb Mar Apr Maj Jun Jul Aug Sep Okt Nov Dec".split(" "),
        monthText: "M\u00e5nad",
        secText: "Sekund",
        timeFormat: "HH:ii",
        yearText: "\u00c5r",
        nowText: "Nu",
        pmText: "pm",
        amText: "am",
        todayText: "I dag",
        firstDay: 1,
        dateText: "Datum",
        timeText: "Tid",
        closeText: "St\u00e4ng",
        allDayText: "Heldag",
        noEventsText: "Inga aktiviteter",
        eventText: "H\u00e4ndelse",
        eventsText: "H\u00e4ndelser",
        fromText: "Start",
        toText: "Slut",
        wholeText: "Hela",
        fractionText: "Br\u00e5k",
        unitText: "Enhet",
        labels: "\u00c5r M\u00e5nader Dagar Timmar Minuter Sekunder ".split(" "),
        labelsShort: "\u00c5r M\u00e5n Dag Tim Min Sek ".split(" "),
        startText: "Start",
        stopText: "Stopp",
        resetText: "\u00c5terst\u00e4ll",
        lapText: "Varv",
        hideText: "D\u00f6lj",
        backText: "Tillbaka",
        undoText: "\u00c5ngra",
        offText: "Av",
        onText: "P\u00e5"
    };
    G.i18n.th = {
        setText: "\u0e15\u0e31\u0e49\u0e07\u0e04\u0e48\u0e32",
        cancelText: "\u0e22\u0e01\u0e40\u0e25\u0e34\u0e01",
        clearText: "\u0e25\u0e49\u0e32\u0e07",
        selectedText: "{count} \u0e40\u0e25\u0e37\u0e2d\u0e01",
        dateFormat: "dd/mm/yy",
        dayNames: "\u0e2d\u0e32\u0e17\u0e34\u0e15\u0e22\u0e4c \u0e08\u0e31\u0e19\u0e17\u0e23\u0e4c \u0e2d\u0e31\u0e07\u0e04\u0e32\u0e23 \u0e1e\u0e38\u0e18 \u0e1e\u0e24\u0e2b\u0e31\u0e2a\u0e1a\u0e14\u0e35 \u0e28\u0e38\u0e01\u0e23\u0e4c \u0e40\u0e2a\u0e32\u0e23\u0e4c".split(" "),
        dayNamesShort: "\u0e2d\u0e32. \u0e08. \u0e2d. \u0e1e. \u0e1e\u0e24. \u0e28. \u0e2a.".split(" "),
        dayNamesMin: "\u0e2d\u0e32. \u0e08. \u0e2d. \u0e1e. \u0e1e\u0e24. \u0e28. \u0e2a.".split(" "),
        dayText: "\u0e27\u0e31\u0e19",
        delimiter: ".",
        hourText: "\u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07",
        minuteText: "\u0e19\u0e32\u0e17\u0e35",
        monthNames: "\u0e21\u0e01\u0e23\u0e32\u0e04\u0e21 \u0e01\u0e38\u0e21\u0e20\u0e32\u0e1e\u0e31\u0e19\u0e18\u0e4c \u0e21\u0e35\u0e19\u0e32\u0e04\u0e21 \u0e40\u0e21\u0e29\u0e32\u0e22\u0e19 \u0e1e\u0e24\u0e29\u0e20\u0e32\u0e04\u0e21 \u0e21\u0e34\u0e16\u0e38\u0e19\u0e32\u0e22\u0e19 \u0e01\u0e23\u0e01\u0e0e\u0e32\u0e04\u0e21 \u0e2a\u0e34\u0e07\u0e2b\u0e32\u0e04\u0e21 \u0e01\u0e31\u0e19\u0e22\u0e32\u0e22\u0e19 \u0e15\u0e38\u0e25\u0e32\u0e04\u0e21 \u0e1e\u0e24\u0e28\u0e08\u0e34\u0e01\u0e32\u0e22\u0e19 \u0e18\u0e31\u0e19\u0e27\u0e32\u0e04\u0e21".split(" "),
        monthNamesShort: "\u0e21.\u0e04. \u0e01.\u0e1e. \u0e21\u0e35.\u0e04. \u0e40\u0e21.\u0e22. \u0e1e.\u0e04. \u0e21\u0e34.\u0e22. \u0e01.\u0e04. \u0e2a.\u0e04. \u0e01.\u0e22. \u0e15.\u0e04. \u0e1e.\u0e22. \u0e18.\u0e04.".split(" "),
        monthText: "\u0e40\u0e14\u0e37\u0e2d\u0e19",
        secText: "\u0e27\u0e34\u0e19\u0e32\u0e17\u0e35",
        timeFormat: "HH:ii",
        yearText: "\u0e1b\u0e35",
        nowText: "\u0e15\u0e2d\u0e19\u0e19\u0e35\u0e49",
        pmText: "pm",
        amText: "am",
        firstDay: 0,
        dateText: "\u0e27\u0e31\u0e19",
        timeText: "\u0e40\u0e27\u0e25\u0e32",
        today: "\u0e27\u0e31\u0e19\u0e19\u0e35\u0e49",
        prevMonthText: "\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e01\u0e48\u0e2d\u0e19\u0e2b\u0e19\u0e49\u0e32",
        nextMonthText: "\u0e40\u0e14\u0e37\u0e2d\u0e19\u0e16\u0e31\u0e14\u0e44\u0e1b",
        prevYearText: "\u0e1b\u0e35\u0e01\u0e48\u0e2d\u0e19\u0e2b\u0e19\u0e49\u0e32",
        nextYearText: "\u0e1b\u0e35\u0e16\u0e31\u0e14\u0e44\u0e1b",
        closeText: "\u0e1b\u0e34\u0e14",
        eventText: "\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c",
        eventsText: "\u0e40\u0e2b\u0e15\u0e38\u0e01\u0e32\u0e23\u0e13\u0e4c",
        allDayText: "\u0e15\u0e25\u0e2d\u0e14\u0e27\u0e31\u0e19",
        noEventsText: "\u0e44\u0e21\u0e48\u0e21\u0e35\u0e01\u0e34\u0e08\u0e01\u0e23\u0e23\u0e21",
        fromText: "\u0e08\u0e32\u0e01",
        toText: "\u0e16\u0e36\u0e07",
        wholeText: "\u0e17\u0e31\u0e49\u0e07\u0e2b\u0e21\u0e14",
        fractionText: "\u0e40\u0e28\u0e29\u0e2a\u0e48\u0e27\u0e19",
        unitText: "\u0e2b\u0e19\u0e48\u0e27\u0e22",
        labels: "\u0e1b\u0e35 \u0e40\u0e14\u0e37\u0e2d\u0e19 \u0e27\u0e31\u0e19 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07 \u0e19\u0e32\u0e17\u0e35 \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35 ".split(" "),
        labelsShort: "\u0e1b\u0e35 \u0e40\u0e14\u0e37\u0e2d\u0e19 \u0e27\u0e31\u0e19 \u0e0a\u0e31\u0e48\u0e27\u0e42\u0e21\u0e07 \u0e19\u0e32\u0e17\u0e35 \u0e27\u0e34\u0e19\u0e32\u0e17\u0e35 ".split(" "),
        startText: "\u0e40\u0e23\u0e34\u0e48\u0e21",
        stopText: "\u0e2b\u0e22\u0e38\u0e14",
        resetText: "\u0e23\u0e35\u0e40\u0e0b\u0e47\u0e15",
        lapText: "\u0e23\u0e2d\u0e1a",
        hideText: "\u0e0b\u0e48\u0e2d\u0e19",
        backText: "\u0e22\u0e49\u0e2d\u0e19\u0e01\u0e25\u0e31\u0e1a",
        undoText: "\u0e40\u0e25\u0e34\u0e01\u0e17\u0e32",
        offText: "\u0e1b\u0e34\u0e14",
        onText: "\u0e40\u0e1b\u0e34\u0e14",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.tr = {
        setText: "Se\u00e7",
        cancelText: "\u0130ptal",
        clearText: "Temizleyin",
        selectedText: "{count} se\u00e7ilmi\u015f",
        dateFormat: "dd.mm.yy",
        dayNames: "Pazar Pazartesi Sal\u0131 \u00c7ar\u015famba Per\u015fembe Cuma Cumartesi".split(" "),
        dayNamesShort: "Paz Pzt Sal \u00c7ar Per Cum Cmt".split(" "),
        dayNamesMin: "PPS\u00c7PCC".split(""),
        dayText: "G\u00fcn",
        delimiter: ".",
        hourText: "Saat",
        minuteText: "Dakika",
        monthNames: "Ocak \u015eubat Mart Nisan May\u0131s Haziran Temmuz A\u011fustos Eyl\u00fcl Ekim Kas\u0131m Aral\u0131k".split(" "),
        monthNamesShort: "Oca \u015eub Mar Nis May Haz Tem A\u011fu Eyl Eki Kas Ara".split(" "),
        monthText: "Ay",
        secText: "Saniye",
        timeFormat: "HH:ii",
        yearText: "Y\u0131l",
        nowText: "\u015eimdi",
        pmText: "pm",
        amText: "am",
        todayText: "Bug\u00fcn",
        firstDay: 1,
        dateText: "Tarih",
        timeText: "Zaman",
        closeText: "Kapatmak",
        allDayText: "T\u00fcm g\u00fcn",
        noEventsText: "Etkinlik Yok",
        eventText: "Etkinlik",
        eventsText: "Etkinlikler",
        fromText: "Ba\u015fla",
        toText: "Son",
        wholeText: "Tam",
        fractionText: "Kesir",
        unitText: "Birim",
        labels: "Y\u0131l Ay G\u00fcn Saat Dakika Saniye ".split(" "),
        labelsShort: "Y\u0131l Ay G\u00fcn Sa Dak Sn ".split(" "),
        startText: "Ba\u015fla",
        stopText: "Durdur",
        resetText: "S\u0131f\u0131rla",
        lapText: "Tur",
        hideText: "Gizle",
        backText: "Geri",
        undoText: "Geri Al",
        offText: "O",
        onText: "I",
        decimalSeparator: ",",
        thousandsSeparator: "."
    };
    G.i18n.ua = {
        setText: "\u0432\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0438",
        cancelText: "\u0432\u0456\u0434\u043c\u0456\u043d\u0430",
        clearText: "\u043e\u0447\u0438\u0441\u0442\u0438\u0442\u0438",
        selectedText: "{count} \u0432\u0438\u0431\u0440\u0430\u043d\u0456",
        dateFormat: "dd.mm.yy",
        dayNames: "\u043d\u0435\u0434\u0456\u043b\u044f \u043f\u043e\u043d\u0435\u0434\u0456\u043b\u043e\u043a \u0432\u0456\u0432\u0442\u043e\u0440\u043e\u043a \u0441\u0435\u0440\u0435\u0434\u0430 \u0447\u0435\u0442\u0432\u0435\u0440 \u043f\u2019\u044f\u0442\u043d\u0438\u0446\u044f \u0441\u0443\u0431\u043e\u0442\u0430".split(" "),
        dayNamesShort: "\u043d\u0435\u0434 \u043f\u043d\u0434 \u0432\u0456\u0432 \u0441\u0440\u0434 \u0447\u0442\u0432 \u043f\u0442\u043d \u0441\u0431\u0442".split(" "),
        dayNamesMin: "\u041d\u0434 \u041f\u043d \u0412\u0442 \u0421\u0440 \u0427\u0442 \u041f\u0442 \u0421\u0431".split(" "),
        dayText: "\u0414\u0435\u043d\u044c",
        delimiter: ".",
        hourText: "\u0433\u043e\u0434\u0438\u043d\u0430",
        minuteText: "\u0445\u0432\u0438\u043b\u0438\u043d\u0430",
        monthNames: "\u0421\u0456\u0447\u0435\u043d\u044c \u041b\u044e\u0442\u0438\u0439 \u0411\u0435\u0440\u0435\u0437\u0435\u043d\u044c \u041a\u0432\u0456\u0442\u0435\u043d\u044c \u0422\u0440\u0430\u0432\u0435\u043d\u044c \u0427\u0435\u0440\u0432\u0435\u043d\u044c \u041b\u0438\u043f\u0435\u043d\u044c \u0421\u0435\u0440\u043f\u0435\u043d\u044c \u0412\u0435\u0440\u0435\u0441\u0435\u043d\u044c \u0416\u043e\u0432\u0442\u0435\u043d\u044c \u041b\u0438\u0441\u0442\u043e\u043f\u0430\u0434 \u0413\u0440\u0443\u0434\u0435\u043d\u044c".split(" "),
        monthNamesShort: "\u0421\u0456\u0447 \u041b\u044e\u0442 \u0411\u0435\u0440 \u041a\u0432\u0456 \u0422\u0440\u0430 \u0427\u0435\u0440 \u041b\u0438\u043f \u0421\u0435\u0440 \u0412\u0435\u0440 \u0416\u043e\u0432 \u041b\u0438\u0441 \u0413\u0440\u0443".split(" "),
        monthText: "\u041c\u0456\u0441\u044f\u0446\u044c",
        secText: "\u0421\u0435\u043a\u0443\u043d\u0434",
        timeFormat: "H:ii",
        yearText: "\u0420\u0456\u043a",
        nowText: "\u0417\u0430\u0440\u0430\u0437",
        pmText: "pm",
        amText: "am",
        firstDay: 1,
        dateText: "\u0434\u0430\u0442\u0430",
        timeText: "\u0427\u0430\u0441",
        todayText: "\u0421\u044c\u043e\u0433\u043e\u0434\u043d\u0456",
        prevMonthText: "\u041f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u0456\u0439 \u043c\u0456\u0441\u044f\u0446\u044c",
        nextMonthText: "\u041d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0433\u043e \u043c\u0456\u0441\u044f\u0446\u044f",
        prevYearText: "\u041f\u043e\u043f\u0435\u0440\u0435\u0434\u043d\u0456\u0439 \u0440\u0456\u043a",
        nextYearText: "\u041d\u0430\u0441\u0442\u0443\u043f\u043d\u043e\u0433\u043e \u0440\u043e\u043a\u0443",
        closeText: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438",
        eventText: "\u043f\u043e\u0434\u0456\u044f",
        eventsText: "\u043f\u043e\u0434\u0456\u0457",
        allDayText: "\u0423\u0432\u0435\u0441\u044c \u0434\u0435\u043d\u044c",
        noEventsText: "\u0416\u043e\u0434\u043d\u043e\u0457 \u043f\u043e\u0434\u0456\u0457",
        fromText: "\u0432\u0456\u0434",
        toText: "\u043a\u0456\u043d\u0435\u0446\u044c",
        wholeText: "\u0432\u0441\u0456",
        fractionText: "\u0444\u0440\u0430\u043a\u0446\u0456\u044f",
        unitText: "\u043e\u0434\u0438\u043d\u0438\u0446\u044f",
        labels: "\u0420\u0456\u043a \u041c\u0456\u0441\u044f\u0446\u044c \u0414\u0435\u043d\u044c \u0433\u043e\u0434\u0438\u043d\u0430 \u0445\u0432\u0438\u043b\u0438\u043d\u0430 \u0421\u0435\u043a\u0443\u043d\u0434 ".split(" "),
        labelsShort: "\u0420\u0456\u043a \u041c\u0456\u0441\u044f\u0446\u044c \u0414\u0435\u043d\u044c \u0433\u043e\u0434\u0438\u043d\u0430 \u0445\u0432\u0438\u043b\u0438\u043d\u0430 \u0421\u0435\u043a\u0443\u043d\u0434 ".split(" "),
        startText: "\u041f\u043e\u0447\u0430\u0442\u043e\u043a",
        stopText: "\u0421\u0422\u041e\u041f",
        resetText: "\u0441\u043a\u0438\u043d\u0443\u0442\u0438",
        lapText: "\u043a\u043e\u043b\u043e",
        hideText: "\u0441\u0445\u043e\u0432\u0430\u0442\u0438",
        backText: "\u043d\u0430\u0437\u0430\u0434",
        undoText: "\u0432\u0456\u0434\u043c\u0456\u043d\u0438\u0442\u0438",
        offText: "\u0412\u0438\u043c\u0438\u043a\u0430\u0442\u0438",
        onText: "\u0423\u0432\u0456\u043c\u043a\u043d\u0443\u0442\u0438",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.vi = {
        setText: "\u0110\u1eb7t",
        cancelText: "H\u1ee7y b\u00f2",
        clearText: "X\u00f3a",
        selectedText: "{count} ch\u1ecdn",
        dateFormat: "dd/mm/yy",
        dayNames: "Ch\u1ee7 Nh\u1eadt;Th\u1ee9 Hai;Th\u1ee9 Ba;Th\u1ee9 T\u01b0;Th\u1ee9 N\u0103m;Th\u1ee9 S\u00e1u;Th\u1ee9 B\u1ea3y".split(";"),
        dayNamesShort: "CN T2 T3 T4 T5 T6 T7".split(" "),
        dayNamesMin: "CN T2 T3 T4 T5 T6 T7".split(" "),
        dayText: "",
        delimiter: "/",
        hourText: "Gi\u1edd",
        minuteText: "Ph\u00fat",
        monthNames: "Th\u00e1ng M\u1ed9t;Th\u00e1ng Hai;Th\u00e1ng Ba;Th\u00e1ng T\u01b0;Th\u00e1ng N\u0103m;Th\u00e1ng S\u00e1u;Th\u00e1ng B\u1ea3y;Th\u00e1ng T\u00e1m;Th\u00e1ng Ch\u00edn;Th\u00e1ng M\u01b0\u1eddi;Th\u00e1ng M\u01b0\u1eddi M\u1ed9t;Th\u00e1ng M\u01b0\u1eddi Hai".split(";"),
        monthNamesShort: "Th\u00e1ng 1;Th\u00e1ng 2;Th\u00e1ng 3;Th\u00e1ng 4;Th\u00e1ng 5;Th\u00e1ng 6;Th\u00e1ng 7;Th\u00e1ng 8;Th\u00e1ng 9;Th\u00e1ng 10;Th\u00e1ng 11;Th\u00e1ng 12".split(";"),
        monthText: "Th\u00e1ng",
        secText: "Gi\u00e2y",
        timeFormat: "H:ii",
        yearText: "N\u0103m",
        nowText: "B\u00e2y gi\u1edd",
        pmText: "pm",
        amText: "am",
        firstDay: 0,
        dateText: "Ng\u00e0y",
        timeText: "H\u1ed3i",
        todayText: "H\u00f4m nay",
        prevMonthText: "Th\u00e1ng tr\u01b0\u1edbc",
        nextMonthText: "Th\u00e1ng t\u1edbi",
        prevYearText: "M\u0103m tr\u01b0\u1edbc",
        nextYearText: "N\u0103m t\u1edbi",
        closeText: "\u0110\u00f3ng",
        eventText: "S\u1ef1 ki\u1ec7n",
        eventsText: "S\u1ef1 ki\u1ec7n",
        allDayText: "C\u1ea3 ng\u00e0y",
        noEventsText: "Kh\u00f4ng c\u00f3 s\u1ef1 ki\u1ec7n",
        fromText: "T\u1eeb",
        toText: "T\u1edbi",
        wholeText: "To\u00e0n th\u1ec3",
        fractionText: "Ph\u00e2n s\u1ed1",
        unitText: "\u0111\u01a1n v\u1ecb",
        labels: "N\u0103m Th\u00e1ng Ng\u00e0y Gi\u1edd Ph\u00fat Gi\u00e2y ".split(" "),
        labelsShort: "N\u0103m Th\u00e1ng Ng\u00e0y Gi\u1edd Ph\u00fat Gi\u00e2y ".split(" "),
        startText: "B\u1eaft \u0111\u1ea7u",
        stopText: "D\u1eebng",
        resetText: "\u0110\u1eb7t l\u1ea1i",
        lapText: "V\u00f2ng",
        hideText: "Gi\u1ea5u",
        backText: "Quay l\u1ea1i",
        undoText: "Ho\u00e0n t\u00e1c",
        offText: "T\u1ea5t",
        onText: "B\u1eadt",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    G.i18n.zh = {
        setText: "\u786e\u5b9a",
        cancelText: "\u53d6\u6d88",
        clearText: "\u660e\u786e",
        selectedText: "{count} \u9009",
        dateFormat: "yy/mm/dd",
        dayNames: "\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d".split(" "),
        dayNamesShort: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),
        dayNamesMin: "\u65e5\u4e00\u4e8c\u4e09\u56db\u4e94\u516d".split(""),
        dayText: "\u65e5",
        hourText: "\u65f6",
        minuteText: "\u5206",
        monthNames: "1\u6708 2\u6708 3\u6708 4\u6708 5\u6708 6\u6708 7\u6708 8\u6708 9\u6708 10\u6708 11\u6708 12\u6708".split(" "),
        monthNamesShort: "\u4e00 \u4e8c \u4e09 \u56db \u4e94 \u516d \u4e03 \u516b \u4e5d \u5341 \u5341\u4e00 \u5341\u4e8c".split(" "),
        monthText: "\u6708",
        secText: "\u79d2",
        timeFormat: "HH:ii",
        yearText: "\u5e74",
        nowText: "\u5f53\u524d",
        pmText: "\u4e0b\u5348",
        amText: "\u4e0a\u5348",
        todayText: "\u4eca\u5929",
        dateText: "\u65e5",
        timeText: "\u65f6\u95f4",
        closeText: "\u5173\u95ed",
        allDayText: "\u5168\u5929",
        noEventsText: "\u65e0\u4e8b\u4ef6",
        eventText: "\u6d3b\u52a8",
        eventsText: "\u6d3b\u52a8",
        fromText: "\u5f00\u59cb\u65f6\u95f4",
        toText: "\u7ed3\u675f\u65f6\u95f4",
        wholeText: "\u5408\u8ba1",
        fractionText: "\u5206\u6570",
        unitText: "\u5355\u4f4d",
        labels: "\u5e74 \u6708 \u65e5 \u5c0f\u65f6 \u5206\u949f \u79d2 ".split(" "),
        labelsShort: "\u5e74 \u6708 \u65e5 \u70b9 \u5206 \u79d2 ".split(" "),
        startText: "\u5f00\u59cb",
        stopText: "\u505c\u6b62",
        resetText: "\u91cd\u7f6e",
        lapText: "\u5708",
        hideText: "\u9690\u85cf",
        backText: "\u8fd4\u56de",
        undoText: "\u590d\u539f",
        offText: "\u5173\u95ed",
        onText: "\u5f00\u542f",
        decimalSeparator: ",",
        thousandsSeparator: " "
    };
    var Gc = G.themes;
    Gc.frame.bootstrap = {
        disabledClass: "disabled",
        selectedClass: "btn-primary",
        selectedTabClass: "active",
        tabLink: !0,
        todayClass: "text-primary mbsc-cal-today",
        onMarkupInserted: function (a) {
            a = b(a.target);
            var c = b(".mbsc-cal-tabs", a);
            b(".mbsc-fr-popup", a).addClass("popover");
            b(".mbsc-fr-w", a).addClass("popover-content");
            b(".mbsc-fr-hdr", a).addClass("popover-title popover-header");
            b(".mbsc-fr-arr-i", a).addClass("popover");
            b(".mbsc-fr-arr", a).addClass("arrow");
            b(".mbsc-fr-btn", a).addClass("btn btn-default btn-secondary");
            b(".mbsc-fr-btn-s .mbsc-fr-btn", a).removeClass("btn-default btn-secondary").addClass("btn btn-primary");
            c.addClass("nav nav-tabs");
            c.find(".mbsc-cal-tab").addClass("nav-item");
            c.find("a").addClass("nav-link");
            c.find(".mbsc-cal-tab.active .nav-link").addClass("active");
            b(".mbsc-cal-picker", a).addClass("popover");
            b(".mbsc-cal-events", a).addClass("popover");
            b(".mbsc-cal-events-arr", a).addClass("arrow");
            b(".mbsc-range-btn", a).addClass("btn btn-sm btn-small btn-default");
            b(".mbsc-np-btn", a).addClass("btn btn-default");
            b(".mbsc-sel-filter-cont", a).removeClass("mbsc-input");
            b(".mbsc-sel-filter-input", a).addClass("form-control")
        },
        onTabChange: function (a, c) {
            b(".mbsc-cal-tabs .nav-link", c._markup).removeClass("active");
            b(".mbsc-cal-tab.active .nav-link", c._markup).addClass("active")
        },
        onPosition: function (a) {
            setTimeout(function () {
                b(".mbsc-fr-bubble-top, .mbsc-fr-bubble-top .mbsc-fr-arr-i", a.target).removeClass("bottom bs-popover-bottom").addClass("top bs-popover-top");
                b(".mbsc-fr-bubble-bottom, .mbsc-fr-bubble-bottom .mbsc-fr-arr-i", a.target).removeClass("top bs-popover-top").addClass("bottom  bs-popover-bottom")
            }, 10)
        }
    };
    Gc.scroller.bootstrap = U({}, Gc.frame.bootstrap, {
        dateDisplay: "Mddyy",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5 btn-light",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5 btn-light",
        selectedLineHeight: !0,
        onEventBubbleShow: function (a) {
            var c = b(a.eventList);
            b(".mbsc-cal-event-list", c).addClass("list-group");
            b(".mbsc-cal-event", c).addClass("list-group-item");
            setTimeout(function () {
                c.hasClass("mbsc-cal-events-b") ? c.removeClass("top").addClass("bottom") : c.removeClass("bottom").addClass("top")
            }, 10)
        }
    });
    Gc.navigation.bootstrap = {
        wrapperClass: "popover panel panel-default",
        groupClass: "btn-group",
        activeClass: "btn-primary",
        disabledClass: "disabled",
        itemClass: "btn btn-default"
    };
    var kb, vb, Eb = G.themes;
    Eb.frame.ios = {display: "bottom", headerText: !1, btnWidth: !1, deleteIcon: "ios-backspace", scroll3d: !0};
    Eb.scroller.ios = U({}, Eb.frame.ios, {
        rows: 5,
        height: 34,
        minWidth: 55,
        selectedLineHeight: !0,
        selectedLineBorder: 1,
        showLabel: !1,
        useShortLabels: !0,
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        checkIcon: "ion-ios7-checkmark-empty",
        filterClearIcon: "ion-close-circled",
        dateDisplay: "MMdyy",
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5"
    });
    Eb.listview.ios = {
        leftArrowClass: "mbsc-ic-ion-ios7-arrow-back",
        rightArrowClass: "mbsc-ic-ion-ios7-arrow-forward"
    };
    Eb.form.ios = {};
    var Lb = G.themes;
    Lb.frame.material = {
        headerText: !1, btnWidth: !1, deleteIcon: "material-backspace", onMarkupReady: function (a) {
            Gd(b(a.target), ".mbsc-fr-btn-e", "mbsc-disabled", "mbsc-fr-btn-nhl")
        }
    };
    Lb.scroller.material = U({}, Lb.frame.material, {
        showLabel: !1,
        selectedLineBorder: 2,
        weekDays: "min",
        icon: {filled: "material-star", empty: "material-star-outline"},
        checkIcon: "material-check",
        btnPlusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-down",
        btnMinusClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-up",
        btnCalPrevClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-left",
        btnCalNextClass: "mbsc-ic mbsc-ic-material-keyboard-arrow-right",
        onEventBubbleShow: function (a) {
            var c = b(a.eventList);
            a = 2 > b(a.target).closest(".mbsc-cal-row").index();
            var d = b(".mbsc-cal-event-color", c).eq(a ? 0 : -1).css("background-color");
            b(".mbsc-cal-events-arr", c).css("border-color", a ? "transparent transparent " + d + " transparent" : d + "transparent transparent transparent")
        }
    });
    Lb.listview.material = {
        leftArrowClass: "mbsc-ic-material-keyboard-arrow-left",
        rightArrowClass: "mbsc-ic-material-keyboard-arrow-right",
        onItemActivate: function (a) {
            Xc(b(a.target), a.domEvent)
        },
        onItemDeactivate: function () {
            Fb(vb)
        },
        onSlideStart: function (a) {
            b(".mbsc-ripple", a.target).remove()
        },
        onSortStart: function (a) {
            b(".mbsc-ripple", a.target).remove()
        }
    };
    Lb.navigation.material = {
        onInit: function () {
            Gd(b(this), ".mbsc-ms-item.mbsc-btn-e", "mbsc-disabled", "mbsc-btn-nhl")
        }, onMarkupInit: function () {
            b(".mbsc-ripple", this).remove()
        }, onDestroy: function () {
            b(this).off(".mbsc-ripple")
        }
    };
    Lb.form.material = {
        addRipple: function (a, b) {
            Xc(a, b)
        }, removeRipple: function () {
            Fb(vb)
        }
    };
    var Hc = G.themes;
    Hc.frame.windows = {headerText: !1, deleteIcon: "backspace4", btnReverse: !0};
    Hc.scroller.windows = U({}, Hc.frame.windows, {
        rows: 6,
        minWidth: 88,
        height: 44,
        btnPlusClass: "mbsc-ic mbsc-ic-arrow-down5",
        btnMinusClass: "mbsc-ic mbsc-ic-arrow-up5",
        checkIcon: "material-check",
        dateDisplay: "MMdyy",
        showLabel: !1,
        showScrollArrows: !0,
        btnCalPrevClass: "mbsc-ic mbsc-ic-arrow-left5",
        btnCalNextClass: "mbsc-ic mbsc-ic-arrow-right5",
        dayNamesShort: "Su Mo Tu We Th Fr Sa".split(" "),
        useShortLabels: !0
    });
    Hc.form.windows = {};
    G.customTheme("ios-dark", "ios");
    G.customTheme("material-dark", "material");
    G.customTheme("mobiscroll-dark", "mobiscroll");
    G.customTheme("windows-dark", "windows");
    var Qe = G.themes, qb = void 0;
    return "android" == Fa ? qb = "material" : "ios" == Fa ? qb = "ios" : "wp" == Fa && (qb = "windows"), b.each(Qe.frame, function (a, b) {
        if (qb && b.baseTheme == qb && "material-dark" != a && "windows-dark" != a && "ios-dark" != a) return G.autoTheme = a, !1;
        a == qb && (G.autoTheme = a)
    }), G.apiKey = "a37a3c47", G.apiUrl = "https://trial.mobiscroll.com/", G
});