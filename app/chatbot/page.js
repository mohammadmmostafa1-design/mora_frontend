'use client';
import { useState } from 'react';
import axios from 'axios';

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am your AI Recruiter Copilot. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!input) return;
    const userMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/ai/chatbot`, 
        { message: input },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessages(prev => [...prev, { role: 'assistant', text: res.data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error.' }]);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto h-screen flex flex-col">
      <h1 className="text-3xl font-bold mb-4">AI Copilot</h1>
      <div className="flex-1 bg-white border rounded-lg p-6 overflow-y-auto mb-4 shadow-inner">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-xs p-3 rounded-lg ${msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex gap-2">
        <input 
          className="flex-1 border p-3 rounded-lg shadow-sm"
          placeholder="Ask me to write a job description, draft an email, etc..."
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-bold">Send</button>
      </form>
    </div>
  );
}