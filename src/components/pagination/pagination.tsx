import './pagination.css'

export type PaginationProps = {
    currentPage: number
    elementsPerPage: number
    numberOfPages: number
    startFrom: number
    setPage: (page: number) => void
    prevPage: () => void
    nextPage: () => void
}

export const Pagination = (props: PaginationProps) => {
    const pages = [];

    for (let index = props.startFrom; index <= props.numberOfPages; index++) {
        pages.push(index)
    }

    

    return (
        <nav>
            <ul>
                <li className='page-item'>
                    <a href="#" onClick={props.prevPage}>Prev</a>
                </li>
                {
                    pages.map( number => 
                        <li key={number} className={`page-item number ${props.currentPage === number ? 'active' : ''}`}>
                            <a href="#" onClick={() => props.setPage(number)}>{number}</a>
                        </li>)
                }
                <li className='page-item'>
                    <a href="#" onClick={props.nextPage}>Next</a>
                </li>
            </ul>
        </nav>
    )
}