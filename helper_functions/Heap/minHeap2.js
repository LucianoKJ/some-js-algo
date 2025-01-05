const { convertArrayToTree, convertTreeToArray } = require('../Binary Tree/binary_tree')

function minHeapFromTree(rootNode) {
    if (!rootNode) return null
    rootNode.left = minHeapFromTree(rootNode.left)
    rootNode.right = minHeapFromTree(rootNode.right)
    return fixRootToValid(rootNode)
}

const fixRootToValid = (root) => {
    let node = root
    const dummyNode = { data: null, left: node, right: null }
    let parentNode = dummyNode
    while (node) {
        const leftNode = node.left
        const rightNode = node.right
        const min = Math.min(
            node.data,
            leftNode?.data ?? Infinity,
            rightNode?.data ?? Infinity
        )
        if (node.data === min) break
        else if (leftNode?.data === min) {
            swapNode(parentNode, node, leftNode)
            parentNode = leftNode
        }
        else if (rightNode?.data === min) {
            swapNode(parentNode, node, rightNode)
            parentNode = rightNode
        }
    }
    return dummyNode.left
}

function swapNode(parent, node, child) {
    if (node.left === child) {
        [node.left, node.right, child.left, child.right] =
            [child.left, child.right, node, node.right]
    } else if (node.right === child) {
        [node.left, node.right, child.left, child.right] =
            [child.left, child.right, node.left, node]
    }

    if (parent.left === node) {
        parent.left = child
    } else if (parent.right === node) {
        parent.right = child
    }
}

const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reverse()
const res = convertArrayToTree(test)
const minHeap = minHeapFromTree(res)
console.log(convertTreeToArray(minHeap))

