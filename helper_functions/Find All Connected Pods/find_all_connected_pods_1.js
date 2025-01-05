function findAllPods(num, connections) {
    let arr = [num]
    let pool = new Set([num])
    let i = 0
    while (i < arr.length) {
        const comparison = arr[i]
        connections.forEach((connection) => {
            const [pod1, pod2] = connection
            if (comparison === pod1 && !pool.has(pod2)) {
                pool.add(pod2)
                arr.push(pod2)
            } else if (comparison === pod2 && !pool.has(pod1)) {
                pool.add(pod1)
                arr.push(pod1)
            }
        })
        i++
    }
    return arr.sort((a, b) => a - b)
}


// Test Case
const connections = [[2, 3], [3, 4], [99, 100], [99, 98], [1, 3], [5, 6], [1, 5]]
const allPods = findAllPods(4, connections)

console.log(allPods)