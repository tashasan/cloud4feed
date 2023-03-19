import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
import Card from "../components/Card/Card";
import Input from "../components/Input/Input";
import Modal from "../components/Modal/Modal";
import Actions from "../store/actions";
import { ButtonType } from "../utils/ComponentEnums";

export default function Users() {
    const dispatch = useDispatch();
    const [isModal, setModal] = useState(false);
    const users = useSelector((e) => e.users.getAll);
    const getUserById = useSelector((e) => [e.users.getById]);
    const [updateData, setUpdateData] = useState({})
    const [selectedUserId, setSelectedUserId] = useState(null)
    const checkData = Object.keys(updateData).length === 1;

    const onUpdate = (id) => {
        dispatch(Actions.usersActions.getByIdAction(id));
        setSelectedUserId(id);
        setModal(true);
    };
    function name() {
        let arr = getUserById[0]
        const keys = ["id"];
        keys.map((e) => delete getUserById[0][e]);
        setUpdateData(arr)
    }
    const onDelete = (id) => {
        setModal(true);
        setSelectedUserId(id);
        dispatch(Actions.usersActions.removeAction(id))
    };
    const onFocus = (e) => {
        e.preventDefault();
        name();
    }
    const onDetails = (id) => {
    };
    const onSaveChanges = () => {
        dispatch(Actions.usersActions.updateAction(updateData, selectedUserId))
        setUpdateData({})
        GetLists();
        setModal(false)
    }
    const onChangeText = (e) => {
        e.preventDefault();
        const { id, value } = e.target;
        setUpdateData({ ...getUserById[0], [id]: value })
    }
    function GetLists() {
        dispatch(Actions.usersActions.getAllAction());
    };
    useEffect(() => {
        GetLists();
    }, []);
    // const sortedArr = users.sort((a, b) => a.id - b.id);
    // // console.log(sortedArr)
    return (
        <div className="container-fluid">
            {users.map((value, index) => (<div className="row mt-2 mb-3">
                <div className="col-2"></div>
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
                                                    onClick={() => onUpdate(value.id)}
                                                />
                                            </div>
                                            <div className="col">
                                                <Button
                                                    text={"Delete"}
                                                    type={ButtonType.Danger}
                                                    onClick={() => onDelete(value.id)}
                                                />
                                            </div>
                                            <div className="col">
                                                <Button
                                                    text={"Details"}
                                                    type={ButtonType.Info}
                                                    onClick={() => onDetails(value.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    />
                </div>
                <div className="col-2 mt-5">
                    <Button
                        text={"Add New User"}
                        type={ButtonType.Success}
                    />
                </div>
            </div>))}
            <Modal
                isVisible={isModal}
                title={`Selected User ID: ${selectedUserId}`}
                onClose={() => setModal(false)}
                onSaveChanges={onSaveChanges}
                content={getUserById.map((value, index) =>
                (<div className="col-12">
                    <div className="row">
                        <div className="col-1">
                            <label className="fw-bold mt-3 ms-1">Name:</label>
                        </div>
                        <div className="col-10 ms-4">
                            <Input
                                id={"name"}
                                placeholder={value.name}
                                key={value.id + index}
                                onChange={onChangeText}
                                onFocus={onFocus}
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
                                placeholder={value.email}
                                key={value.id + index}
                                onChange={onChangeText}
                                onFocus={onFocus}
                                value={checkData ? getUserById[0].email : updateData.email}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <label className="fw-bold mt-3 ms-1">Gender:</label>
                        </div>
                        <div className="col-10 ms-4">
                            <Input
                                id={"gender"}
                                placeholder={value.gender}
                                key={value.id + index}
                                onChange={onChangeText}
                                onFocus={onFocus}
                                value={checkData ? getUserById[0].gender : updateData.gender}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-1">
                            <label className="fw-bold mt-3 ms-1">Status:</label>
                        </div>
                        <div className="col-10 ms-4">
                            <Input
                                id={"status"}
                                placeholder={value.status}
                                key={value.id + index}
                                onChange={onChangeText}
                                onFocus={onFocus}
                                value={checkData ? getUserById[0].status : updateData.status}
                            />
                        </div>
                    </div>
                </div>))}
            />
        </div>
    )
}
