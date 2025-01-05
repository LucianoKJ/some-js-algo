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