let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick =() =>{
    searchForm.classList.toggle('active');
   
}

document.querySelector('#push').onclick = function(){
    if(document.querySelector('#newtask input').value.length == 0){
        alert("Please Enter a Task")
    }
    else{
        document.querySelector('#tasks').innerHTML += `
            <div class="task">
                <span id="taskname">
                    ${document.querySelector('#newtask input').value}
                </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }

      

 
    }
}

const app = new Vue({
	'el': '#inquiry-form',

	data: {
		contact: {
			name: '',
			email: '',
			message: '',
		},

		isSending: false
	},

	methods: {

		/**
		 * Clear the form
		 */	
		clearForm() {
			for (let field in this.inquiry) {
				this.inquiry[field] = ''
			}
		},

		/**
		 * Handler for submit
		 */	
		onSubmit(evt) {
			evt.preventDefault();

			this.isSending = true;

			setTimeout(() => {
				// Build for data
				let form = new FormData();
				for (let field in this.inquiry) {
					form.append(field, this.inquiry[field]);
				}

				// Send form to server	
				this.$http.post('/app.php', form).then((response) => {
					console.log(response);
					this.clearForm();
					this.isSending = false;
				}).catch((e) => {
					console.log(e)
				});

			}, 1000);
		}
	}

});


window.app = app;