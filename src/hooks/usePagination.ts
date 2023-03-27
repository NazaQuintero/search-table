import { useState } from "react";

type PaginationConfig = {
    elementsPerPage: number,
    currentPage: number,
    setCurrentPage: (page: number) => void,
    firstIndex: number,
    totalElements: number
}

export const usePagination = (cfg: PaginationConfig) => {
    const { elementsPerPage, totalElements } = cfg;

    const [skipFrom, setSkipFrom] = useState(0);

    const lastIndex = cfg.currentPage * elementsPerPage;
    const firstIndex = lastIndex - elementsPerPage;
    const numberOfPages = Math.ceil(totalElements/elementsPerPage);

    const setPage = (page: number) => {
        cfg.setCurrentPage(page);
    }
    
    const nextPage = () => {
        if(cfg.currentPage < numberOfPages) {
            cfg.setCurrentPage(cfg.currentPage + 1);
        } else {
            setSkipFrom(cfg.currentPage * elementsPerPage);
        }
    }
    
    const prevPage = () => {
        if(cfg.currentPage !== 1) {
            cfg.setCurrentPage(cfg.currentPage - 1);
        }
    }

    return {
        elementsPerPage,
        firstIndex,
        lastIndex,
        numberOfPages,
        skipFrom,
        setPage,
        nextPage,
        prevPage
    }
}