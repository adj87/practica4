

export class FormController {

    constructor(selector, commentsService,pubSub,moment) {
        this.element = document.querySelector(selector);
        this.commentsService = commentsService;
        this.moment = moment;
        this.pubSub = pubSub;
        this.loading = false;
        this.addEventListeners();
    }

    // setLoading(loading) {
    //     this.loading = loading;
    //     this.element.querySelectorAll('input, button').forEach(item => { item.disabled = loading });
    // }

    addEventListeners() {
        // this.addInputListeners();
        this.addFormSubmitListener();
    }

    addFormSubmitListener() {
        this.element.addEventListener('submit', event => {
            event.preventDefault();
            // console.log("hello")
            // if (this.loading) {
            //     return;  // si se está cargando, no hacemos nada más
            // }
            // this.setLoading(true);
            let comment = this.buildCommentData();
            console.log(comment)
            if(this.checkFormValidity()){
                this.commentsService.save(comment).then(comment => {
                    // this.element.reset();
                    this.pubSub.publish('comment:created', comment);
                }).catch(error => {
                    console.error("SE HA PRODUCIDO UN ERROR");
                    alert(`Se ha producido un error ${error}`);
                }).finally(() => {
                    // this.setLoading(false);
                    // this.element.reset();
                })
            }
            else{
                alert("Asegurese de introducir nombre y apellidos, un email valido y un comentario menor a 120 palabras")
            }
        });
    }

    buildCommentData() {
        return {
            author: this.element.querySelector("input[name='nombre']").value,
            email: this.element.querySelector("input[name='email']").value,
            content: this.element.querySelector("textarea[name='comentario']").value,
            photo: './assets/img/no-photo.jpg',
            date: this.moment()

        }
    }

    checkFormValidity(){
        // return "wapo"
        var nombreInput      = this.element.querySelector("input[name='nombre']")
        // console.log(nombreInput.checkValidity())
        var emailInput       = this.element.querySelector("input[name='email']") 
        // console.log(emailInput.checkValidity())
        var comentarioInput  = this.element.querySelector("textarea[name='comentario']")
        // console.log(this.validateTextArea(comentarioInput))
        if(nombreInput.checkValidity() && emailInput.checkValidity() && this.validateTextArea(comentarioInput)){
            return true
        }
        else{
            return false
        }

    }

    validateTextArea(text) {
        var textAreaValue = text.value.trim();
        var reEspaciosBlancos = /[ ]+/g;
        var puntosAndComas = /[.,;]+/g;
        textAreaValue = textAreaValue.replace(reEspaciosBlancos," ")
        textAreaValue = textAreaValue.replace(puntosAndComas,"")
        var contador=0;
        var textAreaValueArray = textAreaValue.split(" ")
        for(var i=0;i<textAreaValueArray.length;i++){
            if(textAreaValueArray[i]!="") contador++
        }

        if(contador<=120 && contador>0){
            return true
        }
        else{
            return false
        }
    }

    // userLength(){
    //     // var counter;
    //     this.commentsService.list().then((comments)=> return comments.length());

    // }

    // addInputListeners() {
    //     // en todos los input que hay en el formulario, los valido cuando se pierde el foco
    //     this.element.querySelectorAll('input').forEach(input => {

    //         input.addEventListener('blur', event => {
    //             // event.target sería lo mismo que input en este caso
    //             if (input.checkValidity() == false) {
    //                 input.classList.add('error');
    //             } else {
    //                 input.classList.remove('error');
    //             }
    //             this.checkFormValidity();
    //         });

    //     });
    // }

    // checkFormValidity() {
    //     let button = this.element.querySelector('button');
    //     if (this.element.checkValidity()) {
    //         button.disabled = false;
    //     } else {
    //         button.disabled = true;
    //     }
    // }

}
