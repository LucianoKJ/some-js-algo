class MinHeap {
    constructor(arr) {
        this.values = MinHeap.minHeapify([...arr])
    }

    static minHeapify(nodeArr = []) {
        const last = nodeArr.length - 1
        for (let i = last; i >= 0; i--) {
            MinHeap.swapDown(nodeArr, i)
        }
        return nodeArr
    }

    static swapDown(nodeArr, index) {
        const l = nodeArr.length
        while (index < l) {
            const value = nodeArr[index]
            const leftIndex = 2 * index + 1
            const rightIndex = 2 * index + 2
            const left = nodeArr[leftIndex] ?? Infinity
            const right = nodeArr[rightIndex] ?? Infinity
            const min = Math.min(value, left, right)

            if (min === value) break
            else if (min === left) {
                nodeArr[index] = left
                nodeArr[leftIndex] = value
                index = leftIndex
            } else if (min === right) {
                nodeArr[index] = right
                nodeArr[rightIndex] = value
                index = rightIndex
            }
        }
    }

    static swapLastUp(nodeArr) {
        let index = nodeArr.length - 1
        let parentIndex = Math.floor((index - 1) / 2)
        while (parentIndex >= 0) {
            if (nodeArr[index] >= nodeArr[parentIndex]) break
            else {
                [nodeArr[index], nodeArr[parentIndex]] = [nodeArr[parentIndex], nodeArr[index]]
                index = parentIndex
                parentIndex = Math.floor((index - 1) / 2)
            }
        }
    }

    add(newValue) {
        this.values.push(newValue)
        MinHeap.swapLastUp(this.values)
    }

    pop() {
        if (!this.values.length) return undefined

        const min = this.values[0]
        this.values[0] = this.values[this.values.length - 1]
        this.values.pop()
        MinHeap.swapDown(this.values, 0)
        return min
    }

    getMin() {
        return this.values[0]
    }

    getSize() {
        return this.values.length
    }
}

exports.MinHeap = MinHeap

// Test Case
// const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reverse()

// const minHeap = new MinHeap(test)
// minHeap.add(-1)
// minHeap.pop()
// console.log(minHeap)
