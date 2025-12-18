export interface RegisterDTO {
    nombre: string,
    apellido: string,
    correo: string,
    contraseña: string
};

export interface LoginDTO {
    correo: string,
    contraseña: string
};

export interface GoogleAuthDTO {
    tokenGoogle: string
};