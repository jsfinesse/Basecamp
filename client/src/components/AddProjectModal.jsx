import { useState } from "react";
import { FaList } from "react-icons/fa";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROJECTS } from "../queries/projectQueries";
import { GET_CLIENTS } from "../queries/clientQueries";

export default function AddClientModal() {
    const [state, setState] = useState({
        name: "",
        description: "",
        clientId: "",
        status: "new",
    });

    const { name, description, clientId, status } = state;

    // Get clients for selection
    const { loading, error, data } = useQuery(GET_CLIENTS);

    const onSubmit = (e) => {
        e.preventDefault();

        if (name === "" || description === "" || status === "") {
            return alert("Please do not leave any field empty");
        }

        setState({ name: "", description: "", status: "new" });
    };

    if (loading) return null;
    if (error) return "Something went wrong";

    return (
        <>
            {!loading && !error && (
                <>
                    <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-toggle="modal"
                        data-bs-target="#addProjectModal"
                    >
                        <div className="d-flex align-items-center">
                            <FaList className="icon" />
                            <div>New Project</div>
                        </div>
                    </button>

                    <div
                        className="modal fade"
                        id="addProjectModal"
                        aria-labelledby="addProjectModalLabel"
                        aria-hidden="true"
                    >
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5
                                        className="modal-title"
                                        id="addProjectModalLabel"
                                    >
                                        New Project
                                    </h5>
                                    <button
                                        type="button"
                                        className="btn-close"
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                    ></button>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={onSubmit}>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                value={name}
                                                onChange={(e) =>
                                                    setState({
                                                        ...state,
                                                        name: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Description
                                            </label>
                                            <textarea
                                                className="form-control"
                                                id="description"
                                                value={description}
                                                onChange={(e) =>
                                                    setState({
                                                        ...state,
                                                        description:
                                                            e.target.value,
                                                    })
                                                }
                                            ></textarea>
                                        </div>
                                        <div className="mb-3">
                                            <label className="form-label">
                                                Status
                                            </label>
                                            <select
                                                id="status"
                                                className="form-select"
                                                value={status}
                                                onChange={(e) =>
                                                    setState({
                                                        ...state,
                                                        status: e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="new">
                                                    Not Started
                                                </option>
                                                <option value="progress">
                                                    In Progress
                                                </option>
                                                <option value="completed">
                                                    Completed
                                                </option>
                                            </select>
                                        </div>

                                        <div className="mb-3">
                                            <label className="form-lable">
                                                Client
                                            </label>
                                            <select
                                                id="clientId"
                                                className="form-select"
                                                value={clientId}
                                                onChange={(e) =>
                                                    setState({
                                                        ...state,
                                                        clientId:
                                                            e.target.value,
                                                    })
                                                }
                                            >
                                                <option value="">
                                                    Select Client
                                                </option>
                                                {data.clients.map((client) => (
                                                    <option
                                                        value={client.id}
                                                        key={client.id}
                                                    >
                                                        {client.name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <button
                                            className="btn btn-primary"
                                            type="submit"
                                            data-bs-dismiss="modal"
                                        >
                                            Submit
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
