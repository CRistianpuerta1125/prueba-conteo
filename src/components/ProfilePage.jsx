export default function ProfilePage() {
  return (
    <div className="profile-page">
      <h1>Perfil de Usuario</h1>
      <div className="card">
        <div className="profile-info">
          <div className="profile-avatar">
            <div className="avatar-placeholder">JD</div>
          </div>
          <div className="profile-details">
            <h2>Juan Doe</h2>
            <p>juan.doe@example.com</p>
            <p>Administrador</p>
          </div>
        </div>
      </div>
    </div>
  );
}