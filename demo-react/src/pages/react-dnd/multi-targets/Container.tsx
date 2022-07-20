import React, { useCallback, useState } from "react";
import { NativeTypes } from "react-dnd-html5-backend";
import Box from "./Box";
import Dustbin from "./Dustbin";
import update from "immutability-helper";
import { ItemTypes } from "./ItemTypes";

const Container = () => {
  const [dustbins, setDustbins] = useState([
    { accepts: [ItemTypes.GLASS], lastDroppedItem: null },
    { accepts: [ItemTypes.FOOD], lastDroppedItem: null },
    {
      accepts: [ItemTypes.PAPER, ItemTypes.GLASS, NativeTypes.URL],
      lastDroppedItem: null,
    },
    { accepts: [ItemTypes.PAPER, NativeTypes.FILE], lastDroppedItem: null },
  ]);
  const [boxes] = useState([
    { name: "Bottle", type: ItemTypes.GLASS },
    { name: "Banana", type: ItemTypes.FOOD },
    { name: "Magazine", type: ItemTypes.PAPER },
  ]);
  const [droppedBoxNames, setDroppedBoxNames] = useState<any[]>([]);

  const handleDrop = useCallback(
    (index: number, item: any) => {
      const { name } = item;
      setDroppedBoxNames(
        update(droppedBoxNames, name ? { $push: [name] } : { $push: [] })
      );
      setDustbins(
        update(dustbins, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        })
      );
    },
    [droppedBoxNames, dustbins]
  );

  const isDropped = (boxName: any) => {
    return droppedBoxNames.indexOf(boxName) > -1;
  };

  return (
    <div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {dustbins.map(({ accepts, lastDroppedItem }, index) => (
          <Dustbin
            accept={accepts}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item: any) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>
      <div style={{ overflow: "hidden", clear: "both" }}>
        {boxes.map(({ name, type }, index) => (
          <Box
            name={name}
            type={type}
            isDragging={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default Container;
