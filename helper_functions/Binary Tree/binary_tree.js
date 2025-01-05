class TreeNode {
    constructor(data, left = null, right = null) {
        this.data = data
        this.left = left
        this.right = right
    }
}

function convertArrayToTree(arr = []) {
    let nodeArr = []
    for (let i = arr.length - 1; i >= 0; i--) {
        const node = new TreeNode(arr[i], nodeArr[i * 2 + 1], nodeArr[i * 2 + 2])
        nodeArr[i] = node
    }
    return nodeArr[0]
}

function convertTreeToArray(rootNode) {
    let arr = [rootNode]
    let i = 0
    while (i < arr.length) {
        const node = arr[i]
        if (node.left) arr.push(node.left)
        if (node.right) arr.push(node.right)
        arr[i++] = node.data
    }
    return arr
}

exports.convertArrayToTree = convertArrayToTree
exports.convertTreeToArray = convertTreeToArray
