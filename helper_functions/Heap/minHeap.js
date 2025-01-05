const { convertArrayToTree, convertTreeToArray } = require('../Binary Tree/binary_tree')

function minHeapFromTree(rootNode) {
    if (!rootNode) return null
    const left = minHeapFromTree(rootNode.left)
    const right = minHeapFromTree(rootNode.right)

    const min = Math.min(rootNode.data, left?.data ?? Infinity, right?.data ?? Infinity)
    if (left?.data === min) {
        rootNode.left = left.left
        rootNode.right = left.right
        left.left = minHeapFromTree(rootNode)
        left.right = right
        return left
    } else if (right?.data === min) {
        rootNode.left = right.left
        rootNode.right = right.right
        right.left = left
        right.right = minHeapFromTree(rootNode)
        return right
    } else {
        rootNode.left = left
        rootNode.right = right
        return rootNode
    }
}

const test = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reverse()
const res = convertArrayToTree(test)
const minHeap = minHeapFromTree(res)
console.log(convertTreeToArray(minHeap))

