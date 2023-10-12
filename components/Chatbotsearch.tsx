  import { useState, ChangeEvent, KeyboardEvent } from 'react';
  import styles from './Chatbotsearch.module.css'; // Import the CSS module
  import React, { useRef } from 'react';

  interface Message {
      text: string;
      user: boolean;
  }


  const search_style = {
      border: "none !important",
      height: "40px !important",
      paddingleft: "5px",
      fontsize: "14px",
      outline: "none",
      width: "100% !important",
  };



  const Chatbotsearch = () => {
      const [messages, setMessages] = useState<Message[]>([]);
      const [selectedItem, setSelectedItem] = useState("");
      const [isIconVisible, setIconVisible] = useState(true);
      const [isChatbotOpen, setIsChatbotOpen] = useState(false);
      const textBoxRef = useRef<HTMLInputElement>(null);
      const [button1Clicked, setButton1Clicked] = useState(false);
      const [initialQuestionButtons, setInitialQuestionButtons] = useState<string[]>([
        "Sure go for it!",
        "I am Just browsing"
      ]);
      const [replacementButtons, setReplacementButtons] = useState<string[]>([
        "I'd like to learn about JLL's.",
        "I'd like to learn about JLL's services.",
        "How JLL GPT empowering employees?",
        // "What is JLL decarbonization strategy?",
        // "Tell me about Mihir Shah",
        "Who is the Chief Executive Officer & President of JLL?",
        // "Who is chief technology officer of JLLT ?",
        // "Cheryl R. Carron",
        // "London office rental yield 2023",
        "Latest trends and insights",
        "Yao Morin about JLL GPT",
        // "who are JLL Board of Directors?",
        
      ]);
      const [jllServicesButtons, setJllServicesButtons] = useState<string[]>([
        "Find & Lease space",
        "Manage property & portfolio.",
        "Design & Deliever projects",
        "Invest in eeal estate",
        "Transform with technology",
        
      ]);

      const handleChatbotToggle = () => {
          setIsChatbotOpen(!isChatbotOpen);
          setIconVisible(false);
      };

      const handleCloseChatbot = () => {
          setIsChatbotOpen(false);
          setIconVisible(true);
      };

      const handleSampleSearchClick = (item: string, id: number) => {
        console.log(id);
        if(id === 0) {
          setInitialQuestionButtons(replacementButtons);
        } else if(id === 1) {
          console.log('1');
          setButton1Clicked(true);
        }  
        setSelectedItem(item);
        if (textBoxRef.current !== null) {
            textBoxRef.current.focus();
        }
      };

      const handleSecondLevelSearchClick = (item: string, id: number) => {
        console.log(id);
        if(id === 0) {
          setReplacementButtons(jllServicesButtons);
        }
      }

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
          <> {isChatbotOpen && (
          <div className={styles.chatbotWrapper}>
                  
              <div className="headings">
              <div className={styles.closeButton} onClick={handleCloseChatbot}>
                      <img src="./close_btn.svg" alt="Close Button" />
                  </div>
              <h1 className={styles.title}>JLL.com search</h1>
              <h2 className={styles.subheading}>Powered by AI</h2></div>
              <span className='question-box'>Hello 👋 Can I ask you a quick question?</span>
              
              <div className='input_container_wrapper'>
                
                <div className={styles.button_tags}>

                  {initialQuestionButtons.map((item: string, index: number) => (
                      <button
                          className={styles.tag_button}
                          key={index}
                          onClick={() => handleSampleSearchClick(item, index)}
                      >
                        {item}
                        {index === 1 && button1Clicked && (
                        <>
                          <span>No problem!</span>
                          <span>What brought you to our site today?</span>

                        </>
                      )}
                      
                      </button>
                      
                  ))}
                  <div className={styles.chatContainer}>
                  {messages.map((message, index) => (
                      <div key={index} className={styles.messagePair}>
                          <div className={message.user ? styles.userMessage : styles.chatbotMessage}>
                              <span>{message.text}</span>
                          </div>
                      </div>
                  ))}
              </div>
                  </div>
                  
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

                  
              </div>


          </div>
          )}
              {isIconVisible &&
                  <div className={styles.chatbotIcon} onClick={handleChatbotToggle}>
                      <img src="/open_btn.png" />
                  </div>
              }
          </>
      );


  };

  export default Chatbotsearch;