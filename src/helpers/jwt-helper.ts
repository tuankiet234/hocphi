export const decodeJWTPayload = (token: string) => {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url?.replace(/-/g, '+').replace(/_/g, '/');

    if (!base64) {
      return null;
    }

    // Giải mã Base64 -> UTF-8 string
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join(''),
    );

    const payload = JSON.parse(jsonPayload);
    return payload;
  } catch (e) {
    console.error('Invalid JWT', e);
    return null;
  }
};
