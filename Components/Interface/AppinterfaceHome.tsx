export interface ListData {
  Id_Solicitud: string;
  Empleado: string;
  Departamento?: string;
  Puesto: string;
  Lugares: string;
  Fecha_Salida: string;
  Fecha_Regreso: string;
  Dias: string;
  Vehiculo: string;
  Total_Solicitado: string;
  Observaciones?: string;
  Estado: string;
  Fecha_Creacion: string;
  Usuario: string;
  Motivo?: string;
  Hora_Salida: string;
  Hora_Regreso: string;
}

export interface PropsHome {
  data: {
    Id_Solicitud: string;
    Empleado: string;
    Departamento: string;
    Puesto: string;
    Lugares: string;
    Fecha_Salida: string;
    Fecha_Regreso: string;
    Dias: string;
    Vehiculo: string;
    Total_Solicitado: string;
    Observaciones: string;
    Estado: string;
    Fecha_Creacion: string;
    Usuario: string;
    Motivo: string;
    Hora_Salida: string;
    Hora_Regreso: string;
  };
}

export interface DetalleSolic {
  Id: string;
  Id_Actividad: string;
  Lunes: string;
  Martes: string;
  Miercoles: string;
  Jueves: string;
  Viernes: string;
  SabadoDomingo: string;
  Total: string;
  Actividad: string;
  data: ListData;
  ActividadesData: DetalleSolic[];
}

export interface Graphit {
  name: string;
  population: number;
  legendFontColor: string;
  legendFontSize: number;
  color: string;
  key: string;
  label: string;
}

export interface GastosData {
  Id: string;
  Id_Solicitud: string;
  Imagen: string;
  Fecha_Gasto: string;
  Actividad: string;
  Id_Actividad: string;
  TotalGasto: string;
}
