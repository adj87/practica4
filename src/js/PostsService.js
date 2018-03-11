

export class PostsService {

    constructor(url) {
        this.url = url;
    }

    async list() {
        const response = await fetch(this.url);
        return response.json();
    }

    // async save(post) {
    //     const response = await fetch(this.url, {
    //         method: 'post',
    //         body: JSON.stringify(post),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });
    //     return response.json();
    // }

}
