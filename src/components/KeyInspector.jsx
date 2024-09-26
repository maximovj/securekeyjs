import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import PasswordCard from './PasswordCard';
import { useEffect } from 'react';

const KeyInspector = () => {
    const [keyText, setKeyText] = useState('');
    const [password, setPassword] = useState({});

    // Función para generar la información de una contraseña
    const generatePasswordInfo = (text) => {
        setKeyText(text);

        if (!keyText) {
            return;
        }

        const zxcvbnResult = zxcvbn(keyText);
        setPassword({
            password: keyText,
            strength: zxcvbnResult.score >= 3 ? 'Fuerte' : zxcvbnResult.score === 2 ? 'Media' : 'Débil',
            length: keyText.length,
            generatedAt: new Date().toLocaleString(),
            zxcvbn: zxcvbnResult,
            includesUppercase: /[A-Z]/.test(keyText),
            includesLowercase: /[a-z]/.test(keyText),
            includesNumbers: /[0-9]/.test(keyText),
            includesSpecialChars: /[!@#$%^&*()_\-+=<>?]/.test(keyText),
        });
    };

    useEffect(() => {
        generatePasswordInfo(keyText);
    }, [keyText])

    return (
        <div className="p-4 flex flex-col justify-between h-min">
            <div>
                <p><span className="font-bold break-words text-4xl">Inspeccionar clave/contraseña</span></p>
                <p className={`mt-2 text-sm`}>
                    <span className="font-base"></span>
                </p>
            </div>
            <div className="w-full max-w-full">
                <div className='mb-4'>
                    <label htmlFor="keyText" className="block mb-2">Ingrese su clave/contraseña:</label>
                    <input
                        type="password"
                        id="keyText"
                        value={keyText}
                        onChange={(e) => setKeyText(e.target.value)}
                        autoComplete="off"
                        autoCorrect="off"
                        autoCapitalize="off"
                        spellCheck="false"
                        className="border border-gray-700 rounded p-2 bg-gray-800 text-white w-full"
                    />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <PasswordCard
                        index={0}
                        item={password}
                    />
                </div>
            </div>

        </div>
    );
}

export default KeyInspector;