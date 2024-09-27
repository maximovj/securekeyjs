const baseUrl = '/';

console.log('baseUrl => ', baseUrl);
const routes = {
    Root: `${baseUrl}`,
    PasswordByLength: `${baseUrl}password-by-length`,
    PasswordByType: `${baseUrl}password-by-type`,
    PasswordFromText: `${baseUrl}/password-from-text`,
    PasswordDevTool: `${baseUrl}/password-dev-tool`,
};

export default routes;