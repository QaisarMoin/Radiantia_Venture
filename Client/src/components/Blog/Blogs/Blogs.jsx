import { Card } from './Card/Card';

export const Blogs = ( {blogs} ) => {
  console.log(blogs, 'data check a rah a he ya nhi a rha he ya nhi');
  
  return (
    <>
      {/* <!-- BEGIN  BLOG --> */}

      <div className='blog-items'>
        {blogs.map((blog) => (
          <Card key={blog.id} blog={blog} />
        ))}
      </div>

      {/* <!--  BLOG EOF   --> */}
    </>
  );
};
