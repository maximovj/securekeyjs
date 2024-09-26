import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { useToast } from '../hooks/useToast';
import Container from '../components/Container';
import PasswordCard from '../components/PasswordCard';

const PasswordFromText = () => {
    const [baseText, setBaseText] = useState('');
    const [passwords, setPasswords] = useState(Array(4).fill({ password: '', strength: '', length: 0, generatedAt: '' }));
    const [length, setLength] = useState(12);
    const showToast = useToast();

    // Genera un texto aleatorio de longitud específica
    const generateRandomText = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let randomText = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            randomText += charset[randomIndex];
        }
        return randomText;
    };

    const generateRandomLength = () => {
        return Math.floor(Math.random() * (64 - 6 + 1)) + 6;
    };

    const generatePasswordFromBase = (text, length) => {
        if (text.length === 0) return '';
        let password = "";
        const charset = text.split('');
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    // Función para generar la información de una contraseña
    const generatePasswordInfo = () => {
        const randomLength = generateRandomLength();
        const newPassword = generatePasswordFromBase(baseText, randomLength);
        const zxcvbnResult = zxcvbn(newPassword);
        return {
            password: newPassword,
            strength: zxcvbnResult.score >= 3 ? 'Fuerte' : zxcvbnResult.score === 2 ? 'Media' : 'Débil',
            length: newPassword.length,
            generatedAt: new Date().toLocaleString(),
            zxcvbn: zxcvbnResult,
            includesUppercase: /[A-Z]/.test(newPassword),
            includesLowercase: /[a-z]/.test(newPassword),
            includesNumbers: /[0-9]/.test(newPassword),
            includesSpecialChars: /[!@#$%^&*()_\-+=<>?]/.test(newPassword),
        };
    };

    const handleGenerateFromText = () => {
        const initialPasswords = Array(6)
            .fill()
            .map(() => generatePasswordInfo());
        setPasswords(initialPasswords);
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        showToast('Contraseña copiada al portapapeles!', 'success');
    };

    useEffect(() => {
        const newRandomText = generateRandomText(length);
        setBaseText(newRandomText);
    }, [length]);

    useEffect(() => {
        handleGenerateFromText();
    }, [baseText]);

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-4">Generador de contraseñas por texto</h1>
            <div className="mb-4 w-full max-w-2xl">
                <label htmlFor="length" className="block mb-2">Longitud de la contraseña:
                    <input
                        type="number"
                        value={length}
                        onChange={(e) => setLength(e.target.value)}
                        className="border border-gray-700 rounded p-2 bg-gray-800 text-white mx-2"
                        min="6"
                        max="64"
                    />
                </label>
                <input
                    type="range"
                    id="length"
                    value={length}
                    onChange={(e) => setLength(e.target.value)}
                    className="w-full"
                    min="6"
                    max="64"
                />
            </div>
            <div className="mb-4 w-full max-w-2xl">
                <label htmlFor="baseText" className="block mb-2">Texto Base para Contraseña:</label>
                <input
                    type="text"
                    id="baseText"
                    value={baseText}
                    onChange={(e) => setBaseText(e.target.value)}
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    className="border border-gray-700 rounded p-2 bg-gray-800 text-white w-full"
                />
                <button
                    onClick={handleGenerateFromText}
                    className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 rounded mt-4 w-full"
                >
                    Generar contraseña
                </button>
            </div>
            <div className="w-full max-w-full">
                <h2 className="text-xl font-semibold mb-4">{passwords.length} contraseñas generadas:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {passwords.map((password, index) => (
                        <PasswordCard
                            index={index}
                            item={password}
                            key={index}
                            copyToClipboard={copyToClipboard}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default PasswordFromText;
