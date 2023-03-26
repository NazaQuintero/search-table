import { useState } from "react"

export const useTextField = () => {
    const [searchedText, setSearchedText] = useState("")
    // const [shouldRefetch, setShouldRefetch] = useState(false)

    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setSearchedText(e.target.value);
    };

    // const handleSearch = () => {
    //     setShouldRefetch(true);
    //     setTimeout(()=> setShouldRefetch(false), 1000);
    // }

    return {
        searchedText,
        handleTextChange    
    }
}