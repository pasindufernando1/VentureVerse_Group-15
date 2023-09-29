import React, {useEffect, useState} from "react";
import useAxiosMethods from "../../hooks/useAxiosMethods";

import {Header, Input} from "../webcomponent";
import useAuth from "../../hooks/useAuth";

import SockJS from "sockjs-client";
import {over} from "stompjs";

import {Avatar, Typography} from "@material-tailwind/react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEllipsis, faImage, faPaperclip, faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import useData from "../../hooks/useData";

let stompClient = null;

const Inbox = () => {

    const {auth} = useAuth();
    const {data, setData} = useData();
    const {get} = useAxiosMethods();

    const sender = auth.id;

    const [rawData, setRawData] = useState([]);
    const [chats, setChats] = useState(new Map());
    const [rooms, setRooms] = useState([]);
    const [message, setMessage] = useState("");
    const [currentRoom, setCurrentRoom] = useState(null);

    useEffect(() => {

        console.log("1");

        let socket = new SockJS('http://localhost:8080/api/auth/ws');
        stompClient = over(socket);
        stompClient.connect({}, onConnected, onError);

        get(`/user/chat/${auth?.id}`, setRawData);


    }, []);

    useEffect(() => {

        if (rawData.length === 0) return;

        console.log("2");

        let room = []
        let roomOwner = null;
        let name = "";

        rawData?.map(deserializing);

        function deserializing(data) {

            data?.sender.id === auth?.id ? roomOwner = data?.receiver : roomOwner = data?.sender;

            if (!isExist(rooms, roomOwner?.id)) {

                if (roomOwner?.role === "ENTERPRISE_INVESTOR") {
                    name = roomOwner?.businessName;
                } else {
                    name = roomOwner?.firstname + " " + roomOwner?.lastname;
                }

                room = {
                    id: roomOwner?.id,
                    name: name,
                    image: roomOwner?.profileImage,
                    lastSeen: "Last Seen 12.20 A.M.",
                    lastMessageDate: "Today",
                    lastMessage: "Hello"
                };
            }

            let dataPacket = {
                sender: data?.sender?.id,
                receiver: data?.receiver?.id,
                message: data?.message,
                time: data?.timestamp,
                type: "MESSAGE"
            }

            updateChats(roomOwner?.id, dataPacket);

            setRooms((prev => [...prev, room]))

        }

        return () => {
            console.log("Disconnecting");
        }

    }, [rawData]);

    useEffect(() => {}, [chats]);

    useEffect(() => {
        if (data === null || rooms.length === 0) return;

        console.log("4");

        if (data?.id) {
            console.log("Not Null", rooms);
            if (isExist(rooms, data?.id)) {
                console.log("Exist");
                setCurrentRoom([data?.id, rooms.findIndex(room => room.id === data?.id)]);
            } else {
                let room = {
                    id: data?.id,
                    name: data?.name,
                    image: data?.profileImage,
                    lastSeen: "Last Seen 12.20 A.M.",
                    lastMessageDate: "Today",
                    lastMessage: "Hello"
                }

                setRooms([...rooms, room]);

                updateChats( data?.id, {});

                setData(null);
            }

        }
    }, [rooms]);

    const onConnected = () => {
        stompClient.subscribe('/user/' + sender + '/private', onMessageReceived);
    }

    const onError = () => {
        console.log("Error Connecting to Websocket");
    }

    const onMessageReceived = (payload) => {
        let dataPacket = JSON.parse(payload.body);
        updateChats(Number(dataPacket.sender), dataPacket);
    }

    const onSendMessage = (event) => {

        event.preventDefault();

        //Timestamp
        let timestamp = new Date();

        let dataPacket = {sender: sender, receiver: currentRoom[0], message: message, time: timestamp, type: 'MESSAGE'};

        updateChats(currentRoom[0], dataPacket);

        if (stompClient && message !== '') {
            stompClient.send("/app/message", {}, JSON.stringify(dataPacket));
            setMessage('');
        }

    }

    const updateChats = (id, dataPacket) => {
        if (chats.get(id)) {
            chats.get(id,).push(dataPacket);
        } else {
            let list = [];
            list.push(dataPacket);
            chats.set(id, list);
        }

        setChats(new Map(chats));
    }

    const deserializeTimestamp = (timestamp) => {
        let date = new Date(timestamp);
        return date.getHours() + ":" + date.getMinutes() + " " + (date.getHours() >= 12 ? "PM" : "AM");
    }

    const isExist = (rooms, id) => {

        let flag = false;

        if (rooms.length === 0) {
            return false;
        }

        rooms?.map(check);

        function check(room) {
            if (room.id === id) {
                flag = true;
            }
        }

        return flag;
    }

    return (
        <Header active="Inbox">
            <div className="flex flex-row min-h-full min-w-full bg-white rounded-lg border-[1px]">
                <div className="w-[25%] border-r-[1px] relative overflow-hidden overflow-y-scroll container">
                    <div className="bg-white flex p-4 justify-between items-center sticky top-0 z-[1000]">
                        <Typography variant="h6">Message</Typography>
                        <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer"/>
                    </div>
                    <div className="w-full absolute">
                        {
                            rooms.map((room, index) => (
                                <div
                                    className={`p-4 pb-0 hover:bg-light-purple/20 ${currentRoom === room.id ? "bg-light-purple/20" : ""}`}
                                    onClick={() => setCurrentRoom([room.id, index])} key={index}>
                                    <div
                                        className="flex items-center justify-center gap-4 w-full cursor-pointer">
                                        <Avatar
                                            src={`assets/images/user/${room.image}`}
                                            alt="avatar"
                                            size="sm"
                                        />
                                        <div className="hidden lg:block w-full">
                                            <div className="flex justify-between items-center">
                                                <Typography variant="h6">{room.name}</Typography>
                                                <Typography variant="small"
                                                            className="text-main-gray/60 font-normal hidden lg:block">
                                                    {room.lastMessageDate}
                                                </Typography>
                                            </div>
                                            <Typography variant="small"
                                                        className="text-main-gray/60 font-normal hidden lg:block w-full">
                                                {room.lastMessage}
                                            </Typography>
                                        </div>
                                    </div>
                                    <hr className="mt-4 border-blue-gray-50"/>
                                </div>

                            ))
                        }
                    </div>
                </div>
                <div className="w-[75%] flex flex-col">
                    {
                        currentRoom !== null
                            ? <>
                                <div
                                    className="flex flex-row justify-between items-center border-b-[1px] p-4 bg-white sticky top-0 z-[1000]">
                                    <div className="flex w-full px-[1rem] justify-between items-center">
                                        <div className="flex items-center justify-center gap-4 w-full cursor-pointer">
                                            <Avatar
                                                src={`assets/images/user/${rooms[currentRoom[1]].image}`}
                                                alt="avatar"
                                            />
                                            <div className="w-full">
                                                <Typography variant="h6">{rooms[currentRoom[1]].name}</Typography>
                                                <Typography variant="small"
                                                            className="text-main-gray/60 font-normal">
                                                    {rooms[currentRoom[1]].lastSeen}
                                                </Typography>
                                            </div>
                                        </div>
                                        <FontAwesomeIcon icon={faEllipsis} className="cursor-pointer"/>
                                    </div>
                                </div>
                                <div className="relative h-full overflow-y-scroll container">
                                    <div className="w-full absolute">
                                        <div className="flex flex-col gap-[0.5rem] p-4">
                                            {
                                                //Skip if message from map is empty
                                                [...chats.get(currentRoom[0])].filter((message) => Object.keys(message).length !== 0).map((message, index) => (
                                                    <div
                                                        className={`flex flex-row gap-4 items-center ${message.sender === sender ? "justify-end" : ""}`}
                                                        key={index}>
                                                        <div
                                                            className={`flex flex-row gap-[1rem] p-[0.7rem] ${message.sender === sender ? "bg-light-purple/30 rounded-xl rounded-br-none" : "bg-light-purple/10 rounded-xl rounded-tl-none"}`}>
                                                            <Typography
                                                                className="text-black text-[1rem] font-[300]">{message.message}</Typography>
                                                            <Typography
                                                                className={`inline-flex items-end text-black text-[0.5rem] font-[300]`}>{deserializeTimestamp(message.time)}</Typography>
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-row justify-end items-center bg-white w-full p-4 gap-1 relative border-t-[1px]">
                                    <div className="flex flex-row items-center w-full border rounded-full h-12 px-2">
                                        <div className="w-full">
                                            <Input
                                                type="text"
                                                label="hidden"
                                                className="border-none w-full focus:outline-none text-sm h-10 flex items-center p-4"
                                                value={message}
                                                onInput={(event) => {
                                                    setMessage(event.target.value.trim());
                                                }}
                                            />
                                        </div>
                                        <div className="flex flex-row">
                                            <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                                                <FontAwesomeIcon icon={faPaperclip} className="w-5 h-5"/>
                                            </button>
                                            <button
                                                className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                                                <FontAwesomeIcon icon={faImage} className="w-5 h-5"/>
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        className="flex items-center justify-center h-11 w-11 rounded-full bg-gray-200 hover:bg-main-purple text-main-purple hover:text-white"
                                        onClick={(event) => onSendMessage(event)}
                                    >
                                        <FontAwesomeIcon icon={faPaperPlane} className="w-5 h-5"/>
                                    </button>
                                </div>
                            </>
                            : null
                    }
                </div>
            </div>
        </Header>
    );
}

export default Inbox;