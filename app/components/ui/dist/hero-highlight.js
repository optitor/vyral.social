"use client";
"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.Highlight = exports.HeroHighlight = void 0;
var utils_1 = require("@/lib/utils");
var framer_motion_1 = require("framer-motion");
var react_1 = require("react");
exports.HeroHighlight = function (_a) {
    var children = _a.children, className = _a.className, containerClassName = _a.containerClassName;
    var mouseX = framer_motion_1.useMotionValue(0);
    var mouseY = framer_motion_1.useMotionValue(0);
    // SVG patterns for different states and themes
    var dotPatterns = {
        light: {
            "default": "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23d4d4d4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E\")",
            hover: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%236366f1' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E\")"
        },
        dark: {
            "default": "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%23404040' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E\")",
            hover: "url(\"data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='16' height='16' fill='none'%3E%3Ccircle fill='%238183f4' id='pattern-circle' cx='10' cy='10' r='2.5'%3E%3C/circle%3E%3C/svg%3E\")"
        }
    };
    function handleMouseMove(_a) {
        var currentTarget = _a.currentTarget, clientX = _a.clientX, clientY = _a.clientY;
        if (!currentTarget)
            return;
        var _b = currentTarget.getBoundingClientRect(), left = _b.left, top = _b.top;
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }
    return (react_1["default"].createElement("div", { className: utils_1.cn("group relative flex w-full items-center justify-center bg-white dark:bg-black", containerClassName), onMouseMove: handleMouseMove },
        react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-0 dark:hidden", style: {
                backgroundImage: dotPatterns.light["default"]
            } }),
        react_1["default"].createElement("div", { className: "pointer-events-none absolute inset-0 hidden dark:block", style: {
                backgroundImage: dotPatterns.dark["default"]
            } }),
        react_1["default"].createElement(framer_motion_1.motion.div, { className: "pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 dark:hidden", style: {
                backgroundImage: dotPatterns.light.hover,
                WebkitMaskImage: framer_motion_1.useMotionTemplate(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "], ["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "])), mouseX, mouseY),
                maskImage: framer_motion_1.useMotionTemplate(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "], ["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "])), mouseX, mouseY)
            } }),
        react_1["default"].createElement(framer_motion_1.motion.div, { className: "pointer-events-none absolute inset-0 hidden opacity-0 transition duration-300 group-hover:opacity-100 dark:block", style: {
                backgroundImage: dotPatterns.dark.hover,
                WebkitMaskImage: framer_motion_1.useMotionTemplate(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "], ["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "])), mouseX, mouseY),
                maskImage: framer_motion_1.useMotionTemplate(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "], ["\n            radial-gradient(\n              200px circle at ", "px ", "px,\n              black 0%,\n              transparent 100%\n            )\n          "])), mouseX, mouseY)
            } }),
        react_1["default"].createElement("div", { className: utils_1.cn("relative z-20", className) }, children)));
};
exports.Highlight = function (_a) {
    var children = _a.children, className = _a.className;
    return (react_1["default"].createElement(framer_motion_1.motion.span, { initial: {
            backgroundSize: "0% 100%"
        }, animate: {
            backgroundSize: "100% 100%"
        }, transition: {
            duration: 2,
            ease: "linear",
            delay: 0.5
        }, style: {
            backgroundRepeat: "no-repeat",
            backgroundPosition: "left center",
            display: "inline"
        }, className: utils_1.cn("relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 to-purple-300 px-1 pb-1 dark:from-indigo-500 dark:to-cyan-500", className) }, children));
};
var templateObject_1, templateObject_2, templateObject_3, templateObject_4;
