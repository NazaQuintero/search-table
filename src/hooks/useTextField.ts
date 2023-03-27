import { useState } from "react"

export const useTextField = () => {
    const [searchedText, setSearchedText] = useState("")

    const handleTextChange = (e: any) => {
        const event = e as React.ChangeEvent<HTMLInputElement>
        setSearchedText(event.target.value);
    };

    return {
        searchedText,
        handleTextChange    
    }
}