import { DataCell } from "@antv/s2";
import React from "react";
import paletteLegendMap from "./paletteLegendMap";

// 自定义单元格
class CustomDataCell extends DataCell {
  protected initCell(): void {
    this.drawInteractiveBgShape();
    this.drawCircle();
    this.drawBorderShape();
    if (JSON.stringify(this.meta.colQuery).includes("合计")) {
      this.drawTextShape();
    }
    this.update();
  }

  drawCircle() {
    const radius = 12;
    const { x, y, height, width, fieldValue, colQuery } = this.meta;
    const posX = x + width / 2;
    const posY = y + height / 2;

    let fill;
    let opacity = 1;
    if (!isNaN(fieldValue as any)) {
      fill =
        paletteLegendMap.find((v) => v.text === (colQuery as any)["时刻"])
          ?.color ?? "#FAD5BB";
      opacity = 0.5;
    } else {
      fill =
        paletteLegendMap.find((v) => v.text === fieldValue)?.color ?? "#FAD5BB";
    }

    this.backgroundShape = this.addShape("circle", {
      attrs: {
        x: posX,
        y: posY,
        width,
        height,
        fill,
        opacity,
        r: radius,
      },
    });
  }
}

export default CustomDataCell;
