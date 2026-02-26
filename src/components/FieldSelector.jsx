import { clsx } from 'clsx';
import { fields } from '../data';
import { ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function FieldSelector({ selectedField, onSelect, dark }) {
    const [open, setOpen] = useState(false);
    const current = fields.find(f => f.id === selectedField);

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className={clsx(
                    'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all font-medium text-sm',
                    dark
                        ? 'bg-[#161b22] border-[#21262d] text-white hover:border-green-500/50'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-green-400',
                    open && (dark ? 'border-green-500/50' : 'border-green-400')
                )}
            >
                <MapPin className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span className="max-w-[160px] truncate">{current?.name}</span>
                <span className={clsx(
                    'text-xs px-1.5 py-0.5 rounded-md ml-1 flex-shrink-0',
                    dark ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
                )}>
                    {current?.area}
                </span>
                <ChevronDown className={clsx(
                    'w-4 h-4 ml-1 flex-shrink-0 transition-transform',
                    dark ? 'text-gray-400' : 'text-gray-400',
                    open && 'rotate-180'
                )} />
            </button>

            {open && (
                <div className={clsx(
                    'absolute top-full mt-2 left-0 z-50 min-w-[260px] rounded-xl border shadow-2xl overflow-hidden animate-slide-up',
                    dark ? 'bg-[#161b22] border-[#21262d]' : 'bg-white border-gray-200'
                )}>
                    {fields.map((f) => (
                        <button
                            key={f.id}
                            onClick={() => { onSelect(f.id); setOpen(false); }}
                            className={clsx(
                                'w-full flex items-center gap-3 px-4 py-3 text-left transition-all',
                                f.id === selectedField
                                    ? dark ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-700'
                                    : dark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-50'
                            )}
                        >
                            <div className={clsx(
                                'w-8 h-8 rounded-lg flex items-center justify-center text-sm',
                                f.id === selectedField
                                    ? 'bg-green-500/20'
                                    : dark ? 'bg-gray-800' : 'bg-gray-100'
                            )}>
                                🌾
                            </div>
                            <div>
                                <p className="text-sm font-medium leading-tight">{f.name}</p>
                                <p className={clsx('text-xs mt-0.5', dark ? 'text-gray-500' : 'text-gray-400')}>{f.area}</p>
                            </div>
                            {f.id === selectedField && (
                                <span className="ml-auto text-green-500 text-lg">✓</span>
                            )}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
