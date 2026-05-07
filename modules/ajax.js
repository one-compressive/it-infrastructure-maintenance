class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async get(url, callback) {
        try {
            const response = await fetch(url, { method: 'GET' });
            const status = response.status;

            let data = null;
            const text = await response.text();
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                    data = null;
                }
            }

            callback(data, status);
        } catch (e) {
            console.error('Ошибка запроса:', e);
            callback(null, 0);
        } finally {
            console.log('[GET]: ' + url);
        }
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async post(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const status = response.status;

            let parsed = null;
            const text = await response.text();
            if (text) {
                try {
                    parsed = JSON.parse(text);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                    parsed = null;
                }
            }

            callback(parsed, status);
        } catch (e) {
            console.error('Ошибка запроса:', e);
            callback(null, 0);
        } finally {
            console.log('[POST]: ' + url);
        }
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async patch(url, data, callback) {
        try {
            const response = await fetch(url, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const status = response.status;

            let parsed = null;
            const text = await response.text();
            if (text) {
                try {
                    parsed = JSON.parse(text);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                    parsed = null;
                }
            }

            callback(parsed, status);
        } catch (e) {
            console.error('Ошибка запроса:', e);
            callback(null, 0);
        } finally {
            console.log('[PATCH]: ' + url);
        }
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    async delete(url, callback) {
        try {
            const response = await fetch(url, { method: 'DELETE' });
            const status = response.status;

            let data = null;
            const text = await response.text();
            if (text) {
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    console.error('Ошибка парсинга JSON:', e);
                    data = null;
                }
            }

            callback(data, status);
        } catch (e) {
            console.error('Ошибка запроса:', e);
            callback(null, 0);
        } finally {
            console.log('[DELETE]: ' + url);
        }
    }
}

export const ajax = new Ajax();
