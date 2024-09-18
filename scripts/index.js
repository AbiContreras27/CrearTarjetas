class Activity {
    constructor (id, title, description, imgUrl){
        this.id = id;
        this.title = title;
        this.description = description;
        this.imgUrl = imgUrl;
    }
}

// Clase para gestionar las actividades
class Repository {
    constructor() {
        this.activities = [];
        this.currentId = 1;
    }

    getAllActivities(){
        return this.activities;
    }
    
    // Método para agregar actividad
    createActivity(title, description, imgUrl) {
        const newActivity = new Activity({
            id: this.currentId,
            title, 
            imgUrl,
            description, 
            });
        this.activities.push(newActivity);
        this.currentId = this.currentId ++;
    }
}