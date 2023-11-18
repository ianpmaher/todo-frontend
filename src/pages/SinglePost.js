import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

const SinglePost = ({ posts }) => {
    const params = useParams();

    // tracking the ID of which post we are viewing/editing
    const currentPost = useMemo(() => posts.find((post) => post.id === parseInt(params.id)), [params.id, posts]);

    return (
        <div>
            <h1>{currentPost.subject}</h1>
            <h2>{currentPost.details}</h2>
            <Link to={`/edit/${currentPost.id}`}>
                <button>Edit</button>
            </Link>
            <Link to="/">
                <button>Back</button>
            </Link>
        </div>
    );
};

export default SinglePost;
