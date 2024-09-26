import { useState, useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';

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

const generatePassword = (length) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-+=<>?";
    let password = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    return password;
};

const PasswordByType = () => {
    const [selectedKeyType, setSelectedKeyType] = useState(keyTypes[0]); // Inicializado con '160-bit WPA Key'
    const [passwords, setPasswords] = useState(Array(4).fill(''));

    // Función para generar las contraseñas
    const handleGenerate = () => {
        if (selectedKeyType) {
            const newPasswords = Array.from({ length: 4 }, () => generatePassword(selectedKeyType.length));
            setPasswords(newPasswords);
        }
    };

    // Generar contraseñas al cargar la página
    useEffect(() => {
        handleGenerate();
    }, [selectedKeyType]);

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        alert('Contraseña copiada al portapapeles!');
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Generador de contraseñas por tipo</h1>
            <div className="mb-4 w-full max-w-2xl">
                <label htmlFor="keyType" className="block mb-2">Selecciona un tipo de clave:</label>
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
                        <div key={index} className="bg-gray-800 rounded shadow-lg p-4 transition-transform transform hover:scale-105 flex flex-col justify-between">
                            <div>
                                <p className="text-lg break-words text-sm p-2 bg-gray-700 w-full rounded-lg">
                                    {password}
                                </p>
                                <p className="mt-1 text-gray-300 text-sm">Longitud: <span className="font-bold">{password.length}</span></p>
                            </div>
                            <button
                                onClick={() => copyToClipboard(password)}
                                className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded mt-4 flex items-center self-start"
                            >
                                <FaClipboard className="mr-1" /> Copiar
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PasswordByType;
