/* eslint-disable react/prop-types */
import { FaClipboard } from 'react-icons/fa';

const PasswordCard = ({ index, item, regeneratePassword, copyToClipboard }) => {
    return (
        <div className="bg-gray-800 p-4 rounded shadow-lg flex flex-col justify-between">
            <div>
                {item.name && (<h2 className="text-xl font-bold">{item.name}</h2>)}
                <p className="break-words text-sm p-2 bg-gray-700 w-full rounded-lg">
                    {item.password}
                </p>
                <p
                    className={`mt-2 text-sm ${item.strength === 'Fuerte'
                        ? 'text-green-400'
                        : item.strength === 'Media'
                            ? 'text-yellow-400'
                            : 'text-red-400'
                        }`}
                >
                    Fortaleza: <span className="font-bold">{item.strength}</span>
                </p>
                <p className="mt-1 text-gray-300 text-sm">
                    Longitud: <span className="font-bold">{item.length}</span>
                </p>
                <p className="text-gray-300 text-sm">
                    Mayúsculas: <span className="font-bold">{item.includesUppercase ? 'Sí' : 'No'}</span>
                </p>
                <p className="text-gray-300 text-sm">
                    Minúsculas: <span className="font-bold">{item.includesLowercase ? 'Sí' : 'No'}</span>
                </p>
                <p className="text-gray-300 text-sm">
                    Números: <span className="font-bold">{item.includesNumbers ? 'Sí' : 'No'}</span>
                </p>
                <p className="text-gray-300 text-sm">
                    Caracteres Especiales: <span className="font-bold">{item.includesSpecialChars ? 'Sí' : 'No'}</span>
                </p>
                {item.zxcvbn && (<>
                    <p className="text-gray-300 text-sm">
                        Un atacante sin limitación: <span className="font-bold">{item.zxcvbn.crack_times_display.online_no_throttling_10_per_second}</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                        Multiples atacantes: <span className="font-bold">{item.zxcvbn.crack_times_display.offline_slow_hashing_1e4_per_second}</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                        Ataques por 10B/sec: <span className="font-bold">{item.zxcvbn.crack_times_display.offline_fast_hashing_1e10_per_second}</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                        Advertencias: <span className="font-bold">{item.zxcvbn.feedback.warning}</span>
                    </p>
                    <p className="text-gray-300 text-sm">
                        Sugerencias: <span className="font-bold">{item.zxcvbn.feedback.suggestions}</span>
                    </p>
                </>)}
            </div>
            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                {regeneratePassword && (
                    <button
                        onClick={() => regeneratePassword(index)}
                        className="bg-purple-500 hover:bg-purple-400 text-white py-1 px-2 rounded"
                    >
                        Regenerar
                    </button>
                )}

                {copyToClipboard && (
                    <button
                        onClick={() => copyToClipboard(item.password)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded flex items-center justify-center"
                    >
                        <FaClipboard className="mr-1" /> Copiar
                    </button>
                )}
            </div>
        </div>
    );
};

export default PasswordCard;
