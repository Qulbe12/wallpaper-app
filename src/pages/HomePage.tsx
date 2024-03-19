import React, {useState} from 'react';
import {
    Button,
    ButtonText,
    Card,
    Center,
    FormControl,
    FormControlError,
    FormControlErrorText,
    Heading,
    HStack,
    Image,
    ScrollView,
    Spinner,
    Text,
    Textarea,
    TextareaInput,
    Toast,
    ToastDescription,
    ToastTitle,
    useToast,
    VStack
} from "@gluestack-ui/themed";
import logo from "../../assets/logo.png"
import * as yup from "yup";
import {axiosInstance} from '../config/axios.config';
import {AxiosError} from 'axios';
import SuccessModal from "../components/SuccessModal";
import {SafeAreaView} from "react-native-safe-area-context";

const schema = yup.object().shape({
    nft: yup.string().required("this field should not be empty"),
})
const HomePage = () => {
    // const navigation = useNavigation()
    const [loading, setLoading] = useState(false)
    const [show, setShow] = useState(false)
    const [form, setForm] = useState({nft: ""})


    const [id, setId] = useState("")
    // const [errorMessage, setErrorMessage] = useState("")

    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const toast = useToast()

    const showToast = (message: string) => {
        toast.show({
            placement: "bottom",
            render: ({id}) => {
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
            const res = await axiosInstance.get(`accounts/${id}/assets?include-all=true`)

            if (res.data) {
                setId(id)
                setShow(true)
                // navigation.navigate("Asset Detail" as never)
            }
            setLoading(false)
        } catch (e) {
            const error = e as AxiosError
            setForm({nft: ""})
            if (error.message.toLowerCase().includes("400")) {
                showToast("Account address checksum is incorrect, did you copy the address correctly?")
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
                setErrors({[err.path]: err.message});
            });
    };

    return (
        <SafeAreaView style={{flex: 1}}>
            {loading ?
                <VStack bg="white" h="100%" w="100%">
                    <Center h="100%" w="100%">
                        <HStack space="sm" alignItems='center'>
                            <Spinner size="large"/>
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
                            <Text size="sm">Hey and welcome to BoomeraNFT, we are building a new way to easily apply
                                wallpapers that
                                are based on your favourite NFT collection. It's Beta and you are invited, click on
                                verify NFT
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
                                    <TextareaInput placeholder="Paste your Asset id here"
                                                   onChangeText={(e) => setForm({...form, nft: e})}/>
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
                                    action="primary"
                                    isDisabled={false}
                                    isFocusVisible={false}
                                    onPress={onSubmit}
                                >
                                    <ButtonText>Verify NFT</ButtonText>
                                </Button>
                            </FormControl>
                        </Card>
                    </VStack>
                </ScrollView>
            }
            <SuccessModal showModal={show} setShowModal={setShow} id={id}/>
        </SafeAreaView>
    );
};

export default HomePage;