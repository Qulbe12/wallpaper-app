import * as FileSystem from 'expo-file-system';

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
        await FileSystem.downloadAsync(imageUrl, fileUri);
        console.log('Image downloaded successfully');
    } catch (error) {
        console.error('Error downloading image:', error);
    }
};