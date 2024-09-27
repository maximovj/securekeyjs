const baseUrl = import.meta.env.BASE_URL || '/';

console.log('baseUrl => ', baseUrl);
const routes = {
    Root: `${baseUrl}`,
    PasswordByLength: `${baseUrl}password-by-length`,
    PasswordByType: '/password-by-type',
    PasswordFromText: '/password-from-text',
    PasswordDevTool: '/password-dev-tool',
};

export default routes;