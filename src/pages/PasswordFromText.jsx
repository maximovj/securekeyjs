import { useState, useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';
import Container from '../components/Container';

const PasswordFromText = () => {
    const [baseText, setBaseText] = useState('');
    const [passwords, setPasswords] = useState(Array(4).fill({ password: '', strength: '', length: 0, generatedAt: '' }));
    const [length, setLength] = useState(12);

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

    const evaluateStrength = (password) => {
        let strength = 'Débil';
        const lengthCriteria = password.length >= 12;
        const numberCriteria = /[0-9]/.test(password);
        const lowercaseCriteria = /[a-z]/.test(password);
        const uppercaseCriteria = /[A-Z]/.test(password);
        const specialCharCriteria = /[!@#$%^&*()_\-+=<>?]/.test(password);

        const criteriaMet = [lengthCriteria, numberCriteria, lowercaseCriteria, uppercaseCriteria, specialCharCriteria].filter(Boolean).length;

        if (criteriaMet >= 4) {
            strength = 'Fuerte';
        } else if (criteriaMet === 3) {
            strength = 'Media';
        }

        return strength;
    };

    const handleGenerateFromText = () => {
        const newPasswords = [];
        for (let i = 0; i < 4; i++) {
            const randomLength = generateRandomLength();
            const newPassword = generatePasswordFromBase(baseText, randomLength);
            const passwordStrength = evaluateStrength(newPassword);
            const passwordLength = newPassword.length;
            const generatedAt = new Date().toLocaleString();

            newPasswords.push({ password: newPassword, strength: passwordStrength, length: passwordLength, generatedAt });
        }
        setPasswords(newPasswords);
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        alert('Contraseña copiada al portapapeles!');
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
                <label htmlFor="length" className="block mb-2">Longitud Aleatoria:
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
                    className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    min="0"
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
                <h2 className="text-xl font-semibold mb-4">4 Contraseñas Generadas:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {passwords.map((item, index) => (
                        <div key={index} className="bg-gray-800 rounded shadow-lg p-4 transition-transform transform hover:scale-105 flex flex-col justify-between">
                            <div>
                                <p className="text-lg"><span className="font-bold break-words text-sm">{item.password}</span></p>
                                <p className={`mt-2 text-sm ${item.strength === 'Fuerte' ? 'text-green-400' : item.strength === 'Media' ? 'text-yellow-400' : 'text-red-400'}`}>
                                    Fortaleza: <span className="font-bold">{item.strength}</span>
                                </p>
                                <p className="mt-1 text-base text-gray-300">Longitud: <span className="font-bold">{item.length}</span></p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(item.password)}
                                className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded mt-4 flex items-center self-start"
                            >
                                <FaClipboard className="mr-1" /> Copiar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default PasswordFromText;
