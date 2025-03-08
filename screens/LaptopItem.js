import { Icon, ListItem } from "@rneui/base";
import { TouchableHighlight, StyleSheet } from "react-native";
import { useManipulateLaptop } from "../hooks/useManipulateLaptop";

export const LaptopItem = ({ item, navigation, onSuccess}) => {
    const { deleteLaptop } = useManipulateLaptop(onSuccess);
    return (
        <TouchableHighlight
            onPress={() => {
                navigation.navigate("LaptopFormNav", { itemParam: item });
            }}
            underlayColor="#ddd"
        >
            <ListItem bottomDivider containerStyle={styles.listItem}>
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>
                        {item.marca} {item.procesador}
                    </ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitle}>
                        {item.memoria} - {item.disco}
                    </ListItem.Subtitle>
                </ListItem.Content>
                <Icon
                    name="delete"
                    type="material"
                    color="red"
                    style={{ width: 40, height: 40 }}
                    size={40}
                    onPress={() => deleteLaptop(item)}
                />
            </ListItem>
        </TouchableHighlight>
    );
};

const styles = StyleSheet.create({
    listItem: {
        paddingVertical: 5,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
    },
    subtitle: {
        fontSize: 14,
        color: "gray",
    },
});
