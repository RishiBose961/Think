import React, { useContext, useEffect, useRef, useState } from 'react'
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import Conversion from '../chonversion/Conversion';
import Message from './Message';
import SendIcon from '@mui/icons-material/Send';
import ChatOnline from '../chatOnline/ChatOnline';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios'
import { io } from 'socket.io-client'

const Chatapp = () => {

    const [conversation, setConversation] = useState([])
    const [currentChat, setCurrentChat] = useState()
    const [message, setMessage] = useState([])
    const [newMessage, setnewMessage] = useState("")
    const [arrivalMessage, setarrivalMessage] = useState()
    const [onlineUsers, setonlineUsers] = useState()

    const socket = useRef(io("ws://localhost:8900"))
    const { user } = useContext(AuthContext)
    const scrollRef = useRef()
    // console.log(user);
    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", data => {
            setarrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) &&
            setMessage((prev) => [...prev, arrivalMessage])
    }, [arrivalMessage, currentChat])



    useEffect(() => {
        socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setonlineUsers(user.following.filter((f) => users.some((u) => u.userId === f)));
        })
    }, [user])

    // console.log(socket);



    useEffect(() => {
        const getConversation = async () => {
            try {
                const res = await axios.get("/api/conversations/" + user._id)
                setConversation(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getConversation()
    }, [user._id])


    useEffect(() => {
        const getMessage = async () => {
            try {
                const res = await axios.get("/api/messages/" + currentChat?._id);
                setMessage(res.data);
            } catch (error) {
                console.log(error);
            }
        }
        getMessage()
    }, [currentChat])


    // console.log(message);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const messages = {
            sender: user._id,
            text: newMessage,
            coversationId: currentChat._id
        }
        const receiverId = currentChat.members.find(member => member !== user._id)

        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage
        })

        try {
            const res = await axios.post("/api/message", messages);
            setMessage([...message, res.data]);
            setnewMessage("")
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [message])


    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-3">
                <div className="col-span-2 ...">
                    {
                        currentChat ? <>
                            {
                                message.map((m) => {
                                    return (
                                        <div ref={scrollRef}>
                                            <Message messages={m} own={m.sender === user._id} />
                                        </div>
                                    )
                                })
                            }


                            <div className='bottom-3 fixed flex items-center'>
                                <div className="bg-gray-300 rounded-full h-8 w-full flex justify-between">
                                    <input type="text" placeholder='Say Hello'
                                        className='outline-none w-[316px] lg:w-[956px] bg-transparent 
                                text-lg mx-4 placeholder-slate-600'
                                        onChange={(e) => setnewMessage(e.target.value)}
                                        value={newMessage}
                                    />
                                </div>
                                <button className='mx-2 bg-amber-400 rounded-xl w-10 h-8' onClick={handleSubmit}><SendIcon /></button>
                            </div>
                        </> : <span>Open a Conversation</span>
                    }
                </div>
                <div className="...">
                    <div>
                        <div className="bg-gray-300 rounded-full h-8 w-full flex justify-between">
                            <PersonSearchIcon className='mt-1 ml-3' />
                            <input type="text" placeholder='Seacrch Your Friend'
                                className='outline-none w-[456px] bg-transparent text-lg mx-4 placeholder-slate-600' />
                        </div>

                        <div>
                        <p>Your Online </p>
                            {
                                conversation.map((item) => {
                                    return (
                                        <div onClick={() => setCurrentChat(item)}>
                                            <Conversion conversations={item} currentUser={user} />
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                    {/* <div className="...">
                        online
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Chatapp