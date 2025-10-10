function Export_import() {
  return (
    <div>
      <h1>Login User</h1>
    </div>
  );
}

export function Profile() {
  return (
    <div>
      <h1>User Profile</h1>
    </div>
  );
}

export function Settings() {  // can export multiple non-default in a file
  return (
    <div>
      <h1>User Settings</h1>
    </div>
  );
}
export default Export_import; //export only one default in a file else error

export const name = "Sj"; // can export variables also