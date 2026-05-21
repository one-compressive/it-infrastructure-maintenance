import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";
import { CreatePage } from "../create/index.js";
import { ajax } from "../../modules/ajax.js";
import { stockUrls } from "../../modules/stockUrls.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.items = []
        this.filterQuery = ''
        this.limit = ''
    }

    get pageRoot() {
        return document.getElementById('main-page')
    }

    getHTML() {
        return (
            `
            <main class="page page-main">
                <div class="container page-container">
                    <header class="page-header">
                        <p class="page-label">Новости и статьи</p>
                        <h1 class="page-title">Полезные материалы от ALP ITSM</h1>
                        <p class="page-description">
                            Разбираем вопросы поддержки ИТ-инфраструктуры, кибербезопасности и развития сервисов.
                        </p>
                        <div class="main-toolbar" role="search">
                            <label class="visually-hidden" for="article-filter">Фильтр статей</label>
                            <input type="search" id="article-filter" class="main-toolbar__search" placeholder="Фильтр по заголовку..." autocomplete="off">
                            <label class="visually-hidden" for="article-limit">Лимит карточек</label>
                            <input type="number" id="article-limit" class="main-toolbar__limit" min="1" step="1" placeholder="Лимит">
                            <button type="button" class="main-toolbar__btn" id="create-card" aria-label="Создать карточку">+</button>
                        </div>
                    </header>
                    <div id="main-page" class="articles-grid"></div>
                </div>
            </main>
            `
        )
    }

    getData() {
        stockUrls.refreshBaseUrl()
        ajax.get(stockUrls.getStocks({ title: this.filterQuery }), (data, status) => {
            if (status >= 200 && status < 300 && Array.isArray(data)) {
                this.items = data
                this.renderData(this.items)
                return
            }

            console.error('Ошибка загрузки карточек', status, data)
            this.items = []
            this.renderData(this.items)
        })
    }

    disposeGridPopovers() {
        const root = this.pageRoot
        if (!root || !window.bootstrap?.Popover) {
            return
        }
        root.querySelectorAll('[data-bs-toggle="popover"]').forEach((el) => {
            window.bootstrap.Popover.getInstance(el)?.dispose()
        })
    }

    deleteCard(cardId) {
        ajax.delete(stockUrls.removeStockById(cardId), (_data, status) => {
            if (status >= 200 && status < 300) {
                this.getData()
                return
            }
            console.error('Ошибка удаления карточки', status)
        })
    }

    openCreatePage() {
        const createPage = new CreatePage(this.parent)
        createPage.render()
    }

    clickCard(e) {
        const btn = e.target.closest('[data-article-id]')
        if (!btn) {
            return
        }
        const articleId = btn.getAttribute('data-article-id')
        const productPage = new ProductPage(this.parent, articleId)
        productPage.render()
    }

    initPopovers() {
        if (!window.bootstrap || !window.bootstrap.Popover) {
            return
        }

        const popoverTriggers = document.querySelectorAll('[data-bs-toggle="popover"]')
        popoverTriggers.forEach((element) => {
            if (window.bootstrap.Popover.getInstance(element)) {
                return
            }

            new window.bootstrap.Popover(element)
        })
    }

    renderData(items) {
        this.disposeGridPopovers()
        const root = this.pageRoot
        if (!root) {
            return
        }

        root.innerHTML = ''

        const limit = Number(this.limit)
        const list = Number.isFinite(limit) && limit > 0
            ? items.slice(0, limit)
            : items

        list.forEach((item) => {
            const productCard = new ProductCardComponent(root)
            productCard.render(
                item,
                this.clickCard.bind(this),
                () => this.deleteCard(item.id)
            )
        })

        this.initPopovers()
    }

    attachToolbarHandlers() {
        const filterInput = document.getElementById('article-filter')
        if (filterInput) {
            filterInput.value = this.filterQuery
            filterInput.addEventListener('input', () => {
                this.filterQuery = filterInput.value.trim().toLowerCase()
                this.getData()
            })
        }

        const limitInput = document.getElementById('article-limit')
        if (limitInput) {
            limitInput.value = this.limit
            limitInput.addEventListener('input', () => {
                this.limit = limitInput.value.trim()
                this.renderData(this.items)
            })
        }

        document
            .getElementById('create-card')
            ?.addEventListener('click', () => this.openCreatePage())
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        this.attachToolbarHandlers()
        this.getData()
    }
}
