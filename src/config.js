const IPSERVER_KEY = 'IPSERVER';

function getBaseUrl() {
  const ip = localStorage.getItem(IPSERVER_KEY);
  if (!ip) return null;
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const port = ip.includes('.') && !ip.includes(':') ? ':3000' : '';
  return `${protocol}//${ip}${port}`;
}

function setServerIP(ip) {
  localStorage.setItem(IPSERVER_KEY, ip);
}

function getServerIP() {
  return localStorage.getItem(IPSERVER_KEY);
}

function clearServerIP() {
  localStorage.removeItem(IPSERVER_KEY);
}

async function testConnection(ip) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);
  const protocol = window.location.protocol === 'https:' ? 'https:' : 'http:';
  const port = ip.includes('.') && !ip.includes(':') ? ':3000' : '';
  try {
    const response = await fetch(`${protocol}//${ip}${port}/prueba`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    if (response.ok) {
      return { ok: true, message: 'Conexión exitosa con el servidor' };
    }
    const text = await response.text();
    console.error(`[Config] Servidor respondió con estado ${response.status}: ${text}`);
    return { ok: false, message: `El servidor respondió con error (HTTP ${response.status})` };
  } catch (error) {
    clearTimeout(timeout);
    if (error.name === 'AbortError') {
      console.error(`[Config] Timeout al conectar con ${ip}:3000 (5s)`);
      return { ok: false, message: `Tiempo de espera agotado. No se pudo alcanzar ${ip}:3000` };
    }
    console.error(`[Config] Error de conexión con ${ip}:3000:`, error.message);
    return { ok: false, message: `No se pudo conectar a ${ip}:3000 - ${error.message}` };
  }
}

function apiRequest(endpoint, options = {}) {
  const baseUrl = getBaseUrl();
  if (!baseUrl) {
    console.error('[Config] No hay IP de servidor configurada. Ve a Login y configura la IP.');
    return Promise.reject(new Error('No hay IP de servidor configurada'));
  }
  const url = `${baseUrl}${endpoint}`;
  console.log(`[API] ${options.method || 'GET'} ${url}`);
  return fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  }).then(async (response) => {
    if (!response.ok) {
      const text = await response.text();
      console.error(`[API] Error ${response.status} en ${endpoint}:`, text);
      throw new Error(`Error del servidor (${response.status}): ${text}`);
    }
    return response.json();
  }).catch((error) => {
    console.error(`[API] Fallo en ${endpoint}:`, error.message);
    throw error;
  });
}

export { getBaseUrl, setServerIP, getServerIP, clearServerIP, testConnection, apiRequest };
