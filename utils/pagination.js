const pagination = {
    getPages (totalCount, currentPage, perPage) {
        const maxPages = Math.ceil(totalCount / perPage)

        let pagesArray = []
        pagesArray.push(currentPage)

        let i = 0
        let previousPage = currentPage

        // 현재 페이지 앞쪽 페이지들
        while (previousPage > 1 && i < 10) {
            previousPage--
            pagesArray.unshift(previousPage)
            i++
        }

        let k = 0
        let leftoverPaves = 21 - pagesArray.length
        let nextPage = currentPage

        // 현재 페이지 뒷쪽 페이지들
        while (nextPage < maxPages && k < leftoverPaves) {
            nextPage++
            pagesArray.push(nextPage)
            k++
        }

        return pagesArray
    }
}

export default pagination
