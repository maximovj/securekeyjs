import { useState, useEffect } from 'react';
import zxcvbn from 'zxcvbn';
import { useToast } from '../hooks/useToast';
import Container from '../components/Container';
import PasswordCard from '../components/PasswordCard';

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
        const zxcvbnResult = zxcvbn(newPassword);
        return {
            ...devTool,
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
                        <PasswordCard
                            index={index}
                            item={tool}
                            key={index}
                            regeneratePassword={regeneratePassword}
                            copyToClipboard={copyToClipboard}
                        />
                    ))}
                </div>
            </div>
        </Container>
    );
};

export default DevToolPasswordGenerator;
