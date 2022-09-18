import axios from "axios"

const useImageService = uri => {
    const uploadImage = async body => {
        return await axios.post(uri, body, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }


    return {uploadImage}
}

export default useImageService