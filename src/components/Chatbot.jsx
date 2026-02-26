import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function Chatbot({ dark, sensorContext }) {

    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: `👋 Hi! I'm **Majaa**.\nYou can type in English, Tamil, or Tanglish.`,
            time: new Date()
        }
    ]);

    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false);

    const inputRef = useRef(null);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    /* ─────────────────────────────────────────
       AI SEND MESSAGE (CONNECTED TO BACKEND)
    ───────────────────────────────────────── */

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userText = input.trim();

        // Add user message
        setMessages(prev => [
            ...prev,
            { from: 'user', text: userText, time: new Date() }
        ]);

        setInput('');
        setTyping(true);

        try {
            const res = await fetch("http://localhost:5000/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: userText,
                    sensorContext
                })
            });

            const data = await res.json();

            setMessages(prev => [
                ...prev,
                { from: 'bot', text: data.reply, time: new Date() }
            ]);

        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    from: 'bot',
                    text: "⚠️ Server error. Please check backend connection.",
                    time: new Date()
                }
            ]);
        }

        setTyping(false);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setOpen(!open)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition"
            >
                {open ? <X /> : <MessageCircle />}
            </button>

            {/* Chat Window */}
            {open && (
                <div className="fixed bottom-24 right-6 w-80 h-[520px] bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden">

                    {/* Header */}
                    <div className="bg-green-600 text-white p-3 font-bold flex items-center gap-2">
                        <Bot size={18} /> Majaa
                    </div>

                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto space-y-3">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={clsx(
                                    'max-w-[80%] p-3 rounded-xl text-sm',
                                    msg.from === 'user'
                                        ? 'bg-green-500 text-white ml-auto'
                                        : 'bg-gray-100 text-gray-800'
                                )}
                            >
                                {msg.text}
                            </div>
                        ))}

                        {typing && (
                            <div className="text-xs text-gray-400">
                                Majaa is typing...
                            </div>
                        )}

                        <div ref={endRef}></div>
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-2 border-t p-3 bg-gray-50">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Ask in English / Tamil / Tanglish..."
                            className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-green-500 outline-none bg-white"
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                            <Send size={16} />
                        </button>
                    </div>

                </div>
            )}
        </>
    );
}