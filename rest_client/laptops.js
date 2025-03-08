const IP = '192.168.1.110';
const PORT = 3000;
// const PATH = 'laptops';
const PATH = 'api/laptops';
const URL = `http://${IP}:${PORT}/${PATH}`;

export const getAllLaptops = async () => {
    const response = await fetch(URL);
    const result = await response.json();
    return result;
}

export const saveLaptopRest = async ({ marca, procesador, ram, disco }, fnShowMessage) => {
    const config = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            marca: marca,
            procesador: procesador,
            memoria: ram,
            disco: disco
        })
    };
    const response = await fetch(URL, config);
    const result = await response.json();
    fnShowMessage();
    return result;
}

export const updateLaptopRest = async ({ id, marca, procesador, ram, disco }, fnShowMessage) => {
    const PARAM = `/${id}`;
    const config = {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: id,
            marca: marca,
            procesador: procesador,
            memoria: ram,
            disco: disco
        })
    };
    const response = await fetch(URL + PARAM, config);
    const result = await response.json();
    fnShowMessage();

    return result;
}


export const deleteLaptopRest = async (id) => {
    const PARAM = `/${id}`;
    const config = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        },
    }
    const response = await fetch(URL + PARAM, config);
    const result = await response.json();
    
    return result;
}