/* eslint-disable react/prop-types */
import { FaClipboard, FaRedo, FaExclamationTriangle, FaLightbulb } from 'react-icons/fa';

const PasswordCard = ({ index, item, regeneratePassword, copyToClipboard }) => {
    return (
        <div className="bg-neutral-700 p-6 rounded-lg shadow-xl flex flex-col justify-between gap-4">
            <div>
                {item.name && (<h2 className="text-2xl font-semibold mb-2">{item.name}</h2>)}
                <p className="break-words text-lg font-mono p-3 bg-neutral-600 rounded-lg text-white tracking-wide">
                    {item.password}
                </p>

                {/* Barra de fortaleza visual */}
                <div className="mt-3">
                    <p className={`text-sm font-bold ${item.strength === 'Fuerte'
                        ? 'text-green-500'
                        : item.strength === 'Media'
                            ? 'text-yellow-400'
                            : 'text-red-500'}`}>
                        Fortaleza: {item.strength}
                    </p>
                    <div className="w-full bg-gray-600 rounded-full h-2 mt-1">
                        <div
                            className={`h-full rounded-full ${item.strength === 'Fuerte'
                                ? 'bg-green-500'
                                : item.strength === 'Media'
                                    ? 'bg-yellow-400'
                                    : 'bg-red-500'}`}
                            style={{ width: `${item.strength === 'Fuerte' ? '100%' : item.strength === 'Media' ? '70%' : '40%'}` }}
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mt-4 text-sm text-gray-300">
                    <div>Longitud: <span className="font-bold">{item.length}</span></div>
                    <div>Mayúsculas: <span className="font-bold">{item.includesUppercase ? 'Sí' : 'No'}</span></div>
                    <div>Minúsculas: <span className="font-bold">{item.includesLowercase ? 'Sí' : 'No'}</span></div>
                    <div>Números: <span className="font-bold">{item.includesNumbers ? 'Sí' : 'No'}</span></div>
                    <div>Caracteres Especiales: <span className="font-bold">{item.includesSpecialChars ? 'Sí' : 'No'}</span></div>
                </div>

                {/* Información de zxcvbn */}
                {item.zxcvbn && (
                    <div className="mt-4 bg-neutral-800 p-4 rounded-lg text-sm text-gray-300">
                        <h3 className="text-lg font-bold text-white mb-2">Análisis de Seguridad</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p>
                                    <span className="font-bold">Sin limitación:</span> {item.zxcvbn.crack_times_display.online_no_throttling_10_per_second}
                                </p>
                                <p>
                                    <span className="font-bold">Múltiples atacantes:</span> {item.zxcvbn.crack_times_display.offline_slow_hashing_1e4_per_second}
                                </p>
                                <p>
                                    <span className="font-bold">Ataques 10B/sec:</span> {item.zxcvbn.crack_times_display.offline_fast_hashing_1e10_per_second}
                                </p>
                            </div>

                            <div className="flex flex-col gap-2">
                                <p className="flex items-start justify-start text-red-400">
                                    <FaExclamationTriangle className="mr-2" /> Advertencias:
                                    <span className="font-bold ml-1">{item.zxcvbn.feedback.warning || 'Ninguna'}</span>
                                </p>
                                <p className="flex items-start justify-start text-yellow-300">
                                    <FaLightbulb className="mr-2" /> Sugerencias:
                                    <span className="font-bold ml-1">{item.zxcvbn.feedback.suggestions.length > 0 ? item.zxcvbn.feedback.suggestions.join(', ') : 'Ninguna'}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-between gap-3">
                {regeneratePassword && (
                    <button
                        onClick={() => regeneratePassword(index)}
                        className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <FaRedo /> Regenerar
                    </button>
                )}

                {copyToClipboard && (
                    <button
                        onClick={() => copyToClipboard(item.password)}
                        className="bg-yellow-500 hover:bg-yellow-400 text-white py-2 px-4 rounded-lg flex items-center gap-2"
                    >
                        <FaClipboard /> Copiar
                    </button>
                )}
            </div>
        </div>
    );
};

export default PasswordCard;
