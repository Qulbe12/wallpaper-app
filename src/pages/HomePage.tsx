import React, { useState } from 'react';
import {
    AlertCircleIcon,
    Button,
    ButtonText,
    Card,
    Center,
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
    HStack,
    Heading,
    Image,
    ScrollView,
    Spinner,
    Text,
    Textarea,
    TextareaInput,
    VStack,
    useToast,
    Toast,
    ToastTitle,
    ToastDescription,
    Box
} from "@gluestack-ui/themed";
import { useNavigation } from "@react-navigation/native";
import logo from "../../assets/logo.png"
import * as yup from "yup";
import { ITokenVerificationReso } from '../interfaces/ITokenVerificationResponse';
import { axiosInstance } from '../config/axios.config';
import { AxiosError } from 'axios';

const schema = yup.object().shape({
    nft: yup.string().required("this field should not be empty"),
})
const HomePage = () => {
    const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({ nft: "" })
    const [asset, setAsset] = useState<ITokenVerificationReso>({
        asset: {
            'created-at-round': null,
            deleted: false,
            index: null,
            params: {
                clawback: '',
                creator: '',
                decimals: null,
                'default-frozen': false,
                freeze: '',
                manager: '',
                name: '',
                'name-b64': '',
                reserve: '',
                total: null,
                'unit-name': '',
                'unit-name-b64': '',
                url: '',
                'url-b64': ''
            }
        },
        'current-round': null
    })
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useToast()

    const showToast = (message: string) => {
        toast.show({
            placement: "bottom",
            render: ({ id }) => {
                const toastId = "toast-" + id
                return (
                    <Toast nativeID={toastId} action="error" variant="accent">
                        <VStack space="xs">
                            <ToastTitle>Something went wrong</ToastTitle>
                            <ToastDescription>
                                {message}
                            </ToastDescription>
                        </VStack>
                    </Toast>
                )
            },
        })
    }

    const getAssetDetails = async (id: string) => {
        try {
            setLoading(true)
            const res = await axiosInstance.get<ITokenVerificationReso>(`assets/${id}?include-all=true`)
            setAsset(res.data)
            console.log(res.data.asset.params["unit-name"])
            if (res.data) {
                setShow(true)
                setForm({nft:""})
            }
            setLoading(false)
        } catch (e) {
            const error = e as AxiosError

            setAsset({
                asset: {
                    'created-at-round': null,
                    deleted: false,
                    index: null,
                    params: {
                        clawback: '',
                        creator: '',
                        decimals: null,
                        'default-frozen': false,
                        freeze: '',
                        manager: '',
                        name: '',
                        'name-b64': '',
                        reserve: '',
                        total: null,
                        'unit-name': '',
                        'unit-name-b64': '',
                        url: '',
                        'url-b64': ''
                    }
                },
                'current-round': null
            })
            if (error.message.toLowerCase().includes("400")) {
                showToast("Invalid asset id please try with correct asset id")
            }
            setLoading(false)
        }
    }

    const onSubmit = () => {
        schema
            .validate(form)
            .then(async () => {
                await getAssetDetails(form.nft)
                // navigation.navigate("Asset Detail" as never)
                setErrors({})
            })
            .catch((err: yup.ValidationError) => {
                if (!err.path) return;
                setErrors({ [err.path]: err.message });
            });
    };

    return (
        <>
            {loading ?
                <VStack h="100%" w="100%" >
                    <Center h="100%" w="100%">
                        <HStack space="sm" alignItems='center'>
                            <Spinner size="large" />
                            <Text size="md">Verifying NFT ..</Text>
                        </HStack>
                    </Center>
                </VStack>
                :
                <ScrollView bg="white" h="100%" w="100%">
                    <VStack bg="white" h="100%" w="100%">
                        <Image
                            size="lg"
                            height={200}
                            width={400}
                            source={logo}
                            alt="logo"
                        />
                        <Card size="md" variant="ghost" m="$3">
                            <Heading mb="$1" size="md">
                                Quick Start
                            </Heading>
                            <Text size="sm">Hey and welcome to BoomeraNFT, we are building a new way to easily apply wallpapers that
                                are based on your favourite NFT collection. It's Beta and you are invited, click on verify NFT
                                ownership to get your wallpaper.</Text>
                            <FormControl isInvalid>
                                <Textarea
                                    mt={12}
                                    size="md"
                                    isReadOnly={false}
                                    isInvalid={false}
                                    isDisabled={false}
                                    w="100%"
                                >
                                    <TextareaInput placeholder="Paste your Asset id here" onChangeText={(e) => setForm({ ...form, nft: e })} />
                                </Textarea>
                                <FormControlError>
                                    {/* <FormControlErrorIcon as={AlertCircleIcon} /> */}
                                    <FormControlErrorText>
                                        {errors.nft}
                                    </FormControlErrorText>
                                </FormControlError>
                                <Button
                                    borderRadius={12}
                                    my={12}
                                    size="xl"
                                    variant="solid"
                                    bg="#9013FE"
                                    action="secondary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    onPress={onSubmit}
                                >
                                    <ButtonText>Verify NFT</ButtonText>
                                </Button>
                            </FormControl>
                        </Card>
                        {show &&
                                <VStack m={12}>
                                    <HStack justifyContent='space-between'>
                                        <Heading>Asset name</Heading>
                                        <Text>{asset.asset.params["unit-name"]}</Text>
                                    </HStack>
                                    <HStack justifyContent='space-between'>
                                        <Heading>Asset owner</Heading>
                                        <Box w={150}>
                                        <Text isTruncated>{asset.asset.params.manager}</Text>
                                        </Box>
                                    </HStack>
                                    <HStack justifyContent='space-between'>
                                        <Heading>Total Mint</Heading>
                                        <Text>{asset.asset.params.total}</Text>
                                    </HStack>
                                </VStack>
                            }
                    </VStack>
                </ScrollView>
            }
        </>
    );
};

export default HomePage;