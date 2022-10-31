export function apikey() {
  let key = "hsdujnn28328hhfj";

  return key;
}
export function ruta() {
  let ruta = "https://201.190.6.19/rest";

  return ruta;
}

export function User() {
  let url = `${ruta()}/login.php?apikey=${apikey()}`;
  return url;
}

export function sesion() {
  let url = `${ruta()}/sesion.php?apikey=${apikey()}`;
  return url;
}

export function Solicitu() {
  let url = `${ruta()}/Solicitud.php?apikey=${apikey()}`;
  return url;
}
