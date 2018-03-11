export class CommentsListController {

    constructor(selector, commentsService,pubSub,moment) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        this.moment = moment
        pubSub.subscribe('comment:created', (event, comment) => {
            this.loadComments();
        });

        pubSub.subscribe("elemento #comments mostrado", (event, comment) => {
            this.loadComments();
        });
    }

    showLoadingMessage() {
        this.element.innerHTML = '<div style="width:100%;display:flex;justify-content:center"><i class="fas fa-spinner fa-pulse fa-4x"></i>';
    }

    showErrorMessage() {
        this.element.innerHTML = '<div class="error">Se ha producido un error</div>';
    }

    showNoPostsMessage() {
        this.element.innerHTML = '<div class="info">No hay ningun comentario</div>';
    }

    renderPosts(comments) {
        let html = '';
        for (let comment of comments) {
            html += 
                `<div class='comment'>
                    <div class='comment__details'>
                        <div class=comment__details__author>
                            <img src=${comment.photo}>
                            <p><span>${comment.author}</span></p>
                        </div>
                        <div class=comment__details__date>
                        <p><span>${this.moment(comment.date, "YYYYMMDD").startOf('hour').fromNow()}</span></p>
                        </div>
                    </div>
                    <div class='comment__content'>
                        <p>${comment.content}'</p>
                    </div>
                </div>`
        }
        // $(this.element).append(html);
        this.element.innerHTML = html;
    }

    loadComments() {
        this.showLoadingMessage();
        this.commentsService.list().then(comments => {
            // console.log(comments)
            if (comments.length == 0) {
                this.showNoSongsMessage();
            } else {
                this.renderPosts(comments);
            }
        }).catch((error) => {
            console.error("ERROR RETRIEVING SONGS", error);
            this.showErrorMessage();
        });

    }



}
