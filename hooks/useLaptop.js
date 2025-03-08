import { useCallback, useEffect, useState } from "react"
import { getAllLaptops } from "../rest_client/laptops";

export const useLaptop = () => {
    const [data, setData] = useState([]);
    const loadLaptops = useCallback(async () => {
        try {
            const result = await getAllLaptops();
            setData(result);
        } catch (error) {
            console.log(error);
            throw new Error('No se pudo obtner los datos.');
        }
    }, []);

    return { data, loadLaptops };
}