"use client";
"use strict";

exports.__esModule = true;
exports.Timeline = void 0;

var framer_motion_1 = require("framer-motion");

var react_1 = require("react");

exports.Timeline = function (_a) {
  var data = _a.data;
  var ref = react_1.useRef(null);
  var containerRef = react_1.useRef(null);

  var _b = react_1.useState(0),
      height = _b[0],
      setHeight = _b[1];

  react_1.useEffect(function () {
    if (ref.current) {
      var rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);
  var scrollYProgress = framer_motion_1.useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"]
  }).scrollYProgress;
  var heightTransform = framer_motion_1.useTransform(scrollYProgress, [0, 1], [0, height]);
  var opacityTransform = framer_motion_1.useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  return react_1["default"].createElement("div", {
    className: "w-full bg-white dark:bg-neutral-950 font-sans md:px-10",
    ref: containerRef
  }, react_1["default"].createElement("div", {
    ref: ref,
    className: "relative max-w-7xl mx-auto pb-20"
  }, data.map(function (item, index) {
    return react_1["default"].createElement("div", {
      key: index,
      className: "flex justify-start pt-10 md:pt-40 md:gap-10"
    }, react_1["default"].createElement("div", {
      className: "sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full"
    }, react_1["default"].createElement("div", {
      className: "h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center"
    }, react_1["default"].createElement("div", {
      className: "h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2"
    })), react_1["default"].createElement("h3", {
      className: "hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 "
    }, item.title)), react_1["default"].createElement("div", {
      className: "relative pl-20 pr-4 md:pl-4 w-full"
    }, react_1["default"].createElement("h3", {
      className: "md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500"
    }, item.title), item.content, " "));
  }), react_1["default"].createElement("div", {
    style: {
      height: height + "px"
    },
    className: "absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
  }, react_1["default"].createElement(framer_motion_1.motion.div, {
    style: {
      height: heightTransform,
      opacity: opacityTransform
    },
    className: "absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-cyan-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
  }))));
};