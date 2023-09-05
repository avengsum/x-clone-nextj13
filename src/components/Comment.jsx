import { collection, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from '../../firebase';
import { useSession } from 'next-auth/react';
import { AiFillDelete, AiOutlineHeart } from 'react-icons/ai';
import { FaRegComment } from 'react-icons/fa';
import { FiShare } from 'react-icons/fi';
import { IoStatsChart } from 'react-icons/io5';

export default function Comment({comment,commentId,originalPostId,}) {
  const { data: session } = useSession();
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "posts", originalPostId, "comments", commentId, "likes"),
      (snapshot) => setLikes(snapshot.docs)
    );

    return () => {
      unsubscribe();
    };
  }, [db, originalPostId, commentId]);

  useEffect(() => {
    setHasLiked(likes.findIndex((like) => like.id === session?.user?.uid) !== -1);
  }, [likes, session]);

  async function likeComment() {
    if (session) {
      if (hasLiked) {
        await deleteDoc(
          doc(
            db,
            "posts",
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          )
        );
      } else {
        await setDoc(
          doc(
            db,
            'posts',
            originalPostId,
            "comments",
            commentId,
            "likes",
            session?.user?.uid
          ),
          {
            username: session?.user?.username,
          }
        );
      }
    }
  }

  async function deleteComment() {
    deleteDoc(doc(db, "posts", originalPostId, "comments", commentId))
  }
  
    return (
      <div className="flex p-3 cursor-pointer border-b border-gray-600 pl-20">
        <img
          className="h-11 w-11 rounded-full mr-4"
          src={comment.userImg}
          alt="user-img"
        />

        <div className="flex-1">
  
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1 whitespace-nowrap">
              <h4 className="font-bold text-white text-[15px] sm:text-[16px] hover:underline">
                {comment.name}
              </h4>
              <span className="text-sm text-white sm:text-[15px]">
                @{comment?.username} -{" "}
              </span>
            </div>

  
          <p className="text-white text-[15px sm:text-[16px] mb-2">
            {comment?.comment}
          </p>
  
          <div className="flex justify-between text-gray-200 p-2">
            <div className="flex items-center select-none">
              <FaRegComment
                className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100"
              />
            </div>
            {session?.user.uid === comment?.userId && (
              <AiFillDelete
                onClick={() =>deleteComment()}
                className="h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100"
              />
            )}
            <div className="flex items-center">
              {hasLiked ? (
                <AiFillDelete
                  onClick={() => likeComment()}
                  className="h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100"
                />
              ) : (
                <AiOutlineHeart
                  onClick={() => likeComment()}
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
  
            <FiShare className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
            <IoStatsChart className="h-9 w-9 hoverEffect p-2 hover:text-sky-500 hover:bg-sky-100" />
          </div>
        </div>
      </div>
    </div>
    );
  }
