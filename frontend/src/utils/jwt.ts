interface JwtPayload {
  sub: string;       // userId
  email: string;
  role: string;      // "Admin" sau "User"
  jti: string;       // JWT ID unic
  exp: number;       // expirare (Unix timestamp)
  iss: string;
  aud: string;
}

/**
 * Decodifica payload-ul unui JWT fara verificarea semnaturii.
 * Verificarea semnaturii se face pe server (backend ASP.NET Core).
 */
export function decodeToken(token: string): JwtPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    // JWT payload este Base64URL encoded
    const payload = parts[1];
    // Adauga padding daca lipseste
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4);
    const decoded = atob(padded.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(decoded) as JwtPayload;
  } catch {
    return null;
  }
}

/** Returneaza true daca tokenul nu a expirat */
export function isTokenValid(token: string): boolean {
  const payload = decodeToken(token);
  if (!payload) return false;
  return payload.exp * 1000 > Date.now();
}

/** Extrage userId din token */
export function getUserIdFromToken(token: string): string | null {
  return decodeToken(token)?.sub ?? null;
}

/** Extrage rolul din token (claim-ul "role") */
export function getRoleFromToken(token: string): string | null {
  const payload = decodeToken(token);
  if (!payload) return null;
  // ASP.NET Core stocheaza rolul in claim-ul ClaimTypes.Role
  // care se serializeaza ca "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
  const roleKey = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
  return (payload as unknown as Record<string, string>)[roleKey] ?? payload.role ?? null;
}
