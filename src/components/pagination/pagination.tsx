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
                    <button onClick={props.prevPage}>Prev</button>
                </li>
                {
                    pages.map( number => 
                        <li key={number} className={`page-item number ${props.currentPage === number ? 'active' : ''}`}>
                            <button onClick={() => props.setPage(number)}>{number}</button>
                        </li>)
                }
                <li className='page-item'>
                    <button onClick={props.nextPage}>Next</button>
                </li>
            </ul>
        </nav>
    )
}