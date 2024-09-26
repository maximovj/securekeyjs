import { useState, useEffect } from 'react';
import { FaClipboard } from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import Container from '../components/Container';

const devTools = [
    { name: 'JWT Secret Key', length: 64 },
    { name: 'Laravel APP Key', length: 32 },
    { name: 'Express-session Secret', length: 32 },
    { name: 'MongoDB Admin Password', length: 16 },
    { name: 'MySQL Root Password', length: 16 },
    { name: 'Redis Auth Password', length: 64 },
    { name: 'AWS Access Key', length: 20 },
    { name: 'GitHub Webhook Secret', length: 32 },
    { name: 'Spring Boot Secret Key', length: 32 },
    { name: 'PHP Session Key', length: 32 },
    { name: 'Flask Secret Key', length: 24 },
    { name: 'Terraform Cloud Secret Key', length: 40 },
    { name: 'Docker Hub Access Secret Key', length: 64 },
    { name: 'PostgreSQL User Password', length: 32 },
    { name: 'RabbitMQ Password', length: 64 },
    { name: 'GitLab Personal Access Secret Key', length: 40 },
    { name: 'Django Secret Key', length: 50 },
    { name: 'ASP.NET Core Identity Secret', length: 32 },
    { name: 'Node.js JWT Secret', length: 64 },
    { name: 'Kubernetes API Secret Key', length: 32 },
    { name: 'Consul ACL Secret Key', length: 32 },
    { name: 'HashiCorp Vault Secret Key', length: 32 },
    { name: 'GCP Service Account Key', length: 64 },
    { name: 'Microsoft Azure Storage Account Key', length: 64 },
    { name: 'Twilio Auth Secret Key', length: 32 },
    { name: 'Stripe API Key', length: 32 },
    { name: 'S3 Bucket Access Key', length: 20 },
    { name: 'Salesforce Security Secret Key', length: 40 },
    { name: 'Okta API Secret Key', length: 32 },
    { name: 'Jira API Secret Key', length: 32 },
    { name: 'Bitbucket App Password', length: 32 },
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

const DevToolPasswordGenerator = () => {
    const [passwords, setPasswords] = useState([]);
    const showToast = useToast();

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
    const generatePasswordInfo = (devTool) => {
        const newPassword = generatePassword(devTool.length);
        return {
            ...devTool,
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

    const regeneratePassword = (index) => {
        const newPassword = generatePasswordInfo(passwords[index]);
        setPasswords(prevPasswords => {
            const updatedPasswords = [...prevPasswords];
            updatedPasswords[index] = newPassword;
            return updatedPasswords;
        });
    };

    const copyToClipboard = (password) => {
        navigator.clipboard.writeText(password);
        showToast('Contraseña copiada al portapapeles!', 'success');
    };

    useEffect(() => {
        // Generar contraseñas automáticamente al cargar la página
        const generatedPasswords = devTools.map(tool => generatePasswordInfo(tool));
        setPasswords(generatedPasswords);
    }, []);

    return (
        <Container>
            <h1 className="text-3xl font-bold mb-6">Generador de contraseñas para herramientas de desarrollo</h1>
            <div className='w-full max-w-full'>
                <h2 className="text-xl font-semibold mb-4">{devTools.length} Contraseñas generadas:</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
                    {passwords.map((tool, index) => (
                        <div key={index} className="bg-gray-800 p-4 rounded shadow-lg flex flex-col justify-between">
                            <div>
                                <h2 className="text-xl font-bold">{tool.name}</h2>
                                <p className="break-words text-sm p-2 bg-gray-700 w-full rounded-lg">
                                    {tool.password}
                                </p>
                                <p className={`mt-2 text-sm ${tool.strength === 'Fuerte' ? 'text-green-400' : tool.strength === 'Media' ? 'text-yellow-400' : 'text-red-400'}`}>
                                    Fortaleza: <span className="font-bold">{tool.strength}</span>
                                </p>
                                <p className="mt-1 text-gray-300 text-sm">Longitud: <span className="font-bold">{tool.length}</span></p>
                                <p className="text-gray-300 text-sm">Mayúsculas: <span className="font-bold">{tool.includesUppercase ? 'Sí' : 'No'}</span></p>
                                <p className="text-gray-300 text-sm">Minúsculas: <span className="font-bold">{tool.includesLowercase ? 'Sí' : 'No'}</span></p>
                                <p className="text-gray-300 text-sm">Números: <span className="font-bold">{tool.includesNumbers ? 'Sí' : 'No'}</span></p>
                                <p className="text-gray-300 text-sm">Caracteres Especiales: <span className="font-bold">{tool.includesSpecialChars ? 'Sí' : 'No'}</span></p>
                            </div>
                            <div className="mt-4 flex flex-col sm:flex-row gap-2">
                                <button
                                    onClick={() => regeneratePassword(index)}
                                    className="bg-purple-500 hover:bg-purple-400 text-white py-1 px-2 rounded"
                                >
                                    Regenerar
                                </button>
                                <button
                                    onClick={() => copyToClipboard(tool.password)}
                                    className="bg-yellow-500 hover:bg-yellow-400 text-white py-1 px-2 rounded flex items-center justify-center"
                                >
                                    <FaClipboard className="mr-1" /> Copiar
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default DevToolPasswordGenerator;
