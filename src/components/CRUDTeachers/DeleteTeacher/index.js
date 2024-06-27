import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";


function DeleteTeacher({teacherID}) {
    const handleDelete = async () => {
        if (window.confirm("Are you sure to delete teacher " + teacherID + "?") == true) {
            const deleteTeacher = await deleteDoc(doc(db, 'Teachers', teacherID))
                .then(() => alert("Delete teacher " + teacherID + " successfully"))
                .catch(err => alert("Failed to delete teacher"));
        }
        
    }


    return (
        <>
            <i class="fa-solid fa-trash" onClick={handleDelete}></i>
        </>
    );
}

export default DeleteTeacher;