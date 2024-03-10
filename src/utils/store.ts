import AsyncStorage from "@react-native-async-storage/async-storage";

export const setWalletAddress = async (address: string) => {
    await AsyncStorage.setItem('token', address)
}

export const getWalletAddress = async () => {
    return await AsyncStorage.getItem("token")
}