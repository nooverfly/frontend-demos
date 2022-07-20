/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// @ts-nocheck
/* global BMap */

import { util as zrUtil, graphic, matrix } from "echarts";
import mapboxgl from "mapbox-gl";

const getCoordinateSysByMap = (map: any) => {
  function MapboxCoordSys(tmap, api) {
    this._tmap = tmap;
    this.dimensions = ["lng", "lat"];
    this._mapOffset = [0, 0];

    this._api = api;

    this._project = tmap.project.bind(tmap);
    this._unproject = tmap.unproject.bind(tmap);
  }

  MapboxCoordSys.prototype.dimensions = ["lng", "lat"];

  MapboxCoordSys.prototype.setZoom = function (zoom) {
    this._zoom = zoom;
  };

  MapboxCoordSys.prototype.setCenter = function (center) {
    this._center = this._project(new mapboxgl.LngLat(center[0], center[1]));
  };

  MapboxCoordSys.prototype.setMapOffset = function (mapOffset) {
    this._mapOffset = mapOffset;
  };

  MapboxCoordSys.prototype.getTMap = function () {
    return this._tmap;
  };

  MapboxCoordSys.prototype.dataToPoint = function (data) {
    debugger;
    const px = this._project(data);
    const mapOffset = this._mapOffset;
    return [px.x - mapOffset[0], px.y - mapOffset[1]];
  };

  MapboxCoordSys.prototype.pointToData = function (pt) {
    debugger;
    const mapOffset = this._mapOffset;
    pt = this._unproject({
      x: pt[0] + mapOffset[0],
      y: pt[1] + mapOffset[1],
    });
    return [pt.lng, pt.lat];
  };

  MapboxCoordSys.prototype.getViewRect = function () {
    debugger;
    const api = this._api;
    return new graphic.BoundingRect(0, 0, api.getWidth(), api.getHeight());
  };

  MapboxCoordSys.prototype.getRoamTransform = function () {
    return matrix.create();
  };

  MapboxCoordSys.prototype.prepareCustoms = function () {
    const rect = this.getViewRect();
    return {
      coordSys: {
        // The name exposed to user is always 'cartesian2d' but not 'grid'.
        type: "tmap",
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
      },
      api: {
        coord: zrUtil.bind(this.dataToPoint, this),
        size: zrUtil.bind(dataToCoordSize, this),
      },
    };
  };

  function dataToCoordSize(dataSize, dataItem) {
    dataItem = dataItem || [0, 0];
    return zrUtil.map(
      [0, 1],
      function (dimIdx) {
        const val = dataItem[dimIdx];
        const halfSize = dataSize[dimIdx] / 2;
        const p1 = [];
        const p2 = [];
        p1[dimIdx] = val - halfSize;
        p2[dimIdx] = val + halfSize;
        p1[1 - dimIdx] = p2[1 - dimIdx] = dataItem[1 - dimIdx];
        return Math.abs(
          this.dataToPoint(p1)[dimIdx] - this.dataToPoint(p2)[dimIdx]
        );
      },
      this
    );
  }

  let Overlay;

  // For deciding which dimensions to use when creating list data
  MapboxCoordSys.dimensions = MapboxCoordSys.prototype.dimensions;

  // function createOverlayCtor() {
  //   function Overlay(root) {
  //     this._root = root;
  //   }

  //   Overlay.prototype = new BMap.Overlay();
  //   /**
  //    * 初始化
  //    *
  //    * @param {BMap.Map} map
  //    * @override
  //    */
  //   Overlay.prototype.initialize = function (map) {
  //     map.getPanes().labelPane.appendChild(this._root);
  //     return this._root;
  //   };
  //   /**
  //    * @override
  //    */
  //   Overlay.prototype.draw = function () {};

  //   return Overlay;
  // }

  MapboxCoordSys.create = function (ecModel, api) {
    /* let MapboxCoordSys;
        const root = api.getDom();
      
        // TODO Dispose
        ecModel.eachComponent("bmap", function (bmapModel) {
          const painter = api.getZr().painter;
          const viewportRoot = painter.getViewportRoot();
          if (typeof BMap === "undefined") {
            throw new Error("BMap api is not loaded");
          }
          Overlay = Overlay || createOverlayCtor();
          if (MapboxCoordSys) {
            throw new Error("Only one bmap component can exist");
          }
          let bmap;
          if (!bmapModel.__bmap) {
            // Not support IE8
            let bmapRoot = root.querySelector(".ec-extension-bmap");
            if (bmapRoot) {
              // Reset viewport left and top, which will be changed
              // in moving handler in BMapView
              viewportRoot.style.left = "0px";
              viewportRoot.style.top = "0px";
              root.removeChild(bmapRoot);
            }
            bmapRoot = document.createElement("div");
            bmapRoot.className = "ec-extension-bmap";
            // fix #13424
            bmapRoot.style.cssText = "position:absolute;width:100%;height:100%";
            root.appendChild(bmapRoot);
      
            // initializes bmap
            let mapOptions = bmapModel.get("mapOptions");
            if (mapOptions) {
              mapOptions = zrUtil.clone(mapOptions);
              // Not support `mapType`, use `bmap.setMapType(MapType)` instead.
              delete mapOptions.mapType;
            }
      
            bmap = bmapModel.__bmap = new BMap.Map(bmapRoot, mapOptions);
      
            const overlay = new Overlay(viewportRoot);
            bmap.addOverlay(overlay);
      
            // Override
            painter.getViewportRootOffset = function () {
              return { offsetLeft: 0, offsetTop: 0 };
            };
          }
          bmap = bmapModel.__bmap;
      
          // Set bmap options
          // centerAndZoom before layout and render
          const center = bmapModel.get("center");
          const zoom = bmapModel.get("zoom");
          if (center && zoom) {
            const bmapCenter = bmap.getCenter();
            const bmapZoom = bmap.getZoom();
            const centerOrZoomChanged = bmapModel.centerOrZoomChanged(
              [bmapCenter.lng, bmapCenter.lat],
              bmapZoom
            );
            if (centerOrZoomChanged) {
              const pt = new BMap.Point(center[0], center[1]);
              bmap.centerAndZoom(pt, zoom);
            }
          }
      
          MapboxCoordSys = new MapboxCoordSys(bmap, api);
          MapboxCoordSys.setMapOffset(bmapModel.__mapOffset || [0, 0]);
          MapboxCoordSys.setZoom(zoom);
          MapboxCoordSys.setCenter(center);
      
          bmapModel.coordinateSystem = MapboxCoordSys;
        });
      
        ecModel.eachSeries(function (seriesModel) {
          if (seriesModel.get("coordinateSystem") === "bmap") {
            seriesModel.coordinateSystem = MapboxCoordSys;
          }
        }); */
    ecModel.eachSeries(function (seriesModel) {
      if (seriesModel.get("coordinateSystem") === "tmap") {
        const coordSys = new MapboxCoordSys(map, api);
        coordSys.setMapOffset([0, 0]);
        debugger;
        coordSys.setZoom(map.getZoom());
        const c = map.getCenter();
        coordSys.setCenter([c.lng, c.lat]);
        seriesModel.coordinateSystem = coordSys;
      }
    });
  };

  return MapboxCoordSys;
};

export default getCoordinateSysByMap;
