export const extractTokenFromHeader = async (request: Request): Promise<string> => {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type?.toString().toLowerCase() === 'bearer' ? token : null;
}