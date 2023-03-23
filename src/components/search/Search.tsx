export type SearchProps = {
    searchedText: string,
    handleTextChange: (value: React.ChangeEvent<HTMLInputElement>) => void,
    handleSearch: () => void
}

export const Search = (props: SearchProps) => {

    return (
        <div>
            <input type="search" placeholder="Type here..." value={props.searchedText} onChange={props.handleTextChange}></input>
            <button data-testid="search-button" onClick={props.handleSearch}>Search</button>
        </div>
    )
}