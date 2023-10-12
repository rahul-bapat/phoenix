import React, { useEffect, useState } from 'react';
import moment from 'moment';
import parse from 'html-react-parser';
import { getPageRes, getBlogPostRes } from '../../helper';
import { onEntryChange } from '../../contentstack-sdk';
import Skeleton from 'react-loading-skeleton';
import RenderComponents from '../../components/render-components';
import ArchiveRelative from '../../components/archive-relative';
import { Page, BlogPosts, PageUrl } from "../../typescript/pages";
import  Chatbotsearch from "../../components/Chatbotsearch";


export default function BlogPost({ blogPost, page, pageUrl }: { blogPost: BlogPosts, page: Page, pageUrl: PageUrl }) {

  const [getPost, setPost] = useState({ banner: page, post: blogPost });
  async function fetchData() {
    try {
      const entryRes = await getBlogPostRes(pageUrl);
      const bannerRes = await getPageRes('/blog');
      if (!entryRes || !bannerRes) throw new Error('Status: ' + 404);
      setPost({ banner: bannerRes, post: entryRes });
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    onEntryChange(() => fetchData());
  }, [blogPost]);

  const { post, banner } = getPost;
  const isPost = post.social_share_instagram;
  return (
    <>
      <div className='main-content-container'>
        <div className="section-zero">
          <div className="left-content-block">
            <div className="heading-block">

              <span className="date">
                {moment(post.date).format('MMMM DD, YYYY')}
              </span>

              <div className="content-heading">

                <h2>{post.heading}</h2>

                <p className="content-para">{post.subheading}</p>

                <div className="summary" >
                  
                  {post.summary == "undefined" ? "" : parse(post.summary)}
                  
                </div>
              </div>

            </div>
          </div>
          <div className="right-content-block">
            <img
              className='heading_img'
              src={post.featured_image ? post.featured_image.url : ""}
              alt={post.title}
              title={post.title}
            />
            <span>{post.title} </span>

          </div>
        </div>

        <div className="content-wrapper">
          <div className="section-one">
            <div className="left-content-block">
             {isPost && (
                <>
                <h4> Social Media Post powered by AI</h4>
                <div className='social-media-block'>
            <a className="social_media_linkedin" href={"https://www.linkedin.com/sharing/share-offsite/?url=https://phoenix.contentstackapps.com"+post.url} target="_blank" rel="noopener noreferrer">
             Linkedin Post <img className="nav__search-button--magnifier__img" alt="LinkedIn" src="/linkedin.svg" width="24" height="24"/>
            
            </a>            
            <p>{post.social_share}</p>
            <img
                  className='social-media-img'
                  src={post.featured_image1 ? post.featured_image1.url : ""}
                  alt={post.title}
                  title={post.title}
                />
                </div>
                <div className='social-media-block'>
            <a className="social_media_facebook" href={"https://www.facebook.com/sharer.php?u=https://phoenix.contentstackapps.com"+post.url} target="_blank" rel="noopener noreferrer">
              Facebook Post <img className="nav__search-button--magnifier__img" alt="Facebook" src="/icons8-facebook.svg" width="24" height="24"/>
            </a>                        
              <p>{post.social_share_instagram}</p>  
              <img
                  className='social-media-img'
                  src={post.featured_image ? post.featured_image.url : ""}
                  alt={post.title}
                  title={post.title}
                />
                </div>
                </>
             )}
              <ArchiveRelative
                {...post.$?.related_post}
                blogs={post.related_post}
              />
            </div>

            <div className="right-content-block">
              <div className="sub-content">
                {parse(post.body_content)}
              </div>
              <div className="image-block">
                <img
                  className='content_img'
                  src={post.featured_image1 ? post.featured_image1.url : ""}
                  alt={post.title}
                  title={post.title}
                />
                <span>{post.title} </span>
              </div>
              <div className="sub-content">
                {parse(post.body1)}
              </div>
            </div>
            <div>
            </div>



          </div>
          <div className="section-two">
            <h2>{post.banner_title}</h2>
            <div className="find-block-content">
              <p>{post.banner_text}</p>
              <button type="button">{post.cta_label}</button>
            </div>
          </div>
        </div>
      </div>
      <input type='hidden' value={post.analytics_link} name='analytics_link' id='analytics_link'></input>
      <Chatbotsearch></Chatbotsearch>
    </>
  );
}
export async function getServerSideProps({ params }: any) {
  try {
    const page = await getPageRes('/blog');
    const posts = await getBlogPostRes(`/blog/${params.post}`);
    if (!page || !posts) throw new Error('404');

    return {
      props: {
        pageUrl: `/blog/${params.post}`,
        blogPost: posts,
        page,
      },
    };
  } catch (error) {
    console.error(error);
    return { notFound: true };
  }
}
