export class PostsListController {

    constructor(selector, postsService,pubSub,moment) {
        this.element = document.querySelector(selector);
        this.postsService = postsService;
        this.moment = moment
        // pubSub.subscribe('comment:created', (event, comment) => {
        //     this.loadComments();
        // });

        // pubSub.subscribe("elemento #comments mostrado", (event, comment) => {
        //     this.loadComments();
        // });
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

    renderPosts(posts) {
        let html = '';
        for (let post of posts) {
            html += 
            `<article class="list">  
                <div class="row">
                    <div class="col-lg-8 list__post" id="${post.id}">
                        <div class="post-thumbnail">
                            <!-- <a href="#"> -->
                                <img src="${post.photo_post}">
                            <!-- </a> -->
                        </div>
                        <div class="post-content-top">
                            <div class="post-content-top__category">
                                <a href="">${post.category}</a> 
                            </div>
                            <div class="post-content-top__title">
                                <a href="detalle.html#comments">${post.title}</a> 
                            </div>
                            <div class="post-content-top__meta">
                                <span><i class="far fa-calendar-alt"></i> ${this.moment(post.date).format('DD-MM-YYYY')}</span>
                                <span><i class="far fa-clock"></i> ${this.moment(post.date).fromNow()}</span>
                            </div>
                        </div>
                        <div class="post-content-bottom">
                            <button class="like"><i class="${(localStorage.getItem(post.id)=="true") ? "fas" : "far"} fa-thumbs-up fa-2x"></i></button>
                        </div>
                    </div>
                    <div class="col-lg-4 list__post-details">
                        <div class="post-info">
                            <div class="post-info__author-thumbnail">
                                <img src="${post.photo_author}">
                                <div class="post-info__author-name">${post.author}</div>
                            </div>
                            <div class="post-info__others">
                                <div class="post-info__excerpt">
                                    <p style='font-style:italic'>${post.excerpt}</p>
                                </div>
                                <div class="post-info__comments">
                                    <a href="detalle.html#comments">5 comentarios</a>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </article>`
        }
        console.log(this.moment("2018-03-11 15:40").fromNow())
        // console.log(this.moment().format())
        // console.log(this.moment([2018,03,11,14,37]).fromNow())
        // $(this.element).append(html);
        this.element.innerHTML = html;
    }

    loadPosts() {
        this.showLoadingMessage();
        this.postsService.list().then(comments => {
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

    returnTheCorrectTime(data){

    }



}
