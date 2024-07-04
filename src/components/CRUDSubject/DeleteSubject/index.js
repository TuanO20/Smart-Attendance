import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";


function DeleteSubject({subjectID}) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete subject " + subjectID + "?") == true) {
            const deleteSubject = await deleteDoc(doc(db, 'Subjects', subjectID))
                .then(() => alert("Delete subject " + subjectID + " successfully"))
                .catch(err => alert("Failed to delete subject"));
        }
        
    }


    return (
        <>
            <i class="fa-solid fa-trash" onClick={handleDelete}></i>
        </>
    );
}

export default DeleteSubject;