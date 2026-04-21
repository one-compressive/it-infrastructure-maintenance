import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent
        this.id = id
    }

    getData() {
        const products = [
            {
                id: 1,
                src: "img/Dvoynoy-udar_-pochemu-khakery-polyubili-zavody-i-torgovye-seti.png",
                title: "Двойной удар: почему хакеры полюбили заводы и торговые сети",
                date: "10 марта 2026",
                lead: "Эта статья для владельцев производственных и торговых компаний, которые хотят усилить защиту инфраструктуры и снизить риск простоев.",
                text: "Разбираем, почему инфраструктурные атаки стали сложнее, как устроить базовую кибергигиену и какие процессы нужно внедрить в ИТ-службе в первую очередь."
            },
            {
                id: 2,
                src: "img/Kibershtorm-2026.-Pochemu-IT_strategiyu-pora-menyat-uzhe-seychas.png",
                title: "Кибершторм 2026. Почему ИТ-стратегию пора менять уже сейчас",
                date: "17 марта 2026",
                lead: "Компании, которые строили ИТ-процессы под стабильный рост, в 2026 сталкиваются с новой реальностью: требования к надежности и скорости изменений выросли.",
                text: "Показываем, как пересмотреть ИТ-стратегию, чтобы команда оставалась управляемой, а бизнес-процессы - устойчивыми даже при высокой турбулентности."
            },
            {
                id: 3,
                src: "img/Zachem-IT_audit-malomu-i-srednemu-biznesu_-illyuziya-_u-nas-vse-rabotaet_.jpg",
                title: "Зачем ИТ-аудит малому и среднему бизнесу: иллюзия «у нас все работает»",
                date: "22 марта 2026",
                lead: "ИТ-аудит помогает увидеть узкие места до того, как они приводят к авариям, потерям данных и недовольству клиентов.",
                text: "Объясняем, как проходит аудит, какие артефакты получает руководитель и почему он особенно полезен компаниям, которые быстро растут."
            },
        ];
        return products.find(p => p.id == this.id) || products[0];
    }

    get pageRoot() {
        return document.getElementById('product-page')
    }

    getHTML() {
        return (
            `
            <main class="page page-product">
                <div class="container page-container" id="product-page"></div>
            </main>
            `
        )
    }

    clickBack() {
        const mainPage = new MainPage(this.parent)
        mainPage.render()
    }

    render() {
        this.parent.innerHTML = ''
        const html = this.getHTML()
        this.parent.insertAdjacentHTML('beforeend', html)

        const backButton = new BackButtonComponent(this.pageRoot)
        backButton.render(this.clickBack.bind(this))

        const data = this.getData()
        const product = new ProductComponent(this.pageRoot)
        product.render(data)
    }
}
