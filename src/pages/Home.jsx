import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaLink } from 'react-icons/fa';
import KeyInspector from '../components/KeyInspector';
import Container from '../components/Container';
import routes from '../routes/routes.js';

const Home = () => {
    const [cards, setCards] = useState(Array(4).fill({ id: 0, title: '', description: '', url: '' }));

    const loadCards = () => {
        setCards([
            {
                id: 1,
                title: 'Generador de contraseña por longitud',
                description: 'El generador te permite ingresar una longitud especifica (máximo 64).',
                url: routes.PasswordByLength,
            },
            {
                id: 2,
                title: 'Generador de contraseña por tipo',
                description: 'El generador te permite seleccionar un tipo de contraseña, disponible para 160-bit WPA Key, 504-bit WPA Key, 64-bit WEP Key, 128-bit WEP Key, 152-bit WEP Key, 256-bit WEP Key,Fort Knox Password, CodeIgniter Encryption Key.',
                url: routes.PasswordByType,
            },
            {
                id: 3,
                title: 'Generador de contraseña por texto',
                description: 'El generador te permite ingresar una longitud del texto (máximo 64) y un texto base para generar contraseñas.',
                url: routes.PasswordFromText,
            },
            {
                id: 4,
                title: 'Generador de contraseñas para herramientas de desarrollo',
                description: 'El generador te permite generar contraseña las herramientas de desarrollo como: JWT Secret Key, Laravel APP Key, Express-session Secret, MongoDB Admin Password, MySQL Root Password, Redis Auth Password, AWS Access Key, Spring Boot Secret Key, PHP Session Key, Flask Secret Key, PostgreSQL User Password, RabbitMQ Password, Django Secret Key, ASP.NET Core Identity Secret, Node.js JWT Secret, Kubernetes API Secret Key, Stripe API Key, S3 Bucket Access Key, Jira API Secret Key [...]',
                url: routes.PasswordDevTool,
            },
        ]);
    }

    useEffect(() => {
        loadCards();
    }, []);

    return (
        <Container>
            <div className="w-full max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
                    <KeyInspector />
                    {cards.map((card, index) => (
                        <div key={index} className="bg-gray-800 rounded shadow-lg p-4 transition-transform transform hover:scale-105 flex flex-col justify-between h-min">
                            <div>
                                <p className="text-lg"><span className="font-bold break-words text-2xl">{card.title}</span></p>
                                <p className={`mt-2 text-sm`}>
                                    <p className='font-bold'>Descripción</p>
                                    <span className="font-base">{card.description}</span>
                                </p>
                            </div>
                            <div className='m-8'></div>
                            <Link
                                to={card.url}
                                className="bg-purple-500 hover:bg-purple-400 text-white py-1 px-2 rounded mt-4 flex items-center self-start"
                            >
                                <FaLink className="mr-1" /> Generar contraseña
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </Container>
    );
}

export default Home;
