import Node from "../../utils/TreeNode";
import { Compare, defaultCompare, ICompareFunction } from "../../utils/utils";

export default class BinarySearchTree<T> {
  root: Node<T> | null;
  compareFn: ICompareFunction<T>;

  constructor(compareFn: ICompareFunction<T> = defaultCompare) {
    this.root = null;
    this.compareFn = compareFn;
  }

  insert(key: T) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  protected insertNode(node: Node<T>, key: T) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key);
      } else {
        this.insertNode(node.left, key);
      }
    } else if (node.right === null) {
      node.right = new Node(key);
    } else {
      this.insertNode(node.right, key);
    }
  }

  search(key: T) {
    return this.searchNode(this.root, key);
  }

  searchNode(node: Node<T> | null, key: T): Boolean {
    if (node === null) {
      return false;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      return this.searchNode(node.left, key);
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      return this.searchNode(node.right, key);
    }
    return true;
  }

  inOrderTraverse(callback: Function) {
    this.inOrderTraverseNode(this.root, callback);
  }

  protected inOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      this.inOrderTraverseNode(node.left, callback);
      callback(node.key);
      this.inOrderTraverseNode(node.right, callback);
    }
  }

  preOrderTraverse(callback: Function) {
    this.preOrderTraverseNode(this.root, callback);
  }

  protected preOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }

  postOrderTraverse(callback: Function) {
    this.postOrderTraverseNode(this.root, callback);
  }

  protected postOrderTraverseNode(node: Node<T> | null, callback: Function) {
    if (node !== null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }

  min() {
    return this.minNode(this.root);
  }

  protected minNode(node: Node<T> | null) {
    let current = node;
    while (current !== null && current.left !== null) {
      current = current.left;
    }
    return current;
  }

  max() {
    this.maxNode(this.root);
  }

  maxNode(node: Node<T> | null) {
    let current = node;
    while (current !== null && current.right !== null) {
      current = current.right;
    }
    return current;
  }

  remove(key: T) {
    this.root = this.removeNode(this.root, key);
  }

  protected removeNode(node: Node<T> | null, key: T): Node<T> | null {
    if (node === null) {
      return null;
    }

    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.removeNode(node.left, key);
      return node;
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.removeNode(node.right, key);
      return node;
    } else {
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      if (node.left === null) {
        node = node.right;
        return node;
      }

      if (node.right === null) {
        node = node.left;
        return node;
      }

      const aux = this.minNode(node.right)!;
      node.key = aux?.key;
      node.right = this.removeNode(node.right, aux.key);
      return node;
    }
  }
}
