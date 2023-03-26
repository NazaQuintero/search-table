import { useState } from "react";

type PaginationConfig = {
    elementsPerPage: number,
    currentPage: number,
    firstIndex: number,
    totalElements: number
}

export const usePagination = (cfg: PaginationConfig) => {
    const { elementsPerPage, totalElements } = cfg;

    const [currentPage, setCurrentPage] = useState(cfg.currentPage);
    const [skipFrom, setSkipFrom] = useState(0);

    const lastIndex = currentPage * elementsPerPage;
    const firstIndex = lastIndex - elementsPerPage;
    const numberOfPages = Math.ceil(totalElements/elementsPerPage);

    const setPage = (page: number) => {
        setCurrentPage(page);
    }
    
    const nextPage = () => {
        if(currentPage !== numberOfPages) {
            setCurrentPage(prevState => prevState + 1);
        } else {
            setSkipFrom(currentPage);
            // setShouldRefetch(true)
        }
    }
    
    const prevPage = () => {
        if(currentPage !== 1) {
            setCurrentPage(prevState => prevState - 1);
        }
    }

    return {
        elementsPerPage,
        firstIndex,
        lastIndex,
        startFrom: skipFrom + 1,
        currentPage,
        numberOfPages,
        setPage,
        nextPage,
        prevPage
    }
}