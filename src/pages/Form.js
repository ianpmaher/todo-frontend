import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Form = (props) => {
    
    const navigate = useNavigate();
    const params = useParams();


    // will get current post here for edit
    const currentPost = useMemo(() => props.posts.find((post) => post.id === parseInt(params.id)), [params.id, props.posts]);


    const [formData, setFormData] = useState(
        props.formType === "new" ? {
            subject: "",
            details: "",
        // ELSE STATEMENT
        // if form type is "edit" basically
        } : {
            subject: currentPost.subject,
            details: currentPost.details,
            id: parseInt(currentPost.id)
        }
    );

    // handle change
    const handleChange = (event) => {
        // prevent form refresh
        // event.preventDefault();
        // pass formData to hanbdleFormSubmission
        setFormData((prev) => (
                {
                ...prev,
                [event.target.name]: event.target.value,
            }
        ));
    }; // handleChange
    // handle submit

    const handleSubmission = (event) => {
        // prevent form refresh
        event.preventDefault();
        props.handleFormSubmission(formData, props.formType);
        navigate("/");
    }; // handleSubmit
    return(
        <form onSubmit={handleSubmission}>
            <h3>Subject</h3>              
            <input 
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
            />
            <h3>Details</h3>
            <input 
                type="text"
                name="details"
                value={formData.details}
                onChange={handleChange}
            />
            <input type="submit" value={props.buttonLabel} />
        </form>
    )
}

export default Form;