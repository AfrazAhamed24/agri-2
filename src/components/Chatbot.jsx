import { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { X, Minus, Plus, Bot, Send } from 'lucide-react';

const RobotAvatar = () => (
    <svg viewBox="0 0 200 200" className="w-[85%] h-[85%] text-green-500 drop-shadow-sm transition-all duration-300">
        {/* Outer circle line */}
        <circle cx="100" cy="100" r="95" stroke="currentColor" strokeWidth="4" fill="none" />

        {/* Body bottom */}
        <path d="M50 180 C 50 145, 150 145, 150 180 Z" fill="currentColor" />

        {/* Head circle */}
        <circle cx="100" cy="95" r="45" fill="currentColor" />

        {/* Antenna */}
        <rect x="97" y="32" width="6" height="18" fill="currentColor" />
        <circle cx="100" cy="26" r="8" fill="currentColor" />

        {/* Headphones band */}
        <path d="M 40 105 C 40 50, 160 50, 160 105" stroke="currentColor" strokeWidth="6" fill="none" strokeLinecap="round" />

        {/* Headphones ear pieces */}
        <rect x="30" y="85" width="16" height="34" rx="8" fill="currentColor" />
        <rect x="154" y="85" width="16" height="34" rx="8" fill="currentColor" />

        {/* Visor */}
        <rect x="62" y="82" width="76" height="26" rx="13" fill="white" />

        {/* Eyes */}
        <circle cx="80" cy="92" r="5" fill="currentColor" />
        <circle cx="120" cy="92" r="5" fill="currentColor" />

        {/* Smile */}
        <path d="M 94 98 C 100 104, 106 98, 106 98" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
);

export default function Chatbot({ sensorContext }) {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            from: 'bot',
            text: `Hi! I'm Majaa. How can I help you today?`,
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
                className="fixed bottom-6 right-6 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg hover:shadow-green-500/30 flex items-center justify-center hover:scale-105 transition-all z-50 duration-300"
            >
                {open ? <X size={26} strokeWidth={2} /> : <Bot size={28} strokeWidth={2} />}
            </button>

            {/* Chat Window */}
            <div
                className={clsx(
                    "fixed bottom-24 right-6 w-[360px] h-[580px] shadow-2xl rounded-[32px] flex flex-col z-50 bg-gradient-to-b from-green-50/90 to-white backdrop-blur-3xl border border-green-100/50 transition-all duration-300 origin-bottom-right",
                    open ? "scale-100 opacity-100 pointer-events-auto" : "scale-90 opacity-0 pointer-events-none"
                )}
            >

                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-green-100/30 bg-white/40 rounded-t-[32px]">
                    <div className="flex gap-2">
                        <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-600 shadow-sm border border-green-50 hover:bg-green-50 hover:scale-105 transition-all">
                            <X size={16} strokeWidth={2.5} />
                        </button>
                    </div>
                    <div className="flex items-center gap-2">
                        <Bot size={20} className="text-green-600" />
                        <h2 className="text-green-800 text-base font-semibold tracking-wide uppercase">Assistant</h2>
                    </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 scrollbars-hidden">
                    {/* Large Avatar for Initial State */}
                    {messages.length === 1 && (
                        <div className="flex-1 flex flex-col items-center justify-center gap-6 mt-4">
                            <div className="w-48 h-48 bg-white/60 rounded-full shadow-inner flex items-center justify-center p-4">
                                <RobotAvatar />
                            </div>
                            <p className="text-green-600/60 font-medium text-sm text-center px-4">Ready to answer your agriculture questions!</p>
                        </div>
                    )}

                    {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300 ease-out fade-in fill-mode-both`} style={{ animationDelay: `${i * 50}ms` }}>
                            <div className={clsx(
                                'max-w-[85%] px-5 py-3.5 text-[15px] leading-relaxed relative break-words',
                                msg.from === 'user'
                                    ? 'bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl rounded-tr-sm shadow-md shadow-green-600/20'
                                    : 'bg-white text-gray-700 rounded-2xl rounded-tl-sm shadow-sm border border-green-100'
                            )}>
                                {msg.text}
                            </div>
                        </div>
                    ))}

                    {typing && (
                        <div className="flex justify-start animate-in fade-in duration-300">
                            <div className="bg-white rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm border border-green-100">
                                <div className="flex gap-1.5 items-center">
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <div className="w-2 h-2 rounded-full bg-green-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}

                    <div ref={endRef}></div>
                </div>

                {/* Input Area */}
                <div className="p-5 pt-3 bg-white/40 rounded-b-[32px] border-t border-green-100/30">
                    <div className="bg-white rounded-2xl flex items-center p-2 gap-2 border border-green-200 shadow-sm focus-within:ring-2 focus-within:ring-green-500/20 focus-within:border-green-400 transition-all">
                        <input
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                            placeholder="Type a message..."
                            className="flex-1 bg-transparent px-3 py-2 text-[15px] text-gray-700 placeholder-gray-400 outline-none w-full"
                        />

                        <button
                            onClick={sendMessage}
                            disabled={!input.trim() || typing}
                            className="w-10 h-10 flex-shrink-0 flex items-center justify-center rounded-xl bg-green-500 text-white hover:bg-green-600 transition disabled:opacity-50 disabled:hover:bg-green-500 shadow-md shadow-green-500/20"
                        >
                            <Send size={18} strokeWidth={2} className="ml-1" />
                        </button>
                    </div>
                </div>

            </div>
        </>
    );
}