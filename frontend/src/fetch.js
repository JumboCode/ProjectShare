export const BACKEND_URL = process.env.NODE_DEV === 'development'
  ? 'http://localhost:8000' 
  : 'https://tufts-project-share-backend.herokuapp.com'