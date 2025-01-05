function categorizePods(connections) {
    const regions = []
    connections.forEach((connection) => {
        const [pod1, pod2] = connection
        const region1 = regions.find((region) => region.has(pod1))
        const region2 = regions.find((region) => region.has(pod2))

        if (!region1 && !region2) regions.push(new Set([pod1, pod2]))
        else if (!region1) region2.add(pod1)
        else if (!region2) region1.add(pod2)
        else if (region1 !== region2) {
            region2.forEach((pod) => void region1.add(pod))
            region2.clear()
        }
    })
    return regions
        .filter((set) => set.size)
        .map((region) => [...region].sort((a, b) => a - b))
}

function generateRegionMap(regions) {
    const dict = new Map()
    regions.forEach((region, i) => {
        region.forEach((pod) => {
            dict.set(pod, i)
        })
    })
    return dict
}

const func = (connections, queries) => {
    const regions = categorizePods(connections)
    const regionMap = generateRegionMap(regions)
    const failure = new Set()
    const result = []
    for (let i = 0; i < queries.length; i++) {
        const [op, value] = queries[i]
        switch (op) {
            case 1: {
                if (!failure.has(value)) result.push(value)
                else {
                    const regionIndex = regionMap.get(value)
                    if (regionIndex === undefined) result.push(-1)
                    else {
                        const region = regions[regionIndex]
                        const pod = region.find((pod) => !failure.has(pod))
                        result.push(pod || -1)
                    }
                }
                break;
            }
            case 2: {
                failure.add(value)
            }
        }
    }
    return result
}

// Test case
const connections = [[2, 3], [3, 4], [99, 100], [99, 98], [98, 1], [5, 6], [5, 2]]
const queries = [[2, 3], [1, 3], [2, 100], [2, 1], [1, 100], [2, 6], [2, 2], [1, 6], [2, 51], [1, 50], [1, 51]]
const test = func(connections, queries)
console.log(test)
