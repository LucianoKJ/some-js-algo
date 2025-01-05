const { MinHeap } = require('../helper_functions/Heap/minHeap3')

function cookies(k, A) {
    const minHeap = new MinHeap(A)
    let count = 0
    while (minHeap.getMin() < k) {
        const least = minHeap.pop()
        const least2 = minHeap.pop()

        if ([least, least2].includes(undefined)) return -1

        minHeap.add(least + least2 * 2)
        count++
    }
    return count
}


const test = [1, 2, 3, 9, 10, 12]
const k = 7

const res = cookies(k, test)
console.log(res)