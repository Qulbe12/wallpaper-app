import React, {useState} from 'react';
import {
    Alert,
    Center,
    Fab,
    HStack,
    Image,
    Menu,
    MenuItem,
    MenuItemLabel,
    Spinner,
    Text,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    View,
    VStack
} from "@gluestack-ui/themed";
import {useRoute} from "@react-navigation/native";
import {Dimensions} from "react-native";
import {Entypo, Feather} from '@expo/vector-icons';
import * as MediaLibrary from 'expo-media-library';
import {applyWallpaper} from "@codeooze/react-native-wallpaper-manager";
import {setMobileWallpaper} from "../modules/WallpaperModule";


const ImageDetail = () => {
    const {width, height} = Dimensions.get("window");
    const route = useRoute();
    const [loading, setLoading] = useState(false)
    const item = route.params.item;
    // const [progress, setProgress] = useState(false);
    const toast = useToast()

    const setWallpaper = (uri, screen) => {

        //uri = "https://i.pinimg.com/originals/76/5e/1d/765e1dc8cb1cc115fb3b0b39a895fdeb.jpg"
        //screen = "home" || "lock" || "both"

        applyWallpaper(uri, screen)
            .then((response) => {
                Alert.alert(response)
            })
            .catch((error) => {
                Alert.alert(error.message)
            })

    }

    const showToast = (message: string, success: boolean) => {
        toast.show({
            placement: "bottom",
            render: ({id}) => {
                const toastId = "toast-" + id
                return (
                    <Toast nativeID={toastId} action={success ? "info" : "error"} variant="accent">
                        <VStack space="xs">
                            <ToastTitle>{success ? "Success" : "Failed"}</ToastTitle>
                            <ToastDescription>
                                {message}
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            },
        })
    }

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()
    const callback = res => {
        console.log('Response: ', res);
    };

    return (
        <>
            {loading ? <VStack h="100%" w="100%">
                    <Center h="100%" w="100%">
                        <HStack space="sm" alignItems='center'>
                            <Spinner size="large"/>
                            <Text size="md">Loading image..</Text>
                        </HStack>
                    </Center>
                </VStack> :
                null
            }
            <View>
                <Image onLoadStart={() => setLoading(true)} onLoadEnd={() => setLoading(false)}
                       borderRadius="$md"
                       width={width}
                       height={height + 35}
                       source={{uri: item?.src?.original}}
                       alt={item.alt}/>
                <Menu
                    placement="bottom end"
                    trigger={({...triggerProps}) => {
                        return (
                            <Fab
                                {...triggerProps}
                                size="md"
                                placement="top right"
                                isHovered={false}
                                isDisabled={false}
                                isPressed={false}
                                bg="#9013FE"
                                mt={12}
                            >
                                <Entypo name="dots-three-vertical" size={24} color="white"/>
                            </Fab>
                        );
                    }}
                >
                    <MenuItem onPress={async () => {
                        await requestPermission()
                        // setWallpaper(item?.src?.original, "home")
                        await setMobileWallpaper(item?.src?.original, "home")
                        // const downloadRes = await downloadImage(item?.src?.original)
                        // showToast(downloadRes.message, downloadRes.success)
                    }} key="Community" textValue="Community">
                        <HStack alignItems='center'>
                            <Feather name="download" size={24} color="black"/>
                            <MenuItemLabel ml="$2" size='sm'>
                                Download wallpaper
                            </MenuItemLabel>
                        </HStack>
                    </MenuItem>
                </Menu>

            </View>
        </>
    );
};

export default ImageDetail;