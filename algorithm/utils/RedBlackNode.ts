import TreeNode from "./TreeNode";

export enum Colors {
  RED = 0,
  BLACK = 1,
}

export default class RedBlackNode<K> extends TreeNode<K> {
  left: RedBlackNode<K> | null;
  right: RedBlackNode<K> | null;
  parent: RedBlackNode<K> | null;
  color: Colors;

  constructor(public key: K) {
    super(key);
    this.color = Colors.RED;
    this.left = null;
    this.right = null;
    this.parent = null;
  }

  isRed() {
    return this.color === Colors.RED;
  }

  flipColor() {
    if (this.color === Colors.RED) {
      this.color = Colors.BLACK;
    } else {
      this.color = Colors.RED;
    }
  }
}
