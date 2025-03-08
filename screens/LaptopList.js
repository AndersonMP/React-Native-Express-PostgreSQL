import { View, StyleSheet, Text, FlatList } from "react-native";
import { useLaptop } from "../hooks/useLaptop";
import { LaptopItem } from "./LaptopItem";
import { FAB } from "@rneui/base";
import { useEffect } from "react";

export const LaptopList = ({ navigation }) => {
    const { data, loadLaptops } = useLaptop();

    // Carga inicial y en Navegación
    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", loadLaptops);
        return unsubscribe;
    }, [navigation, loadLaptops]);

    const handleSuccess = () => {
        loadLaptops(); // Recarga la lista después de eliminar una laptop
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>LISTA DE LAPTOPS</Text>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <LaptopItem item={item} navigation={navigation} onSuccess={handleSuccess} />
                )}
                style={styles.list}
            />
            <FAB
                title="+"
                placement="right"
                onPress={() => navigation.navigate("LaptopFormNav", {})}
                buttonStyle={styles.fab}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
    },
    header: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 10,
        textAlign: "center",
    },
    list: {
        width: "100%",
    },
    fab: {
        backgroundColor: "#007bff",
    },
});
