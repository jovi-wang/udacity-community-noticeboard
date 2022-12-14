import React, { useEffect, useState } from 'react';
import PostItem from '../components/PostItem';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { getPosts, selectPosts, createPost } from '../features/post/postSlice';
import { getProfiles, selectProfiles } from '../features/profile/profileSlice';
import { selectAuth } from '../features/auth/authSlice';

const Posts = () => {
  const [text, setText] = useState('');
  const posts = useAppSelector(selectPosts);
  const profiles = useAppSelector(selectProfiles);
  const { user } = useAppSelector(selectAuth);

  const profileId = user!.profileId;

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPosts());
    if (profiles.length === 0) {
      dispatch(getProfiles());
    }
  }, [dispatch, profiles]);

  const onSubmit = (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPost(text));
    setText('');
  };
  return (
    <section className='container'>
      <>
        <h1 className='large text-primary'>Community Posts</h1>

        <div className='post-form'>
          <div className='post-form-header bg-primary'>
            <h3>Say Something...</h3>
          </div>

          <form className='form my-1' onSubmit={onSubmit}>
            <textarea
              name='text'
              cols={30}
              rows={5}
              placeholder='Create a Post'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            />

            <input
              aria-label='submit'
              type='submit'
              value='Submit'
              className='btn btn-dark my-1'
            />
          </form>
        </div>

        <div className='posts'>
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostItem
                key={post.postId}
                postId={post.postId}
                profileId={post.profileId}
                text={post.text}
                name={post.name}
                avatar={post.avatar}
                date={post.date}
                alowDelete={profileId === post.profileId}
              />
            ))
          ) : (
            <h4>No Posts found...</h4>
          )}
        </div>
      </>
    </section>
  );
};

export default Posts;
