import { useState, useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import Container from '../components/Container';
import PasswordCard from '../components/PasswordCard';

const keyTypes = [
    { name: '160-bit WPA Key', length: 20 },
    { name: '504-bit WPA Key', length: 63 },
    { name: '64-bit WEP Key', length: 8 },
    { name: '128-bit WEP Key', length: 16 },
    { name: '152-bit WEP Key', length: 19 },
    { name: '256-bit WEP Key', length: 32 },
    { name: 'Fort Knox Password', length: 32 },
    { name: 'CodeIgniter Encryption Key', length: 32 },
];

const PasswordByType = () => {
    const [selectedKeyType, setSelectedKeyType] = useState(keyTypes[0]); // Inicializado con '160-bit WPA Key'
    const [passwords, setPasswords] = useState(Array(4).fill(''));
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

    // Función para generar las contraseñas
    const handleGenerate = () => {
        if (selectedKeyType) {
            const newPasswords = Array.from({ length: 4 }, () => generatePasswordInfo(selectedKeyType.length));
            setPasswords(newPasswords);
        }
    };

    // Generar contraseñas al cargar la página
    useEffect(() => {
        handleGenerate();
    }, [selectedKeyType]);

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        showToast('Contraseña copiada al portapapeles!', 'success');
    };

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Generador de contraseñas por tipo</h1>
            <div className="mb-4 w-full max-w-2xl">
                <label htmlFor="keyType" className="block mb-2">Selecciona un tipo de clave:
                </label>
                <select
                    id="keyType"
                    className="border border-gray-700 rounded p-2 bg-gray-800 text-white w-full"
                    value={keyTypes.indexOf(selectedKeyType)}
                    onChange={(e) => setSelectedKeyType(keyTypes[e.target.value])}
                >
                    {keyTypes.map((keyType, index) => (
                        <option key={index} value={index}>{keyType.name}</option>
                    ))}
                </select>
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
};

export default PasswordByType;
