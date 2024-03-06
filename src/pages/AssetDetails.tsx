import {Button, ButtonText, Text, VStack} from "@gluestack-ui/themed";
import {useNavigation} from "@react-navigation/native";

const AssetDetails = () => {
    const navigation = useNavigation()
    return (
        <VStack>
            <Text>Hello from asset detail page</Text>
            <Button
                isDisabled={false}
                isFocusVisible={false}
                onPress={() => navigation.navigate("Home" as never)}
            >
                <ButtonText>Add </ButtonText>

            </Button>
        </VStack>
    );
};

export default AssetDetails;