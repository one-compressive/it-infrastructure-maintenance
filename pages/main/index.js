import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
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
                    </header>
                    <div id="main-page" class="articles-grid"></div>
                </div>
            </main>
            `
        )
    }

    getData() {
        return [
            {
                id: 1,
                src: "img/Dvoynoy-udar_-pochemu-khakery-polyubili-zavody-i-torgovye-seti.png",
                title: `Двойной удар: почему хакеры полюбили заводы и торговые сети`,
                text: "Автор: Наталья Волчкова, руководитель отдела системного администрирования ALP ITSM",
                date: "10 марта 2026"
            },
            {
                id: 2,
                src: "img/Kibershtorm-2026.-Pochemu-IT_strategiyu-pora-menyat-uzhe-seychas.png",
                title: `Кибершторм 2026. Почему ИТ-стратегию пора менять уже сейчас`,
                text: "Автор: Сергей Шкварь, руководитель проектов ALP ITSM",
                date: "17 марта 2026"
            },
            {
                id: 3,
                src: "img/Zachem-IT_audit-malomu-i-srednemu-biznesu_-illyuziya-_u-nas-vse-rabotaet_.jpg",
                title: `Зачем ИТ-аудит малому и среднему бизнесу: иллюзия «у нас все работает»`,
                text: "Автор: Алексей Горюнов, руководитель проектного офиса ALP ITSM",
                date: "22 марта 2026"
            },
        ]
    }

    clickCard(e) {
        const cardId = e.target.dataset.id

        const productPage = new ProductPage(this.parent, cardId)
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

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const data = this.getData()
        data.forEach((item) => {
            const productCard = new ProductCardComponent(this.pageRoot)
            productCard.render(item, this.clickCard.bind(this))
        })

        this.initPopovers()
    }
}
