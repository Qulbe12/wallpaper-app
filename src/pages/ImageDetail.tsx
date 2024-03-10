import React, {useState} from 'react';
import {
    Center,
    Fab,
    HStack,
    Image,
    Menu,
    MenuItem,
    MenuItemLabel,
    Spinner,
    Text,
    View,
    VStack
} from "@gluestack-ui/themed";
import {useRoute} from "@react-navigation/native";
import {Dimensions} from "react-native";
import {Entypo, Feather} from '@expo/vector-icons';
import {downloadImage} from "../utils/imageDownloader";
import * as MediaLibrary from 'expo-media-library';

const ImageDetail = () => {
    const {width, height} = Dimensions.get("window");
    const route = useRoute();
    const [loading, setLoading] = useState(false)
    const item = route.params.item;
    // const [progress, setProgress] = useState(false);

    const [permissionResponse, requestPermission] = MediaLibrary.usePermissions()

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
                       height={height}
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
                            >
                                <Entypo name="dots-three-vertical" size={24} color="white"/>
                            </Fab>
                        );
                    }}
                >
                    <MenuItem onPress={async () => {
                        await requestPermission()
                        await downloadImage(item?.src?.original)
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