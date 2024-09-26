import React, { useState } from 'react';

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

const KeyGenerator = () => {
    const [selectedKeyType, setSelectedKeyType] = useState(null);
    const [passwords, setPasswords] = useState(Array(4).fill(''));

    const handleGenerate = () => {
        if (selectedKeyType) {
            const newPasswords = Array.from({ length: 4 }, () => generatePassword(selectedKeyType.length));
            setPasswords(newPasswords);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            <h1 className="text-3xl font-bold mb-6">Generador de Claves</h1>
        </div>
    );
};

export default KeyGenerator;
