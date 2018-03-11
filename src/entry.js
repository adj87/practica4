import scss from './scss/style.scss'
import 'bootstrap/scss/bootstrap-grid.scss';
import { CommentsService } from './js/CommentsService';
import { CommentsListController } from './js/CommentsListController';
import { PostsService } from './js/PostsService';
import { PostsListController } from './js/PostsListController';
import { FormController } from './js/FormController';
import { AppController } from './js/AppController';
import moment from 'moment';
import { PubSub } from 'pubsub-js';
moment.locale('es')


// Añadiendo EventListener

//Si estamos en la pagina de detalle se añadiran los siguientes eventos
if(document.location.pathname =="/detalle.html"){

	$(document).ready(function() {
		document.getElementById("header").classList.add('animated','pulse')

	    let commentsService = new CommentsService('http://localhost:3001/comments/');

	    let formController = new FormController('.comment-form',commentsService,PubSub,moment);

	    let appController = new AppController('#comments',PubSub);

	    let commentsListController = new CommentsListController("#comments", commentsService,PubSub,moment);

		document.addEventListener('scroll',function(){
			appController.isElementPastAndNotAlreadyShown()
		})


	})


}


//Si estamos en la pagina de inicio se añadirán los siguientes elementos
else{

	$(document).ready(function() {
		let postsService = new PostsService('http://localhost:3001/posts');

		let appController = new AppController('.like',PubSub);

		let postListController = new PostsListController("#posts", postsService,PubSub,moment);

		postListController.loadPosts()

		//como creo los post dinamicamente, utilizo esta forma de añadir eventos de jQuery
		$("body").on('click', '.like', function(event){
			appController.likeToggle(event.currentTarget)
		});

		document.getElementById("to-the-top").addEventListener('click',function(){
			appController.moveTo(0)
		})

	});

}
