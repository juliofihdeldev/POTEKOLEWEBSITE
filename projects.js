class Project {
    projectsRef = db.collection("fundraising");

    async add(name, password, email) {
        const project = { name, password, email};

        try {
            const docRef = await this.projectsRef.add(project);
            console.log('project Added with ID: ', docRef.id);
            project.id = docRef.id;

        } catch (error) {
            console.error('Error Adding project: ', error)
        }

        return project;
    }

    async getAll() {
        const projects = [];

        try {
            const snapshot = await this.projectsRef.get()
            snapshot.forEach(doc => projects.push({id: doc.id, ...doc.data()}))
        } catch (err) {
            console.error('Error Getting projects: ', err);
        }

        return projects;
    }

    async get(id) {
        let project;

        try {
            let doc = await this.projectsRef.doc(id).get();
            
            if(doc.exists) 
                project = {id: doc.id, ...doc.data()};
            else
                console.log('No document found with id: ', id);
        } 
        catch (error) {
            console.error('Error in getting project: ', error);
        }

        return project;
    }

    async delete(id) {
        try {
            await this.projectsRef.doc(id).delete();
            console.log('project is deleted with id: ', id);
        } catch (error) {
            console.error('Error in deleting project: ', error);
        }
    }
}


