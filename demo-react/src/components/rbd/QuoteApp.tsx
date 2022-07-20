import React, { FC, useCallback, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import QuoteList from "./QuoteList";
import { Quote } from "./types";
import styles from "./style.module.less";
import reorder from "../../utils/record";

interface Props {
  initial: Quote[];
  isCombineEnabled?: boolean;
  listStyle?: Object;
}

const QuoteApp: FC<Props> = ({ initial, isCombineEnabled, listStyle }) => {
  const [quotes, setQuotes] = useState(() => initial);

  const onDragStart = useCallback(() => {
    // Add a little vibration if the browser supports it.
    // Add's a nice little physical feedback
    if (window.navigator.vibrate) {
      window.navigator.vibrate(100);
    }
  }, []);

  const onDragEnd = useCallback((result: DropResult) => {
    // combining item
    if (result.combine) {
      // super simple: just removing the dragging item
      const newQuotes: Quote[] = [...quotes];
      newQuotes.splice(result.source.index, 1);
      setQuotes(newQuotes);
      return;
    }

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const newQuotes = reorder(
      quotes,
      result.source.index,
      result.destination.index
    );

    setQuotes(newQuotes);
  }, []);

  return (
    <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
      <div className={styles.root}>
        <QuoteList
          listId="list"
          style={listStyle}
          quotes={quotes}
          isCombineEnabled={isCombineEnabled}
        />
      </div>
    </DragDropContext>
  );
};

export default QuoteApp;
