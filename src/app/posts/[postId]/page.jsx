"use client"
import Link from 'next/link'
import React from 'react'
import {BiLeftArrowAlt} from 'react-icons/bi'
import { useState, useEffect } from 'react'
import { collection, getDoc } from "firebase/firestore";
import {onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from '../../../../firebase'
import { doc } from 'firebase/firestore'
import Post from '@/components/Post'
import Comment from '@/components/Comment'
import { useParams } from 'next/navigation'

export default function Page() {
  const params = useParams()
  const postsId = params.postId
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const getData = async () => {
    if(postsId){
    const documentRef = doc(db, 'posts', postsId);
    const docSnapshot = await getDoc(documentRef)
    const data = docSnapshot.data();
    setPost(data)
    }
    
  }


  useEffect(() => {
    getData()
  }, [db, postsId]);

  useEffect(() => {
    if (postsId) {
      const commentCollectionRef = collection(db,"posts",postsId, "comments");
  
      const commentQuery = query(commentCollectionRef, orderBy("timestamp", "desc"));
  
      const unsubscribe = onSnapshot(commentQuery, (snapshot) => {
          const commentsData = snapshot.docs.map((doc) => ({
            id: doc.id,
            comment: doc.data().comment,
            name: doc.data().name,
            timestamp: doc.data().timestamp,
            userId: doc.data().userId,
            userImg: doc.data().userImg,
            userName: doc.data().userName,
          }));
          setComments(commentsData);
      });
  
      return () => {
        unsubscribe();
      };
    }
  }, [db, params]);


  return (
    <div className=' bg-black'>
    <div className="xl:ml-[370px] border-l border-r border-gray-600  xl:min-w-[576px] sm:ml-[73px] flex-grow max-w-xl">
          <div className="flex items-center space-x-2  py-2 px-3 sticky top-0 z-50 bg-black border-b text-white border-gray-600">
            <Link href='/'>
            <div>
              <BiLeftArrowAlt className="h-5 " />
            </div>
            </Link>
            <h2 className="text-lg sm:text-xl font-bold cursor-pointer">
              Tweet
            </h2>
          </div>
          <Post 
          userImg={post?.userImg}
          name ={post?.name}
          username ={post?.username}
          text={post?.text}
          id={post?.uid}
          img={post?.imageUrl}

           />
          {comments.length > 0 && (
            <div className="">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                  >
                    <Comment
                      key={comment?.id}
                      commentId={comment?.id}
                      originalPostId={postsId}
                      comment={comment}
                    />
                  </div>
                ))}
            </div>
          )}
        </div>
        </div>
  )
}
