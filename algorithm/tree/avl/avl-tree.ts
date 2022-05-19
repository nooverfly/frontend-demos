import { Compare, defaultCompare, ICompareFunction } from "../../utils/utils";
import BinarySearchTree from "../BST/BST";
import Node from "../../utils/TreeNode";

enum BalanceFactor {
  UNBALANCED_RIGHT = 1,
  SLIGHTLY_UNBALANCED_RIGHT = 2,
  BALANCED = 3,
  SLIGHTLY_UNBALANCED_LEFT = 4,
  UNBALANCED_LEFT = 5,
}

export default class AVLTree<T> extends BinarySearchTree<T> {
  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    super(compareFn);
  }

  private getNodeHeight(node: Node<T> | null): number {
    if (node === null) {
      return -1;
    }

    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  /**
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T>
   */
  private rotationLL(node: Node<T>) {
    const temp = node.left;
    node.left = temp!.right;
    temp!.right = node;
    return temp;
  }

  /**
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T>
   */
  private rotationRR(node: Node<T>) {
    const temp = node.right;
    node.right = temp!.left;
    temp!.left = node;
    return temp;
  }

  /**
   * Left right case: rotate left then right
   * @param node Node<T>
   */
  private rotationLR(node: Node<T>) {
    node.left = this.rotationRR(node.left!);
    return this.rotationLL(node);
  }

  private rotationRL(node: Node<T>) {
    node.right = this.rotationLL(node.right!);
    return this.rotationRR(node);
  }

  private getBalanceFactor(node: Node<T>) {
    const heightDifference =
      this.getNodeHeight(node.left) - this.getNodeHeight(node.right);
    switch (heightDifference) {
      case -2:
        return BalanceFactor.UNBALANCED_RIGHT;
      case -1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT;
      case 1:
        return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT;
      case 2:
        return BalanceFactor.UNBALANCED_LEFT;
      default:
        return BalanceFactor.BALANCED;
    }
  }

  insert(key: T) {
    this.root = this.insertNode(this.root, key);
  }

  protected insertNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return new Node(key);
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key);
    } else {
      return node; // duplicated key
    }

    // verify if tree is balanced
    const balanceState = this.getBalanceFactor(node);
    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      if (this.compareFn(key, node.left!.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node);
      } else {
        return this.rotationLR(node);
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node!.right!.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node!);
      } else {
        return this.rotationRL(node!);
      }
    }
    return node;
  }

  protected removeNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
    } else {
      // node is the node to be deleted
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null && node.right !== null) {
        node = node.right;
      } else if (node.left !== null && node.right === null) {
        node = node.left;
      } else {
        // node has 2 children, get the in-order successor
        const inOrderSuccessor = this.minNode(node.right);
        node.key = inOrderSuccessor!.key;
        node.right = this.removeNode(node.right, inOrderSuccessor!.key);
      }
    }

    if (node === null) {
      return node;
    }

    const balanceState = this.getBalanceFactor(node);
    if (balanceState === BalanceFactor.UNBALANCED_LEFT) {
      if (
        this.getBalanceFactor(node.left!) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.left!) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationLL(node);
      }
      // Left right case
      // eg:
      //     e                              e                               e
      //    / \      rotationRR(node.left) / \        roationLL(node)      / \
      //   c  ...   -> rotationRR(a) ->   c   ...   -> roationLL(c) ->    b   ...
      //  /                              /                               / \
      // a                              b                               a   c
      //  \                            /
      //   b
      if (
        this.getBalanceFactor(node.left!) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationLR(node);
      }
    }

    if (balanceState === BalanceFactor.UNBALANCED_RIGHT) {
      if (
        this.getBalanceFactor(node.right!) === BalanceFactor.BALANCED ||
        this.getBalanceFactor(node.right!) ===
          BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
      ) {
        return this.rotationRR(node);
      }
      // Right left case
      // eg:
      //     a                              a                           a
      //    / \     rotationLL(node.right) / \       roationRR(node)   / \
      // ...   b    -> rotationLL(d) ->  ...  b   -> roationRR(b) -> ...  c
      //        \                              \                         / \
      //        d                               c                       b   d
      //       /                                 \
      //      c                                   d
      if (
        this.getBalanceFactor(node.right!) ===
        BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
      ) {
        return this.rotationRL(node);
      }
    }

    return node;
  }
}
