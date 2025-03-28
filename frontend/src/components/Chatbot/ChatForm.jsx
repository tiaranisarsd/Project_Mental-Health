import { useRef } from "react";

const ChatForm = ({ chatHistory, setChatHistory, generateBotResponse }) => {
    const inputRef = useRef();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = "";
    
        setChatHistory((history) => [...history, { role: "user", text: userMessage }]);
    
        setTimeout(() => {
          setChatHistory((history) => [...history, { role: "model", text: "Thinking..." }]);
          generateBotResponse([...chatHistory,  { role: "user", text: userMessage }]);
    }, 600);
};

  return (
    <form action="#" className="chat-form" onSubmit={handleFormSubmit}>
              <div className="input-group">
                <input
                  ref={inputRef}
                  type="text"
                  className="form-control"
                  placeholder="Type a message..."
                  onClick={(e) => e.stopPropagation()}
                />
                <button className="btn btn-primary" type="submit">
                  Send
                </button>
              </div>
    </form>
  )
}

export default ChatForm