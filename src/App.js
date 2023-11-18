import "./App.css";
// import components
import AllPosts from "./pages/AllPosts";
import SinglePost from "./pages/SinglePost";
import Form from "./pages/Form";

// import hooks
import { useState, useEffect } from "react";
// import components from React-Router
import { Route, Routes } from "react-router-dom";

// our API URL
const apiURL = "http://localhost:8000";

function App() {
    ////////////////////////////
    ////// style objects ///////
    ////////////////////////////
    const h1 = {
        textAlign: "center",
        margin: "20px",
        fontFamily: "Courier New, Courier, monospace",
    };

    // set up state for our Posts
    const [posts, setPosts] = useState([]);

    // functions sorta like helper methods
    const getTodos = async () => {
        try {
            const response = await fetch(`${apiURL}/todos/`);
            const data = await response.json();
            console.log(data);
            setPosts(data);
        } catch (error) {
            console.error(error);
        }
    }; // getTodos

    // CREATE A POST
    // handle Form Submission
    const handleFormSubmission = async (data, type) => {
        // if there is an id, we are editing
        // if there is no id, we are creating
        if (type === "new") {
            // if new, we are creating a resource
            const response = await fetch(`${apiURL}/todos/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            getTodos();
        } else {
            console.log('here')
            // this will be where our EDIT fetch goes
            const response = await fetch(`${apiURL}/todos/${data.id}/`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            getTodos();
            // we will need to pass the id of the post we are editing
            // we will need to pass the data we are editing
            // we will need to specify the method as PUT
        }
    };

    const deletePost = async (id) => {
        // this will be where our DELETE fetch goes
        const response = await fetch(`${apiURL}/todos/${id}/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        getTodos();
        // we will need to pass the id of the post we are deleting
        // we will need to specify the method as DELETE
    };

    // useEffect
    useEffect(() => {
        getTodos();
    }, []); // useEffect

    return (
        <div className="App">
            <h1 style={h1}>My Todo List</h1>
            <Routes>
                <Route exact path="/" element={<AllPosts posts={posts} deleteTodo={deletePost} />} />
                {/* for the post/id show route, we would need to useParams to specify which post */}
                <Route exact path="/post/:id" element={<SinglePost posts={posts} />} />
                <Route
                    exact
                    path="/new"
                    element={
                        <Form
                            posts={posts}
                            handleFormSubmission={handleFormSubmission}
                            buttonLabel="Add Todo"
                            formType="new"
                        />
                    }
                />
                <Route
                    exact
                    path="/edit/:id"
                    element={
                        <Form
                            posts={posts}
                            handleFormSubmission={handleFormSubmission}
                            buttonLabel="Edit Todo"
                            formType="edit"
                        />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
