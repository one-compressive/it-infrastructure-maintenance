const API_PORT = 3000;

function resolveApiBase() {
    if (typeof window === 'undefined') {
        return `http://localhost:${API_PORT}`;
    }

    const fromStorage = localStorage.getItem('apiBase');
    if (fromStorage) {
        return fromStorage.replace(/\/$/, '');
    }

    const params = new URLSearchParams(window.location.search);
    const apiHost = params.get('apiHost');
    if (apiHost) {
        return `${window.location.protocol}//${apiHost}:${API_PORT}`;
    }

    const { protocol, hostname, port } = window.location;

    // Сайт открыт через Express — API на том же origin
    if (port === String(API_PORT)) {
        return window.location.origin;
    }

    return `${protocol}//${hostname}:${API_PORT}`;
}

class StockUrls {
    constructor() {
        this.baseUrl = resolveApiBase();
    }

    refreshBaseUrl() {
        this.baseUrl = resolveApiBase();
    }

    getStocks(params = {}) {
        const url = new URL(`${this.baseUrl}/stocks`);
        Object.entries(params).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                return;
            }
            url.searchParams.set(key, String(value));
        });
        return url.toString();
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
