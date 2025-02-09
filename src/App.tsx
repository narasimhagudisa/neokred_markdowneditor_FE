import React, { ReactEventHandler, useState } from "react";
import axios from "axios";
import "./App.css";

interface MarkdownResponse {
    html: string;
}

const App: React.FC = () => {
    const [markdown, setMarkdown] = useState<string>("");
    const [html, setHtml] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleMarkdownChange = async (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setError(null);
        const text = e.target.value;
        setMarkdown(text); 
    
        try {
            const url = "http://localhost:5000/convert";
            const response = await axios.post<MarkdownResponse>(url, { markdown: text });
            setHtml(response.data.html);
        } catch (err) {
            console.error("Error converting markdown:", err);
            setError("Failed to convert markdown. Please try again.");
        }
    };
    
    

    return (
        <div className="container">
            <div className="editor-container">
                <textarea
                    className="editor"
                    value={markdown}
                    onChange={handleMarkdownChange}
                    placeholder="Type your Markdown here..."
                />
                <textarea
                    className="editor preview"
                    value={html}
                    placeholder="Converted HTML will appear here..."
                    readOnly
                />
            </div>
            
            

            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default App;
