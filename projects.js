class Project {
    projectsRef = db.collection("fundraising");

    async get(id) {
        let project;

        try {
            let doc = await this.projectsRef.doc(id).get();

            if (doc.exists)
                project = { id: doc.id, ...doc.data() };
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


