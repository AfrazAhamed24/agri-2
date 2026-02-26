import { clsx } from 'clsx';
import { fields } from '../data';
import { ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function FieldSelector({ selectedField, onSelect }) {
    const [open, setOpen] = useState(false);
    const current = fields.find(f => f.id === selectedField);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={clsx(
                    'flex items-center gap-3 px-4 py-2 rounded-xl border transition-all shadow-lg',
                    'bg-dark-card border-dark-border text-white hover:border-neon/50',
                    open && 'border-neon'
                )}
            >
                <div className="flex flex-col items-end text-right">
                    <span className="text-[10px] font-black uppercase tracking-widest text-dark-muted">Selected Field</span>
                </div>
                <div className="w-[1px] h-8 bg-dark-border mx-1" />
                <div className="text-left">
                    <p className="text-sm font-black tracking-tight">{current?.name}</p>
                </div>
                <ChevronDown className={clsx(
                    'w-4 h-4 ml-2 text-dark-muted transition-transform duration-300',
                    open && 'rotate-180 text-neon'
                )} />
            </button>

            {open && (
                <>
                    <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
                    <div className="absolute top-full mt-2 right-0 z-50 min-w-[280px] rounded-2xl border border-dark-border bg-dark-card shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-slide-up">
                        <div className="p-3 border-b border-dark-border bg-dark-bg/50">
                            <p className="text-[10px] font-black text-dark-muted uppercase tracking-widest">Available Fields</p>
                        </div>
                        <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                            {fields.map((f) => (
                                <button
                                    key={f.id}
                                    onClick={() => { onSelect(f.id); setOpen(false); }}
                                    className={clsx(
                                        'w-full flex items-center gap-4 px-4 py-4 text-left transition-all border-b border-dark-border/50 last:border-0',
                                        f.id === selectedField
                                            ? 'bg-neon/10'
                                            : 'hover:bg-white/5'
                                    )}
                                >
                                    <div className={clsx(
                                        'w-10 h-10 rounded-xl flex items-center justify-center text-xl border',
                                        f.id === selectedField
                                            ? 'bg-neon/20 border-neon'
                                            : 'bg-dark-bg border-dark-border'
                                    )}>
                                        🌾
                                    </div>
                                    <div className="flex-1">
                                        <p className={clsx('text-sm font-black tracking-tight', f.id === selectedField ? 'text-neon' : 'text-white')}>{f.name}</p>
                                        <p className="text-[9px] font-black text-neon/60 mt-0.5 uppercase">{f.area}</p>
                                    </div>
                                    {f.id === selectedField && (
                                        <div className="w-2 h-2 rounded-full bg-neon animate-pulse" />
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
