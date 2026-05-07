export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        const metaHtml = data.date ? `<div class="article-detail__meta">${data.date}</div>` : ''
        const leadHtml = data.lead ? `<p class="article-detail__lead">${data.lead}</p>` : ''

        return (
            `
            <article class="article-detail">
                <p class="article-detail__breadcrumbs">Главная > Новости и статьи > Статья</p>
                <h1 class="article-detail__title">${data.title}</h1>
                ${metaHtml}
                <div class="article-detail__content">
                    <img src="${data.src}" class="article-detail__image" alt="Иллюстрация статьи">
                    <div class="article-detail__text-wrapper">
                        ${leadHtml}
                        <p class="article-detail__text">${data.text}</p>
                    </div>
                </div>
            </article>
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}
