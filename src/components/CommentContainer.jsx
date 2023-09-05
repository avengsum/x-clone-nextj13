'use client'
import {addDoc,collection,doc,onSnapshot,serverTimestamp} from "firebase/firestore";
import {ImCross} from 'react-icons/im'
import {BiSmile} from 'react-icons/bi'
import {BiPoll} from 'react-icons/bi'
import {AiOutlineGif} from 'react-icons/ai'
import {MdPermMedia} from 'react-icons/md'
import { useState , useEffect, use} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../../firebase'
import { toggle } from "@/store/commentSlice";
import Modal from 'react-modal';
import Link from 'next/link';


export default function CommentContainer() {
  const isOpen = useSelector((state) => state.comment.isOpen);
  const [post, setPost] = useState({});
  const [input, setInput] = useState("");
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.id) {
      const userDocRef = doc(db, 'posts', user.id);

      const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
        if (snapshot.exists()) {
          setPost(snapshot.data());
        } else {
          setPost(null);
        }
      });

      return () => {
        unsubscribe();
      };
    }
  }, [user]);

  async function sendComment() {
    if (user && user.id) {
      await addDoc(collection(db, "posts", user.id, "comments"), {
        comment: input,
        name: user.name,
        username: user.username,
        userImg: user.userImg,
        timestamp: serverTimestamp(),
        userId: user.id,
      });
      setInput("");
      dispatch(toggle());
    }
  }
    

  return (
  <div>
      {isOpen && (
        <Modal
        isOpen={isOpen}
        onRequestClose={() => dispatch(toggle())}
        className="max-w-lg w-[90%]  absolute top-24 left-[50%] translate-x-[-50%] bg-black border-2 border-gray-600 rounded-xl shadow-md"
      >
          <div className="p-1">
            <div className="border-b border-gray-600 py-2 px-1.5">
              <div
                className="hoverEffect w-10 h-10 flex items-center justify-center"
              >
                <ImCross 
                onClick= {() => dispatch(toggle())}
                className="h-[23px] text-white " />
              </div>
            </div>
            <div className="p-2 flex items-center space-x-1 relative">
              <span className="w-0.5 h-full z-[-1] absolute left-8 top-11 bg-gray-600" />
              <img
                className="h-11 w-11 rounded-full mr-4"
                src={post?.userImg}
                alt="user-img"
              />
              <h4 className="font-bold  text-white text-[15px] sm:text-[16px] hover:underline">
                {post?.name}
              </h4>
              <span className="text-sm text-white sm:text-[15px]">
                @{post?.username} -{" "}
              </span>
            </div>
            <p className=" text-white text-[15px] sm:text-[16px] ml-16 mb-2">
              {post?.text}
            </p>

            <div className="flex  p-3 space-x-3">
              <img
                src={user.userImg}
                alt="user-img"
                className="h-11 w-11 rounded-full cursor-pointer hover:brightness-95"
              />
              <div className="w-full divide-y divide-gray-600">
                <div className="">
                  <textarea
                    className="w-full border-none bg-black text-white focus:ring-0 text-lg placeholder-gray-600 tracking-wide min-h-[50px]"
                    rows={2}
                    placeholder="Post your reply"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="flex items-center justify-between pt-2.5">
                  <div className="flex">
                    <div
                    >
                      <MdPermMedia className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    </div>
                    <BiSmile className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    <BiPoll className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                    <AiOutlineGif className="h-10 w-10 hoverEffect p-2 text-sky-500 hover:bg-sky-100" />
                  </div>
                  <Link href={`/posts/${user?.id}`}>
                  <button
                    onClick={() => sendComment()}
                    className="bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:brightness-95 disabled:opacity-50"
                  >
                    Reply
                  </button>
                  </Link>
                  
                </div>
              </div>
              </div>
            </div>
        </Modal>
      )}
    </div>


  )
}
