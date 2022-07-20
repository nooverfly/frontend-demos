import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import {
  Logo,
  QueryByBoundsParameters,
  QueryService,
} from "@supermap/iclient-mapboxgl";

const App = () => {
  const nodeRef = useRef(null);

  useEffect(() => {
    if (nodeRef.current) {
      const host = "https://iserver.supermap.io";

      var map = new mapboxgl.Map({
        container: nodeRef.current,
        style: {
          version: 8,
          sources: {
            "vector-tiles": {
              type: "vector",
              tiles: [
                host +
                  "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature.mvt?returnAttributes=true&compressTolerance=-1&width=512&height=512&viewBounds={bbox-epsg-3857}&expands=0:0_2,132_128,138_64,141_32,143_16,145_8,147_4",
              ],
            },
          },
          sprite: "https://iclient.supermap.io/web/styles/street/sprite",
          glyphs:
            host +
            "/iserver/services/map-beijing/rest/maps/beijingMap/tileFeature/sdffonts/{fontstack}/{range}.pbf",
          layers: [],
        },
        center: [116.4, 39.9],
        minZoom: 10,
        zoom: 11,
      });
      map.addControl(new Logo(), "bottom-right");
      map.addControl(new mapboxgl.NavigationControl(), "top-left");

      map.on("load", function () {
        map.addLayer({
          id: "background",
          type: "background",
          layout: {},
          paint: {
            "background-color": "#75CFF0",
          },
        });
        map.addLayer({
          id: "面区界R@北京",
          type: "fill",
          source: "vector-tiles",
          "source-layer": "面区界R@北京",
          paint: {
            "fill-color": "#EFE9E1",
          },
        });
        map.addLayer({
          id: "界线@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "界线@北京",
          paint: {
            "line-color": "hsl(240, 8%, 51%)",
            "line-width": 0.5,
          },
        });
        map.addLayer({
          id: "立交桥绿地R@北京",
          type: "fill",
          source: "vector-tiles",
          "source-layer": "立交桥绿地R@北京",
          paint: {
            "fill-color": "hsl(100, 58%, 76%)",
            "fill-opacity": {
              base: 1,
              stops: [
                [5, 0],
                [6, 0.5],
              ],
            },
          },
        });
        map.addLayer({
          id: "绿地R@北京",
          type: "fill",
          source: "vector-tiles",
          "source-layer": "绿地R@北京",
          paint: {
            "fill-color": "hsl(100, 58%, 76%)",
            "fill-opacity": {
              base: 1,
              stops: [
                [5, 0],
                [6, 0.5],
              ],
            },
          },
        });
        map.addLayer({
          id: "	双线河R@北京",
          type: "fill",
          source: "vector-tiles",
          "source-layer": "双线河R@北京",
          paint: {
            "fill-color": "hsl(196, 80%, 70%)",
          },
        });
        map.addLayer({
          id: "湖泊、水库R@北京",
          type: "fill",
          source: "vector-tiles",
          "source-layer": "湖泊、水库R@北京",
          paint: {
            "fill-color": "hsl(196, 80%, 70%)",
          },
        });

        map.addLayer({
          id: "	四级道路L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "四级道路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 1],
                [18, 10],
              ],
            },
            "line-color": "hsl(0, 0%, 100%)",
          },
        });
        map.addLayer({
          id: "	三级道路L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "三级道路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 1],
                [18, 10],
              ],
            },
            "line-color": "hsl(0, 0%, 100%)",
          },
        });
        map.addLayer({
          id: "	二级道路L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "二级道路L@北京",
          paint: {
            "line-width": 4,
            "line-color": "hsl(230, 24%, 87%)",
          },
        });
        map.addLayer({
          id: "	二级道路L@北京1",
          type: "line",
          source: "vector-tiles",
          "source-layer": "二级道路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 2],
                [18, 18],
              ],
            },
            "line-color": "hsl(0, 0%, 100%)",
          },
        });
        map.addLayer({
          id: "一级道路L@北京1",
          type: "line",
          source: "vector-tiles",
          "source-layer": "一级道路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 6],
                [18, 26],
              ],
            },
            "line-color": "hsl(230, 24%, 87%)",
            "line-opacity": {
              base: 1,
              stops: [
                [10.99, 0],
                [11, 1],
              ],
            },
          },
        });
        map.addLayer({
          id: "一级道路L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "一级道路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 4],
                [18, 20],
              ],
            },
            "line-color": "hsl(0, 0%, 100%)",
            "line-opacity": {
              base: 1,
              stops: [
                [10.99, 0],
                [11, 1],
              ],
            },
          },
        });
        map.addLayer({
          id: "	省道L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "省道L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [10, 6],
                [18, 36],
              ],
            },
            "line-color": "hsl(26, 87%, 62%)",
          },
        });
        map.addLayer({
          id: "	省道L@北京1",
          type: "line",
          source: "vector-tiles",
          "source-layer": "省道L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [10, 4],
                [18, 32],
              ],
            },
            "line-color": "hsl(35, 32%, 91%)",
          },
        });
        map.addLayer({
          id: "	高速公路L@北京",
          type: "line",
          source: "vector-tiles",
          "source-layer": "高速公路L@北京",
          paint: {
            "line-width": {
              base: 1.5,
              stops: [
                [11, 6],
                [18, 32],
              ],
            },
            "line-color": "hsl(26, 87%, 62%)",
          },
        });

        map.addLayer({
          id: "区政府驻地@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "区政府驻地@北京",
          layout: {
            "text-offset": [-1.5, -0.5],
            "text-anchor": "bottom-left",
            "text-field": "{NAME}",
            "text-max-width": 7,
            "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Regular"],
            "text-size": 22,
          },
          paint: {
            "text-color": "hsl(230, 8%, 62%)",
            "text-opacity": {
              base: 1,
              stops: [
                [11.99, 1],
                [12, 0],
              ],
            },
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "标志建筑@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "标志建筑@北京",
          layout: {
            "text-offset": [-1.5, -0.5],
            "text-anchor": "bottom-left",
            "text-field": "{NAME}",
            "text-max-width": 7,
            "text-size": 14,
          },
          paint: {
            "text-color": "hsl(26, 25%, 32%)",
            "text-opacity": {
              base: 1,
              stops: [
                [10.99, 0],
                [11, 1],
              ],
            },
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "	一级道路Name",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "一级道路L@北京",
          layout: {
            "text-line-height": 1.1,
            "text-size": {
              base: 1.5,
              stops: [
                [13.99, 12],
                [20, 24],
              ],
            },
            "text-font": ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
            "symbol-placement": "line",
            "text-field": "{道路名称}",
            "text-letter-spacing": 0.1,
            "text-max-width": 5,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1.25,
            "text-opacity": {
              base: 1,
              stops: [
                [13.99, 0],
                [14, 1],
              ],
            },
          },
        });
        map.addLayer({
          id: "	省道Name",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "省道L@北京",
          layout: {
            "text-line-height": 1.1,
            "text-size": {
              base: 1.5,
              stops: [
                [11, 10],
                [18, 24],
              ],
            },
            "text-font": ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
            "symbol-placement": "line",
            "text-field": "{道路名称}",
            "text-letter-spacing": 0.1,
            "text-max-width": 5,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1.25,
            "text-opacity": {
              base: 1,
              stops: [
                [10.99, 0],
                [11, 1],
              ],
            },
          },
        });

        map.addLayer({
          id: "立交桥名称P@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "立交桥名称P@北京",
          layout: {
            "text-offset": [-1, -1],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 14,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "长途汽车站@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "长途汽车站@北京",
          layout: {
            "icon-image": "bus-11",
            "text-offset": [-1, -1],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "图书馆@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "图书馆@北京",
          layout: {
            "icon-image": "library-11",
            "text-offset": [-1, -1],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "公园@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "公园@北京",
          layout: {
            "icon-image": "park-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "综合性广场@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "综合性广场@北京",
          layout: {
            "icon-image": "campsite-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "旅游景点@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "旅游景点@北京",
          layout: {
            "icon-image": "volcano-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "医疗卫生@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "医疗卫生@北京",
          layout: {
            "icon-image": "hospital-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "娱乐场所@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "娱乐场所@北京",
          layout: {
            "icon-image": "amusement-park-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "大厦@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "大厦@北京",
          layout: {
            "icon-image": "picnic-site-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "文化场所@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "文化场所@北京",
          layout: {
            "icon-image": "art-gallery-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "运动场所@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "运动场所@北京",
          layout: {
            "icon-image": "bicycle-share-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "交通运输@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "交通运输@北京",
          layout: {
            "icon-image": "bakery-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "其它@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "其它@北京",
          layout: {
            "icon-image": "toilet-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          filter: ["==", "NAME", "公厕"],
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "服务行业@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "服务行业@北京",
          layout: {
            "icon-image": "embassy-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "其它@北京2",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "其它@北京",
          layout: {
            "icon-image": "car-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          filter: ["==", "NAME", "停车场"],
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "邮政电信@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "邮政电信@北京",
          layout: {
            "icon-image": "post-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 10,
            "text-max-width": 18,
          },

          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "商场@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "商场@北京",
          layout: {
            "icon-image": "grocery-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "综合性商店@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "综合性商店@北京",
          layout: {
            "icon-image": "grocery-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "饭店@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "饭店@北京",
          layout: {
            "icon-image": "restaurant-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "加油站@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "加油站@北京",
          layout: {
            "icon-image": "fuel-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "建筑@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "建筑@北京",
          layout: {
            "icon-image": "place-of-worship-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "码头@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "码头@北京",
          layout: {
            "icon-image": "harbor-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "机场@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "机场@北京",
          layout: {
            "icon-image": "airport-11",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "火车站@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "火车站@北京",
          layout: {
            "icon-image": "rail-15",
            "text-offset": [0, -0.5],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
        map.addLayer({
          id: "地名@北京",
          type: "symbol",
          source: "vector-tiles",
          "source-layer": "地名@北京",
          layout: {
            "icon-image": "dot-11",
            "text-offset": [0, -0.3],
            "text-anchor": "bottom",
            "text-field": "{NAME}",
            "text-size": 12,
          },
          paint: {
            "text-color": "hsl(0, 0%, 0%)",
            "text-opacity": 1,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-halo-blur": 1,
          },
        });
      });

      const query = () => {
        map.addLayer({
          id: "polygonLayer",
          type: "fill",
          source: {
            type: "geojson",
            data: {
              type: "Feature",
              geometry: {
                type: "Polygon",
                coordinates: [
                  [
                    [0, 0],
                    [60, 0],
                    [60, 39],
                    [0, 39],
                    [0, 0],
                  ],
                ],
              },
            },
          },
          paint: {
            "fill-outline-color": "blue",
            "fill-color": "rgba(0, 0, 255, 0.1)",
          },
        });

        debugger;
        var param = new QueryByBoundsParameters({
          queryParams: { name: "Capitals@World.1" },
          bounds: new mapboxgl.LngLatBounds([0, 0], [60, 39]),
        });

        const url =
          "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
        new QueryService(url).queryByBounds(param, function (serviceResult) {
          var recordsets =
            serviceResult &&
            serviceResult.result &&
            serviceResult.result.recordsets;
          var features = recordsets && recordsets[0] && recordsets[0].features;
          map.addLayer({
            id: "points",
            type: "circle",
            paint: {
              "circle-radius": 6,
              "circle-color": "#007cbf",
              "circle-opacity": 0.1,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#007cbf",
              "circle-stroke-opacity": 0.5,
            },
            source: {
              type: "geojson",
              data: features,
            },
          });
        });
      };
      map.on("load", function () {
        query();
      });
    }
  }, []);

  return (
    <div
      ref={nodeRef}
      style={{
        width: 800,
        height: 600,
      }}
    ></div>
  );
};

export default App;
