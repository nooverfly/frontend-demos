import React, { FC } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { Quote } from "./types";
import styles from "./style.module.less";

interface Props {
  quote: Quote;
  isDragging: boolean;
  provided: DraggableProvided;
  isClone?: boolean;
  isGroupedOver?: boolean;
  style?: Object;
  index?: number;
}

function getStyle(provided: DraggableProvided, style?: Object): any {
  if (!style) {
    return provided.draggableProps.style;
  }

  return {
    ...provided.draggableProps.style,
    ...style,
  };
}

const QuoteItem: FC<Props> = ({
  quote,
  isDragging,
  isGroupedOver,
  provided,
  style,
  isClone,
  index,
}) => {
  return (
    <a
      href={quote.author.url}
      className={styles.container}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      style={getStyle(provided, style)}
      data-is-dragging={isDragging}
      data-testid={quote.id}
      data-index={index}
      aria-label={`${quote.author.name} quote ${quote.content}`}
    >
      <img className={styles.avatar} src={quote.author.avatarUrl} />
      {isClone ? <div className={styles["clone-badge"]}>Clone</div> : null}
      <div className={styles.content}>
        <div className={styles["block-quote"]}>{quote.content}</div>
        <div className={styles.footer}>
          <small
            className={styles.author}
            style={{
              color: quote.author.colors.hard,
              backgroundColor: quote.author.colors.soft,
            }}
          >
            {quote.author.name}
          </small>
          <small className={styles["quote-id"]}>id:{quote.id}</small>
        </div>
      </div>
    </a>
  );
};

export default React.memo<Props>(QuoteItem);
