import {
    Button,
    ButtonText,
    Heading,
    Modal,
    ModalBackdrop,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    Text
} from "@gluestack-ui/themed";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

type ModalProps = {
    showModal: boolean,
    setShowModal: (state: boolean) => void
    id: string
}
const SuccessModal = ({showModal, setShowModal, id}: ModalProps) => {
    const {signIn} = useContext(AuthContext)
    return (
        <Modal
            isOpen={showModal}
            onClose={() => {
                setShowModal(false)
            }}
        >
            <ModalBackdrop/>
            <ModalContent>
                <ModalHeader>
                    <Heading size="lg">Congratulations</Heading>
                </ModalHeader>
                <ModalBody>
                    <Text>
                        Your account has been verified. you can use wallpapers now
                    </Text>
                </ModalBody>
                <ModalFooter>
                    <Button
                        size="sm"
                        action="positive"
                        borderWidth="$0"
                        bg="#9013FE"
                        onPress={async () => {
                            await signIn(id)
                            setShowModal(false)
                        }}
                    >
                        <ButtonText>Explore</ButtonText>
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default SuccessModal;