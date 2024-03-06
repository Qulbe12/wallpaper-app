import React from 'react';
import {Button, ButtonText, Card, Heading, Image, Text, Textarea, TextareaInput, VStack} from "@gluestack-ui/themed";
import {useNavigation} from "@react-navigation/native";
import logo from "../../assets/logo.png"

const HomePage = () => {
    const navigation = useNavigation()
    return (
        <VStack bg="white" h="100%" w="100%">
            <Image
                size="lg"
                height={200}
                width={400}
                borderRadius="$none"
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
                <Textarea
                    mt={12}

                    size="md"
                    isReadOnly={false}
                    isInvalid={false}
                    isDisabled={false}
                    w="100%"
                >
                    <TextareaInput placeholder="Paste your Asset id here"/>
                </Textarea>
                <Button
                    my={12}
                    size="md"
                    variant="solid"
                    bg="#9013FE"
                    action="primary"
                    isDisabled={false}
                    isFocusVisible={false}
                    onPress={() => navigation.navigate("Asset Detail" as never)}
                >
                    <ButtonText>Add </ButtonText>
                </Button>
            </Card>

        </VStack>
    );
};

export default HomePage;