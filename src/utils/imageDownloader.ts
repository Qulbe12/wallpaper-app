import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const downloadImage = async (imageUrl: string) => {
    const directory = `${FileSystem.documentDirectory}Download/`;
    const fileUri = `${directory}image.jpg`;
    try {
        const dirInfo = await FileSystem.getInfoAsync(directory);
        if (!dirInfo.exists) {

            await FileSystem.makeDirectoryAsync(directory, {intermediates: true});
        }

        const downloadResponse = await FileSystem.downloadAsync(imageUrl, fileUri);

        if (downloadResponse.status === 200) {
            // Save the downloaded image to the device's media library
            await MediaLibrary.saveToLibraryAsync(downloadResponse.uri);
        } else {
            console.error('Failed to download image. Status:', downloadResponse.status);
            return {success: true, message: "Error downloading image"}
        }
        return {success: true, message: "Image downloaded successfully"}
    } catch (error) {
        return {success: true, message: "Error downloading image"}
    }
};