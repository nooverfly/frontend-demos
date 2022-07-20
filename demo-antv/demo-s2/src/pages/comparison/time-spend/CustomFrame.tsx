import { Frame } from "@antv/s2";

// 自定义分割线
class CustomFrame extends Frame {
  layout(): void {
    super.layout();
    // 水平二级分割线
    this.addHorizontalSplitLine();
    // 垂直二级分割线
    this.addVerticalSplitLine();
  }

  addHorizontalSplitLine() {
    const cfg = this.cfg;
    const {
      width,
      height,
      viewportWidth,
      position,
      scrollX,
      scrollContainsRowHeader,
      spreadsheet,
    } = cfg;

    const splitLine = spreadsheet.theme?.splitLine;
    const { rowsHierarchy } = spreadsheet.facet.layoutResult;
    const rootNodes = rowsHierarchy.getNodesLessThanLevel(0);
    rootNodes.forEach((node, key) => {
      if (key < rootNodes.length - 1) {
        const { children } = node;
        const lastChild = children[children.length - 1];
        const x1 = position.x;
        const x2 =
          // @ts-ignore
          x1 + width + viewportWidth + (scrollContainsRowHeader ? scrollX : 0);
        const y = position.y + height + lastChild.y + lastChild.height;
        this.addShape("line", {
          attrs: {
            x1,
            y1: y,
            x2,
            y2: y,
            stroke: splitLine?.verticalBorderColor,
            lineWidth: 1,
            opacity: splitLine?.verticalBorderColorOpacity,
          },
        });
      }
    });
  }

  addVerticalSplitLine() {
    const cfg = this.cfg;
    const { height, viewportHeight, position, width, spreadsheet } = cfg;
    const splitLine = spreadsheet.theme.splitLine;
    const { colsHierarchy } = spreadsheet.facet.layoutResult;
    const rootNodes = colsHierarchy.getNodesLessThanLevel(0);
    rootNodes.forEach((node, key) => {
      if (key < rootNodes.length - 1) {
        const { children } = node;
        const lastChild = children[children.length - 1];
        const x = lastChild.x + lastChild.width + width;
        const y1 = position.y;
        const y2 = position.y + height + viewportHeight;
        this.addShape("line", {
          attrs: {
            x1: x,
            y1,
            x2: x,
            y2,
            stroke: splitLine?.verticalBorderColor,
            lineWidth: 1,
            opacity: splitLine?.verticalBorderColorOpacity,
          },
        });
      }
    });
  }
}

export default CustomFrame;
