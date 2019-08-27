const blogs = [
  { title: 'Blog Title', author: 'Donald Trump', url: 'www.usa.com' }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

export default { getAll }
