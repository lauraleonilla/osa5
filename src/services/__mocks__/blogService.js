const blogs = [
  {
    title: 'Blog1',
    author: 'Author1',
    url: 'www.blog.com',
    likes: 4,
    user: [
      {
        username: 'Test',
        name: 'Tester',
        id: 'fakeid'
      }
    ],
    id: 'fakeid2'
  },
  {
    title: 'Blog2',
    author: 'Author2',
    url: 'www.blog2.com',
    likes: 10,
    user: [
      {
        username: 'Test',
        name: 'Tester',
        id: 'fakeid'
      }
    ],
    id: 'fakeid3'
  }
]

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { blogs, getAll, setToken }
