'use client'
import {FiShare} from 'react-icons/fi'
import {IoStatsChart} from 'react-icons/io5'
import {AiOutlineHeart} from 'react-icons/ai'
import {FaRetweet} from 'react-icons/fa'
import {FaRegComment} from 'react-icons/fa'
import {AiFillDelete} from 'react-icons/ai'
import { useEffect ,useState } from 'react'
import { collection,deleteDoc,doc,onSnapshot,setDoc,} from "firebase/firestore";
import { db } from '../../firebase'
import {AiFillHeart} from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import { useDispatch, useSelector } from 'react-redux';
import {toggle} from '../store/commentSlice'
import Link from 'next/link'
import { add } from '@/store/userSlice'

const Post = ({userImg ,name ,username,text ,time , id ,img}) => {

  const {data : session} = useSession()

  const isOpen = useSelector((state) => state.comment.isOpen)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);
  const [postId , setPostId] = useState()
  const [comments , setComments] = useState()

  useEffect(() => {
    if(id){
      const unsubscribe = onSnapshot(
        collection(db, "posts", id, "likes"),
        (snapshot) => setLikes(snapshot.docs)
      );
    }
  }, [db]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user.uid) !== -1
    );
  }, [likes]);

  useEffect(() => {
    if(id) {
      const unsubscribe = onSnapshot(
        collection(db, "posts", id, "comments"),
        (snapshot) => setComments(snapshot.docs)
      );
    }
  }, [db]);

  async function likePost() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(doc(db, "posts", id, "likes", session?.user.uid));
      } else {
        await setDoc(doc(db, "posts", id, "likes", session?.user.uid), {
          username: session.user.username,
        });
      }
    }
  }

  const deletePost = () => {
        const delRef = doc(db,'posts',id)
        deleteDoc(delRef)
        .then(() => {
          console.log("Document deleted")
        })
      }
      const handleToggle = () => {
        dispatch(toggle());
        dispatch(add({userImg ,username ,id , name}))
      };

  return (
    <div className="flex p-3 cursor-pointer border-b border-gray-600">6
      <img
        className="h-11 w-11 rounded-full mr-4"
        src={userImg}
        alt="user-img"
      />
      <div className="">
        <Link href={`/posts/${id}`} >
        <div className="flex text-white items-center justify-between">
          <div className="flex items-center space-x-1 whitespace-nowrap">
            <h4 className="font-bold text-[15px] sm:text-[16px] hover:underline">
              {name}
            </h4>
            <span className="text-sm sm:text-[15px]">@{username} . </span>
            {time && <span className="text-sm sm:text-[15px] hover:underline">
              {time}
            </span>}
          </div>
          {session && (
            <button onClick={() => deletePost()}>
            <AiFillDelete
            className="h-10 hoverEffect w-10  hover:bg-sky-100 hover:text-sky-500 p-2" />
            </button>
          )}
          
         
        </div>
        <p className=" text-white text-[15px sm:text-[16px] mb-2">
          {text}
        </p>
        </Link>

        <img className="rounded-2xl mr-2" src={img} alt="" />


        <div className="flex justify-between text-gray-500 p-2">
          {session ?(
           <button
           className="flex items-center select-none"
            onClick={
             () => { setPostId(id);handleToggle()}}
           >
           <FaRegComment className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
           </button>) :
           (
           <Link href='/login'><FaRegComment className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" /></Link>)
          }
          {comments?.length > 0 && (
              <span className="text-sm">{comments?.length}</span>
            )}
          
          
          <FaRetweet className="h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-red-100" />
          <div className="flex items-center">
            {hasLiked ? (
              <AiFillHeart
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
              />
            ) : (
              <AiOutlineHeart
                onClick={likePost}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            {likes.length > 0 && (
              <span
                className={`${hasLiked && "text-red-600"} text-sm select-none`}
              >
                {" "}
                {likes.length}
              </span>
            )}
          </div>
          <div
          >  
          <IoStatsChart
           className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
          <FiShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
        </div>
      </div>
    </div>
  )
}

export default Post