import axios from "axios"
import uris from "../urls/uris"

const useImageService = () => {
    const uploadImage = async body => {
        return await axios.post(uris.imageControllerUri, body, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
    }
    return {uploadImage}
}

export default useImageService