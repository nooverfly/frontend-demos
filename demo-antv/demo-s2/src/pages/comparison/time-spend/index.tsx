import { SheetComponent } from "@antv/s2-react";
import React, { useEffect } from "react";
import CustomDataCell from "./CustomDataCell";
import CustomFrame from "./CustomFrame";
import s2DataConfig from "./data.json";
import paletteLegendMap from "./paletteLegendMap";

const s2Palette = {
  basicColors: [
    "#FFFFFF",
    "#020138",
    "rgba(255,255,255,0.18)",
    "#020138",
    "rgba(255,255,255,0.18)",
    "#7232CF",
    "#7232CF",
    "#AB76F7",
    "#020138",
    "rgba(255,255,255,0)",
    "rgba(255,255,255,0)",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
    "#FFFFFF",
  ],
  // ---------- semantic colors ----------
  semanticColors: {
    red: "#FF4D4F",
    green: "#29A294",
  },
};
const s2Theme: any = {
  colCell: {
    bolderText: {
      fontSize: 12,
      textAlign: "center",
      fontWeight: "normal",
    },

    cell: {
      horizontalBorderColorOpacity: 0.3,
      verticalBorderColorOpacity: 0.3,
    },
  },
  rowCell: {
    text: {
      textAlign: "right",
    },
    cell: {
      horizontalBorderColorOpacity: 0.3,
      verticalBorderColorOpacity: 0.3,
    },
  },
  dataCell: {
    text: {
      textAlign: "center",
    },
    cell: {
      horizontalBorderColorOpacity: 0.3,
      verticalBorderColorOpacity: 0.3,
    },
  },
  cornerCell: {
    bolderText: {
      textAlign: "right",
    },
    cell: {
      horizontalBorderColorOpacity: 0.3,
      verticalBorderColorOpacity: 0.3,
    },
  },
  splitLine: {
    horizontalBorderColorOpacity: 0.3,
    horizontalBorderWidth: 2,

    shadowColors: {
      left: "rgba(255,255,255, 0.3)",
      right: "rgba(255,255,255, 0.01)",
    },
  },
};

const s2Options: any = {
  width: 1150,
  height: 420,
  showDefaultHeaderActionIcon: false,
  dataCell: (viewMeta: any) => {
    return new CustomDataCell(viewMeta, viewMeta?.spreadsheet);
  },
  frame: (cfg: any) => {
    return new CustomFrame(cfg);
  },
  style: {
    layoutWidthType: "compact",
    colCfg: {
      hideMeasureColumn: true,
    },
    cellCfg: {
      width: 40,
      height: 40,
    },
  },
};

const TimeSpend = () => {
  const PaletteLegend = () => (
    <div className="palette">
      {paletteLegendMap.map((value, key) => (
        <div key={key} className="palette-group">
          <span className="palette-color" style={{ background: value.color }} />
          <span className="palette-text">{value.text}</span>
        </div>
      ))}
    </div>
  );
  return (
    <div className="sheet-wrapper full-content">
      <PaletteLegend />
      <SheetComponent
        dataCfg={s2DataConfig}
        options={s2Options}
        sheetType="pivot"
        themeCfg={{ theme: s2Theme, palette: s2Palette }}
      />
    </div>
  );
};

export default TimeSpend;
