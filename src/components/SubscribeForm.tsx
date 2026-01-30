'use client';

import { useState } from 'react';

export default function SubscribeForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const res = await fetch('/ramadanwebinar/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email }),
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setStatus('success');
                setName('');
                setEmail('');
            } else {
                setStatus('error');
                setErrorMessage(data.error || 'Er ging iets mis. Probeer het later opnieuw.');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
            setErrorMessage('Er ging iets mis. Controleer je verbinding.');
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-brand-dark p-8 rounded-xl border border-gray-700 text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Aanmelding Geslaagd!</h3>
                <p className="text-gray-300">
                    Gefeliciteerd! Je staat op de lijst voor de webinar. Houd je mailbox in de gaten voor alle details.
                </p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-brand-dark p-8 rounded-xl border border-gray-700 shadow-2xl space-y-4">
            <h3 className="text-2xl font-bold text-center mb-2 text-white">
                Claim je <span className="text-brand-cyan">Gratis Plek</span>
            </h3>
            <p className="text-center text-gray-400 mb-6 text-sm">
                Vol = Vol. We starten om 19:00 uur.
            </p>

            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Naam</label>
                <input
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jouw voornaam"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                />
            </div>

            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">E-mailadres</label>
                <input
                    type="email"
                    id="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jouw@email.com"
                    className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                />
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full bg-brand-cyan text-brand-dark font-bold text-lg py-4 rounded-lg hover:bg-white hover:scale-[1.02] transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
                {status === 'loading' ? 'Bezig met aanmelden...' : 'Meld mij gratis aan'}
            </button>

            {status === 'error' && (
                <p className="text-red-400 text-sm text-center mt-2">{errorMessage}</p>
            )}

            <p className="text-xs text-center text-gray-500 mt-4">
                Je gegevens zijn 100% veilig. Geen spam.
            </p>
        </form>
    );
}
