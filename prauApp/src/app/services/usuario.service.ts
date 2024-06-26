import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service'; // Importa localStorageService
import { entorno } from '../env/entorno';
import { Usuario } from '../models/usuario';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/loginRequest';
import { AuthResponse } from '../models/authResponse';
import { UsuarioPorRolDTO } from '../models/UsuarioPorRolDTO';
import { IDocenteXAsignatura } from '../interface/IConsultasBD';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  private url: string = `${entorno.urlPrivada}/usuario`;
  private urlPublica: string = `${entorno.urlPublica}`;
  // private token = this.localStorage.getItem('token');

  allUsersData(est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(`${this.url}/allUsersData?est=${est}`, {
      headers,
    });
  }

  getUsersByRoleId(roleId: number): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    return this.http.get<Usuario[]>(
      `${this.url}/usuariosPorRol?roleId=${roleId}`,
      {
        headers,
      }
    );
  }

  getAllUsuarios(): Observable<Usuario[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    return this.http.get<Usuario[]>(`${this.url}/read`, { headers });
  }
  getJefesByRolId(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(`${this.url}/getJefesByRolId?id=${id}`, {
      headers,
    });
  }

  searchUsersData(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(
      `${this.url}/searchUsersData?search=${search}&est=${est}`,
      { headers }
    );
  }

  searchUsersCI(search: string, est: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario[]>(
      `${this.url}/searchUsersCI?search=${search}&est=${est}`,
      { headers }
    );
  }

  searchUsersId(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario>(`${this.url}/searchUserId?id=${id}`, {
      headers,
    });
  }

  buscarNombreUsuario(id: number) {
    // Construir el encabezado de autorización
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.get<Usuario>(`${this.url}/obtenerNombreRol?userId=${id}`, {
      headers,
    });
  }

  registrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/register`, usuario, {
      headers,
    });
  }
  crearRegistrarUsuario(usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<Usuario>(`${this.url}/create`, usuario, {
      headers,
    });
  }

  update(id: number, usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<Usuario>(`${this.url}/update?id=${id}`, usuario, {
      headers,
    });
  }

  updateEst(id: number, est: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateEst?id=${id}&est=${est}`,
      null,
      { headers }
    );
  }

  updateSaldo(id: number, saldo: number): Observable<void> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.put<void>(
      `${this.url}/updateSaldo?id=${id}&saldo=${saldo}`,
      null,
      { headers }
    );
  }

  logIn(login: LoginRequest): Observable<AuthResponse> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      // 'Authorization': `Bearer ${this.token}` // Agrega el token JWT aquí
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.post<AuthResponse>(`${this.urlPublica}/login`, login, {
      headers,
    });
  }

  usuarioValido(user: string) {
    const headers = new HttpHeaders({});

    return this.http.get<boolean>(
      `${this.urlPublica}/usuarioValido?user=${user}`,
      { headers }
    );
  }

  usuarioUnico(user: string) {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.get<boolean>(`${this.url}/usuarioUnico?user=${user}`, {
      headers,
    });
  }

  findUsuariosByRolId(id: number): Observable<UsuarioPorRolDTO[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`,
    });

    return this.http.get<UsuarioPorRolDTO[]>(
      `${this.url}/usuariosPorRol?roleId=${id}`,
      {
        headers,
      }
    );
  }

  docenteXAsignatura(asignaturaId: number): Observable<IDocenteXAsignatura[]> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.localStorage.getItem('token')}`, // Agrega el token JWT aquí
    });
    return this.http.get<IDocenteXAsignatura[]>(
      `${this.url}/docenteXAsignatura?asignaturaId=${asignaturaId}`,
      {
        headers,
      }
    );
  }
  //ELIMINAR USUARIO
  delete(id: number, usuario: Usuario): Observable<Usuario> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    // Realiza la solicitud HTTP con el encabezado de autorización
    return this.http.delete<Usuario>(`${this.url}/delete?id=${id}`, {
      headers,
    });
  }
  obtenerUsuariosPorRolId(rolId: number): Observable<string[]> {
    // Construir el encabezado de autorización con el token JWT
    const headers = new HttpHeaders({
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    });

    return this.http.get<string[]>(
      `${this.url}/usuariosPorRol?roleId=${rolId}`,
      {
        headers,
      }
    );
  }
}
