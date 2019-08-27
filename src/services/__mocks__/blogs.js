const blogs = [
  { title: 'Blog Title', author: 'Donald Trump', url: 'www.usa.com' }
]

const getAll = () => {
  console.log(blogs)
  return Promise.resolve(blogs)
}

export default { getAll }
