import { useState } from "react";
import { Alert } from "react-native";
import { saveLaptopRest, updateLaptopRest, deleteLaptopRest } from "../rest_client/laptops";

export const useManipulateLaptop = (onSuccess, laptop = null) => {
    const [marca, setMarca] = useState(laptop?.marca || "");
    const [procesador, setProcesador] = useState(laptop?.procesador || "");
    const [ram, setRam] = useState(laptop?.memoria || "");
    const [disco, setDisco] = useState(laptop?.disco || "");

    const showMessage = () => {
        Alert.alert("ÉXITO", laptop ? "Laptop Actualizada" : "Latpop guardada.");
    }

    const saveLaptop = async () => {
        if (!marca || !procesador, !ram, !disco) {
            Alert.alert("ERROR", "Todos los campos son obligatorios.");
            return
        }

        try {
            saveLaptopRest({ marca, procesador, ram, disco }, showMessage);
            if (onSuccess) onSuccess();

        } catch (error) {
            Alert.alert("Error", "Hubo un problema al guardar la laptop.");
        }
    };

    const updateLaptop = async () => {
        try {
            updateLaptopRest(
                { id: laptop.id, marca, procesador, ram, disco },
                showMessage
            );
            if (onSuccess) {
                onSuccess();
            }
        } catch (error) {
            Alert.alert("Error", "Hubo un problema al actualizar la laptop.");
        }
    }

    const deleteLaptop = async ({ id, marca, procesador }) => {
        Alert.alert(
            "Confirmación",
            `¿Estás seguro de que deseas eliminar la laptop "${marca} ${procesador}"?`,
            [
                { text: "Cancelar", style: "cancel" },
                {
                    text: "Eliminar",
                    onPress: async () => {
                        try {
                            const result = await deleteLaptopRest(id);
                            if (result.message) {
                                const isError = result.message.toLowerCase().includes("no encontrada");
                                Alert.alert(isError ? "Error" : "Éxito", result.message);
                            }
                            if (onSuccess) onSuccess();
                        } catch (error) {
                            console.log(error);
                            Alert.alert("Error", "No se pudo eliminar la laptop.");
                        }
                    },
                },
            ]
        );
    };


    return {
        marca,
        procesador,
        ram,
        disco,
        setMarca,
        setProcesador,
        setRam,
        setDisco,
        saveLaptop,
        updateLaptop,
        deleteLaptop
    }
}