

export class AppController{

	constructor(selector,pubSub){
		this.element = document.querySelector(selector);
		this.pubSub = pubSub;
	}

	isElementPastAndNotAlreadyShown(){
        if(window.scrollY>=0.7*(this.element.offsetTop) && !$(this.element).hasClass("active")){
        	this.pubSub.publish("elemento #"+this.element.id+" mostrado",this.element)
        	this.element.classList.add("active")
        }
	}

	likeToggle(elem){
		let postId 	= $(elem).closest('.list__post').attr('id')
		let likeSpan = $(elem).find('i')
		let likeSpanState = $($(elem).children()[0]).hasClass('fas');

		//"toogleo" las dos clases para que cambie el color del like
		$(likeSpan).toggleClass('far fas');

		//Almaceno el estado del like
		//this.changeLikeToggleState(postId,likeSpanState)
		localStorage.setItem(postId,!likeSpanState)
	}

	moveTo(position){
		const obj = {}
		obj['top']=position;
		obj['left']=0;
		obj['behavior']='smooth';
		console.log("yeah")
		window.scroll(obj);		
	}


}