"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var link_1 = require("next/link");
var image_1 = require("next/image");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
var lottie_react_1 = require("lottie-react");
var number_ticker_1 = require("@/app/components/number-ticker");
var shimmer_button_1 = require("@/app/components/shimmer-button");
var scroll_progress_1 = require("@/app/components/scroll-progress");
var animated_tooltip_1 = require("@/app/components/ui/animated-tooltip");
var bento_grid_1 = require("@/app/components/bento-grid");
var feature_skeletons_1 = require("@/app/components/feature-skeletons");
var card_spotlight_1 = require("@/app/components/ui/card-spotlight");
var card_1 = require("@/app/components/ui/card");
var lucide_react_1 = require("lucide-react");
var VCoinSupplyHeader = function () {
    var lottieRef = react_1.useRef(null);
    var _a = react_1.useState(false), isDark = _a[0], setIsDark = _a[1];
    var _b = react_1.useState(null), animationData = _b[0], setAnimationData = _b[1];
    react_1.useEffect(function () {
        var checkTheme = function () {
            var isDarkMode = document.documentElement.classList.contains("dark");
            setIsDark(isDarkMode);
        };
        checkTheme();
        var observer = new MutationObserver(checkTheme);
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ["class"]
        });
        return function () { return observer.disconnect(); };
    }, []);
    react_1.useEffect(function () {
        var loadAnimation = function () { return __awaiter(void 0, void 0, void 0, function () {
            var animation, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!isDark) return [3 /*break*/, 2];
                        return [4 /*yield*/, Promise.resolve().then(function () { return require("@/public/images/Vyral_Icon.json"); })];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, Promise.resolve().then(function () { return require("@/public/images/Vyral_logo_light.json"); })];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        animation = _a;
                        setAnimationData(animation["default"]);
                        return [2 /*return*/];
                }
            });
        }); };
        loadAnimation();
    }, [isDark]);
    var handleMouseEnter = function () {
        if (lottieRef.current) {
            lottieRef.current.play();
        }
    };
    var handleMouseLeave = function () {
        if (lottieRef.current) {
            lottieRef.current.stop();
        }
    };
    return (React.createElement("div", { className: "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#00D4AA] to-cyan-400 relative overflow-hidden" },
        React.createElement("div", { className: "absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(white,transparent_85%)]" }),
        React.createElement("div", { className: "flex items-center justify-center w-full gap-4" },
            React.createElement("div", { onMouseEnter: handleMouseEnter, onMouseLeave: handleMouseLeave, style: { width: 48, height: 48, display: "flex" } }, animationData && (React.createElement(lottie_react_1["default"], { lottieRef: lottieRef, animationData: animationData, loop: false, autoplay: false, style: { width: "100%", height: "100%" } }))),
            React.createElement("div", { className: "text-white" },
                React.createElement("div", { className: "text-4xl font-bold" }, "10B"),
                React.createElement("div", { className: "text-sm opacity-90" }, "Total Supply")))));
};
var ComparisonItem = function (_a) {
    var title = _a.title, _b = _a.isNegative, isNegative = _b === void 0 ? false : _b;
    return (React.createElement("li", { className: "flex gap-2 items-start" },
        isNegative ? React.createElement(XIcon, null) : React.createElement(CheckIcon, null),
        React.createElement("p", { className: "text-gray-700 dark:text-white text-sm" }, title)));
};
var CheckIcon = function () {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "h-4 w-4 text-[#00D4AA] mt-1 shrink-0" },
        React.createElement("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        React.createElement("path", { d: "M12 2c-.218 0 -.432 .002 -.642 .005l-.616 .017l-.299 .013l-.579 .034l-.553 .046c-4.785 .464 -6.732 2.411 -7.196 7.196l-.046 .553l-.034 .579c-.005 .098 -.01 .198 -.013 .299l-.017 .616l-.004 .318l-.001 .324c0 .218 .002 .432 .005 .642l.017 .616l.013 .299l.034 .579l.046 .553c.464 4.785 2.411 6.732 7.196 7.196l.553 .046l.579 .034c.098 .005 .198 .01 .299 .013l.616 .017l.642 .005l.642 -.005l.616 -.017l.299 -.013l.579 -.034l.553 -.046c4.785 -.464 6.732 -2.411 7.196 -7.196l.046 -.553l.034 -.579c.005 -.098 .01 -.198 .013 -.299l.017 -.616l.005 -.642l-.005 -.642l-.017 -.616l-.013 -.299l-.034 -.579l-.046 -.553c-.464 -4.785 -2.411 -6.732 -7.196 -7.196l-.553 -.046l-.579 -.034a28.058 28.058 0 0 0 -.299 -.013l-.616 -.017l-.318 -.004l-.324 -.001zm2.293 7.293a1 1 0 0 1 1.497 1.32l-.083 .094l-4 4a1 1 0 0 1 -1.32 .083l-.094 -.083l-2 -2a1 1 0 0 1 1.32 -1.497l.094 .083l1.293 1.292l3.293 -3.292z", fill: "currentColor", strokeWidth: "0" })));
};
var XIcon = function () {
    return (React.createElement("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "currentColor", className: "h-4 w-4 text-red-500 mt-1 shrink-0" },
        React.createElement("path", { stroke: "none", d: "M0 0h24v24H0z", fill: "none" }),
        React.createElement("path", { d: "M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10zm3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4z", fill: "currentColor", strokeWidth: "0" })));
};
function EarningsCalculator() {
    var _a = react_1.useState(5000), followers = _a[0], setFollowers = _a[1];
    var calculateEarnings = function (followerCount) {
        if (followerCount < 1000) {
            var daily = 70;
            var monthly = daily * 30 + 500;
            return {
                monthly: monthly * 0.01,
                daily: daily * 0.01,
                tips: monthly * 0.3 * 0.01,
                subscriptions: 0,
                marketplace: monthly * 0.1 * 0.01,
                content: monthly * 0.6 * 0.01
            };
        }
        else if (followerCount < 10000) {
            var baseDaily = 200 + followerCount / 100;
            var monthly = baseDaily * 30;
            return {
                monthly: monthly * 0.01,
                daily: baseDaily * 0.01,
                tips: monthly * 0.25 * 0.01,
                subscriptions: monthly * 0.35 * 0.01,
                marketplace: monthly * 0.15 * 0.01,
                content: monthly * 0.25 * 0.01
            };
        }
        else {
            var baseDaily = 300 + followerCount / 10;
            var tips = 1000 * (followerCount / 10000);
            var subscriptions = 5000 * (followerCount / 10000);
            var marketplace = 2000 * (followerCount / 10000);
            var monthly = (baseDaily + tips + subscriptions + marketplace) * 30;
            return {
                monthly: monthly * 0.01,
                daily: (baseDaily + tips + subscriptions + marketplace) * 0.01,
                tips: tips * 30 * 0.01,
                subscriptions: subscriptions * 30 * 0.01,
                marketplace: marketplace * 30 * 0.01,
                content: baseDaily * 30 * 0.01
            };
        }
    };
    var earnings = calculateEarnings(followers);
    var breakdown = [
        {
            label: "Content Rewards",
            amount: earnings.content,
            color: "from-[#00D4AA] to-cyan-400"
        },
        {
            label: "Tips",
            amount: earnings.tips,
            color: "from-cyan-400 to-blue-400"
        },
        {
            label: "Subscriptions",
            amount: earnings.subscriptions,
            color: "from-blue-400 to-purple-400"
        },
        {
            label: "Marketplace",
            amount: earnings.marketplace,
            color: "from-purple-400 to-pink-400"
        },
    ].filter(function (item) { return item.amount > 0; });
    var total = breakdown.reduce(function (sum, item) { return sum + item.amount; }, 0);
    return (React.createElement("div", { className: "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6" },
        React.createElement("h3", { className: "text-xl font-bold mb-6" }, "Earnings Calculator"),
        React.createElement("div", { className: "mb-6" },
            React.createElement("div", { className: "flex justify-between items-center mb-3" },
                React.createElement("label", { className: "text-sm font-medium text-gray-600 dark:text-gray-400" }, "Your Followers"),
                React.createElement("span", { className: "text-xl font-bold text-[#00D4AA]" }, followers.toLocaleString())),
            React.createElement("input", { type: "range", min: "100", max: "100000", step: "100", value: followers, onChange: function (e) { return setFollowers(parseInt(e.target.value)); }, className: "w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-[#00D4AA]" }),
            React.createElement("div", { className: "flex justify-between text-xs text-gray-500 mt-2" },
                React.createElement("span", null, "100"),
                React.createElement("span", null, "50K"),
                React.createElement("span", null, "100K"))),
        React.createElement("div", { className: "bg-gradient-to-br from-[#00D4AA] to-cyan-400 rounded-xl p-6 mb-6 text-center text-white" },
            React.createElement("div", { className: "text-5xl font-bold mb-1" },
                "$",
                total.toFixed(0)),
            React.createElement("div", { className: "text-sm opacity-90" }, "Potential Monthly Earnings")),
        React.createElement("div", { className: "space-y-3 mb-6" }, breakdown.map(function (item, idx) { return (React.createElement("div", { key: idx, className: "flex justify-between items-center text-sm" },
            React.createElement("span", { className: "font-medium text-gray-700 dark:text-gray-300" }, item.label),
            React.createElement("span", { className: "font-bold text-[#00D4AA]" },
                "$",
                item.amount.toFixed(0)))); })),
        React.createElement("div", { className: "flex items-center gap-2 text-[#00D4AA] bg-[#00D4AA]/10 px-4 py-3 rounded-lg text-sm" },
            React.createElement("span", null, "\uD83D\uDCA1"),
            React.createElement("span", null, followers < 1000
                ? "Build your following to unlock more revenue streams!"
                : followers < 10000
                    ? "You're an active creator! Keep growing!"
                    : "Top 1% creator tier! 🚀"))));
}
function HomePage() {
    return (React.createElement("main", { className: "relative bg-white dark:bg-black min-h-screen" },
        React.createElement(scroll_progress_1.ScrollProgress, { className: "bg-[#00D4AA]" }),
        React.createElement("section", { className: "relative pt-20 pb-32 px-6 overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 opacity-5" },
                React.createElement("div", { className: "absolute inset-0", style: {
                        backgroundImage: "radial-gradient(circle, #00D4AA 1px, transparent 1px)",
                        backgroundSize: "40px 40px"
                    } })),
            React.createElement("div", { className: "max-w-7xl mx-auto relative z-10" },
                React.createElement("div", { className: "grid lg:grid-cols-2 gap-16 items-center" },
                    React.createElement("div", { className: "space-y-8" },
                        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "inline-flex items-center gap-2 px-3 py-1.5 bg-[#00D4AA]/10 border border-[#00D4AA]/30 rounded-full" },
                            React.createElement(lucide_react_1.Sparkles, { className: "w-4 h-4 text-[#00D4AA]" }),
                            React.createElement("span", { className: "text-sm font-semibold" }, "Now Available")),
                        React.createElement(framer_motion_1.motion.h1, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tight" },
                            React.createElement("span", { className: "text-gray-900 dark:text-white" },
                                "SOCIAL MEDIA",
                                " "),
                            React.createElement("span", { className: "bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent" }, "BUILT FOR YOU"),
                            React.createElement("br", null),
                            React.createElement("span", { className: "bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-400 bg-clip-text text-transparent" }, "NOT AGAINST YOU")),
                        React.createElement(framer_motion_1.motion.p, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.1 }, className: "text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-xl font-medium leading-relaxed" }, "Own your content. Control your data. Earn real rewards. Join the platform that actually respects you."),
                        React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.2 }, className: "flex flex-col sm:flex-row gap-3" },
                            React.createElement(animated_tooltip_1.AnimatedInfoTooltip, { title: "\uD83D\uDCF1 Android App Launch", description: "We're putting the finishing touches on our Android app! Get ready for a seamless mobile experience with all VYRAL features, including content creation, messaging, marketplace, and VCoin wallet integration.", status: "Coming Q1 2026", timeline: "Expected Launch" },
                                React.createElement(link_1["default"], { href: "#", onClick: function (e) { return e.preventDefault(); }, className: "block w-full sm:w-auto" },
                                    React.createElement(shimmer_button_1.ShimmerButton, { background: "linear-gradient(to right, #00D4AA, #06b6d4)", className: "px-6 py-3 text-base font-semibold flex items-center gap-2 w-full justify-center" },
                                        React.createElement("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor" },
                                            React.createElement("path", { d: "M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" })),
                                        "Google Play"))),
                            React.createElement(animated_tooltip_1.AnimatedInfoTooltip, { title: "\uD83C\uDF4E iOS App Launch", description: "The iOS version is in active development! Experience VYRAL's revolutionary social platform on your iPhone and iPad with native performance, push notifications, and seamless iCloud integration.", status: "Coming Q1 2026", timeline: "Expected Launch" },
                                React.createElement(link_1["default"], { href: "#", onClick: function (e) { return e.preventDefault(); }, className: "block w-full sm:w-auto" },
                                    React.createElement(shimmer_button_1.ShimmerButton, { background: "linear-gradient(to right, #06b6d4, #8b5cf6)", className: "px-6 py-3 text-base font-semibold flex items-center gap-2 w-full justify-center" },
                                        React.createElement("svg", { className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor" },
                                            React.createElement("path", { d: "M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" })),
                                        "App Store"))))),
                    React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, transition: { delay: 0.3 }, className: "relative" },
                        React.createElement("div", { className: "relative rounded-[40px] overflow-hidden bg-gradient-to-br from-cyan-100 to-blue-100 dark:from-cyan-900/20 dark:to-blue-900/20 p-8 border-8 border-white dark:border-gray-800 shadow-2xl" },
                            React.createElement("div", { className: "absolute top-4 left-4 bg-white dark:bg-black/50 backdrop-blur-md rounded-full px-4 py-2 flex items-center gap-2 shadow-lg z-10" },
                                React.createElement("div", { className: "w-2 h-2 rounded-full bg-[#00D4AA] animate-pulse" }),
                                React.createElement("span", { className: "text-xs font-bold" }, "EXPLORE ECOSYSTEM")),
                            React.createElement("div", { className: "absolute bottom-4 right-4 bg-[#00D4AA] text-white rounded-2xl px-5 py-3 shadow-lg z-10" },
                                React.createElement("div", { className: "text-2xl font-black" }, "10B"),
                                React.createElement("div", { className: "text-xs" }, "VYC Supply")),
                            React.createElement("div", { className: "relative w-full h-[500px] flex items-center justify-center" },
                                React.createElement(image_1["default"], { src: "/images/feed.jpeg", alt: "VYRAL Platform", width: 280, height: 500, className: "rounded-3xl shadow-2xl object-cover" }))),
                        React.createElement(framer_motion_1.motion.div, { animate: { y: [0, -10, 0], rotate: [0, 5, 0] }, transition: { duration: 3, repeat: Infinity }, className: "absolute -top-6 -right-6 w-24 h-24 rounded-3xl bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-2xl flex items-center justify-center text-4xl" }, "\u2B50"))),
                React.createElement(framer_motion_1.motion.div, { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.4 }, className: "mt-20" },
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                        { value: 10, suffix: "B", label: "Total VYC Supply" },
                        { value: 65, suffix: "K", label: "TPS on Solana" },
                        { value: 80, suffix: "%", label: "Creator Revenue" },
                        { value: 2, suffix: "B", label: "User Rewards Pool" },
                    ].map(function (stat, i) { return (React.createElement("div", { key: i, className: "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-lg p-6 text-center" },
                        React.createElement("div", { className: "text-3xl md:text-4xl font-bold text-[#00D4AA] mb-2" },
                            React.createElement(number_ticker_1.NumberTicker, { value: stat.value }),
                            stat.suffix),
                        React.createElement("div", { className: "text-sm font-medium text-gray-700 dark:text-gray-300" }, stat.label))); }))))),
        React.createElement("section", { className: "relative py-20 px-6 bg-gray-50 dark:bg-gray-900/20" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement("div", { className: "text-center mb-12" },
                    React.createElement("h2", { className: "text-4xl md:text-5xl font-black mb-4" },
                        React.createElement("span", { className: "text-gray-900 dark:text-white" }, "WHY "),
                        React.createElement("span", { className: "bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent" }, "VYRAL?")),
                    React.createElement("p", { className: "text-lg text-gray-600 dark:text-gray-400" }, "Built for creators, powered by community")),
                React.createElement(bento_grid_1.BentoGrid, { className: "md:auto-rows-[20rem]" },
                    React.createElement(bento_grid_1.BentoGridItem, { title: "Social Feed", description: React.createElement("span", { className: "text-sm" }, "Twitter-style threads, rich media posts, and trending discovery. Connect with your community through powerful social features."), header: React.createElement(feature_skeletons_1.SocialFeedSkeleton, null), className: "md:col-span-2", icon: React.createElement(lucide_react_1.Heart, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                    React.createElement(bento_grid_1.BentoGridItem, { title: "Encrypted Chat", description: React.createElement("span", { className: "text-sm" }, "End-to-end encryption for private & group chats. Your conversations stay private."), header: React.createElement(feature_skeletons_1.EncryptedChatSkeleton, null), className: "md:col-span-1", icon: React.createElement(lucide_react_1.MessageCircle, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                    React.createElement(bento_grid_1.BentoGridItem, { title: "Marketplace", description: React.createElement("span", { className: "text-sm" }, "5% platform fees vs 13% on eBay. Instant VCoin settlement for all transactions."), header: React.createElement(feature_skeletons_1.MarketplaceSkeleton, null), className: "md:col-span-1", icon: React.createElement(lucide_react_1.ShoppingBag, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                    React.createElement(bento_grid_1.BentoGridItem, { title: "Communities", description: React.createElement("span", { className: "text-sm" }, "Discord/Reddit-style groups with advanced moderation tools and community governance."), header: React.createElement(feature_skeletons_1.CommunitiesSkeleton, null), className: "md:col-span-1", icon: React.createElement(lucide_react_1.Users, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                    React.createElement(bento_grid_1.BentoGridItem, { title: "Orb AI Assistant", description: React.createElement("span", { className: "text-sm" }, "Privacy-first AI recommendations and content discovery tailored to your interests."), header: React.createElement(feature_skeletons_1.OrbAISkeleton, null), className: "md:col-span-1", icon: React.createElement(lucide_react_1.Bot, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                    React.createElement(bento_grid_1.BentoGridItem, { title: "80% Creator Revenue", description: React.createElement("span", { className: "text-sm" }, "Fair compensation for creators. Keep 80-95% of your earnings, powered by VCoin."), header: React.createElement(feature_skeletons_1.VCoinRewardsSkeleton, null), className: "md:col-span-2", icon: React.createElement(lucide_react_1.Lock, { className: "h-4 w-4 text-[#00D4AA]" }) })))),
        React.createElement("section", { className: "relative py-20 px-6" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement("h2", { className: "text-4xl md:text-5xl font-black mb-12 text-center" },
                    React.createElement("span", { className: "text-gray-900 dark:text-white" }, "THE "),
                    React.createElement("span", { className: "bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent" }, "VYRAL"),
                    React.createElement("span", { className: "text-gray-900 dark:text-white" }, " DIFFERENCE")),
                React.createElement("p", { className: "text-center text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-12" }, "Everything you love about social media, none of the exploitation."),
                React.createElement("div", { className: "grid lg:grid-cols-2 gap-6" },
                    React.createElement(card_spotlight_1.CardSpotlight, { className: "h-auto w-full border-red-500/20 p-6", color: "#ef4444", radius: 300 },
                        React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                            React.createElement("div", { className: "w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-lg" }, "\u274C"),
                            React.createElement("p", { className: "text-lg font-bold relative z-20 text-gray-900 dark:text-white" }, "Traditional Social")),
                        React.createElement("div", { className: "text-gray-600 dark:text-neutral-200 relative z-20" },
                            React.createElement("ul", { className: "list-none space-y-2" },
                                React.createElement(ComparisonItem, { title: "Platform owns content", isNegative: true }),
                                React.createElement(ComparisonItem, { title: "Data sold to advertisers", isNegative: true }),
                                React.createElement(ComparisonItem, { title: "Algorithm controls reach", isNegative: true }),
                                React.createElement(ComparisonItem, { title: "High fees (30-50%)", isNegative: true }),
                                React.createElement(ComparisonItem, { title: "Zero transparency", isNegative: true }),
                                React.createElement(ComparisonItem, { title: "You are the product", isNegative: true })))),
                    React.createElement(card_spotlight_1.CardSpotlight, { className: "h-auto w-full border-[#00D4AA]/30 p-6", color: "#00D4AA", radius: 300 },
                        React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                            React.createElement("div", { className: "w-8 h-8 rounded-xl bg-[#00D4AA]/20 flex items-center justify-center text-lg" }, "\u2713"),
                            React.createElement("h3", { className: "text-lg font-bold relative z-20 bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent" }, "VYRAL Platform")),
                        React.createElement("div", { className: "text-gray-600 dark:text-neutral-200 relative z-20" },
                            React.createElement("ul", { className: "list-none space-y-2" },
                                React.createElement(ComparisonItem, { title: "You own your content" }),
                                React.createElement(ComparisonItem, { title: "Data stays private" }),
                                React.createElement(ComparisonItem, { title: "You control your feed" }),
                                React.createElement(ComparisonItem, { title: "Fair fees (5-20%)" }),
                                React.createElement(ComparisonItem, { title: "100% transparent" }),
                                React.createElement(ComparisonItem, { title: "You are the customer" }))))))),
        React.createElement("section", { className: "relative py-20 px-6 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-pink-50 dark:to-pink-900/10" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement("div", { className: "grid lg:grid-cols-2 gap-8 items-start" },
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-4xl md:text-5xl font-bold mb-4 tracking-tight" },
                                "Meet",
                                " ",
                                React.createElement("span", { className: "bg-gradient-to-r from-[#00D4AA] to-cyan-400 bg-clip-text text-transparent" }, "VCoin")),
                            React.createElement("p", { className: "text-lg text-gray-600 dark:text-gray-400" }, "The currency that powers VYRAL. Earn it creating content. Built on Solana for speed and low fees.")),
                        React.createElement(bento_grid_1.BentoGrid, { className: "md:auto-rows-[14rem]" },
                            React.createElement(bento_grid_1.BentoGridItem, { header: React.createElement(VCoinSupplyHeader, null), title: "Fixed Supply", description: "Mint authority permanently disabled. No inflation, ever.", className: "md:col-span-2", icon: React.createElement(lucide_react_1.Coins, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                            React.createElement(bento_grid_1.BentoGridItem, { header: React.createElement("div", { className: "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-[#00D4AA]/10 to-cyan-400/10 items-center justify-center" },
                                    React.createElement("div", { className: "text-5xl font-bold text-[#00D4AA]" }, "50%")), title: "For Users", description: "Allocated for sales and community rewards distribution", className: "md:col-span-1", icon: React.createElement(lucide_react_1.Users, { className: "h-4 w-4 text-[#00D4AA]" }) }),
                            React.createElement(bento_grid_1.BentoGridItem, { header: React.createElement("div", { className: "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-orange-500/10 to-red-500/10 items-center justify-center" },
                                    React.createElement("div", { className: "text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent" }, "1%")), title: "Burned", description: "Permanent burn from every tip transaction", className: "md:col-span-1", icon: React.createElement(lucide_react_1.Flame, { className: "h-4 w-4 text-orange-500" }) }),
                            React.createElement(bento_grid_1.BentoGridItem, { header: React.createElement("div", { className: "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-emerald-500/10 to-green-500/10 items-center justify-center" },
                                    React.createElement("div", { className: "text-5xl font-bold bg-gradient-to-r from-emerald-500 to-green-500 bg-clip-text text-transparent" }, "$0.01")), title: "Initial Price", description: "Starting value with growth potential", className: "md:col-span-1", icon: React.createElement(lucide_react_1.TrendingUp, { className: "h-4 w-4 text-emerald-500" }) }),
                            React.createElement(bento_grid_1.BentoGridItem, { header: React.createElement("div", { className: "flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 items-center justify-center" },
                                    React.createElement("div", { className: "text-4xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 bg-clip-text text-transparent" }, "65K")), title: "TPS on Solana", description: "Lightning-fast transactions with minimal fees", className: "md:col-span-1", icon: React.createElement(lucide_react_1.Zap, { className: "h-4 w-4 text-cyan-500" }) })),
                        React.createElement("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-3" }, [
                            "Earn rewards for content",
                            "Tip creators (80% to them)",
                            "Buy & sell marketplace",
                            "Withdraw anytime",
                            "Trade on DEXs (soon)",
                            "Real utility value",
                        ].map(function (item, idx) { return (React.createElement("div", { key: idx, className: "flex items-start gap-2 text-sm" },
                            React.createElement("div", { className: "w-4 h-4 rounded-full bg-[#00D4AA]/10 flex items-center justify-center flex-shrink-0 mt-0.5" },
                                React.createElement("span", { className: "text-[#00D4AA] font-bold text-xs" }, "\u2713")),
                            React.createElement("span", { className: "text-gray-700 dark:text-gray-300" }, item))); }))),
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("div", null,
                            React.createElement("h2", { className: "text-4xl md:text-5xl font-bold mb-4 tracking-tight" },
                                "Built for",
                                " ",
                                React.createElement("span", { className: "bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent" }, "Creators")),
                            React.createElement("p", { className: "text-lg text-gray-600 dark:text-gray-400" }, "Stop giving away half your earnings. Monetize on your terms.")),
                        React.createElement(EarningsCalculator, null))),
                React.createElement("div", { className: "mt-12" },
                    React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4" }, [
                        {
                            icon: "💰",
                            title: "Keep 80-95%",
                            description: "Lowest fees in industry",
                            gradient: "from-emerald-500/10 to-green-500/10"
                        },
                        {
                            icon: "📊",
                            title: "Analytics",
                            description: "Detailed insights",
                            gradient: "from-blue-500/10 to-indigo-500/10"
                        },
                        {
                            icon: "💎",
                            title: "Multiple Streams",
                            description: "Tips, subs, marketplace",
                            gradient: "from-cyan-500/10 to-pink-500/10"
                        },
                        {
                            icon: "🚫",
                            title: "No Demonetization",
                            description: "Fair enforcement",
                            gradient: "from-orange-500/10 to-red-500/10"
                        },
                    ].map(function (item, idx) { return (React.createElement("div", { key: idx, className: "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 hover:border-[#00D4AA]/50 transition-colors" },
                        React.createElement("div", { className: "w-12 h-12 rounded-lg bg-gradient-to-br " + item.gradient + " flex items-center justify-center text-2xl mb-3" }, item.icon),
                        React.createElement("h4", { className: "font-bold text-sm mb-1 text-gray-900 dark:text-white" }, item.title),
                        React.createElement("p", { className: "text-xs text-gray-600 dark:text-gray-400" }, item.description))); }))))),
        React.createElement("section", { className: "relative py-20 px-6 overflow-hidden" },
            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4AA]/5 to-transparent" }),
            React.createElement("div", { className: "max-w-7xl mx-auto relative" },
                React.createElement("div", { className: "text-center mb-10" },
                    React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-3 tracking-tight" }, "VCoin Economics"),
                    React.createElement("p", { className: "text-gray-600 dark:text-gray-400 text-base" }, "10 billion tokens with deflationary mechanics")),
                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-4 mb-8" }, [
                    {
                        icon: "⛓️",
                        title: "Solana Blockchain",
                        desc: "65,000 TPS, $0.00025 cost"
                    },
                    {
                        icon: "🔒",
                        title: "Fixed Supply",
                        desc: "10B tokens, mint disabled"
                    },
                    {
                        icon: "🔥",
                        title: "Deflationary",
                        desc: "1% tips burned constantly"
                    },
                    {
                        icon: "⏰",
                        title: "4-Year Vesting",
                        desc: "Team tokens, 6-month cliff"
                    },
                ].map(function (item, i) { return (React.createElement("div", { key: i, className: "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 text-center" },
                    React.createElement("div", { className: "text-3xl mb-2" }, item.icon),
                    React.createElement("h4", { className: "text-sm font-bold mb-1" }, item.title),
                    React.createElement("p", { className: "text-xs text-gray-600 dark:text-gray-400" }, item.desc))); })),
                React.createElement("div", { className: "bg-white dark:bg-black border border-neutral-200 dark:border-neutral-800 rounded-xl p-6" },
                    React.createElement("h3", { className: "text-lg font-bold mb-5 text-center" }, "Token Distribution (10B Total)"),
                    React.createElement("div", { className: "grid md:grid-cols-2 gap-4" }, [
                        {
                            label: "Sales Inventory",
                            percent: 30,
                            amount: "3B",
                            color: "from-[#00D4AA] to-cyan-400"
                        },
                        {
                            label: "Platform Operations",
                            percent: 25,
                            amount: "2.5B",
                            color: "from-cyan-400 to-blue-400"
                        },
                        {
                            label: "User Rewards Pool",
                            percent: 20,
                            amount: "2B",
                            color: "from-blue-400 to-indigo-400"
                        },
                        {
                            label: "Liquidity Reserve",
                            percent: 15,
                            amount: "1.5B",
                            color: "from-indigo-400 to-purple-400"
                        },
                        {
                            label: "Team & Advisors",
                            percent: 7,
                            amount: "700M",
                            color: "from-purple-400 to-pink-400"
                        },
                        {
                            label: "Strategic Reserve",
                            percent: 3,
                            amount: "300M",
                            color: "from-pink-400 to-[#00D4AA]"
                        },
                    ].map(function (item, i) { return (React.createElement("div", { key: i, className: "space-y-2" },
                        React.createElement("div", { className: "flex justify-between items-center" },
                            React.createElement("span", { className: "text-xs font-semibold text-gray-700 dark:text-gray-300" }, item.label),
                            React.createElement("span", { className: "text-xs font-bold text-[#00D4AA]" },
                                item.percent,
                                "% \u2022 ",
                                item.amount)),
                        React.createElement("div", { className: "h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden" },
                            React.createElement("div", { className: "h-full bg-gradient-to-r " + item.color, style: { width: item.percent + "%" } })))); }))))),
        React.createElement("section", { className: "relative py-20 px-6" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement("div", { className: "text-center mb-10" },
                    React.createElement("h2", { className: "text-4xl md:text-5xl font-bold mb-4 tracking-tight" }, "Development Roadmap"),
                    React.createElement("p", { className: "text-gray-600 dark:text-gray-400 text-lg mb-6" }, "Our journey to revolutionize social media"),
                    React.createElement("div", { className: "max-w-3xl mx-auto bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 rounded-xl p-4 text-left" },
                        React.createElement("p", { className: "text-xs text-gray-700 dark:text-gray-300 mb-2" },
                            React.createElement("strong", null, "DISCLAIMER:"),
                            " Roadmap goals as of Oct 2025. Timelines, user numbers, and features are projections subject to change."),
                        React.createElement("ul", { className: "text-[10px] text-gray-600 dark:text-gray-400 space-y-0.5 list-disc list-inside" },
                            React.createElement("li", null, "User growth estimates may vary"),
                            React.createElement("li", null, "Timelines adjustable based on factors"),
                            React.createElement("li", null, "1B+ user target is aspirational"),
                            React.createElement("li", null, "VCoin is utility token, not investment")))),
                React.createElement("div", { className: "relative max-w-6xl mx-auto" },
                    React.createElement("div", { className: "mb-12" },
                        React.createElement("div", { className: "relative" },
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-400/20 rounded-xl blur-xl" }),
                            React.createElement(card_1.Card, { className: "relative bg-white/80 dark:bg-white/[0.08] border border-green-500/40 dark:border-green-500/60 backdrop-blur-xl shadow-lg dark:shadow-none" },
                                React.createElement(card_1.CardContent, { className: "py-6 px-6" },
                                    React.createElement("div", { className: "flex items-center gap-2 mb-4" },
                                        React.createElement("div", { className: "text-2xl" }, "\u2705"),
                                        React.createElement("div", null,
                                            React.createElement(card_1.CardTitle, { className: "text-lg text-green-600 dark:text-green-400" }, "Completed (Oct 2025)"),
                                            React.createElement(card_1.CardDescription, { className: "text-xs" }, "Foundation Built"))),
                                    React.createElement("div", { className: "grid md:grid-cols-2 gap-2" }, [
                                        "Platform architecture designed",
                                        "VCoin smart contracts developed",
                                        "Deployed to Solana devnet",
                                        "Backend infrastructure complete",
                                        "Mobile applications built",
                                        "Core token economics implemented",
                                        "Custodial wallet system ready",
                                        "Terms of Service finalized",
                                    ].map(function (item, i) { return (React.createElement("div", { key: i, className: "flex items-start gap-2 text-xs" },
                                        React.createElement("span", { className: "text-green-500 mt-0.5" }, "\u2713"),
                                        React.createElement("span", { className: "text-gray-700 dark:text-gray-300" }, item))); })))))),
                    React.createElement("div", { className: "space-y-6" },
                        React.createElement("div", { className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4" }, [
                            {
                                phase: "Q4 2025",
                                title: "Final Prep",
                                target: "",
                                items: [
                                    "Security audit",
                                    "Legal compliance",
                                    "Beta testing",
                                    "Payment integration",
                                ]
                            },
                            {
                                phase: "Q1 2026",
                                title: "Launch",
                                target: "10K+",
                                items: [
                                    "Mainnet live",
                                    "VCoin sales",
                                    "Creator onboarding",
                                    "Platform launch",
                                ]
                            },
                            {
                                phase: "Q2 2026",
                                title: "Growth",
                                target: "50K+",
                                items: [
                                    "Earning features",
                                    "Marketplace",
                                    "Partnerships",
                                    "Mobile optimization",
                                ]
                            },
                            {
                                phase: "Q3 2026",
                                title: "DEX",
                                target: "100K+",
                                items: [
                                    "Raydium pool",
                                    "Public trading",
                                    "CMC/CG listing",
                                    "Creator tools",
                                ]
                            },
                        ].map(function (phase, idx) { return (React.createElement("div", { key: idx, className: "relative group" },
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-br from-[#00D4AA]/20 to-transparent rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity" }),
                            React.createElement(card_1.Card, { className: "relative bg-white/80 dark:bg-white/[0.08] border border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full" },
                                React.createElement(card_1.CardContent, { className: "py-4 px-4" },
                                    React.createElement("div", { className: "mb-3" },
                                        React.createElement("div", { className: "text-xs font-bold text-[#00D4AA] mb-1" }, phase.phase),
                                        React.createElement(card_1.CardTitle, { className: "text-sm mb-1" }, phase.title),
                                        phase.target && (React.createElement("div", { className: "text-[10px] text-cyan-600 dark:text-cyan-400 font-semibold" },
                                            "Target: ",
                                            phase.target,
                                            " users"))),
                                    React.createElement("div", { className: "space-y-1.5" }, phase.items.map(function (item, i) { return (React.createElement("div", { key: i, className: "px-2 py-1 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded text-[10px]" }, item)); })))))); })),
                        React.createElement("div", { className: "grid md:grid-cols-3 gap-4" }, [
                            {
                                phase: "Q4 2026",
                                title: "Platform Enhancement",
                                target: "500K+ users",
                                items: [
                                    "Orb AI advanced features",
                                    "Cross-platform integration",
                                    "International expansion",
                                    "Enterprise solutions beta",
                                ]
                            },
                            {
                                phase: "Q1-Q2 2027",
                                title: "Scale & Innovation",
                                target: "5-10M users",
                                items: [
                                    "Multi-language support",
                                    "Advanced marketplace",
                                    "DeFi integrations",
                                    "Metaverse integration",
                                ]
                            },
                            {
                                phase: "Q2-Q4 2027",
                                title: "Global Expansion",
                                target: "50-100M users",
                                items: [
                                    "Multi-chain support",
                                    "Advanced AI capabilities",
                                    "Enterprise launch",
                                    "Web3 ecosystem integration",
                                ]
                            },
                        ].map(function (phase, idx) { return (React.createElement("div", { key: idx, className: "relative group z-10" },
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-[#00D4AA]/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" }),
                            React.createElement(card_1.Card, { className: "relative bg-white/70 dark:bg-white/5 border-2 border-[#00D4AA]/30 dark:border-[#00D4AA]/50 backdrop-blur-xl hover:border-[#00D4AA]/60 transition-all shadow-lg dark:shadow-none h-full" },
                                React.createElement(card_1.CardContent, { className: "py-6" },
                                    React.createElement("div", { className: "mb-4" },
                                        React.createElement("div", { className: "text-sm font-bold text-[#00D4AA] mb-1" }, phase.phase),
                                        React.createElement(card_1.CardTitle, { className: "text-base mb-2" }, phase.title),
                                        phase.target && (React.createElement("div", { className: "text-xs text-cyan-600 dark:text-cyan-400 font-semibold" },
                                            "Target: ",
                                            phase.target))),
                                    React.createElement("div", { className: "space-y-2" }, phase.items.map(function (item, i) { return (React.createElement("div", { key: i, className: "px-3 py-1.5 bg-gradient-to-r from-[#00D4AA]/5 to-transparent border border-[#00D4AA]/20 rounded-lg text-xs" }, item)); })))))); })),
                        React.createElement("div", { className: "grid md:grid-cols-3 gap-8 relative" }, [
                            {
                                phase: "2028-2029",
                                title: "Mass Adoption",
                                target: "500M users",
                                items: [
                                    "Full platform decentralization",
                                    "Cross-platform interoperability",
                                    "Advanced metaverse presence",
                                    "Quantum-ready security prep",
                                ]
                            },
                            {
                                phase: "Beyond 2029",
                                title: "Vision Realized",
                                target: "1B+ users (aspirational)",
                                items: [
                                    "Leading Web3 social platform",
                                    "Full metaverse integration",
                                    "Quantum-resistant infrastructure",
                                    "Neural interface compatibility",
                                ]
                            },
                            {
                                phase: "Future",
                                title: "Innovation Areas",
                                items: [
                                    "Autonomous AI agents",
                                    "Cross-reality experiences",
                                    "Universal digital identity",
                                    "Global digital economy leader",
                                ]
                            },
                        ].map(function (phase, idx) { return (React.createElement("div", { key: idx, className: "relative group z-10" },
                            React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" }),
                            React.createElement(card_1.Card, { className: "relative bg-white/70 dark:bg-white/5 border-2 border-purple-400/30 dark:border-purple-400/50 backdrop-blur-xl hover:border-purple-400/60 transition-all shadow-lg dark:shadow-none h-full" },
                                React.createElement(card_1.CardContent, { className: "py-6" },
                                    React.createElement("div", { className: "mb-4" },
                                        React.createElement("div", { className: "text-sm font-bold text-purple-600 dark:text-purple-400 mb-1" }, phase.phase),
                                        React.createElement(card_1.CardTitle, { className: "text-base mb-2" }, phase.title),
                                        phase.target && (React.createElement("div", { className: "text-xs text-purple-600 dark:text-purple-400 font-semibold" },
                                            "Target: ",
                                            phase.target))),
                                    React.createElement("div", { className: "space-y-2" }, phase.items.map(function (item, i) { return (React.createElement("div", { key: i, className: "px-3 py-1.5 bg-gradient-to-r from-purple-400/5 to-transparent border border-purple-400/20 rounded-lg text-xs" }, item)); })))))); }))),
                    React.createElement("div", { className: "mt-8" },
                        React.createElement(card_1.Card, { className: "bg-gradient-to-br from-[#00D4AA]/10 to-cyan-400/10 dark:from-[#00D4AA]/15 dark:to-cyan-400/15 border border-[#00D4AA]/40 backdrop-blur-xl shadow-lg dark:shadow-none" },
                            React.createElement(card_1.CardContent, { className: "py-6 px-6" },
                                React.createElement(card_1.CardTitle, { className: "text-xl mb-5 text-center font-bold" }, "Development Principles"),
                                React.createElement("div", { className: "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4" }, [
                                    {
                                        icon: "👥",
                                        title: "UX First",
                                        desc: "Simple onboarding"
                                    },
                                    {
                                        icon: "💰",
                                        title: "Revenue-Funded",
                                        desc: "20% to liquidity"
                                    },
                                    {
                                        icon: "🎯",
                                        title: "Utility Focus",
                                        desc: "Real use cases"
                                    },
                                    {
                                        icon: "🗣️",
                                        title: "Community",
                                        desc: "Feedback matters"
                                    },
                                    { icon: "🔒", title: "Security", desc: "Regular audits" },
                                    {
                                        icon: "⚖️",
                                        title: "Compliant",
                                        desc: "Legal framework"
                                    },
                                ].map(function (principle, i) { return (React.createElement("div", { key: i, className: "text-center" },
                                    React.createElement("div", { className: "text-2xl mb-1.5" }, principle.icon),
                                    React.createElement("h4", { className: "font-bold text-xs mb-1" }, principle.title),
                                    React.createElement("p", { className: "text-[10px] text-gray-600 dark:text-gray-400" }, principle.desc))); })))))))),
        React.createElement("section", { className: "relative py-20 px-6" },
            React.createElement("div", { className: "max-w-4xl mx-auto" },
                React.createElement("div", { className: "relative" },
                    React.createElement("div", { className: "absolute inset-0 bg-gradient-to-r from-[#00D4AA] to-cyan-500 rounded-2xl blur-2xl opacity-40" }),
                    React.createElement("div", { className: "relative bg-gradient-to-br from-[#00D4AA]/20 to-cyan-500/20 border border-[#00D4AA]/40 dark:border-[#00D4AA]/50 backdrop-blur-xl rounded-2xl p-10 text-center shadow-lg dark:shadow-none" },
                        React.createElement("h2", { className: "text-3xl md:text-4xl font-bold mb-4 tracking-tight" }, "Ready to Join the Revolution?"),
                        React.createElement("p", { className: "text-base md:text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto" }, "Start earning VYC tokens, connect with creators, and be part of the future of social media"),
                        React.createElement("div", { className: "flex flex-col sm:flex-row gap-3 justify-center" },
                            React.createElement(link_1["default"], { href: "/docs" },
                                React.createElement(shimmer_button_1.ShimmerButton, { background: "linear-gradient(to right, #00D4AA, #06b6d4)", className: "px-8 py-3 text-base font-semibold" }, "Get Started Now")),
                            React.createElement(link_1["default"], { href: "/docs/whitepaper", className: "px-8 py-3 rounded-full bg-white/70 dark:bg-white/10 border border-gray-300 dark:border-white/20 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-white/20 transition-all font-semibold shadow-lg dark:shadow-none" }, "View Documentation")))))),
        React.createElement("footer", { className: "relative py-16 px-6 bg-[#00D4AA]" },
            React.createElement("div", { className: "max-w-7xl mx-auto" },
                React.createElement("div", { className: "grid md:grid-cols-4 gap-12 mb-12" },
                    React.createElement("div", null,
                        React.createElement("h3", { className: "text-3xl font-black text-white mb-4" }, "VYRAL"),
                        React.createElement("p", { className: "text-white/80 text-sm leading-relaxed" }, "Decentralized social platform built on Solana. Empowering creators, rewarding communities.")),
                    React.createElement("div", null,
                        React.createElement("h4", { className: "font-black text-white mb-4" }, "Platform"),
                        React.createElement("ul", { className: "space-y-2" },
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Documentation")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/whitepaper", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Whitepaper")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/tutorial", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Get Started")))),
                    React.createElement("div", null,
                        React.createElement("h4", { className: "font-black text-white mb-4" }, "Resources"),
                        React.createElement("ul", { className: "space-y-2" },
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/whitepaper/roadmap", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Roadmap")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/whitepaper/token-economics", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Tokenomics")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/compliance", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Compliance")))),
                    React.createElement("div", null,
                        React.createElement("h4", { className: "font-black text-white mb-4" }, "Legal"),
                        React.createElement("ul", { className: "space-y-2" },
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/compliance/privacy", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Privacy Policy")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/compliance/terms", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Terms of Service")),
                            React.createElement("li", null,
                                React.createElement(link_1["default"], { href: "/docs/compliance/risk-disclosure", className: "text-white/80 hover:text-white text-sm transition-colors" }, "Risk Disclosure"))))),
                React.createElement("div", { className: "pt-8 border-t border-white/20 flex justify-between items-center" },
                    React.createElement("p", { className: "text-white/60 text-sm" }, "\u00A9 2025 VYRAL. All rights reserved. Built on Solana."),
                    React.createElement("div", { className: "flex gap-4" }, ["Twitter", "Discord", "Telegram"].map(function (social) { return (React.createElement(link_1["default"], { key: social, href: "#", className: "w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-xs font-bold transition-colors" }, social[0])); })))))));
}
exports["default"] = HomePage;
