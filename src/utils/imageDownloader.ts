import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

export const downloadImage = async (imageUrl: string) => {
    const directory = `${FileSystem.documentDirectory}Download/`;
    const fileUri = `${directory}image.jpg`;
    try {
        const dirInfo = await FileSystem.getInfoAsync(directory);
        if (!dirInfo.exists) {
            console.log('Creating directory:', directory)
            await FileSystem.makeDirectoryAsync(directory, {intermediates: true});
        }
        console.log('Downloading image from:', imageUrl);
        console.log('Saving image to:', fileUri);
        const downloadResponse = await FileSystem.downloadAsync(imageUrl, fileUri);

        if (downloadResponse.status === 200) {
            // Save the downloaded image to the device's media library
            
            await MediaLibrary.saveToLibraryAsync(downloadResponse.uri);
            console.log('Image downloaded and saved to the device.');
        } else {
            console.error('Failed to download image. Status:', downloadResponse.status);
        }
        console.log('Image downloaded successfully');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};