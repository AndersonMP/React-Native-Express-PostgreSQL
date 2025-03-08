# 📌 Proyecto React Native con Expo + Backend en Node.js + PostgreSQL

## 🛠️ **Crear Proyecto React Native con Expo**
* Ejecuta el siguiente comando para crear un nuevo proyecto con Expo:
```sh
npx create-expo-app@latest projectName --template blank
```
* Actualiza estas dependencias en package.json
```sh
"dependencies": {
    "@react-navigation/native": "^7.0.14",
    "@react-navigation/native-stack": "^7.2.0",
    "@rneui/base": "^4.0.0-rc.7",
    "@rneui/themed": "^4.0.0-rc.8",
    "body-parser": "^1.20.3",
    "express": "^4.21.2",
    "pg": "^8.13.3"
}
```
* Descargar las dependencias
```sh
npm install
```
* Script para inicar el backend
```sh
"scripts": {
    "back": "node backend/app.js"
  }
```
* Configurar PostgreSQL
- C:\Program Files\PostgreSQL\17\data
- Archivo pg_hba.conf
- Agregar esta línea según la ipv4
```sh
host    all             all             192.168.100.1/24        md5
```
