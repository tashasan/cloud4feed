import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import Pagination from "../components/Pagination/Pagination";
import Table from "../components/Table/Table";
import Actions from "../store/actions";
import { ButtonType, InputType } from "../utils/ComponentEnums";

export default function Users() {
    const dispatch = useDispatch();
    const [isModal, setModal] = useState(false);
    const users = useSelector((e) => e.users.getAll);
    const getUserById = useSelector((e) => [e.users.getById]);
    const getTodos = useSelector((e) => e.todos.getAll);
    const [createData, setCreateData] = useState({});
    const [updateData, setUpdateData] = useState({});
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [content, setContent] = useState(null);
    const [todoData, setTodoData] = useState({});
    const checkData = Object.keys(updateData).length === 0;
    const [itemPerPage, setItemPerPage] = useState(10);
    let token = window.localStorage.getItem("token");

    let totalItem = window.localStorage.getItem("page");
    const onUpdate = (id) => {
        dispatch(Actions.usersActions.getByIdAction(id));
        setSelectedUserId(id);
        setModal(true);
    };
    const onDelete = (id) => {
        setModal(true);
        setSelectedUserId(id);
    };
    const onDeleteAction = async () => {
        await dispatch(Actions.usersActions.removeAction(selectedUserId));
        GetLists();
        setModal(false);
    };
    const onDetails = (id) => {
        setModal(true);
        setSelectedUserId(id);
        dispatch(Actions.todosActions.getAllAction(id));
    };
    const onSaveChanges = async () => {
        if (content === "Add Todos") {
            await dispatch(Actions.todosActions.createAction(selectedUserId, todoData));
            await dispatch(Actions.todosActions.getAllAction(selectedUserId));
            setContent("Details");
            setModal(true);
            setTodoData({});
        }
        else if (content === "Add Users") {
            await dispatch(Actions.usersActions.createAction(createData));
            await dispatch(Actions.usersActions.getAllPaginateAction(1, itemPerPage));
            setContent(null);
            setCreateData({});
            setModal(false);
        }
        else {
            await dispatch(Actions.usersActions.updateAction(updateData, selectedUserId));
            setUpdateData({});
            GetLists();
            setModal(false);
        }
    };
    const onChangeText = (e) => {
        e.preventDefault();
        const { id, value, title } = e.target;
        if (title === "todos") {
            setTodoData({ ...todoData, [id]: value })
        }
        if (title === "users") {
            setCreateData({ ...createData, [id]: value })
        }
        if (Object.keys(updateData).length === 0) {

            setUpdateData({ ...getUserById[0], [id]: value })
        }
        else {
            setUpdateData({ ...updateData, [id]: value })
        }
    };
    const handleOptionChange = (e) => {
        const { id, value, title } = e.target;
        if (title === "users") {
            setCreateData({ ...createData, [id]: value })
        }
        if (title === "todos") {
            setTodoData({ ...todoData, [id]: value })
        }
        if (Object.keys(updateData).length === 0) {

            setUpdateData({ ...getUserById[0], [id]: value })
        }
        else {
            setUpdateData({ ...updateData, [id]: value })
        }
    };
    function GetLists() {
        dispatch(Actions.usersActions.getAllAction());
    };
    useEffect(() => {
        if (token !== null) {
            GetLists();
        }
    }, []);
    const renderContent = (<div className="container-fluid">
        <div className="d-flex justify-content-center mt-5">
            <div className="col-2 ">
                <Button
                    text={"Add New User"}
                    type={ButtonType.Success}
                    onClick={() => { setModal(true); setContent("Add Users"); }}
                />
            </div>
        </div>
        {users.map((value, index) => (<div className="row mb-3">
            <div className="col-3"></div>
            <div className="col-6 mt-5">
                <Card
                    key={value.id + index}
                    borderColor={"border-info"}
                    body={
                        <>
                            <div className="row d-flex justify-content-center align-items-center">
                                <div className="col-9">
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Name:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                placeholder={value.name}
                                                disable
                                                key={value.id + index}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Email:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                placeholder={value.email}
                                                disable
                                                key={value.id + index}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Gender:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                placeholder={value.gender}
                                                disable
                                                key={value.id + index}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">ID:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                placeholder={value.id}
                                                disable
                                                key={value.id + index}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Status:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                placeholder={value.status}
                                                disable
                                                key={value.id + index}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5 mt-4">
                                    <div className="row">
                                        <div className="col">
                                            <Button
                                                text={"Update"}
                                                type={ButtonType.Warning}
                                                onClick={() => { onUpdate(value.id); setContent("Update"); }}
                                            />
                                        </div>
                                        <div className="col">
                                            <Button
                                                text={"Delete"}
                                                type={ButtonType.Danger}
                                                onClick={() => { onDelete(value.id); setContent("Delete"); }}
                                            />
                                        </div>
                                        <div className="col">
                                            <Button
                                                text={"Details"}
                                                type={ButtonType.Info}
                                                onClick={() => { onDetails(value.id); setContent("Details"); }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                />
            </div>
        </div>))}
        <Modal
            isVisible={isModal}
            title={selectedUserId !== null ? `Selected User ID: ${selectedUserId}` : undefined}
            onClose={() => { setModal(false); setUpdateData({}); setSelectedUserId(null); }}
            onSaveChanges={onSaveChanges}
            content={
                content === "Update" ?
                    getUserById.map((value, index) =>
                    (<div className="col-12">
                        <div className="row">
                            <div className="col-1">
                                <label className="fw-bold mt-3 ms-1">Name:</label>
                            </div>
                            <div className="col-10 ms-4">
                                <Input
                                    id={"name"}
                                    inputType={InputType.Text}
                                    placeholder={value.name}
                                    key={value.id + index}
                                    onChange={onChangeText}
                                    value={checkData ? getUserById[0].name : updateData.name}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <label className="fw-bold mt-3 ms-1">Email:</label>
                            </div>
                            <div className="col-10 ms-4">
                                <Input
                                    id={"email"}
                                    inputType={InputType.Email}
                                    placeholder={value.email}
                                    key={value.id + index}
                                    onChange={onChangeText}
                                    value={checkData ? getUserById[0].email : updateData.email}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <label className="fw-bold mt-3 ms-1">Gender:</label>
                            </div>
                            <div className="col-10 ms-4 d-flex align-items-center">
                                <label>
                                    <Input
                                        id={"gender"}
                                        value={"female"}
                                        checked={checkData ? getUserById[0].gender === "female" : updateData.gender === "female"}
                                        inputType={InputType.Radio}
                                        onChange={handleOptionChange}
                                    />
                                    Female
                                </label>
                                <label className="ms-5">
                                    <Input
                                        id={"gender"}
                                        value={"male"}
                                        checked={checkData ? getUserById[0].gender === "male" : updateData.gender === "male"}
                                        inputType={InputType.Radio}
                                        onChange={handleOptionChange}
                                    />
                                    Male
                                </label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-1">
                                <label className="fw-bold mt-3 ms-1">Status:</label>
                            </div>
                            <div className="col-10 ms-4 d-flex align-items-center">
                                <label>
                                    <Input
                                        id={"status"}
                                        value={"active"}
                                        checked={checkData ? getUserById[0].status === "active" : updateData.status === "active"}
                                        inputType={InputType.Radio}
                                        onChange={handleOptionChange}
                                    />
                                    Active
                                </label>
                                <label className="ms-5">
                                    <Input
                                        id={"status"}
                                        value={"inactive"}
                                        checked={checkData ? getUserById[0].status === "inactive" : updateData.status === "inactive"}
                                        inputType={InputType.Radio}
                                        onChange={handleOptionChange}
                                    />
                                    Inactive
                                </label>

                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-4"></div>
                            <div className="col-5">
                                <Button
                                    text={"Save Changes"}
                                    onClick={onSaveChanges}
                                    type={ButtonType.Primary}
                                />
                            </div>
                        </div>
                    </div>))
                    : content === "Delete" ?
                        <>
                            <div className="row mb-3">
                                <div className="col-4"></div>
                                <div className="col-4">
                                    <label className="fw-bold mt-3">{"Are you sure?"}</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3 ms-4"></div>
                                <div className="col-4">
                                    <Button
                                        text={"Delete"}
                                        onClick={onDeleteAction}
                                        outline
                                        type={ButtonType.Danger}
                                    />
                                </div>
                            </div>


                        </>
                        : content === "Details" ?
                            <div className="col-12">
                                <div className="row">
                                    <Table
                                        propertyNames={["Id", "User Id", "Title", "Due On", "Status"]}
                                        data={getTodos}
                                    />
                                </div>
                                <div className="row mt-3">
                                    <div className="col-3 ms-4"></div>
                                    <div className="col-5">
                                        <Button
                                            text={"Add New Todos"}
                                            onClick={() => { setContent("Add Todos"); }}
                                            type={ButtonType.Success}
                                        />
                                    </div>
                                </div>
                            </div>
                            : content === "Add Todos" ?
                                <div className="col-12">
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Title:</label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                id={"title"}
                                                title={"todos"}
                                                inputType={InputType.Text}
                                                onChange={onChangeText}
                                                value={todoData.title || ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Due On:
                                            </label>
                                        </div>
                                        <div className="col-10 ms-4">
                                            <Input
                                                id={"due_on"}
                                                title={"todos"}
                                                onChange={onChangeText}
                                                inputType={InputType.Date}
                                                value={todoData.due_on || ""}
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-1">
                                            <label className="fw-bold mt-3 ms-1">Status:</label>
                                        </div>
                                        <div className="col-10 ms-4 d-flex align-items-center">
                                            <label>
                                                <Input
                                                    id={"status"}
                                                    title={"todos"}
                                                    value={"pending"}
                                                    checked={todoData.status === "pending"}
                                                    inputType={InputType.Radio}
                                                    onChange={handleOptionChange}
                                                />
                                                Pending
                                            </label>
                                            <label className="ms-5">
                                                <Input
                                                    id={"status"}
                                                    title={"todos"}
                                                    value={"completed"}
                                                    checked={todoData.status === "completed"}
                                                    inputType={InputType.Radio}
                                                    onChange={handleOptionChange}
                                                />
                                                Completed
                                            </label>

                                        </div>
                                    </div>
                                    <div className="row mt-3">
                                        <div className="col-4"></div>
                                        <div className="col-5">
                                            <Button
                                                text={"Save Changes"}
                                                onClick={onSaveChanges}
                                                type={ButtonType.Primary}
                                            />
                                        </div>
                                    </div>
                                </div>
                                : content === "Add Users" ?
                                    <div className="col-12">
                                        <div className="row">
                                            <div className="col-1">
                                                <label className="fw-bold mt-3 ms-1">Name:</label>
                                            </div>
                                            <div className="col-10 ms-4">
                                                <Input
                                                    id={"name"}
                                                    title={"users"}
                                                    inputType={InputType.Text}
                                                    onChange={onChangeText}
                                                    value={createData.name || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1">
                                                <label className="fw-bold mt-3 ms-1">Email:</label>
                                            </div>
                                            <div className="col-10 ms-4">
                                                <Input
                                                    id={"email"}
                                                    title={"users"}
                                                    inputType={InputType.Email}
                                                    onChange={onChangeText}
                                                    value={createData.email || ""}
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1">
                                                <label className="fw-bold mt-3 ms-1">Gender:</label>
                                            </div>
                                            <div className="col-10 ms-4 d-flex align-items-center">
                                                <label>
                                                    <Input
                                                        id={"gender"}
                                                        title={"users"}
                                                        value={"female"}
                                                        checked={createData.gender === "female"}
                                                        inputType={InputType.Radio}
                                                        onChange={handleOptionChange}
                                                    />
                                                    Female
                                                </label>
                                                <label className="ms-5">
                                                    <Input
                                                        id={"gender"}
                                                        title={"users"}
                                                        value={"male"}
                                                        checked={createData.gender === "male"}
                                                        inputType={InputType.Radio}
                                                        onChange={handleOptionChange}
                                                    />
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-1">
                                                <label className="fw-bold mt-3 ms-1">Status:</label>
                                            </div>
                                            <div className="col-10 ms-4 d-flex align-items-center">
                                                <label>
                                                    <Input
                                                        id={"status"}
                                                        title={"users"}
                                                        value={"active"}
                                                        checked={createData.status === "active"}
                                                        inputType={InputType.Radio}
                                                        onChange={handleOptionChange}
                                                    />
                                                    Active
                                                </label>
                                                <label className="ms-5">
                                                    <Input
                                                        id={"status"}
                                                        title={"users"}
                                                        value={"inactive"}
                                                        checked={createData.status === "inactive"}
                                                        inputType={InputType.Radio}
                                                        onChange={handleOptionChange}
                                                    />
                                                    Inactive
                                                </label>

                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-4"></div>
                                            <div className="col-5">
                                                <Button
                                                    text={"Save Changes"}
                                                    onClick={onSaveChanges}
                                                    type={ButtonType.Primary}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    : undefined
            }
        />
        <div className="d-flex justify-content-center">
            <Pagination
                totalItems={totalItem}
                itemsPerPage={itemPerPage}
                paginate={(data) => { dispatch(Actions.usersActions.getAllPaginateAction(data, itemPerPage)) }}
            />
        </div>
    </div>)
    return (
        token === null ? <Navigate to={"/consumer/login"} /> :
            renderContent
    )
}
