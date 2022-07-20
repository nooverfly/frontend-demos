import { DraggableId, DraggableLocation } from "react-beautiful-dnd";

export interface AuthorColors {
  soft: string;
  hard: string;
}

export interface Author {
  id: string;
  name: string;
  avatarUrl: string;
  url: string;
  colors: AuthorColors;
}

export interface Quote {
  id: string;
  content: string;
  author: Author;
}

export interface Dragging {
  id: DraggableId;
  location: DraggableLocation;
}

export interface QuoteMap {
  [key: string]: Quote[];
}

export interface Task {
  id: string;
  content: string;
}
