

export const fileUpload = async (file) => {

    const cloudUrl = 'https://api.cloudinary.com/v1_1/do1ivu9ot/upload';

    const formData = new FormData();
    formData.append('upload_preset', 'react-journal');
    formData.append('file', file)


    try {
        const response = await fetch(cloudUrl, {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const cloudResponse = await response.json();
            return cloudResponse.secure_url;
        } else {
            throw await response.json();
        }
    } catch (error) {
        throw error;
    }
    
    //return url de la imagen subida

}