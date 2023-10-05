import { useState, ChangeEvent, KeyboardEvent } from 'react';
import styles from './Chatbot.module.css'; // Import the CSS module
import React, { useRef } from 'react';

interface Message {
    text: string;
    user: boolean;
}


const chatHistorySampleData = [
    "Who is chief technology officer ?",
    "tell me about Christian Ulbrich",
    "Sustainability in offices",
    "London office rental yield 2023",
    "Latest trends and insights",
    "What was Yao Morin's role before? ",
    "Yao Morin about JLL GPT",
    "How many employees the JLL GPT is available?",
    "sustainability offices latest"
];

const search_style = {
    border: "none !important",
    width: "100% !important",
    height: "70px !important",
    paddingleft: "5px",
    fontsize: "14px",
    outline: "none"
};



const Chatbot = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedItem, setSelectedItem] = useState("");
    const textBoxRef = useRef<HTMLInputElement>(null);

    const handleSampleSearchClick = (item: string) => {
        setSelectedItem(item);
        if (textBoxRef.current !== null) {
            textBoxRef.current.focus();
        }
    };

    const handleUserMessage = async (message: string) => {

        // Update the messages state with the user message
        setMessages((prevMessages) => [
            { text: message, user: true },
            ...prevMessages,
        ]);

        setSelectedItem('');


        try {
            const chatbotResponse = await generateChatbotResponse(message);

            // Update the messages state with the chatbot response
            setMessages((prevMessages) => [
                { text: chatbotResponse, user: false },
                ...prevMessages,
            ]);
        } catch (error) {
            console.log(error);
        }
    };

    const generateChatbotResponse = async (message: string): Promise<string> => {

        const query = message;
        let data = "I apologize, but I am unable to process your request.";
        try {
            const response = await fetch('/api/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            data = await response.json();
        } catch (error) {
            console.log(error);
        }
        return data;
    };

    const onMessageType = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedItem(event?.target.value);
    };

    const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.currentTarget.value && e.currentTarget.value.trim()) {
            console.log('submit')
            handleUserMessage(e.currentTarget.value);

        }
    };

    return (
        <div className={styles.chatbotWrapper}>
            <h1 className={styles.title}>JLL.com search</h1>
            <h2 className={styles.subheading}>Powered by AI</h2>
            <div className={styles.chatContainer}>
                {messages.map((message, index) => (
                    <div key={index} className={styles.messagePair}>
                        <div className={message.user ? styles.userMessage : styles.chatbotMessage}>
                            <span>{message.text}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className='input_container_wrapper'>
                <div className={styles.inputContainer}>
                    <input
                        className="chat_input"
                        style={search_style}
                        type="text"
                        placeholder="Type a new question ..."
                        onChange={onMessageType}
                        onKeyDown={handleKeyPress}
                        value={selectedItem}
                        ref={textBoxRef}
                    />

                    <a className="submit_button"
                        href=""
                        onClick={(event) => {
                            event.preventDefault();
                            textBoxRef.current?.value?.trim() &&
                                handleUserMessage(textBoxRef.current?.value?.trim());
                        }}
                    >
                    Submit
                    <img src="/btn_arrow_black.svg"/>
                    </a>
                </div>

                <div className={styles.button_tags}>
                    <span>Try popular searches:</span>
                    {chatHistorySampleData.map((item: string, index: number) => (
                        <button
                            className={styles.tag_button}
                            key={index}
                            onClick={() => handleSampleSearchClick(item)}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

        </div>
    );


};

export default Chatbot;