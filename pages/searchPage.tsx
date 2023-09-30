import React, { useState } from 'react';
import Chatbot from '../components/Chatbot';


const SearchPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const results: string[] = []; // Replace 'string' with the appropriate type for your search results
        setSearchResults(results);
    };

    return (
        <Chatbot ></Chatbot>
    );
};

export default SearchPage;