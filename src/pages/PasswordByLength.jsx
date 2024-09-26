import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import Container from '../components/Container';
import PasswordCard from '../components/PasswordCard';

const PasswordByLength = () => {
    const [length, setLength] = useState(12);
    const [passwords, setPasswords] = useState([]);
    const showToast = useToast();

    // Función para generar una contraseña aleatoria
    const generatePassword = (length) => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
        let password = "";
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * charset.length);
            password += charset[randomIndex];
        }
        return password;
    };

    // Función para evaluar la fortaleza de la contraseña
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

    // Función para generar la información de una contraseña
    const generatePasswordInfo = (length) => {
        const newPassword = generatePassword(length);
        return {
            password: newPassword,
            strength: evaluateStrength(newPassword),
            length: newPassword.length,
            generatedAt: new Date().toLocaleString(),
            includesUppercase: /[A-Z]/.test(newPassword),
            includesLowercase: /[a-z]/.test(newPassword),
            includesNumbers: /[0-9]/.test(newPassword),
            includesSpecialChars: /[!@#$%^&*()_\-+=<>?]/.test(newPassword),
        };
    };

    // Genera 4 contraseñas iniciales cuando el componente se monta
    useEffect(() => {
        const initialPasswords = Array(4)
            .fill()
            .map(() => generatePasswordInfo(length));
        setPasswords(initialPasswords);
    }, [length]);

    // Función para generar una nueva contraseña y actualizar una de las existentes
    const handleGenerate = () => {
        const newPasswordInfo = generatePasswordInfo(length);

        // Actualiza una contraseña aleatoria en las 4 tarjetas
        setPasswords((prev) => {
            const randomIndex = Math.floor(Math.random() * 4); // Escoge una tarjeta aleatoria
            const updatedPasswords = [...prev];
            updatedPasswords[randomIndex] = newPasswordInfo;
            return updatedPasswords;
        });
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        showToast('Contraseña copiada al portapapeles!', 'success');
    };

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Generador de contraseñas por longitud</h1>
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
                <button
                    onClick={handleGenerate}
                    className="bg-purple-500 hover:bg-purple-400 text-white py-2 px-4 rounded mt-4 w-full"
                >
                    Generar contraseña
                </button>
            </div>
            <div className="w-full max-w-full">
                <h2 className="text-xl font-semibold mb-4">4 Contraseñas generadas:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {passwords.map((item, index) => (
                        <PasswordCard
                            index={index}
                            item={item}
                            key={index}
                            copyToClipboard={copyToClipboard}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default PasswordByLength;
