// WallpaperModule.ts

import {NativeModules, Platform} from 'react-native';

interface WallpaperModule {
    setWallpaper(imageUrl: string, screenName: 'home' | 'lock' | 'both'): Promise<boolean>;
}

const {WallpaperModule} = NativeModules as { WallpaperModule: WallpaperModule };

const setMobileWallpaper = async (imageUrl: string, screenName: 'home' | 'lock' | 'both'): Promise<boolean> => {
    if (Platform.OS === 'android') {
        try {
            console.log("image url", imageUrl)
            return await WallpaperModule.setWallpaper(imageUrl, screenName);
        } catch (error) {
            console.error('Failed to set wallpaper:', error);
            return false;
        }
    } else {
        console.warn('Wallpaper setting is supported only on Android.');
        return false;
    }
};

export {setMobileWallpaper};
