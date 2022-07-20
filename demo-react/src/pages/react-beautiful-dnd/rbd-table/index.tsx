import React, { FC, Fragment, useCallback, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from "react-beautiful-dnd";
import { colors } from "@atlaskit/theme";
import styles from "./style.module.less";
import { Quote } from "../../../components/rbd/types";
import { quotes as initial } from "../data";
import reorder from "../../../utils/record";

interface TableRowProps {
  quote: Quote;
  provided: DraggableProvided;
  snapshot: DraggableStateSnapshot;
}

const TableRow: FC<TableRowProps> = ({ snapshot, quote, provided }) => {
  return (
    <tr
      style={
        snapshot.isDragging
          ? {
              background: colors.G100,
              display: "table",
            }
          : {}
      }
    >
      <td className={styles.td}>{quote.author.name}</td>
      <td className={styles.td}>{quote.content}</td>
    </tr>
  );
};

const RbdTable = () => {
  const tableRef = useRef<HTMLTableSectionElement>(null);
  const [layout, setLayout] = useState<any>("auto");
  const [quotes, setQuotes] = useState(initial);
  const onDragEnd = useCallback((result: DropResult) => {
    // dropped outside the list
    if (
      !result.destination ||
      result.destination.index === result.source.index
    ) {
      return;
    }

    // no movement
    if (result.destination.index === result.source.index) {
      return;
    }

    setQuotes((quotes) => {
      return reorder(quotes, result.source.index, result.destination!.index);
    });
  }, []);
  const toggleTableLayout = useCallback(() => {}, []);
  const copyTableToClipboard = useCallback(() => {}, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Fragment>
        <header className={styles.header}>
          <div>
            Current layout: <code>{layout}</code>
            <button type="button" onClick={toggleTableLayout}>
              Toggle
            </button>
          </div>
          <div>
            Copy table to clipboard:
            <button onClick={copyTableToClipboard}>Copy</button>
          </div>
        </header>
        <table className={styles.table} style={{ tableLayout: layout }}>
          <thead
            className={styles.thead}
            style={{ backgroundColor: colors.N50 }}
          >
            <tr>
              <th>Author</th>
              <th>Content</th>
            </tr>
          </thead>
          <Droppable droppableId="table">
            {(droppableProvided: DroppableProvided) => (
              <tbody
                style={{ border: 0 }}
                ref={(ref) => {
                  // @ts-ignore
                  tableRef.current = ref;
                  droppableProvided.innerRef(ref);
                }}
                {...droppableProvided.droppableProps}
              >
                {quotes.map((quote: Quote, index: number) => (
                  <Draggable
                    draggableId={quote.id}
                    index={index}
                    key={quote.id}
                  >
                    {(
                      provided: DraggableProvided,
                      snapshot: DraggableStateSnapshot
                    ) => (
                      <TableRow
                        provided={provided}
                        snapshot={snapshot}
                        quote={quote}
                      />
                    )}
                  </Draggable>
                ))}
                {droppableProvided.placeholder}
              </tbody>
            )}
          </Droppable>
        </table>
      </Fragment>
    </DragDropContext>
  );
};

export default RbdTable;
