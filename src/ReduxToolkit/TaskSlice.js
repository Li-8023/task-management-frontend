import { api, setAuthHeader } from "../api/api"

export const fetchTasks = createAsyncThunk("task.fetchTasks", 
    async({status}) => {
        setAuthHeader(localStorage.getItem("jwt"), api)

        try{
            const {data} = await api.get("/api/tasks", {
                params: {status}
            })
        }catch(error){

        }
    }
)