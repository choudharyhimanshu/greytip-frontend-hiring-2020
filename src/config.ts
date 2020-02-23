
const deployConfig = {
    apiUrl: '&&apiUrl&&'.startsWith('&&') ? null : '&&apiUrl&&'
};

export const config = {
    apiUrl: deployConfig.apiUrl || 'https://speech-repo-api.herokuapp.com'
};
