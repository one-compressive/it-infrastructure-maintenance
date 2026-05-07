export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data, withDelete = false) {
        const dateHtml = data.date
            ? `<p class="article-card__date">${data.date}</p>`
            : '';

        const deleteHtml = withDelete
            ? `<button class="article-card__button--danger" type="button" id="delete-card-${data.id}">Удалить</button>`
            : '';

        return (
            `
            <article class="article-card">
                <img class="article-card__image" src="${data.src}" alt="Превью статьи">
                <div class="article-card__body">
                    ${dateHtml}
                    <h2 class="article-card__title">${data.title}</h2>
                    <p class="article-card__text">${data.text}</p>
                    <div class="article-card__buttons">
                        <button class="article-card__button--primary" type="button" id="click-card-${data.id}" data-article-id="${data.id}">Открыть</button>
                        <button class="article-card__button--secondary" type="button" data-bs-toggle="popover" data-bs-title="Кратко о статье" data-bs-content="${data.title}">Подробнее</button>
                        ${deleteHtml}
                    </div>
                </div>
            </article>
            `
        )
    }

    addListeners(data, openListener, onDelete) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", openListener)

        const deleteBtn = document.getElementById(`delete-card-${data.id}`)
        if (deleteBtn && onDelete) {
            deleteBtn.addEventListener("click", (e) => {
                e.stopPropagation()
                onDelete()
            })
        }
    }

    render(data, openListener, onDelete) {
        const html = this.getHTML(data, Boolean(onDelete))
        this.parent.insertAdjacentHTML('beforeend', html)
        this.addListeners(data, openListener, onDelete)
    }
}
