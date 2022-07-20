import React, { FC } from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { colors } from "@atlaskit/theme";
import styles from "./style.module.less";
import { Quote } from "./types";
import QuoteItem from "./QuoteItem";

interface InnerListProps {
  dropProvided: DroppableProvided;
  quotes: Quote[];
  title?: string;
}

interface QuoteListProps {
  quotes: Quote[];
}

const RawInnerQuoteList: FC<QuoteListProps> = ({ quotes }) => {
  return (
    <>
      {quotes.map((quote: Quote, index: number) => (
        <Draggable key={quote.id} draggableId={quote.id} index={index}>
          {(
            dragProvided: DraggableProvided,
            dragSnapshot: DraggableStateSnapshot
          ) => (
            <QuoteItem
              key={quote.id}
              quote={quote}
              isDragging={dragSnapshot.isDragging}
              isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
};
const InnerQuoteList = React.memo(RawInnerQuoteList);

const InnerList: FC<InnerListProps> = ({ quotes, dropProvided, title }) => {
  return (
    <div>
      {title && <h4 className={styles.title}>{title}</h4>}
      <div className={styles["drop-zone"]} ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
};

interface Props {
  listId?: string;
  listType?: string;
  quotes: Quote[];
  title?: string;
  internalScroll?: boolean;
  scrollContainerStyle?: Object;
  isDropDisabled?: boolean;
  isCombineEnabled?: boolean;
  style?: Object;
  ignoreContainerClipping?: boolean;
  useClone?: boolean;
}

const QuoteList: FC<Props> = ({
  ignoreContainerClipping,
  internalScroll,
  scrollContainerStyle,
  isDropDisabled,
  isCombineEnabled,
  listId = "LIST",
  listType,
  style,
  quotes,
  title,
  useClone,
}) => {
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
      renderClone={
        useClone
          ? (provided, snapshot, descriptor) =>
              (
                <QuoteItem
                  quote={quotes[descriptor.source.index]}
                  provided={provided}
                  isDragging={snapshot.isDragging}
                  isClone
                />
              ) as any
          : (null as any)
      }
    >
      {(
        dropProvided: DroppableProvided,
        dropSnapshot: DroppableStateSnapshot
      ) => (
        <div
          className={styles.wrapper}
          style={{
            backgroundColor: dropSnapshot.isDraggingOver
              ? colors.R50
              : Boolean(dropSnapshot.draggingFromThisWith)
              ? colors.T50
              : colors.N30,
            opacity: isDropDisabled ? 0.5 : "inherit",
          }}
        >
          {internalScroll ? (
            <div
              className={styles["scroll-container"]}
              style={scrollContainerStyle}
            >
              <InnerList
                quotes={quotes}
                title={title}
                dropProvided={dropProvided}
              />
            </div>
          ) : (
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          )}
        </div>
      )}
    </Droppable>
  );
};

export default QuoteList;