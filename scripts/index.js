
class Activity {
    constructor(id, title, description, imgUrl) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

//* Clase para gestionar las actividades
class Repository {
    constructor() {
        this.activities = [];
        this.currentId = 1;
    }

    getAllActivities() {
        return this.activities;
    }

    //* Método para agregar actividad
    createActivity(title, description, imgUrl) {
        const newActivity = new Activity(this.currentId, title, description, imgUrl);
        this.activities.push(newActivity);
        this.currentId++;
    }

    // -------------------------- Homework DOM ---------------------------------------------
    //* Extrayendo propiedades de Activity
    createCard(activity) {
        const { id, title, description, imgUrl } = activity; 

    //* Creando los elementos HTML
        const titleElement = document.createElement('h3');
        const descriptionElement = document.createElement('p');
        const imgElement = document.createElement('img'); 

    //* Asignando los valores a las propiedades
        titleElement.innerHTML = title;
        descriptionElement.innerHTML = description;
        imgElement.src = imgUrl;
        imgElement.alt = title;

    //* Agregando clases CSS a los elementos y crear el div
        titleElement.classList.add('activity-title');
        descriptionElement.classList.add('activity-description');
        imgElement.classList.add('activity-img');          

        const cardElement = document.createElement('div');

    //* Appendear los elementos creados al div
        cardElement.appendChild(titleElement);
        cardElement.appendChild(descriptionElement);
        cardElement.appendChild(imgElement);

    //* Asignando al div la clase CSS para darle estilo y retorno del div
        cardElement.classList.add('activity-card');
        cardElement.dataset.activityId = id;
        return cardElement;
    }

    buildCards() {
        const activityContainer = document.getElementById('activityContainer');
        activityContainer.innerHTML = " ";
        document.getElementById('titleInput').value = '';
        document.getElementById('imgUrl').value = '';
        document.getElementById('description').value = '';

        const actividies = this.getAllActivities();
        const cardActivities = actividies.map(activity => this.createCard(activity));  

        //* Appendear todos los elementos HTML al contenedor
        cardActivities.forEach(card => {
            activityContainer.appendChild(card);
            const setNameHandler = () => {
                this.deleteActivity(card.dataset.activityId);
                this.buildCards();
            };
      
            //* método para eliminar la tarjeta
            card.addEventListener('click', setNameHandler)
        });
    }

    handlerAddActivity() {
        //* Seleccionamos los inputs y tomamos valores
        const titleInput = document.getElementById('titleInput');
        const imgUrlInput = document.getElementById('imgUrl');
        const descriptionInput = document.getElementById('description');
        const title = titleInput.value;
        const imgUrl = imgUrlInput.value;
        const description = descriptionInput.value;
      
        //* Revisamos si los inputs tienen datos tipificados por el usuario
        if (!title || !imgUrl || !description) {
            alert('Todos los campos deben estar completos.');
            return;
        }
      
        //* Añadimos una nueva actividad y refrescamos el contenedor de actividades
        this.createActivity(title, description, imgUrl);
        this.buildCards();
    }

    deleteActivity(id) {
        //* Filtramos la lista de actividades y eliminamos de acuerdo al ID, EXTRA CREDIT.
        this.activities = this.activities.filter(activity => activity.id !== parseInt(id));
    }
}

const repository = new Repository();

//* Para no recargar la pagina en el evento click del boton
document.getElementById('setButton').addEventListener('click', function(event) {
    // Prevenir la recarga de la página
    event.preventDefault();
    repository.handlerAddActivity();
});
