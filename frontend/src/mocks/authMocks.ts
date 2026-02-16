export const mockAuthHandlers = [
    {
        path: '/api/auth/login',
        method: 'POST',
        handler: (req: any) => {
            const { email, password } = req.body;

            if (!email || !password) {
                return {
                    status: 400,
                    body: { message: 'Email și parolă sunt obligatorii' }
                };
            }

            return {
                status: 200,
                body: {
                    token: `token_${Date.now()}`,
                    user: {
                        id: '1',
                        email,
                        name: email.split('@')[0],
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                        role: 'user'
                    }
                }
            };
        }
    },
    {
        path: '/api/auth/register',
        method: 'POST',
        handler: (req: any) => {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return {
                    status: 400,
                    body: { message: 'Toate câmpurile sunt obligatorii' }
                };
            }

            return {
                status: 201,
                body: {
                    token: `token_${Date.now()}`,
                    user: {
                        id: Date.now().toString(),
                        email,
                        name,
                        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
                        role: 'user'
                    }
                }
            };
        }
    }
];
