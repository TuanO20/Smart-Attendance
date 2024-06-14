import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";


function DeleteStudent({studentID}) {
    const handleDelete = async () => {
        //console.log(studentID);
        const deleteStudent = await deleteDoc(doc(db,'Student',studentID))
            .then(() => alert("Delete student " + studentID + " successfully"))
            .catch(err => alert("Failed to delete student"));
    }


    return (
        <>
            <i class="fa-solid fa-trash" onClick={handleDelete}></i>
        </>
    );
}

export default DeleteStudent;