import axios from 'axios';

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;

const axiosClient = axios.create({
    baseURL: 'http://localhost:1337',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
    }
});

const CreateNewResume = (data) => axiosClient.post('/api/user-resumes', data);
const GetUserResumes = (userEmail) => axiosClient.get(`/api/user-resumes?filters[userEmail][$eq]=${userEmail}`);
const UpdateResumeDetail = (id, data) => axiosClient.put('/api/user-resumes/'+id, data);
const GetResumeById=(id)=>axiosClient.get('/api/user-resumes/'+id+"?populate=*");
const DeleteResumeById=(id)=>axiosClient.delete('/api/user-resumes/'+id)

export default {
    CreateNewResume,
    GetUserResumes,
    UpdateResumeDetail,
    GetResumeById,
    DeleteResumeById
};
