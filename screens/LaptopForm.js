import { Button, Input } from "@rneui/base";
import { View, StyleSheet } from "react-native"
import { useManipulateLaptop } from "../hooks/useManipulateLaptop";

export const LaptopForm = ({ navigation, route }) => {
    let laptopRetrieved = route.params?.itemParam;
    const { marca, procesador, ram, disco, setMarca, setProcesador, setRam, setDisco, saveLaptop, updateLaptop } = useManipulateLaptop(() => navigation.goBack(), laptopRetrieved);
    return (
        <View style={styles.container}>
            <Input
                value={marca}
                placeholder="Marca"
                onChangeText={setMarca}
            />
            <Input
                value={procesador}
                placeholder="Procesador"
                onChangeText={setProcesador}
            />
            <Input
                value={ram}
                placeholder="RAM"
                onChangeText={setRam}
            />
            <Input
                value={disco}
                placeholder="Disco"
                onChangeText={setDisco}
            />
            <Button
                title="GUARDAR"
                onPress={laptopRetrieved ? updateLaptop : saveLaptop}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center'
    }
});