import BinarySearchTree from "./BST";

const tree = new BinarySearchTree();

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6);

// tree.preOrderTraverse(console.log);
// tree.inOrderTraverse(console.log);
// tree.postOrderTraverse(console.log);

// console.log(tree.search(1) ? "Key 1 found." : "Key 1 not found.");
// console.log(tree.search(8) ? "Key 8 found." : "Key 8 not found.");

tree.remove(11);
tree.inOrderTraverse(console.log);
