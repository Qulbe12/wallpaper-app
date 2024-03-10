import {Fab, Image, Pressable, View} from "@gluestack-ui/themed";
import {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../context/AuthContext';
import {axiosForWallpapers} from "../config/axios.config";
import {AxiosError} from "axios";
import {IWallpapersResponse} from "../interfaces/IAllWallpapersResponse";
import {Dimensions, FlatList} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {FontAwesome5} from '@expo/vector-icons';

const AssetDetails = () => {
    const navigation = useNavigation()
    const {signOut} = useContext(AuthContext)
    const {width, height} = Dimensions.get("window");

    const [wallpapers, setWallpapers] = useState<IWallpapersResponse>({})

    useEffect(() => {
        axiosForWallpapers.get<IWallpapersResponse>("curated?page=2&per_page=40").then((value) => {
            console.log(value.data)
            setWallpapers(value.data)
        }).catch((reason) => {
            const error = reason as AxiosError
            console.log(error)
        })
    }, []);

    return (
        <View my={12}>
            <FlatList
                data={wallpapers?.photos}
                keyExtractor={(item) => item.id}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                style={{alignSelf: "stretch"}}
                contentContainerStyle={{
                    flexDirection: "column",
                    maxWidth: "100%",
                    justifyContent: "center",
                    alignItems: "center"
                }}
                // initialNumToRender={5}
                // onEndReached={fetchMore}
                renderItem={({item, index}) => {
                    return (
                        <Pressable onPress={() => navigation.navigate("image detail", {item})}>
                            <Image margin={4} borderRadius="$md" width={width / 2 - 20} height={height / 2 - 50}
                                   key={index}
                                   source={{uri: item?.src?.large2x}}
                                   alt={item.alt}/>
                        </Pressable>
                    );
                }}
            />
            <Fab onPress={() => signOut()} bg="#9013FE">
                {/*<FabIcon as={EditIcon}/>*/}
                <FontAwesome5 name="wallet" size={20} color="white"/>
                {/*<FabLabel mx={12}>Reset wallet</FabLabel>*/}
            </Fab>
            {/*{wallpapers?.photos?.map((image) => {*/}
            {/*    return (*/}
            {/*        <Image source={{uri: image?.src?.large2x}} alt={image.alt}/>*/}
            {/*    )*/}
            {/*})}*/}

            {/*<Button*/}
            {/*    isDisabled={false}*/}
            {/*    isFocusVisible={false}*/}
            {/*    onPress={() => signOut()}*/}
            {/*>*/}
            {/*    <ButtonText>Add </ButtonText>*/}

            {/*</Button>*/}
        </View>
    );
};

export default AssetDetails;