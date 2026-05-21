import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class CreatePage {
    constructor(parent) {
        this.parent = parent
    }

    get pageRoot() {
        return document.getElementById('create-page')
    }

    getHTML() {
        return (
            `
            <main class="page page-create">
                <div class="container page-container" id="create-page">
                    <header class="page-header">
                        <p class="page-label">Новая статья</p>
                        <h1 class="page-title">Создание карточки</h1>
                        <p class="page-description">
                            Заполните поля и отправьте форму — карточка будет создана через POST-запрос к API.
                        </p>
                    </header>
                    <form class="create-form" id="create-card-form" novalidate>
                        <div class="create-form__field">
                            <label class="create-form__label" for="card-src">Ссылка на изображение</label>
                            <input class="create-form__input" type="url" id="card-src" name="src" required
                                placeholder="https://example.com/image.jpg">
                        </div>
                        <div class="create-form__field">
                            <label class="create-form__label" for="card-title">Заголовок</label>
                            <input class="create-form__input" type="text" id="card-title" name="title" required
                                placeholder="Название статьи">
                        </div>
                        <div class="create-form__field">
                            <label class="create-form__label" for="card-text">Описание</label>
                            <textarea class="create-form__input create-form__textarea" id="card-text" name="text" required
                                rows="4" placeholder="Краткое описание или автор"></textarea>
                        </div>
                        <p class="create-form__error" id="create-form-error" hidden></p>
                        <div class="create-form__actions">
                            <button class="create-form__submit" type="submit">Создать карточку</button>
                        </div>
                    </form>
                </div>
            </main>
            `
        )
    }

    showError(message) {
        const errorEl = document.getElementById('create-form-error')
        if (!errorEl) {
            return
        }
        errorEl.textContent = message
        errorEl.hidden = !message
    }

    submitForm(event) {
        event.preventDefault()

        const form = event.target
        const payload = {
            src: form.src.value.trim(),
            title: form.title.value.trim(),
            text: form.text.value.trim(),
        }

        if (!payload.src || !payload.title || !payload.text) {
            this.showError('Заполните все поля формы.')
            return
        }

        this.showError('')

        stockUrls.refreshBaseUrl()
        ajax.post(stockUrls.createStock(), payload, (_data, status) => {
            if (status >= 200 && status < 300) {
                this.clickBack()
                return
            }
            console.error('Ошибка создания карточки', status)
            this.showError('Не удалось создать карточку. Проверьте, что сервер запущен.')
        })
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    attachFormHandler() {
        document
            .getElementById('create-card-form')
            ?.addEventListener('submit', (event) => this.submitForm(event))
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        this.attachFormHandler()
    }
}
