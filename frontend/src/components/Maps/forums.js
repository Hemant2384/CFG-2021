import React, { useState } from 'react'

import DiscussionBoard from 'react-discussion-board'

import 'react-discussion-board/dist/index.css'

const Forums = () => {
  const allPosts = [
    {
      profileImage:
        'https://www.rd.com/wp-content/uploads/2017/09/01-shutterstock_476340928-Irina-Bg.jpg',
      name: 'Jane Doe',
      content: '<p>Hello everyone!</p><p>How are you all doing?</p><p>-Jane</>',
      date: new Date('01 Jan 2020 01:12:00 GMT')
    },
    {
      profileImage:
        'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      name: 'John Doe',
      content:
        '<p>Raising say express had chiefly detract demands she. Quiet led own cause three him. Front no party young abode state up. Saved he do fruit woody of to. Met defective are allowance two perceived listening consulted contained. It chicken oh colonel pressed excited suppose to shortly. He improve started no we manners however effects. Prospect humoured mistress to by proposal marianne attended. Simplicity the far admiration preference everything. Up help home head spot an he room in Barton waited twenty always repair in within we do. An delighted offending curiosity my is dashwoods at. Boy prosperous increasing surrounded companions her nor advantages sufficient put. John on time down give meet help as of. Him waiting and correct believe now cottage she another. Vexed six shy yet along learn maids her tiled. Through studied shyness evening bed him winding present. Become excuse hardly on my thirty it wanted. </p>',
      date: new Date('01 Jan 2020 09:12:00 GMT')
    }
  ]

  const [posts, setPosts] = useState(allPosts)

  const submitPost = (text) => {
    const curDate = new Date()

    setPosts([
      ...posts,
      {
        profileImage:
          'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        name: 'Jane Doe',
        content: text,
        date: curDate
      }
    ])
  }

  return (
    <div className='App'>
      <DiscussionBoard posts={posts} onSubmit={submitPost} />
    </div>
  )
}

export default Forums;