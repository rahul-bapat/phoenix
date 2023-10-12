import React, { useState } from 'react';
import Chatbot from '../components/Chatbot';
import Chatbotsearch from "../components/Chatbotsearch";


const SearchPage = () => {
    const [searchKeyword, setSearchKeyword] = useState<string[]>([]);
    const [searchResults, setSearchResults] = useState<string[]>([]);

    const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const results: string[] = []; // Replace 'string' with the appropriate type for your search results
        setSearchResults(results);
    };

    const questions = [
        { id: 1, text: 'What is your name?' },
        { id: 2, text: 'How can I help you?' }
      ];

    return (
        <>
            <Chatbot ></Chatbot>
            <Chatbotsearch></Chatbotsearch>
        </>
    );
};

export default SearchPage;