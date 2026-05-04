import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent
        this.items = structuredClone(MainPage.getCatalog())
        this.filterQuery = ''
    }

    static getCatalog() {
        return [
            {
                id: 1,
                articleId: 1,
                src: "img/Dvoynoy-udar_-pochemu-khakery-polyubili-zavody-i-torgovye-seti.png",
                title: `Двойной удар: почему хакеры полюбили заводы и торговые сети`,
                text: "Автор: Наталья Волчкова, руководитель отдела системного администрирования ALP ITSM",
                date: "10 марта 2026"
            },
            {
                id: 2,
                articleId: 2,
                src: "img/Kibershtorm-2026.-Pochemu-IT_strategiyu-pora-menyat-uzhe-seychas.png",
                title: `Кибершторм 2026. Почему ИТ-стратегию пора менять уже сейчас`,
                text: "Автор: Сергей Шкварь, руководитель проектов ALP ITSM",
                date: "17 марта 2026"
            },
            {
                id: 3,
                articleId: 3,
                src: "img/Zachem-IT_audit-malomu-i-srednemu-biznesu_-illyuziya-_u-nas-vse-rabotaet_.jpg",
                title: `Зачем ИТ-аудит малому и среднему бизнесу: иллюзия «у нас все работает»`,
                text: "Автор: Алексей Горюнов, руководитель проектного офиса ALP ITSM",
                date: "22 марта 2026"
            },
        ]
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
                            <input type="search" id="article-filter" class="main-toolbar__search" placeholder="Фильтр по заголовку, автору или дате..." autocomplete="off">
                            <button type="button" class="main-toolbar__btn" id="copy-random-card">Добавить случайную из трёх</button>
                        </div>
                    </header>
                    <div id="main-page" class="articles-grid"></div>
                </div>
            </main>
            `
        )
    }

    getFilteredItems() {
        const q = this.filterQuery
        if (!q) {
            return this.items
        }
        return this.items.filter((item) => {
            const hay = `${item.title} ${item.text} ${item.date}`.toLowerCase()
            return hay.includes(q)
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
        this.items = this.items.filter((item) => item.id !== cardId)
        this.renderCards()
    }

    copyRandomCard() {
        const templates = MainPage.getCatalog()
        const pick = templates[Math.floor(Math.random() * templates.length)]
        const nextId = Math.max(0, ...this.items.map((i) => i.id)) + 1
        this.items.push({
            ...pick,
            id: nextId,
            articleId: pick.articleId,
        })
        this.renderCards()
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

    renderCards() {
        this.disposeGridPopovers()
        const root = this.pageRoot
        if (!root) {
            return
        }

        root.innerHTML = ''

        const list = this.getFilteredItems()
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
                this.renderCards()
            })
        }

        document.getElementById('copy-random-card')
            ?.addEventListener('click', () => this.copyRandomCard())
    }

    render() {
        this.parent.innerHTML = ''
        this.parent.insertAdjacentHTML('beforeend', this.getHTML())

        this.attachToolbarHandlers()
        this.renderCards()
    }
}
